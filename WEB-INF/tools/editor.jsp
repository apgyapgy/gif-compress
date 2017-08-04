<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" >
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<c:set value="${ fn:split(queryVO.tags, '#') }" var="tags" />
    <title>GIF制作工具_GIF压缩工具_GIF裁剪工具_视频转GIF工具_SOOGIF</title>
    <meta name="description" content="SOOGIF，GIF动图中文搜索引擎，最好的GIF动图素材和GIF在线制作工具，提供丰富的 GIF素材，动图素材，动态图片下载，表情包下载，斗图必备表情包，微信公众号、微博编辑必备 GIF素材" />
	<meta name="keywords" content="GIF动图制作工具,GIF动图压缩工具,GIF动图水印工具,GIF动图裁剪工具,视频转GIF工具" />
	<link rel="stylesheet" href="${basePath}/css/compress.css">
	<link rel="stylesheet" href="${basePath}/css/nav.css">
	<link rel="stylesheet" href="/css/tool/toolHeader.css"/>
	<script type='text/javascript'>
	    // 友盟
	    // ydlx
	    // 2016-10-13
	    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://": " http://");
	    document.write(unescape("%3Cspan  style='display:none' id='cnzz_stat_icon_1260067336'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260067336' type='text/javascript'%3E%3C/script%3E"));
	    // 百度统计
	  	// ydlx
	  	// 2016-9-28
	  	var _hmt = _hmt || [];
	  	(function() {
	      	var hm = document.createElement("script");
	      	hm.src = "//hm.baidu.com/hm.js?e5b1850e61d000f8b0ad7cd0add5b91c";
	      	var s = document.getElementsByTagName("script")[0]; 
	      	s.parentNode.insertBefore(hm, s);
	  	})();
		//声明_czc对象:
		var _czc = _czc || [];
		//绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
		_czc.push(["_setAccount", "1260067336"]);
		 
		// growing io
		// ydlx
		// 2016-8-9
	    var _vds = _vds || [];
	    window._vds = _vds;
	    (function(){
	        _vds.push(['setAccountId', 'beb66a1ac816845f']);
	        (function() {
	          	var vds = document.createElement('script');
	         	vds.type='text/javascript';
	         	vds.async = true;
	         	vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
	         	var s = document.getElementsByTagName('script')[0];
	         	s.parentNode.insertBefore(vds, s);
	      	})();
	    })();
	</script>
</head>
<body class="back">
	<!-- 引用导航组件 -->
	<jsp:include page="../nav_New.jsp" />
	<!--导航 开始 -->
	<div class="nav-wrap">
	    <div class="toolNav">
			<a href="/compress" class="toolCompress"><i></i>GIF压缩</a>
			<a href="/crop" class="toolCut"><i></i>GIF裁剪</a>
			<a href="/editor" class="toolBeauty active"><i></i>GIF编辑</a>
			<a href="/video" class="toolVideo"><i></i>视频转GIF</a>
	    </div> 
    </div>
	<!--导航 结束-->
    <!-- iframe调用的页面 -->
    <iframe src="http://106.75.16.165:8080/index.jsp" frameborder="0" width="100%" height="2300" id="iframeId" scrolling="no"></iframe>
	<script>
		var _url = window.location.search;
		if(_url){
			if(_url.indexOf("?url=") != -1){
				document.getElementById("iframeId").src = "http://106.75.16.165:8080/index.jsp"+_url;
			}
		}
    </script>
    <!-- js引用 -->
	<script type="text/javascript" src="${basePath}/js/jquery.min.js"></script>
	<script src="${basePath}/js/public.js"></script>
	<script src="${basePath}/js/count/count-public.js"></script>
	<script src="${basePath}/js/count/count-tool.js"></script>
	<script type="text/javascript">
		var _editFlag = false;
		function handleReceive(event){
			if(event.origin == "http://106.75.16.165:8080"){
				//处理数据
		  		var data = event.data;
		  		if(data == "edit"){
		  			_editFlag = true;	
		  		}else{
		  			var ifr_el = document.getElementById("iframeId");
					ifr_el.style.height = data+"px";
		  		}
			}
		}
		window.addEventListener("message", handleReceive, false);
		$(function(){
			$(".toolNav a").click(function(e){
				e.preventDefault();
				if(_editFlag){
					var _confirm = window.confirm("您确定要离开本页面吗？离开后本页面的内容将不会被保存哟。");
					if(_confirm){
						window.parent.location.href = $(this).attr("href");
					}
				}else{
					window.parent.location.href = $(this).attr("href");
				}
			})
		});
	</script>
</body>
</html>