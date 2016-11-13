### Node+Mongodb+express
> 这是一个由Mongodb+express搭建的入门博客脚手架。
简单易学, 没有自动化构建以及复杂的配置(gulp, webpack.config),没有高深的语法糖(ES6),
一切从简，平民化，可自由扩展，可增加额外功能，如果您有能力, 有兴趣，也可以进行全面的重构。欢迎各路朋友点评，各种ideas，进行业务完善。
>
>This is an entry blog scaffolding built by Mongodb + Express. Simple and easy to learn, there is no automated construction and complex configuration (gulp, webpack.config), no advanced syntax sugar (ES6), everything from simple, civilians, can be expanded, additional features, if you have the ability, Can also be a comprehensive reconstruction. Welcome friends from various quarters, a variety of ideas, for business improvement.

#### 搭建项目步骤
* 安装mongodb并运行  [mongodb下载](https://www.mongodb.com/download-center?jmp=nav) | [mongodb安装](http://www.runoob.com/mongodb/mongodb-window-install.html)
* 安装nodejs [安装nodejs](https://nodejs.org/en/)

>



* 中间件:
	- npm install --save-dev body-parser(请求体参数处理)
	- npm install --save-dev connect-flash(全局信息通知)
	- npm install --save-dev cookie-parser(cookie 处理)
	- npm install --save-dev express-session(sesson 管理)
  
>

* 前端模板：ejs(可用其它模板代替hbs)
* git clone git@github.com:fontEndEasy/mongodb-express.git
* cd mongodb-express && npm install
* 如果npm失败，试试淘宝镜像：cd mongodb-express && npm install --registry=https://registry.npm.taobao.org --verbose
* 运行方式一：node ./bin/www 运行项目(请先运行mongodb)
* 运行方式二：热加载方式, 需要先全局安装nodemon包：
	- 直接安装：npm install -g nodemon
	- 淘宝镜像：npm install --registry=https://registry.npm.taobao.org --verbose nodemon -g
	
>

* 功能
	- 首页展示博文
	- 登录
	- 注册
	- 发表博文
  - 删除博文
  - 用户列表展示

> ###附: 先注册，再发表博文，回到首页即可展示博文。


#### Step:
* Install mongodb and run [install mongodb](http://www.runoob.com/mongodb/mongodb-window-install.html) | [download mongodb](https://www.mongodb.com/download-center?jmp=nav)
* Middleware:
	- body-parser
	- connect-flash
	- cookie-parser
	- express-session
>


* Font End Template：ejs(also, you can instead of hbs)
* git clone git@github.com:fontEndEasy/mongodb-express.git
* cd mongodb-express && npm install
* Run method One：node ./bin/www run project(please run the mongodb first)
* Run method Two：hot run mode, You need to install the nodemon package globally：
	- install method：npm install -g nodemon
	
>


* Features:
	- Home show blog
	- Login
	- Register
	- Post blog
  - Delete blog
  - Blog display

> ####Tips: Register first，then post blog，back to the home, you will see the blog.
