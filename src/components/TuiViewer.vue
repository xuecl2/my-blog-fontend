<template>
  <div class="row">
    <div ref="viewer" v-show="false"></div>  
    <div class="col-9">
      <div ref="article" class='article-viewer-container tui-editor-contents'></div>  
    </div>
    <div class="col-3">
      <div class="toc position-sticky start-0"></div>
    </div>
  </div>
</template>

<script>
// 此组件的目的是将tui-editor包装成一个vue组件
// @ is an alias to /src
// import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import Editor from '@toast-ui/editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js'; // The code-syntax-highlight plugin has highlight.js as a dependency
import tocbot from 'tocbot'


export default {
  name: 'TuiEditor',
  data(){
    return{
      viewer: null,
      headdingselect: ['h1','h2','h3'],
      articleContalnerClassName: 'article-viewer-container'
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
      this.$nextTick(() => {
        this.getToc()
      })
    },
    getToc() {
      this.$refs.article.innerHTML = this.viewer.getHtml()
      this.addIdOnHeader()
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.' + this.articleContalnerClassName,
        // Which headings to grab inside of the contentSelector element.
        headingSelector: this.headdingselect.join(','),
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        // Class to add to list items.
        listItemClass: 'toc-list-item',
        // Class to add to active list items.
        activeListItemClass: 'is-active-li',
        // How many heading levels should not be collapsed.
        // For example, number 6 will show everything since
        // there are only 6 heading levels and number 0 will collapse them all.
        // The sections that are hidden will open
        // and close as you scroll to headings within them.
        collapseDepth: 0,
        headingsOffset: 40,
        scrollSmoothOffset: -40
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

// <style scoped src="codemirror/lib/codemirror.css"></style>
// <style scoped src="@toast-ui/editor/dist/toastui-editor.css"></style>
// <style scoped src="codemirror/lib/codemirror.css"></style>
// <style scoped src="highlight.js/styles/github.css"></style>
// <style scoped src="tocbot/dist/styles.css"></style>
// <style scoped src="tocbot/dist/tocbot.css"></style>

<style scoped>
  .toc {
    height: auto;
    top: 40px;
    font-size: 1.3em;
  } 
  /deep/ pre {
    background: #2b2b2b;
    color: #eeeeee;
    border-radius: 6px;
    margin-top: 15px;
  }
  /deep/ .tui-editor-contents h1, /deep/ .tui-editor-contents h2 {
    border-bottom: none;
  }
</style>
