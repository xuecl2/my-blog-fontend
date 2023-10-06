<template>
  <div class='container'>
    <div class="row">
      <div class="col me-end">
        <div class="ms-3 fs-4 fw-bolder ">{{ blogObject.title }}</div>
      </div>
      <div class="col-auto">
        <div v-if="user.name" class="btn-group btn-row mb-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-dark" @click="dialogVisible=true">修改</button>
          <button type="button" class="btn btn-dark" @click="edit()">编辑</button>
          <button type="button" class="btn btn-dark" @click="remove()">删除</button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <tui-viewer ref="editor"></tui-viewer>
      </div>
    </div>
    <blog-modification-dialog :dialogVisible.sync="dialogVisible" 
      :blogObject="blogObject" @refresh="refresh"></blog-modification-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogModificationDialog from '@/views/article/components/ArticleModificationDialog'
import TuiViewer from '@/components/TuiViewer.vue'
import utils from '@/utils/common-utils'
import * as articleApi from '@/api/article.js'

export default {
  name: 'ArticleView',
  components: {
    TuiViewer,BlogModificationDialog
  },
  data(){
    return {
      blogObject: {},
      dialogVisible: false,
      id: parseInt(this.blogid),
      user: sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{},
    }
  },
  props:{
    blogid: {type: String},
  },
  computed: {
  },
  created(){
    if(utils.isBlank(this.id)) {
      this.$toast.error('id为空，请重新发起请求')
      return
    }
    this.refresh()
  },
  methods:{
    refresh() {
      this.$loading.show()
      articleApi.getArticleDetail(this.id)
        .then(data => {
          this.blogObject = {
            id: data.id,
            title: data.blogTitle,
            keyWord: data.blogKeyWord,
            content: data.blogContent,
            digest: data.blogDigest,
          }
          this.$refs.editor.setMarkdown(this.blogObject.content)
          this.$loading.hide()
        })
        .catch(err => {
          console.error(err)
          this.$loading.hide()
        })
    },

    closeDialog() {
      this.dialogVisible = false
    },
    edit() {
      this.$router.push({name: 'BlogEdit', params: {blogObject: this.blogObject}})
    },
    remove() {
      this.$message('确定删除文章？', {buttonClose: true})
        .then(() => articleApi.deleteArticle(this.id))
        .then(() => {
          this.$toast.success('删除成功')
          this.$router.push({name:'BlogList'})
        })
    }
  },
  
}
</script>

<style scoped>
  .container {
    max-width: 1024px;
  }

  .header .article-title {
    text-align: center;
  }

  .btn-row {
    display: block;
    text-align: right;
  }

  /deep/ .tui-editor-contents ol > li::before {
    margin-left: -2.2em;
    width: 2em;
  }
</style>
