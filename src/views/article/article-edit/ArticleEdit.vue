<template>
  <div class="container">
    <div class="row">
      <div class="col me-end">
        <div class="ms-3 fs-4 fw-bolder">{{ blogObject.title }}</div>
      </div>
      <div class="col-auto">
        <div class="btn-group btn-row mb-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-dark" @click="save()">保存</button>
          <button type="button" class="btn btn-dark" @click="back()">返回</button>
        </div>
      </div>
    </div>
    <tui-editor
      ref="editor"
      :foucsHandler="tuiFocusHandler"
      :blurHandler="tuiBlurHandler"
      :imgUploadHandler="tuiImgUploadHandler"
    ></tui-editor>
  </div>
</template>

<script>
// @ is an alias to /src
import TuiEditor from "@/components/TuiEditor.vue";
import utils from "@/utils/common-utils";
import * as fileApi from '@/api/file.js'
import * as articleApi from '@/api/article.js'

export default {
  name: "EditBlog",
  components: {
    TuiEditor,
  },
  data() {
    return {
      blogObject: {},
      fileList: [],
      id: parseInt(this.blogid),
    };
  },
  props: {
    blogid: { type: String },
  },
  computed: {},
  created() {
    if (utils.isBlank(this.id)) {
      this.$toast.error("id为空，请重新发起请求");
      return;
    }
    this.refresh();
  },
  beforeRouteLeave(to, from, next) {
    let leaveFlag = this.submitCompletedCheck();
    if (!leaveFlag) {
      this.$message('有更改内容或图片未提交，确认离开此页面?', {buttonClose: true}).then(() => next());
      return;
    }
    next();
  },
  beforeDestroy() {
    this.tuiBlurHandler();
  },
  methods: {
    back() {
      this.$router.push({ name: "BlogView", params: { blogid: this.blogid } });
    },

    save() {
      this.blogObject.content = this.$refs.editor.getMarkdown();
      let requestData = JSON.parse(JSON.stringify(this.blogObject));
      requestData.user = "xuecl";
      articleApi.updateArticle({
        ...requestData,
        id: this.id,
      })
        .then(() => {
          this.$toast.success("保存成功！");
        })
    },

    refresh() {
      articleApi.getArticleDetail(this.id)
        .then(data => {
          this.blogObject = {
            id: data.id,
            title: data.blogTitle,
            keyWord: data.blogKeyWord,
            content: data.blogContent,
            digest: data.blogDigest,
          }
          this.$refs.editor.setMarkdown(this.blogObject.content)
          this.$loading.hide()
        })
        .catch(err => {
          console.error(err)
          this.$loading.hide()
        })
    },

    tuiSaveShortcutsReplace(event) {
      if (event.ctrlKey && event.keyCode == 83) {
        this.save();
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },

    tuiFocusHandler() {
      window.addEventListener("keydown", this.tuiSaveShortcutsReplace, true);
    },
    tuiBlurHandler() {
      window.removeEventListener("keydown", this.tuiSaveShortcutsReplace, true);
    },
    tuiImgUploadHandler(file) {
      const filename = file.name + new Date().getTime() + (Math.random() * 1000000).toFixed();
      this.$loading.show()
      fileApi.uploadFile(`imgs/${this.id}/${filename}`, file)
        .then(() => {
          this.$loading.hide()
          // 加上图片的文本后，编辑器在加载图片的一瞬间游标的位置会变的很奇怪(后面随便手动输入点东西就能恢复)。下面代码的最后加上空格是为了解决这个问题，具体原因尚不清楚
          this.$refs.editor.setMarkdown(this.$refs.editor.getMarkdown() + utils.getImgMarkdownString(window.envConfig.baseUrl + filename, file.name) + ' ')
        })
        .catch( () => {
          this.$nextTick(() => {this.$loading.hide()})
        })
    },
    submitCompletedCheck() {
      let flag = true;
      // const fileList = this.$refs.picWall.fileList.slice(0, -1);
      // for (let i = 0; i < fileList.length; i++) {
      //   if (!fileList[i].downloadUrl) {
      //     flag = false;
      //     break;
      //   }
      // }
      const blogContent = this.$refs.editor.getMarkdown();
      if (blogContent !== this.blogObject.content) {
        flag = false;
      }
      return flag;
    },
  },
};
</script>

<style scoped>
</style>
