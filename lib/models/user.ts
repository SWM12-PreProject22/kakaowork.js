import { KakaoWork } from '../ApiClient';
import { KakaoWorkModel } from '../interface/kakaoWorkModel';


export class UserIdentifications {
    type!: string
    value!: string
}

export class User extends KakaoWorkModel {
    id!: Number
    name!: string
    nickname?: string
    space_id!: string

    position?: string
    responsibility?: Object

    department!: string
    identifications!: Array<UserIdentifications>
    mobiles!: Array<string>
    tels!: Array<string>

    work_start_time?: Object
    work_end_time?: Object
    vacation_start_time?: Object
    vacation_end_time?: Object

    constructor(client: KakaoWork, obj: Object) {
        super(client, obj);
        this.id = Number(this.id)
    }
}

