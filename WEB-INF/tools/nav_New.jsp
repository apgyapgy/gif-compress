<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!-- <c:set var="pageContext.request.contextPath" value="http://www.soogif.com" /> -->
<html>

  <!--********导航组件****** -->

  <div class="nav">
    <div class="box">
      <div class="bo">
          <!-- 下面的a链接跳转到首页 -->
          <a href="${basePath}/" class="left">
            <img src="${basePath}/images/img/img-home-page/logo.png">
          </a>
        <div class="center">
          <!-- 下面的a链接跳转到推荐 -->
          <a href="${basePath}/" class="a-1">
            <span class="recommend">推 &nbsp;荐</span>
          </a>
          <!-- 下面的a链接跳转到频道 -->
          <a href="${basePath}/sort/124" class="a-2">
            <span class="channels">频 &nbsp;道</span>
          </a>
          <!-- 下面是链接 -->
          <!--<a href="${basePath}/compress" class="a-3">
            <span class="_do">工具合集</span>
          </a>-->
          <span class="_do wrap">
	          <a href="${basePath}/compress" class="a-3">GIF工具</a>
	          <div class="tools">
	          	<a href="${basePath}/compress">GIF压缩</a>
	          	<a href="${basePath}/crop">GIF裁剪</a>
	          	<a href="${basePath}/editor">GIF编辑</a>
              <a href="${basePath}/video">视频转GIF</a>
	          </div>
          </span>
          <a href="http://open.soogif.com/" class="a-4">
          	<span class="_do">动图API</span>
          	<div class="_fl"></div>
          </a>
        </div>
        <div class="right">
          <div class="search-wrap">
            <input type="" name="" class="in" placeholder="输入关键词点击查找">
          </div>
          <a href="javascript:void(0);" class="search-1"></a>
          <div class="focus" id="_focus">
          	<div class="_hp">
          		 <span class="hot-search">热搜排行</span>
          	</div>
          </div>
        </div>
        <div class="_ml"></div>
      </div>
    </div>
  </div>


</html>