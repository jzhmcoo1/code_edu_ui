<template>
  <!-- 自己的回复评论框,被CommentItem所引用 -->
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
            placeholder="回复评论"
            name="reply-comment"
            v-model="comment.content"
          >
          </v-text-field>
        </div>
        <v-expand-transition>
          <div>
            <div flat class="d-flex justify-end">
              <v-btn @click="hideReplayBox" depressed class="mr-2">取消</v-btn>
              <v-btn @click="replyComment" depressed class="primary"
                >评论</v-btn
              >
            </div>
          </div>
        </v-expand-transition>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import commentApi from "@/api/comment";
export default {
  props: {
    id: String, //保存courseId或者articleId
    type: String, //course或article
    parentId: String, //父评论id
  },
  data() {
    return {
      comment: {
        content: "",
        courseId: "",
        parentId: "0",
      },
    };
  },
  created() {
    if (this.type === "course") {
      this.comment.courseId = this.id;
    } else {
      this.comment.articleId = this.id;
    }
    this.comment.parentId = this.parentId;
  },
  computed: {
    userAvatar() {
      // 获取用户ID
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
    // 通知父组件隐藏本回复框
    hideReplayBox() {
      this.comment.content = "";
      this.$emit("hide");
    },
    replyComment() {
      if (!this.$store.state.userInfo.loginInfo.id) {
        this.$message.error("请先登录再进行评论!");
        this.$router.push("/login");
        return;
      }
      if (this.type === "course") {
        this.replyCourseComment();
      } else {
        this.replyArticleComment();
      }
    },
    replyCourseComment() {
      commentApi.addComment(this.comment).then((response) => {
        if (response.success) {
          this.$message.success("回复评论成功");
          this.$emit("replyNew");
          this.comment.content = "";
        }
      });
    },
    replyArticleComment() {},
  },
};
</script>

<style>
</style>