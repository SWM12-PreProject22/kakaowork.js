import { KakaoWorkModel } from "../interface/kakaoWorkModel"
import { MessageBlock } from "./blocks/block"

export class Message extends KakaoWorkModel {
    id!: string
    text!: string
    user_id!: string
    conversation_id!: string
    send_time!: Date
    update_time!: Date
    blocks?: Array<MessageBlock>
}