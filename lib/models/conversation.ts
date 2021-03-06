import KakaoWorkModel from '../interface/KakaoWorkModel';
import Message from './message';
import User from './user';
import { throwIfAbnormal } from '../utils/ResponseUtil';
import { Container, ModalContainer, BlockContainer } from './container';
import type KakaoWork from '../KakaoWork';

export default class Conversation extends KakaoWorkModel {
  id!: number;

  type!: string;

  userList!: User[];

  avatar_url?: string;

  constructor(client: KakaoWork, obj?: Object) {
    super(client, obj);
    this.id = Number(this.id);
  }

  userCount(): number {
    return this.userList.length;
  }

  async inviteUsers(...users: User[]): Promise<boolean> {
    const response = await this.client.client.post(
      `/conversations/${this.id}/invite`,
      {
        user_ids: users,
      }
    );
    throwIfAbnormal(response);
    return response.data.success;
  }

  async kickUsers(...users: User[]): Promise<boolean> {
    const response = await this.client.client.post(
      `/conversations/${this.id}/kick`,
      {
        user_ids: users,
      }
    );
    throwIfAbnormal(response);
    return response.data.success;
  }

  async sendMessage(
    text: string,
    blocks?: Container
  ): Promise<Message | undefined> {
    const map = new Map();
    map.set('conversation_id', `${this.id}`);
    map.set('text', text);

    if (blocks instanceof BlockContainer || blocks instanceof ModalContainer) {
      blocks.serialize(map);
    }

    const response = await this.client.client.post(
      `/messages.send`,
      Object.fromEntries(map)
    );
    throwIfAbnormal(response);
    return new Message(this.client, response.data.message);
  }

  async fetchConversationUsers(): Promise<User[]> {
    const response = await this.client.client.get(
      `/conversations/${this.id}/users`
    );
    throwIfAbnormal(response);

    const users: User[] = [];
    response.data.users.forEach((u: User) => {
      users.push(new User(this.client, u));
    });
    return users;
  }
}
