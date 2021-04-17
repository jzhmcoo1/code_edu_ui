<template>
  <v-layout row wrap class="mt-2">
    <v-flex xs2 sm1 class="d-flex justify-center flex-wrap">
      <client-only>
        <div>
          <v-avatar size="50">
            <v-img :src="item.avatar" />
          </v-avatar>
        </div>
      </client-only>
    </v-flex>
    <v-flex class="pt-2">
      <div class="d-flex flex-column justify-center">
        <p>
          <span class="mr-2">{{ item.nickname }}</span>
          <span>{{ item.createTime }}</span>
        </p>
        <p>
          <span class="info--text">
            {{ `@` + item.replyTo }}
          </span>
          <span>
            {{ item.content }}
          </span>
        </p>
        <div>
          <v-btn icon text>
            <v-icon>thumb_up_off_alt</v-icon>
          </v-btn>
          <v-btn icon text>
            <v-icon>thumb_down_off_alt</v-icon>
          </v-btn>
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
            />
          </div>
        </v-expand-transition>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ReplayComment from "@/components/Comments/ReplayComment";
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
  },
};
</script>

<style>
</style>