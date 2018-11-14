/**
 * fs 基本文件操作
 */
const path = require('path');
const fs = require('fs');

/**
 * 创建目录
 * @param dirpath
 */
exports.mkdirSync = function (dirpath){
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


//删除所有的文件(将所有文件夹置空)
exports.emptyDir = function(dirpath){
    var self = this;
    //读取该文件夹
    var files = fs.readdirSync(dirpath);
    files.forEach(function(file){
        var filePath = dirpath + '/' + file;
        var stats = fs.statSync(filePath);
        if(stats.isDirectory()){
            self.emptyDir(filePath);
        }else{
            fs.unlinkSync(filePath);
        }
    });
};

