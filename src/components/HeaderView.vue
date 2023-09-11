<script setup lang="ts">
import { ILearnRecord } from '@/types/user';
import { getImageUrl } from '@/utils';
import { DARK_COLOR, LIGHT_COLOR } from '@/utils/constants';

const {
  showDownLoad,
  searchText,
  searchBarRef,
  clearBtnRef,
  searchLogoRef,
  showSearchBar,
  showSearchResult,
  searchResult,
  showLearnRecord,
  recentStudyRecord,
  learnRecordList: list,

  goSearch,
  startSearch,
  clearSearchText,
  chooseSearch,
  hideMask,
  clearLearnRecord,
  deleteLearnRecord,
  getLearnRecord,
  getLearnRecordLast
} = useStore('header');

const {
  currentGrade,
  isLoginView,
  isHomeView,
  isMyView,
  userInfo,

  goHome,
  goLogin,
  goMy,
  signOut,
  goCourse
} = useStore('user');

const headerLogo = computed<string>(() => {
  return isHomeView.value ? getImageUrl('home_logo') : getImageUrl('logo');
});

const historyLogo = computed<string>(() => {
  return isMyView.value ? getImageUrl('historyed') : getImageUrl('history');
});

const borderColor = computed<string>(() => {
  return DARK_COLOR[currentGrade.value];
});

const shadowColor = computed<string>(() => {
  return LIGHT_COLOR[currentGrade.value];
});

const learnRecordList = computed<ILearnRecord[]>(() => list.value);
const userId = computed(() => {
  return userInfo.value.userId;
});

watch(showSearchBar, (show) => {
  if (searchLogoRef.value)
    searchLogoRef.value.className = show ? 'bar-logo cp left' : 'bar-logo cp';
  if (searchBarRef.value) searchBarRef.value.className = show ? 'width' : '';
  if (show) {
    setTimeout(() => {
      searchBarRef.value?.focus();
    }, 500);
  }
});

if (!isLoginView.value && userId.value) {
  getLearnRecord();
  getLearnRecordLast();
}
</script>

<template>
  <div v-if="isLoginView" class="login-header lh">
    <img :src="getImageUrl('home_logo')" class="lh-logo cp" alt="logo" @click="goLogin" />
    <div class="lh-btn cp">
      <div @mouseenter="showDownLoad = true" @mouseleave="showDownLoad = false">下载APP</div>
      <img v-show="showDownLoad" :src="getImageUrl('download')" />
    </div>
  </div>
  <div v-else class="header">
    <img :src="headerLogo" alt="" class="header-logo cp" @click="goHome" />
    <div class="header-nav">
      <template v-if="!isHomeView">
        <div class="header-nav-search cp">
          <div class="bar">
            <input
              v-show="showSearchBar"
              v-model="searchText"
              ref="searchBarRef"
              type="text"
              :style="{
                boxShadow: `0 0 0 6px ${shadowColor}`,
                border: `1px solid ${borderColor}`
              }"
              @keyup.enter="goSearch"
              @focus="startSearch"
            />
            <img
              v-if="showSearchBar"
              ref="clearBtnRef"
              :src="getImageUrl('close')"
              class="cp"
              @click.stop="clearSearchText"
            />
            <div ref="searchLogoRef" class="bar-logo cp" @click="goSearch">
              <img :src="getImageUrl('search')" />
            </div>
          </div>
          <div v-if="showSearchResult" class="result">
            <div
              class="result-item"
              v-for="(item, index) in searchResult"
              :key="index"
              v-html="item.nameHighlights"
              @click.stop="chooseSearch(item.name)"
            ></div>
          </div>
          <div v-if="showSearchBar" class="mask" @click="hideMask"></div>
        </div>
        <div class="header-nav-home cp" @click="goHome">
          <img :src="getImageUrl('home')" />
          <div>首页</div>
        </div>
        <div :class="['header-nav-history cp', isMyView && 'historyed']" @click="goMy">
          <div class="container">
            <img :src="historyLogo" alt="学习记录" />
            <div>学习记录</div>
          </div>
          <div class="learn-record lr">
            <div class="lr-triangle"></div>
            <div class="lr-list">
              <div class="lr-list-card" v-if="recentStudyRecord.imgUrl">
                <div class="mask" @click.stop="goCourse(recentStudyRecord.catId)">
                  <div>学习记录</div>
                </div>
                <img v-if="recentStudyRecord.imgUrl" :src="recentStudyRecord.imgUrl" alt="imgUrl" />
              </div>
              <div class="lr-list-text">
                <div class="title">近七天学习记录</div>
                <div v-if="showLearnRecord" class="clear cp" @click.stop="clearLearnRecord">
                  <img :src="getImageUrl('clear')" alt="清除所有" />
                  <span>清除所有</span>
                </div>
              </div>
              <template v-if="showLearnRecord">
                <div class="lr-list-record">
                  <div v-for="item in learnRecordList" :key="item.recordId" class="card">
                    <img :src="getImageUrl('card')" class="card-logo" alt="card" />
                    <div class="card-level">{{ item.classLevelName }}</div>
                    <div class="card-content">
                      <div>
                        <div class="card-content-title">{{ item.slidesName }}</div>
                        <div class="card-content-clock">
                          <img :src="getImageUrl('clock')" alt="clock" />
                          <span>{{ item.createTime }}</span>
                        </div>
                      </div>
                      <img
                        :src="getImageUrl('close')"
                        class="card-content-close cp"
                        @click.stop="deleteLearnRecord(item.recordId)"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="lr-list-look cp"
                  :style="{
                    border: `1px solid ${borderColor}`,
                    color: borderColor
                  }"
                  @click="goMy"
                >
                  查看全部
                </div>
              </template>

              <div v-else>空</div>
            </div>
          </div>
        </div>
      </template>
      <div class="header-nav-info">
        <div class="name">{{ userInfo.schoolName }}</div>
        <div class="ava">
          <img :src="userInfo.imgUrl || getImageUrl('ava')" alt="" class="ava-mini cp" />
          <div class="ava-content">
            <div class="ava-content-triangle"></div>
            <div class="ava-content-list cp">
              <div @click="signOut">退出登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 109px;

  &-logo {
    width: 230px;
    height: 73px;
  }

  &-nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &-search {
      position: relative;

      .bar {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 20;
        margin-right: 30px;
        width: 480px;
        height: 50px;

        input {
          position: absolute;
          right: 0;
          padding-left: 53px;
          width: 50px;
          height: 50px;
          background: #ffffff;
          box-shadow: 2px 6px 14px 8px rgba(57, 58, 62, 0.06);
          border-radius: 25px;
          transition: width 0.5s ease;
          box-sizing: border-box;
        }

        .width {
          width: 430px !important;
        }

        > img {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 14px;
          height: 14px;
        }

        &-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 436px;
          top: 0;
          width: 50px;
          height: 100%;
          transition: all 0.5s ease;

          img {
            display: block;
            width: 24px;
            height: 24px;
          }
        }

        .left {
          left: 60px !important;
        }
      }

      .result {
        position: absolute;
        z-index: 20;
        margin-top: 10px;
        padding: 7px 0;
        width: 480px;
        background: rgb(255, 255, 255);
        box-shadow: 2px 6px 14px 8px rgba(47, 47, 47, 0.1);
        border-radius: 10px;
        box-sizing: border-box;

        &-item {
          padding-left: 30px;
          width: 480px;
          height: 36px;
          line-height: 36px;
          box-sizing: border-box;
        }

        &-item:hover {
          background: #e6e6e6;
        }
      }

      .mask {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 19;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0);
      }
    }

    &-home {
      display: flex;
      align-items: center;
      margin-right: 37px;
      height: 18px;
      font-size: 18px;
      color: #666666;

      img {
        margin-top: -2px;
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }

      > div {
        font-size: 18px;
        height: 18px;
        line-height: 18px;
      }
    }

    &-history {
      display: flex;
      align-items: center;
      margin-right: 37px;
      position: relative;
      flex-direction: column;
      height: 18px;
      font-size: 18px;
      color: #666666;

      .container {
        display: flex;
        align-items: center;

        img {
          margin-top: -2px;
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }

        div {
          font-size: 18px;
          height: 18px;
          line-height: 18px;
        }
      }

      .lr {
        display: none;
        // display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        z-index: 999;
        top: 18px;

        &-triangle {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #fff;
        }

        &-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
          width: 278px;
          // height: 587px;
          background-color: #fff;
          box-shadow: 2px 6px 14px 8px rgba(47, 47, 47, 0.1);
          border-radius: 15px;
          box-sizing: border-box;

          &-card {
            position: relative;
            margin-bottom: 30px;
            width: 238px;
            height: 133px;
            // background: #000000;
            border-radius: 16px;
            overflow: hidden;

            .mask {
              display: none;
              // display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              z-index: 9;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.3);

              > div {
                width: 80px;
                height: 30px;
                line-height: 30px;
                background: #ffffff;
                color: #333333;
                font-size: 14px;
                border-radius: 15px;
                text-align: center;
              }
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .lr-list-card:hover {
            .mask {
              display: flex;
            }
          }

          &-text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 0 20px;
            width: 100%;

            .title {
              font-size: 20px;
              color: #333333;
              font-weight: 600;
            }

            .clear {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #999999;

              img {
                margin-right: 5px;
                width: 14px;
                height: 14px;
              }

              span {
                height: 14px;
                line-height: 14px;
                font-size: 14px;
              }
            }
          }

          &-record {
            display: flex;
            flex-direction: column;

            .card {
              display: flex;
              // justify-content: space-between;
              align-items: center;
              position: relative;
              // margin-right: 70px;
              margin-bottom: 10px;
              width: 238px;
              height: 66px;
              background: #ffffff;
              border: 1px solid #eee;
              border-radius: 15px;

              &-logo {
                margin-left: -6px;
                width: 51px;
                height: 29px;
              }

              &-level {
                position: absolute;
                top: 22px;
                left: 0;
                height: 12px;
                line-height: 12px;
                font-size: 12px;
                color: #666666;
                transform: scale(0.8);
              }

              &-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-left: 10px;
                width: 183px;

                &-title {
                  width: 130px;
                  font-size: 16px;
                  color: #666666;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                &-clock {
                  display: flex;
                  align-items: center;
                  margin-top: 5px;
                  font-size: 12px;

                  img {
                    width: 12px;
                    height: 12px;
                  }
                }

                &-close {
                  display: none;
                  margin-right: 20px;
                  width: 16px;
                }
              }
            }

            .card:hover {
              border: 0;
              box-shadow: 2px 6px 20px 4px rgba(2, 55, 92, 0.08);

              .card-content-close {
                width: 12px;
                height: 12px;
                display: block;
              }

              .card-content-title {
                color: #333 !important;
                font-weight: 550;
              }
            }
          }

          &-look {
            width: 130px;
            height: 36px;
            line-height: 36px;
            background: #ffffff;
            border-radius: 18px;
            border: 1px solid #ff6f5b;
            color: #ff6f5b;
            font-size: 18px;
            text-align: center;
          }
        }
      }
    }

    .header-nav-history:hover {
      .lr {
        display: flex;
      }
    }

    .historyed {
      font-weight: 600;
    }

    &-info {
      display: flex;
      align-items: center;

      .name {
        margin-right: 14px;
        font-size: 24px;
        font-weight: 550;
        color: #525252;
      }

      .ava {
        position: relative;
        z-index: 20;

        &-mini {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }

        &-content {
          display: none;
          flex-direction: column;
          align-items: center;
          position: absolute;
          top: 40px;
          left: -40px;

          &-triangle {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 10px solid #fff;
          }

          &-list {
            width: 120px;
            background-color: #fff;
            box-shadow: 2px 6px 14px 8px rgba(47, 47, 47, 0.1);
            border-radius: 10px;
            overflow: hidden;

            > div {
              width: 120px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              background-color: #fff;
            }

            > div:hover {
              background: #f3f3f3;
            }
          }
        }
      }

      .ava:hover {
        .ava-content {
          display: flex;
        }
      }
    }
  }
}
.lh {
  display: flex;
  align-items: center;
  height: 107px;

  &-logo {
    margin-right: 30px;
    width: 230px;
    height: 73px;
  }

  &-btn {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 9;
    width: 140px;
    height: 50px;
    background: #ffffff;
    font-size: 22px;
    color: #333333;
    font-weight: 600;
    text-align: center;
    border-radius: 30px;

    > div {
      margin-top: 3px;
      height: 22px;
      line-height: 22px;
    }

    > img {
      position: absolute;
      top: 50px;
      margin-top: 6px;
      width: 140px;
      height: 140px;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      border-radius: 7px;
    }
  }
}
</style>
