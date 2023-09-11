import '@/styles/reset.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/common.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
