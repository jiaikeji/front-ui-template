# EGGO-UI

#### 开发文档
基于el-admin，相关文档 [https://el-admin.vip](https://el-admin.vip)
#### 开发规范
每天完成开发后，需测试打包速度及ie兼容性
引入第三方库，需要测试ie兼容性
#### 技术栈：
	采用开源项目eladmin作为前端基础开发架构
    UI组件库 ElementUI
	vue 用于构建用户界面的渐进式框架
	vue-router 用于路由管理 
	vuex 用于状态管理
	axios 基于promise的HTTP库
	lodash JS工具库(使用：this._.函数名) 参考手册 https://www.lodashjs.com/docs/
	vue2-animate CSS3动画库 效果参考 https://animate.style/
	tinymce-vue 富文本编辑器
	babel-polyfill 兼容JS新语法
	mockjs 模拟接口数据 参考文档 https://github.com/nuysoft/Mock/wiki
	html2canvas html转canvas
	qrcodejs2 生成二维码（不带图片）
	vue-qr 生成二维码（可显示图片）
	moment JavaScript 日期处理类库
	vue-count-to 数据滚动插件
	echarts  JavaScript 实现的开源可视化库
	jquery
	qs url参数转化（parse和stringify）的js库
	less、scss、stylus CSS 的预处理框架
	mockjs 数据模拟
#### 组件：
	SvgIcon 图标
	弹窗组件 可选UI，默认ElementUI
	组件模块的引入必须使用绝对路径(例如：@/components/xxx)
	金额比例反推
	步骤条
	FormTip 提示 
	FormSubLabel 表单对象分割符，全局可用
#### 字典使用
	1、import { mapGetters } from 'vuex'
	2、computed: {
		...mapGetters(['dicts'])
	   }
	3、数据源：dicts[字典编码]
#### 项目结构：
	模块请求放在api目录内
	第三方接口（例如腾讯地图）存放在api/otherApi.js中
	基础模块开发应由 index、module -> form、header、components 这几部分组成
	引入的svg图标均存在放在 src/assets/icons/svg 中
#### Build Setup
``` bash
# 配置镜像加速
https://www.ydyno.com/archives/1219.html

# 安装依赖
yarn

# 启动服务 localhost:8013
yarn dev

# 构建生产环境
yarn build:prod
```

#### 常见问题

1、linux 系统在安装依赖的时候会出现 node-sass 无法安装的问题

解决方案：
```
1. 单独安装：npm install --unsafe-perm node-sass 
2. 直接使用：npm install --unsafe-perm
```

2、加速node-sass安装

https://www.ydyno.com/archives/1219.html