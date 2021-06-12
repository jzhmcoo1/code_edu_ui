<template>
  <v-card class="mt-3" flat>
    <v-card-title primary-title>
      <v-icon>comment</v-icon>
      {{ type === "teacher" ? "讲师" : "课程" }}评价
      <v-btn icon @click="showComment = !showComment">
        <v-icon>{{
          showComment ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <div v-show="showComment">
        <v-card-title class="subtitle-1"> 你的评价 </v-card-title>
        <!-- 添加评价 -->
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                :disabled="readonly"
                :label="`评价一下${type === 'teacher' ? '讲师' : '课程'}吧`"
                v-model="evaluationObj.content"
                @click="showAddEvaluation = true"
              ></v-text-field>
            </v-flex>
            <div>
              <v-layout row wrap>
                <v-flex xs12 class="d-flex justify-end">
                  <v-rating
                    background-color="grey lighten-2"
                    color="primary"
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half-full"
                    half-increments
                    hover
                    v-model="evaluationObj.score"
                    :readonly="readonly"
                    length="5"
                    :value="evaluationObj.score"
                  >
                  </v-rating>
                  <v-spacer></v-spacer>
                  <v-btn depressed @click="readonly = !readonly" class="mx-2">
                    <v-icon
                      left
                      v-text="readonly ? 'mdi-pencil' : 'mdi-redo'"
                    ></v-icon>
                    {{ readonly ? "编辑" : "取消" }}
                  </v-btn>
                  <v-btn v-show="!readonly" color="primary" @click="editOrSave">
                    <v-icon
                      left
                      v-text="evaluationObj.id === '' ? 'mdi-plus' : 'done'"
                    ></v-icon>
                    {{ evaluationObj.id === "" ? "评价" : "保存" }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-layout>
        </v-card-text>
        <v-card-title class="subtitle-1"> 评价列表 </v-card-title>
        <v-layout row wrap v-if="evaluationList.length !== 0">
          <v-flex xs12 v-for="item in evaluationList" :key="item.id">
            <evaluation-item :item="item" />
          </v-flex>
          <v-container grid-list-xs>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="Math.ceil(total / limit)"
                :total-visible="7"
                circle
                @input="getEvaluationList"
                @next="getEvaluationList"
                @previous="getEvaluationList"
              ></v-pagination>
            </div>
          </v-container>
        </v-layout>
        <v-layout row wrap v-else justify-center>
          <a-empty
            :description="`该${
              type === 'teacher' ? '讲师' : '课程'
            }暂时还没有评价`"
          />
        </v-layout>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import evaluation from "@/api/evaluation";
import EvaluationItem from "@/components/EvaluationItem.vue";
export default {
  components: {
    EvaluationItem,
  },
  props: {
    type: "",
    id: "",
  },
  data() {
    return {
      page: 1,
      limit: 8,
      total: 0,
      showAddEvaluation: false,
      showComment: true,
      evaluationList: [],
      evaluationObj: {
        content: "",
        type: this.type,
        score: 0,
        evaluatedId: this.id,
        username: this.$store.state.account.user.username,
        userId: this.$store.state.account.user.userId,
        id: "",
      },
      readonly: true,
    };
  },
  created() {
    this.getEvaluationList();
    this.getEvaluationStatus();
  },
  methods: {
    editOrSave() {
      this.readonly = !this.readonly;
      if (this.evaluationObj.id === "") {
        this.addEvaluation();
      } else {
        this.updateEvaluation();
      }
    },
    getEvaluationList() {
      evaluation
        .pageEvaluation(this.id, this.limit, this.page, this.type)
        .then((response) => {
          this.evaluationList = response.data.items;
          this.total = parseInt(response.data.total);
          console.log(this.evaluationList);
        });
    },
    getEvaluationStatus() {
      evaluation
        .getEvaluation(this.id, this.limit, this.page, this.type)
        .then((response) => {
          if (response.data) {
            this.evaluationObj = response.data;
          }
        });
    },
    addEvaluation() {
      evaluation.addEvaluation(this.evaluationObj).then((response) => {
        if (response.code === 200) {
          this.$message.success("添加评价成功👌");
          this.getEvaluationList();
          this.getEvaluationStatus();
        } else {
          this.$message.error("添加评价失败😨");
        }
      });
    },
    updateEvaluation() {
      evaluation.updateEvaluation(this.evaluationObj).then((response) => {
        if (response.code === 200) {
          this.$message.success("更新评价成功👌");
          this.getEvaluationList();
          this.getEvaluationStatus();
        } else {
          this.$message.error("更新评价失败😨");
        }
      });
    },
  },
};
</script>

<style>
</style>