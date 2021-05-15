<template>
  <v-container grid-list-xs>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">全部课程</h1>
      <v-card flat>
        <v-card-title primary-title> 一级分类 </v-card-title>
        <v-tabs
          v-model="tab"
          center-active
          background-color="background"
          show-arrows
        >
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab @click="searchSub('0')"> 全部一级分类 </v-tab>
          <v-tab
            :value="subject.id"
            v-for="subject in subjectNestedList"
            :key="subject.id"
            @click="searchSub(subject.id)"
          >
            {{ subject.title }}
          </v-tab>
        </v-tabs>

        <v-card-title primary-title v-show="subSubjectList.length !== 0">
          二级分类
        </v-card-title>
        <v-tabs
          show-arrows
          v-if="subSubjectList.length !== 0"
          v-model="subTab"
          center-active
          background-color="background"
        >
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab @click="searchTwo('')"> 全部二级分类 </v-tab>
          <v-tab
            :value="sub.id"
            v-for="sub in subSubjectList"
            :key="sub.id"
            @click="searchTwo(sub.id)"
          >
            {{ sub.title }}
          </v-tab>
        </v-tabs>
      </v-card>
    </v-container>
    <v-container grid-list-xs>
      <h1 class="headline heading--text">课程列表展示</h1>
      <!-- 课程列表 -->
      <v-container grid-list-xs>
        <!-- <h1 class="heading--text font-weight-bold mb-2">课程列表</h1> -->
        <v-layout row wrap v-if="data.items.length !== 0">
          <v-flex
            align-self-center
            class="pa-2"
            xs12
            sm6
            lg3
            v-for="item in data.items"
            :key="item.id"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                rounded
                router
                :to="`/course/${item.id}`"
              >
                <v-responsive :aspect-ratio="16 / 9">
                  <v-img
                    class="zoom-img"
                    :src="item.cover"
                    height="200px"
                  ></v-img>
                </v-responsive>
                <v-card-title> {{ item.title }} </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
        <a-empty v-else description="暂时没有该类的课程"></a-empty>
      </v-container>
      <!-- 分页器 -->
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="parseInt(data.pages)"
          @previous="getCourseList"
          @next="getCourseList"
          @input="getCourseList"
        ></v-pagination>
      </div>
    </v-container>
  </v-container>
</template>
<script lang="ts">
import courseApi from "@/api/course";
import subjectApi from "@/api/subject";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tab: null,
      subTab: null,
      page: 1, //当前页数
      per_page: 8, //每页展示数
      data: {
        pages: "1",
        items: [],
      }, //保存返回的数据
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {
        subjectId: "",
        subjectParentId: "",
      }, // 查询表单对象
      oneIndex: -1,
      twoIndex: -1,
      choiceCountSort: "",
      gmtCreateSort: "",
    };
  },
  created() {
    // 首先查询出所有的一级分类
    this.getSubjectTree();
    // 查出第一页的数据
    this.getCourseList();
  },
  methods: {
    /**
     * 点击某个一级分类，查询一级分类,显示对应二级分类
     * @param subjectParentId 待查询其二级分类的父类id
     */
    searchSub(subjectParentId: string) {
      // 先清空二级列表清空数据
      this.searchObj.subjectId = "";
      this.subSubjectList = [];
      this.subTab = null;
      if (subjectParentId === "0") {
        // 选择的是"全部课程",返回
        this.searchObj.subjectParentId = "";
        this.getCourseList();
      } else {
        this.searchObj.subjectParentId = subjectParentId;
        this.getCourseList();
        const parentItem: any = this.subjectNestedList.find((item: any) => {
          return subjectParentId === item.id;
        });
        this.subSubjectList = parentItem.children;
      }
    },
    //5 点击某个二级分类实现查询
    searchTwo(subjectId: string) {
      //把index赋值,为了样式生效
      //把二级分类点击id值，赋值给searchObj
      this.searchObj.subjectId = subjectId;
      //点击某个二级分类进行条件查询
      this.getCourseList();
    },

    // value得知用户当前点的是哪个一级标题
    log(value: string) {
      console.log(value);
    },

    // 获取课程列表
    getCourseList() {
      console.log("当前页面为:", this.page);
      console.log("查询对象:", this.searchObj);
      courseApi
        .conditionList(this.page, this.per_page, this.searchObj)
        .then((response) => {
          console.log("获取课程列表:", response.data);
          this.data = response.data;
        });
    },
    // 获取课程分类树
    getSubjectTree() {
      subjectApi.getSubjectTree().then((response) => {
        console.log(response.data);
        const { list } = response.data;
        this.subjectNestedList = list;
        console.log(this.subjectNestedList);
      });
    },
  },
});
</script>