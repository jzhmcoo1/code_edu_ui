<template>
  <div style="height: 100%">
    <v-card flat v-if="question.id !== ''">
      <v-card-title primary-title>
        {{ `${question.type} ${question.index + 1}` }}
      </v-card-title>
      <v-card-title primary-title>
        {{ questionData.name }}
      </v-card-title>
      <v-card-actions>
        <div v-if="question.type === '多选题'">
          <v-checkbox
            v-model="selected"
            v-for="option in questionData.options"
            :key="option.questionOptionId"
            :label="option.questionOptionContent"
            :value="option.questionOptionId"
          >
          </v-checkbox>
        </div>
        <div v-else>
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="option in questionData.options"
              :key="option.questionOptionId"
              :label="option.questionOptionContent"
              :value="option.questionOptionId"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-card-actions>
    </v-card>
    <v-card
      flat
      v-if="question.id === ''"
      height="100%"
      class="d-flex flex-column justify-center"
    >
      <a-empty description="请选择题目开始答题😁" />
    </v-card>
  </div>
</template>

<script>
import questionApi from "@/api/question";
export default {
  data() {
    return {
      questionData: {
        options: [{ questionOptionId: "", questionOptionContent: "" }],
        id: "",
        name: "",
        description: "",
      },
      selected: [],
      radioGroup: null,
    };
  },
  props: {
    question: {
      id: "",
      index: 0,
      type: "",
    },
  },

  watch: {
    question() {
      this.getQuestionDetail();
      this.selected =
        (this.$store.state.userInfo.exam.answerMap &&
          this.$store.state.userInfo.exam.answerMap[`${this.question.id}`]) ||
        [];
      this.radioGroup =
        (this.$store.state.userInfo.exam.answerMap &&
          this.$store.state.userInfo.exam.answerMap[`${this.question.id}`]) ||
        "";
    },
    radioGroup() {
      console.log(this.radioGroup);
      this.changeAnswer();
    },
    selected() {
      console.log(this.selected);
      this.changeAnswer();
    },
  },

  methods: {
    getQuestionDetail() {
      questionApi.detail(this.question.id).then((response) => {
        console.log(response.data);
        this.questionData = response.data;
      });
    },
    changeAnswer() {
      if (this.question.type === "多选题") {
        this.$emit("changeAnswer", this.question.id, this.selected);
      } else {
        this.$emit("changeAnswer", this.question.id, this.radioGroup);
      }
    },
  },
  created() {
    this.selected =
      (this.$store.state.userInfo.exam.answerMap &&
        this.$store.state.userInfo.exam.answerMap[`${this.question.id}`]) ||
      [];
    this.radioGroup =
      (this.$store.state.userInfo.exam.answerMap &&
        this.$store.state.userInfo.exam.answerMap[`${this.question.id}`]) ||
      "";
  },
  beforeDestroy() {},
};
</script>

<style>
</style>