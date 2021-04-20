<template>
  <v-app id="video">
    <Navbar />
    <v-main class="background">
      <v-container grid-list-xs>
        <v-row>
          <v-col>
            <v-sheet class="transparent" min-height="100vh" rounded="lg">
              <v-card flat>
                <v-card-title primary-title>
                  <v-icon>school</v-icon>
                  课程标题
                </v-card-title>
              </v-card>
              <!-- 课程视频区 -->
              <v-row>
                <v-col>
                  <nuxt />
                </v-col>
              </v-row>
              <!-- 课程功能区 -->
              <v-row>
                <v-col>
                  <v-card flat>
                    <v-container grid-list-xs>
                      <v-card-title primary-title>
                        <v-btn text>
                          <v-icon>thumb_up</v-icon>
                          点赞
                        </v-btn>
                        <v-btn text>
                          <v-icon>monetization_on</v-icon>
                          投币
                        </v-btn>
                        <v-btn text>
                          <v-icon>star</v-icon>
                          收藏
                        </v-btn>
                      </v-card-title>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <!-- 课程评论 -->
                  <v-card>
                    <v-card-title primary-title>
                      <v-icon>comment</v-icon>
                      课程评论
                      <v-btn icon @click="showComment = !showComment">
                        <v-icon>{{
                          showComment ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-expand-transition>
                      <div v-show="showComment">
                        <v-divider></v-divider>
                        <Comment type="course" :id="courseId" />
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col>
                <!-- 课程视频菜单 -->
                <v-sheet rounded="lg">
                  <v-list color="transparent">
                    <v-list-item v-for="n in 5" :key="n" link>
                      <v-list-item-content>
                        <v-list-item-title>
                          List Item {{ n }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider class="my-2"></v-divider>

                    <v-list-item link color="grey lighten-4">
                      <v-list-item-content>
                        <v-list-item-title> Refresh </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- 课程相关视频 -->
                <v-sheet rounded="lg">
                  <v-list color="transparent">
                    <v-list-item v-for="n in 5" :key="n" link>
                      <v-list-item-content>
                        <v-list-item-title>
                          List Item {{ n }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider class="my-2"></v-divider>

                    <v-list-item link color="grey lighten-4">
                      <v-list-item-content>
                        <v-list-item-title> Refresh </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Comment from "@/components/Comments";
export default {
  components: {
    Navbar,
    Comment,
  },
  data() {
    return {
      showComment: true,
      courseId: this.$route.query.courseId,
    };
  },
};
</script>


<style>
</style>