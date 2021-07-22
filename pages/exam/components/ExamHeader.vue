<template>
  <v-sheet class="d-flex">
    <h1 class="headline heading--text font-weight-bold">{{ exam.examName }}</h1>
    <v-divider class="mx-4 mt-n2" vertical></v-divider>
    <h1 class="headline heading--text">
      时间:
      <span class="font-weight-bold">{{ exam.examTimeLimit }} </span>
      分钟
    </h1>
    <v-spacer></v-spacer>
    <v-btn class="mr-2 mt-n1" color="info" outlined @click="finish">交卷</v-btn>
    <h3 class="mt-1 mr-2 heading--text">倒计时</h3>
    <flip-down
      :endDate="endTime()"
      @timeUp="finish"
      :type="3"
      :theme="2"
      :timeUnit="['', '时', '分', '秒']"
    />
  </v-sheet>
</template>

<script>
import FlipDown from "vue-flip-down";
import examApi from "@/api/exam";
import moment from "moment";
export default {
  data() {
    return {
      endDate: this.$store.state.userInfo.exam.endDate,
    };
  },
  components: {
    FlipDown,
  },
  props: {
    exam: {
      examId: "",
      examName: "",
      examScore: 100,
      examScoreJudge: 25,
      examScoreCheck: 0,
      examScoreRadio: 50,
      examTimeLimit: 60,
    },
  },
  created() {},
  methods: {
    endTime() {
      console.log(this.endDate);
      console.log(moment(this.endDate).toDate());
      return moment(this.endDate).toDate();
    },
    finish() {
      const exam = this.$store.state.userInfo.exam;
      const { id } = exam;
      let answerMap = {};
      for (let key in exam.answerMap) {
        if (key !== "") {
          if (Array.isArray(exam.answerMap[key])) {
            answerMap[key] = exam.answerMap[key];
          } else {
            answerMap[key] = [exam.answerMap[key]];
          }
        }
      }
      if (Object.keys(answerMap).length === 0) {
        this.$message.warning("请不要交白卷😅");
        return;
      }
      console.log({ id, answerMap });
      console.log(exam);
      examApi.finish(id, answerMap).then((response) => {
        console.log(response);
        if (response.code === 200) {
          this.$message.success("交卷成功!👏");
          this.$store.commit("userInfo/removeExam");
          this.$router.push("/exam");
        }
      });
    },
  },
};
</script>

<style>
</style>