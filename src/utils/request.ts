import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/storage';
import loading from '@/utils/loading';

interface CustomAxiosInstance extends AxiosInstance {
  <T>(config: AxiosRequestConfig): Promise<T>;
}

const service: CustomAxiosInstance = axios.create({
  baseURL: '/zd-api',
  timeout: 5000
});

/**
 * 请求拦截
 */
service.interceptors.request.use(
  (config) => {
    // 统一的请求头设置
    config.headers['token'] = getToken();
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    return config;
  },
  (error) => {
    // 请求错误统一处理
    console.log(error, 'service.interceptors.request.error');
    return Promise.reject(error);
  }
);

/**
 *  响应拦截
 */
service.interceptors.response.use(
  async (response) => {
    // http状态码判断
    const { status, msg, data } = response.data;
    if (status !== 200) {
      ElMessage({
        message: msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      if (status === 403 || status === 401 || status === 352 || status === 500 || status === 408) {
        // 退出登录
        await useStore('user').signOut();
      }
      if (status === 423) {
        ElMessage({
          message: '暂未开通电子课件资源库，可登录逻辑狗·家园共育APP开通哦',
          type: 'error',
          duration: 5 * 1000
        });
      }

      setTimeout(() => {
        loading.close();
      }, 500);
      return Promise.reject(new Error(msg || 'Error'));
    } else {
      return data;
    }
  },
  (error) => {
    console.log('service.interceptors.response.error' + error);
    ElMessage({
      message: error?.message || error?.msg || '错误！',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
