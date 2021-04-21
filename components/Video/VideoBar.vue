<template>
  <v-card flat>
    <v-container grid-list-xs>
      <v-card-title primary-title>
        <v-btn
          @click="hasThumbed = !hasThumbed"
          text
          :color="hasThumbed ? 'info' : ''"
        >
          <v-icon>thumb_up</v-icon>
          点赞
        </v-btn>
        <v-btn
          text
          @click="hasCoined = !hasCoined"
          :color="hasCoined ? 'info' : ''"
        >
          <v-icon>monetization_on</v-icon>
          投币
        </v-btn>
        <v-btn
          @click="hasStarred = !hasStarred"
          text
          :color="hasStarred ? 'info' : ''"
        >
          <v-icon>star</v-icon>
          收藏
        </v-btn>
        <v-btn text>
          <v-icon>share</v-icon>
          分享
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="openEditDrawer" text>
          <v-icon left>note</v-icon>
          课程笔记
        </v-btn>
      </v-card-title>
    </v-container>
    <!-- 视频工具栏 -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import PubSub from "pubsub-js";
export default Vue.extend({
  data() {
    return {
      thumb: 0,
      star: 0,
      coin: 0,
      hasThumbed: false,
      hasStarred: false,
      hasCoined: false,
    };
  },
  methods: {
    openEditDrawer() {
      PubSub.publish("editDrawer");
    },
  },
});
</script>

<style>
</style>