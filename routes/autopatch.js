
module.exports = (url,rule) => {
    //var url="http://localhost:3100/file/move/1.do";
    //var rule="/file/*/*/*.do";
    //var rexp="/(.*)?"+rule.replace("\*","(.*)?")+"(.*)?/g";
    //var rexp="(.*)?"+rule.replace("\*","(.*)?")+"(.*)?";
    var reg = new RegExp("(.*)?"+rule.replace(/\*/g,"(.*)?")+"(.*)?",'g')
    //console.log(reg);
    // var test=/(.*)?\/file\/(.*)?(.*)?/g;
    var s1=url.replace(reg,function($0,$1,$2,$3,$4){
        return [$2,$3,$4];
    });
    if(url!=s1){
       return s1.split(",");
    }
    return null;
    //console.log("结果"+s1);

}