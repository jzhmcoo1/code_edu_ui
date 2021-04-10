<template>
  <v-app-bar app flat>
    <v-layout row wrap>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
        <v-btn
          v-for="link in links"
          :key="link.title"
          text
          router
          :to="link.route"
        >
          {{ link.title }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-switch
          class="center"
          :prepend-icon="$vuetify.theme.dark ? 'nightlight_round' : 'wb_sunny'"
          inset
          hide-details
          v-model="$vuetify.theme.dark"
        ></v-switch>
        <v-responsive max-width="260">
          <v-text-field
            prepend-icon="search"
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-layout>
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
      { title: "文章", route: "/article" },
      { title: "作者", route: "/qa" },
    ],
  }),
});
</script>