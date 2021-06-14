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
        <v-layout row wrap v-if="eduList.length !== 0">
          <v-flex
            class="pa-2"
            xs12
            sm6
            md3
            v-for="course in eduList"
            :key="course.id"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                rounded
                :elevation="hover ? 12 : 2"
                router
                :to="`/course/${course.id}`"
              >
                <v-responsive :aspect-ratio="16 / 9">
                  <v-img
                    class="zoom-img"
                    :src="course.cover"
                    height="200px"
                  ></v-img>
                </v-responsive>
                <v-card-title> {{ course.title }} </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
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
        <v-layout row wrap v-if="articleList.length !== 0">
          <v-flex
            class="pa-2"
            xs12
            sm6
            md3
            v-for="article in articleList"
            :key="article.id"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                rounded
                :elevation="hover ? 12 : 2"
                router
                :to="`/article/${article.id}`"
              >
                <v-responsive :aspect-ratio="16 / 9">
                  <v-img
                    class="zoom-img"
                    :src="article.cover"
                    height="200px"
                  ></v-img>
                </v-responsive>
                <v-card-title> {{ article.title }} </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
        <a-empty v-else description="暂时没有对应的文章"></a-empty>
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

<style>
</style>