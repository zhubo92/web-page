import request from '@/utils/request';
import { LoginMethodEnum } from '@/types/login';

/**
 * 发送二维码
 */
export function getSMSRequest(phone: string) {
  return request({
    url: `/teacher-lib/home/login/SMS?phone=${phone}`,
    method: 'GET'
  });
}

/**
 * 获取二维码登录的链接
 */
export function getQRRequest() {
  return request<string>({
    url: '/teacher-lib/home/login/getQR',
    method: 'POST'
  });
}

/**
 * 获取扫码登录状态
 */
export function getQRCodeStatusRequest(qrcode: string) {
  return request({
    url: `/teacher-lib/home/login/getQrCodeStatus/${qrcode}`,
    method: 'GET'
  });
}

/**
 * 重置密码
 */
export function resetPsdRequest(data: { phone: string; code: string; password: string }) {
  return request({
    url: `/teacher-lib/home/login/reset`,
    method: 'POST',
    data
  });
}

/**
 * 登录
 */
export function loginRequest(data: {
  phone: string;
  password: string | undefined;
  code: string | undefined;
  type: LoginMethodEnum;
}) {
  return request<{ token: string }>({
    url: `/teacher-lib/home/login`,
    method: 'POST',
    data
  });
}
