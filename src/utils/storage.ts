import { CURRENT_GRADE, TOKEN, USER_INFO } from '@/utils/constants';
import { IUserInfo } from '@/types/user';

function removeToken() {
  localStorage.removeItem(TOKEN);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

function removeUserInfo() {
  localStorage.removeItem(USER_INFO);
}

export function getUserInfo(): IUserInfo {
  const userInfo = localStorage.getItem(USER_INFO);
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {
      createTime: '',
      imgUrl: '',
      isDelete: 0,
      password: '',
      phone: '',
      schoolId: '',
      schoolName: '',
      updateTime: '',
      userId: ''
    };
  }
}

export function setUserInfo(userInfo: IUserInfo) {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
}

function removeCurrentGrade() {
  localStorage.removeItem(CURRENT_GRADE);
}

export function getCurrentGrade() {
  const currentGrade = localStorage.getItem(CURRENT_GRADE);
  if (currentGrade) {
    return Number(currentGrade);
  } else {
    return 0;
  }
}

export function setCurrentGrade(currentGrade: number) {
  localStorage.setItem(CURRENT_GRADE, String(currentGrade));
}

export function clearData() {
  removeToken();
  removeUserInfo();
  removeCurrentGrade();
}
