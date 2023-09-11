import { queryUserInfoRequest } from '@/api/user';
import { defineStore } from 'pinia';
import {
  clearData,
  getCurrentGrade,
  getUserInfo,
  setCurrentGrade,
  setUserInfo
} from '@/utils/storage';
import { IUserInfo } from '@/types/user';
import { getImageUrl } from '@/utils';

export default defineStore('user', () => {
  const router = useRouter();
  const route = useRoute();

  const userInfo = ref<IUserInfo>(getUserInfo());
  const currentGrade = ref<number>(getCurrentGrade());

  // 是否是登录页
  const isLoginView = computed<boolean>(() => {
    return route.path.indexOf('/login') !== -1;
  });
  // 是否是 我的 页
  const isMyView = computed<boolean>(() => {
    return route.path === '/my';
  });
  // 是否是首页
  const isHomeView = computed<boolean>(() => {
    return route.path === '/home';
  });
  // 是否是搜索页
  const isSearchView = computed<boolean>(() => {
    return route.path === '/search';
  });
  // 是否是课程详情页
  const isCourseView = computed<boolean>(() => {
    return route.path === '/course';
  });
  // 是否是小节详情页
  const isSectionView = computed<boolean>(() => {
    return route.path === '/section';
  });
  // 是否是课件页面
  const isSlidesView = computed<boolean>(() => {
    return route.path === '/slides';
  });
  const bgi = computed(() => {
    if (isLoginView.value) return getImageUrl('login_bgi');
    else if (isHomeView.value) return getImageUrl('class0');
    else return getImageUrl(`class${currentGrade.value}`);
  });

  async function queryUserInfo() {
    userInfo.value = await queryUserInfoRequest();
    setUserInfo(userInfo.value);
  }
  async function signOut() {
    await router.replace({ path: '/login' });
    clearData();
  }
  async function goHome() {
    if (!isHomeView.value) {
      await router.push({ path: '/home' });
    }
  }
  async function goSearch(text: string | number = '') {
    if (!isSearchView.value) {
      await router.push({ path: `/search`, query: { text } });
    }
  }
  async function goLogin() {
    if (route.path !== '/login') {
      await router.push({ path: '/login' });
    }
  }
  async function goMy() {
    if (!isMyView.value) {
      await router.push({ path: '/my' });
    }
  }
  // 跳转到课程详情
  async function goCourse(id: number) {
    if (!isCourseView.value) {
      await router.push({ path: `/course`, query: { id } });
    }
  }
  // 跳转到小节详情
  async function goSection(id: number) {
    if (!isSectionView.value) {
      await router.push({ path: `/section`, query: { id } });
    }
  }

  async function goSlides(id: number) {
    if (!isSlidesView.value) {
      await router.push({ path: `/slides`, query: { id } });
    }
  }

  function changeCurrentGrade(value: number) {
    currentGrade.value = value;
    setCurrentGrade(value);
  }

  return {
    userInfo,
    currentGrade,

    bgi,
    isLoginView,
    isMyView,
    isHomeView,
    isCourseView,
    isSectionView,
    isSlidesView,

    queryUserInfo,
    signOut,
    goHome,
    goLogin,
    goMy,
    goSearch,
    goSection,
    goCourse,
    goSlides,
    changeCurrentGrade
  };
});
