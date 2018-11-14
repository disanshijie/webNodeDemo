/**
 * 简单文件上传模块
 * Created by wuwy on 2016/4/6.
 * 
 */
const multiparty = require('multiparty');
const fs = require('fs');
const util = require('util');

//可用
exports.multipartyFormParse = function(req,callback){
    var form = new multiparty.Form({
        //参数参考https://www.npmjs.com/package/multiparty
        encoding:"utf-8",
        //保存路径，--巨坑,必须有此路径
        uploadDir:'./web/public/upload',
        //uploadDir:'D:/sunjinchao/data/VSCode/workSpace/space1/akserver/webNodeDemo/web/public/upload',
        //保留后缀
        keepExtensions:true,
        //设置文件数量
        maxFields:1000,
        //设置单文件大小限制
        maxFilesSize:2 * 1024 * 1024,
        //设置所有文件的大小总和
        //maxFieldsSize:1024 * 1024 * 1024
    });

    form.parse(req, function(err, fields, files) {
        var obj ={};
        fields=fields||{};
        files=files||{};
        Object.keys(fields).forEach(function(name) { //文本
            obj[name] = fields[name];
        });
        Object.keys(files).forEach(function(name) { //文件
            console.log('name:' + name+";file:"+files[name]);
            console.log(files[name]);
            //同步重命名文件名,循环命名每个文件
            //fs.renameSync(files.path,files.originalFilename,(err)=>{
            if(name && files[name]){
                let array=files[name];
                //双重循环，同一个<input type="file" name="inputFile">下可能有多个文件 TODO为啥？
                for (let i = 0; i < array.length; i++) {
                    let ele=array[i];
                    fs.renameSync(ele.path,ele.originalFilename,(err)=>{
                        if(err){
                            console.log(err); //TODO
                        }else{
                            console.log("重命名");
                        }
                    });
                }
            }

            obj[name] = files[name];
        });
        console.log(">> obj:",obj);
        //let ad=util.inspect({fields: fields, files: files});
        //console.log(ad);
        callback(err,obj);
    });

}

/**
 * 简单文件上传模块
 * Created by wuwy on 2016/4/6.
 * https://www.cnblogs.com/wuwanyu/p/wuwanyu20160406.html
 * https://github.com/wuwanyu/formidable_multiparty_demo
 */