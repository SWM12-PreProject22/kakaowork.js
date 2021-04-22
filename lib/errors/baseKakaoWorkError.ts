import { AxiosResponse } from "axios";

export class BaseKakaoWorkError extends Error {};

export class KakaoServerError extends BaseKakaoWorkError {
    response: AxiosResponse

    constructor(response: AxiosResponse) {
        super();
        this.response = response;
    }
};

export class KakaoServerAbnormalStatus extends KakaoServerError {};
