import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import pageNotFound from '../views/404.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/blog/list',
          name: 'BlogList',
          component: () => import(/* webpackChunkName: "blog-list" */ '../views/blog/blog-list/BlogList.vue')
        },
        {
          path: '/blog/view/:blogid',
          name: 'BlogView',
          props: true,
          component: () => import(/* webpackChunkName: "blog-view" */ '../views/blog/blog-view/BlogView.vue')
        },
        {
          path: '/blog/edit/:blogid',
          name: 'BlogEdit',
          props: true,
          component: () => import(/* webpackChunkName: "blog-edit" */ '../views/blog/blog-edit/BlogEdit.vue')
        },
      ]
    },
    { 
      path: '*', 
      name: pageNotFound,
      component: pageNotFound
    }
  ]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
