/**
 * Created By brand On 2017/10/16
 */
var responseData = {
    code: 0,
    message: ''
}
//页面
exports.html = function (req,res) {
    console.log("页面");
    var params = req.body;
    res.render("business/module/user/login", {url:"育知同创" + req.path});
}
//登录
exports.login = function (req,res) {
    console.log("登陆");
    var params = req.body;
    console.log(params);
    if(params.userName == "" || params.userName == null){
        responseData.success=2;
        responseData.code = 1;
        responseData.message = "请输入用户名"
        res.json(responseData);
        return;
    }
    if(params.password == "" || params.password == null){
        responseData.success=2;
        responseData.code = 2;
        responseData.message = "请输入密码"
        res.json(responseData);
        return;
    }

    //console.log(req.session);
    if(!req.session){
        req.session={};
    }
    req.session.user = params.userName+"_"+params.password;  // 将用户信息写入 session TODO
    
    responseData.success=1;
    responseData.code = 4;
    responseData.message = "登录成功";
    res.json(responseData);
    return;
   
    //跳转
    /* 
    let redirectUrl = '/';
    if (req.session && req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
        redirectUrl = req.session.originalUrl;
        req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
    } else if (params.preUrl) { //前台携带路径
        redirectUrl=params.preUrl;
    } else {  // 不存在原始请求路径，将用户重定向到根路径
       
    }
    //console.log(redirectUrl);
    res.redirect(redirectUrl);
     */
};
