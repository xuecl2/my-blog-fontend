<template>
    <div class="container">
      <div ref="viewer" v-show="false"></div>  
      
      <div ref="article" class='tui-editor-contents col-16'></div>  
      <div class="js-toc col-7"></div>
    </div>
</template>

<script>
// 此组件的目的是将tui-editor包装成一个vue组件
// @ is an alias to /src
// import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import Editor from '@toast-ui/editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import hljs from 'highlight.js'; // The code-syntax-highlight plugin has highlight.js as a dependency
import 'highlight.js/styles/github.css'; // HighLight.js' Dependency Style
import tocbot from 'tocbot'
// import 'tocbot/dist/tocbot.css'
import 'tocbot/dist/styles.css'

export default {
  name: 'TuiEditor',
  data(){
    return{
      viewer: null,
      headdingselect: ['h1','h2','h3','h4','h5','h6'],
      articleContalnerClassName: 'tui-editor-contents'
    }
  },
  props:{
    height: {type: String, default: '420px'},
    previewStyle: {type: String, default: 'vertical'},
    initialValue: {type: String, default: ''},
    initialEditType: {type: String, default: 'markdown'},
    initText: {type: String, default: ''},
    plugins: {type: Array, default: ()=> [codeSyntaxHightlight,{hljs}]},
  },
  mounted(){
    // 初始化tui-editor
    this.viewer = new Editor({
      el: this.$refs.viewer,
      previewStyle: this.previewStyle,
      height: this.height,
      initialValue: this.initText,
      initialEditType: this.initialEditType,
      plugins: this.plugins,
    })  
  },
  methods:{
    setMarkdown(markdownString){
      this.viewer.setMarkdown(markdownString)
    },
    getToc() {
      this.$refs.article.innerHTML = this.viewer.getHtml()
      this.addIdOnHeader()
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.' + this.articleContalnerClassName,
        // Which headings to grab inside of the contentSelector element.
        headingSelector: this.headdingselect.join(','),
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
      })
    },
    addIdOnHeader() {
      let count = 0
      let tag = 'toc'
      document.querySelectorAll(this.headdingselect.map(tagName => `.${this.articleContalnerClassName} ${tagName}`).join(',')).forEach(domElement => {
        domElement.id = `${tag}${count++}`
      })
    }
  },
}
</script>

<style scoped>
  .container{
    display: flex;
  }

  .js-toc {
    margin-left: 40px;
    border-left: 1px solid black;
  }
</style>
