<template>
  <v-container>
    <div class="prism-player" id="player-con" style="z-index: 0"></div>
  </v-container>
</template>
<script>
import vod from "@/api/vod";
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://g.alicdn.com/de/prismplayer/2.9.3/skins/default/aliplayer-min.css",
      },
    ],
  },
  created() {},
  watch: {
    $route(from, to) {
      this.getPlayAuth();
    },
  },
  data() {
    return {
      playauth: "",
      vid: "",
      player: null,
    };
  },
  created() {
    this.getPlayAuth();
  },
  methods: {
    getPlayAuth() {
      console.log("player", this.player);
      vod.getVideoById(this.$route.params.vid).then((response) => {
        this.playauth = response.data.playAuth;
        this.vid = this.$route.params.vid;
        if (this.player === null) {
          this.mountAliplayer();
        } else {
          this.player.replayByVidAndPlayAuth(this.vid, this.playauth);
        }
      });
    },
    mountAliplayer() {
      this.player = new Aliplayer(
        {
          id: "player-con",
          playauth: this.playauth,
          vid: this.vid,
          width: "100%",
          height: "500px",
          autoplay: true,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
        },
        function (player) {
          console.log("The player is created");
        }
      );
    },
  },
};
</script>