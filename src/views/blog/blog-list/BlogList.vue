<template>  
  <div class="container">
    <div class="col-9 me-4 article">
      <article-card :articleList="blogList" @article-view="toBlogView"></article-card>
    </div>
    <div class="card col-3 index">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="输入关键词查询">
          <button class="btn btn-dark text-light" type="button">查询</button>
        </div> 
      </div>
    </div>
    <a v-if="user.logon" class="quick-add-btn ignore" href="#" @click="dialogVisible = true">
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
import {user} from '@/global/globalVariable.js'

export default {
  components: { ArticleCard, BlogModificationDialog },
  name: 'App',  
  data(){
    return {
      queryParams: {},
      blogList: [],
      queryCondition: '',
      dialogVisible: false,
      user,
    }
  },
  created() {
    this.queryBlogList()
  },
  methods: {
    queryBlogList() {
      this.$loading.show()
      this.queryParams.keyWord = this.queryCondition
      request(new queryBlogListRequest(this.queryParams)).then(data => {
        this.blogList = data.resultList
        if(this.blogList.length == 0){
          this.$toast.warning('无满足条件的记录')
        }
        this.$loading.hide()
      }).catch(err => {
        console.error(err)
        this.$nextTick().then(this.$loading.hide())
      })
    },
    toBlogView(id) {
      this.$router.push({name: 'BlogView', params: {blogid: id.toString()}})
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
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
  .ignore {
    height: 52px;
    width: 52px;
    line-height: 52px;
  }
  .bi.bi-plus::before {
    line-height: inherit;
  }
</style>
