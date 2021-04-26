import axios, { AxiosInstance } from 'axios';
import Conversation from './models/conversation';
import User from './models/user';
import { throwIfAbnormal } from './utils/ResponseUtil';

export default class KakaoWork {
  static instance: KakaoWork;

  token!: string;

  client: AxiosInstance;

  private users: Map<Number, User> = new Map<Number, User>();

  private conversations: Map<Number, Conversation> = new Map<
    Number,
    Conversation
  >();

  constructor(token: string) {
    KakaoWork.instance = this;
    this.token = token;
    this.client = this.buildClient();
  }

  get instance(): AxiosInstance {
    return this.client;
  }

  async run() {
    this.users.clear();
    this.conversations.clear();
  }

  getUser(id: Number): User | undefined {
    return this.users.get(id);
  }

  async *fetchUserList(
    limit: number = 100,
    cursor?: string
  ): AsyncGenerator<User, void> {
    const data = cursor ? { cursor } : { limit: `${limit}` };
    const response = await this.client.get('/users.list', { params: data });
    throwIfAbnormal(response);
    const userList: Object[] = response.data.users;

    for (let i = 0; i < userList.length; i += 1) {
      const user: User = new User(this, userList[i]);
      this.users.set(user.id, user);
      yield user;
    }

    if (response.data.cursor)
      yield* this.fetchUserList(limit, response.data.cursor);
  }

  async getConversation(id: Number): Promise<Conversation | undefined> {
    if (!this.conversations.has(id)) await this.fetchConversationList();
    return this.conversations.get(id);
  }

  async openConversation(...userIds: number[]): Promise<Conversation> {
    const data =
      userIds.length === 1
        ? {
            user_id: `${userIds[0]}`,
          }
        : {
            user_ids: userIds,
          };
    const response = await this.client.post('/conversations.open', data);
    throwIfAbnormal(response);

    const conv: Conversation = new Conversation(
      this,
      response.data.conversation
    );
    this.conversations.set(conv.id, conv);

    return conv;
  }

  async *fetchConversationList(
    limit: number = 100,
    cursor?: string
  ): AsyncGenerator<Conversation, void> {
    const data = cursor
      ? {
          cursor,
          limit: `${limit}`,
        }
      : { limit: `${limit}` };

    const response = await this.client.get('/conversations.list', {
      params: data,
    });
    throwIfAbnormal(response);
    const conversations: Object[] = Object.values(response.data.conversations);

    for (let i = 0; i < conversations.length; i += 1) {
      const conversation = new Conversation(this, conversations[i]);
      this.conversations.set(conversation.id, conversation);
      yield conversation;
    }

    if (response.data.cursor)
      yield* this.fetchConversationList(limit, response.data.cursor);
  }

  private buildClient(): AxiosInstance {
    return axios.create({
      baseURL: 'https://api.kakaowork.com/v1',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
