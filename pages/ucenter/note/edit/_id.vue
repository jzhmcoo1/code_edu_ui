<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-toolbar flat class="pr-2">
      <v-toolbar-title class="font-weight-bold"
        >{{ edit ? "编辑" : "查看" }}笔记</v-toolbar-title
      >
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <span v-if="edit">
        <v-btn text color="warning" @click="redo">
          <v-icon left>mdi-redo</v-icon>
          取消修改
        </v-btn>
        <v-btn text color="success" @click="save">
          保存修改
          <v-icon right>mdi-check-bold</v-icon>
        </v-btn>
      </span>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon @click="switchEdit">
            <v-icon
              color="primary"
              v-text="edit ? 'mdi-eye' : 'mdi-pencil'"
            ></v-icon>
          </v-btn>
        </template>
        <span>{{ edit ? "查看" : "编辑" }}笔记</span>
      </v-tooltip>
    </v-toolbar>
    <v-container grid-list-xs>
      <v-container grid-list-xs>
        <v-text-field
          name="title"
          label="文章标题"
          :clearable="edit"
          v-model="note.title"
          :readonly="!edit"
        ></v-text-field>
      </v-container>
      <v-container grid-list-xs>
        <v-sheet class="white" v-show="edit">
          <client-only>
            <editor ref="toastuiEditor" previewStyle="tab" height="500px" />
          </client-only>
        </v-sheet>
        <div v-show="!edit" id="html" ref="html" v-html="html"></div>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import noteApi from "@/api/note";
import marked from "marked";
import hljs from "highlight.js";
export default {
  layout: "ucenter",
  head() {
    return {
      // 动态加载样式
      link: [
        {
          rel: "stylesheet",
          href: this.$vuetify.theme.dark
            ? "https://highlightjs.org/static/demo/styles/monokai-sublime.css"
            : "https://highlightjs.org/static/demo/styles/atom-one-light.css",
        },
      ],
    };
  },
  created() {
    this.note.id = this.$route.params.id;
    this.edit = this.$route.params.edit;
    this.getNoteDetail();
  },
  data() {
    return {
      renderer: new marked.Renderer(),
      edit: false, //false表示查看,true表示编辑
      html: "",
      note: {
        id: "",
        authorId: "",
        videoId: "",
        title: "",
        content: "",
        createTime: "",
        modifiedTime: "",
      },
      // 面包屑信息
      breadList: [
        {
          disabled: false,
          link: true,
          text: "个人中心",
        },
        {
          disabled: false,
          link: true,
          text: "笔记管理",
          to: "/ucenter/note/edit",
        },
      ],
    };
  },
  methods: {
    async getNoteDetail() {
      const note = await noteApi.detailNote(this.note.id);
      if (note.code === 200) {
        this.note = note.data.note;
        this.setMarkdown();
        this.setMarked();
      }
    },
    setMarkdown() {
      return this.$refs.toastuiEditor.invoke("setMarkdown", this.note.content);
    },
    getMarkdown() {
      return this.$refs.toastuiEditor.invoke("getMarkdown");
    },
    // 设置marked
    setMarked() {
      // 配置marked
      const renderer = {
        // 重写heading渲染方法
        heading(text, level) {
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
          return `
            <h${level} class="heading--text my-2 ${
            level === 1 ? "text-center" : ""
          }">
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
        },
        // 重写<p>标签渲染方法
        paragraph(text) {
          return `
            <p class="body-1">${text}</p>
            `;
        },
      };
      marked.use({ renderer });
      marked.setOptions({
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        pedantic: false, //允许容错
        gfm: true, //类似github
        tables: true, //表格
        breaks: false, //换行符
        sanitize: false, //插入html
        smartLists: true, //列表样式
        smartypants: false,
        xhtml: false,
      });
      this.html = marked(this.note.content); //渲染
    },
    save() {
      this.note.content = this.getMarkdown();
      noteApi.updateNote(this.note).then((response) => {
        if (response.code === 200) {
          this.$message.success("更新笔记内容成功🤗");
          this.setMarked();
        } else {
          this.$message.error("更新笔记内容失败🤯");
        }
      });
    },
    redo() {
      this.getNoteDetail();
    },
    switchEdit() {
      this.edit = !this.edit;
      if (this.edit === false) {
        this.note.content = this.getMarkdown();
        this.setMarked();
      }
    },
  },
};
</script>

<style lang="scss">
// 解决图片过大问题
#html {
  img {
    height: 100%;
    width: 100%;
  }
  code {
    font-size: 1.1em;
  }
}
</style>