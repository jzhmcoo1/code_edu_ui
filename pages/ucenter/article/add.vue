<template>
  <v-card flat>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-card-title primary-title>
      {{ articleId !== "" ? "更新" : "新增" }}文章
    </v-card-title>
    <v-stepper v-model="e1" class="transparent">
      <!-- 步骤条标题 -->
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          填写文章基本信息
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          编写文章内容
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> 预览和发布 </v-stepper-step>
      </v-stepper-header>

      <!-- 步骤条内容 -->
      <v-stepper-items>
        <!-- 第一步 -->
        <v-stepper-content step="1">
          <v-card flat class="mb-12">
            <v-form ref="articleForm" v-model="valid" lazy-validation>
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="articleInfo.title"
                        :counter="20"
                        :rules="titleRules"
                        label="文章标题"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        v-model="articleInfo.typeParentId"
                        :items="tagList"
                        item-text="title"
                        item-value="id"
                        :rules="tagRules"
                        chips
                        label="文章一级标签"
                        required
                        @change="fillSubList"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        v-model="articleInfo.typeId"
                        :items="tagSubList"
                        item-text="title"
                        item-value="id"
                        :rules="tagRules"
                        chips
                        no-data-text="请先选择一级标签"
                        label="文章二级标签"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <el-upload
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeUpload"
                        :action="BASE_API + '/eduoss/fileoss'"
                        class="avatar-uploader"
                        :on-progress="handleProgress"
                      >
                        <v-card v-bind="attrs" v-on="on">
                          <v-responsive :aspect-ratio="16 / 9">
                            <v-img
                              :width="300"
                              class="avatar"
                              v-show="articleInfo.cover"
                              :src="articleInfo.cover"
                            >
                            </v-img>
                          </v-responsive>
                        </v-card>
                      </el-upload>
                    </template>
                    <span>点击上传课程封面</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <div>
                <v-btn text router to="/ucenter/article"> 取消 </v-btn>
                <v-btn color="primary" @click="nextStep">
                  下一步 <v-icon right>chevron_right</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- 第二步 -->
        <v-stepper-content step="2">
          <div class="mb-12">
            <v-btn text @click="e1 = 1">
              <v-icon left>chevron_left</v-icon> 上一步
            </v-btn>
            <v-btn color="primary" @click="nextStep">
              下一步
              <v-icon right>chevron_right</v-icon>
            </v-btn>
          </div>

          <v-card min-height="50vh" flat class="white mb-12">
            <client-only>
              <Markdown
                :value="articleInfo.content"
                v-model="articleInfo.content"
              />
            </client-only>
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-btn text @click="e1 = 2"> 上一步 </v-btn>
          <v-btn color="primary" @click="addOrUpdateArticle">
            确认并发布
            <v-icon right>check_circle</v-icon>
          </v-btn>
          <v-card flat min-height="50vh" class="mb-12">
            <v-card flat>
              <v-card-title primary-title> 内容预览 </v-card-title>
              <v-divider></v-divider>
              <client-only>
                <MarkdownPreview :initialValue="articleInfo.content" />
              </client-only>
            </v-card>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import articleApi from "@/api/article";
import subjectApi from "@/api/subject";
import Markdown from "vue-meditor";
import { MarkdownPreview } from "vue-meditor";
export default {
  layout: "ucenter",
  components: { Markdown, MarkdownPreview },
  created() {
    this.init();
  },
  data() {
    return {
      loading: false,
      BASE_API: process.env.baseURL, // 接口API地址
      e1: 1, //步骤条的数值
      valid: true, //输入form是否有效
      articleInfo: {
        //封装文章数据
        authorId: "", //作者
        typeId: "", //二级标签
        typeParentId: "", //一级标签
        authorAvatar: "", //作者头像
        title: "", //标题
        cover: "", //封面
        content: "", //文章内容
      },
      articleId: "",
      tagList: [], // 一级分类列表
      tagSubList: [], // 二级分类列表
      titleRules: [(v) => !!v || "文章标题不能为空"], //标题验证规则
      tagRules: [(v) => !!v || "必须选择文章标签"],
      // 面包屑信息
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
          text: "文章编辑",
          to: "/ucenter/article/add",
        },
      ],
    };
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    },
  },
  methods: {
    async init() {
      await this.initAllTag();
      //从router中获取要更新的文章ID
      if (this.$route.query && this.$route.query.articleId) {
        this.articleId = this.$route.query.articleId;
      } else {
        this.articleId = "";
      }
      if (this.articleId !== "") {
        this.initArticle();
      } else {
        this.articleInfo = {};
        this.$refs.articleForm.resetValidation();
      }
      // 从cookie中获取作者id
      this.articleInfo.authorId = this.$store.state.account.user.userId;
      this.articleInfo.authorAvatar = this.$store.state.account.user.avatar;
      //初始化封面
      this.articleInfo.cover =
        "https://edu-guli-0313.oss-cn-beijing.aliyuncs.com/2021/03/05/d1d36db7eb4045009edaead44224cdf7u=1572376661,3890953672&fm=26&gp=0.jpg";
    },
    addOrUpdateArticle() {
      if (this.articleId !== "") {
        this.updateArticle();
      } else {
        this.addArticle();
      }
    },
    //更新文章
    updateArticle() {
      articleApi.updateArticle(this.articleInfo).then((response) => {
        if (response.code === 200) {
          this.$message.success("更新文章成功😁");
          //跳转我的文章页面
          this.$router.push("/ucenter/article");
        }
      });
    },
    //初始化文章(更新)
    initArticle() {
      articleApi.getBeforeArticleUpdate(this.articleId).then((response) => {
        this.articleInfo = response.data;
        this.fillSubList();
      });
    },
    //封面上传中
    handleProgress() {
      this.loading = true;
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.articleInfo.cover = res.data.url;
      this.$message.success("封面上传成功");
      this.loading = false;
    },
    // 上传前检查文件是否符合规范
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    //查询所有标签树
    async initAllTag() {
      const response = await subjectApi.getSubjectTree();
      this.tagList = response.data.list;
    },
    // 点击一级标签后填写二级分类
    fillSubList() {
      console.log(this.tagList);
      this.tagSubList = this.tagList.find((value) => {
        return value.id === this.articleInfo.typeParentId;
      }).children;
      console.log(this.tagSubList);
    },
    // 点击"下一步"(第1步和第2步)
    nextStep() {
      if (this.e1 === 1) {
        if (this.$refs.articleForm.validate()) {
          this.e1++;
        }
      } else if (this.e1 === 2) {
        if (this.articleInfo.content !== "") {
          this.e1++;
        } else {
          this.$message.error("文章内容不能为空!");
        }
      }
    },
    addArticle() {
      articleApi.addArticle(this.articleInfo).then((response) => {
        if (response.code === 200) {
          this.$message.success("添加文章成功😁");
          this.$router.push("/ucenter/article");
        }
      });
    },
    // 验证表格
    validate() {
      this.$refs.articleForm.validate();
    },
    reset() {
      this.$refs.articleForm.reset();
    },
    resetValidation() {
      this.$refs.articleForm.resetValidation();
    },
  },
};
</script>

<style>
</style>