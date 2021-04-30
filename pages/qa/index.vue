<template>
  <v-container class="pa-8 d-flex-column">
    <!-- 作者展示 -->
    <h1 class="heading--text font-weight-bold mb-5">项目作者</h1>
    <v-layout row wrap justify-space-around>
      <v-flex
        class="mr-2"
        xs12
        sm3
        v-for="author in authorList"
        :key="author.name"
      >
        <v-card flat class="text-center pa-3">
          <v-avatar rounded="circle" size="128" class="avatar-rotate"
            ><v-img class="avatar" :src="author.avatar"></v-img
          ></v-avatar>
          <v-card-subtitle>{{ author.name }}</v-card-subtitle>
          <v-card-actions>
            <v-btn :href="author.url" text block color="info">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <h1 class="heading--text font-weight-bold my-5">项目提交记录</h1>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      centered
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab>
        前端
        <v-icon>computer</v-icon>
      </v-tab>

      <v-tab>
        后端
        <v-icon>storage</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-layout column wrap class="px-5">
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
              <v-timeline-item
                small
                color="pink"
                v-for="commit in commitArray"
                :key="commit.stats.id"
                icon="edit"
              >
                <template v-slot:icon>
                  <v-avatar class="avatar-rotate">
                    <img :src="commit.committer.avatar_url" />
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <span class="subtitle-1 font-weight-bold info--text">{{
                    commit.committer.name
                  }}</span>
                </template>
                <v-card>
                  <v-card-title class="headline font-weight-bold info--text">
                    <v-icon size="42"> edit </v-icon>
                    {{ commit.commit.message }}
                  </v-card-title>
                  <v-card-text>
                    <p class="subtitle-2 grey--text">
                      <v-icon>event</v-icon>
                      提交时间:{{
                        getFormattedDate(commit.commit.committer.date)
                      }}
                    </p>
                    <p class="subtitle-2 subtitle-2 success--text">
                      <v-icon>add</v-icon>
                      增加行数:{{ commit.stats.additions }}
                    </p>
                    <p class="subtitle-2 error--text">
                      <v-icon>remove</v-icon>
                      删除行数:{{ commit.stats.deletions }}
                    </p>
                    <p class="subtitle-2 info--text">
                      <v-icon>functions</v-icon>
                      变化行数:{{ commit.stats.total }}
                    </p>
                    <v-btn :href="commit.html_url" class="mx-0" outlined>
                      查看详情
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-layout column wrap class="px-5">
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
              <v-timeline-item
                small
                color="pink"
                v-for="commit in commitBackArray"
                :key="commit.stats.id"
                icon="edit"
              >
                <template v-slot:icon>
                  <v-avatar class="avatar-rotate">
                    <img :src="commit.committer.avatar_url" />
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <span class="subtitle-1 font-weight-bold info--text">{{
                    commit.committer.name
                  }}</span>
                </template>
                <v-card>
                  <v-card-title class="headline font-weight-bold info--text">
                    <v-icon size="42"> edit </v-icon>
                    {{ commit.commit.message }}
                  </v-card-title>
                  <v-card-text>
                    <p class="subtitle-2 grey--text">
                      <v-icon>event</v-icon>
                      提交时间:{{
                        getFormattedDate(commit.commit.committer.date)
                      }}
                    </p>
                    <p class="subtitle-2 subtitle-2 success--text">
                      <v-icon>add</v-icon>
                      增加行数:{{ commit.stats.additions }}
                    </p>
                    <p class="subtitle-2 error--text">
                      <v-icon>remove</v-icon>
                      删除行数:{{ commit.stats.deletions }}
                    </p>
                    <p class="subtitle-2 info--text">
                      <v-icon>functions</v-icon>
                      变化行数:{{ commit.stats.total }}
                    </p>
                    <v-btn :href="commit.html_url" class="mx-0" outlined>
                      查看详情
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import moment from "moment";
moment.locale("zh-CN");
import Vue from "vue";
import repoApi from "@/api/repo";
export default Vue.extend({
  created() {
    this.getRepoRecords();
  },
  data() {
    return {
      tab: null,
      text: "123",
      authorList: [
        {
          name: "胡耀文",
          url: "https://gitee.com/paradox_hyw",
          intro: "后端工程师",
          avatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/WrORYfsbkVlKVAsp5Lw0g6jIOAVN2R2wbjmg42om3V2eXw8lYOWMSic5icdc7cGlHl1Jm0zBzsPBU0SnOzWtQJEQ/132",
        },
        {
          name: "朱立行",
          url: "https://gitee.com/jzhmcoo1",
          intro: "前端工程师",
          avatar:
            "https://portrait.gitee.com/uploads/avatars/user/2449/7349351_jzhmcoo1_1611747282.png!avatar200",
        },
        {
          name: "杨涵超",
          url: "https://gitee.com/hanchaoz",
          intro: "后端工程师",
          avatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/doOyCQSEkAG763qcsCibEuALTo9obIDaXaboWaibRbOl9TOBWddAyUH13lwWia8Q8utUBUKBuuiakhLs1ZvEWKeAfQ/132",
        },
      ],
      page: 1,
      per_page: 20,
      commitArray: [],
      commitBackArray: [],
    };
  },
  methods: {
    getRepoRecords() {
      repoApi.getCommitRecords(this.page, this.per_page).then((response) => {
        this.commitArray = response.data;
        console.log(this.commitArray);
      });
      repoApi
        .getBackCommitRecords(this.page, this.per_page)
        .then((response) => {
          this.commitBackArray = response.data;
          console.log(this.commitBackArray);
        });
    },
    getFormattedDate(date: string) {
      return moment(date).fromNow();
    },
  },
});
</script>

<style lang="scss" scoped>
</style>