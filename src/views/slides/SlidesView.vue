<script setup lang="ts">
import loading from '@/utils/loading';
import { closeFullscreen, downloadScreenshotFn, getImageUrl, openFullscreen } from '@/utils';
import QRCode from 'qrcodejs2-fix';

const { id } = useRoute().query;
const { signOut } = useStore('user');

// 课件是否已转换
const isConvertSlides = ref(false);
// 是否全屏
const isFullScreen = ref(false);
const QRCodeRef = ref();
const iframeRef = ref();

function handleClose() {
  signOut();
}

// 生成二维码
function generateQRCode() {
  if (QRCodeRef.value?.innerHTML) {
    QRCodeRef.value.innerHTML = '';
  }
  new QRCode(QRCodeRef.value, {
    text: `https://luojigou.vip/singlepage/#/homeCard?id=1`,
    width: 280,
    height: 280,
    colorDark: '#000000',
    colorLight: '#ffffff'
  });
}

// 开启与关闭全屏
function turnFullScreenOnOrOff() {
  if (isFullScreen.value) {
    closeFullscreen();
  } else {
    openFullscreen();
  }
  isFullScreen.value = !isFullScreen.value;
}

onMounted(async () => {
  loading.start();
  // await verifyAuthCount();
  console.log(id, 'id');
  if (typeof id === 'string') {
    // await getSlides(id);
    //
    // await getAddress(slides.value.catId);
    //
    // address.value.slidesName = slides.value.slidesName;
    // const len = slides.value.slidesUrl.length;
    // isConvertSlides.value = slides.value.slidesUrl.substring(len - 4, len) === 'html';

    generateQRCode();

    window.addEventListener('resize', function () {
      isFullScreen.value = !(
        window.outerWidth === screen.width || window.outerHeight === screen.height
      );
    });
  }
  loading.close();
});
</script>

<template>
  <!--<AddressBar :address="address" />-->
  <!--<div class="slides">-->
  <!--  <div class="slides-card">-->
  <!--    <div class="slides-card-btn cp">-->
  <!--      <img :src="getImageUrl('share')" alt="" />-->
  <!--      <div>家园共育卡</div>-->
  <!--    </div>-->
  <!--    <div class="slides-card-download">-->
  <!--      <img :src="getImageUrl('download_btn')" class="btn cp" @click="downloadScreenshotFn()" />-->
  <!--      <div id="poster" class="poster">-->
  <!--        <img :src="getImageUrl('poster')" class="poster-bgi" />-->
  <!--        <div class="poster-title">逻辑狗·家园共育卡</div>-->
  <!--        <div class="poster-name">{{ slides.slidesName }}</div>-->
  <!--        <div ref="QRCodeRef" class="poster-code"></div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <div-->
  <!--    v-if="isConvertSlides"-->
  <!--    :class="['slides-h5', isFullScreen && 'fullScreen']"-->
  <!--    ref="iframeRef"-->
  <!--  >-->
  <!--    <iframe-->
  <!--      :src="slides.slidesUrl"-->
  <!--      frameborder="0"-->
  <!--      allowfullscreen-->
  <!--      class="slides-h5-iframe"-->
  <!--    ></iframe>-->
  <!--    <div-->
  <!--      class="slides-h5-btn cp"-->
  <!--      :style="{ backgroundImage: `url(${getImageUrl('full_screen')})` }"-->
  <!--      @click="turnFullScreenOnOrOff"-->
  <!--    ></div>-->
  <!--  </div>-->
  <!--</div>-->
  <!--<el-dialog v-model="isExceedLimit" title="提醒" width="450" :before-close="handleClose">-->
  <!--  <h3>该账号登录人数超过限制您已下线，请重新登录。</h3>-->
  <!--  <p>（若账号安全度降低，请及时修改密码）</p>-->
  <!--  <template #footer>-->
  <!--    <div class="dialog-footer">-->
  <!--      <el-button @click="handleClose">知道了</el-button>-->
  <!--    </div>-->
  <!--  </template>-->
  <!--</el-dialog>-->
</template>

<style scoped lang="scss">
h3,
p,
.dialog-footer {
  text-align: center;
}

.slides {
  &-card {
    display: flex;
    align-items: center;
    position: relative;
    top: calc(-68px + 16.5px);
    height: 68px;
    float: right;

    &-btn {
      @include flex-center();
      width: 182px;
      height: 48px;
      background: #66a8f5;
      border-radius: 31px;

      img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
        object-fit: cover;
      }

      div {
        color: #ffffff;
        font-weight: 500;
        font-size: 22px;
      }
    }

    &-download {
      position: absolute;
      left: -84px;
      top: 68px;
      z-index: -1;
      width: 350px;
      height: 500px;
      opacity: 0;

      .btn {
        position: absolute;
        top: 38.5px;
        right: 20px;
        z-index: 10;
        width: 22px;
      }

      .poster {
        position: relative;
        width: 350px;
        height: 500px;
        overflow: hidden;
        border-radius: 10px;

        &-bgi {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &-title {
          position: relative;
          z-index: 9;
          margin-left: 20px;
          margin-top: 20px;
          height: 33px;
          font-size: 24px;
          font-weight: 600;
          color: #333333;
          line-height: 33px;
        }

        &-name {
          position: relative;
          z-index: 9;
          margin-top: 5px;
          margin-left: 20px;
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #333333;
          line-height: 22px;
        }

        &-code {
          position: relative;
          z-index: 9;
          margin: 96px auto 0;
          display: block;
          width: 122px;
          height: 122px;
          object-fit: cover;
        }
      }
    }
  }

  &-card:hover {
    .slides-card-download {
      z-index: 2;
      opacity: 1;
    }
  }

  &-h5 {
    position: relative;
    width: 1200px;
    height: 728px;

    &-iframe {
      width: 100%;
      height: 100%;
    }

    &-btn {
      position: absolute;
      top: 92.7%;
      right: 1.83%;
      width: 45px;
      height: 45px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .fullScreen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
