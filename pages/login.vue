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
    <v-layout column wrap>
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
      </v-row>
      <v-row>
        <v-col cols="12"
          ><v-btn block text color="green">
            <v-icon>mdi-wechat</v-icon></v-btn
          ></v-col
        >
      </v-row>
    </v-layout>
  </v-form>
</template>

<script>
import loginApi from "@/api/login";
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
    };
  },
  methods: {
    // 验证表单有效性
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.formresetValidation();
    },
    // 提交登录请求
    submit() {
      if (this.validate()) {
        this.login();
      }
    },
    login() {
      const mobile = this.mobile;
      const password = this.password;
      const userInfo = { mobile, password };
      loginApi.submitLoginUser(userInfo).then((response) => {
        const { success, message } = response;
        if (success) {
          this.$router.push("/");
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