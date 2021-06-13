<template>
  <v-container>
    <!-- 轮播图 -->
    <v-carousel
      id="slider"
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>

    <!-- 课程列表 -->
    <v-container grid-list-xs>
      <h1 class="heading--text font-weight-bold mb-2">
        课程列表
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon router to="/course" v-bind="attrs" v-on="on">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </template>
          <span>查看全部课程</span>
        </v-tooltip>
      </h1>
      <v-layout row wrap v-if="loadingCourse">
        <v-flex class="pa-2" xs12 sm6 md3 v-for="index in 8" :key="index">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex
          class="pa-2"
          xs12
          sm6
          md3
          v-for="course in eduList"
          :key="course.id"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              rounded
              :elevation="hover ? 12 : 2"
              router
              :to="`/course/${course.id}`"
            >
              <v-responsive :aspect-ratio="16 / 9">
                <v-img
                  class="zoom-img"
                  :src="course.cover"
                  height="200px"
                ></v-img>
              </v-responsive>
              <v-card-title> {{ course.title }} </v-card-title>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <!-- 讲师列表 -->
    <v-container grid-list-xs>
      <h1 class="heading--text font-weight-bold mb-2">
        讲师列表
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon router to="/teacher" v-bind="attrs" v-on="on">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </template>
          <span>查看全部讲师</span>
        </v-tooltip>
      </h1>
      <v-layout row wrap v-if="loadingTeacher">
        <v-flex class="pa-2" xs12 sm6 md3 v-for="index in 8" :key="index">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="image,card-heading"
          ></v-skeleton-loader>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap justify-space-between>
        <v-flex xs12 sm6 md3 v-for="teacher in adminList" :key="teacher.id">
          <v-card
            router
            :to="`/teacher/${teacher.id}`"
            flat
            class="text-center"
          >
            <v-avatar class="avatar-rotate" rounded="circle" size="128"
              ><v-img :src="teacher.avatar"></v-img
            ></v-avatar>

            <v-card-text>{{ teacher.name }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- 回到顶部按钮 -->
    <v-btn
      fab
      fixed
      dark
      right
      bottom
      color="indigo"
      @click="$vuetify.goTo('#hero')"
      v-show="backTopShow"
    >
      <v-icon> arrow_upward </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import courseApi from "@/api/course";
import teacherApi from "@/api/teacher";
export default {
  head() {
    return {
      title: "首页",
    };
  },
  data() {
    return {
      adminList: [],
      eduList: [],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      backTopShow: false,
      loadingCourse: false,
      loadingTeacher: false,
    };
  },
  created() {
    this.getIndexData();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 获取首页数据
    getIndexData() {
      this.loadingCourse = true;
      this.loadingTeacher = true;
      // 获取前8门课程
      courseApi.conditionList(1, 8).then((response) => {
        this.eduList = response.data.items;
        this.loadingCourse = false;
      });
      teacherApi.getTeacherList(1, 8).then((response) => {
        this.adminList = response.data.records;
        this.loadingTeacher = false;
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
  },
};
</script>
