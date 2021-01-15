<template>
    <div>
      <div ref="editor"></div>  
    </div>
</template>

<script>
// 此组件的目的是将tui-editor包装成一个vue组件
// @ is an alias to /src
import Editor from '@toast-ui/editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style

// for using editor-plugin-code-syntax-highlight plugin, You need to import the language files you want to use in the code block and register them in the hightlight.js object. A list of available language files can be found here.
// Step 1. Import highlight.js
import hljs from 'highlight.js'; // The code-syntax-highlight plugin has highlight.js as a dependency
import 'highlight.js/styles/github.css'; // HighLight.js' Dependency Style
// Step 2. Import language files of highlight.js that you need
// import javascript from 'highlight.js/lib/languages/javascript';
// import clojure from 'highlight.js/lib/languages/clojure';
// // Step 3. Register languages
// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('clojure', clojure);

export default {
  name: 'TuiEditor',
  data(){
    return{
      editor: null,
    }
  },
  props:{
    height: {type: String, default: '420px'},
    previewStyle: {type: String, default: 'vertical'},
    initialValue: {type: String, default: ''},
    initialEditType: {type: String, default: 'markdown'},
    initText: {type: String, default: ''},
    plugins: {type: Array, default: ()=> [codeSyntaxHightlight,{hljs}]},
    foucsHandler: {type: Function, default: () => () => {}},
    blurHandler: {type: Function, default: () => () => {}},
    imgUploadHandler: {type: Function, default: null},
  },
  mounted(){
    // 初始化tui-editor
    this.editor = Editor.factory({
      el: this.$refs.editor,
      previewStyle: this.previewStyle,
      height: this.height,
      initialValue: this.initText,
      initialEditType: this.initialEditType,
      plugins: this.plugins,
    })  
    this.editor.on('focus',this.foucsHandler)
    this.editor.on('blur',this.blurHandler)
    if(this.imgUploadHandler) this.editor.addHook('addImageBlobHook', this.imgUploadHandler)
  },
  methods:{
    getMarkdown(){
      return this.editor.getMarkdown()
    },
    setMarkdown(markdownString){
      this.editor.setMarkdown(markdownString)
    },
  },
}
</script>

<style scoped>

</style>
