/**
 * 第四步，配置路由如何跳转
 */
var express = require('express');
var dispatch = express.Router();

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
dispatch.get('/file/copy', fs.copy); //复制
dispatch.get('/file/move', fs.move); //移动，剪切



module.exports = dispatch;