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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
      },
      { 
        path: '/finance',
        component: () => import('pages/Finance/index.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
      },
      { 
        path: '/projects',
        component: () => import('src/pages/Project/List.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
      },
      { 
        path: '/id',
        component: () => import('src/pages/Project/Id.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
      },
      { 
        path: '/contractor',
        component: () => import('src/pages/Contractor/Index.vue'),
        meta: {
          requireLogin: true,
          role: 3
        }
      },
      { 
        path: '/contractor/:id',
        component: () => import('src/pages/Contractor/Id.vue'),
        meta: {
          requireLogin: true,
          role: 3
        }
      },
      { 
        path: '/contractor/profile/:id',
        component: () => import('src/pages/Contractor/Profile.vue'),
        meta: {
          requireLogin: true,
          role: 3
        }
      },
      { 
        path: '/designer/profile/:id',
        component: () => import('src/pages/Designer/Profile.vue'),
        meta: {
          requireLogin: true,
          role: 2
        }
      },
      { 
        path: '/clients',
        component: () => import('src/pages/Сlients/Index.vue'),
        meta: {
          requireLogin: true,
          role: 2
        }
      },
      { 
        path: '/clients/:id',
        component: () => import('src/pages/Сlients/Id.vue'),
        meta: {
          requireLogin: true,
          role: 2
        }
      },
      { 
        path: '/estimates/:id',
        component: () => import('src/pages/Estimates/Id.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
      },
      { 
        path: '/estimates',
        component: () => import('src/pages/Estimates/Index.vue'),
        meta: {
          requireLogin: true,
          role: [2,3]
        }
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
