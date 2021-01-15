import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/blog/list'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/manage',
  //   name: 'BlogManagement',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "BlogManagement" */ '../views/query-blog/BlogManagement.vue')
  // },
  // {
  //   path: '/edit/id',
  //   name: 'Edit',
  //   props: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "edit" */ '../views/edit-blog/EditBlog.vue')
  // },  
  {
    path: '/blog/list',
    name: 'BlogList',
    component: () => import(/* webpackChunkName: "edit" */ '../views/blog/blog-list/BlogList.vue')
  },
  {
    path: '/blog/',
    redirect: '/blog/list'
  },
  {
    path: '/blog/view/:blogid',
    name: 'BlogView',
    props: true,
    component: () => import(/* webpackChunkName: "edit" */ '../views/blog/blog-view/BlogView.vue')
  },
  {
    path: '/blog/edit/:blogid',
    name: 'BlogEdit',
    props: true,
    component: () => import(/* webpackChunkName: "edit" */ '../views/blog/blog-edit/BlogEdit.vue')
  },
  {
    path: '/checklist/',
    name: 'CheckList',
    component: () => import(/* webpackChunkName: "edit" */ '../views/check-list/CheckList.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
