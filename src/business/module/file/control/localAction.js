/**
 * Created By brand On 2017/10/16
 */
var responseData = {
    code: 0,
    message: ''
}
//复制
exports.copy = function (req,res) {
    console.log("登陆");
    var params = req.body;
    if(params.userName == "" || params.userName == null){
        responseData.code = 1;
        responseData.message = "请输入用户名"
        res.json(responseData);
        return;
    }
    if(params.password == "" || params.password == null){
        responseData.code = 2;
        responseData.message = "请输入密码"
        res.json(responseData);
        return;
    }
    
    // responseData.code = 4;
    // responseData.message = "登录成功";
    // res.json(responseData);
    // return;
    
    // req.session.user = user;  // 将用户信息写入 session
    // if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
    //     var redirectUrl = req.session.originalUrl;
    //     req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
    // } else {  // 不存在原始请求路径，将用户重定向到根路径
    //     var redirectUrl = '/';
    // }
    // res.redirect(redirectUrl);

};
//复制
exports.move = function (req,res) {
    console.log("登陆");
    var params = req.body;
    if(params.userName == "" || params.userName == null){
        responseData.code = 1;
        responseData.message = "请输入用户名"
        res.json(responseData);
        return;
    }
    if(params.password == "" || params.password == null){
        responseData.code = 2;
        responseData.message = "请输入密码"
        res.json(responseData);
        return;
    }
    
    // responseData.code = 4;
    // responseData.message = "登录成功";
    // res.json(responseData);
    // return;
    
    // req.session.user = user;  // 将用户信息写入 session
    // if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
    //     var redirectUrl = req.session.originalUrl;
    //     req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
    // } else {  // 不存在原始请求路径，将用户重定向到根路径
    //     var redirectUrl = '/';
    // }
    // res.redirect(redirectUrl);

};
