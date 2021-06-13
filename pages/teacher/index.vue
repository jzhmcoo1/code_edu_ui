<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">讲师列表</h1>
      <v-row justify="center">
        <v-col>
          <v-text-field
            name="search"
            label="输入教师姓名进行模糊检索"
            id="searchTeacher"
            v-model="teacherQuery.name"
            @keyup="getTeacherList"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-container grid-list-xs v-if="loading">
        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="index in 8" :key="index">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="image,card-heading"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
      <v-container grid-list-xs v-else>
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
                    <p v-html="teacher.intro" class="subtitle"></p>
                  </v-card-text>
                </v-sheet>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <!-- 分页 -->
        <v-container class="text-center mt-2">
          <v-pagination
            v-model="page"
            :length="pages"
            @input="getTeacherList"
            @next="getTeacherList"
            @previous="getTeacherList"
          ></v-pagination>
        </v-container>
      </v-container>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import teacherApi from "@/api/teacher";
export default Vue.extend({
  head: {
    title: "讲师列表",
  },
  data() {
    return {
      tabs: null,
      page: 1, //传递参数
      pages: 1, //总页数
      limit: 12, //传递参数
      current: 1, //当前页数
      total: 8, //总记录数
      teacherList: [
        {
          id: "",
          name: "",
          intro: "",
          avatar: "",
        },
      ],
      teacherQuery: {
        name: "",
      },
      loading: false,
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    getTeacherList() {
      this.loading = true;
      teacherApi
        .conditionList(this.page, this.limit, this.teacherQuery)
        .then((response) => {
          console.log(response.data);
          this.teacherList = response.data.records;
          this.pages = parseInt(response.data.pages);
          this.loading = false;
        });
    },
  },
});
</script>

<style>
</style>