import type KakaoWork from '../KakaoWork';
import KakaoWorkModel from '../interface/KakaoWorkModel';

interface UserIdentifications {
  type: string;

  value: string;
}

export default class User extends KakaoWorkModel {
  id!: number;

  name!: string;

  nickname?: string;

  space_id!: string;

  position?: string;

  responsibility?: Object;

  department!: string;

  identifications!: UserIdentifications[];

  mobiles!: string[];

  tels!: string[];

  work_start_time?: Object;

  work_end_time?: Object;

  vacation_start_time?: Object;

  vacation_end_time?: Object;

  constructor(client: KakaoWork, obj: Object) {
    super(client, obj);
    this.id = Number(this.id);
  }
}
