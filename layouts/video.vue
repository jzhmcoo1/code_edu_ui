<template>
  <v-app id="video">
    <Navbar />
    <!-- 笔记组件 -->
    <DrawerEditor />
    <v-main class="background">
      <v-container grid-list-xs>
        <v-row>
          <v-col>
            <v-sheet class="transparent" min-height="100vh" rounded="lg">
              <!-- 课程标题 -->
              <v-card flat>
                <v-card-title primary-title>
                  <v-icon left>school</v-icon>
                  {{ courseWebVo.title }}
                </v-card-title>
              </v-card>
              <!-- 课程视频区 -->
              <v-row>
                <v-col>
                  <!-- 嵌入_id.vue -->
                  <nuxt />
                </v-col>
              </v-row>
              <!-- 课程功能区 -->
              <v-row>
                <v-col>
                  <VideoBar />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <!-- 课程评论 -->
                  <v-card>
                    <v-card-title primary-title>
                      <v-icon left>comment</v-icon>
                      视频评论
                      <v-btn icon @click="showComment = !showComment">
                        <v-icon>{{
                          showComment ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-expand-transition>
                      <div v-show="showComment">
                        <v-divider></v-divider>
                        <Comment type="video" :id="videoId" />
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col>
                <!-- 课程视频菜单 -->
                <v-sheet rounded="lg">
                  <!-- 课程大纲组件 -->
                  <CourseMenu
                    :chapterVideoList="chapterVideoList"
                    :courseId="courseId"
                    :dense="true"
                    :noAction="false"
                  />
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- //TODO:课程相关视频 -->
                <v-sheet rounded="lg"> </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Comment from "@/components/Comments";
import VideoBar from "@/components/Video/VideoBar";
import DrawerEditor from "@/components/DrawerEditor";
import CourseMenu from "@/components/Course/CourseMenu";
import courseApi from "@/api/course";
export default {
  components: {
    Navbar,
    Comment,
    VideoBar,
    DrawerEditor,
    CourseMenu,
  },
  data() {
    return {
      showComment: true,
      courseId: this.$route.query.courseId,
      vid: this.$route.params.vid,
      videoId: this.$route.query.videoId,
      chapterVideoList: [], //课程的视频列表
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
    };
  },
  created() {
    this.initCourseInfo();
  },
  methods: {
    // 获取当前id的课程信息
    initCourseInfo() {
      courseApi.courseDetail(this.courseId).then((response) => {
        // FIXME: 登录token过期导致无法请求无数据
        console.log(response.data);
        this.chapterVideoList = response.data.allChapterVideo;
        this.courseWebVo = response.data.courseWebVo;
      });
    },
  },
};
</script>


<style>
</style>