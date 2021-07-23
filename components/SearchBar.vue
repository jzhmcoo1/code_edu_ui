<template>
  <v-autocomplete
    v-model="keyword"
    hide-no-data
    :dense="dense"
    clearable
    flat
    placeholder="搜索课程或文章"
    rounded
    append-icon="search"
    hide-details
    solo-inverted
    :search-input.sync="search"
    :loading="loading"
    :items="items"
    item-text="name"
    item-value="name"
    no-filter
    @click:append="gotoSearch"
  >
    <template v-slot:item="{ item }">
      <span v-html="item.raw"></span>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import searchApi from "@/api/search";
import PubSub from "pubsub-js";
export default Vue.extend({
  props: {
    dense: Boolean,
  },
  data() {
    return {
      keyword: null,
      search: null,
      loading: false,
      items: [] as any,
      word: "",
    };
  },
  watch: {
    search(val) {
      this.word = val;
      val && this.searchSuggest(val);
    },
  },
  methods: {
    searchSuggest(keyword: string) {
      if (this.loading === true) {
        return;
      }
      this.loading = true;
      searchApi
        .suggest(keyword)
        .then((response) => {
          let courseArray = [...response.data.course];
          let articleArray = [...response.data.article];
          this.items = [];
          if (courseArray.length !== 0) {
            this.items = [{ header: "课程" }];
            courseArray.map((course) => {
              this.items.push({
                raw: course,
                name: course.replace(/<[^>]+>/g, ""),
              });
            });
          }
          if (articleArray.length !== 0) {
            this.items.push({ header: "文章" });
            articleArray.map((article) => {
              this.items.push({
                raw: article,
                name: article.replace(/<[^>]+>/g, ""),
              });
            });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    gotoSearch() {
      if (!this.word || this.word === "") {
        return;
      }
      this.$router.push({ name: "search", query: { keyword: this.word } });
      PubSub.publish("search");
    },
  },
});
</script>

<style>
</style>