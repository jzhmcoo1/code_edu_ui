<template>
  <v-layout row wrap>
    <v-flex xs2 sm1 class="d-flex justify-center flex-wrap align-center">
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
        <p class="d-flex align-center">
          <span class="font-weight-medium">{{ item.username }}</span>
          <span class="caption mx-2">在</span>
          <span class="font-weight-medium caption">{{
            formatDate(item.createTime)
          }}</span>
          <span class="caption mx-2">给出</span>
          <v-rating size="20" dense readonly :value="item.score"></v-rating>
          <v-spacer></v-spacer>
          <span class="caption mx-2">最近修改时间</span>
          <span class="font-weight-medium caption">{{
            formatDate(item.modifiedTime)
          }}</span>
        </p>
        <p class="body-1">
          {{ item.content }}
        </p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  props: {
    item: {
      avatar: "default.jpg",
      content: "",
      createTime: "",
      id: "",
      modifiedTime: "",
      score: 0,
      type: "",
      userId: "",
      username: "",
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    userAvatar(avatar) {
      if (/^http/.test(avatar)) {
        return avatar;
      } else {
        // 否则显示默认头像
        return "/default.jpg";
      }
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>

<style>
</style>