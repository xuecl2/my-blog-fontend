import Vue from 'vue'
import VueRouter from 'vue-router'
import pageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    redirect: '/blog',
  },

  { 
    path: '/login/:name', 
    props: true,
    name: 'Login',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Login.vue'),
  },

  {
    path: '/blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/blog/Blog.vue'),
    children: [
      {
        path: '',
        redirect: 'list'
      },

      {
        path: 'list',
        name: 'BlogList',
        component: () => import(/* webpackChunkName: "blog-list" */ '../views/blog/blog-list/BlogList.vue')
      },

      {
        path: 'view/:blogid',
        name: 'BlogView',
        props: true,
        component: () => import(/* webpackChunkName: "blog-view" */ '../views/blog/blog-view/BlogView.vue')
      },

      {
        path: 'edit/:blogid',
        name: 'BlogEdit',
        props: true,
        component: () => import(/* webpackChunkName: "blog-edit" */ '../views/blog/blog-edit/BlogEdit.vue')
      },
    ]
  },

  { 
    path: '/about', 
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  { 
    path: '*', 
    name: 'pageNotFound',
    component: pageNotFound
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
