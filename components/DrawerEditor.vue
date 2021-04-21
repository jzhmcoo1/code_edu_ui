<template>
  <v-navigation-drawer
    overlay-color="transparent"
    right
    v-model="drawer"
    bottom
    app
    temporary
    width="400"
  >
  </v-navigation-drawer>
</template>
<script>
import PubSub from "pubsub-js";
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  created() {
    PubSub.subscribe("editDrawer", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>