<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="records"
      :loading="loading"
      :server-items-length="total"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">考试记录</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <!-- 封面 -->
      <template v-slot:[`item.examAvatar`]="{ item }">
        <div style="overflow: hidden">
          <v-sheet color="white">
            <v-img
              class="zoom-img"
              height="100px"
              :aspect-ratio="4 / 3"
              :src="item.examAvatar"
            />
          </v-sheet>
        </div>
      </template>
      <template v-slot:[`item.examRecord.examJoinDate`]="{ item }">
        <v-chip>
          {{ formatDate(item.examRecord.examJoinDate) }}
        </v-chip>
      </template>
      <template v-slot:[`item.examRecord.examJoinScore`]="{ item }">
        <v-chip
          label
          :color="item.examRecord.examJoinScore < 60 ? 'error' : 'accent'"
        >
          {{ item.examRecord.examJoinScore }}
        </v-chip>
      </template>
      <!-- 操作 -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              class="mr-2"
              color="info"
              @click="checkItem(item)"
              >mdi-eye</v-icon
            >
          </template>
          <span>查看考试记录</span>
        </v-tooltip>
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <a-empty description="暂时没有考试记录😓" />
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-container grid-list-xs>
      <div class="text-center">
        <v-pagination
          @previous="getRecord"
          @next="getRecord"
          @input="getRecord"
          v-model="page"
          :length="Math.ceil(total / limit)"
          :total-visible="7"
          circle
        ></v-pagination>
        <p>总共 {{ total }} 条记录</p>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import examApi from "@/api/exam";
import moment from "moment";
export default {
  layout: "ucenter",
  data() {
    return {
      page: 1,
      limit: 4,
      records: [{ courseName: "", examAvatar: "", examName: "" }],
      total: 0,
      loading: true,
      headers: [
        {
          text: "考试封面",
          align: "center",
          sortable: false,
          value: "examAvatar",
        },
        {
          text: "考试名称",
          align: "center",
          sortable: true,
          value: "examName",
        },
        {
          text: "课程名称",
          align: "center",
          sortable: true,
          value: "courseName",
        },
        {
          text: "考试时间",
          align: "center",
          sortable: true,
          value: "examRecord.examJoinDate",
        },
        {
          text: "考试得分",
          align: "center",
          sortable: true,
          value: "examRecord.examJoinScore",
        },
        {
          text: "操作",
          align: "center",
          sortable: false,
          value: "actions",
        },
      ],
      // 面包屑信息
      breadList: [
        {
          disabled: false,
          link: true,
          text: "个人中心",
        },
        {
          disabled: false,
          link: true,
          text: "考试记录",
          to: "/ucenter/exam",
        },
      ],
    };
  },
  created() {
    this.getRecord();
  },
  methods: {
    formatDate(time) {
      return moment(time).locale("zh-CN").fromNow();
    },
    getRecord() {
      this.loading = true;
      examApi.getUserRecordByPage(this.page, this.limit).then((response) => {
        console.log(response.data);
        this.records = response.data.rows;
        this.total = parseInt(response.data.total);
        this.loading = false;
      });
    },
    // 去前台查看文章
    checkItem(item) {
      this.$router.push(`/ucenter/exam/${item.examRecord.examRecordId}`);
    },
  },
};
</script>

<style>
</style>