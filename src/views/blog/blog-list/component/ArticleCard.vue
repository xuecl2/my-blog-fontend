<template>
  <div class="article-card-container position-relative">
    <div class="card article-card mb-1 ignore"  v-for="item in newArticleList" :key="item.id" @click="articleView(item.id)">
      <div class="card-body">
        <div class="content-title fs-5 fw-bolder">{{item.blogTitle}}</div>
        <div class="time">{{item.createDate}}</div>
        <div class="digest fw-bold">{{item.blogDigest}}</div>
      </div>
    </div>
    <div class="position-absolute card article-card mb-1 ignore invisible">
      <div class="card-body">
        <div class="digest fw-bold" ref="cal-size-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/commonUtils.js'

export default {
  props:{
    articleList: {type: Array, default: () => []},
  },

  data() {
    return {
      newArticleList: this.articleList,
    }
  },

  watch: {
    articleList: {
      handler: async function() {
        let articleList = this.articleList
        for(let i = 0; i < articleList.length; i++) {
          const article = articleList[i]
          let digest = article.blogDigest
          if(!article.blogDigest) digest = article.blog
          await this.$nextTick(() => article.blogDigest = utils.getMultipleLinesEclipseText(this.$refs['cal-size-box'], 3, digest)) 
        }
        this.newArticleList = articleList
      },
      immediate: true
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
  .ignore {
    max-height: 133px;
  }
  .overflow {
    text-overflow: ellipsis;
  }
</style>