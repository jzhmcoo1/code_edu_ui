<template>
  <v-app-bar app color="white" flat>
    <!-- <v-avatar
      :color="
        $vuetify.breakpoint.smAndDown ? 'primary darken-1' : 'transparent'
      "
      size="32"
    ></v-avatar> -->

    <v-tabs centered class="ml-n9" color="primary darken-1">
      <v-tab v-for="link in links" :key="link.title" router :to="link.route">
        {{ link.title }}
      </v-tab>
    </v-tabs>

    <v-icon>person</v-icon>
    <v-avatar
      class="hidden-sm-and-down"
      color="primary darken-1 shrink"
      size="32"
    ></v-avatar>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import cookie from "js-cookie";
export default Vue.extend({
  data: () => ({
    links: [
      { title: "首页", route: "/" },
      { title: "课程", route: "/course" },
      { title: "名师", route: "/teacher" },
      { title: "文章", route: "/articel" },
      { title: "作者", route: "/qa" },
    ],
  }),
  methods: {},
});
</script>