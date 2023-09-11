import request from '@/utils/request';
import { IUserInfo } from '@/types/user';
/**
 * 用户信息
 */
export function queryUserInfoRequest() {
  return request<IUserInfo>({
    url: '/teacher-lib/home/query/userInfo',
    method: 'GET'
  });
}

/**
 * 校验是否超过使用人数
 */
export function verifyAuthCountRequest() {
  return request<string | null>({
    url: '/teacher-lib/utils/auth/count',
    method: 'POST'
  });
}
