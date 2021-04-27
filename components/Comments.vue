<template>
  <v-container grid-list-xs>
    <v-layout row wrap class="pa-2">
      <v-flex xs12 class="d-flex flex-row">
        <!-- 评论总数 -->
        <div class="subtitle-1">{{ commentSum }}条评论</div>
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
      <AddNew @addNew="initComment" :type="type" :id="id" />
      <!-- 评论列表 -->
      <v-flex xs12 v-for="comment in commentAndUserList" :key="comment.id">
        <CommentItem
          @replyNew="initComment"
          :type="type"
          :id="id"
          :item="comment"
        />
      </v-flex>
      <!--//TODO 分页器 -->
    </v-layout>
  </v-container>
</template>

<script>
import commentApi from "@/api/comment";
import AddNew from "@/components/Comments/AddNew";
import CommentItem from "@/components/Comments/CommentItem";
export default {
  components: {
    AddNew, //首部添加评论
    CommentItem, //下面的评论列表
  },
  props: {
    id: String, //保存courseId或者articleId
    type: String, //course或article
  },
  data() {
    return {
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
        relatedId: "",
      },
    };
  },
  created() {
    console.log("收到的参数为:", this.id, this.type);
    this.initComment();
  },
  computed: {
    // 计算总评论数
    commentSum() {
      // 直接评论数
      let countComment = this.commentAndUserList.length;
      // 一级评论数
      this.commentAndUserList.map((value) => {
        if (value.childList) {
          value.childList.map((value) => {
            if (value.childList) {
              countComment += value.childList.length;
            }
          });
          countComment += value.childList.length;
        }
      });
      return countComment;
    },
    userAvatar() {
      const { id } = this.$store.state.userInfo.loginInfo;
      if (id) {
        return this.$store.state.userInfo.loginInfo.avatar;
      } else {
        return "";
      }
    },
    hasLogin() {
      return this.$store.state.userInfo.loginInfo.id ? true : false;
    },
  },
  methods: {
    initComment() {
      if (this.type === "course") {
        this.initCourseComment();
      } else if (this.type === "article") {
        this.initArticleComment();
      }
    },
    // 课程评论
    initCourseComment() {
      commentApi.getPageList(this.id).then((response) => {
        this.commentAndUserList = response.data.list;
        console.log("commentAndUserList:", this.commentAndUserList);
      });
    },
    // 文章评论
    initArticleComment() {
      commentApi.getArticlePageList(this.id).then((response) => {
        console.log("初始化文章评论", response.data);
        this.commentAndUserList = response.data.list;
        console.log(this.commentAndUserList);
      });
    },
  },
};
</script>

<style>
</style>