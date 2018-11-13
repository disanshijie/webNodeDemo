/**
 * jQuery 基础上扩展
 *  不能创建单实例，类似静态类，扩展次文件要求独立性
 */
var _extends={
    /**
     * ajax请求
     * @param {*} _url
     * @param {*} _params
     * @param {*} _success
     * @param {*} _error
     */
    ajax:function(_url,_params,_success,_error) {
        $.ajax({
            type:"post",
            async:true,   //不同步
            url:_url,
            data:_params,
            dataType:"json",
            success:function (data){
                if(data && data.success==1){
                    _success(data);
                }else{
                    //_error();
                    alert("失败");
                    console.log(data.msg);
                }
            },
            error:function(e,emessage,eobj){
                    alert(eobj+"错误啦!");
            }
        });
    },
    documnetDownLoad: function(url,params){
        var form = $("<form target='_self'></form>")
       form.attr('action',url);
       form.attr('method','post');
       var input="";
       if(params){
              for(var k in params){
               input +=' <input name="'+k+'" type="hidden" value="'+params[k]+'">';
              }
        }
       form.append(input);
       form.appendTo("body",document);
       form.css('display','none');
       form.submit();
       form.remove();
   }
}







