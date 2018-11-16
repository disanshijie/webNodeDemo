var fs = require('fs');
var path = require('path');

const dirType="dir";
const fileType="file";

//var filePath = path.resolve('./read.js');
var filePath = path.resolve('../../');
var datas={};

async function test() {
    await listDir(filePath,{});
    console.log(datas);
}
test();


function hello(dir) {
    let b="3";
    if(b == "e"){
        var a="fd";
        let c="fd";
        console.log(true);
    }
    console.log(b);
    console.log(a);
   // console.log(c);
}
//hello();

function readdirPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, list) => {
            if (err) {
                reject(err);
            }
            resolve(list);
        });
    });
}

function statPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}
function listDir(dir) {
    return statPromisify(dir).then(stats => {
        if (stats.isDirectory()) {
            return readdirPromisify(dir).then(list => 
                Promise.all(list.map(item => 
                    listDir(path.resolve(dir, item))
                ))
            ).then((subtree) =>{
                console.log(2);
                let child={
                    type:dirType,
                    filePath:dir,
                    child:subtree
                }
                console.log(child);
            });
        } else {
            let opts={
                type:fileType,
                filePath:dir,
                //child
            }
            return opts;
        }
    });
}
