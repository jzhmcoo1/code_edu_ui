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
      <AddNew @addNew="getCommentList" :type="type" :id="id" />
      <!-- 评论列表 -->
      <v-flex xs12 v-for="comment in items" :key="comment.id">
        <CommentItem
          @replyNew="getCommentList"
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
      items: [
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
          likeCount: 0, //评论点赞数
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
    this.getCommentList();
  },
  computed: {
    // 计算总评论数
    commentSum() {
      // 直接评论数
      let countComment = this.items.length;
      // 一级评论数
      this.items.map((value) => {
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
      // 获取用户ID
      const { userId } = this.$store.state.account.user;
      if (userId) {
        return this.$store.state.account.user.avatar;
      } else {
        return "/default.jpg"; //默认头像
      }
    },
  },
  methods: {
    getCommentList() {
      commentApi.commentList(this.id, this.type).then((response) => {
        this.items = response.data.items;
      });
    },
  },
};
</script>

<style>
</style>