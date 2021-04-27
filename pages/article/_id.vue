<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- 左边栏 -->
      <v-col cols="12" sm="9">
        <v-sheet min-height="70vh" rounded="lg">
          <v-container grid-list-xs>
            <!-- 文章基本信息 -->
            <v-container grid-list-xs class="text-center">
              <h1 class="headline heading--text">
                {{ articleInfo.title }}
              </h1>
              <v-card flat>
                <v-btn text>
                  <v-icon left>mdi-heart</v-icon>
                  {{ articleInfo.likeCount }}
                </v-btn>
                <v-btn text>
                  <v-icon left>mdi-comment</v-icon>
                  {{ articleInfo.commentCount }}
                </v-btn>
                <v-btn text>
                  <v-icon left>mdi-eye</v-icon>
                  {{ articleInfo.viewCount }}
                </v-btn>
              </v-card>
            </v-container>
            <!-- 文章内容 -->
            <v-container grid-list-xs>
              <div id="html" ref="html" v-html="html"></div>
            </v-container>
          </v-container>
        </v-sheet>
        <!-- 文章评论 -->
        <v-card class="mt-3">
          <v-card-title primary-title>
            <v-icon>comment</v-icon>
            文章评论
            <v-btn icon @click="showComment = !showComment">
              <v-icon>{{
                showComment ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="showComment">
              <v-divider></v-divider>
              <Comments type="article" :id="articleId" />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <!-- 右边栏 -->
      <v-col cols="12" sm="3">
        <v-row>
          <v-col>
            <v-sheet rounded="lg" min-height="268"> 作者信息 </v-sheet>
          </v-col>
        </v-row>
        <v-row style="position: sticky; top: 80px">
          <v-col>
            <v-sheet rounded="lg" min-height="268"> 文章目录 </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import articleApi from "@/api/article";
import marked from "marked";
import hljs from "highlight.js";
import Comment from "@/components/Comments";
export default {
  components: { Comment },
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
      showComment: true,
    };
  },
  methods: {
    initArticle() {
      articleApi.getArticleInfo(this.articleId).then((response) => {
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