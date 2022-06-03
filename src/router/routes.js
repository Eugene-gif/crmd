
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/finance', component: () => import('pages/Finance/index.vue') },
      { path: '/projects', component: () => import('src/pages/Project/list.vue') },
      { path: '/id', component: () => import('src/pages/Project/Id.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
