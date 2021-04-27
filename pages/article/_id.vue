<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text"></h1>
    </v-container>
    <v-container grid-list-xs>
      <div id="html" ref="html" v-html="html"></div>
    </v-container>
  </v-container>
</template>

<script>
import articleApi from "@/api/article";
import marked from "marked";
import hljs from "highlight.js";
export default {
  //params.id获取路径id值
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
  asyncData({ params }) {
    return {
      articleId: params.id,
    };
  },
  created() {
    this.initArticle();
  },
  mounted() {},
  layout: "article",
  data() {
    return {
      renderer: new marked.Renderer(),
      articleInfo: {
        content: "",
      },
      html: "",
    };
  },
  methods: {
    async initArticle() {
      await articleApi.getArticleInfo(this.articleId).then((response) => {
        this.articleInfo = response.data.article;
        console.log(this.articleInfo);
        const renderer = {
          heading(text, level) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
            return `
            <h${level} class="heading--text">
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
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
        this.html = marked(this.articleInfo.content);
      });
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