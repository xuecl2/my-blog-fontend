<template>  
  <div class="container">
    <div class="col-9 me-4 article">
      <article-card :articleList="blogList" @article-view="toBlogView"></article-card>
    </div>
    <div class="card col-3 index">
      <div class="card-body">
        <input placeholder="请输入搜索条件" v-model="queryCondition"/>
        <button class="btn btn-primary btn-sm" @click="queryBlogList">搜索<i class="fa fa-search"></i></button>
        <br/>
        <a href="#">网站开发记录</a>
      </div>
    </div>
  </div>
</template>

<script>
import {queryBlogListRequest} from '@/api/blog.js'
import request from '@/request/commonRequest'
import ArticleCard from './component/ArticleCard.vue'

export default {
  components: { ArticleCard },
  name: 'App',  
  data(){
    return {
      queryParams: {},
      blogList: [],
      queryCondition: '',
    }
  },
  created() {
    this.queryBlogList()
  },
  methods: {
    queryBlogList() {
      this.queryParams.keyWord = this.queryCondition
      request(new queryBlogListRequest(this.queryParams)).then(data => {
        this.blogList = data.resultList
        if(this.blogList.length == 0){
          this.$toast.warning('无满足条件的记录')
        }
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
</style>
