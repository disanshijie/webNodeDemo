/**
 * 第三步，设置路由
 */

//配置app的路由拦截器
exports.setroute = function (app) {
	
	//cookie 登录拦截器，必须放在静态资源声明之后、路由导航之前
	var cookie=require("./interceptor/cookie");
	//cookie.userCookie(app);
	
	//主路由
	var dispatch=require("./dispatch");
	app.use('/', dispatch);
  	//app.use('/api', api);

  //也可以在这直接get，post
	//一个get请求的路由  http://localhost:3000
	app.get("/index", function (req, res) {
		//定位到静态文件路径，此处eg：web/public/index.html
		res.render("index");
		//res.sendfile("./web/public/common/html/404.html");
	});
	//又一个请求路由：http://localhost:3000/abc
	app.get("/abc", function (req, res) {
		//定位到views目录了 TODO view目录比public好像优先级高
		res.render("viewsIndex", {title:"育知同创" + req.path})
  	});

}

/*
 生成一个路由实例用来捕获访问主页的GET请求，
 导出这个路由并在app.js中通过app.use('/', routes);
 加载。这样，当访问主页时，就会调用res.render('index', { title: '育知同创' });
 渲染views/index.ejs模版并显示到浏览器中。
 */
