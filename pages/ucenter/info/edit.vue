<template>
  <v-card flat>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-card-title primary-title> 修改个人资料 </v-card-title>
    <client-only>
      <v-container grid-list-xs class="pb-10">
        <v-row>
          <v-col sm="12" md="8">
            <v-form class="mx-2" ref="form" v-model="valid" lazy-validation>
              <v-text-field
                name="username"
                label="用户名"
                required
                disabled
                prepend-icon="perm_identity"
                v-model="loginInfo.username"
              ></v-text-field>
              <v-text-field
                name="mobile"
                label="手机号"
                prepend-icon="mdi-cellphone-iphone"
                v-model="loginInfo.mobile"
                :rules="mobileRules"
              ></v-text-field>
              <v-text-field
                name="email"
                label="电子邮箱"
                prepend-icon="mdi-email"
                :rules="emailRules"
                v-model="loginInfo.email"
              ></v-text-field>
              <v-select
                prepend-icon="mdi-gender-male-female"
                v-model="loginInfo.sex"
                :items="items"
                :rules="[(v) => '012'.indexOf(v) + 1 !== 0 || '性别必须填写']"
                label="性别"
                required
              >
              </v-select>
              <v-textarea
                prepend-icon="mdi-comment"
                label="个性签名"
                rows="1"
                clearable
                v-model="loginInfo.description"
                :counter="50"
                clear-icon="mdi-close-circle"
              ></v-textarea>

              <v-icon>mdi-face-profile</v-icon>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="updateInfo"
                :loading="loading"
              >
                保存信息
                <v-icon right>mdi-checkbox-marked-circle</v-icon>
              </v-btn>
            </v-form>
          </v-col>
          <v-col
            cols="12"
            md="4"
            class="d-flex flex-column align-center justify-space-around"
          >
            <!-- 头衔缩略图 -->
            <pan-thumb :image="loginInfo.avatar" />
            <image-cropper
              v-show="imagecropperShow"
              :width="300"
              :height="300"
              :key="imagecropperKey"
              :url="BASE_API + 'tools/fileoss'"
              field="file"
              @close="close"
              @crop-upload-success="cropSuccess"
            />
            <v-btn color="info" @click="imagecropperShow = true"
              >点击修改头像</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </client-only>
  </v-card>
</template>

<script>
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  layout: "ucenter",
  components: {
    ImageCropper,
    PanThumb,
  },
  head() {
    return {
      title: `修改${this.loginInfo.username}的信息`,
    };
  },
  mounted() {
    this.getUserInfo(); // 在created执行会报错刷新页面会报错
  },
  data() {
    return {
      imagecropperShow: false, //是否展示上传头像的组件
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.baseURL, //上传头像文件的地址
      loading: false, //控制input组件是否加载
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
          text: "修改信息",
          to: "/ucenter/info/edit",
        },
      ],
      loginInfo: {
        avatar: "",
        mobile: "",
        username: "",
        description: "",
        sex: "",
      },
      usernameRules: [
        (v) => !!v || "必须填写昵称",
        (v) => (v && v.length <= 10) || "昵称必须小于等于10个字符",
      ],
      ageRules: [
        (v) => /^(?:[1-9]?\d|100)$/.test(v) || "年龄不符合规范", //0-100
      ],
      emailRules: [
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "非法电子邮件";
        },
      ],
      mobileRules: [
        (v) => !!v || "必须填写手机号",
        (v) => /^1[3-9]\d{9}$/.test(v) || "手机号码格式不正确",
      ],
      valid: true,
      select: null,
      items: [
        { text: "男", value: "0" },
        { text: "女", value: "1" },
        { text: "保密", value: "2" },
      ],
    };
  },
  methods: {
    // 打开头像上传
    toggleShow() {
      this.imagecropperShow = !this.imagecropperShow;
    },
    close() {
      //关闭上传弹框的方法
      this.imagecropperShow = false;
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回图片地址
      this.loginInfo.avatar = data.url;
      console.log("debug" + data.url);
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    // 从vuex中获取用户信息
    getUserInfo() {
      const userInfo = this.$store.state.account.user;
      this.loginInfo = userInfo;
    },
    // 提交更新信息
    updateInfo() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const {
          userId,
          avatar,
          mobile,
          sex,
          email,
          description,
        } = this.loginInfo;
        this.$put("/system/user/profile", {
          userId,
          avatar,
          mobile,
          sex,
          email,
          description,
        })
          .then(() => {
            this.loading = false;
            this.$store.commit("account/setUser", this.loginInfo);
            this.$message.success("修改信息成功😁");
          })
          .catch((err) => {
            this.loading = false;
          });
        // ucenterApi
        //   .updateUcenter(this.loginInfo)
        //   .then((response) => {
        //     console.log(response);
        //     if (response.success) {
        //       this.$message.success("修改成功");
        //       this.loading = false;
        //       // 修改完毕后重新获取用户信息
        //       loginApi.getLoginUserInfo().then((response) => {
        //         console.log(response);
        //         this.loginInfo = response.data.userInfo;
        //         // 将用户的信息存入cookie中
        //         cookie.set("dhu_ucenter", this.loginInfo);
        //         console.log(this.loginInfo);
        //         // 通知组件重新获取cookie信息
        //         PubSub.publish("updateLoginInfo");
        //       });
        //     } else {
        //       this.$message.error("修改失败");
        //       this.loading = false;
        //     }
        //   })
        //   .catch((err) => {
        //     this.$message.error(err);
        //     this.loading = false;
        //   });
      }
    },
    validate() {
      this.$refs.form.validate();
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