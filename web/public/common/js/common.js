


var _common={
    /**
     * 下载文件
     * @param {*} url
     * @param {*} params
     */
    documnetDownLoad:function (url,params){
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
        //删除表单
    form.remove();
    },
    /**
     * 弹出框
     */
    Jalert:function(tips){
        $('body').append('<div class="Jalert">'+tips+'</div>');
        setTimeout(function(){
            var $alert = $('body').find('.Jalert');
            $alert.remove();
        },2000);
    },
    Aalert:function (tips){
        $('.modal-content').append('<div class="Jalert">'+tips+'</div>');
        setTimeout(function(){
            var $alert = $('body').find('.Jalert');
            $alert.remove();
        },2000);
    },
    openTips:function (tips){
        $('body').append('<div class="cover" id="openTips"><div class="Jalert">'+tips+'</div></div>');
    },
    
    removeTips:function (){
        $('#openTips').remove();
    },
    //提交等待动画
    commitWait:function () {
        $('.modal-content').append("<div class='tijiao'>提交中···</div>");			
    },
    commitRemove:function () {
    $(".tijiao").remove();		
    },
    commitBodyWait:function (){
    $('body').append("<div class='tijiao'>提交中···</div>");	
    },
    //加载等待动画
    loadWait:function (){
    $('body').append("<div class='tijiao'>加载中···</div>");	
    },
    loadModalWait:function () {
    $('.modal-content').append("<div class='tijiao'>加载中···</div>");			
    },

}


// document.getElementsByTagName("html")[0].style.fontSize=(Math.min(document.documentElement.getBoundingClientRect().width,750))/10+"px";

// window.addEventListener('resize',function(){
// 	document.getElementsByTagName("html")[0].style.fontSize=(Math.min(document.documentElement.getBoundingClientRect().width,750))/10+"px";
// },false);

window.addEventListener('load',function(){
	//首页底菜单
	$('.home-menu li.on i').css({'margin-top':'-4px','margin-bottom':'4px'});

	//半透明底菜单
	$('.modal-bg').on('touchmove',function(){
      $(this).addClass('menu-collapse');
      $('.home-menu-assistive').addClass('show');
   });

   $('.home-menu-assistive').on('click',function(){
      $(this).removeClass('show');
      $('.modal-bg').removeClass('menu-collapse');
   });

   /*点击回到顶部*/
   $(window).scroll(function(){
		var top = $('body')[0].scrollTop || document.documentElement.scrollTop;
		var h = $(this).height();
		if(top>h){
			$('#toTop').fadeIn();
		}else{
			$('#toTop').fadeOut();
		}
	});

    $('#toTop').click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });
},false);