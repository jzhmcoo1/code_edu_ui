<template>
  <v-form ref="form" lazy-validation v-model="valid">
    <v-text-field
      v-model="mobile"
      name="mobile"
      label="手机号"
      :rules="mobileRules"
      prepend-icon="person"
      id="mobile"
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
import cookie from "js-cookie";
export default {
  layout: "sign",
  data() {
    return {
      valid: true,
      show: false,
      mobile: "",
      password: "",
      mobileRules: [
        (v) => !!v || "必须填写手机号",
        (v) => /^1[3-9]\d{9}$/.test(v) || "手机号码格式不正确",
      ],
      passwordRules: [(v) => !!v || "必须填写密码"],
      loginInfo: {}, //存用户的信息
    };
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
    // 登录的回调
    login() {
      const mobile = this.mobile;
      const password = this.password;
      const userInfo = { mobile, password };
      loginApi.submitLoginUser(userInfo).then((response) => {
        const { success, message } = response;
        // 如果登录成功,把返回的token存入cookie中
        if (success) {
          cookie.set("dhu_token", response.data.token);
          // 根据用户的token,获取用户的信息
          loginApi.getLoginUserInfo().then((response) => {
            this.loginInfo = response.data.userInfo;
            // 将用户的信息存入cookie中
            //! 此步骤需要放在此方法中,否则异步任务接受不到用户信息
            cookie.set("dhu_ucenter", this.loginInfo);
            // 登录完成后回到刚才的页面
            this.$router.back();
          });
        }
        this.$message.open({
          content: message,
          type: success === true ? "success" : "error",
        });
      });
    },
  },
};
</script>

<style>
</style>