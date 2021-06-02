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
                  :length="parseInt(responseData.pages)"
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
import subjectApi from "@/api/subject";
import monent from "moment";
monent.locale("zh-CN");
export default {
  components: { FloatBtn },
  layout: "article",
  head: {
    title: "文章列表",
  },
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
            id: "", //文章id
            authorId: "", //作者id
            typeId: "", //分类id
            title: "", //文章名
            cover: "", //封面
            viewCount: 0, //浏览数
            isDeleted: 0,
            createTime: "", //创建时间
            modifiedTime: "", //修改时间
            commentCount: 0, //评论数量
            likeCount: 0, //点赞数量
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
          return 300;
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
      // 点击一个一级标签,将选中的二级标签清空
      this.secondLevelIndex = undefined;
      this.searchObj.typeId = "";
      // 如果一级分类不为空
      if (firstLevelIndex !== undefined) {
        const firstId = this.subjectNestedList[firstLevelIndex].id; //取得选中的一级标签的标签Id
        this.searchObj.typeParentId = firstId; //将要查询的标签id赋值个searchObj
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
      // 如果二级分类不为空
      if (secondLevelIndex !== undefined) {
        const secondId = this.subSubjectList[secondLevelIndex].id;
        this.searchObj.typeId = secondId;
      } else {
        this.searchObj.typeParentId = this.subjectNestedList[
          this.firstLevelIndex
        ].id; //取消选择二级标签后重新赋值一级标签
        this.subSubjectList = this.subjectNestedList[
          this.firstLevelIndex
        ].children;
        this.searchObj.typeId = "";
      }
      this.page = 1; //把页数重新写回1
      this.getArticleList(); //重新查询
    },
    // 查询文章一级分类
    initSubject() {
      subjectApi.getSubjectTree().then((response) => {
        console.log(response.data);
        this.subjectNestedList = response.data.list;
      });
    },
    // 查询文章列表(分页和条件)
    getArticleList() {
      articleApi
        .conditionList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.responseData = response.data;
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