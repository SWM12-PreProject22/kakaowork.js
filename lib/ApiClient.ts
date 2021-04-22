import axios, { AxiosInstance, AxiosResponse } from 'axios';
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

    get_user(id: Number): User | undefined {
        return this.users.get(id)
    }

    async *fetch_user_list(limit?: Number, cursor?: string): AsyncGenerator<User, void> {
        if (!limit) limit = 100
        let data = (cursor)? { cursor: cursor } : { limit: `${limit}` };
        let empty = false;

        const response = await this.client.get('/users.list', { params: data });
        if (response.status >= 200 && response.status < 300) {
            for (const u of response.data.users) {
                let user: User = new User(this, u)
                this.users.set(user.id, user)
                yield user;
            }

            if (response.data.cursor)
                yield* this.fetch_user_list(limit, response.data.cursor);
        }
    }

    async get_conversation(id: Number): Promise<Conversation | undefined> {
        if(!this.conversations.has(id)) await this.fetch_user_list()
        return this.conversations.get(id)
    }

    async open_conversation(...user_ids: Array<Number>): Promise<Conversation> {
        let data = (user_ids.length == 1) ? {
            user_id: `${user_ids[0]}`
        } : {
            user_ids: user_ids
        };
        const response = await this.client.post('/conversations.open', data);
        
        let conv: Conversation = new Conversation(this, response.data.conversation);
        this.conversations.set(conv.id, conv);

        return conv;
    }

    async fetch_conversation_list(limit?: Number, cursor?: string): Promise<Array<Conversation>> {
        if (!limit) limit = 100
        let data = (cursor)? { cursor: cursor, limit: `${limit}` } : { limit: `${limit}` };

        const response = await this.client.get('/conversations.list', { params: data });
        
        response.data.conversations.forEach((c: Conversation) => {
            let conv = new Conversation(this, c)
            this.conversations.set(conv.id, conv)
        });

        return Array.from(this.conversations.values());
    }

    async fetch_conversation_users(id: Number | Conversation): Promise<Array<User>> {
        if (id instanceof Conversation) id = id.id;
        const response = await this.client.get(`/conversations/${id}/users`);
        
        let users: Array<User> = new Array();
        response.data.users.forEach((u:User) => {
            users.push(new User(this, u))
        });
        return users;
    }
}
