<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table
      :headers="headers"
      :items="items"
      sort-by="createTime"
      :sort-desc="true"
      hide-default-footer
      class="elevation-0"
    >
      <!-- 头部工具栏 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">笔记管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn router to="/course" text color="info">
                <v-icon v-bind="attrs" v-on="on">search</v-icon>
                去听课
              </v-btn>
            </template>
            <span>发现新课程</span>
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
          <span>查看笔记</span>
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
          <span>编辑笔记</span>
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
          <span>删除笔记</span>
        </v-tooltip>
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <v-container grid-list-xs class="mt-5">
          <a-empty description="您还没有笔记,快去听课学习记录笔记吧!" />
        </v-container>
      </template>
    </v-data-table>
    <!-- 分页 -->
    <v-container grid-list-xs>
      <div class="text-center">
        <v-pagination
          @previous="getNoteList"
          @next="getNoteList"
          @input="getNoteList"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import noteApi from "@/api/note";
import moment from "moment";
moment.locale("zh-CN");
export default {
  layout: "ucenter",
  created() {
    this.getNoteList();
  },
  head() {
    return {
      title: "笔记列表",
    };
  },
  data() {
    return {
      toDeleteItem: null, //保存待删除的item
      dialogDelete: false, //确认删除的对话框
      loading: false, //控制表格是否正在加载
      page: 1,
      limit: 8,
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
          text: "笔记管理",
          to: "/ucenter/note",
        },
      ],
      headers: [
        { text: "笔记标题", align: "center", value: "title" },
        { text: "创建时间", value: "createTime", align: "center" },
        { text: "修改时间", value: "modifiedTime", align: "center" },
        { text: "操作", value: "actions", sortable: false, align: "center" },
      ], //表格标题行
      items: [],
      pages: 0,
    };
  },
  computed: {},
  methods: {
    // 获取笔记列表
    getNoteList() {
      noteApi.pageAuthorNoteList(this.page, this.limit).then((response) => {
        console.log(response);
        this.items = response.data.items;
        this.pages = parseInt(response.data.pages);
      });
    },
    // 格式化时间
    formatDate(value) {
      return moment(value).fromNow();
    },
    // 打开对话框,确认是否删除
    openDeleteDialog(item) {
      this.toDeleteItem = item;
      this.dialogDelete = true;
    },
    // 删除笔记
    deleteItem() {
      noteApi.deleteNote(this.toDeleteItem.id).then((response) => {
        console.log(response);
        if (response.code === 200) {
          this.$message.success("删除笔记成功😁");
        } else {
          this.$message.error("删除笔记失败😢");
        }
        this.getNoteList();
        this.dialogDelete = false;
      });
    },
    // 查看笔记
    checkItem(item) {
      this.$router.push({
        name: "ucenter-note-edit-id",
        params: { id: item.id, edit: false },
      });
    },
    // 编辑笔记
    editItem(item) {
      this.$router.push({
        name: "ucenter-note-edit-id",
        params: { id: item.id, edit: true },
      });
    },
  },
};
</script>

<style>
</style>