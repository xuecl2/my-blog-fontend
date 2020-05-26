<template>
  <div class="home">
    <!-- 查询参数部分 -->
    <el-card class="query-params-card">
      <el-form :inline = "true" :model = "queryParams" size = "small">
        <el-form-item :prop = "queryParams.title" label = "标题">
          <el-input v-model = "queryParams.title"></el-input>
        </el-form-item>
        <el-form-item :prop = "queryParams.keyWord" label = "关键字">
          <el-input v-model = "queryParams.keyWord" placeholder="关键词请以空格分隔"></el-input>
        </el-form-item>
        <el-form-item :prop = "queryParams.modifyDate" label = "修改日期">
          <el-date-picker class = "data-picker-input" v-model="queryParams.modifyDate" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyyMMdd"></el-date-picker>
        </el-form-item>
        <el-button type = "primary" size = "mini" icon = "fa fa-search" @click="query()"> 查询</el-button>
        <el-button type = "primary" size = "mini" icon = "fa fa-plus-circle" @click="add()"> 新增</el-button>
        <el-button type = "primary" size = "mini" icon = "fa fa-file-text-o" :disabled="!(currentSelection.length == 1)" @click="modify()"> 修改</el-button>
        <el-button type = "primary" size = "mini" icon = "fa fa-trash-o" :disabled="!(currentSelection.length == 1)" @click="remove()"> 删除</el-button>
      </el-form>
    </el-card>
    <!-- 查询结果展示部分 -->
    <el-card class="article-list-card">
      <el-table :data="articleList" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="blogTitle" label="标题" min-width="10"></el-table-column>
        <el-table-column prop="blogKeyWord" label="关键字" min-width="20"></el-table-column>
        <el-table-column prop="modifyUser" label="修改人" min-width="10"></el-table-column>
        <el-table-column prop="modifyDate" label="修改日期" min-width="10" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="blogDigest" label="摘要" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column width="80" label="操作">
          <template #default = "{row, $index}">
            <el-button type = "primary" size = "mini" @click="edit(row, $index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <blog-modification-dialog :dialogVisible = "dialogVisible" @close-dialog = "closeDialog" 
      :blogObject = "blogObject" @refresh-table = "query"></blog-modification-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Editor from '@toast-ui/editor';
// import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
// import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import request from '@/request/commonRequest'
import BlogModificationDialog from './component/BlogModificationDialog'

export default {
  name: 'BlogManagement',
  components: {
    BlogModificationDialog
  },
  data(){
    return {
      queryParams: {
        title: '',
        keyWord: '',
        modifyDate: '',
      },
      articleList: [],
      currentSelection: [],
      blogObject: null,
      dialogVisible: false,
    }
  },
  methods: {
    query() {
      let requestData = JSON.parse(JSON.stringify(this.queryParams))
      requestData.operation = 'query'
      request(requestData).then(data => {
        this.articleList = data.resultList
        if(this.articleList.length == 0){
          this.$message.warning('无满足条件的记录')
        }
      })
    },
    add() {
      this.blogObject = {}
      this.dialogVisible = true
    },
    modify() {
      let blogObject = {}
      blogObject.id = this.currentSelection[0].id
      blogObject.title = this.currentSelection[0].blogTitle
      blogObject.keyWord = this.currentSelection[0].blogKeyWord
      blogObject.digest = this.currentSelection[0].blogDigest
      this.blogObject = blogObject
      this.dialogVisible = true
    },
    remove() {
      let requestData = {
        id: this.currentSelection[0].id,
        operation: 'delete'
      }
      request(requestData).then(() => {
        this.$message.success('删除成功')
        this.query()
      })
    },
    edit(row) {
      this.$router.push({name: 'Edit', params: {id: row.id}})
    },
    handleSelectionChange(selection) {
      this.currentSelection = selection
    },
    closeDialog() {
      this.dialogVisible = false
    }, 
    dateFormat(row,col,value){
      return `${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6,8)}`
    },
  },
}
</script>

<style scoped>
  .query-params-card {
    margin-bottom: 5vh;
  }
  .data-picker-input {
    width: 180px !important;
  }
  .article-list-card {
    height: 70vh;
  }
</style>
