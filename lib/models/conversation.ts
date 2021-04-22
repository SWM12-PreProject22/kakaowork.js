import { AxiosResponse } from 'axios';
import { AnyARecord } from 'node:dns';
import { KakaoServerAbnormalStatus, KakaoServerError } from '../errors/baseKakaoWorkError';
import { KakaoWorkModel } from '../interface/kakaoWorkModel';
import { MessageBlock, ModalBlock } from './blocks/block';
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

    private throwIfAbnormal(response: AxiosResponse) {
        if (response.status < 200 || response.status > 300)
            throw new KakaoServerAbnormalStatus(response);

        if (!response.data.success)
            throw new KakaoServerAbnormalStatus(response);
    }

    async invite_users(...users: User[]): Promise<boolean> {
        const response = await this.client.client.post(`/conversations/${this.id}/invite`, {
            user_ids: users
        });
        return response.data.success
    }

    async kick_users(...users: User[]): Promise<boolean> {
        const response = await this.client.client.post(`/conversations/${this.id}/kick`, {
            user_ids: users
        });
        return response.data.success
    }

    async send_message(text: string, blocks?: BlockContainer): Promise<Message | undefined> {
        const map = new Map();
        map.set("conversation_id", `${this.id}`);
        map.set("text", text);
        if (blocks != null) map.set("blocks", blocks.serialize());

        const response = await this.client.client.post(`/messages.send`, Object.fromEntries(map));
        this.throwIfAbnormal(response);
        return new Message(this.client, response.data.message);
    }
};
