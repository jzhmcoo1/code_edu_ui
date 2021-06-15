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
              <v-btn
                @click="replyComment"
                :disabled="disabled"
                depressed
                class="primary"
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
import pubsub from "pubsub-js";
export default {
  props: {
    id: String, //保存courseId或者articleId
    type: String, //course或article
    parentId: String, //父评论id
    replyMember: String, //父评论成员id
  },
  data() {
    return {
      disabled: false,
      comment: {
        content: "",
        courseId: "",
        parentId: "0",
      },
    };
  },
  created() {
    this.disabled =
      this.$store.state.account.user.userId !== undefined ? false : true;
    this.comment.relatedId = this.id;
    this.comment.parentId = this.parentId;
  },
  computed: {
    userAvatar() {
      // 获取用户ID
      const { userId } = this.$store.state.account.user;
      if (userId) {
        const avatar = this.$store.state.account.user.avatar;
        if (/^http/.test(avatar)) {
          return avatar;
        } else {
          return "/default.jpg";
        }
      } else {
        return "/default.jpg"; //默认头像
      }
    },
  },
  methods: {
    // 通知父组件隐藏本回复框
    hideReplayBox() {
      this.comment.content = "";
      this.$emit("hide");
    },
    replyComment() {
      if (!this.$store.state.account.accessToken) {
        this.$message.error("请先登录再进行评论!");
        this.$router.push("/login");
        return;
      }
      commentApi.addComment(this.comment, this.type).then((response) => {
        if (response.code === 200) {
          this.$message.success("回复成功");
          pubsub.publish("commentReply", {
            memeberId: this.replyMember,
            link: this.$route.path,
            content: this.comment.content,
          });
          this.$emit("replyNew");
          this.hideReplayBox();
        }
      });
    },
  },
};
</script>

<style>
</style>