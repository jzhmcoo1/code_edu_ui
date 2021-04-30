<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">讲师列表</h1>
      <!-- 讲师列表 -->
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="teacher in teacherList"
          :key="teacher.id"
        >
          <v-hover v-slot="{ hover }" open-delay="100" close-delay="100">
            <v-card
              class="text-center mt-14"
              :elevation="hover ? 12 : 2"
              router
              :to="`/teacher/${teacher.id}`"
            >
              <v-sheet rounded="lg">
                <v-avatar
                  size="128"
                  :aspect-ratio="1 / 1"
                  :class="`mt-n14 elevation-12`"
                >
                  <v-img
                    :aspect-ratio="1 / 1"
                    class="zoom-img rounded-circle"
                    :src="teacher.avatar"
                  ></v-img>
                </v-avatar>

                <v-card-text class="text-center text--secondary">
                  <p class="text-h6">{{ teacher.name }}</p>
                  <p class="text-h5">{{ teacher.intro }}</p>
                </v-card-text>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <!-- 分页 -->
      <v-container class="text-center mt-2">
        <v-pagination v-model="page" :length="pages"></v-pagination>
      </v-container>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import teacherApi from "@/api/teacher";
export default Vue.extend({
  data() {
    return {
      tabs: null,
      page: 1, //传递参数
      pages: 1, //总页数
      limit: 10, //传递参数
      current: 1, //当前页数
      total: 8, //总记录数
      hasPrevious: false,
      hasNext: false,
      teacherList: [
        {
          id: "1189390295668469762",
          name: "小王",
          intro: "今天是晴天",
          avatar:
            "https://edu-guli-0313.oss-cn-beijing.aliyuncs.com/2021/03/25/ce95ee18bb354c4ebfbff8c12370294bfile.png",
          sort: 0,
          isDeleted: 0,
          createTime: "2019-10-30 11:55:19",
          modifiedTime: "2021-03-25 19:55:48",
        },
      ],
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    getTeacherList() {
      teacherApi.getTeacherList(this.page, this.limit).then((response) => {
        console.log(response.data);
        this.teacherList = response.data.items;
        this.pages = response.data.pages;
      });
    },
  },
});
</script>

<style>
</style>