/**
 * Created By brand On 2017/10/16
 */
var path = require('path');
var src=path.resolve(process.cwd(), './src')
var resultMap=require(path.join(src, './util/domain/returnJson.js'));

var fs = require('fs');
var downloadFile=require('../zutil/download.js');

/**
 * //打开文件 get请求
 * @param {*} req 
 * raw 打开方式 1下载，2打开
 * way (raw==1)下载方式,1普通，2流的形式
 *  
 * @param {*} res 
 */
exports.open = function (req,res) {
    console.log(req.query);
    let raw=req.query.raw;
    let way=req.query.way;
    let originalPath=req.query.url;

    //let filePath=decodeURI(originalPath);
    let filePath=originalPath;

    console.log("文件路径："+filePath);
    let fileName=filePath.substring(filePath.lastIndexOf('/')+1,filePath.length);
    let rexp=/\.(txt|html|js|css|md)/;
    if(rexp.test(fileName)){
        if(raw==1){
           
        }else {
            //异步读取文件数据
            fs.readFile(filePath,'binary',function(err,fileContent){
                if(err){
                    res.writeHead(404,"Not Found");
                    res.end('<h1>404 Not Found!</h1>');
                }else{
                    res.writeHead(200, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    });
                    res.write(fileContent,'binary');
                    res.end();
                }
            });
            return ;
        }
    }
    //默认
    //下载文件
    let handleParams={
        'originalPath':filePath,
        "fileName":fileName,
        'way':way||2
    }
    downloadFile.simple(res,handleParams);
};

//复制
exports.copy = function (req,res) {
    console.log("复制");
    var params = req.body;
    console.log(params);
    console.log(resultMap);
    
    
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
