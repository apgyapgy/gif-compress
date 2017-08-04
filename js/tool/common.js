$(function(){
	$(".soogif-tool-btn").click(function(){
		var _src = $(this).attr("data-src"),
			_t = $(this).attr("data-t");
		var _html = '<div id="iframeShade">'
						+'<div id="iframeContainer">'
							+'<iframe id="qiframe" src="http://127.0.0.1:8020/webapps/ROOT/budong/iframe/html/index.html?src='+_src+'&t='+_t+'" width="1280" height="540" frameborder="0"></iframe>'
							+'<span class="iframeClose">&times;</span>'
						+'</div></div>';
		$(_html).appendTo($("body"));
		$("#iframeShade").css({
			"display":"block",
			"position":"fixed",
			"left":"0",
			"top":"0",
			"width":"100%",
			"height":"100%",
			"background":"rgba(0,0,0,0.3)"
		}).find("#iframeContainer").css({
			"position":"absolute",
			"left":"50%",
			"top":"50%",
			"-webkit-transform":"translate(-50%,-50%)",
			"-moz-transform":"translate(-50%,-50%)",
			"-ms-transform":"translate(-50%,-50%)",
			"transform":"translate(-50%,-50%)",
			"width":"1280px",
			"height":"540px",
			"border":"1px solid rgba(237,237,237,0.25)",
			"box-sizing":"border-box"
		}).find(".iframeClose").css({
			"position":"absolute",
			"right":"0",
			"top":"-30px",
			"width":"30px",
			"height":"30px",
			"font":'bold 20px/30px ""',
			"text-align":"center",
			"background":"#eee",
			"color":"#000",
			"cursor":"pointer"
		});
	});
	$("body").delegate("#iframeShade #iframeContainer .iframeClose","click",function(){
		$("#iframeShade").remove();
	});
});
function handleReceive(event){
  	if(event.origin != "http://127.0.0.1:8020"){
  		return;
  	}
	if(event.data){
		$("#iframeShade").remove();
		toolCallback(event.data);
		//处理数据
  		//event.source.postMessage("pok",event.origin);
	}
}
window.addEventListener("message", handleReceive, false);  
