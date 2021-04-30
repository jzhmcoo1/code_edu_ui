<template>
  <v-card>
    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card flat tile width="100%" class="primary lighten-1 text-center">
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>
            <a
              class="white--text"
              href="https://github.com/jzhmcoo1/code_edu_ui"
            >
              CodeEdu
            </a>
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    padless: true,
    variant: "default",
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>