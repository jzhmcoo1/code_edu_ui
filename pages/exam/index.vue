<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">考试列表</h1>
    </v-container>
    <!-- 考试页面头部 -->
    <v-container grid-list-xs>
      <exam-condition @searchExam="getExamList" />
      <v-alert v-show="examList.length !== 0" border="left" text type="success">
        共有
        <strong>{{ total }} </strong>
        条考试
      </v-alert>
    </v-container>
    <!-- 考试页面列表 -->
    <v-container grid-list-xs>
      <v-layout v-if="examList.length !== 0" row wrap>
        <v-flex class="mb-5" xs12 v-for="exam in examList" :key="exam.id">
          <exam-item :detail="exam" />
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <a-empty v-else description="暂无对应考试" />
    </v-container>
    <v-container grid-list-xs v-show="examList.length !== 0">
      <v-pagination
        @input="getExamList"
        @next="getExamList"
        @previous="getExamList"
        :length="length"
        :total-visible="7"
        v-model="page"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import examApi from "@/api/exam";
import ExamItem from "./components/ExamItem.vue";
import ExamCondition from "./components/ExamCondition.vue";
export default {
  components: { ExamItem, ExamCondition },
  data() {
    return {
      page: 1,
      limit: 4,
      total: 0,
      length: 0,
      examList: [],
      condition: {
        startTimeSort: true,
      },
    };
  },
  created() {
    this.getExamList();
  },
  methods: {
    getExamList(condition = this.condition) {
      if (!Number.isInteger(condition)) this.condition = condition;
      examApi
        .examList(this.page, this.limit, this.condition)
        .then((response) => {
          this.examList = response.data.rows;
          this.total = parseInt(response.data.total);
          this.length = Math.ceil(this.total / this.limit);
        });
    },
  },
};
</script>

<style>
</style>