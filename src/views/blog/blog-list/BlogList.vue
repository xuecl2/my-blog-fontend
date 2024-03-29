<template>  
  <div class="container position-relative p-0 ignore">
    <div class="row w-100 gx-0 gx-md-5">
      <div class="col-12 col-lg-7 article">
        <form class="d-lg-none input-group mb-3 position-sticky start-0 px-2" @submit.prevent="queryBlogList(1)">
          <input type="text" class="form-control" v-model="queryCondition" placeholder="输入关键词查询">
          <button class="btn btn-dark text-light" type="button">查询</button>
        </form> 
        <article-card class="mb-3" :articleList="blogList" @article-view="toBlogView"></article-card>
        <pagination :total-pages="totalPages" :current-page="currentPage" @click="queryBlogList"></pagination>
      </div>
      <div class="col-5 index d-none d-lg-block">
        <div class="card-body">
          <form class="input-group mb-3 ps-5" @submit.prevent="queryBlogList(1)">
            <input type="text" class="form-control" v-model="queryCondition" placeholder="输入关键词查询">
            <button class="btn btn-dark text-light" type="button">查询</button>
          </form> 
        </div>
      </div>
    </div>
    <a v-if="user.name" class="quick-add-btn ignore" href="#" @click="dialogVisible = true">
      <i class="bi bi-plus fs-1"></i>
    </a>
    <blog-modification-dialog :dialogVisible.sync="dialogVisible" @refresh="queryBlogList"></blog-modification-dialog>
  </div>
</template>

<script>
import {queryBlogListRequest} from '@/api/blog.js'
import request from '@/request/commonRequest'
import ArticleCard from './component/ArticleCard.vue'
import BlogModificationDialog from '@/components/BlogModificationDialog'
import Pagination from '@/components/Pagination'

export default {
  name: 'BlogList',  

  components: { ArticleCard, BlogModificationDialog, Pagination },
  
  data() {
    return {
      queryParams: {},
      blogList: [],
      queryCondition: '',
      dialogVisible: false,
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
      pageSize: 5,
      currentPage: 1,
      totalPages: 0,
    }
  },

  computed: {
  },

  created() {
    this.queryBlogList(this.currentPage)
  },

  methods: {
    queryBlogList(pageNo) {
      this.$loading.show()
      this.queryParams.rowsPerPage = this.pageSize
      this.queryParams.pageNo = pageNo - 1
      this.queryParams.queryCondition = this.queryCondition
      request(new queryBlogListRequest(this.queryParams)).then(data => {
        this.blogList = data.resultList
        if(this.blogList.length == 0){
          this.$toast.warning('无满足条件的记录')
        }
        this.$loading.hide()
        this.currentPage = pageNo
        this.totalPages = Math.ceil(data.totalRows / this.pageSize)
      }).catch(err => {
        console.error(err)
        this.$nextTick().then(this.$loading.hide())
      })
    },

    toBlogView(id) {
      this.$router.push({name: 'BlogView', params: {blogid: id.toString()}})
    },
  }
}
</script>

<style scoped>
  .container {
    display: flex;
  }

  .container.ignore {
    max-width: 1024px;
  }

  .quick-add-btn:hover {
    color: var(--bg-primary);
    background: var(--nav-color);
  }

  .quick-add-btn {
    position: fixed;
    display: block;
    right: 100px;
    bottom: 30px;
    border-radius: 100%;
    background-color: var(--brand-primary);
    color: var(--bg-primary);
    text-align: center;
    font-size: 0;
    box-shadow: 0 3px 15px -2px rgb(37 45 51 / 40%);
    transition: all .15s ease-in;
    text-decoration: none;
  } 

  .quick-add-btn.ignore {
    height: 52px;
    width: 52px;
    line-height: 52px;
  }

  .bi.bi-plus::before {
    line-height: inherit;
  }
</style>
