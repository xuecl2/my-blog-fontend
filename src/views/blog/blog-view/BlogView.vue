<template>
  <div class='container'>
    <div class="header">
      <h1 class="title">{{blogObject.title}}</h1>
      <div class="button-row" v-show="true">
        <el-button type="primary" size="mini" icon="fa fa-edit" @click.native="dialogVisible=true"> 修改</el-button>
        <el-button type="primary" size="mini" icon="fa fa-edit" @click.native="edit()"> 编辑</el-button>
        <el-button type="primary" size="mini" icon="fa fa-trash" @click.native="remove()"> 删除</el-button>
      </div>
    </div>
    <el-card>
      <tui-viewer ref="editor"></tui-viewer>
    </el-card>
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
      this.$message.error('id为空，请重新发起请求')
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
        this.$nextTick(() => {
          this.$refs.editor.getToc()
        })
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
        this.$message.success('删除成功')
        this.$router.push({name:'BlogList'})
      })
    }
  },
  
}
</script>

<style lang="less" scoped>
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
</style>
