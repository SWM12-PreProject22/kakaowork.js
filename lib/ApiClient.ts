import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { KakaoServerAbnormalStatus } from './errors/baseKakaoWorkError';
import { Conversation } from './models/conversation';
import { User } from './models/user';

export class KakaoWork {
    token!: string
    client: AxiosInstance
    private users: Map<Number,User> = new Map<Number,User>();
    private conversations: Map<Number,Conversation> = new Map<Number,Conversation>();

    get instance(): AxiosInstance {
        return this.client;
    }

    private buildClient(): AxiosInstance {
        return axios.create({
            baseURL: 'https://api.kakaowork.com/v1',
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    constructor(token: string) {
        this.token = token;
        this.client = this.buildClient();
    }

    async run() {
        this.users.clear();
        this.conversations.clear();
    }

    static throwIfAbnormal(response: AxiosResponse) {
        if (response.status < 200 || response.status > 300)
            throw new KakaoServerAbnormalStatus(response);

        if (!response.data.success)
            throw new KakaoServerAbnormalStatus(response);
    }

    get_user(id: Number): User | undefined {
        return this.users.get(id)
    }

    async *fetch_user_list(limit?: Number, cursor?: string): AsyncGenerator<User, void> {
        if (!limit) limit = 100
        let data = (cursor)? { cursor: cursor } : { limit: `${limit}` };
        let empty = false;

        const response = await this.client.get('/users.list', { params: data });
        KakaoWork.throwIfAbnormal(response);

        for (const u of response.data.users) {
            let user: User = new User(this, u)
            this.users.set(user.id, user)
            yield user;
        }

        if (response.data.cursor)
            yield* this.fetch_user_list(limit, response.data.cursor);
    }

    async get_conversation(id: Number): Promise<Conversation | undefined> {
        if(!this.conversations.has(id)) await this.fetch_conversation_list()
        return this.conversations.get(id)
    }

    async open_conversation(...user_ids: Array<Number>): Promise<Conversation> {
        let data = (user_ids.length == 1) ? {
            user_id: `${user_ids[0]}`
        } : {
            user_ids: user_ids
        };
        const response = await this.client.post('/conversations.open', data);
        KakaoWork.throwIfAbnormal(response);
        
        let conv: Conversation = new Conversation(this, response.data.conversation);
        this.conversations.set(conv.id, conv);

        return conv;
    }

    async *fetch_conversation_list(limit?: Number, cursor?: string): AsyncGenerator<Conversation, void> {
        if (!limit) limit = 100
        let data = (cursor)? { cursor: cursor, limit: `${limit}` } : { limit: `${limit}` };

        const response = await this.client.get('/conversations.list', { params: data });
        KakaoWork.throwIfAbnormal(response);

        for(const c of response.data.conversations) {
            let conversation = new Conversation(this, c);
            this.conversations.set(conversation.id, conversation);
            yield conversation;
        }

        if (response.data.cursor)
            yield* this.fetch_conversation_list(limit, response.data.cursor);
    }
}
