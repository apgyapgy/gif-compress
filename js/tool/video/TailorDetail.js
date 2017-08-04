$(function(){
	$("#head").load("./header.html");
	//分享移到上面改变图片
	$(".otherShare a").hover(function(){
		var _index = $(this).index();//获取当前是第几个 
		$(this).find("img").attr()
	},function(){});
	
	 // 下载图片
	/*	$(document).on("click", ".downloadImg", function() {
			// console.log('1111111')
			var type = $(this).attr('downloadType');
			var id = $(".central").attr('imgId');
			location.href="/download/"+type+"/"+id;
			_czc.push(['_trackEvent', 'downloadImg', '点击下载', '点击下载','1','downloadImg']);
		});
	 * */
});
