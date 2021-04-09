<template>
  <v-container>
    <!-- 轮播图 -->
    <v-carousel
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
      <h1 class="grey-darken-1--text font-weight-bold mb-2">课程列表</h1>
      <v-layout row wrap>
        <v-flex
          class="pa-2"
          xs12
          sm6
          md3
          v-for="course in eduList"
          :key="course.id"
        >
          <v-card rounded>
            <v-responsive :aspect-ratio="16 / 9">
              <v-img :src="course.cover" height="200px"></v-img>
            </v-responsive>
            <v-card-title> {{ course.title }} </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <!-- 讲师列表 -->
    <v-container grid-list-xs>
      <h1 class="grey-darken-1--text text-darken-4 font-weight-bold mb-4">
        讲师列表
      </h1>
      <v-layout row wrap justify-space-between>
        <v-flex xs12 sm6 md3 v-for="teacher in adminList" :key="teacher.id">
          <v-card flat class="text-center">
            <v-avatar rounded="circle" size="128"
              ><v-img :src="teacher.avatar"></v-img
            ></v-avatar>

            <v-card-text>{{ teacher.name }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import indexApi from "@/api/index";
export default {
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
    };
  },
  created() {
    this.getIndexData();
  },
  methods: {
    getIndexData() {
      indexApi.getIndexData().then((response) => {
        this.adminList = response.adminList;
        this.eduList = response.eduList;
        console.log(this.adminList);
        console.log(this.eduList);
      });
    },
  },
};
</script>
