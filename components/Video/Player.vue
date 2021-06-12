<template>
  <v-container>
    <vue-aliplayer-v2 ref="VueAliplayerV2" :options="options" />
  </v-container>
</template>
<script>
import vod from "@/api/vod";
import VueAliplayerV2 from "vue-aliplayer-v2";
export default {
  components: {
    VueAliplayerV2,
  },
  asyncData({ params }) {
    return vod.getVideoById(params.vid).then((response) => {
      return {
        source: "",
        playauth: response.data.playAuth,
        vid: params.vid,
      };
    });
  },
  data() {
    return {
      options: {
        vid: this.vid,
        playauth: this.playauth,
        width: "100%",
        height: "500px",
        preload: true,
        autoplay: false,
        useH5Prism: true, // 播放器类型：html5
      },
    };
  },
  methods: {},
};
</script>