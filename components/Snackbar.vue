// ~/components/Snackbar.vue

<template>
  <v-snackbar timeout="2000" v-model="show" :color="color" top>
    <v-icon>{{ icon }}</v-icon>
    <span>{{ message }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
      icon: "",
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color;
        this.icon = state.snackbar.icon;
        this.show = true;
      }
    });
  },
};
</script>