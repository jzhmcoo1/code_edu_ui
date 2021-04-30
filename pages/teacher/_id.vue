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
                <v-row justify="center">
                  <v-col>
                    <v-card flat>
                      <v-avatar size="200">
                        <v-img class="zoom-img" :src="teacher.avatar" />
                      </v-avatar>
                    </v-card>
                  </v-col>
                  <v-col align-self="center">
                    <v-card-text class="title">
                      {{ teacher.name }}
                    </v-card-text>
                    <v-card-text class="subtitle-2">
                      {{ teacher.intro }}
                    </v-card-text>
                  </v-col>
                </v-row>
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
              <a-empty />
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
export default Vue.extend({
  data() {
    return {
      teacher: {},
      courseList: [],
      showTeacher: true,
      showRelated: true,
    };
  },
  //params.id获取路径id值
  asyncData({ params }) {
    return teacherApi.getTeacherInfo(params.id).then((response) => {
      return {
        teacher: response.data.teacher,
        courseList: response.data.courseList,
      };
    });
  },
  methods: {},
  created() {
    console.log(this.teacher, this.courseList);
  },
});
</script>

<style>
</style>