import { IForm, ITab, LoginMethodEnum } from '@/types/login.d';
import { ElMessage } from 'element-plus';
import {
  getQRCodeStatusRequest,
  getQRRequest,
  getSMSRequest,
  loginRequest,
  resetPsdRequest
} from '@/api/login';
import QRCode from 'qrcodejs2-fix';
import router from '@/router/index';
import { setToken } from '@/utils/storage';
import { getImageUrl } from '@/utils';

export default defineStore('login', () => {
  const TAB_LIST: ITab[] = [
    { id: 0, name: '账号登录', text: '请输入账号' },
    { id: 1, name: '手机号登录', text: '请输入手机号' }
  ];

  const currentTab = ref<LoginMethodEnum>(LoginMethodEnum.PASSWORD);

  const form = ref<IForm & { [key: string]: any }>({
    account: '',
    password: '',
    newPassword: ''
  });

  const countdown = ref<number>(60);
  const disabled = ref<boolean>(false);
  const text = ref<string>('获取验证码');
  const timer = ref<null | NodeJS.Timer>(null);
  const content = ref<string>('');
  const isExpired = ref<boolean>(false);
  const QRCodeRef = ref<null | HTMLElement>(null);
  const QRCodeTimer = ref<null | NodeJS.Timeout>(null);
  const loading = ref<boolean>(false);

  const inputType = computed<string>(() => {
    return currentTab.value === LoginMethodEnum.PASSWORD ? 'password' : 'text';
  });

  // 是否是扫码登录
  const isScan = computed<boolean>(() => {
    return currentTab.value === LoginMethodEnum.SCAN_CODE;
  });

  // 是否是验证码登录
  const isCode = computed<boolean>(() => {
    return currentTab.value === LoginMethodEnum.CODE;
  });

  // 是否是密码登录
  const isPassword = computed(() => {
    return currentTab.value === LoginMethodEnum.PASSWORD;
  });

  const passwordPlaceholder = computed<string>(() => {
    switch (currentTab.value) {
      case LoginMethodEnum.CODE:
        return '请输入验证码';
      case LoginMethodEnum.PASSWORD:
        return '请输入密码';
      default:
        return '';
    }
  });

  const accountPlaceholder = computed<string>(() => {
    switch (currentTab.value) {
      case LoginMethodEnum.CODE:
        return '请输入手机号';
      case LoginMethodEnum.PASSWORD:
        return '请输入账号';
      default:
        return '';
    }
  });

  const signImg = computed<string>(() => {
    switch (currentTab.value) {
      case LoginMethodEnum.SCAN_CODE:
        return getImageUrl('login_account');
      default:
        return getImageUrl('login_code');
    }
  });

  const subText = computed<string>(() => {
    switch (currentTab.value) {
      case LoginMethodEnum.CODE:
        return text.value;
      case LoginMethodEnum.PASSWORD:
        return '忘记密码';
      default:
        return '';
    }
  });

  async function revisePassword() {
    const { account, password, newPassword } = form.value;
    if (!verifyPhone()) {
      ElMessage({
        message: '手机号格式错误！',
        type: 'error'
      });
      return;
    }
    if (!password || password.length === 0) {
      ElMessage({
        message: '请输入验证码',
        type: 'error'
      });
      return;
    }
    if (!newPassword || newPassword.length === 0) {
      ElMessage({
        message: '请输入新密码',
        type: 'error'
      });
      return;
    }
    await resetPsdRequest({
      phone: account,
      code: password,
      password: newPassword
    });
    ElMessage({
      message: '更换密码成功，请重新登录！',
      type: 'success'
    });
    router.go(-1);

    form.value.password = '';
    currentTab.value = LoginMethodEnum.PASSWORD;
  }
  // 循环获取扫码登录状态 每隔2s
  async function getScanCodeLoginStatus(url: string) {
    if (QRCodeTimer.value) clearTimeout(QRCodeTimer.value);

    // 切换到别的登录方式或者二维码已过期就停止轮询
    if (currentTab.value !== LoginMethodEnum.SCAN_CODE || isExpired.value) return;

    const data = await getQRCodeStatusRequest(url);
    if (!data) {
      // 请求成功 一秒钟调用一次查看状态
      QRCodeTimer.value = setTimeout(() => {
        getScanCodeLoginStatus(url);
      }, 2000);
    } else if (typeof data === 'string') {
      setToken(data);
      await router.replace('/home');
    }
  }
  async function getCodeContent() {
    content.value = await getQRRequest();
    isExpired.value = false;
    const arr = content.value.split('=');
    await getScanCodeLoginStatus(arr[arr.length - 1]);

    // 用户一分钟之内没有操作，二维码自动过期
    setTimeout(() => {
      isExpired.value = true;
    }, 60000);
  }
  function makeCode() {
    if (QRCodeTimer.value && QRCodeRef.value?.innerHTML) {
      QRCodeRef.value.innerHTML = '';
    }
    new QRCode(<HTMLElement>QRCodeRef.value, {
      text: content.value,
      width: 280,
      height: 280,
      colorDark: '#000000',
      colorLight: '#ffffff'
    });
  }
  function startTimer() {
    disabled.value = true;
    timer.value = setInterval(() => {
      if (countdown.value > 0 && countdown.value <= 60) {
        countdown.value--;
        if (countdown.value !== 0) {
          text.value = `重新发送(${countdown.value})`;
        } else {
          clearInterval(timer.value as NodeJS.Timer);
          text.value = '获取验证码';
          countdown.value = 60;
          timer.value = null;
          disabled.value = false;
        }
      }
    }, 1000);
  }
  // 发送短信验证码
  async function getVerificationCode() {
    startTimer();
    await getSMSRequest(form.value.account);
    ElMessage({
      message: '验证码发送成功！',
      type: 'success'
    });
  }
  function verifyPhone() {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(form.value.account);
  }
  async function sendCode() {
    // 短信发送冷却中
    if (disabled.value) {
      return;
    }
    if (verifyPhone()) {
      await getVerificationCode();
    } else {
      ElMessage({
        message: '手机号格式错误！',
        type: 'error'
      });
    }
  }
  async function handleSub() {
    // 忘记密码
    if (currentTab.value === LoginMethodEnum.PASSWORD) {
      await router.push('/login/ForgetPassword');
      return;
    }
    await sendCode();
  }
  function changeForm(key: string, value: any) {
    form.value[key] = value;
  }
  function switchTab(id: number) {
    if (id === LoginMethodEnum.SCAN_CODE) {
      currentTab.value = isScan.value ? LoginMethodEnum.PASSWORD : LoginMethodEnum.SCAN_CODE;
    } else {
      currentTab.value = id;
    }
  }
  async function handleLogin() {
    if (loading.value) return;
    loading.value = true;
    const { account, password } = form.value;
    const data = await loginRequest({
      phone: account,
      password: isPassword.value ? password : undefined,
      code: isCode.value ? password : undefined,
      type: currentTab.value
    });
    if (data) {
      setToken(data.token);
      await router.replace('/home');

      const { queryUserInfo } = useStore('user');
      await queryUserInfo();
    } else {
      ElMessage({
        message: '登录失败！',
        type: 'error'
      });
    }
    loading.value = false;
  }

  return {
    TAB_LIST,
    currentTab,
    form,
    countdown,
    disabled,
    text,
    timer,
    content,
    isExpired,
    QRCodeRef,
    QRCodeTimer,
    loading,

    inputType,
    isScan,
    isCode,
    passwordPlaceholder,
    accountPlaceholder,
    signImg,
    subText,

    revisePassword,
    getCodeContent,
    makeCode,
    sendCode,
    handleSub,
    changeForm,
    switchTab,
    handleLogin
  };
});
