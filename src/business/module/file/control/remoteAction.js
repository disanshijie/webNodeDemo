const path = require('path');
const src=path.resolve(process.cwd(), './src')
const resultMap=require(path.join(src, './util/domain/returnJson.js'));

const fs = require('fs');
const fse = require('fs-extra');

exports.writefile=(req,res) =>{
    let rdata={};
    let params = req.body;
    let src=params.src;
    let content=params.content;

    if(!src){
        resultMap(res,{msg:"参数错误"});
        return;
    }
    src=decodeURI(src);

    fs.writeFile(src, content, (err) => {
    //fs.writeFile(src, '我是新写入的内容', function (err) {
        if (err) {
            rdata.data=err;
            rdata.msg='创建失败';
        }else{
            rdata.success=1;
            rdata.msg='创建成功';
        }
        resultMap(res,rdata);
    });
};

//下载图片文件，返回Base64
downloadBase64Img=(req,res,config) =>{
    var responseBody = {};
    let params = req.body;
    let src=params.src;

    let filePath = decodeURI(src);
    if(fs.existsSync(filePath)){
        var data = fs.readFileSync(filePath);
        var dataBase64 = data.toString('base64');
        responseBody ={
            code:'200',
            data:{
                filePath:filePath,
                fileData:dataBase64,
            },
            success:'1'
        };
        
    }else{
        responseBody={
            code:'400',
            msg:'没有此文件'
        };
    }
    
    resultMap(res,responseBody);
}