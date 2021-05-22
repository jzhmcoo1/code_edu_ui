<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="createTime"
      class="elevation-0"
      :page.sync="page"
      hide-default-footer
      :loading="loading"
      loading-text="正在加载..."
      locale="zh-CN"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">文章管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索文章"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn router to="/ucenter/article/add" text color="info" icon>
                <v-icon v-bind="attrs" v-on="on">add_circle</v-icon>
              </v-btn>
            </template>
            <span>新建文章</span>
          </v-tooltip>
        </v-toolbar>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>确认要删除吗?此操作不可恢复</v-card-title>
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
      <template v-slot:[`item.createTime`]="{ item }">
        <v-chip>
          {{ formatDate(item.createTime) }}
        </v-chip>
      </template>
      <template v-slot:[`item.modifiedTime`]="{ item }">
        <v-chip>
          {{ formatDate(item.modifiedTime) }}
        </v-chip>
      </template>
      <template v-slot:[`item.typeName`]="{ item }">
        <v-chip class="text-capitalize">
          {{ item.typeName }}
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
          <span>查看文章</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              v-on="on"
              v-bind="attrs"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>编辑文章</span>
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
          <span>删除文章</span>
        </v-tooltip>
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <a-empty />
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-container grid-list-xs>
      <div class="text-center">
        <v-pagination
          @previous="getArticleMemberList"
          @next="getArticleMemberList"
          @input="getArticleMemberList"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import articleApi from "@/api/article";
import moment from "moment";
moment.locale("zh-CN");
export default {
  layout: "ucenter",
  data: () => ({
    search: "", //搜索
    toDeleteItem: null, //保存待删除的item
    dialogDelete: false, //确认删除的对话框
    loading: false, //控制表格是否正在加载
    headers: [
      {
        text: "文章封面",
        align: "center",
        sortable: false,
        value: "cover",
      },
      { text: "文章标题", value: "title", align: "center" },
      { text: "创建时间", value: "createTime", align: "center" },
      { text: "修改时间", value: "modifiedTime", align: "center" },
      { text: "所属分类", value: "typeName", align: "center" },
      { text: "文章浏览数", value: "viewCount", align: "center" },
      { text: "文章点赞数", value: "likeCount", align: "center" },
      { text: "文章评论数", value: "commentCount", align: "center" },
      { text: "操作", value: "actions", sortable: false, align: "center" },
    ], //表格标题行
    searchObj: {}, // 查询表单对象
    memberId: "", //作者id
    page: 1, //当前页
    pages: 1, //总共页
    limit: 8, //每页个数
    items: [
      {
        id: "", //文章id
        authorName: "", //作者姓名
        authorAvatar: "", //作者头像
        typeParentName: "", //一级标签名
        typeName: "", //二级标签名
        title: "", //文章名称
        cover: "", //文章封面
        viewCount: "0", //浏览数
        commentCount: "0", //评论数
        likeCount: "0", //点赞数
        createTime: "", //创建时间
        modifiedTime: "", //修改时间
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
        text: "文章管理",
        to: "/ucenter/article",
      },
    ],
  }),

  created() {
    this.getArticleMemberList();
  },

  methods: {
    // 打开对话框,确认是否删除
    openDeleteDialog(item) {
      this.toDeleteItem = item;
      this.dialogDelete = true;
    },
    // 获取登录用户的文章列表
    getArticleMemberList() {
      articleApi.userArticlePage(this.page, this.limit).then((response) => {
        this.items = response.data.items;
      });
    },
    // 删除文章
    deleteItem() {
      articleApi.deleteArticle(this.toDeleteItem.id).then((response) => {
        if (response.code === 200) {
          this.$message.success("删除成功");
          this.getArticleMemberList();
          this.toDeleteItem = null;
          this.dialogDelete = false;
        }
      });
    },
    // 编辑文章
    editItem(item) {
      this.$router.push({
        path: "/ucenter/article/add",
        query: { articleId: item.id },
      });
    },
    // 去前台查看文章
    checkItem(item) {
      this.$router.push(`/article/${item.id}`);
    },
    formatDate(value) {
      return moment(value).fromNow();
    },
  },
};
</script>

<style>
</style>