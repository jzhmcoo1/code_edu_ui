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
        <a-empty v-else-if="loading === false" description="暂时没有对应的课程">
        </a-empty>
        <v-card flat v-else>
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-card>
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
        <a-empty v-else-if="loading === false" description="暂时没有对应的文章">
        </a-empty>
        <v-card flat v-else>
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-card>
      </v-container>
      <div class="text-center">
        <v-pagination v-model="page" :length="length()" circle></v-pagination>
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
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
    this.init();
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
      loading: false,
    };
  },
  beforeDestroy() {
    PubSub.unsubscribe("search");
  },
  methods: {
    init() {
      this.loading = true;
      this.keyword = this.$route.query.keyword;
      this.pageSearch(this.keyword);
    },
    pageSearch(keyword: string) {
      this.eduList = [];
      this.articleList = [];
      if (keyword === "") {
        this.loading = false;
        return;
      }
      searchApi
        .result(this.page, this.limit, keyword)
        .then((response) => {
          console.log(response.data);
          this.eduList = response.data.courses;
          this.articleList = response.data.articles;
          console.log(this.eduList);
          console.log(this.articleList);
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    length() {
      return Math.floor(parseInt(this.total) / this.limit) + 1;
    },
  },
});
</script>