<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- 左边栏 -->
      <v-col cols="12" sm="9">
        <v-sheet min-height="70vh" rounded="lg">
          <v-container grid-list-xs>
            <!-- 标题区 -->
            <v-container grid-list-xs>
              <h1 class="headline heading--text">全部文章</h1>
            </v-container>
            <!-- 列表展示区 -->
            <v-container grid-list-xs v-if="responseData.items.length !== 0">
              <v-row class="mx-auto">
                <v-col
                  v-for="(item, index) in responseData.items"
                  :key="item.id"
                  :cols="12"
                  :lg="index % 3 === 0 ? 12 : 6"
                >
                  <v-hover
                    v-slot="{ hover }"
                    close-delay="200"
                    open-delay="100"
                  >
                    <v-card rounded="lg">
                      <div style="overflow: hidden">
                        <v-img
                          :src="item.cover"
                          :height="height"
                          class="zoom-img"
                        >
                          <v-fade-transition>
                            <v-overlay v-if="hover" absolute>
                              <v-btn router :to="`/article/${item.id}`"
                                >开始阅读</v-btn
                              >
                            </v-overlay>
                          </v-fade-transition>
                        </v-img>
                      </div>
                      <span>
                        <v-card-title v-text="item.title"></v-card-title>
                        <v-card-text
                          class="mt-n3"
                          v-text="getTime(item.createTime)"
                        >
                        </v-card-text>
                      </span>
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text color="error">
                          <v-icon>mdi-heart</v-icon>
                          <span>{{ item.likeCount }}</span>
                        </v-btn>

                        <v-btn text color="info">
                          <v-icon>mdi-comment-outline</v-icon>
                          <span>{{ item.commentCount }}</span>
                        </v-btn>

                        <v-btn text color="primary">
                          <v-icon>mdi-eye</v-icon>
                          <span>{{ item.viewCount }}</span>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-container>
            <!-- 无数据提示 -->
            <v-container grid-list-xs v-else>
              <a-empty description="这里空空如也" />
            </v-container>
            <!-- 分页 -->
            <v-container grid-list-xs>
              <div class="text-center">
                <v-pagination
                  v-model="page"
                  :length="responseData.pages"
                  :total-visible="7"
                  @input="getArticleList"
                  @next="getArticleList"
                  @previous="getArticleList"
                ></v-pagination>
              </div>
            </v-container>
          </v-container>
          <!-- 嵌入文章和列表 -->
        </v-sheet>
      </v-col>
      <!-- 右边栏 -->
      <v-col cols="12" sm="3">
        <!-- <v-row>
          <v-col>
            <v-sheet rounded="lg" min-height="268"> 热门文章 </v-sheet>
          </v-col>
        </v-row> -->
        <!-- TODO 文章分类 -->
        <v-row style="position: sticky; top: 80px">
          <v-col>
            <v-sheet rounded="lg" min-height="268">
              <v-card flat>
                <v-card-title primary-title> 文章标签 </v-card-title>
                <v-card-text class="caption"> 一级分类 </v-card-text>
                <v-card-actions>
                  <div class="px-4 pb-2">
                    <v-chip-group
                      v-model="firstLevelIndex"
                      active-class="primary--text"
                      column
                      @change="searchOne(firstLevelIndex)"
                    >
                      <v-chip
                        filter
                        v-for="tag in subjectNestedList"
                        :key="tag.id"
                      >
                        {{ tag.title }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-card-actions>
                <v-card-text class="caption"> 二级分类 </v-card-text>
                <v-card-actions>
                  <!-- 如果二级标签为空则不显示 -->
                  <div class="px-4 pb-2" v-if="subSubjectList.length !== 0">
                    <v-chip-group
                      v-model="secondLevelIndex"
                      active-class="primary--text"
                      column
                      @change="searchTwo(secondLevelIndex)"
                    >
                      <v-chip
                        filter
                        v-for="tag in subSubjectList"
                        :key="tag.id"
                      >
                        {{ tag.title }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                  <div class="px-4 pb-2" v-else>
                    <a-empty
                      :description="
                        firstLevelIndex === undefined
                          ? '请选择一级分类'
                          : '二级分类为空'
                      "
                    />
                  </div>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <FloatBtn />
  </v-container>
</template>
<script>
import FloatBtn from "@/components/FloatBtn.vue";
import articleApi from "@/api/article";
import monent from "moment";
monent.locale("zh-CN");
export default {
  components: { FloatBtn },
  layout: "article",
  data() {
    return {
      page: 1, //当前页
      limit: 6, //每页数量
      responseData: {
        current: 1, //当前页
        total: 20, //总共记录数
        pages: 3, //总页数
        size: 8, //每页大小
        hasPrevious: false, //是否有前页
        hasNext: true, //是否有后页
        items: [
          {
            id: "1367122387191066625", //文章id
            authorId: "1361284523983220738", //作者id
            typeId: "1178214681181483010", //分类id
            title: "博客1", //文章名
            cover:
              "https://edu-guli-0313.oss-cn-beijing.aliyuncs.com/2021/03/05/d1d36db7eb4045009edaead44224cdf7u=1572376661,3890953672&fm=26&gp=0.jpg", //封面
            viewCount: 94, //浏览数
            isDeleted: 0,
            createTime: "2021-03-03 22:39:12", //创建时间
            modifiedTime: "2021-04-21 13:09:49", //修改时间
            commentCount: 164, //评论数量
            likeCount: 16, //点赞数量
            content: null,
          },
        ],
      },
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象
      firstLevelIndex: undefined, //实际选中的一级标签
      secondLevelIndex: undefined, //实际选中的二级标签
    };
  },
  computed: {
    // 计算高度,给封面图使用
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
        case "lg":
        case "xl":
          return 365;
      }
    },
  },
  created() {
    this.getArticleList(); //查询文章列表
    this.initSubject(); //查询所有一级分类
  },
  methods: {
    // 点击某个一级分类,查询二级分类
    // firstLevelIndex为传来的数组下标
    searchOne(firstLevelIndex) {
      console.log("选择的firstLevelIndex为", firstLevelIndex);
      // 点击一个一级标签,将选中的二级标签清空
      this.secondLevelIndex = undefined;
      // 如果一级分类不为空
      if (firstLevelIndex !== undefined) {
        console.log("一级分类不为空");
        const firstId = this.subjectNestedList[firstLevelIndex].id; //取得选中的一级标签的标签Id
        this.searchObj.type = firstId; //将要查询的标签id赋值个searchObj
        this.subSubjectList = this.subjectNestedList[firstLevelIndex].children; //将选中的一级标签的子标签赋给二级数组
      } else {
        console.log("一级分类为空");
        this.searchObj = {}; //请求searchObj
        this.subSubjectList = []; //清空二级子标签
      }
      this.page = 1; //把页数重新写回1
      this.getArticleList(); //重新查询
    },
    searchTwo(secondLevelIndex) {
      console.log("选择的secondLevelIndex为", secondLevelIndex);
      // 如果二级分类不为空
      if (secondLevelIndex !== undefined) {
        const secondId = this.subSubjectList[secondLevelIndex].id;
        this.searchObj.type = secondId;
      } else {
        this.searchObj.type = this.subjectNestedList[this.firstLevelIndex].id; //取消选择二级标签后重新赋值一级标签
        this.subSubjectList = this.subjectNestedList[
          this.firstLevelIndex
        ].children;
      }
      this.page = 1; //把页数重新写回1
      this.getArticleList(); //重新查询
    },
    // 查询文章一级分类
    initSubject() {
      articleApi.getAllSubject().then((response) => {
        this.subjectNestedList = response.data.list;
        console.log(this.subjectNestedList);
      });
    },
    // 查询文章列表(分页和条件)
    getArticleList() {
      articleApi
        .getArticleList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.responseData = response.data;
          console.log(this.responseData);
        });
    },
    // moment格式化时间
    getTime(value) {
      return monent(value).fromNow();
    },
  },
};
</script>
<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>