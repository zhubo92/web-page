export enum LoginMethodEnum {
  'PASSWORD',
  'CODE',
  'SCAN_CODE'
}
export interface ITab {
  id: LoginMethodEnum;
  name: string;
  text: string;
}

interface IForm {
  account: string;
  password: string;
  newPassword?: string;
}
