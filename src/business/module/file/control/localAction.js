/**
 * Created By brand On 2017/10/16
 */
const path = require('path');
const src=path.resolve(process.cwd(), './src')
const resultMap=require(path.join(src, './util/domain/returnJson.js'));

const fs = require('fs');
const fse = require('fs-extra');
const downloadFile=require('../zutil/download.js');

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
/**
 * //复制
 * @param {src} req 文件/目录 
 * @param {dest} res 复制到目录
 * @param {overwrite} res 同名文件是否覆盖，默认false
 */

exports.copy = function (req,res) {
    let responseData={};
    console.log("复制");
    let params = req.body;
    console.log(params);
    console.log(resultMap);
    
    let src=params.src;
    let dest=params.dest;
    let ow=params.overwrite||false;

    if(!src || !dest){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);
    dest=decodeURI(dest);

    // With Promises:
    fse.copy(src, dest,{ overwrite: ow })
    .then(() => {
        console.log('success!')
        responseData.success=1;
        responseData.code = 4;
        responseData.msg = "复制成功";
        resultMap(res,responseData);

    })
    .catch(err => {
        console.error(err)
        responseData.msg = "复制失败";
        responseData.error = err;
        resultMap(res,responseData);
    })

    // req.session.user = user;  // 将用户信息写入 session
    // if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
    //     var redirectUrl = req.session.originalUrl;
    //     req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
    // } else {  // 不存在原始请求路径，将用户重定向到根路径
    //     var redirectUrl = '/';
    // }
    // res.redirect(redirectUrl);

};
/**
 * 移动
 * @param {src} req 文件/目录 
 * @param {dest} res 移动到目录
 * @param {overwrite} res 是否覆盖移动，默认false
 */
exports.move = function (req,res) {
    let responseData={};
    let params = req.body;
    let src=params.src;
    let dest=params.dest;
    let ow=params.overwrite||false;

    if(!src || !dest){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);
    dest=decodeURI(dest);

    // With Promises:
    fse.move(src, dest,{ overwrite: ow })
    .then(() => {
        console.log('success!')
        responseData.success=1;
        responseData.code = 4;
        responseData.msg = "移动成功";
        resultMap(res,responseData);

    })
    .catch(err => {
        console.error(err)
        responseData.msg = "移动失败";
        responseData.error = err;
        resultMap(res,responseData);
    })
};
/**
 * 创建文件夹
 * @param {*} src 路径
 */
exports.mkdir = (req,res) =>{
    let responseData={};
    let params = req.body;
    let src=params.src;
    let desiredMode="123";

    if(!src){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);

    // With Promises and a mode integer:
    fse.ensureDir(src, desiredMode)
    .then(() => {
        console.log('success!')
        responseData.success=1;
        responseData.code = 4;
        responseData.msg = "创建成功";
        resultMap(res,responseData);
    })
    .catch(err => {
        console.error(err)
        responseData.msg = "创建失败";
        responseData.error = err;
        resultMap(res,responseData);
    })
}
/**
 * 创建文件
 * @param {*} src 路径
 */
exports.creatfile = (req,res) =>{
    let responseData={};
    let params = req.body;
    let src=params.src;

    if(!src){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);

    // With Promises and a mode integer:
    fse.ensureFile(src)
    .then(() => {
        console.log('success!')
        responseData.success=1;
        responseData.code = 4;
        responseData.msg = "创建成功";
        resultMap(res,responseData);
    })
    .catch(err => {
        console.error(err)
        responseData.msg = "创建失败";
        responseData.error = err;
        resultMap(res,responseData);
    })
}
//TODO 
exports.getFileList = (req,res) =>{
    let responseData={};
    let params = req.body;
    let src=params.src;

    if(!src){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);

    console.log(src);
    //var filePath=obj.rootPath;
    var result=fileHandle(req, res, obj, config);

};

exports.rename = (req,res) =>{
    let responseData={};
    let params = req.body;
    let src=params.originalPath;
    let dest=params.newPath;

    if(!src || !dest){
        resultMap(res,{msg:"参数错误"});
        return;
    }

    var originalPath=decodeURI(src);
    var newPath=decodeURI(dest);

    var newName=obj.newName;
    var parentPath="";
    if(originalPath.length>1){
        var index=originalPath.lastIndexOf("/");
        if(index>0){
            parentPath=originalPath.substring(0,index);
        }
    }
    console.log("----重命名---");
    console.log(originalPath);
    console.log(newPath);
    console.log(parentPath+"/"+newName);
    if(parentPath){
        //----------原目录/文件--------新目录/文件-----回调函数
        fs.rename(originalPath,newPath,function(err){
            if(err){
                //console.error(err);
                responseData.data=err;
                responseData.msg='重命名失败';
                //return;
            }else{
                responseData.success=1;
                responseData.msg='重命名成功';
            }
            resultMap(res,responseData);
        });
    }
};

exports.delete = (req,res) =>{
    console.log("----删除---");
    let responseData={};
    let params = req.body;
    let src=params.originalPath;

    if(!src){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    var originalPath=decodeURI(src);
    
    console.log(originalPath);
    fse.remove(originalPath, err => {
        if (err) {
            console.error(err);
            responseData.msg='删除失败';
        }else{
            responseData.success=1;
            responseData.msg='删除成功';
        }
        resultMap(res,responseData);
      })
}
