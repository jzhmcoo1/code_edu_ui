<template>
  <v-card flat class="pa-2 mb-2">
    <v-row>
      <v-col class="pa-1" cols="12" sm="6" md="4">
        <v-responsive :aspect-ratio="12 / 1">
          <v-img class="zoom-img" height="236px" :src="detail.avatar"> </v-img>
        </v-responsive>
      </v-col>
      <v-col cols="6" md="3">
        <v-card-title primary-title>
          <v-icon left>mdi-pencil</v-icon>
          {{ detail.name }}
        </v-card-title>
        <v-card-text>
          <p class="font-weight-bold">
            <v-icon left>mdi-school</v-icon>
            {{ detail.courseName }}
          </p>
          <p class="caption">
            <v-icon left>mdi-calendar</v-icon>
            开始时间
            <v-chip :color="statusColor" small>{{ fromNow }}</v-chip>
          </p>
          <p class="caption">
            <v-icon left>schedule</v-icon>
            考试限时
            <v-chip small color="accent" class="font-weight-bold"
              >{{ detail.elapse }} min</v-chip
            >
          </p>
          <p class="caption">
            <v-icon left>mdi-calendar</v-icon>
            考试状态 <v-chip :color="statusColor" small>{{ status }}</v-chip>
          </p>
        </v-card-text>
      </v-col>
      <v-col>
        <v-card-title
          height="100%"
          fill-height
          class="d-flex flex-column justify-space-between align-start"
        >
          <p>考试描述👀</p>
          <p class="body-2 description" style="min-height: 70px">
            {{ detail.desc }}
          </p>
          <v-btn block color="primary" :disabled="!isOpen">{{
            isOpen ? "立即参加" : "已结束"
          }}</v-btn>
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  name: "exam-item",
  props: {
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
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.detail);
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
    statusColor() {
      const now = new Date();
      if (moment(now).isBefore(this.detail.startDate)) {
        return "accent";
      } else if (moment(now).isAfter(this.detail.endDate)) {
        return "error";
      } else {
        return "success";
      }
    },
    isOpen() {
      const now = new Date();
      if (moment(now).isBetween(this.detail.startDate, this.detail.endDate)) {
        return true;
      }
      return false;
    },
    startTime() {
      return moment(this.detail.startDate).format("YYYY/M/D H:mm:ss");
    },
    fromNow() {
      return moment(this.detail.startDate).fromNow();
    },
  },
  methods: {},
};
</script>

<style>
</style>