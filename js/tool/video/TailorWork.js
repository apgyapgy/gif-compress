$(function(){
//	$("#head").load("./header.html");//加载顶部  	加上会出错
	var videoDuration,_isPlay=false,durationDragable=false;//videoDuration表示视频时长 
	var _data={
		lengthOfMsecond:0,//每100毫秒长度
		beginTime:0,//设置视频默认的开始时间为0秒
		durationTime:10//设置视频默认的播放时间为10秒
	};
	$.jPlayer.timeFormat.showHour = true;
	//鼠标在视频区域时让向上滚动一点，可以看到生成gif按钮
	$(".video").hover(function(){
		$("html,body").animate({
			"scrollTop":"70px"
		},100);
	},function(){});
	//点击复制按钮，复制input框中的内容到剪贴板
    var clip = new ZeroClipboard( document.getElementById("d_clip_button"), {
        moviePath: "ZeroClipboard.swf"
    });
	//点击删除按钮删除图片
	$("#photos").delegate("li .producedImg .addDelete","click",function(){
		$(this).parents("li").remove();
		var str = '<li>'
					+'<div class="producedImg">'
						+'<span class="addDelete"></span>'
					+'</div>'
						+'<span class="download"></span>'
					+'</li>';
		$("#photos").append($(str));
	});
	//头部js
	headJs();
	//播放视频 
	var vUrl = "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer";
	initVideo($("#jquery_jplayer_1"),vUrl,null);
	//为视频添加timeupdate事件
	$("#jquery_jplayer_1").bind($.jPlayer.event.timeupdate,function(event) {
		if(videoDuration==undefined||videoDuration==0){//设置videoDuration的值为视频总时长
			videoDuration = parseInt(event.jPlayer.status.duration);
			if(videoDuration>0){
				_isPlay = true;
			}
		}
		if(_isPlay==true){//如果当前已经播放了，表示已获取播放时长 
			//progress添加点击事件
			progressClick($(".progress"),videoDuration,_data);
			//添加拖拽事件
			progressDrag($("#dragTop"),videoDuration,_data);
			//持续时长拖拽事件
			durationDrag($("#progressDurationLength"),videoDuration,_data);
			//开始时间点击事件
			beginTimeClickEvent($(".beginTime"),videoDuration,_data);
			_isPlay = false;
		}
		//如果当前从开始时间到结束时间内容已播放完，则从开始时间开始播放
		if(event.jPlayer.status.currentTime+0.25>=_data.beginTime+(_data.durationTime-0)){
			$("#jquery_jplayer_1").jPlayer('play',_data.beginTime);
		}
		//更新播放进度
		var _playPro = ((event.jPlayer.status.currentTime - _data.beginTime)/_data.durationTime).toFixed(4)-0;
		if(_playPro>1){
			_playPro = 0;
		}
		var _dragDurationLength = $(".dragDuration").width()-6;
		$("#progressDurationRuning").animate({"left":_playPro*_dragDurationLength+'px'},250);
		//console.log(event.jPlayer.status.currentTime);
	});
	//为视频添加播放结束事件,在开始时间+持续时间大于视频总时间的时候让它从开始时间开始播放
	$("#jquery_jplayer_1").bind($.jPlayer.event.ended,function(event) {
		$("#jquery_jplayer_1").jPlayer('play',_data.beginTime);
	});
	$("#jquery_jplayer_1").bind($.jPlayer.event.pause,function(event) {
		//$("#progressDurationRuning").css({"left":0+'px'});
	});
	//点击返回按钮 显示提示框
	$("#back").click(function(){
		$("#panel").addClass("active");
		$("#backTip").addClass("active");
	});
	//点击提示框中的关闭按钮,再想想按钮 ，隐藏提示框
	$("#close,#toThink").click(function(){
		$("#panel").removeClass("active");
		$("#backTip").removeClass("active");
	});
	//点击提示框中的确定返回 跳转到前一个页面
	$("#sureBack").click(function(){
		location.href = "./TailorMain.html";
	});
	//回击加号，返回顶部，继续截取
	$("#photos li.next").click(function(){
		$("html,body").animate({
			"scrollTop":0
		},400);
	});
	//持续时间点击事件
	durationTimeClickEvent($(".continueTime"),_data);
	//点击生成gif按钮
	$(".workCreate").delegate("#produce","click",function(){
		$("#panel").addClass("active");
		$(".workCreate").hide().siblings(".workCreateing").show();
	});
});
//将字符串时间转换为数字时间
function convertStimeToNtime(str){
	var arrs = str.split(":");
	var total = 0;
	var i = arrs.length-1,j=0;
	while(i>=0){
		total+=arrs[i]*Math.pow(60,j);
		i--;
		j++;
	}
	return total;
}
//开始时间点击事件
function beginTimeClickEvent($obj,videoDuration,data){
	$obj.delegate("#duration","click",function(e){
		e.stopPropagation();
		var str = '<input type="text" id="inputDuration" value="'+$.jPlayer.convertTime(data.beginTime)+'" />';
		$(str).appendTo($(this).parent());
		$(this).remove();
	});
	$obj.delegate("#inputDuration","mouseleave",function(e){
		e.stopPropagation();
		var _str = $(this).val();
		var _reg = /^\d{1,2}(:\d\d){1,2}$/g;
		_str = $.trim(_str);
		if(!_reg.test(_str)){//如果输入不符合规范,开始时间不变
			_str = $.jPlayer.convertTime(data.beginTime);
		}else if(convertStimeToNtime(_str)>videoDuration){//如果开始时间大于总时长 ，值不变
			_str = $.jPlayer.convertTime(data.beginTime);
		} 
		var str = '<span id="duration">'+_str+'</span>';
		$(str).appendTo($(this).parent());
		$(this).remove();
		data.beginTime = convertStimeToNtime(_str);
		//改变开始时间的位置
		var _progressWidth = $(".progress").width();
		var _eveSecondWidth = (_progressWidth/videoDuration).toFixed(2)-0;
		$("#jquery_jplayer_1").jPlayer('pause',data.beginTime);
		$("#dragContainer").stop().animate({
			left:data.beginTime*_eveSecondWidth+'px'
		},100,function(){
			$("#jquery_jplayer_1").jPlayer('play');
		});
	});
	//阻止事件冒泡们
	$obj.delegate("#inputDuration","focus",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duration","mousedown",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duration","mouseup",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duration","mousemove",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duration","mouseleave",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#inputDuration","click",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#inputDuration","mouseup",function(e){
		e.stopPropagation();
	});
}
//持续时间点击事件
function durationTimeClickEvent($obj,data){
	$obj.delegate("b","click",function(e){
		e.stopPropagation();
		var _val = $(this).html().replace("s","");
		var str = '<input type="text" id="duraTime" value="'+_val+'"/>';
		$(str).appendTo($(this).parent());
		$(this).remove();
	});
	$obj.delegate("#duraTime","mouseleave",function(e){
		e.stopPropagation();
		var _str = $(this).val();
		_str = parseFloat(_str);
		if(!_str||_str<0.1||_str>20){
			_str = data.durationTime;
		}else{
			_str = _str.toFixed(2);
		}
		var str = '<b>'+_str+'s</b>';
		$(str).appendTo($(this).parent());
		$(this).remove();
		data.durationTime = _str;
		//改变持续时长的长度
		$(".dragDuration").stop().animate({
			width:_str*10+6+'px'
		},100);
	});
	//阻止事件冒泡们
	$obj.delegate("#duraTime","focus",function(e){
		e.stopPropagation();
	});
	$obj.delegate("b","mousedown",function(e){
		e.stopPropagation();
	});
	$obj.delegate("b","mouseup",function(e){
		e.stopPropagation();
	});
	$obj.delegate("b","mousemove",function(e){
		e.stopPropagation();
	});
	$obj.delegate("b","mouseleave",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duraTime","click",function(e){
		e.stopPropagation();
	});
	$obj.delegate("#duraTime","mouseup",function(e){
		e.stopPropagation();
	});
}
//progress栏点击事件
function progressClick($obj,videoDuration,data){
	var _left = $obj.offset().left;//获取当前progress左侧的距离 
	var _progressWidth = $(".progress").width();//获取进度条宽度 
	var _presentWidth = (_progressWidth / videoDuration).toFixed(2);//获取多长距离表示1秒
	var _endWidth = _left+_progressWidth;
	var _playTime;//播放时间
	$obj.click(function(e){
		var _cX = e.clientX;//获取当前点击x轴位置
		var _toLeft = _cX - _left; //当前点击位置减去progress离左边位置，即要移动的距离
		if(_cX<_left||_cX>_endWidth){
			return;
		}else{
			//根据百分比获取点击地方表示的播放时间
			_playTime = Math.floor(_toLeft/_presentWidth);
			$("#dragContainer").animate({
				"left":_toLeft+'px'
			},100);
			playFromTheTime(_toLeft,videoDuration,data);
			$("#duration").html($.jPlayer.convertTime(data.beginTime));
		}
	});
}
//设置视频从哪个时间开始播放
function playFromTheTime(_left,videoDuration,data){
	var _progressOffsetLeft = $(".progress").offset().left;//获取进度条与左边的距离
	var _progressWidth = $(".progress").width()-6;//获取进度条宽度 
	var _presentWidth = (_progressWidth / videoDuration).toFixed(2);//获取多长距离表示1秒
	var _playTime = Math.floor(_left/_presentWidth);
	_playTime = (!_playTime||_playTime<0)?0:_playTime;
	//$("#jquery_jplayer_1").jPlayer( "playHeadTime",_playTime*1000 )
	$("#jquery_jplayer_1").jPlayer('play',_playTime);
	data.beginTime = _playTime;
}
//持续时长拖拽事件
function durationDrag($obj,videoDuration,data){
	var durationDragable = false;
	//阻止默认事件
	$("#dragDurationContainer").click(function(e){
		e.stopPropagation();//阻止事件冒泡
	});
	$obj.click(function(e){
		e.stopPropagation();
	});
	$obj.mousedown(function(e){
		e.stopPropagation();
		var $duration = $("#dragDurationContainer");
        //获取父元素离左边的距离
        var _durationOffsetLeft = $duration.offset().left;
        //获取父元素的宽度 
        var _durationWidth = $duration.width();
        durationDragable = true;
        //拖动持续时长，让视频停止播放
        $("#jquery_jplayer_1").jPlayer('pause',data.beginTime);
        $(".video").mousemove(function(e){
        	e.stopPropagation();
        	if(!durationDragable){
        		return;
        	}
        	var _clientMoveX = e.clientX;//获取移动的clientX值
			if(_clientMoveX<_durationOffsetLeft+2||_clientMoveX>_durationOffsetLeft+_durationWidth-6){
				return;
			}else{
				$(".dragDuration").css("width",_clientMoveX-_durationOffsetLeft+6+'px');
				var _durationTime = ((_clientMoveX-_durationOffsetLeft)/10).toFixed(2);
				_durationTime = _durationTime>20?20:_durationTime;
				data.durationTime = _durationTime;
				$(".dragDuration .continueTime b").html(data.durationTime+'s');
			}
      	});
    });
    $("#dragDurationContainer").mouseleave(function(e){
    	e.stopPropagation();
    	if(durationDragable==true){
    		durationDragable=false;
			var _clientX = e.clientX;
			var _durationContainerOffsetLeft = $("#dragDurationContainer").offset().left;
			console.log($(),_clientX,_durationContainerOffsetLeft);
			$(".dragDuration").animate({
				"width":_clientX - _durationContainerOffsetLeft+6+'px'
			},100);
			var _durationTime = ((_clientX - _durationContainerOffsetLeft)/10).toFixed(2);
			if(_durationTime>20){
				_durationTime = 20;
			}
			data.durationTime = _durationTime;
			$(".dragDuration .continueTime b").html(data.durationTime+'s');
			
    	}
	});
    $("#dragDurationContainer").mouseup(function(e){
    	e.stopPropagation();
    	durationDragable=false;
		var _clientX = e.clientX;
		var _durationContainerOffsetLeft = $("#dragDurationContainer").offset().left;
		var _durationTime = ((_clientX - _durationContainerOffsetLeft)/10).toFixed(2);
		if(_durationTime>20){
			_durationTime = 20;
		}
		data.durationTime = _durationTime;
		$(".dragDuration .continueTime b").html(data.durationTime+'s');
		$("#jquery_jplayer_1").jPlayer('play',data.beginTime);
		$(".dragDuration").animate({
			"width":_clientX - _durationContainerOffsetLeft+6+'px'
		},100);
	});
}
//播放位置拖拽事件
function progressDrag($obj,videoDuration,data) {
	var progressDragable=false;
	$obj.click(function(e){
		e.stopPropagation();//阻止父元素的默认事件
	});
   	$obj.mousedown(function(e){
   		e.stopPropagation();
   		//获progress离左边的距离
        var _pOLeft = $(".progress").offset().left;
        var _progressWidth = $(".progress").width()-6;//获取进度条宽度 
        var _progressOffsetLeft = $(".progress").offset().left;//获取进度条与左边的距离
        var _presentWidth = (_progressWidth / videoDuration).toFixed(2);//获取多长距离表示1秒
        progressDragable = true;
        $(".video").mousemove(function(e){
        	if (!progressDragable){
        		return;
        	}
        	var _x = e.clientX;
        	if(_x < _pOLeft+3||_x>_pOLeft+_progressWidth){
        		return;
        	}else{
	        	_mouse_left = _x - _pOLeft;
	        	$("#dragContainer").stop(false,true).animate({"left":_mouse_left +'px'},0);
	        	//实现拖拽同时显示开始时间
				var _beginTime = Math.floor(_mouse_left/_presentWidth);//.toFixed(1);
				//data.beginTime = (!_beginTime||_beginTime<0)?0:_beginTime;
				$("#duration").html($.jPlayer.convertTime(_beginTime));
        	}
      	});
    });
    $(".video").mouseup(function(e){
    	e.stopPropagation();//阻止事件冒泡
    	if(progressDragable==true){
    		var _cX = e.clientX;
	    	progressDragable = false;
	    	var _left =_cX - $(".progress").offset().left;//获取当前progress左侧的距离 
			playFromTheTime(_left,videoDuration,data);//设置播放时间
			$("#duration").html($.jPlayer.convertTime(data.beginTime));
    	}
    });
}
//初始化视频
function initVideo($obj,url,firstPhoto){
	var fPhoto = firstPhoto||"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png";
	var videoUrl = [url+".m4v",url+".ogv",url+'.webm'];
	$obj.jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title: "Big Buck Bunny",
				m4v: videoUrl[0],
				ogv: videoUrl[1],
				webmv: videoUrl[2],
				poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
			}).jPlayer("play");
		},
		swfPath: "../../js/swf",
		supplied: "webmv, ogv, m4v",//定义提供给jPlayer的格式。顺序表示优先级，左边的格式优先级最高，右边的优先级较低。
		size: {//设置restored screen 模式下的尺寸。
			width: "624px",
			height: "340px"
		},
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,//平滑过渡播放条
		keyEnabled: true,
		volume:0,
		timeFormat:{
			showHour :true
		},
		loop:true,
		remainingDuration: true,//为true时，剩余时间展示在GUI元素duration中。
		toggleDuration: true//为true时，点击GUI元素duration触发jPlayer({remainingDuration}) 选项。
	});
}
/*head js 头部js文件*/
function headJs(){
	$(document).scroll(function(){
		var top = $(window).scrollTop();
		if(top > 0){
			$('.nav .box').css('border-bottom','1px solid rgba(237,237,237,0.25)');
		}else{
			$('.nav .box').css('border-bottom','2px solid rgba(237,237,237,0.25)');
		}
	});
	// 搜索点击
    $('.in').on('keydown',function(event){
		var button_search = '';
		button_search = $(this).val();
		button_search = $.trim(button_search);
		if (event.keyCode == "13" && button_search != ''){
			var query_word ="search/1/" + button_search;
			location.pathname = query_word;
		}
	});
	$('.search-1').on('click',function(){
		var icon_search = '';
		icon_search =$.trim($('.in').val());
		if (icon_search != ''){
			location.pathname ="search/1/" + $.trim($('.in').val());
		}
	});
	// 热搜里面的内容
	$.get('/hotword', function(result) {
		if(result.code!=0){
			return;
		}
		var hotwordhtml = "";
		$.each(result.data.list, function(n,v){
			hotwordhtml+='<a href="/search/'+v.query+'" class="name-1">'+v.query+'</a>';
		});
		$("#_focus").append(hotwordhtml);
		$('a').css('text-decoration','none');
	});
	// 获取焦点显示下拉框
	$('.in').focus(function(){
		$('.focus').css('display','block')
	})
	$('._ml').click(function(){
		$('.focus').css('display','none')
	})
	$('.in-2').focus(function(){
		$('.focus').css('display','none')
	});
}
