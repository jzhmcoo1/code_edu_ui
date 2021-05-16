<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      prepend-icon="person"
      v-model="username"
      :counter="10"
      :rules="nickRules"
      label="用户名"
      required
    ></v-text-field>

    <v-text-field
      prepend-icon="phone_iphone"
      v-model="mobile"
      :rules="mobileRules"
      :counter="11"
      label="手机号"
      required
    ></v-text-field>

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
    ></v-text-field>

    <v-text-field
      :type="show ? 'text' : 'password'"
      v-model="ensurePassword"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      name="ensure"
      :rules="[
        (v) => !!v || `必须确认密码`,
        (v) => v === password || `确认密码不一致!`,
      ]"
      label="确认密码"
      prepend-icon="lock"
      id="ensure"
      required
      @click:append="show = !show"
    ></v-text-field>
    <!-- <v-text-field
      v-model="code"
      name="code"
      label="验证码"
      :counter="4"
      id="code"
      :rules="codeRules"
      required
      prepend-icon="vpn_key"
      append-icon="message"
      :suffix="codeText"
      @click:disabled="sending"
      @click:append="sendCode"
    ></v-text-field> -->
    <v-layout column wrap justify-center align-center>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-btn :disabled="!valid" color="success" @click="validate">
            确认注册
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="error" @click="reset"> 重新填写 </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  layout: "sign",
  data: () => ({
    mobile: "", //手机号
    code: "", //验证码
    username: "", //用户名
    password: "", //密码
    ensurePassword: "", // 确认密码
    valid: true, //表单是否有效
    // 验证规则
    show: false, //是否显示
    codeText: "点击图标获取验证码", //验证码显示字样
    sending: false, //是否正在发送验证码
    second: 60, //倒计时
    mobileRules: [
      (v) => !!v || "必须填写手机号",
      (v) => /^1[3-9]\d{9}$/.test(v) || "手机号码格式不正确",
    ],
    passwordRules: [(v) => !!v || "必须填写密码"],
    nickRules: [
      (v) => !!v || "必须填写用户名",
      (v) => (v && v.length <= 10) || "用户名最大长度不能超过10",
    ],
    // codeRules: [
    //   (v) => !!v || "必须填写验证码",
    //   (v) => /^\d{4}$/.test(v) || "验证码必须是4位数字",
    // ],
  }),

  methods: {
    // 点击发送验证码图标的回调
    // sendCode() {
    //   if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
    //     this.$message.error({
    //       content: "请填写正确的手机号再发送验证码",
    //     });
    //     return;
    //   }
    //   if (this.sending === true) {
    //     this.$message.error({
    //       content: `验证码正在发送,请${this.second}秒后再试`,
    //     });
    //     return;
    //   }
    //   registerApi.sendCode(this.mobile).then((response) => {
    //     this.sending = true;
    //     //调用倒计时的方法
    //     this.timeDown();
    //     this.$message.success({
    //       content: "发送验证码成功,请注意查收",
    //     });
    //   });
    // },
    // 倒计时发送
    // timeDown() {
    //   let result = setInterval(() => {
    //     --this.second;
    //     this.codeText = this.second;
    //     if (this.second < 1) {
    //       clearInterval(result);
    //       this.sending = false;
    //       this.disabled = false;
    //       this.second = 60;
    //       this.codeText = "点击图标获取验证码";
    //     }
    //   }, 1000);
    // },

    //注册提交的方法
    submitRegister() {
      const memberInfo = {
        mobile: this.mobile,
        username: this.username,
        password: this.password,
      };
      this.$post("/system/user/register", memberInfo).then((response) => {
        if (response.code === 200) {
          this.$message.success("🤗注册成功");
          this.$router.replace("/login");
        } else {
          this.$message.error("😫注册失败");
        }
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.submitRegister();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style>
</style>