<template>
  <div class="article-card-container position-relative">
    <div class="card article-card mb-1" v-for="item in newArticleList" :key="item.id" @click="articleView(item.id)">
      <div class="card-body py-2">
        <div class="content-title fw-bolder">{{item.blogTitle}}</div>
        <div class="time">{{item.createDate | timeFormatter}}</div>
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
          if(!article.blogDigest) digest = article.blogContent
          await this.$nextTick(() => article.blogDigest = utils.getMultipleLinesEclipseText(this.$refs['cal-size-box'], 3, digest)) 
        }
        this.newArticleList = articleList
      },
      immediate: true
    }  
  },

  filters: {
    timeFormatter(time) {
      return time.slice(0, 4) + '-' + time.slice(4, 6) + '-' + time.slice(6, 8)
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
    border-left: none;
    border-right: none;
    border-top: none;
    box-shadow: none;
  }

  .overflow {
    text-overflow: ellipsis;
  }

  .content-title {
    font-size: 1.5em;
  }

  .time {
    font-size: .8em;
    font-weight: light;
    font-style: italic;
  }

  .digest {
    font-size: 1em;
  }
</style>