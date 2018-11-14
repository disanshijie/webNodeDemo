var path = require('path');
var fs = require('fs');

//https://blog.csdn.net/u013992330/article/details/78486909

/**
 *  简单的 下载文件
 *  //TODO 下载后卡住 好像是没有 结束流
 * @param {*} res
 * @param {*} params
 */
function downloadFileSimple(res,params){
    console.log("简单的 下载文件");
    var originalPath=params.originalPath;
    var way = params.way;
    var fileName = params.fileName;
    console.log(originalPath);
    console.log(fileName);
    if (way == 1) {
        //直接访问文件进行下载
        res.redirect(originalPath);
    } else if (way == 2) {
        //以文件流的形式下载文件
        var filePath = originalPath;
        var stats = fs.statSync(filePath);
        var isFile = stats.isFile();
        
        if(isFile){
            //设置响应头
            //res.set({
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
                'Content-Disposition': 'attachment; filename*=' + encodeURI(fileName),//告诉浏览器这是一个需要下载的文件
                'Content-Length': stats.size
            });
            //fs.createReadStream(filePath).pipe(res); //错误
            var readStream = fs.createReadStream(filePath);//得到文件输入流
            debugger
            readStream.on('data', (chunk) => {
                res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
            });
            readStream.on('end', () => {
                res.end();
            })
        } else {
            res.end(404);
        }
    } else {
        res.end(404);
    }
};

exports.simple = downloadFileSimple;

/* 
//第一种方式
let road="这里是要下载的文件路径（可以是中文，相对路径，绝对路径等等）";
res.download(road); //直接调用download方法即可

//第二种方式
let road="这里是要下载的文件路径（可以是中文，相对路径，绝对路径等等）";
let road = fs.createReadStream(path); //创建输入流入口
res.writeHead(200, {
  'Content-Type': 'application/force-download',
  'Content-Disposition': 'attachment; filename=name'
});
load.pipe(res);// 通过管道方式写入
 */