<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal = "false" :close-on-press-escape = "false" @open = "init()">
    <template #title>{{operation | operationFilter}}</template>
    <el-card>
      <el-form :model="blogObjectCopy" label-width="60px">
        <el-row :gutter="60">
          <el-col :span = "12">
            <el-form-item label = "标题" prop="title" >
              <el-input size = "small" v-model="blogObjectCopy.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span = "12">
            <el-form-item label = "关键词" prop="keyWord">
              <el-input size = "small" v-model="blogObjectCopy.keyWord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span = "24">
            <el-form-item label = "摘要" prop="digest">
              <el-input size = "small" type = "textarea" :rows="4"  v-model="blogObjectCopy.digest"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type = "flex" justify="end">
          <el-col :span ="6">
            <el-button type="primary" @click="save()">确定</el-button>
            <el-button type="primary" @click="cancel()">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </el-dialog>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Editor from '@toast-ui/editor';
// import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
// import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import request from '@/request/commonRequest'
import utils from '@/global/utils/utils'

const operationMap = {
  add: '新增文章',
  modify: '修改文章'
}
export default {  
  name: 'BlogModificationDialog',
  components: {
  },
  props:{
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    blogObject: {
      type: Object,
      default: function(){
        return {
          title: '',
          keyWord: '',
          digest: '',
          id: '',
        }       
      }        
    }
  },
  filters: {
    operationFilter(value){
      return operationMap[value]
    }
  },
  data(){
    return {
      operation: '',  // 当前dialog执行的操作是新增还是修改
      blogObjectCopy: {}  // 传入的blog对象的副本，避免组件内部直接改变原对象
    }
  },
  methods: {
    save(){
      switch (this.operation) {
        case 'add':
          this.add()
          break;
        case 'modify':
          this.modify()
          break;
        default:
          break;
      }
      
    },
    add() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      requestData.operation = 'save'
      request(requestData).then((data) => {
        this.$message.success('添加成功！')
        this.$router.push({name: 'Edit', params: {id: data.id}})
      })
    },
    modify() {
      let requestData = JSON.parse(JSON.stringify(this.blogObjectCopy))
      requestData.user = 'xuecl'
      requestData.operation = 'save'
      request(requestData).then(() => {
        this.$message.success('修改成功')
        this.$emit('refresh-table')
        this.cancel()
      })
    },
    cancel() {
      this.$emit('close-dialog')
    },
    init(){
      this.blogObjectCopy = JSON.parse(JSON.stringify(this.blogObject))
      if(utils.isBlank(this.blogObjectCopy.id)){
        this.operation = 'add'
      }else {
        this.operation = 'modify'
      }
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
