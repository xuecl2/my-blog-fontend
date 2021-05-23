<template>
  <div class="article-card-container">
    <div class="card article-card mb-1"  v-for="item in articleList" :key="item.id" @click="articleView(item.id)">
      <div class="card-body">
        <div class="content-title">{{item.blogTitle}}</div>
        <div class="time">{{item.createDate}}</div>
        <div class="digest">{{item.blogDigest}}</div>
      </div>
    </div>
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