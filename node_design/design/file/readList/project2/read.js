
var fs = require('fs');
var path = require('path');
const dir="dir";
const file="file";


var foo={n:1}; 
function fun(foo){
    var foo;
    console.log("A"+foo.n);
    foo.n=3;    //形参和实参的指向的内存空间发生了改变，值现在变为3
    foo=Object.assign(foo,{n:8}); //值现在变为8

    foo={...foo,n:7} //开辟了新的内存空间，n的值为7
    foo={n:2};  //这行很关键，开辟了新的内存空间，n的值为2
    console.log("B"+foo.n);
}; 
fun(foo);
console.log("C"+foo.n);
console.log(foo);



//解析需要遍历的文件夹
var filePath = path.resolve('../');
const datas={};
//调用文件遍历方法
fileDisplay(filePath,datas);

// 两秒后执行以上函数
setTimeout(function(){
    console.log(JSON.stringify(datas));
}, 2000);

//文件遍历方法 https://www.cnblogs.com/yangyang03/p/8306506.html
function fileDisplay(filePath,temp){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            let child=new Array();//放对象
            let list=new Array();//放仅仅此层文件名
            //定义文件夹可以携带哪些参数，
            opts={
                type:dir,
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
                        let next={filename}; //给当前文件/夹建个用于保存的对象
                        if(isFile){
                            //console.log(filedir);
　　　　　　　　　　　　　　　　　// 读取文件内容
                            var content = fs.readFileSync(filedir, 'utf-8');
                            //console.log(content);
                            //定义文件可以携带哪些参数，
                            next=Object.assign(next,{
                                type:file,
                                filePath:filedir,
                            });
                        }
                        if(isDir){
                            fileDisplay(filedir,next);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                        child.push(next); 
                        list.push(filename); 
                    }
                })
            });
        }
    });
}

/*
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var myHtml = fs.readFileSync("index.html");
var myHtml2 = iconv.decode(myHtml, 'gbk');
console.log(myHtml2);
 */
