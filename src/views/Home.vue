<template>
  <div class="home">
    <my-uploader></my-uploader>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Editor from '@toast-ui/editor';
// import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
// import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import myUploader from '@/components/MyUploader.vue'

export default {
  name: 'Home',
  components: {
    myUploader
  },
  data(){
    return {
    }
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
