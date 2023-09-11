import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/demo/DemoView.vue')
    },
    {
      path: '/slides',
      name: 'slides',
      component: () => import('@/views/slides/SlidesView.vue')
    }
  ]
});

export default router;
