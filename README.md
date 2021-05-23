# 🏫 code_edu_ui-ts

## 🖥 项目简介

CodeBar(Code Edu)在线教育平台前台项目

[github地址](https://github.com/jzhmcoo1/code_edu_ui) | [gitee地址](https://gitee.com/jzhmcoo1/code_edu_ui_new)

✨喜欢请点个Star哦✨

## ⌨️ 所用技术和开源项目

- [Nuxt](https://www.nuxtjs.cn/)搭建项目
- UI界面主要使用[Material Design](https://material.io/design)风格的组件库[Vuetify](https://vuetifyjs.com/en/)，额外按需引入了一小部分[Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/)和[ElementUI](https://element.eleme.cn/#/zh-CN)
- 封装[Axios](https://github.com/axios/axios)，进行Request和Response的拦截和自定义
- [js-cookie](https://github.com/js-cookie/js-cookie)，[Vuex](https://vuex.vuejs.org/zh/guide/state.html)管理登录用户信息
- [Pub-Sub](https://github.com/mroderick/PubSubJS#readme)进行兄弟组件交互信息
- [marked](https://github.com/markedjs/marked)+[highlight.js](https://highlightjs.org/)对markdown格式的文章进行渲染
- [Moment.js](http://momentjs.cn/)时间的格式化
- [vue-meditor](https://github.com/zhaoxuhui1122/vue-markdown)基于VueMarkdown编辑器
- [vue-side-catalog](https://github.com/yaowei9363/vue-side-catalog)生成文章目录，支持跟随滚动、高亮和跳转
- （一小部分使用typescript写的，只是稍微感受一下，不太熟悉）

## 💻 实现功能

- [x] 支持自动/手动切换黑夜模式或者日间模式
- [x] 用户登录/注册(手机验证码)
- [ ] 用户后台个人中心(管理信息/课程/笔记/文章/站内信)
- [x] 首页(轮播图/热门课程展示/名师展示)
- [x] 课程列表页面(二级类别检索/分页)
- [x] 课程详情页面(课程信息/讲师信息/课程章节/课程评论)
- [x] 视频播放界面(视频播放/切换章节/课程笔记/课程评论)
- [ ] 名师页面(名师展示/名师课程)
- [x] 文章列表(二级标签检索/分页)
- [x] 文章详情(文章基本信息/文章内容渲染/文章目录/文章作者信息/文章评论点赞浏览量)
- [x] 作者页面(展示项目作者/展示项目Git提交树)
- [ ] 站内搜索功能
- [ ] 用户历史浏览记录
- [ ] 根据用户行为进行推荐课程、文章等
- [ ] ...

## 🔨 项目安装与运行

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 相关项目

- [CodeEduUI前端](https://github.com/jzhmcoo1/code_edu_ui)
- [febs-Codebar-cloud微服务后端](https://gitee.com/paradox_hyw/febs-codebar-cloud)
- [FEBS-CodeBar-Admin后台管理前端](https://gitee.com/paradox_hyw/FEBS-CodeBar-Admin)


## 👁 项目预览

### 首页

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/index-pic.png)

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/index.png)

### 课程列表

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/course-index.png)

### 课程详情

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/course-id.png)

### 课程播放

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/player.png)

### 课程评论

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/course-comment.png)

### 文章列表

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/article-index.png)

### 文章详情

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/article-id.png)

### 个人中心

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/ucenter-info.png)

### 文章管理

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/markdown/20210430130745-ucenter-article.png)

### 黑夜模式

![](https://jzhmcoo1-1258918430.cos.ap-shanghai.myqcloud.com/code_edu_ui_pic/dark-mode.png)

