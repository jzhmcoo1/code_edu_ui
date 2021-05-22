<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">讲师详情</h1>
      <v-card>
        <v-layout column wrap>
          <v-card-title primary-title>
            <v-icon>person</v-icon>
            讲师信息
            <v-btn icon @click="showTeacher = !showTeacher">
              <v-icon>{{
                showTeacher ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-expand-transition>
            <div v-show="showTeacher">
              <v-divider></v-divider>
              <v-container grid-list-xs>
                <v-card flat>
                  <v-row justify="space-between">
                    <v-col
                      cols="6"
                      md="3"
                      class="d-flex justify-center"
                      align-self="center"
                    >
                      <v-avatar rounded="circle" size="200">
                        <v-img class="zoom-img" :src="teacher.avatar" />
                      </v-avatar>
                    </v-col>
                    <v-col align-self="center">
                      <v-card-text>
                        <span class="title mr-2">讲师姓名</span>
                        <span class="body-1">{{ teacher.name }}</span>
                      </v-card-text>
                      <v-card-text>
                        <span class="title mr-2">讲师简介</span>
                        <span v-html="teacher.intro" class="body-1"></span>
                      </v-card-text>
                      <v-card-text>
                        <span class="title">讲师评分</span>
                        <span>
                          <v-rating
                            background-color="grey"
                            color="primary"
                            empty-icon="mdi-star-outline"
                            full-icon="mdi-star"
                            half-icon="mdi-star-half-full"
                            half-increments
                            hover
                            dense
                            v-model="teacher.score"
                            length="5"
                            size="24"
                            readonly
                          ></v-rating>
                        </span>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
            </div>
          </v-expand-transition>
        </v-layout>
      </v-card>
      <!-- 讲师课程 -->
      <v-card class="mt-3">
        <v-card-title primary-title>
          <v-icon>school</v-icon>
          讲师课程
          <v-btn icon @click="showRelated = !showRelated">
            <v-icon>{{
              showRelated ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-expand-transition>
          <div v-show="showRelated">
            <v-layout row wrap v-if="courseList.length !== 0">
              <v-flex
                align-self-center
                class="pa-2"
                xs12
                sm6
                md4
                v-for="course in courseList"
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
            <v-layout row wrap v-else justify-center>
              <a-empty description="该老师暂时还没有开放课程" />
            </v-layout>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import teacherApi from "@/api/teacher";
import courseApi from "@/api/course";
export default Vue.extend({
  data() {
    return {
      teacher: {
        score: 0, //评分
        name: "",
        intro: "",
      },
      teacherId: this.$route.params.id,
      courseList: [],
      showTeacher: true,
      showRelated: true,
    };
  },
  created() {
    this.getTeacherInfo();
    this.getCourseList();
  },
  methods: {
    async getTeacherInfo() {
      teacherApi.getTeacherInfo(this.$route.params.id).then((response) => {
        this.teacher = response.data.teacher;
      });
    },
    getCourseList() {
      courseApi
        .conditionList(1, 8, { teacherId: this.$route.params.id })
        .then((response) => {
          this.courseList = response.data[`${this.teacher.name}courseList`];
        });
    },
  },
});
</script>

<style>
</style>