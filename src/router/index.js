import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'


export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    // const auth = store.state.auth
    // if (to.matched.some(record => record.meta.requireLogin) && !auth.isAuthenticated) {
    //   next({path: '/login'})
    // } else {
    //   next()
    // }

    const auth = store.state.auth
    const role = store.state.auth.me ? store.state.auth.me.role : undefined

    if (to.meta.requireLogin && !auth.isAuthenticated) {
      next({ path: '/login' })
    } else {
      const requiredRole = to.meta.role

      console.log(requiredRole)
      next()
      
      // if (requiredRole === 'designer' && role !== undefined) {
      //   next({ path: '/' })
      // } else if (requiredRole === 'contractor' && role !== undefined) {
      //   next({ path: '/' })
      // } else {
      //   next()
      // }
      
    }
  })

  return Router
})
