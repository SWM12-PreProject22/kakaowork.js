import { AxiosResponse } from 'axios';
import KakaoServerAbnormalStatus from '../errors/KakaoWorkAbnormalStatus';

// eslint-disable-next-line import/prefer-default-export
export const throwIfAbnormal = (response: AxiosResponse) => {
  if (response.status < 200 || response.status > 300) {
    throw new KakaoServerAbnormalStatus(response);
  }

  if (!response.data.success) throw new KakaoServerAbnormalStatus(response);
};
