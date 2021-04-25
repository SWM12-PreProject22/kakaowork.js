import { AxiosResponse } from 'axios';
import BaseKakaoWorkError from './BaseKakaoWorkError';

export default class KakaoServerError extends BaseKakaoWorkError {
  response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super();
    this.response = response;
  }
}
