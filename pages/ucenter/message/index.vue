<template>
  <v-card flat>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="createTime"
      :sort-desc="true"
      class="elevation-0"
      :page.sync="page"
      hide-default-footer
      :loading="loading"
      loading-text="正在加载..."
      locale="zh-CN"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">消息列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:[`item.createTime`]="{ item }">
        <v-chip>
          {{ formatDate(item.createTime) }}
        </v-chip>
      </template>
      <template v-slot:[`item.type`]="{ item }">
        <v-chip>
          {{ computeType(item.type) }}
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
          <span>查看消息</span>
        </v-tooltip>
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <a-empty description="暂时没有消息" />
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-container grid-list-xs>
      <div class="text-center">
        <v-pagination
          @previous="pageMessages"
          @next="pageMessages"
          @input="pageMessages"
          v-model="page"
          :length="pages"
          :total-visible="8"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import messageApi from "@/api/message";
import moment from "moment";
moment.locale("zh-CN");
export default {
  layout: "ucenter",
  data() {
    return {
      breadList: [
        {
          disabled: false,
          // exact: boolean,
          // href: string,
          link: true,
          text: "个人中心",
        },
        {
          disabled: false,
          // exact: boolean,
          // href: string,
          link: true,
          text: "消息中心",
          to: "/ucenter/message",
        },
      ],
      loading: false,
      page: 1,
      limit: 8,
      pages: 1,
      total: 0,
      items: [
        {
          id: "",
          memberId: "",
          senderName: "",
          content: "",
          link: "",
          isRead: 1,
          type: 3,
          isDeleted: 0,
          createTime: "",
          modifiedTime: "",
        },
      ],
      headers: [
        { text: "消息类型", value: "type", align: "center" },
        { text: "创建时间", value: "createTime", align: "center" },
        { text: "发信人", value: "senderName", align: "center" },
        { text: "内容", value: "content", align: "center" },
        { text: "操作", value: "actions", sortable: false, align: "center" },
      ],
    };
  },
  created() {
    this.pageMessages();
  },
  methods: {
    pageMessages() {
      messageApi.pageMessage(this.page, this.limit).then((response) => {
        console.log(response.data);
        this.items = response.data.items;
        this.pages = parseInt(response.data.pages);
        this.total = parseInt(response.data.total);
      });
    },
    formatDate(value) {
      return moment(value).fromNow();
    },
    computeType(value) {
      switch (value) {
        case 0:
          return "新增评论";
        case 1:
          return "回复评论";
        case 2:
          return "文章点赞";
        case 3:
          return "评论点赞";
        default:
          return "";
      }
    },
    checkItem(item) {
      this.$router.push(item.link);
    },
  },
};
</script>

<style>
</style>