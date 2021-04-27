<template>
  <div>
    <v-card>
      <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
      <v-card-title primary-title> 文章管理 </v-card-title>
      <v-divider></v-divider>
      <v-container grid-list-xs>
        <v-row v-for="item in items" :key="item.id">
          <v-col>
            <v-responsive :aspect-ratio="16 / 9">
              <v-img width="300px" :src="item.cover"></v-img>
            </v-responsive>
          </v-col>
          <v-col>
            <v-card-text> 文章标题:{{ item.title }} </v-card-text>
            <v-card-text> 文章类别:{{ item.typeId }} </v-card-text>
          </v-col>
          <v-col>
            <v-card-text> 创建时间:{{ item.createTime }} </v-card-text>
            <v-card-text> 修改时间:{{ item.modifiedTime }} </v-card-text>
          </v-col>
          <v-col>
            <v-card-text> 点赞数:{{ item.likeCount }} </v-card-text>
            <v-card-text> 评论数:{{ item.commentCount }} </v-card-text>
          </v-col>
          <v-col> 文章操作 </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Discover</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import articleApi from "@/api/article";
import cookie from "js-cookie";
export default {
  layout: "ucenter",
  data: () => ({
    searchObj: {}, // 查询表单对象
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
    memberId: "", //作者id
    page: 1, //当前页
    limit: 8, //每页个数
    items: [
      {
        id: "", //文章id
        authorId: "", //作者id
        typeId: "", //类别id
        title: "", //文章标题
        cover: "", //文章封面
        viewCount: 0, //浏览数
        isDeleted: 0, //是否删除
        createTime: "2021-04-25 23:22:39", //创建时间
        modifiedTime: "2021-04-25 23:22:39", //修改时间
        commentCount: 0, //评论数
        likeCount: 0, //点赞数
        content: null, //
      },
    ],
    // 面包屑信息
    breadList: [
      {
        disabled: false,
        // exact: boolean,
        // href: string,
        link: true,
        text: "个人中心",
      },
      {
        disabled: false,
        // exact: boolean,
        // href: string,
        link: true,
        text: "文章管理",
        to: "/ucenter/article",
      },
    ],
  }),

  created() {
    this.memberId = cookie.getJSON("dhu_ucenter").id;
    this.getArticleMemberList();
  },

  methods: {
    getArticleMemberList() {
      articleApi
        .getArticleMemberList(this.page, this.limit, this.memberId)
        .then((response) => {
          console.log(response);
          this.items = response.data.items;
        });
    },
  },
};
</script>

<style>
</style>