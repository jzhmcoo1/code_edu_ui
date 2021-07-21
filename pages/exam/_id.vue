<template>
  <v-container grid-list-xs>
    <!-- 标题 -->
    <v-container grid-list-xs>
      <exam-header :exam="exam" />
    </v-container>
    <!-- 题目目录 -->
    <v-container grid-list-xs>
      <v-row>
        <!-- 目录区 -->
        <v-col cols="3" style="position: sticky; top: 100px">
          <exam-aside :groups="groups" />
        </v-col>
        <!-- 题目区 -->
        <v-col>
          <exam-content :question="question" @changeAnswer="addOrUpdate" />
        </v-col>
      </v-row>
    </v-container>

    <!-- 题目详情和选项 -->
  </v-container>
</template>

<script>
import examApi from "@/api/exam";
import ExamHeader from "./components/ExamHeader.vue";
import ExamAside from "./components/ExamAside.vue";
import ExamContent from "./components/ExamContent.vue";
export default {
  components: { ExamHeader, ExamAside, ExamContent },
  middleware: "auth",
  data() {
    return {
      examId: this.$route.params.id,
      groups: [],
      checkIds: [],
      judgeIds: [],
      radioIds: [],
      exam: {
        examId: "",
        examName: "",
        examScore: 100,
        examScoreJudge: 25,
        examScoreCheck: 0,
        examScoreRadio: 50,
        examTimeLimit: 60,
        examEndDate: "",
      },
      question: {
        id: "",
        index: 0,
        type: "",
      },
      answerMap: this.$store.state.userInfo.exam.answerMap || {}, //答案集合
      endDate: this.$store.state.userInfo.exam.endDate || "",
    };
  },
  methods: {
    async getExamDetailById() {
      const response = await examApi.detail(this.examId);
      this.checkIds = response.data.checkIds.filter((value) => value !== "");
      this.judgeIds = response.data.judgeIds.filter((value) => value !== "");
      this.radioIds = response.data.radioIds.filter((value) => value !== "");
      this.exam = response.data.exam;
      this.groups = [
        { text: "单选题", icon: "mdi-radiobox-marked", ids: this.radioIds },
        { text: "多选题", icon: "mdi-check-box-outline", ids: this.checkIds },
        { text: "判断题", icon: "disabled_by_default", ids: this.judgeIds },
      ];
    },
    addOrUpdate(id, value) {
      console.log("接到事件");
      console.log(id, value);
      if (this.answerMap[""]) {
        this.answerMap[""] = null;
      }
      this.answerMap[`${id}`] = value;
      this.$store.commit("userInfo/setExam", {
        id: this.examId,
        endDate: this.endDate,
        answerMap: this.answerMap,
      });
    },
  },
  created() {
    this.getExamDetailById();
    // 选择目录后,获取题目
    PubSub.subscribe("fetchQuestion", (event, { id, type, index }) => {
      this.question = { id, type, index };
      console.log("收到的参数为:", id, type, index);
    });
  },
  head() {
    return {
      title: this.exam.examName,
    };
  },
  beforeDestroy() {
    PubSub.unsubscribe("fetchQuestion");
  },
};
</script>

<style>
</style>