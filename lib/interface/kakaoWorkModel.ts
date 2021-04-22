import { KakaoWork } from "../ApiClient";

export class KakaoWorkModel {
    createdAt!: Date
    updatedAt!: Date
    client!: KakaoWork

    constructor(client: KakaoWork, obj?: Object, created?: Date, updated?: Date) {
        if (!created) created = new Date();
        if (!updated) updated = created;
        this.createdAt = created;
        this.updatedAt = updated;

        this.client = client;
        if (obj) Object.assign(this, obj)
    }
};
