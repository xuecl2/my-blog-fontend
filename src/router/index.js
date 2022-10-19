import Vue from 'vue'
import VueRouter from 'vue-router'
import pageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    redirect: '/article',
  },

  { 
    path: '/login/:name', 
    props: true,
    name: 'Login',
    component: () => import(/* webpackChunkName: "article" */ '../views/Login.vue'),
  },

  {
    path: '/article',
    component: () => import(/* webpackChunkName: "article" */ '../views/article/Article.vue'),
    children: [
      {
        path: '',
        redirect: 'list'
      },

      {
        path: 'list',
        name: 'ArticleList',
        component: () => import(/* webpackChunkName: "article-list" */ '../views/article/article-list/ArticleList.vue')
      },

      {
        path: 'view/:blogid',
        name: 'ArticleView',
        props: true,
        component: () => import(/* webpackChunkName: "article-view" */ '../views/article/article-view/ArticleView.vue')
      },

      {
        path: 'edit/:blogid',
        name: 'ArticleEdit',
        props: true,
        component: () => import(/* webpackChunkName: "article-edit" */ '../views/article/article-edit/ArticleEdit.vue')
      },
    ]
  },

  {
    path: '/category',
    component: () => import(/* webpackChunkName: "category" */ '../views/category/Category.vue'),
    children: [
      {
        path: '',
        redirect: 'list'
      },

      {
        path: 'list',
        name: 'CategoryList',
        component: () => import(/* webpackChunkName: "category-list" */ '../views/category/category-list/CategoryList.vue')
      },

      // {
      //   path: 'edit',
      //   name: 'CategoryEdit',
      //   component: () => import(/* webpackChunkName: "category-edit" */ '../views/category/category-edit/CategoryEdit.vue')
      // },
    ]
  },

  { 
    path: '/css-demo', 
    component: () => import(/* webpackChunkName: "css-demo" */ '../views/css-demo/CssDemo.vue')
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
