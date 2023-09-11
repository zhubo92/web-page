import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImportTypes from 'auto-import-types';
import PiniaAutoRefs from 'pinia-auto-refs';
// https://vitejs.dev/config/

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build')
};
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        /**
         * 单行溢出隐藏 @include single-hide();
         *
         * 多行溢出隐藏 @include multi-hide(3);
         *
         * flex布局垂直水平居中 @include flex-center();
         *
         */
        additionalData: `
          @mixin flex-center() {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @mixin single-hide() {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          @mixin multi-hide($num) {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: $num;
          }
        `
      }
    }
  },
  plugins: [
    AutoImportTypes(),
    PiniaAutoRefs(),
    vue({
      // 默认开启响应性语法糖
      reactivityTransform: true
    }),
    vueJsx(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/stores/index': ['useStore']
        }
      ],
      // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
      eslintrc: {
        enabled: true,
        // 配置文件的位置
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    host: true,
    port: 9898,
    proxy: {
      '/zd-api': {
        target: 'https://open.api.luojigou.vip',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zd-api/, '')
      }
    }
  },
  resolve: {
    alias,
    // 使用路径别名时想要省略的后缀名，可以自己 增减
    extensions: ['.js', '.json', '.ts', '.vue']
  }
});
