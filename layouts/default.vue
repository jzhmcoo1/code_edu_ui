<template>
  <v-app id="index">
    <Navbar />
    <section v-if="this.$route.path === `/`" id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                    ]"
                    class="font-weight-light"
                  >
                    WELCOME TO
                  </span>

                  <br />

                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4',
                    ]"
                    class="font-weight-black"
                  >
                    Code Bar
                  </span>
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  @click="$vuetify.goTo('#slider')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>
    <v-main class="background">
      <v-container>
        <v-sheet min-height="80vh" rounded="lg">
          <nuxt />
        </v-sheet>
      </v-container>
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">

            </v-sheet>
          </v-col> -->

          <!-- <v-col cols="24" sm="8">
            <v-sheet min-height="100vh" rounded="lg">
              <nuxt />
            </v-sheet>
          </v-col> -->

          <!-- <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">

            </v-sheet>
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    Navbar,
    Footer,
  },
  data: () => ({}),
  created() {},
  methods: {},
});
</script>
