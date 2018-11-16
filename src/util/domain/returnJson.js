module.exports=function(res,params){
    let result={};
    result.data={};
    result.code="";
    result.msg="";
    //result.error="";
    result.success=0;

    result = Object.assign({}, result, params);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.end(JSON.stringify(result));
    //return result;
}