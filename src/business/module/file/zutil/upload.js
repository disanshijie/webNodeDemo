/**
 * 简单文件上传模块 multiparty设计，独立
 * Created by wuwy on 2016/4/6.
 * 
 */
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const util = require('util');
//保存文件基础路径
const fileBasePath = './';
const default_config={savePath:'temp/aa',fileBasePath:fileBasePath};
/**
 * multiparty上传文件，简单模块
 * @param {*} req 
 * @param {*} config 
 *     fileBasePath:保存文件的根目录
 *     savePath:保存到目录
 *     可自行扩展
 * @param {*} callback 
 *      eg:callback(err,(obj)=>{}); 返回错误或上传文件信息
 */
exports.multipartyFormParse = function(req,config,callback){
    if(typeof config === 'function'){
        callback=config;
        config =default_config;
    }else{
        config =config||default_config;
        config ={...default_config,...config};
    }
    let savePath=path.join(fileBasePath,config.savePath);;
    let uploadDir=savePath;
    mkdirSync(uploadDir);
    var form = new multiparty.Form({
        //参数参考https://www.npmjs.com/package/multiparty
        encoding:"utf-8",
        //保存路径，--巨坑,必须有此路径，可以设置为一个临时目录
        uploadDir:uploadDir,
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
            //console.log('name:' + name+";file:"+files[name]);
            //console.log(files[name]);
            //同步重命名文件名,循环命名每个文件
            //fs.renameSync(files.path,files.originalFilename,(err)=>{
            if(name && files[name]){
                let array=files[name];
                //双重循环，同一个<input type="file" name="inputFile">下可能有多个文件 TODO为啥？
                for (let i = 0; i < array.length; i++) {
                    let ele=array[i];
                    //重命名可以移动文件位置,TODO此处是移动+强制重命名会覆盖
                    fs.renameSync(ele.path,path.join(savePath,ele.originalFilename),(err)=>{
                        if(err){
                            callback(err,null);
                        }
                    });
                }
            }
            obj[name] = files[name];
        });
        //console.log(">> obj:",obj);
        //let ad=util.inspect({fields: fields, files: files});
        //console.log(ad);
        callback(err,obj);
    });

}
/**
 * 创建目录
 * @param dirpath
 */
const mkdirSync = function (dirpath){
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                fs.mkdirSync(pathtmp);
            }
        });
    }
};

/**
 * 简单文件上传模块
 * Created by wuwy on 2016/4/6.
 * https://www.cnblogs.com/wuwanyu/p/wuwanyu20160406.html
 * https://github.com/wuwanyu/formidable_multiparty_demo
 */