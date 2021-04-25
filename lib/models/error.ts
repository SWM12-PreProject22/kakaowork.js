import { AxiosError } from 'axios';
import type KakaoWork from '../KakaoWork';

interface KakaoWorkServerReportedError {
  client?: KakaoWork
  error?: AxiosError
}

export default class InvalidParameterError implements KakaoWorkServerReportedError {
  client: KakaoWork;

  error: AxiosError;

  constructor(client: KakaoWork, error: AxiosError) {
    this.client = client;
    this.error = error;
  }
}
