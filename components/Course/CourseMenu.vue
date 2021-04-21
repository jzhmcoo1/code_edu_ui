<template>
  <div>
    <!-- 课程大纲 -->
    <v-card-title primary-title>
      <v-icon left>menu_book</v-icon>
      课程大纲
      <v-btn icon @click="showChapter = !showChapter">
        <v-icon>{{
          showChapter ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-show="showChapter">
        <v-divider></v-divider>
        <v-list shaped :dense="dense" class="mx-1">
          <v-list-group
            no-action
            v-for="chapter in chapterVideoList"
            :key="chapter.id"
            :value="true"
            prepend-icon="school"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ chapter.title }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="child in chapter.children"
              :key="child.id"
              link
              :to="{
                name: 'course-player-vid',
                params: {
                  vid: child.videoSourceId,
                },
                query: {
                  courseId,
                },
              }"
            >
              <v-list-item-icon>
                <v-icon>mdi-school-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="child.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon>visibility</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  props: {
    chapterVideoList: Array, //课程的视频列表
    courseId: String,
    dense: Boolean, //列表展示是否紧凑
  },
  data() {
    return {
      showChapter: true,
    };
  },
  methods: {},
};
</script>

<style>
</style>