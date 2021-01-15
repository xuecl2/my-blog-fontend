<template>
  <div class="article-card-container">
    <el-card class="article-card" v-for="item in articleList" :key="item.id" @click.native="articleView(item.id)">
      <div class="title">{{item.blogTitle}}</div>
      <div class="time">{{item.createDate}}</div>
      <div class="digest">{{item.blogDigest}}</div>
    </el-card>
  </div>
</template>

<script>
export default {
   props:{
    articleList: {type: Array, default: () => []},
  },
  data() {
    return {
        
    }
  },
  methods: {
    articleView(id) {
      this.$emit('article-view', id)
    },
  },
}
</script>

<style scoped>
  .article-card {
    cursor: pointer;
  }
</style>