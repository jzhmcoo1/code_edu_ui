<template>
  <v-form>
    <v-container fluid>
      <v-row wrap>
        <v-col cols="3">
          <v-text-field v-model="examName" label="考试名称"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="examCreator" label="考试创建者"></v-text-field>
        </v-col>
        <v-col>
          <v-select
            icon="mdi-sort"
            :items="items"
            v-model="selected"
            label="排序规则"
          ></v-select>
        </v-col>
        <v-col cols="2" class="d-flex align-center justify-end">
          <v-btn block @click="search" color="primary">
            <v-icon left>search</v-icon>
            搜索
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "exam-condition",
  data() {
    return {
      selected: "startTimeSort",
      examName: "", //考试名称
      examCreator: "", //考试创建者姓名
      items: [
        { text: "考试开始时间排序", value: "startTimeSort" },
        { text: "考试时长排序", value: "examTimeSort" },
        { text: "考试结束时间排序", value: "endTimeSort" },
      ],
      condition: {},
    };
  },
  created() {},
  methods: {
    search() {
      this.condition = {
        examName: this.examName,
        examCreator: this.examCreator,
      };
      this.condition[this.selected] = true;
      console.log(this.condition);
      this.$emit("searchExam", this.condition);
      console.log("搜索考试");
    },
  },
};
</script>

<style>
</style>