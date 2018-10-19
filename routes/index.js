/**
 * 第三步，设置路由
 */
var dispatch=require("./dispatch");

//配置app的路由拦截器
exports.setroute = function (app) {
	
	//cookie 登录拦截器，必须放在静态资源声明之后、路由导航之前
	app.use(function (req, res, next) {
		if (req.session.user) {  // 判断用户是否登录
			next();
		} else {
			// 解析用户请求的路径
			var arr = req.url.split('/');
			// 去除 GET 请求路径上携带的参数
			for (var i = 0, length = arr.length; i < length; i++) {
				arr[i] = arr[i].split('?')[0];
			}
			// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
			if (arr.length > 1 && arr[1] == '') {
				next();
			} else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
				next();
			} else {  // 登录拦截
				req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
				req.flash('error', '请先登录');
				res.redirect('/user/login');  // 将用户重定向到登录页面
			}
		}
	});
	/*
	app.use(function (req, res, next) {
			//获取浏览器中当前访问的nodejs路由地址；
			var url = req.originalUrl;
			//获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，//因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
			var userCookies=req.cookies.userCookies; 
			console.log("123"+url);
			console.log("app获得cookie"+req.cookies.userCookies+"真假11111："+(req.cookies.userCookies==undefined));
	
			if(url=='/login'&&!(userCookies==undefined)){ //通过判断控制用户登录后不能访问登录页面；
					return res.redirect('/');//页面重定向；
			}
			next();
	});
	*/
	//主路由
  app.use('/', dispatch);
  //app.use('/api', api);

  //也可以在这直接get，post
	//一个get请求的路由  http://localhost:3000
	app.get("/", function (req, res) {
		res.render("index", {title:"育知同创abc"})
	});
	//又一个请求路由：http://localhost:3000/abc
	app.get("/abc", function (req, res) {
		res.render("index", {title:"育知同创" + req.path})
  });
  
}

/*
 生成一个路由实例用来捕获访问主页的GET请求，
 导出这个路由并在app.js中通过app.use('/', routes);
 加载。这样，当访问主页时，就会调用res.render('index', { title: '育知同创' });
 渲染views/index.ejs模版并显示到浏览器中。
 */