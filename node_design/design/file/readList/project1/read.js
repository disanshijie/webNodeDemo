const  fs = require('fs');
const  path = require('path');
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result=[];
    function finder(filePath) {
        let files=fs.readdirSync(filePath);
        files.forEach((val,index) => {
            let fPath=path.join(filePath,val);
            let stats=fs.statSync(fPath);
            if(stats.isDirectory()) {
                result.push(fPath);
                // 递归读取文件夹下文件
                // finder(fPath)
            };
            // 读取文件
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    console.log(result)
    return result;
}
let fileNames=findSync('../');
console.log(fileNames);