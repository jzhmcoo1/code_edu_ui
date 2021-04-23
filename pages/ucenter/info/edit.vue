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
                name="name"
                label="昵称"
                required
                prepend-icon="perm_identity"
                :rules="nicknameRules"
                :counter="10"
                v-model="loginInfo.nickname"
              ></v-text-field>
              <v-text-field
                prepend-icon="cake"
                name="age"
                label="年龄"
                required
                :rules="ageRules"
                v-model="loginInfo.age"
              ></v-text-field>
              <v-select
                prepend-icon="mdi-gender-male-female"
                v-model="loginInfo.sex"
                :items="items"
                :rules="[(v) => !!v || 'Item is required']"
                label="性别"
                required
              >
              </v-select>
              <v-textarea
                prepend-icon="mdi-comment"
                label="个性签名"
                rows="1"
                clearable
                v-model="loginInfo.sign"
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

              <v-btn class="mr-4" @click="reset">
                重新填写
                <v-icon right>mdi-reload</v-icon>
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
              :url="BASE_API + '/eduoss/fileoss'"
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
import cookie from "js-cookie";
import ucenterApi from "@/api/ucenter";
import loginApi from "@/api/login";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import PubSub from "pubsub-js";
export default {
  layout: "ucenter",
  components: {
    ImageCropper,
    PanThumb,
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
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sign: "",
        sex: "",
      },
      nicknameRules: [
        (v) => !!v || "必须填写昵称",
        (v) => (v && v.length <= 10) || "昵称必须小于等于10个字符",
      ],
      ageRules: [
        (v) => /^(?:[1-9]?\d|100)$/.test(v) || "年龄不符合规范", //0-100
      ],
      valid: true,
      select: null,
      items: [
        { text: "男", value: 1, icon: "male" },
        { text: "女", value: 2, icon: "female" },
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
    // 从cookie中获取用户信息
    getUserInfo() {
      this.loginInfo = cookie.getJSON("dhu_ucenter");
      console.log("执行了getUserInfo", this.loginInfo);
    },
    // 提交更新信息
    updateInfo() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        ucenterApi
          .updateUcenter(this.loginInfo)
          .then((response) => {
            console.log(response);
            if (response.success) {
              this.$message.success("修改成功");
              this.loading = false;
              // 修改完毕后重新获取用户信息
              loginApi.getLoginUserInfo().then((response) => {
                console.log(response);
                this.loginInfo = response.data.userInfo;
                // 将用户的信息存入cookie中
                cookie.set("dhu_ucenter", this.loginInfo);
                console.log(this.loginInfo);
                // 通知组件重新获取cookie信息
                PubSub.publish("updateLoginInfo");
              });
            } else {
              this.$message.error("修改失败");
              this.loading = false;
            }
          })
          .catch((err) => {
            this.$message.error(err);
            this.loading = false;
          });
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