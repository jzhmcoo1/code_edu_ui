<template>
  <v-card flat>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-card-title primary-title> 查看个人资料 </v-card-title>
    <v-card class="mx-auto">
      <v-container grid-list-xs>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> person </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.username }}</v-list-item-title>
              <v-list-item-subtitle>用户名</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-phone </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.mobile }}</v-list-item-title>
              <v-list-item-subtitle>手机号</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-email </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.email }}</v-list-item-title>
              <v-list-item-subtitle>电子邮箱</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">{{ genderIcon(loginInfo.sex) }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ gender(loginInfo.sex) }}</v-list-item-title>
              <v-list-item-subtitle>性别</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-comment </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.description }}</v-list-item-title>
              <v-list-item-subtitle>个性签名</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> event </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                formatDate(loginInfo.lastLoginTime)
              }}</v-list-item-title>
              <v-list-item-subtitle>上次登录时间</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-card-title>
            <v-btn router to="/ucenter/info/edit" dark class="mx-4">
              <v-icon left>mdi-pencil</v-icon>
              修改个人信息
            </v-btn>
          </v-card-title>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  layout: "ucenter",
  head() {
    return {
      title: this.loginInfo.username,
    };
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      breadList: [
        {
          disabled: false,
          // exact: boolean,
          // href: string,
          link: true,
          text: "个人中心",
        },
        {
          disabled: false,
          // exact: boolean,
          // href: string,
          link: true,
          text: "个人信息",
          to: "/ucenter/info",
        },
      ],
      loginInfo: {
        username: "",
      },
    };
  },
  methods: {
    getUserInfo() {
      this.loginInfo = this.$store.state.account.user;
    },
    gender: (value) => {
      if (value === "0") {
        return "男";
      } else if (value === "1") {
        return "女";
      } else {
        return "保密";
      }
    },
    genderIcon: (value) => {
      if (value === "0") {
        return "mdi-gender-male";
      } else if (value === "1") {
        return "mdi-gender-female";
      } else {
        return "mdi-gender-male-female";
      }
    },
    formatDate(value) {
      return moment(value).fromNow();
    },
  },
};
</script>

<style>
</style>