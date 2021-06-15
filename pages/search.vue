<template>
  <v-container grid-list-xs>
    <v-sheet min-height="80vh">
      <!-- 搜索框 -->
      <v-container grid-list-xs>
        <SearchBar :dense="false" />
      </v-container>
      <!-- 课程列表 -->
      <v-container grid-list-xs>
        <h1 class="heading--text font-weight-bold mb-2">
          课程列表
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon router to="/course" v-bind="attrs" v-on="on">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>
            <span>查看全部课程</span>
          </v-tooltip>
        </h1>
        <v-card v-if="eduList.length !== 0">
          <v-layout row wrap>
            <v-flex
              class="ma-2"
              xs12
              v-for="course in eduList"
              :key="course.id"
            >
              <v-card flat class="pa-2">
                <v-row>
                  <v-col cols="8">
                    <!-- 讲师 -->
                    <v-row>
                      <v-col cols="3" lg="1">
                        <v-avatar size="50">
                          <img :src="course.avatar" alt="讲师头像" />
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <p class="subtitle-2">{{ course.teacherName }}</p>
                        <p class="caption" v-html="course.intro"></p>
                      </v-col>
                    </v-row>
                    <!-- 课程 -->
                    <v-row>
                      <v-col>
                        <p
                          class="body-1 description"
                          v-html="course.description"
                        ></p>
                      </v-col>
                    </v-row>
                    <!-- 信息 -->
                    <v-row>
                      <v-col>
                        <v-btn text color="error">
                          <v-icon left>mdi-heart</v-icon>
                          <span>{{ course.choiceCount }}</span>
                        </v-btn>
                        <v-btn text color="primary">
                          <v-icon left>mdi-eye</v-icon>
                          <span>{{ course.viewCount }}</span>
                        </v-btn>
                        <v-btn text color="info">
                          <v-icon left>mdi-comment-outline</v-icon>
                          <span>{{ course.commentCount }}</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-hover v-slot="{ hover }">
                      <v-card
                        :elevation="hover ? 1 : 1"
                        flat
                        rounded
                        router
                        :to="`/course/${course.id}`"
                      >
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img
                            contain
                            class="zoom-img"
                            :src="course.cover"
                            height="200px"
                          ></v-img>
                        </v-responsive>
                        <v-card-title primary-title>
                          {{ course.title }}
                        </v-card-title>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </v-card>
        <a-empty v-else description="暂时没有对应的课程"> </a-empty>
      </v-container>
      <!-- 文章列表 -->
      <v-container grid-list-xs>
        <h1 class="heading--text font-weight-bold mb-2">
          文章列表
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon router to="/article" v-bind="attrs" v-on="on">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template>
            <span>查看全部文章</span>
          </v-tooltip>
        </h1>
        <v-card v-if="articleList.length !== 0">
          <v-layout row wrap>
            <v-flex
              class="ma-2"
              xs12
              v-for="article in articleList"
              :key="article.id"
            >
              <v-card flat class="pa-2">
                <v-row>
                  <v-col
                    cols="8"
                    class="d-flex flex-column justify-space-between"
                  >
                    <!-- 作者 -->
                    <v-row>
                      <v-col cols="3" lg="1">
                        <v-avatar size="50">
                          <img :src="article.authorAvatar" alt="作者头像" />
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <p class="subtitle-2">{{ article.authorName }}</p>
                      </v-col>
                    </v-row>
                    <!-- 文章 -->
                    <v-row>
                      <v-col>
                        <p class="body-1 description">
                          {{ article.content }}
                        </p>
                      </v-col>
                    </v-row>
                    <!-- 信息 -->
                    <v-row>
                      <v-col>
                        <v-btn text color="error">
                          <v-icon left>mdi-heart</v-icon>
                          <span>{{ article.likeCount }}</span>
                        </v-btn>
                        <v-btn text color="primary">
                          <v-icon left>mdi-eye</v-icon>
                          <span>{{ article.viewCount }}</span>
                        </v-btn>
                        <v-btn text color="info">
                          <v-icon left>mdi-comment-outline</v-icon>
                          <span>{{ article.commentCount }}</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="4">
                    <v-hover v-slot="{ hover }">
                      <v-card
                        :elevation="hover ? 1 : 1"
                        flat
                        rounded
                        router
                        :to="`/article/${article.id}`"
                      >
                        <v-responsive :aspect-ratio="16 / 9">
                          <v-img
                            contain
                            class="zoom-img"
                            :src="article.cover"
                            height="200px"
                          ></v-img>
                        </v-responsive>
                        <v-card-title primary-title>
                          {{ article.title }}
                        </v-card-title>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-card>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </v-card>
        <a-empty v-else description="暂时没有对应的文章"> </a-empty>
      </v-container>
      <div class="text-center">
        <v-pagination v-model="page" :length="length()" circle></v-pagination>
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
interface CourseItem {
  id: "";
  title: "";
  lessonNum: 0;
  cover: "";
  choiceCount: "0";
  commentCount: "0";
  viewCount: "0";
  description: "";
  teacherId: "";
  teacherName: "";
  intro: "";
  avatar: "";
  subjectLevelOne: "";
  subjectLevelTwo: "";
  score: 0;
}
interface AritcleItem {
  id: "";
  authorId: "";
  authorName: "";
  authorAvatar: "";
  typeParentName: "";
  typeName: "";
  title: "";
  cover: "";
  viewCount: "0";
  commentCount: "0";
  likeCount: "0";
  content: "";
  createTime: "";
  modifiedTime: "";
}
import Vue from "vue";
import searchApi from "@/api/search";
import SearchBar from "@/components/SearchBar.vue";
import PubSub from "pubsub-js";
export default Vue.extend({
  components: {
    SearchBar,
  },
  head: {
    title: "搜索",
  },
  created() {
    PubSub.subscribe("search", () => {
      this.init();
    });
  },
  data() {
    return {
      page: 1,
      limit: 8,
      keyword: "" as any,
      articleList: [],
      eduList: [],
      total: "0",
    };
  },
  methods: {
    init() {
      console.log("触发init");
      this.keyword = this.$route.query.keyword;
      this.pageSearch(this.keyword);
    },
    pageSearch(keyword: string) {
      if (keyword === "") return;
      console.log("触发搜索事件");
      console.log("关键字:", keyword);
      searchApi.result(this.page, this.limit, keyword).then((response) => {
        console.log(response.data);
        this.eduList = response.data.courses;
        this.articleList = response.data.articles;
        console.log(this.eduList);
        console.log(this.articleList);
      });
    },
    length() {
      return Math.floor(parseInt(this.total) / this.limit) + 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.description {
  max-width: 800px;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-align: justify;
}
</style>