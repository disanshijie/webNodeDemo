/**
 * 第四步，配置路由如何跳转
 */
var express = require('express');
var dispatch = express.Router();
//地址匹配扩展
const autopatch = require('./autopatch');
/*
//var Article = require('./article');
//var Comments = require('./comments');
*/
//用户
var User = require('../src/business/module/user/control/index');
dispatch.get('/html/login', User.html);
dispatch.get('/login', User.login);
dispatch.post('/login', User.login);

/*
//前台标签展示
dispatch.post('/getTags', Article.getTagList);
dispatch.get('/getArticleDate', Article.articleGroupByMonth);
dispatch.post('/getArticleListByDate', Article.getArtListByDate);

//文章评论
var ipLimiter=require('./interceptor/rateLimit');
dispatch.post('/addComment',ipLimiter,Comments.addComment);
*/

//文件操作模块
var fs = require('../src/business/module/file/control/localAction');

/* dispatch.get('/file/list', fs.list); //列出
dispatch.post('/file/list', fs.list); //列出
dispatch.get('/file/listAll', fs.listAll); //列出及子目录
dispatch.post('/file/listAll', fs.listAll); //列出及子目录
 */
dispatch.get('/file/open', fs.open); //打开
dispatch.post('/file/copy', fs.copy); //复制
dispatch.post('/file/move', fs['move']); //移动，剪切

dispatch.post('/file/*',function (req,res,nest) {
    console.log(req.url);
    console.log(req.originalUrl);
    var keys=autopatch(req.url,'/file/*');
    if(keys && keys[0]){
        let fun=fs[keys[0]];

        if(fun){
            fun(req,res);
            return;
        }
    }
    //res.redirect(200, 'index.html');
    nest();
});
dispatch.get('/file/*',function (req,res) {
    console.log(req.url);
    console.log(req.originalUrl);
    var keys=autopatch(req.url,'/file/*');
    if(keys && keys[0]){
        let fun=fs[keys[0]];
        if(fun){
            fun(req,res);
            return;
        }
    }
    res.redirect(200, 'index.html');
});

var remote = require('../src/business/module/file/control/remoteAction');

dispatch.post('/api/remote/uploadfile',remote.uploadfile)
/* 
dispatch.post('/api/remote/*',function (req,res) {
    console.log(req.url);
    console.log(req.originalUrl);
    var keys=autopatch(req.url,'/api/remote/*');
    if(keys && keys[0]){
        let fun=remote[keys[0]];

        if(fun){
            fun(req,res);
            return;
        }
    }
    res.json({success:0,msg:"错误"});
});
 */


module.exports = dispatch;