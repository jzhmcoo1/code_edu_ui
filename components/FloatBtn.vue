<template>
  <v-speed-dial
    absolute
    fixed
    v-model="fab"
    bottom
    right
    direction="top"
    :open-on-hover="true"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="grey darken-2" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> format_list_bulleted </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({ fab: false }),

  computed: {},

  watch: {},
};
</script>
<style>
</style>