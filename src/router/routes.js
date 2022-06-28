
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/finance', component: () => import('pages/Finance/index.vue') },
      { path: '/projects', component: () => import('src/pages/Project/List.vue') },
      { path: '/id', component: () => import('src/pages/Project/Id.vue') },
      { path: '/contractor', component: () => import('src/pages/Contractor/Index.vue') },
      { path: '/clients', component: () => import('src/pages/Сlients/Index.vue') },
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
