<template>
  <v-app id="article">
    <Navbar />

    <v-main class="background">
      <v-container>
        <v-row>
          <v-col cols="12" sm="9">
            <v-sheet min-height="70vh" rounded="lg">
              <!-- 嵌入文章和列表 -->
              <nuxt />
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-row>
              <v-col>
                <v-sheet rounded="lg" min-height="268"> 热门文章 </v-sheet>
              </v-col>
            </v-row>
            <v-row style="position: sticky; top: 80px">
              <v-col>
                <v-sheet rounded="lg" min-height="268"> 文章分类 </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import articleApi from "@/api/article";
export default {
  components: { Navbar },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-view-dashboard" },
      { title: "About", icon: "mdi-forum" },
    ],
  }),
};
</script>