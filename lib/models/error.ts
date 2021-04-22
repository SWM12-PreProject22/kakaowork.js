import { AxiosError } from "axios";
import { KakaoWork } from "../ApiClient";

interface KakaoWorkServerReportedError {
    client?: KakaoWork
    error?: AxiosError
}

export class InvalidParameterError implements KakaoWorkServerReportedError {
    client: KakaoWork
    error: AxiosError

    constructor(client: KakaoWork, error: AxiosError) {
        this.client = client;
        this.error = error;
    }
}
