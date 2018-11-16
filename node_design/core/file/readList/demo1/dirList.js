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
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            let child=new Array();//放对象
            let list=new Array();//放仅仅此层文件名
            //定义文件夹可以携带哪些参数，
            opts={
                type:dirType,
                filePath,
                list,
                child,
            }
            //用来装当前文件夹下的所有文件，及子文件夹对象
            temp=Object.assign(temp,opts);
           
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        let next={parent:filePath,name:filename}; //给当前文件/夹建个用于保存的对象
                        if(isFile){
                            //console.log(filedir);
　　　　　　　　　　　　　　　 // 读取文件内容
                            //var content = fs.readFileSync(filedir, 'utf-8');
                            //console.log(content);
                            //定义文件可以携带哪些参数，
                            next=Object.assign(next,{
                                type:fileType,
                                filePath:filedir,
                            });
                        }
                        if(isDir){
                            findListDeep(filedir,next);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                        child.push(next);
                        list.push(filename);
                    }
                })
            });
        }
    });
}

function findList(filePath,temp) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            let child=new Array();//放对象
            let list=new Array();//放仅仅此层文件名
            //定义文件夹可以携带哪些参数，
            opts={
                type:dirType,
                filePath,
                list,
                child,
            }
            //用来装当前文件夹下的所有文件，及子文件夹对象
            temp=Object.assign(temp,opts);
           
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        let next={parent:filePath,name:filename}; //给当前文件/夹建个用于保存的对象
                        if(isFile){
                            //console.log(filedir);
　　　　　　　　　　　　　　　 // 读取文件内容
                            //var content = fs.readFileSync(filedir, 'utf-8');
                            //console.log(content);
                            //定义文件可以携带哪些参数，
                            next=Object.assign(next,{
                                type:fileType,
                                filePath:filedir,
                            });
                        }
                        if(isDir){
                            next=Object.assign(next,{
                                type:dirType,
                                filePath:filedir,
                            });
                           // findListDeep(filedir,next);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                        child.push(next);
                        list.push(filename);
                    }
                })
            });
        }
    });
}


/**
 * 同步方式获取目录列表,递归
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
async function findDeep(startPath) {
    let result={};
    await findListDeep(startPath,result);
    console.log(JSON.stringify(result))

    // 两秒后执行以上函数
    setTimeout(function(){
        console.log(JSON.stringify(result));
    }, 2000);
    return result;
}
function find(startPath) {
    let result={};
    findList(startPath,result);
    //console.log(result)
    return result;
}

exports.find=find;
exports.findDeep=findDeep;

//test
var filePath = path.resolve('./');
findDeep(filePath);
find(filePath);
