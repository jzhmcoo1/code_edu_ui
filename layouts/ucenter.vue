<template>
  <!-- 用户中心布局 -->
  <v-app id="ucenter">
    <v-navigation-drawer v-model="drawer" app>
      <!-- 用户中心的drawer -->
      <!-- 用户信息 -->
      <v-list>
        <client-only>
          <v-list-item class="d-flex justify-center">
            <v-list-item-avatar size="100">
              <v-img :src="loginInfo.avatar" class="avatar-rotate"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </client-only>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ loginInfo.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              loginInfo.description
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- 功能栏 -->
      <v-list nav>
        <v-list-group
          v-for="(navItem, index) in nav"
          :key="index"
          :prepend-icon="navItem.icon"
          no-action
          active-class="info--text"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ navItem.title }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, index) in navItem.child"
            :key="index"
            router
            :to="child.route"
            :exact="child.exact ? child.exact : false"
            active-class="info--text"
          >
            <v-list-item-title v-text="child.title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold">个人中心</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- 明暗切换器 -->
      <theme-picker />
      <v-btn text router to="/" icon>
        <v-icon>home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container grid-list-xs>
        <v-sheet min-height="90vh" class="transparent">
          <nuxt />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ThemePicker from "~/components/ThemePicker.vue";
export default {
  head: {
    titleTemplate: "%s - 个人中心",
  },
  components: { ThemePicker },
  middleware: "auth",
  created() {
    this.loginInfo = this.$store.state.account.user;
  },
  data: () => ({
    drawer: null,
    // 用户信息
    loginInfo: {
      userId: "",
      username: "",
      avatar: "",
      mobile: "",
      lastLoginTime: "",
      description: "",
      sex: "",
      email: "",
    },
    // 左侧抽屉导航栏
    nav: [
      {
        title: "个人中心",
        route: "/ucenter/info",
        icon: "person",
        child: [
          {
            title: "我的信息",
            route: "/ucenter/info",
            icon: "info",
            exact: true,
          },
          {
            title: "修改信息",
            route: "/ucenter/info/edit",
            icon: "edit",
            exact: false,
          },
        ],
      },
      {
        title: "我的消息",
        route: "/ucenter/message",
        icon: "mark_email_unread",
        child: [
          {
            title: "查看消息",
            route: "/ucenter/message",
            icon: "mark_email_unread",
          },
        ],
      },
      {
        title: "我的课程",
        route: "/ucenter/course",
        icon: "school",
        child: [
          { title: "管理课程", route: "/ucenter/course", icon: "school" },
        ],
      },
      {
        title: "我的笔记",
        route: "/ucenter/note",
        icon: "notes",
        child: [{ title: "管理笔记", route: "/ucenter/note", icon: "edit" }],
      },
      {
        title: "我的文章",
        route: "/ucenter/article",
        icon: "article",
        child: [
          {
            title: "写新文章",
            route: "/ucenter/article/add",
            icon: "add",
            exact: false,
          },
          {
            title: "管理文章",
            route: "/ucenter/article",
            icon: "edit",
            exact: true,
          },
        ],
      },
      {
        title: "我的考试",
        route: "/ucenter/exam",
        icon: "mdi-pencil",
        child: [
          {
            title: "考试列表",
            route: "/ucenter/exam",
            icon: "mdi-playlist-edit",
            exact: true,
          },
          {
            title: "考试记录",
            route: "/ucenter/exam/record",
            icon: "mdi-playlist-check",
            exact: true,
          },
        ],
      },
    ],
  }),
};
</script>