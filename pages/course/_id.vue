<template>
  <v-container grid-list-xs>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <!-- 课程信息 -->
    <v-card shaped :elevation="2">
      <v-layout row wrap justify-space-between>
        <v-flex xs12 md7>
          <v-responsive :aspect-ratio="16 / 9">
            <v-img :src="courseWebVo.cover"></v-img>
          </v-responsive>
        </v-flex>
        <v-flex xs12 md5 align-self-center>
          <v-card flat>
            <v-card-title class="headline" primary-title>
              {{ courseWebVo.title }}
            </v-card-title>
            <v-card-text class="d-flex justify-space-around flex-wrap">
              <div>
                <v-chip color="secondary" text-color="white">
                  <v-icon>visibility</v-icon>
                  <span>访问人数:{{ courseWebVo.viewCount }}</span>
                </v-chip>
              </div>
              <div>
                <v-chip color="primary" text-color="white">
                  <v-icon>groups</v-icon>
                  选课人数:{{ courseWebVo.choiceCount }}
                </v-chip>
              </div>
              <div>
                <v-chip color="success" text-color="white">
                  <v-icon>school</v-icon> 课程章节数:{{ courseWebVo.lessonNum }}
                </v-chip>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-icon>people</v-icon> 主讲人:{{ courseWebVo.teacherName }}
            </v-card-text>
            <v-card-actions>
              <v-btn text color="info">立即学习</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row wrap class="mt-10" justify-space-between>
      <v-flex xs12 md8 class="mr-md-3">
        <v-card>
          <v-layout column wrap>
            <v-card-title primary-title> 课程简介 </v-card-title>
            <v-card-text
              v-html="courseWebVo.description"
              class="courseDescription"
            >
            </v-card-text>
            <v-divider></v-divider>
            <v-card-title primary-title> 课程大纲 </v-card-title>
            <v-list shaped class="mx-1">
              <v-list-group
                no-action
                v-for="chapter in chapterVideoList"
                :key="chapter.id"
                :value="true"
                prepend-icon="school"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ chapter.title }}</v-list-item-title>
                </template>
                <v-list-item
                  v-for="child in chapter.children"
                  :key="child.id"
                  link
                >
                  <v-list-item-icon>
                    <v-icon>mdi-school-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="child.title"></v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>visibility</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card>
          <v-layout column wrap>
            <v-card-title primary-title> 讲师详情 </v-card-title>
            <v-divider></v-divider>
            <v-layout row class="pa-3" align-center justify-space-between>
              <v-flex xs3 class="mr-2" justify-center>
                <v-avatar size="100">
                  <img :src="courseWebVo.avatar" />
                </v-avatar>
              </v-flex>
              <v-flex>
                <v-card-text class="subtitle-2">
                  {{ courseWebVo.teacherName }}
                </v-card-text>
                <v-card-text class="caption">
                  {{ courseWebVo.intro }}
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import courseApi from "@/api/course";
export default Vue.extend({
  asyncData({ params }) {
    return { courseId: params.id };
  },
  data() {
    return {
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
      // 面包屑信息
      breadList: [
        {
          text: "全部课程",
          disabled: false,
          href: "/course",
        },
        {
          text: "",
          disabled: true,
          href: "/course",
        },
        {
          text: "",
          disabled: true,
          href: "/course",
        },
      ], //
      courseId: "", //课程id
      courseWebVo: {
        title: "", //课程标题
        cover: "", //课程封面
        teacherId: "", //讲师id
        teacherName: "", //教师名称
        avatar: "", //教师头像
        intro: "", //讲师信息
        subjectLevelOne: "", //课程一级分类标题
        subjectLevelOneId: "", //课程一级分类ID
        subjectLevelTwo: "", //课程二级分类标题
        subjectLevelTwoId: "", //课程二级分类ID
        choiceCount: 0, //选课人数
        viewCount: 0, //访问人数
        description: "", //课程信息描述
        lessonNum: 0, //课程章节数
      },
      chapterVideoList: [], //课程的视频列表
      isChoice: false,
    };
  },
  created() {
    this.initCourseInfo();
  },
  methods: {
    // 获取当前id的课程信息
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId).then((response) => {
        console.log(response.data);
        this.courseWebVo = response.data.courseWebVo;
        this.chapterVideoList = response.data.chapterVideoList;
        this.isChoice = response.data.isChoice;
        // 填写面包屑
        this.breadList[1].text = this.courseWebVo.subjectLevelOne;
        this.breadList[2].text = this.courseWebVo.subjectLevelTwo;
      });
    },
  },
});
</script>
<style lang="scss">
// 解决description中图片过大问题
.courseDescription {
  .wscnph {
    height: 100%;
    width: 100%;
  }
}
</style>