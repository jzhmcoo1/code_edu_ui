<template>
  <v-layout row wrap>
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
        <p class="body-1">
          {{ item.content }}
        </p>
        <div>
          <v-btn rounded text>
            <v-icon>thumb_up_off_alt</v-icon>
            {{ item.likeCount }}
          </v-btn>
          <!-- <v-btn icon text>
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
              :type="type"
              :id="id"
              @hide="hideReplayBox"
              :showReplayBox="showReplayBox"
              @replyNew="notifyUpdate"
              :parentId="item.id"
            />
          </div>
        </v-expand-transition>
      </div>
      <v-btn
        v-if="item.childList && item.childList.length !== 0"
        text
        @click="showReplyList = !showReplyList"
      >
        <v-icon>{{
          showReplyList ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
        {{ showReplyList ? "隐藏" : "查看" }}{{ commentSum }}条回复
      </v-btn>
      <v-expand-transition>
        <div v-show="showReplyList">
          <!-- 展示二级评论 -->
          <v-layout row wrap v-for="item in item.childList" :key="item.id">
            <v-flex xs12>
              <CommentItemSon
                @replyNew="notifyUpdate"
                :type="type"
                :id="id"
                :item="item"
              />
            </v-flex>

            <v-flex xs12 v-for="sonItem in item.childList" :key="sonItem.id">
              <CommentItemSon
                @replyNew="notifyUpdate"
                :type="type"
                :id="id"
                :item="sonItem"
              />
            </v-flex>
          </v-layout>
        </div>
      </v-expand-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import ReplayComment from "@/components/Comments/ReplayComment";
import CommentItemSon from "@/components/Comments/CommentItemSon";
import moment from "moment";
moment.locale("zh-CN");
export default {
  components: {
    ReplayComment,
    CommentItemSon,
  },
  props: {
    id: String, //保存courseId或者articleId
    type: String, //course或article
    item: {
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
      likeCount: 0, //点赞数量
    }, //接收的信息评论
  },
  data() {
    return {
      showReplyList: false, //是否显示二级(回复)评论
      showReplayBox: false, // 单条评论的内容
    };
  },
  computed: {
    commentSum() {
      // 直接评论数
      let countComment = this.item.childList.length;
      // 一级评论数
      this.item.childList.map((value) => {
        if (value.childList) {
          countComment += value.childList.length;
        }
      });
      return countComment;
    },
  },
  created() {},
  methods: {
    hideReplayBox() {
      this.showReplayBox = false;
    },
    notifyUpdate() {
      this.$emit("replyNew"); //通知父组件更新
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
  },
};
</script>

<style>
</style>