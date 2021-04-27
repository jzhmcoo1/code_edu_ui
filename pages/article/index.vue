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
            <v-container grid-list-xs>
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
        <v-row>
          <v-col>
            <v-sheet rounded="lg" min-height="268"> 热门文章 </v-sheet>
          </v-col>
        </v-row>
        <v-row style="position: sticky; top: 80px">
          <v-col>
            <v-sheet rounded="lg" min-height="268"> 文章分类 </v-sheet>
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
import monent, { MomentInput } from "moment";
monent.locale("zh-CN");
export default {
  components: { FloatBtn },
  layout: "article",
  data() {
    return {
      searchObj: {}, // 查询表单对象
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
    };
  },
  computed: {
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
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      articleApi
        .getArticleList(this.page, this.limit, this.searchObj)
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