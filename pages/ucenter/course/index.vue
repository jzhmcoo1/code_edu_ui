<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="courseData.items"
      :sort-desc="['createTime']"
      class="elevation-0"
      :page.sync="page"
      hide-default-footer
      :loading="loading"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">课程管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索课程"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn router to="/course" text color="info">
                <v-icon v-bind="attrs" v-on="on">search</v-icon>
                发现新课程
              </v-btn>
            </template>
            <span>发现新课程</span>
          </v-tooltip>
        </v-toolbar>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>确认要退课吗,选课记录将会被删除</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" text @click="dialogDelete = false"
                >取消</v-btn
              >
              <v-btn color="error" text @click="deleteItem">确认</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <!-- 封面 -->
      <template v-slot:[`item.cover`]="{ item }">
        <div style="overflow: hidden">
          <v-img class="zoom-img" :aspect-ratio="16 / 9" :src="item.cover" />
        </div>
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
          <span>继续学习</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="error"
              v-bind="attrs"
              v-on="on"
              small
              @click="openDeleteDialog(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>退课</span>
        </v-tooltip>
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <v-container grid-list-xs class="mt-5">
          <a-empty description="您还没有选课,快去课程列表发现新课程吧" />
        </v-container>
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-container grid-list-xs>
      <div class="text-center">
        <v-pagination
          @previous="initMyCourse"
          @next="initMyCourse"
          @input="initMyCourse"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import myCourseApi from "@/api/ucenter";
export default {
  layout: "ucenter",
  head: {
    title: "课程管理",
  },
  data() {
    return {
      page: 1,
      limit: 8,
      ucenterId: "",
      pages: 1, //总页数
      total: 1, //总记录数
      courseData: {
        items: [],
      }, //返回的数据
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
          text: "课程管理",
          to: "/ucenter/course",
        },
      ],
      headers: [
        {
          text: "课程封面",
          align: "center",
          sortable: false,
          value: "cover",
        },
        { text: "课程标题", value: "title", align: "center" },
        { text: "选课时间", value: "createTime", align: "center" },
        { text: "选课人数", value: "choiceCount", align: "center" },
        { text: "操作", value: "actions", sortable: false, align: "center" },
      ], //表格标题行
      toDeleteItem: null, //保存待删除的item
      dialogDelete: false, //确认删除的对话框
      loading: false, //控制表格是否正在加载
      search: "", //搜索内容
    };
  },
  created() {
    // this.ucenterId = cookie.getJSON("dhu_ucenter").id; //获取已登录用户的id
    // this.initMyCourse();
  },
  methods: {
    // 初始化我的选课列表
    initMyCourse() {
      myCourseApi
        .getMyCourseList(this.page, this.limit, this.ucenterId)
        .then((response) => {
          this.courseData = response.data;
          this.pages = response.data.pages;
          this.total = response.data.total;
          console.log(this.courseData);
        });
    },
    // 删除课程
    deleteItem() {
      myCourseApi
        .deletdMyCourese(this.toDeleteItem.courseId)
        .then((response) => {
          if (response.success) {
            this.$message.success("退选成功");
            this.initMyCourse();
            this.toDeleteItem = null;
            this.dialogDelete = false;
          }
        });
    },
    // 去前台查看课程
    checkItem(item) {
      this.$router.push(`/course/${item.courseId}`);
    },
    // 打开对话框,确认是否阐述
    openDeleteDialog(item) {
      this.toDeleteItem = item;
      this.dialogDelete = true;
    },
  },
};
</script>

<style>
</style>