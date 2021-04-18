<template>
  <!-- 添加新评论 -->
  <v-flex xs12>
    <v-layout row wrap>
      <v-flex xs2 sm1 class="d-flex justify-center flex-wrap">
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
            id="new-comment"
            required
            @click="showAddComment = true"
          >
          </v-text-field>
        </div>
        <v-expand-transition>
          <div v-show="showAddComment">
            <div flat v-show="showAddComment" class="d-flex justify-end">
              <v-btn @click="showAddComment = false" depressed class="mr-2"
                >取消</v-btn
              >
              <v-btn @click="addComment" depressed class="primary">评论</v-btn>
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
    id: String,
    type: String,
  },
  data() {
    return {
      showAddComment: false,
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
      this.comment.courseId = this.id;
    }
    this.comment.parentId = "0";
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
    // 添加新评论
    addComment() {
      if (!this.$store.state.userInfo.loginInfo.id) {
        this.$message.error("请先登录再进行评论!");
        this.$router.push("/login");
        return;
      }
      if (this.type === "course") {
        this.addCourseComment();
      }
    },
    addCourseComment() {
      commentApi.addComment(this.comment).then((response) => {
        if (response.success) {
          this.$message.success("评论成功!");
          this.comment.content = ""; //清空评论内容
          this.$emit("addNew"); //通知父组件刷新
        }
      });
    },
  },
};
</script>

<style>
</style>