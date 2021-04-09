<template>
  <v-app id="index">
    <Navbar />

    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet min-height="80vh" rounded="lg">
          <nuxt />
        </v-sheet>
      </v-container>
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">

            </v-sheet>
          </v-col> -->

          <!-- <v-col cols="24" sm="8">
            <v-sheet min-height="100vh" rounded="lg">
              <nuxt />
            </v-sheet>
          </v-col> -->

          <!-- <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">

            </v-sheet>
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    Navbar,
  },
  data: () => ({
    links: ["首页", "课程", "名师", "文章", "作者"],
  }),
});
</script>
