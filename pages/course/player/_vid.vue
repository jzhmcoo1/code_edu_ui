<template>
  <div>
    <v-card>
      <Player />
    </v-card>
  </div>

  <!-- 视频播放器 -->
</template>

<script>
import Player from "@/components/Video/Player.vue";
export default {
  head() {
    return {};
  },
  layout: "video",
  components: {
    Player,
  },
};
</script>

<style>
</style>