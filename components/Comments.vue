<template>
  <v-container grid-list-xs>
    <v-layout row wrap class="pa-2">
      <v-flex xs12 class="d-flex flex-row">
        <!-- 评论总数 -->
        <div class="subtitle-1">{{ commentAndUserList.length }}条评论</div>
        <!-- 评论排序选择 -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon text color="info" v-bind="attrs" v-on="on">
              <v-icon>local_fire_department</v-icon>
            </v-btn>
          </template>
          <span>按热门排序</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon text color="info" v-bind="attrs" v-on="on">
              <v-icon>today</v-icon>
            </v-btn>
          </template>
          <span>按最新排序</span>
        </v-tooltip>
      </v-flex>
      <v-divider></v-divider>
      <!-- 自己的评论 -->
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs2 sm1 class="d-flex justify-center align-center flex-wrap">
            <client-only>
              <div>
                <v-avatar size="50">
                  <v-img :src="userAvatar" />
                </v-avatar>
              </div>
            </client-only>
          </v-flex>
          <v-flex>
            <div>
              <v-text-field
                placeholder="发表宁的公开评论"
                name="comment"
                v-model="comment.content"
                id="comment"
                @click="showAddComment = true"
              >
              </v-text-field>
            </div>
            <v-expand-transition>
              <div v-show="showAddComment">
                <div flat v-show="showAddComment" class="d-flex justify-end">
                  <v-btn
                    @click="(showAddComment = false), (comment.content = '')"
                    depressed
                    class="mr-2"
                    >取消</v-btn
                  >
                  <v-btn depressed class="primary">评论</v-btn>
                </div>
              </div>
            </v-expand-transition>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- 评论列表 -->
      <v-flex xs12 v-for="comment in commentAndUserList" :key="comment.id">
        <v-layout row wrap>
          <v-flex xs2 sm1 class="d-flex justify-center align-center flex-wrap">
            <client-only>
              <div>
                <v-avatar size="50">
                  <v-img :src="comment.avatar" />
                </v-avatar>
              </div>
            </client-only>
          </v-flex>
          <v-flex class="pt-2">
            <p class="body-1">
              <span class="mr-2">{{ comment.nickname }}</span>
              <span>{{ comment.createTime }}</span>
            </p>
            <p class="body-2">
              {{ comment.content }}
            </p>
            <v-btn icon text>
              <v-icon>thumb_up_off_alt</v-icon>
            </v-btn>
            <v-btn icon text>
              <v-icon>thumb_down_off_alt</v-icon>
            </v-btn>
            <v-btn text>
              <span class="button">回复</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- 分页器 -->
    </v-layout>
  </v-container>
</template>

<script>
import commentApi from "@/api/comment";
export default {
  props: {
    id: String, //保存courseId或者articleId
    type: String, //course或article
  },
  data() {
    return {
      showAddComment: false, //是否显示自己的评论框
      commentAndUserList: [
        {
          articleId: "", //如果是文章评论,则显示文章id
          avatar: "", //回复者头像
          childList: [
            {
              articleId: "", //如果是文章评论,则显示文章id
              avatar: "", //回复者头像
              content: "", //评论内容
              courseId: "", //如果是课程评论,则显示课程id
              createTime: "", //评论时间
              id: "", //该评论id
              memberId: "", //评论者id
              nickname: "", //评论者昵称
              parentId: "", //父评论id
              replyTo: "", //被回复者昵称
            },
          ], //回复该评论的子评论
          content: "", //评论内容
          courseId: "", //如果是课程评论,则显示课程id
          createTime: "", //评论时间
          id: "", //该评论id
          memberId: "", //评论者id
          nickname: "", //评论者昵称
          parentId: "", //父评论id
          replyTo: "", //被回复者昵称
        },
      ],
      currentPageData: [], //当前页显示内容
      totalPage: 1, // 统共页数，默认为1
      comment: {
        content: "",
        courseId: "",
        parentId: "0",
      },
    };
  },
  created() {
    console.log("收到的参数为:", this.id, this.type);
    if (this.type === "course") {
      this.initCourseComment();
    } else if (this.type === "article") {
      this.initArticleComment();
    }
  },
  computed: {
    userAvatar() {
      const { id } = this.$store.state.userInfo.loginInfo;
      if (id) {
        return this.$store.state.userInfo.loginInfo.avatar;
      } else {
        return "";
      }
    },
    hasLogin() {
      this.$store.state.userInfo.loginInfo.id ? true : false;
    },
  },
  methods: {
    // 课程评论
    initCourseComment() {
      commentApi.getPageList(this.id).then((response) => {
        this.commentAndUserList = response.data.list;
        console.log("commentAndUserList:", this.commentAndUserList);
      });
    },
    // 文章评论
    initArticleComment() {},
  },
};
</script>

<style>
</style>