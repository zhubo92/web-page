import html2canvas from 'html2canvas';

export function getImageUrl(name: string) {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href;
}

/**
 * 文件地址中有中文或者空格，需要编码
 */
export function imgUrlEncode(imgUrl: string): string {
  if (imgUrl) {
    if (imgUrl.indexOf('https') !== -1) imgUrl.replace(/https/, 'http');
    const imgArr = imgUrl.split('/');
    return imgUrl.split(imgArr[3])[0] + encodeURIComponent(imgArr[3]);
  }
  return '';
}

async function convertToImage(element: HTMLElement) {
  return html2canvas(element, {
    scale: 4,
    width: element.offsetWidth,
    height: element.offsetHeight,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null
  }).then((canvas) => {
    return canvas.toDataURL('image/png');
  });
}
/**
 * 下载 dom 截图
 */
export async function downloadScreenshotFn(id = 'poster') {
  const element = document.getElementById(id);
  console.log(element, 'element');
  if (element) {
    const imgBlobData = await convertToImage(element);
    const el = document.createElement('a');
    el.href = imgBlobData;
    el.download = 'poster.png';
    const event = new MouseEvent('click');
    el.dispatchEvent(event);
  }
}

/**
 * 浏览器开启全屏
 */
export function openFullscreen() {
  if (document.documentElement?.requestFullscreen) {
    document.documentElement?.requestFullscreen();
  } else if (document.documentElement?.mozRequestFullScreen) {
    /* Firefox */
    document.documentElement?.mozRequestFullScreen();
  } else if (document.documentElement?.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    document.documentElement?.webkitRequestFullscreen();
  } else if (document.documentElement?.msRequestFullscreen) {
    /* IE/Edge */
    document.documentElement?.msRequestFullscreen();
  }
}

/**
 * 浏览器关闭全屏
 */
export function closeFullscreen() {
  if (document?.exitFullscreen) {
    document?.exitFullscreen();
  } else if (document?.mozCancelFullScreen) {
    document?.mozCancelFullScreen();
  } else if (document?.webkitExitFullscreen) {
    document?.webkitExitFullscreen();
  } else if (document?.msExitFullscreen) {
    document?.msExitFullscreen();
  }
}
