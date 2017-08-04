$(function(){
	//加载顶部
	$("#head").load("./header.html");
	$("#create").click(function(){
		//定义判断地址的正则
		var regUrl = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
//		https://youtu.be/YbWaAcGCRdA
//		https://www.youtube.com/watch?v=8Mmla_Ofc98
		//如果地址栏为空则不判断
		if(!$("#videoUrl").val()){ 
			return;
		}
		//地址栏获得焦点事件
		$("#videoUrl").focus(function(){
			$("#tailorCreate").removeClass().addClass("create");
		});
		var _videoUrl = $.trim($("#videoUrl").val());
		$("#tailorCreate").removeClass().addClass("running");
		//判断地址是否正确
		setTimeout(function(){
			if(regUrl.test(_videoUrl)){
				$("#tailorCreate").removeClass().addClass("correct");
			}else{
				$("#tailorCreate").removeClass().addClass("error");
			}
		},2000);
		
		
	});
});
