<template></template>

<script>
import pubsub from "pubsub-js";
import messageApi from "@/api/message";
export default {
  created() {
    console.log("message组件创建");
    pubsub.subscribe("comment", (event, { memberId, link, content }) => {
      console.log("接到comment信息,参数为:", memberId, link, content);
      messageApi.sendOne({
        memberId,
        link,
        content,
        type: 0,
        senderName: this.$store.state.account.user.username,
      });
    });
    pubsub.subscribe("commentReply", (event, { memberId, link, content }) => {
      console.log("接到commentReply信息,参数为:", memberId, link, content);
      messageApi.sendOne({
        memberId,
        link,
        content,
        type: 1,
        senderName: this.$store.state.account.user.username,
      });
    });
    pubsub.subscribe("commentLike", (event, { memberId, link }) => {
      console.log("接到commentLike信息,参数为:", memberId, link);
      messageApi.sendOne({
        memberId,
        link,
        type: 3,
        senderName: this.$store.state.account.user.username,
      });
    });
    pubsub.subscribe("articleLike", (event, { memberId, link }) => {
      console.log("接到articleLike信息,参数为:", memberId, link);
      messageApi.sendOne({
        memberId,
        type: 2,
        link,
        senderName: this.$store.state.account.user.username,
      });
    });
    pubsub.subscribe("updateCourse", () => {});
    pubsub.subscribe("publishExam", () => {});
  },
  beforeDestroy() {
    pubsub.unsubscribe("publishExam");
    pubsub.unsubscribe("updateCourse");
    pubsub.unsubscribe("articleLike");
    pubsub.unsubscribe("commentLike");
    pubsub.unsubscribe("commentReply");
    pubsub.unsubscribe("comment");
  },
};
</script>

<style>
</style>