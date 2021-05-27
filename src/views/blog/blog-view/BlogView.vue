<template>
  <div class='container'>
    <div class="row">
      <div class="col me-end">
        <div class="ms-3 fs-4 fw-bolder ">{{ blogObject.title }}</div>
      </div>
      <div class="col-auto">
        <div class="btn-group btn-row mb-1" role="group" aria-label="Basic example">
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
    <blog-modification-dialog :dialogVisible="dialogVisible" @close-dialog="closeDialog" 
      :blogObject="blogObject" @refresh="refresh"></blog-modification-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogModificationDialog from '@/components/BlogModificationDialog'
import TuiViewer from '@/components/TuiViewer.vue'
import request from '@/request/commonRequest.js'
import utils from '@/utils/commonUtils'
import {queryDetailBlogInfo} from '@/api/blog.js'
import {deleteBlog} from '@/api/blog.js'

export default {
  name: 'EditBlog',
  components: {
    TuiViewer,BlogModificationDialog
  },
  data(){
    return {
      blogObject: {},
      dialogVisible: false,
      id: parseInt(this.blogid)
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
      request(new queryDetailBlogInfo({id: this.id})).then(({blogObject}) => {
        this.blogObject = {
          id: blogObject.id,
          title: blogObject.blogTitle,
          keyWord: blogObject.blogKeyWord,
          content: blogObject.blogContent,
          digest: blogObject.blogDigest,
        }
        this.$refs.editor.setMarkdown(this.blogObject.content)
        this.$loading.hide()
      }).catch(err => {
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
      this.$message('确定删除文章？', {buttonClose: true}).then(() => {
        request(new deleteBlog({id: this.id})).then(() => {
          this.$toast.success('删除成功')
          this.$router.push({name:'BlogList'})
        })
      })
    }
  },
  
}
</script>

<style scoped>
  .header .article-title {
    text-align: center;
  }
  .btn-row {
    display: block;
    text-align: right;
  }
</style>
