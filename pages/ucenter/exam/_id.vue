<template>
  <v-layout row wrap> </v-layout>
</template>

<script>
import examApi from "@/api/exam";
export default {
  layout: "ucenter",
  data() {
    return {
      answersMap: {},
      answersRightMap: {},
      resultMap: {},
      examRecord: {},
    };
  },
  created() {
    this.getRecordById();
  },
  methods: {
    getRecordById() {
      examApi.recordDetail(this.$route.params.id).then((response) => {
        console.log(response.data);
        this.answersMap = response.data.answersMap;
        this.answersRightMap = response.data.answersRightMap;
        this.resultMap = response.data.resultMap;
        this.examRecord = response.data.examRecord;
      });
    },
  },
};
</script>

<style>
</style>