<template>
  <v-navigation-drawer
    overlay-color="transparent"
    right
    v-model="drawer"
    bottom
    app
    temporary
    width="400"
  >
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" class="d-flex justify-space-around">
          <v-btn @click="addNote" class="primary">
            新建笔记
            <v-icon right>mdi-plus-circle</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="error" dark v-bind="attrs" v-on="on">
                删除笔记
                <v-icon right>mdi-delete-circle</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"> 确认删除笔记吗? </v-card-title>
              <v-card-text>这篇笔记将会被永久删除 </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">
                  取消删除
                </v-btn>
                <v-btn color="green darken-1" text @click="deleteNote">
                  确认删除
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="saveNote" class="success">
            保存笔记
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet class="white">
            <client-only>
              <editor ref="toastuiEditor" previewStyle="tab" height="500px" />
            </client-only>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row justify="center"> </v-row>
    </v-container>
  </v-navigation-drawer>
</template>
<script>
import PubSub from "pubsub-js";
export default {
  data: () => ({
    drawer: false,
    group: null,
    editorOptions: {
      hideModeSwitch: true,
    },
    dialog: false, //删除确认提示框
  }),

  created() {
    PubSub.subscribe("editDrawer", () => {
      this.drawer = !this.drawer;
    });
  },
  methods: {
    getHtml() {
      return this.$refs.toastuiEditor.invoke("getHtml");
    },
    addNote() {
      // 保存当前笔记
      // 清空当前内容
    },
    deleteNote() {
      // 调用reset接口,清空当前编辑器
      this.$refs.toastuiEditor.invoke("reset");
      this.dialog = false;
      this.$message.success("删除笔记成功");
    },
    saveNote() {},
  },
};
</script>