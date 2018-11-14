var express = require('express');//引入express模块
var app = express();//创建应用
var uploadClient = require('./upload');
//定义public路径
var pub = __dirname + '/';
app.use(express.static(pub));//设置静态目录为pubic
//npm install multer --save
var multer  = require('multer');
var storage = multer.diskStorage({
  //设置上传后文件路径，"d:/myapp/public/uploads文件夹"会自动创建。
  destination: function (req, file, cb) {
    cb(null, './test/public/uploads')
  }, 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({ storage: storage })
 
//访问路径
//http://localhost
//返回提交文件页面。
app.get('/', function(req, res){  
  res.sendFile('index.html', { root: __dirname });  
});  
//单文件上传获取信息
app.post('/api/remote/uploadfile',upload.single('inputFile'),function(req,res,next){
  var file=req.file;
  console.log("original file name is "+file.originalname);//original file name is 20170615_211619.jpg
  console.log("file name is " + file.filename);//file name is myfile-1511013577361.jpg
  res.send({ret_code: '0'});//这行代码必须要有，否则Browser会处于wait状态。
})

app.use(function(err, req, res, next) {
  res.send(err.stack);
});
 
app.listen(3100);
console.log('Express started on port 80');

