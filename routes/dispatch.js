/**
 * 第四步，配置路由如何跳转
 */
var express = require('express');
var RateLimit = require('express-rate-limit');//限制ip访问
var dispatch = express.Router();

/*
//var Article = require('./article');
//var Comments = require('./comments');
//同一ip在20秒内只允许发送一次请求
var responseData = {
    code: 0,
    message: ''
}
var ipLimiter = new RateLimit({
    windowMs: 30*1000, // 20秒
    max: 1, // start blocking after 5 requests
    message: "不要再戳啦，休息30秒再战可好！",
    handler: function (req, res) { // 响应格式
        responseData.code = 439;
        responseData.message = "不要再戳啦，休息30秒再战可好！";
        res.json(responseData);
    }
});
*/
//用户
var User = require('../src/business/module/user/control/index');
dispatch.get('/login', User.login);
dispatch.post('/login', User.login);

/*
//前台标签展示
dispatch.post('/getTags', Article.getTagList);
dispatch.get('/getArticleDate', Article.articleGroupByMonth);
dispatch.post('/getArticleListByDate', Article.getArtListByDate);

//文章评论
dispatch.post('/addComment',ipLimiter,Comments.addComment);
*/
module.exports = dispatch;