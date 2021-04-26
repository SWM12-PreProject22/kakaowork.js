import type KakaoWork from '../KakaoWork';

export default class KakaoWorkModel {
  createdAt: Date;

  updatedAt: Date;

  client: KakaoWork;

  constructor(
    client: KakaoWork,
    obj?: Object,
    created: Date = new Date(),
    updated: Date = created
  ) {
    this.createdAt = created;
    this.updatedAt = updated;

    this.client = client;
    if (obj) Object.assign(this, obj);
  }
}
