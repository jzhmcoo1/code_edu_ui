<template>
  <v-container>
    <div id="dplayer" class="dplayer"></div>
  </v-container>
</template>
<script>
import vod from "@/api/vod";
export default {
  asyncData({ params, query }) {
    return vod
      .getPlayAuth(params.vid)
      .then((response) => {
        return {
          playAuth: response.data.playAuth,
          vid: params.vid,
          courseId: query.courseId,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    if (process.browser) {
      let Dplayer = require("dplayer");
      new Dplayer({
        container: document.getElementById("dplayer"),
        autoplay: true,
        theme: "#FADFA3",
        loop: false,
        lang: "zh-cn",
        screenshot: true,
        hotkey: true,
        preload: "auto",
        logo: "logo.png",
        volume: 0.7,
        mutex: true,
        video: {
          url:
            "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          pic: "dplayer.png",
          thumbnails: "thumbnails.jpg",
          type: "auto",
        },
        subtitle: {
          url: "dplayer.vtt",
          type: "webvtt",
          fontSize: "25px",
          bottom: "10%",
          color: "#b7daff",
        },
        contextmenu: [
          {
            text: "custom1",
            link: "https://github.com/DIYgod/DPlayer",
          },
          {
            text: "custom2",
            click: (player) => {
              console.log(player);
            },
          },
        ],
        danmaku: {},
        // highlight: [
        //   // {
        //   //   time: 20,
        //   //   text: "这是第 20 秒",
        //   // },
        //   // {
        //   //   time: 120,
        //   //   text: "这是 2 分钟",
        //   // },
        // ],
      });
    }
  },
  methods: {},
};
</script>