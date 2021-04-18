<template>
  <v-app id="sign">
    <Navbar />
    <v-main>
      <v-container class="fill-height justify-center">
        <v-row class="justify-center">
          <v-col class="col-sm-8 col-lg-11 col-xl-7">
            <v-card elevation="4">
              <v-sheet>
                <v-row>
                  <!-- 左边 -->
                  <v-col
                    class="info d-none d-md-flex align-center justify-center col-lg-7"
                  >
                    <v-icon size="500">laptop</v-icon>
                  </v-col>
                  <!-- 右边 -->
                  <v-col class="d-flex flex-column col-lg-5 px-10 pb-5">
                    <div>
                      <v-tabs centered>
                        <v-tab router to="/login"> 登录 </v-tab>
                        <v-tab router to="/register"> 注册 </v-tab>
                      </v-tabs>
                    </div>
                    <v-layout justify-space-around column wrap>
                      <nuxt />
                    </v-layout>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
export default Vue.extend({
  components: {
    Navbar,
  },
});
</script>

<style>
</style>