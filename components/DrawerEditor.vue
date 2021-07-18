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
      <v-row justify="center">
        <v-col>
          <v-btn block @click="saveNote" color="primary">
            {{ note.id === "" ? "添加" : "保存" }}笔记
            <v-icon right>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn block color="error" v-bind="attrs" v-on="on">
                {{ note.id === "" ? "清空" : "删除" }}笔记
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
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-sheet>
            <v-text-field
              outlined
              dense
              clearable
              name="title"
              label="笔记标题"
              v-model="note.title"
            ></v-text-field>
          </v-sheet>
          <v-sheet color="white">
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
import noteApi from "~/api/note";
export default {
  middleware: "auth",
  data: () => ({
    drawer: false,
    group: null,
    editorOptions: {
      hideModeSwitch: true,
    },
    dialog: false, //删除确认提示框
    note: {
      authorId: "",
      content: "",
      createTime: "",
      id: "",
      modifiedTime: "",
      title: "",
      videoId: "",
    },
  }),

  created() {
    PubSub.subscribe("editDrawer", () => {
      this.drawer = !this.drawer; //组件收纳和打开
    });
    // 将作者id和videoId进行初始化
    this.note.authorId = this.$store.state.account.user.userId;
    this.note.videoId = this.$route.query.videoId;
    this.checkExist();
  },
  // 监听路由videoId变化
  watch: {
    $route() {
      this.note.videoId = this.$route.query.videoId;
      this.checkExist();
    },
  },
  methods: {
    setMarkdown() {
      return this.$refs.toastuiEditor.invoke("setMarkdown", this.note.content);
    },
    getHtml() {
      return this.$refs.toastuiEditor.invoke("getHtml");
    },
    getMarkdown() {
      return this.$refs.toastuiEditor.invoke("getMarkdown");
    },
    // 检查该视频下是否存在视频,如果存在,则取回数据填入内容中
    async checkExist() {
      const exist = await noteApi.checkExistNote(this.note.videoId);
      if (exist.data.noteId !== null) {
        this.note.id = exist.data.noteId;
        const response = await noteApi.detailNote(this.note.id);
        console.log(response);
        this.note.title = response.data.note.title;
        this.note.content = response.data.note.content;
        this.setMarkdown();
      } else {
        this.$refs.toastuiEditor.invoke("reset");
        this.note.id = "";
        this.note.title = "";
        this.note.content = "";
      }
    },
    async deleteNote() {
      // 如果笔记id不为空,表示数据库存在这篇笔记
      if (this.note.id !== "") {
        const deleted = await noteApi.deleteNote(this.note.id);
        if (deleted.code === 200) {
          this.$message.success("删除笔记成功😁");
          this.note.id = "";
        }
      } else {
        // 如果id为空,则笔记只保存在本地,清空本地即可
        this.$message.success("清空笔记成功🙅");
      }
      this.$refs.toastuiEditor.invoke("reset"); // 调用reset接口,清空当前编辑器
      // 清空本地的数据
      this.note.content = "";
      this.note.title = "";
      this.dialog = false;
    },
    async saveNote() {
      // 调用toastEditor接口,获取markdown内容
      this.note.content = this.getMarkdown();
      let saved;
      if (this.note.id === "") {
        // id为空则添加
        saved = await noteApi.addNote(this.note);
      } else {
        // id不为空则更新
        saved = await noteApi.updateNote(this.note);
      }
      if (saved.code === 200) {
        this.$message.success("笔记保存成功");
      }
      // 添加/保存完成后重新获取内容
      this.checkExist();
    },
  },
};
</script>