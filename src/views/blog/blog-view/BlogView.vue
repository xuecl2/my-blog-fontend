<template>
  <div class='container'>
    <div class="header">
      <h1 class="title">{{blogObject.title}}</h1>
      <div class="btn-group btn-row mb-1" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" @click="dialogVisible=true">修改</button>
        <button type="button" class="btn btn-primary" @click="edit()">编辑</button>
        <button type="button" class="btn btn-primary" @click="remove()">删除</button>
      </div>
      <!-- <div class="button-row" v-show="true">
        <button class="btn btn-primary btn-sm" @click="dialogVisible=true"><i class="fa fa-edit"></i> 修改</button>
        <button class="btn btn-primary btn-sm" @click="edit()"><i class="fa fa-edit"></i> 编辑</button>
        <button class="btn btn-primary btn-sm" @click="remove()"><i class="fa fa-trash"></i> 删除</button>
      </div> -->
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
import BlogModificationDialog from './component/BlogModificationDialog'
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
      request(new queryDetailBlogInfo({id: this.id})).then(({blogObject}) => {
        this.blogObject = {
          id: blogObject.id,
          title: blogObject.blogTitle,
          keyWord: blogObject.blogKeyWord,
          content: blogObject.blogContent,
          digest: blogObject.blogDigest,
        }
        this.$refs.editor.setMarkdown(this.blogObject.content)
      })
    },
    closeDialog() {
      this.dialogVisible = false
    },
    edit() {
      this.$router.push({name: 'BlogEdit', params: {blogid: this.blogid}})
    },
    remove() {
      request(new deleteBlog({id: this.id})).then(() => {
        this.$toast.success('删除成功')
        this.$router.push({name:'BlogList'})
      })
    }
  },
  
}
</script>

<style scoped>
  .container {
    width: 1024px;
    margin: 0 auto;
  }
  .el-button--mini{
    padding-left: 7px;
    padding-right: 7px;
  }
  .header {
    position: relative;
    width: 100%;
  }
  .header .title {
    text-align: center;
  }
  .header .button-row {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .btn-row {
    display: block;
    text-align: right;
  }
</style>
