<template>
  <v-card>
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
              <v-list-item-title>{{ loginInfo.nickname }}</v-list-item-title>
              <v-list-item-subtitle>昵称</v-list-item-subtitle>
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
              <v-icon color="indigo">{{
                loginInfo.sex === 1 ? "mdi-gender-male" : "mdi-gender-female"
              }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                loginInfo.sex === 1 ? "男" : "女"
              }}</v-list-item-title>
              <v-list-item-subtitle>性别</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> cake </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.age }}</v-list-item-title>
              <v-list-item-subtitle>年龄</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-comment </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.sign }}</v-list-item-title>
              <v-list-item-subtitle>个性签名</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> event </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ loginInfo.createTime }}</v-list-item-title>
              <v-list-item-subtitle>注册时间</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> calendar_today </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                loginInfo.modifiedTime
              }}</v-list-item-title>
              <v-list-item-subtitle>修改时间</v-list-item-subtitle>
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
import cookie from "js-cookie";
export default {
  layout: "ucenter",
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
      loginInfo: {},
    };
  },
  methods: {
    getUserInfo() {
      this.loginInfo = cookie.getJSON("dhu_ucenter");
      console.log(this.loginInfo);
    },
  },
};
</script>

<style>
</style>