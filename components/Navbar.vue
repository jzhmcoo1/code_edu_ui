<template>
  <v-app-bar app flat height="80">
    <v-layout row wrap>
      <v-container class="py-0 fill-height">
        <!-- 网站标题 -->
        <h1 class="heading--text mr-10 d-none d-lg-flex pt-4">
          <v-img
            width="120"
            :src="$vuetify.theme.dark ? `/logo-light.png` : `/logo-dark.png`"
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
          <SearchBar :dense="true" />
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
                <v-badge
                  :content="messages"
                  :value="messages"
                  color="info"
                  overlap
                >
                  <v-avatar
                    class="mx-2 avatar-rotate"
                    color="grey darken-1"
                    size="32"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-img :src="loginInfo.avatar"></v-img>
                  </v-avatar>
                </v-badge>
              </template>
              <v-list dense>
                <v-list-item
                  router
                  :to="item.route"
                  v-for="(item, index) in menus"
                  :key="index"
                >
                  <v-list-item-title>
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn @click="logout" icon plain color="primary">
              <v-icon>logout</v-icon>
            </v-btn>
            <Message v-show="false" />
          </div>
        </client-only>
      </v-container>
    </v-layout>
  </v-app-bar>
</template>

<script>
import SearchBar from "./SearchBar";
import messageApi from "@/api/message";
import Message from "./Messge.vue";
export default {
  components: {
    SearchBar,
    Message,
  },
  data: () => ({
    websocket: WebSocket,
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
    menus: [
      { title: "个人中心", icon: "home", route: "/ucenter/info" },
      { title: "消息中心", icon: "email", route: "/ucenter/message" },
      { title: "我的课程", icon: "school", route: "/ucenter/course" },
      { title: "我的文章", icon: "article", route: "/ucenter/article" },
      { title: "我的笔记", icon: "edit", route: "/ucenter/note" },
    ],
    messages: 0,
    unreadList: [],
  }),
  created() {
    this.connectWebSocket();
    this.showInfo();
  },
  methods: {
    connectWebSocket() {
      if (
        "WebSocket" in window &&
        this.$store.state.account.user !== undefined &&
        this.$store.state.account.user.userId !== ""
      ) {
        this.websocket = new WebSocket(
          `ws://1.15.24.22:8301/service/websocket/${this.$store.state.account.user.userId}`
        );
        this.initWebSocket();
      } else {
        console.warn("浏览器不支持WebSocket或用户未登录");
      }
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = () => {
        console.error(
          "WebSocket连接发生错误 状态码：" + this.websocket.readyState
        );
      };
      // 连接成功
      this.websocket.onopen = () => {
        console.log("WebSocket连接成功 状态码：" + this.websocket.readyState);
      };
      // 收到消息的回调
      this.websocket.onmessage = (event) => {
        // 根据服务器推送的消息做自己的业务处理
        console.log("服务端返回：" + event.data);
        this.checkUnreadMessages();
      };
      // 连接关闭的回调
      this.websocket.onclose = () => {
        console.log("WebSocket连接关闭 状态码：" + this.websocket.readyState);
      };
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = () => {
        this.websocket.close();
      };
    },
    // 如果用户登录,则展示用户信息
    showInfo() {
      const userInfo = this.$store.state.account.user;
      if (userInfo.userId !== undefined) {
        this.loginInfo = userInfo;
        this.checkUnreadMessages();
      } else {
        this.loginInfo.userId = "";
      }
    },
    // 用户退出登录
    logout() {
      this.websocket.close();
      this.loginInfo.userId = "";
      this.$store.commit("account/removeAll");
      this.$message.success({
        content: "成功退出登录",
      });
      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace("/");
      }
    },
    // 检查未读消息
    checkUnreadMessages() {
      messageApi.checkUnreadCount().then((response) => {
        this.messages = response.data.count;
        this.unreadList = response.data.unReadMessage;
      });
    },
  },
};
</script>