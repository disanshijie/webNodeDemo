/**
 * 简单文件上传模块
 * Created by wuwy on 2016/4/6.
 * https://www.cnblogs.com/wuwanyu/p/wuwanyu20160406.html
 * https://github.com/wuwanyu/formidable_multiparty_demo
 */
const multiparty = require('multiparty');

//可用
exports.multipartyFormParse = function(req,callback){
    var form = new multiparty.Form({
        encoding:"utf-8",
        uploadDir:"D:/opt/public/upload",  //文件上传地址
        keepExtensions:true  //保留后缀
        //设置单文件大小限制 
        // form.maxFilesSize = 2 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和
    })

    form.parse(req, function(err, fields, files) {
        var obj ={};
        console.log(fields);
        console.log(files);

        fields.forEach(function(name) {
            console.log('name:' + name+";filed:"+fields[name]);
            obj[name] = fields[name];
        });

        Object.keys(files).forEach(function(name) {
            console.log('name:' + name+";file:"+files[name]);
            obj[name] = files[name];
        });
        console.log(">> obj:",obj);
        callback(err,obj);
    });

}