<template>
  <v-app-bar app flat height="80">
    <v-layout row wrap>
      <v-container class="py-0 fill-height">
        <!-- 网站标题 -->
        <h1 class="heading--text mr-10 d-none d-lg-flex pt-4">
          <v-img
            width="150"
            :src="$vuetify.theme.dark ? `logo-light.png` : `logo-dark.png`"
          >
          </v-img>
        </h1>
        <!-- 网站导航 -->
        <div class="d-span">
          <v-tabs background-color="transparent" slider-color="primary">
            <v-tab
              v-for="link in links"
              :key="link.title"
              router
              :to="link.route"
            >
              <v-icon>{{ link.icon }}</v-icon>
              <span class="d-none d-lg-flex">{{ link.title }}</span>
            </v-tab>
          </v-tabs>
        </div>
        <v-spacer></v-spacer>
        <!-- 明暗切换器 -->
        <v-switch
          class="center"
          :prepend-icon="$vuetify.theme.dark ? 'nightlight_round' : 'wb_sunny'"
          inset
          hide-details
          v-model="$vuetify.theme.dark"
        ></v-switch>
        <v-responsive max-width="260" class="mr-1">
          <v-autocomplete
            v-model="keyword"
            hide-no-data
            dense
            clearable
            flat
            placeholder="搜索课程或文章"
            rounded
            append-icon=""
            prepend-icon="search"
            hide-details
            solo-inverted
            :search-input.sync="search"
            :loading="loading"
            :items="items"
            item-text="name"
            item-value="name"
            no-filter
            @click:prepend="gotoSearch"
          >
            <template v-slot:item="{ item }">
              <span v-html="item.raw"></span>
            </template>
          </v-autocomplete>
        </v-responsive>
        <client-only>
          <!-- 未登录操作 -->
          <div v-if="loginInfo.userId === ''" id="no-login">
            <v-btn text router to="/login">登录</v-btn>
            <v-btn text router to="/register">注册</v-btn>
          </div>
          <!-- 已登录操作 -->
          <div v-if="loginInfo.userId !== ''" id="has-login">
            <!-- 下拉菜单 -->
            <v-menu open-on-hover bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <!-- 展示用户头像 -->
                <v-avatar
                  class="mx-2 avatar-rotate"
                  color="grey darken-1"
                  size="32"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-img :src="loginInfo.avatar"></v-img>
                </v-avatar>
              </template>
              <v-list dense>
                <v-list-item
                  router
                  :to="item.route"
                  v-for="(item, index) in menus"
                  :key="index"
                >
                  <v-list-item-title>
                    <v-icon left>home</v-icon>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn @click="logout" icon plain color="primary">
              <v-icon>logout</v-icon>
            </v-btn>
          </div>
        </client-only>
      </v-container>
    </v-layout>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import searchApi from "@/api/search";
export default Vue.extend({
  data: () => ({
    links: [
      { title: "首页", route: "/", icon: "home" },
      { title: "课程", route: "/course", icon: "school" },
      { title: "名师", route: "/teacher", icon: "group" },
      { title: "文章", route: "/article", icon: "library_books" },
      { title: "作者", route: "/qa", icon: "person" },
    ],
    // 用户登录信息
    loginInfo: {
      userId: "",
      age: "",
      avatar: "",
      mobile: "",
      username: "",
      sex: "",
    },
    menus: [{ title: "个人中心", icon: "home", route: "/ucenter/info" }],
    keyword: null,
    search: null,
    loading: false,
    items: [] as any,
    word: "",
  }),
  created() {
    this.showInfo();
  },
  watch: {
    search(val) {
      this.word = val;
      val && this.searchSuggest(val);
    },
  },
  methods: {
    // 如果用户登录,则展示用户信息
    showInfo() {
      const userInfo = this.$store.state.account.user;
      if (userInfo.userId !== undefined) {
        this.loginInfo = userInfo;
      } else {
        this.loginInfo.userId = "";
      }
    },
    // 用户退出登录
    logout() {
      this.loginInfo.userId = "";
      this.$store.commit("account/removeAll");
      this.$message.success({
        content: "成功退出登录",
      });
      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace("/");
      }
    },
    searchSuggest(keyword: string) {
      if (this.loading === true) {
        return;
      }
      this.loading = true;
      searchApi
        .suggest(keyword)
        .then((response) => {
          let courseArray = [...response.data.course];
          let articleArray = [...response.data.article];
          this.items = [];
          if (courseArray.length !== 0) {
            this.items = [{ header: "课程" }];
            courseArray.map((course) => {
              this.items.push({
                raw: course,
                name: course.replace(/<[^>]+>/g, ""),
              });
            });
          }
          if (articleArray.length !== 0) {
            this.items.push({ header: "文章" });
            articleArray.map((article) => {
              this.items.push({
                raw: article,
                name: article.replace(/<[^>]+>/g, ""),
              });
            });
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    gotoSearch() {
      if (this.word === "") {
        return;
      }
      console.log("点击搜索", this.word);
    },
  },
});
</script>