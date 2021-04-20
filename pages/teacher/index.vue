<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>全部讲师</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left> view_list </v-icon>
          列表视图
        </v-tab>
        <v-tab>
          <v-icon left> apps </v-icon>
          网格视图
        </v-tab>

        <!-- 列表视图 -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi
                ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel,
                lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis
                non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non
                nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                nec, quam. Phasellus blandit leo ut odio.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- 网格视图 -->
        <v-tab-item>
          <v-container grid-list-xs>
            <v-card flat>
              <v-layout row wrap>
                <v-flex
                  class="pa-2"
                  xs6
                  md4
                  v-for="teacher in teacherList"
                  :key="teacher.id"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      :elevation="hover ? 12 : 2"
                      rounded
                      router
                      :to="`/teacher/${teacher.id}`"
                    >
                      <v-img height="100" width="100" :src="teacher.avatar">
                      </v-img>
                      <v-card-title>{{ teacher.name }}</v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>
              </v-layout>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import teacherApi from "@/api/teacher";
export default Vue.extend({
  data() {
    return {
      tabs: null,
      page: 1, //传递参数
      limit: 8, //传递参数
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
      });
    },
  },
});
</script>

<style>
</style>