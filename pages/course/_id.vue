<template>
  <v-container grid-list-xs>
    <v-breadcrumbs id="bread" divider="/" :items="breadList"> </v-breadcrumbs>
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
    <!-- 课程简介和讲师 -->
    <v-layout row class="mt-10" justify-space-between fill-height>
      <v-flex xs12 md8 class="pr-md-3">
        <!-- 课程简介和大纲 -->
        <v-card>
          <v-layout column wrap>
            <v-card-title primary-title>
              <v-icon>article</v-icon>
              课程简介
              <v-btn icon @click="showDesciption = !showDesciption">
                <v-icon>{{
                  showDesciption ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-expand-transition>
              <div v-show="showDesciption">
                <v-divider></v-divider>
                <v-card-text
                  v-html="courseWebVo.description"
                  class="courseDescription"
                >
                </v-card-text>
              </div>
            </v-expand-transition>

            <v-card-title primary-title>
              <v-icon>menu_book</v-icon>
              课程大纲
              <v-btn icon @click="showChapter = !showChapter">
                <v-icon>{{
                  showChapter ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-expand-transition>
              <div v-show="showChapter">
                <v-divider></v-divider>
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
                      :to="{
                        name: 'player-vid',
                        params: {
                          vid: child.videoSourceId,
                        },
                        query: {
                          courseId,
                        },
                      }"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-school-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title
                        v-text="child.title"
                      ></v-list-item-title>

                      <v-list-item-icon>
                        <v-icon>visibility</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </div>
            </v-expand-transition>
          </v-layout>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md4>
        <!-- 讲师详情和相关课程 -->
        <v-card>
          <v-layout column wrap>
            <v-card-title primary-title>
              <v-icon>person</v-icon>
              讲师详情
              <v-btn icon @click="showTeacher = !showTeacher">
                <v-icon>{{
                  showTeacher ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-expand-transition>
              <div v-show="showTeacher">
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
              </div>
            </v-expand-transition>
          </v-layout>
        </v-card>
        <v-card class="mt-3">
          <v-card-title primary-title>
            <v-icon>school</v-icon>
            相关课程
            <v-btn icon @click="showRelated = !showRelated">
              <v-icon>{{
                showRelated ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="showRelated">
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex
                  align-self-center
                  class="pa-md-2"
                  xs6
                  md12
                  v-for="item in relatedCourse"
                  :key="item.id"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      :elevation="hover ? 12 : 2"
                      rounded
                      router
                      :to="`/course/${item.id}`"
                    >
                      <v-responsive :aspect-ratio="16 / 9">
                        <v-img :src="item.cover" height="200px"></v-img>
                      </v-responsive>
                      <v-card-title> {{ item.title }} </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 课程评论 -->
    <v-card class="mt-3">
      <v-card-title primary-title>
        <v-icon>comment</v-icon>
        课程评论
        <v-btn icon @click="showComment = !showComment">
          <v-icon>{{
            showComment ? "mdi-chevron-up" : "mdi-chevron-down"
          }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-expand-transition>
        <div v-show="showComment">
          <v-divider></v-divider>
          <Comment type="course" :id="courseId" />
        </div>
      </v-expand-transition>
    </v-card>
    <!-- 回到顶部按钮 -->
    <v-btn
      fab
      fixed
      dark
      right
      bottom
      color="indigo"
      @click="$vuetify.goTo('#bread')"
      v-show="backTopShow"
    >
      <v-icon> arrow_upward </v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import courseApi from "@/api/course";
import teacherApi from "@/api/teacher";
import Comment from "@/components/Comments.vue";
export default Vue.extend({
  components: {
    Comment,
  },
  asyncData({ params }) {
    return { courseId: params.id };
  },
  data() {
    return {
      // 控制显示与否
      showDesciption: true,
      showRelated: true,
      showTeacher: true,
      showChapter: true,
      showComment: true,
      backTopShow: false, //返回顶部显示
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
      isChoice: false, //是否已经选课
      relatedCourse: [], //保存该讲师的其他课程
    };
  },
  created() {
    this.initCourseInfo();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 控制是否显示"回到顶部"按钮
    handleScroll() {
      if (document.documentElement.scrollTop + document.body.scrollTop > 400) {
        this.backTopShow = true;
      } else {
        this.backTopShow = false;
      }
    },
    // 获取当前id的课程信息
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId).then((response) => {
        console.log("initCourseInfo", response);
        this.courseWebVo = response.data.courseWebVo;
        this.chapterVideoList = response.data.chapterVideoList;
        this.isChoice = response.data.isChoice;
        // 填写面包屑
        this.breadList[1].text = this.courseWebVo.subjectLevelOne;
        this.breadList[2].text = this.courseWebVo.subjectLevelTwo;
        // 取得教师id后再去获取相关课程
        this.initRelateCourse();
      });
    },
    initRelateCourse() {
      teacherApi.getTeacherInfo(this.courseWebVo.teacherId).then((response) => {
        this.relatedCourse = response.data.courseList;
        // console.log("相关课程:", this.relatedCourse);
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