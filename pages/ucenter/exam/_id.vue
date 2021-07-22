<template>
  <v-card min-height="90vh">
    <v-breadcrumbs divider="/" :items="breadList"> </v-breadcrumbs>
    <v-toolbar flat>
      <v-toolbar-title class="font-weight-bold">考试记录</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-toolbar-title>{{ examName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-bold"
        >得分: {{ examRecord.examJoinScore }}</v-toolbar-title
      >
    </v-toolbar>
    <v-row>
      <v-col cols="3">
        <v-card flat>
          <v-navigation-drawer permanent>
            <v-list-item>
              <v-list-item-content>
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
      </v-col>
      <v-col class="pt-6">
        <v-card
          flat
          v-if="question.id === ''"
          height="100%"
          class="d-flex flex-column justify-center"
        >
          <a-empty description="请选择题目查看答案😁" />
        </v-card>
        <v-card v-else flat>
          <v-row>
            <v-col>
              <v-card-title primary-title class="pb-1">
                {{ question.type }} {{ question.index + 1 }}
                <span>
                  <v-icon
                    :color="
                      resultsMap[question.id] === 'False' ? 'error' : 'success'
                    "
                    v-text="
                      resultsMap[question.id] === 'False' ? 'close' : 'done'
                    "
                  ></v-icon>
                </span>
              </v-card-title>
            </v-col>
          </v-row>

          <v-card-title class="subtitle-1">
            {{ question.name }}
          </v-card-title>
          <v-row no-gutters>
            <v-col>
              <v-card flat>
                <v-card-title primary-title> 标准答案 </v-card-title>
                <v-card-actions>
                  <div v-if="question.type === '多选题'">
                    <v-checkbox
                      readonly
                      v-model="selected"
                      v-for="option in question.options"
                      :key="option.questionOptionId"
                      :label="option.questionOptionContent"
                      :value="option.questionOptionId"
                    >
                    </v-checkbox>
                  </div>
                  <div v-else>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        readonly
                        v-for="option in question.options"
                        :key="option.questionOptionId"
                        :label="option.questionOptionContent"
                        :value="option.questionOptionId"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                flat
                class="pt-0 pl-2"
                style="border-left: 1px solid #eee"
              >
                <v-card-title primary-title> 我的答案 </v-card-title>
                <v-card-actions>
                  <div v-if="question.type === '多选题'">
                    <v-checkbox
                      readonly
                      v-model="mySelected"
                      v-for="option in question.options"
                      :key="option.questionOptionId"
                      :label="option.questionOptionContent"
                      :value="option.questionOptionId"
                    >
                    </v-checkbox>
                  </div>
                  <div v-else>
                    <v-radio-group v-model="myRadioGroup">
                      <v-radio
                        readonly
                        v-for="option in question.options"
                        :key="option.questionOptionId"
                        :label="option.questionOptionContent"
                        :value="option.questionOptionId"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import examApi from "@/api/exam";
import questionApi from "@/api/question";
export default {
  layout: "ucenter",
  data() {
    return {
      answersMap: {},
      answersRightMap: {},
      resultsMap: {},
      examRecord: {},
      examName: "",
      groups: [],
      mySelected: [],
      selected: [],
      myRadioGroup: "",
      radioGroup: "",
      question: {
        id: "",
        name: "",
        options: [],
        type: "",
        index: 0,
      },
      // 面包屑信息
      breadList: [
        {
          disabled: false,
          link: true,
          text: "个人中心",
        },
        {
          disabled: false,
          link: true,
          text: "考试记录",
          to: "/ucenter/exam",
        },
        {
          disabled: true,
          link: true,
          text: "记录详情",
          to: "/ucenter/exam",
        },
      ],
    };
  },
  created() {
    this.getRecordById();
  },
  methods: {
    async getRecordById() {
      const response = await examApi.recordDetail(this.$route.params.id);
      this.answersMap = response.data.answersMap;
      this.answersRightMap = response.data.answersRightMap;
      this.resultsMap = response.data.resultsMap;
      this.examRecord = response.data.examRecord;
      console.log("考试记录:", this.examRecord);
      console.log("作对情况:", this.resultsMap);
      console.log("我的答案:", this.answersMap);
      console.log("标准答案:", this.answersRightMap);
      this.getExamDetail(this.examRecord.examId); //为了获取考试名称
    },
    getQuestionById(questionId) {
      questionApi.detail(questionId).then((response) => {
        console.log(response.data);
        this.question.id = response.data.id;
        this.question.name = response.data.name;
        this.question.options = response.data.options;
        this.question.type = response.data.type;
        console.log(this.question);
        if (this.question.type === "多选题") {
          this.mySelected = this.answersMap[this.question.id];
          console.log("我的多选题答案", this.mySelected);
          this.selected = this.answersRightMap[this.question.id];
          console.log("标准多选题答案", this.selected);
        } else {
          this.myRadioGroup = this.answersMap[this.question.id][0];
          console.log("我的单选/判断题答案", ...this.myRadioGroup);
          this.radioGroup = this.answersRightMap[this.question.id][0];
          console.log("标准单选/判断题答案", ...this.radioGroup);
        }
      });
    },
    getExamDetail(examId) {
      examApi.detail(examId).then((response) => {
        console.log(response.data);
        this.examName = response.data.exam.examName;
        this.checkIds = response.data.checkIds.filter((value) => value !== "");
        this.judgeIds = response.data.judgeIds.filter((value) => value !== "");
        this.radioIds = response.data.radioIds.filter((value) => value !== "");
        this.exam = response.data.exam;
        this.groups = [
          { text: "单选题", icon: "mdi-radiobox-marked", ids: this.radioIds },
          { text: "多选题", icon: "mdi-check-box-outline", ids: this.checkIds },
          { text: "判断题", icon: "disabled_by_default", ids: this.judgeIds },
        ];
      });
    },
    handleClick(id, type, index) {
      console.log("点击了" + id);
      this.getQuestionById(id);
      this.question.index = index;
    },
  },
};
</script>

<style>
</style>