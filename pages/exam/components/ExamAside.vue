<template>
  <v-card flat>
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> 考试目录 </v-list-item-title>
          <v-list-item-subtitle> 题目一览 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-group
        v-for="group in groups"
        :key="group.text"
        no-action
        :value="true"
        :prepend-icon="group.icon"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ group.text }}</v-list-item-title>
        </template>

        <v-list-item
          dense
          link
          v-for="(id, index) in group.ids"
          :key="id"
          @click="handleClick(id, group.text, index)"
        >
          <v-list-item-title
            v-text="group.text + ' ' + (index + 1)"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import PubSub from "pubsub-js";
export default {
  props: {
    groups: {},
  },
  data() {
    return {};
  },
  methods: {
    handleClick(id, type, index) {
      console.log("点击了" + id);
      PubSub.publish("fetchQuestion", { id, type, index });
    },
  },
};
</script>

<style>
</style>