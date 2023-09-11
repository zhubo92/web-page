/**
 * 全局loading
 */

import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading';

class Loading {
  constructor() {}

  #loadingInstance: LoadingInstance | null = null;

  #loadingCount: number = 0;

  start = (title?: string) => {
    this.#loadingInstance = ElLoading.service({ text: title });
    this.#loadingCount++;
  };

  close = () => {
    this.#loadingCount--;

    if (this.#loadingCount === 0) {
      if (this.#loadingInstance) this.#loadingInstance.close();
      this.#loadingInstance = null;
    }
  };
}

const loading: Loading = new Loading();

export default loading;
