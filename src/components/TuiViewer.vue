<template>
    <div>
      <div ref="viewer"></div>  
    </div>
</template>

<script>
// 此组件的目的是将tui-editor包装成一个vue组件
// @ is an alias to /src
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import hljs from 'highlight.js'; // The code-syntax-highlight plugin has highlight.js as a dependency
import 'highlight.js/styles/github.css'; // HighLight.js' Dependency Style

export default {
  name: 'TuiEditor',
  data(){
    return{
      viewer: null,
    }
  },
  props:{
    height: {type: String, default: '420px'},
    previewStyle: {type: String, default: 'vertical'},
    initText: {type: String, default: ''},
    plugins: {type: Array, default: ()=> [codeSyntaxHightlight,{hljs}]},
  },
  mounted(){
    // 初始化tui-editor
    this.viewer = new Viewer({
      el: this.$refs.viewer,
      previewStyle: this.previewStyle,
      height: this.height,
      initialValue: this.initText,
      plugins: this.plugins,
    })  
  },
  methods:{
    setMarkdown(markdownString){
      this.viewer.setMarkdown(markdownString)
    },
  },
}
</script>

<style scoped>

</style>
