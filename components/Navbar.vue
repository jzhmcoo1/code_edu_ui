<template>
  <v-app-bar app flat height="80">
    <v-layout row wrap>
      <v-container class="py-0 fill-height">
        <h1 class="heading--text mr-10 d-none d-lg-flex">Code Edu</h1>
        <!-- <v-avatar class="mx-2" color="grey darken-1" size="32"></v-avatar> -->
        <div class="d-span">
          <v-tabs background-color="transparent" slider-color="primary">
            <v-tab
              v-for="link in links"
              :key="link.title"
              router
              :to="link.route"
            >
              <v-icon>{{ link.icon }}</v-icon>
              <span class="d-none d-lg-flex">{{ link.title }}</span>
            </v-tab>
          </v-tabs>
        </div>
        <v-spacer></v-spacer>
        <v-switch
          class="center"
          :prepend-icon="$vuetify.theme.dark ? 'nightlight_round' : 'wb_sunny'"
          inset
          hide-details
          v-model="$vuetify.theme.dark"
        ></v-switch>
        <v-responsive max-width="260" class="mr-1">
          <v-text-field
            prepend-icon="search"
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <v-btn text router to="/login">登录</v-btn>
        <v-btn text router to="/register">注册</v-btn>
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
      { title: "首页", route: "/", icon: "home" },
      { title: "课程", route: "/course", icon: "school" },
      { title: "名师", route: "/teacher", icon: "group" },
      { title: "文章", route: "/article", icon: "library_books" },
      { title: "作者", route: "/qa", icon: "person" },
    ],
  }),
});
</script>