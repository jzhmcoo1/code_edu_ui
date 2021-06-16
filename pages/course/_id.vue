<template>
  <v-container grid-list-xs>
    <v-breadcrumbs id="bread" divider="/" :items="breadList"> </v-breadcrumbs>
    <!-- 课程信息 -->
    <v-card flat rounded="lg" :elevation="2" style="overflow: hidden">
      <v-layout row wrap justify-space-between align-center>
        <v-flex xs12 md7>
          <v-card rounded="lg" flat>
            <v-responsive :aspect-ratio="16 / 9" class="d-flex align-center">
              <v-img
                max-height="300"
                class="zoom-img"
                contain
                :src="courseWebVo.cover"
              ></v-img>
            </v-responsive>
          </v-card>
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
            <v-card-text class="text-center">
              <v-icon>people</v-icon> 主讲人:{{ courseWebVo.teacherName }}
            </v-card-text>
            <v-card-actions class="d-flex justify-center flex-wrap">
              课程评价
              <v-rating
                v-model="courseWebVo.score"
                background-color="grey"
                color="primary"
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon="mdi-star-half-full"
                half-increments
                hover
                readonly
              ></v-rating>
            </v-card-actions>
            <v-card-actions v-if="!isChoice">
              <v-btn
                :disabled="disabled"
                :loading="loading"
                block
                color="info"
                @click="addMyCourse"
              >
                <v-icon left>shopping_cart</v-icon>
                选课
              </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-btn block text disabled>
                <v-icon left>done</v-icon>
                已选课
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- 课程简介和讲师 -->
    <v-layout row class="mt-10" justify-space-between fill-height>
      <v-flex xs12 md8 class="pr-md-3">
        <!-- 课程简介和大纲 -->
        <v-card flat>
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
                  class="courseDescription body-1"
                >
                </v-card-text>
              </div>
            </v-expand-transition>

            <!-- 课程大纲 -->
            <CourseMenu
              :chapterVideoList="chapterVideoList"
              :courseId="courseId"
              :dense="false"
              :noAction="true"
            />
          </v-layout>
        </v-card>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md4>
        <!-- 讲师详情和相关课程 -->
        <!-- 讲师详情 -->
        <v-card flat>
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
                    <v-card
                      flat
                      router
                      :to="`/teacher/${courseWebVo.teacherId}`"
                    >
                      <v-avatar size="100">
                        <v-img class="zoom-img" :src="courseWebVo.avatar" />
                      </v-avatar>
                    </v-card>
                  </v-flex>
                  <v-flex>
                    <v-card-text class="subtitle-2">
                      {{ courseWebVo.teacherName }}
                    </v-card-text>
                    <v-card-text v-html="courseWebVo.intro" class="caption">
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </div>
            </v-expand-transition>
          </v-layout>
        </v-card>
        <!-- 相关课程 -->
        <v-card flat class="mt-3">
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
                  xs12
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
                        <v-img
                          class="zoom-img"
                          :src="item.cover"
                          height="200px"
                        ></v-img>
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
    <v-card flat class="mt-3">
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
    <v-card flat class="mt-3 mr-2">
      <evaluation
        @updateEvaluation="initCourseInfo"
        type="course"
        :id="courseId"
      />
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

<script>
import courseApi from "@/api/course";
import myCourseApi from "@/api/ucenter";
import Comment from "@/components/Comments.vue";
import CourseMenu from "@/components/Course/CourseMenu.vue";
import Evaluation from "@/components/Evaluation.vue";
export default {
  components: {
    Comment,
    CourseMenu,
    Evaluation,
  },
  asyncData({ params }) {
    return { courseId: params.id };
  },
  head() {
    return {
      title: this.courseWebVo.title,
    };
  },
  data() {
    return {
      // 控制显示与否
      showDesciption: true,
      showRelated: true,
      showTeacher: true,
      // showChapter: true,
      showComment: true,
      loading: false, //选课按钮的加载
      disabled: false, //选课按钮的是否禁用
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
    this.addView();
    this.checkIfChoice();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 选课
    addMyCourse() {
      this.loading = true;
      myCourseApi
        .addMyCourse(this.courseId)
        .then((response) => {
          console.log(response);
          if (response.code === 200) {
            this.$message.success("选课成功");
            this.loading = false;
            this.disabled = true;
            this.isChoice = true;
            this.initCourseInfo();
          } else {
            this.disabled = true;
            this.loading = false;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
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
      courseApi.courseDetail(this.courseId).then((response) => {
        // FIXME: 登录token过期导致无法请求无数据
        console.log(response.data);
        this.courseWebVo = response.data.courseWebVo;
        this.chapterVideoList = response.data.allChapterVideo;
        // 填写面包屑
        this.breadList[1].text = this.courseWebVo.subjectLevelOne;
        this.breadList[2].text = this.courseWebVo.subjectLevelTwo;
        // 取得教师id后再去获取相关课程
        this.initRelateCourse();
      });
    },
    initRelateCourse() {
      courseApi
        .conditionList(1, 8, { teacherId: this.courseWebVo.teacherId })
        .then((response) => {
          this.relatedCourse = response.data.items;
        });
    },
    checkIfChoice() {
      if (
        this.$store.state.account.user.userId !== undefined &&
        this.$store.state.account.user.userId !== ""
      ) {
        myCourseApi.getMyCourseState(this.courseId).then((response) => {
          console.log(response.data);
          this.isChoice = response.data.isSelected;
        });
      } else {
        this.disabled = true;
      }
    },
    addView() {
      if (
        this.$store.state.account.user.userId !== undefined &&
        this.$store.state.account.user.userId !== ""
      ) {
        courseApi.addView(this.courseId);
      }
    },
  },
};
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