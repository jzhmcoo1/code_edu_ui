<template>
  <!-- 明暗切换器 -->
  <v-switch
    class="center"
    :prepend-icon="$vuetify.theme.dark ? 'nightlight_round' : 'wb_sunny'"
    inset
    hide-details
    v-model="$vuetify.theme.dark"
  ></v-switch>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeDestroy() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", () => {});
  },
  created() {
    this.initTheme();
    this.watchTheme();
  },
  methods: {
    initTheme() {
      if (
        process.client &&
        this.$store.state.userInfo.peference.theme === "system"
      ) {
        const match = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.$store.commit("userInfo/setPeference", { theme: "" });
        if (match ^ this.$vuetify.theme.dark) {
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }
      }
    },
    watchTheme() {
      if (process.client) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            if (e.matches ^ this.$vuetify.theme.dark) {
              this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
          });
      }
    },
  },
};
</script>

<style>
</style>