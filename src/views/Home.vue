<template>
  <div class="home">
    <el-date-picker type="date" v-model="date" placeholder="请选择日期"></el-date-picker>
    <br/>
    <a :href="downloadUrl" :download="downloadedFilename">备份文件下载</a>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Editor from '@toast-ui/editor';
// import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
// import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
// import myUploader from '@/components/MyUploader.vue'

export default {
  name: 'Home',
  components: {
    
  },
  data(){
    return {
      date: new Date()
    }
  },
  computed: {
    dateString() {
      return this.date.toISOString().split('T')[0].split('-').join('')
    },
    downloadedFilename() {
      return `backup_${this.dateString}.sql`
    },
    /* eslint-disable */
    downloadUrl() {
      return `${evnConfig.sqlDownloadUrl}/${this.dateString}`
    },
    /* eslint-enable */
  },
  methods: {
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
