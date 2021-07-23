<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500px" height="100%">
      <v-card>
        <v-card-title class="text-h5">
          您即将参加 {{ detail.name }} 考试
        </v-card-title>

        <v-card-title primary-title> 考试时间⏰ </v-card-title>
        <v-card-text class="pb-0">
          <p>
            开始时间
            <span class="font-weight-bold">{{ detail.startDate }}</span>
          </p>
          <p>
            结束时间
            <span class="font-weight-bold">{{ detail.endDate }}</span>
          </p>
        </v-card-text>

        <v-card-title primary-title class="pt-0"> 题目信息📖 </v-card-title>
        <v-card-text class="pb-0">
          <p v-if="detail.judgeScore">
            判断题分值:
            <span class="font-weight-bold">{{ detail.judgeScore }}</span>
          </p>
          <p v-if="detail.radioScore">
            单选题分值:
            <span class="font-weight-bold">{{ detail.radioScore }}</span>
          </p>
          <p v-if="detail.checkScore">
            多选题分值:
            <span class="font-weight-bold">{{ detail.checkScore }}</span>
          </p>
          <p>
            总分分值:
            <span class="font-weight-bold">{{ detail.score }}</span>
          </p>
        </v-card-text>

        <v-card-title primary-title class="pt-0"> 考试描述👀 </v-card-title>

        <v-card-text v-if="detail.desc === null || detail.desc === ''">
          <a-empty description="该考试暂无描述"></a-empty>
        </v-card-text>
        <v-card-text v-else>
          {{ detail.desc }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <p>是否确认参加?</p>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="closeDialog">取消</v-btn>
          <v-btn color="primary" text @click="attendExam">确认参加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  props: {
    dialog: false,
    detail: {
      name: "", //考试名
      avatar: "", //考试封面
      courseName: "", //考试课程名
      startDate: "", //考试开始时间
      creator: "", //考试创建者
      desc: "", //考试描述
      elapse: 0, //考试时间(分钟)
      endDate: "", //考试结束时间
      id: "", //考试id
      radioScore: 0,
      score: 100,
      judgeScore: 0,
      checkScore: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    status() {
      const now = new Date();
      if (moment(now).isBefore(this.detail.startDate)) {
        return "未开始";
      } else if (moment(now).isAfter(this.detail.endDate)) {
        return "已结束";
      } else {
        return "进行中";
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 计算从进入考试开始+考试限制时间的结束时间
    endTime() {
      if (
        this.$store.state.userInfo.exam &&
        this.detail.id === this.$store.state.userInfo.exam.id &&
        this.$store.state.userInfo.exam.endDate !== ""
      ) {
        console.log(
          "考试日期存在,结果为:",
          this.$store.state.userInfo.exam.endDate
        );
        return this.$store.state.userInfo.exam.endDate;
      }
      const now = new Date();
      const newTime = new Date(
        Date.parse(now) + this.detail.elapse * 60 * 1000
      );
      console.log(this.detail.elapse + "分钟");
      console.log(
        "考试日期不存在,结果为:",
        moment(newTime).format("YYYY-MM-DD HH:mm:SS")
      );
      return moment(newTime).format("YYYY-MM-DD HH:mm:SS");
    },
    isOpen() {
      const now = new Date();
      if (moment(now).isBetween(this.detail.startDate, this.detail.endDate)) {
        return true;
      }
      return false;
    },
    attendExam() {
      if (
        this.$store.state.userInfo.exam.id !== "" &&
        this.$store.state.userInfo.exam.id !== undefined &&
        this.$store.state.userInfo.exam.id !== null &&
        this.detail.id !== this.$store.state.userInfo.exam.id
      ) {
        this.$message.warning("请先完成上一场考试");
        this.$router.push("/exam/" + this.$store.state.userInfo.exam.id);
        return;
      }
      const end_time = this.endTime();
      if (this.isOpen()) {
        console.log("参加考试");
        this.$router.push("/exam/" + this.detail.id);
        this.$store.commit("userInfo/setExam", {
          id: this.detail.id,
          endDate: end_time,
          answerMap: {},
        });
      } else {
        this.$message.warning(`🤯对不起,你所参加的考试${this.status}`);
      }
      this.closeDialog();
    },
  },
  created() {},
};
</script>

<style>
</style>