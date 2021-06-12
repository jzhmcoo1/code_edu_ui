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
            placeholder="发表评论"
            v-model="comment.content"
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
        relatedId: "",
        parentId: "0",
      },
    };
  },
  created() {
    this.comment.relatedId = this.id;
  },
  computed: {
    userAvatar() {
      // 获取用户ID
      const { userId } = this.$store.state.account.user;
      if (userId) {
        const avatar = this.$store.state.account.user.avatar;
        // 如果用户换过头像,显示用户头像
        if (/^http/.test(avatar)) {
          return avatar;
        } else {
          // 否则显示默认头像
          return "/default.jpg";
        }
      } else {
        //未登录也显示默认头像
        return "/default.jpg"; //默认头像
      }
    },
  },
  methods: {
    // 添加新评论
    addComment() {
      if (!this.$store.state.account.accessToken) {
        this.$message.error("请先登录再进行评论!");
        this.$router.push("/login");
        return;
      }
      commentApi.addComment(this.comment, this.type).then((response) => {
        if (response.code === 200) {
          this.$message.success("评论成功");
          this.comment.content = ""; //清空评论内容
          this.$emit("addNew"); //通知父组件刷新
          this.showAddComment = false; //收起评论组件
        }
      });
    },
  },
};
</script>

<style>
</style>