const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      requireLogin: false
    },
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('pages/Auth/Login.vue')
      },
      {
        path: '/register',
        component: () => import('pages/Auth/Register.vue')
      },
      {
        path: '/loading',
        component: () => import('pages/Auth/Loading.vue')
      },
      {
        path: '/role',
        component: () => import('pages/Auth/Role.vue')
      },
      {
        path: '/reset',
        component: () => import('pages/Auth/Reset.vue')
      },
      {
        path: '/pass',
        component: () => import('pages/Auth/Pass.vue')
      },
      {
        path: '/setemail',
        component: () => import('pages/Auth/SetEmail.vue')
      },
      {
        path: '/resetpass',
        component: () => import('pages/Auth/resetPass.vue')
      },
    ]
  },
  {
    path: '/',
    meta: {
      requireLogin: true
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/Index.vue') 
      },
      { 
        path: '/finance',
        component: () => import('pages/Finance/index.vue') 
      },
      { 
        path: '/projects',
        component: () => import('src/pages/Project/List.vue') 
      },
      { 
        path: '/id',
        component: () => import('src/pages/Project/Id.vue') 
      },
      { 
        path: '/contractor',
        component: () => import('src/pages/Contractor/Index.vue') 
      },
      { 
        path: '/contractor/:id',
        component: () => import('src/pages/Contractor/Id.vue') 
      },
      { 
        path: '/contractor/profile/:id',
        component: () => import('src/pages/Contractor/Profile.vue') 
      },
      { 
        path: '/clients',
        component: () => import('src/pages/Сlients/Index.vue') 
      },
      { 
        path: '/estimates/:id',
        component: () => import('src/pages/Estimates/Id.vue') 
      },
      { 
        path: '/estimates',
        component: () => import('src/pages/Estimates/Index.vue') 
      },
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
