<template>
  <v-card>
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-card-title primary-title> 123123 </v-card-title>
  </v-card>
</template>

<script>
export default {
  layout: "ucenter",
  data() {
    return {
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
          text: "个人信息",
          to: "/ucenter/info",
        },
      ],
    };
  },
};
</script>

<style>
</style>