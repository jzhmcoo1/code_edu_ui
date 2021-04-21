<template>
  <v-app-bar app flat height="80">
    <v-layout row wrap>
      <v-container class="py-0 fill-height">
        <!-- 网站标题 -->
        <h1 class="heading--text mr-10 d-none d-lg-flex">Code Edu</h1>
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
          <v-text-field
            prepend-icon="search"
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <client-only>
          <!-- 未登录操作 -->
          <div v-if="loginInfo.id === ''" id="no-login">
            <v-btn text router to="/login">登录</v-btn>
            <v-btn text router to="/register">注册</v-btn>
          </div>
          <!-- 已登录操作 -->
          <div v-if="loginInfo.id !== ''" id="has-login">
            <!-- 下拉菜单 -->
            <v-menu open-on-hover bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <!-- 展示用户头像 -->
                <v-avatar
                  class="mx-2"
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
import cookie from "js-cookie";
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
      id: "",
      age: "",
      avatar: "",
      mobile: "",
      nickname: "",
      sex: "",
    },
    menus: [{ title: "个人中心", icon: "home", route: "/ucenter" }],
  }),
  created() {
    this.showInfo();
  },
  methods: {
    // 如果用户登录,则展示用户信息
    showInfo() {
      const userInfo = cookie.getJSON("dhu_ucenter");
      console.log("userInfo=", userInfo);
      if (userInfo) {
        this.loginInfo = userInfo;
        this.$store.commit("update", this.loginInfo);
      } else {
        this.loginInfo.id = "";
      }
    },
    // 用户退出登录
    logout() {
      cookie.remove("dhu_token");
      cookie.remove("dhu_ucenter");
      this.loginInfo.id = "";
      this.$store.commit("remove");
      this.$message.success({
        content: "成功退出登录",
      });
      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace("/");
      }
    },
  },
});
</script>