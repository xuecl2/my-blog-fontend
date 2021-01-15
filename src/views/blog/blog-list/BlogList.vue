<template>  
  <div class="container">
    <div class="col-18 article">
      <article-card :articleList="blogList" @article-view="toBlogView"></article-card>
    </div>
    <el-card class="col-6 index" v-if="$store.getters.clinetScreenSizeType==='PC'">
      <el-input placeholder="请输入搜索条件" v-model="queryCondition"></el-input>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="queryBlogList">搜索</el-button>
      <br/>
      <a href="#">网站开发记录</a>
    </el-card>
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
          this.$message.warning('无满足条件的记录')
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
    width: 1024px;
    margin: 0 auto;
    display: flex;
  }
</style>
