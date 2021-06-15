<template>
  <v-layout row wrap class="mt-2">
    <v-flex xs2 sm1 class="d-flex justify-center flex-wrap">
      <client-only>
        <div>
          <v-avatar size="50">
            <v-img :src="userAvatar(item.avatar)" />
          </v-avatar>
        </div>
      </client-only>
    </v-flex>
    <v-flex class="pt-2">
      <div class="d-flex flex-column justify-center">
        <p>
          <span class="mr-2 font-weight-medium">{{ item.nickname }}</span>
          <span class="caption">{{ formatDate(item.createTime) }}</span>
        </p>
        <p>
          <span class="info--text body-1">
            {{ `@ ` + item.replyTo }}
          </span>
          <span class="body-1">
            {{ item.content }}
          </span>
        </p>
        <div>
          <v-btn
            rounded
            text
            @click="praise"
            :color="item.liked ? 'red ligten-1' : ''"
          >
            <v-icon>thumb_up_off_alt</v-icon>
            {{ item.likeCount }}
          </v-btn>
          <!-- <v-btn rounded="circle" text>
            <v-icon>thumb_down_off_alt</v-icon>
          </v-btn> -->
          <v-btn @click="showReplayBox = true" text>
            <span class="button">回复</span>
          </v-btn>
        </div>
        <v-expand-transition>
          <div v-show="showReplayBox">
            <!-- 展示评论恢复框 -->
            <ReplayComment
              @hide="hideReplayBox"
              @replyNew="notifyUpdate"
              :showReplayBox="showReplayBox"
              :parentId="item.id"
              :type="type"
              :id="id"
              :replyMember="item.memberId"
            />
          </div>
        </v-expand-transition>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ReplayComment from "@/components/Comments/ReplayComment";
import moment from "moment";
import commentApi from "@/api/comment";
import pubsub from "pubsub-js";
moment.locale("zh-CN");
export default {
  components: {
    ReplayComment,
  },
  data() {
    return {
      showReplayBox: false, // 单条评论的内容
    };
  },
  props: {
    type: String,
    id: String,
    item: {
      articleId: "", //如果是文章评论,则显示文章id
      avatar: "", //回复者头像
      content: "", //评论内容
      childList: "", //二级评论
      courseId: "", //如果是课程评论,则显示课程id
      createTime: "", //评论时间
      id: "", //该评论id
      memberId: "", //评论者id
      nickname: "", //评论者昵称
      parentId: "", //父评论id
      replyTo: "", //被回复者昵称
      liked: false,
    },
    //回复该评论的子评论
  },
  methods: {
    hideReplayBox() {
      this.showReplayBox = false;
    },
    notifyUpdate() {
      this.$emit("replyNew");
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
    userAvatar(avatar) {
      if (/^http/.test(avatar)) {
        return avatar;
      } else {
        // 否则显示默认头像
        return "/default.jpg";
      }
    },
    praise() {
      if (this.$store.state.account.user.userId === undefined) {
        this.$message.warning("请先登录再进行点赞😨");
      } else if (this.item.liked === false) {
        commentApi.praiseComment(this.item.id).then((response) => {
          if (response.code === 200) {
            this.$message.success("评论点赞成功👍");
            pubsub.publish("commentLike", {
              memberId: this.item.memberId,
              link: this.$route.fullPath,
            });
            this.item.liked = true;
            this.item.likeCount += 1;
          } else {
            this.$message.error("评论点赞失败😢");
          }
        });
      } else {
        commentApi.cancelPraise(this.item.id).then((response) => {
          if (response.code === 200) {
            this.$message.success("取消点赞成功👌");
            this.item.liked = false;
            this.item.likeCount -= 1;
          } else {
            this.$message.error("取消点赞失败😢");
          }
        });
      }
    },
  },
};
</script>

<style>
</style>