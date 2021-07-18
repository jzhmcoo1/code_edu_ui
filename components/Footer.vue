<template>
  <v-card>
    <v-footer v-bind="localAttrs" :padless="padless">
      <v-card
        flat
        tile
        width="100%"
        dark
        min-height="100px"
        class="text-center"
      >
        <!-- <v-divider></v-divider> -->

        <v-card-text class="text-uppercase text-center">
          <p>2020 - {{ new Date().getFullYear() }}</p>
          <a
            class="font-weight-bold"
            href="https://github.com/jzhmcoo1/code_edu_ui"
          >
            CodeBar
          </a>
          <span class="px-2">by</span>
          <a class="font-weight-bold" href="https://github.com/jzhmcoo1/">
            jzhmcoo1
          </a>
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