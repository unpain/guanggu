# guanggu

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```
## 模块分类
```sh
1.LoginView
该模块主要完成登录逻辑的书写,
包括用户名,密码,验证码
```
```sh
2.HomeView
该模块为主要模块,主要包括对地图的一系列操作,同时,根据登陆人员的不同,需要利用v-if和v-show完成不同的组件显示效果
```
## 各模块详细内容规划
 ```sh
 HomeView界面主要分为实时路况,视频监控,事件添加,事件更新,发布公告,路况信息,工具箱,交通事故查询,登录登出九个模块,需要将这九个模块分别拆分为九个组件,
 分别为
 实时路况:RealtimeRoadCondition
 视频监控:VideoSurveillance
 事件添加:EventAddition
 事件更新:EventUpdate
 发布公告:IssueAnnouncement
 路况信息:RoadConditionInfomation
 工具箱:MapToolbox
 交通事故查询:TrafficAccidentInquiry
 登录登出:LoginLogout
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
