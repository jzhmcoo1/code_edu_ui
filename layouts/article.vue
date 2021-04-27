<template>
  <v-app id="article">
    <Navbar />
    <v-main class="background">
      <nuxt />
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