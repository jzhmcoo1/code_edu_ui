<template>
  <v-form ref="form" lazy-validation v-model="valid">
    <v-text-field
      v-model="username"
      name="username"
      label="用户名"
      :rules="usernameRules"
      prepend-icon="person"
      id="username"
      required
    >
    </v-text-field>
    <v-text-field
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      v-model="password"
      :rules="passwordRules"
      name="password"
      label="密码"
      prepend-icon="lock"
      id="password"
      required
      @click:append="show = !show"
    >
    </v-text-field>

    <v-text-field
      type="password"
      name="code"
      id="code"
      label="验证码"
      required
      v-model="code"
      prepend-icon="code"
    ></v-text-field>

    <div class="text-center">
      <img
        :src="imageCode"
        alt="codeImage"
        class="code-image"
        @click="getCodeImage"
      />
    </div>

    <v-btn class="mt-2" block color="success" @click="submit">登录</v-btn>
    <v-divider></v-divider>
    <v-btn block text color="warning">忘记密码?</v-btn>
    <v-layout column wrap justify-space-around>
      <v-row class="justify-center align-center">
        <v-col cols="4">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="4">
          <span color="background">其他方式登录</span>
        </v-col>
        <v-col cols="4">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn icon text color="green">
            <v-icon>mdi-wechat</v-icon>
          </v-btn>
          <v-btn icon text color="info">
            <v-icon>mdi-qqchat</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-form>
</template>

<script>
import loginApi from "@/api/login";
import { randomNum } from "@/utils";
export default {
  layout: "sign",
  head: {
    title: "登录",
  },
  data() {
    return {
      valid: true,
      show: false,
      username: "",
      password: "",
      usernameRules: [
        (v) => !!v || "必须填写用户名",
        // (v) => /^1[3-9]\d{9}$/.test(v) || "手机号码格式不正确",
      ],
      passwordRules: [(v) => !!v || "必须填写密码"],
      loginInfo: {}, //存用户的信息
      randomId: randomNum(24, 16),
      imageCode: "", //图像验证码
      code: "",
    };
  },
  mounted() {
    this.getCodeImage();
  },
  methods: {
    // 验证表单有效性
    validate() {
      return this.$refs.form.validate();
    },
    // 重新填写表单
    reset() {
      this.$refs.form.reset();
    },
    // 重置表单验证
    resetValidation() {
      this.$refs.formresetValidation();
    },
    // 提交登录请求
    submit() {
      if (this.validate()) {
        this.login();
      }
    },
    // 获取图像验证码
    getCodeImage() {
      console.log(this.randomId);
      loginApi
        .getCodeImage(this.randomId)
        .then((res) => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then((res) => {
          this.imageCode = res;
        })
        .catch((e) => {
          if (e.toString().indexOf("429") !== -1) {
            this.$message.open({
              message: "请求次数过多",
              type: "error",
            });
          } else {
            this.$message.open({
              message: "获取验证码失败",
              type: "error",
            });
          }
        });
    },
    // 登录的回调
    login() {
      const username = this.username;
      const password = this.password;
      const code = this.code;
      const userInfo = { username, password, code };
      console.log(userInfo.code);
      console.log(this.randomId);
      this.$login("auth/oauth/token", {
        ...userInfo,
        key: this.randomId,
      }).then((response) => {
        const data = response;
        this.saveLoginData(data);
        this.getUserDetailInfo();
        this.loginSuccessCallback();
      });
    },
    // 保存登录信息
    saveLoginData(data) {
      this.$store.commit("account/setAccessToken", data.access_token);
      this.$store.commit("account/setRefreshToken", data.refresh_token);
      const current = new Date();
      const expireTime = current.setTime(
        current.getTime() + 1000 * data.expires_in
      );
      this.$store.commit("account/setExpireTime", expireTime);
    },
    // 获取用户信息详情
    getUserDetailInfo() {
      this.$get("auth/user").then((response) => {
        this.$store.commit("account/setUser", response.principal);
        this.$message.open({
          content: "登录成功",
          type: "success",
        });
      });
    },
    loginSuccessCallback() {
      this.$get(`system/user/success`)
        .then((response) => {
          // 回到首页
          this.$router.replace("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>