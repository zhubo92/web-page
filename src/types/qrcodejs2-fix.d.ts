declare module 'qrcodejs2-fix' {
  declare class QRCode {
    constructor(el: HTMLElement, options?: QRCodeOptions);

    makeCode(text: string): void;

    // 其他方法
  }

  export function toDataURL(text: string, options?: any): string;

  interface QRCodeOptions {
    // ...
  }

  export default QRCode;
}
