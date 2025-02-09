import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main-layout.vue'),
    children: [{ path: '', component: () => import('pages/index-page.vue') }],
  },
]

export default routes
