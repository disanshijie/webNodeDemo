var RateLimit = require('express-rate-limit');//限制ip访问
//TODO IP限制
module.exports = function(params) {
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
    return ipLimiter;
}