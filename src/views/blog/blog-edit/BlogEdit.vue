<template>
  <div class="container">
    <div class="row">
      <div class="col me-end">
        <div class="ms-3 fs-4 fw-bolder ">{{ blogObject.title }}</div>
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
import request from "@/request/commonRequest.js";
import utils from "@/utils/commonUtils";
import { Pic } from "@/global/globalConsts.js";
import { queryDetailBlogInfo } from "@/api/blog.js";
import { saveBlog } from "@/api/blog.js";
import { uploadFile } from "@/api/blog.js";

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
      request(new saveBlog(requestData)).then(() => {
        console.log(this)
        this.$toast.success("保存成功！");
      });
    },
    refresh() {
      request(new queryDetailBlogInfo({ id: this.id })).then(
        ({ blogObject }) => {
          this.blogObject = {
            id: blogObject.id,
            title: blogObject.blogTitle,
            keyWord: blogObject.blogKeyWord,
            content: blogObject.blogContent,
            digest: blogObject.blogDigest,
          };
          this.$refs.editor.setMarkdown(this.blogObject.content);
          /* eslint-disable */
          this.fileList = [];
          blogObject.fileList.forEach((element) => {
            let arrayTmp = element.split("=");
            let filename = decodeURIComponent(arrayTmp[arrayTmp.length - 1]);
            let pic = new Pic();
            pic.downloadUrl = envConfig.baseUrl + element;
            pic.uploadName = filename;
            pic.id = pic.id + filename;
            this.fileList.push(pic);
          });
          /* eslint-enable */
        }
      );
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
      let fileObject = {
        filename: file.name + new Date().getTime() + (Math.random() * 1000000).toFixed() ,
        file: file
      }
      this.$loading.show()
      request(new uploadFile({...fileObject,id: this.id})).then(data => {
        /* eslint-disable */
        // 加上图片的文本后，编辑器在加载图片的一瞬间游标的位置会变的很奇怪(后面随便手动输入点东西就能恢复)。下面代码的最后加上空格是为了解决这个问题，具体原因尚不清楚
        this.$refs.editor.setMarkdown(this.$refs.editor.getMarkdown() + utils.getImgMarkdownString(envConfig.baseUrl + data.url, file.name) + ' ')
        /* eslint-enable */
        this.$loading.hide()
      }).catch( () => {
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
