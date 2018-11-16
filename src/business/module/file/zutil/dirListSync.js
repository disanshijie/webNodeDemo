const  fs = require('fs');
const  path = require('path');
const dirType="dir";
const fileType="file";
/**
 * 
 * @param {*} filePath 
 * @param {*} temp 
 *   return
 *  {  type: 'dir',
        filePath: 'D:\\sunjinchao\\data\\VSCode\\workSpace\\space1\\akserver\\webNodeDemo\\src\\business\\module\\file',
        parent:'',
        name:'',
        list: [ 'admin.js', 'control', 'dao', 'zutil' ],
        child:[Array] 
    }
 */
function findListDeep(filePath,temp) {
    let child=new Array();//放对象
    let list=new Array();//放仅仅此层文件名
    //定义文件夹可以携带哪些参数，
    let opts={
        type:dirType,
        filePath,
        list,
        child
    }
    //用来装当前文件夹下的所有文件，及子文件夹对象
    temp=Object.assign(temp,opts);

    let files=fs.readdirSync(filePath);
    files.forEach((val,index) => {
        let next={parent:filePath,name:val}; //给当前文件/夹建个用于保存的对象

        let fPath=path.join(filePath,val);
        let stats=fs.statSync(fPath);
        if(stats.isDirectory()) {
            // 递归读取文件夹下文件
            findListDeep(fPath,next);
        };
        // 读取文件
        if(stats.isFile()) {
            next=Object.assign(next,{ //定义文件可以携带哪些参数，
                type:fileType,
                filePath:fPath,
            });
        };
        child.push(next); 
        list.push(val);
    });
}

/**
 *  查找当前目录下文件
 * @param {*} filePath
 * @param {*} temp
 */
function findList(filePath,temp) {
    let child=new Array();//放对象
    let list=new Array();//放仅仅此层文件名
    //定义文件夹可以携带哪些参数，
    let opts={
        type:dirType,
        filePath,
        list,
        child
    }
    //用来装当前文件夹下的所有文件，及子文件夹对象
    temp=Object.assign(temp,opts);

    let files=fs.readdirSync(filePath);
    files.forEach((val,index) => {
        let next={parent:filePath,name:val}; //给当前文件/夹建个用于保存的对象

        let fPath=path.join(filePath,val);
        let stats=fs.statSync(fPath);
        if(stats.isDirectory()) {
            next=Object.assign(next,{ //定义文件夹可以携带哪些参数，
                type:dirType,
                filePath:fPath,
            });
            // 递归读取文件夹下文件
            //findListDeep(fPath,next);
        };
        // 读取文件
        if(stats.isFile()) {
            next=Object.assign(next,{ //定义文件可以携带哪些参数，
                type:fileType,
                filePath:fPath,
            });
        };
        child.push(next); 
        list.push(val);
    });
}

/**
 * 同步方式获取目录列表,递归
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findDeepSync(startPath) {
    let result={};
    findListDeep(startPath,result);
    //console.log(JSON.stringify(result))
    return result;
}
function findSync(startPath) {
    let result={};
    findList(startPath,result);
    //console.log(result)
    return result;
}

exports.findSync=findSync;
exports.findDeepSync=findDeepSync;

//test
var filePath = path.resolve('./');
let fileNames=findSync(filePath);
