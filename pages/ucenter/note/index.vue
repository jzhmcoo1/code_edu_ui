<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-data-table :headers="headers" hide-default-footer class="elevation-0">
      <!-- 头部工具栏 -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">笔记管理</v-toolbar-title>
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
      </template>
      <!-- 无数据提示 -->
      <template v-slot:no-data>
        <v-container grid-list-xs class="mt-5">
          <a-empty description="您还没有笔记,快去听课学习记录笔记吧!" />
        </v-container>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  // TODO: 完善笔记列表功能
  layout: "ucenter",
  data() {
    return {
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
    };
  },
  computed: {},
  methods: {
    // 点击新建笔记
    noteAdd() {
      this.$router.push("/ucenter/note/add");
    },
    noteDetail(item) {
      this.$router.push(`/ucenter/note/add/${item.id}`);
    },
    noteModify(item) {
      this.$router.push(`/ucenter/note/add/${item.id}`);
    },
    noteDelete(item) {},
  },
};
</script>

<style>
</style>