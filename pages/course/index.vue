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
        <v-layout row wrap>
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
      </v-container>
      <!-- 分页器 -->
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="data.total"
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
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tab: null,
      subTab: null,
      page: 1, //当前页数
      per_page: 12, //每页展示数
      data: {}, //保存返回的数据
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
    this.initSubject();
    // 查出第一页的数据
    this.getCourseList();
  },
  methods: {
    //1 查询第一页数据
    initCourseFirst() {
      courseApi
        .getCourseList(this.page, this.per_page, this.searchObj)
        .then((response) => {
          this.data = response.data;
        });
    },
    //2 查询所有一级分类
    initSubject() {
      courseApi.getAllSubject().then((response) => {
        this.subjectNestedList = response.data.list;
        console.log("一级分类:", this.subjectNestedList);
      });
    },
    //3 分页切换的方法
    // gotoPage(page) {
    //   if (page > this.data.pages) return;
    //   courseApi.getCourseList(page, 8, this.searchObj).then((response) => {
    //     this.data = response.data.data;
    //   });
    // },
    //4 点击某个一级分类，查询对应二级分类
    /**
     * @param subjectParentId 待查询其二级分类的父类id
     */
    searchSub(subjectParentId: string) {
      // 先清空二级列表清空数据
      this.searchObj.subjectId = "";
      this.subSubjectList = [];
      if (subjectParentId === "0") {
        // 选择的是"全部课程",返回
        console.log("选择的全部课程,返回");
        this.getCourseList();
        return;
      } else {
        this.searchObj.subjectParentId = subjectParentId;
        this.getCourseList();
        const parentItem: any = this.subjectNestedList.find((item: any) => {
          return subjectParentId === item.id;
        });
        this.subSubjectList = parentItem.children;
        console.log("当前二级列表:", this.subSubjectList);
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

    // searchOne(subjectParentId: string, index = -1) {
    //   //把传递index值赋值给oneIndex,为了active样式生效
    //   this.oneIndex = index;
    //   this.twoIndex = -1;

    //   this.searchObj.subjectId = "";
    //   this.subSubjectList = [];
    //   // 如果点击全部清空,传过来一个-1,使得active的样式清空,然后返回不查
    //   if (index === -1) return;
    //   //把一级分类点击id值，赋值给searchObj
    //   this.searchObj.subjectParentId = subjectParentId;
    //   //点击某个一级分类进行条件查询
    //   this.getCourseList();

    //   //拿着点击一级分类id 和 所有一级分类id进行比较，
    //   //如果id相同，从一级分类里面获取对应的二级分类
    //   for (let i = 0; i < this.subjectNestedList.length; i++) {
    //     //获取每个一级分类
    //     let oneSubject = this.subjectNestedList[i];
    //     //比较id是否相同
    //     if (subjectParentId === oneSubject.id) {
    //       //从一级分类里面获取对应的二级分类
    //       this.subSubjectList = oneSubject.children;
    //     }
    //   }
    // },

    // value得知用户当前点的是哪个一级标题
    log(value: string) {
      console.log(value);
    },

    // 获取课程列表
    getCourseList() {
      console.log("当前页面为:", this.page);
      courseApi
        .getCourseList(this.page, this.per_page, this.searchObj)
        .then((response) => {
          console.log("获取课程列表:", response.data);
          this.data = response.data;
        });
    },
  },
});
</script>