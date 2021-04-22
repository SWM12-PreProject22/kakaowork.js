import { KakaoWorkModel } from '../interface/kakaoWorkModel';
import { KakaoWork } from '../kakaowork';
import { BlockContainer } from './blocks/container';
import { Message } from './message';
import { User } from './user';


export class Conversation extends KakaoWorkModel {
    id!: Number
    type!: string
    userList!: Array<User>

    avatar_url?: string

    userCount(): Number {
        return this.userList.length;
    };

    async invite_users(...users: User[]): Promise<boolean> {
        const response = await this.client.client.post(`/conversations/${this.id}/invite`, {
            user_ids: users
        });
        KakaoWork.throwIfAbnormal(response);
        return response.data.success
    }

    async kick_users(...users: User[]): Promise<boolean> {
        const response = await this.client.client.post(`/conversations/${this.id}/kick`, {
            user_ids: users
        });
        KakaoWork.throwIfAbnormal(response);
        return response.data.success
    }

    async send_message(text: string, blocks?: BlockContainer): Promise<Message | undefined> {
        const map = new Map();
        map.set("conversation_id", `${this.id}`);
        map.set("text", text);
        if (blocks != null) map.set("blocks", blocks.serialize());

        const response = await this.client.client.post(`/messages.send`, Object.fromEntries(map));
        KakaoWork.throwIfAbnormal(response);
        return new Message(this.client, response.data.message);
    }

    async fetch_conversation_users(): Promise<Array<User>> {
        const response = await this.client.client.get(`/conversations/${this.id}/users`);
        KakaoWork.throwIfAbnormal(response);
        
        let users: Array<User> = new Array();
        response.data.users.forEach((u:User) => {
            users.push(new User(this.client, u))
        });
        return users;
    }
};
