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
		console.log("请求路径：index");
		//直接路径当前路径为根下
		//res.sendfile("./web/public/common/html/404.html");
	});
	//又一个请求路由：http://localhost:3000/abc
	app.get("/abc", function (req, res) {
		console.log("请求路径：abc");
		//定位到views目录了 render就是渲染views的
		res.render("viewsIndex", {title:"育知同创" + req.path})
	});
	//又一个请求路由：http://localhost:3000/test
	app.get("/test", function (req, res) {
		console.log("请求路径：abc");
		//定位到views目录了 render就是渲染views的
		res.writeHead(200,{
			'Content-Type':'text/html'
		});
		var fs=require('fs');
		fs.readFile('index.html','utf8',function(err,data){
			if(err){
				throw err;
			}
			res.end(data);
		});
	});

}

/*
 生成一个路由实例用来捕获访问主页的GET请求，
 导出这个路由并在app.js中通过app.use('/', routes);
 加载。这样，当访问主页时，就会调用res.render('index', { title: '育知同创' });
 渲染views/index.ejs模版并显示到浏览器中。
 */
