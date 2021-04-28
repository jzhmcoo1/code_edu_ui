<template>
  <v-container grid-list-xs>
    <!-- 文章目录收纳盒 -->
    <v-navigation-drawer app fixed v-model="drawer" class="px-5">
      <v-sheet rounded="lg" min-height="100vh" class="transparent">
        <v-card flat class="transparent">
          <v-card-title primary-title>
            <v-icon left>toc</v-icon>
            文章目录
          </v-card-title>
          <v-divider></v-divider>
          <side-catalog
            v-if="html !== ''"
            class="catalog pt-2"
            v-bind="catalogProps"
          ></side-catalog>
        </v-card>
      </v-sheet>
    </v-navigation-drawer>
    <!-- 按钮组 -->
    <v-speed-dial
      absolute
      fixed
      v-model="fab"
      bottom
      right
      direction="top"
      :open-on-hover="true"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="grey darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> format_list_bulleted </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="drawer = !drawer">
        <v-icon>toc</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-row>
      <!-- 左边栏 -->
      <v-col cols="12" md="9">
        <v-sheet min-height="70vh" rounded="lg">
          <v-container grid-list-xs>
            <!-- 文章基本信息 -->
            <v-container grid-list-xs class="text-center">
              <h1 class="headline heading--text font-weight-bold">
                {{ articleInfo.title }}
              </h1>
              <v-card flat>
                <v-btn text>
                  <v-icon left>mdi-heart</v-icon>
                  {{ articleInfo.likeCount }}
                </v-btn>
                <v-btn text @click="$vuetify.goTo('#comment')">
                  <v-icon left>mdi-comment</v-icon>
                  {{ articleInfo.commentCount }}
                </v-btn>
                <v-btn text>
                  <v-icon left>mdi-eye</v-icon>
                  {{ articleInfo.viewCount }}
                </v-btn>
                <v-card-text class="caption">
                  创建时间:
                  <span class="font-weight-bold"
                    >{{ formateTime(articleInfo.createTime) }}
                  </span>

                  更新时间:
                  <span class="font-weight-bold">
                    {{ formateTime(articleInfo.modifiedTime) }}
                  </span>
                </v-card-text>
              </v-card>
            </v-container>
            <v-divider></v-divider>
            <!-- 文章内容 -->
            <v-container grid-list-xs>
              <div id="html" ref="html" v-html="html"></div>
            </v-container>
          </v-container>
        </v-sheet>
        <!-- 文章评论 -->
        <v-card class="mt-3">
          <v-card-title primary-title>
            <v-icon left>comment</v-icon>
            文章评论
            <v-btn icon @click="showComment = !showComment">
              <v-icon>{{
                showComment ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div id="comment" v-show="showComment">
              <v-divider></v-divider>
              <Comments type="article" :id="articleId" />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <!-- 右边栏 -->
      <v-col cols="12" md="3" class="text-center">
        <v-row style="position: sticky; top: 75px">
          <v-col>
            <v-sheet rounded="lg">
              <v-card flat>
                <v-card-title primary-title>
                  <v-icon left>person</v-icon>
                  作者信息
                </v-card-title>
                <v-responsive :aspect-ratio="1 / 1">
                  <v-avatar size="150" class="avatar-rotate">
                    <img :src="articleInfo.avatar" />
                  </v-avatar>
                  <v-card-text>
                    {{ articleInfo.authorName }}
                  </v-card-text>
                </v-responsive>
              </v-card>
            </v-sheet>
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
import moment from "moment";
import SideCatalog from "vue-side-catalog";
import "vue-side-catalog/lib/vue-side-catalog.css";
moment.locale("zh-cn");
export default {
  components: { Comment, SideCatalog },
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
      fab: false, //按钮组
      drawer: true, //目录收纳
      renderer: new marked.Renderer(),
      articleInfo: {
        content: "",
      },
      html: "",
      showComment: true,
      catalogProps: {
        container: "#html",
        levelList: ["h1", "h2", "h3", "h4", "h5"],
        watch: true,
      },
    };
  },
  methods: {
    formateTime(time) {
      return moment(time).fromNow();
    },
    // 初始化文章信息
    initArticle() {
      articleApi.getArticleInfo(this.articleId).then((response) => {
        this.articleInfo = response.data.article;
        console.log(this.articleInfo);
        const renderer = {
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
