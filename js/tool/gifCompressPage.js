var ACTION_UPLOAD     = location.origin+"/zip/fileUpload"; //"http://demo.soogif.com/zip/fileUpload";
var ACTION_DOWLOADZIP = location.origin+"/zip/downloadZipFile"; //"http://demo.soogif.com/zip/downloadZipFile";
var ACTION_COUNT      = location.origin+"/zip/countZipFile"; //"http://demo.soogif.com/zip/countZipFile";

// visual flag
var isSubmitRegionSmall = false;
var isSharePanelShown   = false;
var isCustomSetted		= false;
var customSelectBtn     = "";
/***********************************/
var isFirstQuery = true;
var preCount = 0;
// Compress Param
var compressType = "S_2M";	//S_200K S_500K S_1M S_2M S_3M S_4M
// Item List
var itemCount = 0;
// Item Processing
var currentItem = null;		// current submit item
var submittingList = new Array();
var sucessCount = 0;
var sucessItemList = {};
// height padding
var paddingHeight = 0;
// Share
var jiathis_config = {};
$(document).ready(function(){
	SetAnimation();
	//InitBgHeight();
//	initCount();
	querySuccessCount();
	setInterval(querySuccessCount, 30000);
	
});
/************************************************
 * 初始化动图压缩量
 * */
function initCount(){
	$('.dataStatistics').dataStatistics({min:0,max:0,time:1000,len:9});
}
/******************************************
 * 
 * Utils
 * 
 ******************************************/
// 将字节数转换为中文文件大小
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024, // or 1024
//      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        sizes = ['B', 'K', 'M', 'G'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + '' + sizes[i];
}
/******************************************
 * 
 * Tab Function
 * 
 ******************************************/
// 点击 微信tab事件
function onClickTabWeixin() {
	compressType = "S_2M";
    SetWechatTabHighlight(true);
    SetMotionTabHighlight(false);
    SetCustomTabHighlight(false);
};
// 点击表情tab事件
function onClickTabMotion() {
	compressType = "S_1M";
    SetWechatTabHighlight(false);
    SetMotionTabHighlight(true);
    SetCustomTabHighlight(false);
};
// 点击自定义tab事件
function onClickTabCustom() {
    SetWechatTabHighlight(false);
    SetMotionTabHighlight(false);
    SetCustomTabHighlight(true); 
    ShowCustomSetting();
};

// 设置微信tab的外观
function SetWechatTabHighlight(isHighlight) {
    if (isHighlight) {
        $("#tabWechat").addClass("active");
    } else {
        $("#tabWechat").removeClass("active");
    }
};

// 设置表情tab的外观
function SetMotionTabHighlight(isHighlight) {
    if (isHighlight) {
        $("#tabMotion").addClass("active");
    } else {
        $("#tabMotion").removeClass("active");
    }
};

// 设置自定义tab的外观
function SetCustomTabHighlight(isHighlight) {
    if (isHighlight) {
        $("#tabCustom").addClass("active");
    } else {
        $("#tabCustom").removeClass("active");
    }
}

// 选中框的动画效果
function MoveTabHint(position) {
     $("#selectFrame").animate({left:position+"px"}, 200);
};



/******************************************
 * 
 * Custom Panel
 * 
 ******************************************/
// 弹出自定义popup
function ShowCustomSetting() {
	$("#block_overlay").css("display", "block");
	$("#PopPageCustom").css("display", "block");
	$("#block_overlay").css("height", document.body.scrollHeight + "px");
	$("#PaddingSpaceCustom").css("height", $(document).scrollTop() + 125 + "px");
} 

// 在自定义面板中进行选择
function customSelect(buttonID) {
    var buttons = ["Custom200KBtn", "Custom500KBtn", "Custom3MBtn", "Custom5MBtn"];
    for (btnIndex in buttons) {
    	var btn = buttons[btnIndex];
    	if (btn == buttonID) {
    		$("#" + btn).addClass("Select");
    		$("#" + btn + " .PopPageCustomButtonLabel").addClass("Select");
    		customSelectBtn = btn;
    	} else {
    		$("#" + btn).removeClass("Select");
    		$("#" + btn + " .PopPageCustomButtonLabel").removeClass("Select");
    	}
    }
    
    if (!isCustomSetted) {
    	isCustomSetted = true;
    	$("#PopCustomConfirmBtn").css("background", "#12b4df");
    }
}

// 点击自定义面板确认按钮
function confirmCustom() {
	if (!isCustomSetted)
		return;
	
	var setting = { 
		Custom200KBtn : { label : '&lt;200K', param : 'S_200K', pos1 : '63px', pos2 : '86px'},
		Custom500KBtn : { label : '&lt;500K', param : 'S_500K', pos1 : '63px', pos2 : '86px'},
		Custom3MBtn   : { label : '&lt;3M',   param : 'S_3M',   pos1 : '75px', pos2 : '96px'},
		Custom5MBtn   : { label : '&lt;5M',   param : 'S_5M',   pos1 : '75px', pos2 : '96px'}
	};
	
	compressType = setting[customSelectBtn].param;
	$("#tabCustomSubLabel").html("改变参数");
	$("#tabCustomLabel").html(setting[customSelectBtn].label);
	closeCustomPanel();
}

// 点击自定义面板关闭按钮
function closeCustomPanel() {
	$("#block_overlay").css("display", "none");
	$("#PopPageCustom").css("display", "none");
	
	if (!isCustomSetted) {
		if (compressType == "S_1M")
			onClickTabMotion();
		else
			onClickTabWeixin();
	}
	
} 



/******************************************
 * 
 * Select Image Drag Effect Animation
 * 
 ******************************************/
// 初始化图片拖拽框的拖拽效果
function SetAnimation() {
    var selectImgBtn = document.getElementById("selectImgBtn");
    selectImgBtn.addEventListener("dragenter", function (e) { StopDefaultDropEvent(e); }, false);
    selectImgBtn.addEventListener("dragleave", function (e) { }, false);
    selectImgBtn.addEventListener("dragover",  function (e) { StopDefaultDropEvent(e); }, false);
    selectImgBtn.addEventListener("drop",      function (e) {
        StopDefaultDropEvent(e);
        SmallerSubmitRegion();
        SubmitFiles(e.dataTransfer.files);
    }, false);
}

// 防止拖拽事件进一步分发
function StopDefaultDropEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}

// 点击图片拖拽框，选择单个文件
function SelectFile() {
	var inputFiles = document.getElementById('SelectFiles');
    SmallerSubmitRegion();
	SubmitFiles(inputFiles.files);
	inputFiles.value="";	// 置空，以便触发 valueChange
}

// 图片拖拽框的动画效果
function SmallerSubmitRegion() {
	if (isSubmitRegionSmall)
		return;
	isSubmitRegionSmall = true;
	document.getElementById("selectImgBtn").style.animationName="smallerSubmitRegionAnim";
	document.getElementById("CompressListContainer").style.animationName="ListUp";
	document.getElementById("CompressListContainer").style.display="block";
	
	$("#autoPaddingHelper").css("height", "0px");
}

// 选中一批文件，提交文件到服务器
function SubmitFiles(files) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		if (file.type == "image/gif")
			AddFileToList(file);
		else
			AddIllegeItemToList(file);
	} 
//	var _src = $("#iframe").attr("src").replace(/#\d+/g,"");
//	$("#iframe").attr("src",_src+"#"+$(document).height());
	var _height = $(document).height();
	if($(".downloadWrap").css("display") == 'none'){
		_height += 120;
	}
	parent.window.postMessage("height:"+_height,"*");
	parent.window.postMessage("edit:edit","*");
}



/******************************************
 * 
 * File Process List
 * 
 ******************************************/
// 新建一个 file process list，并将文件放入处理列表
function AddFileToList(file) {
	var item  = new Object();
	item.id		  = "item" + itemCount;
	item.file     = file;
	item.filename = file.name;
	item.filesize = bytesToSize(file.size);
	item.uploadpercent = "3";
	item.zipurl   = "";
	item.zipsize  = "";
	item.zipstate = "ready";
	item.errorcode= "";

    itemCount++;
    
	$("#compressListParent").append(
		"<li class='processingListItem' id=" + item.id + ">" +
			"<p class='name'>" + item.filename + "</p>" +
			"<p class='size'>" + item.filesize + "</p>" +
			"<div class='ProgressbarBack'></div>" +
			"<div class='CompressProgressBar Upload' style='width:" + 28 + "px;'></div>" +
//			"<div class='CompressProgressBar Upload' style='width:" + item.uploadpercent*0.35 + "px;'></div>" +
			"<p class='progressBarTitle'>上传中</p>" +
			"<p class='finishedSize'>" + item.zipsize + "</p>" +
			"<img class='seeButton' src='/images/tool/icon_see_disable.png'/>" + 
			"<button class='downloadButton'   onclick='downloadPicFromUrl(\"" + item.id +"\")'>下载</button>" +	//TODO: change to button
			"<p class='failReason' style='display:none'>图片格式不正确</p>" +
			"<img class='samplePic' src=''/>" + 
		"</li>"
	);
    submittingList.push(item);
    if (currentItem == null)
    	ProcessOneSubmit();
}

// 新建一个非法的 file process list
function AddIllegeItemToList(file) {
	$("#compressListParent").append(
			"<li class='processingListItem'>" +
				"<p class='name'>" + file.name + "</p>" +
				"<p class='size'>" + bytesToSize(file.size) + "</p>" +
				"<div class='ProgressbarBack'></div>" +
				"<div class='CompressProgressBar Error' style='width:350px;'></div>" +
//				"<div class='CompressProgressBar Error' style='width:46%;'></div>" +
				"<p class='progressBarTitle' style='color: #fffcfc'>格式错误</p>" +
				"<p class='failReason'>图片格式不正确</p>" +
			"</li>"
	);
}

// 从处理队列中取出一个待处理元素，提交处理
function ProcessOneSubmit () {
	if (submittingList.length == 0) {
		currentItem = null;
		return;
	}
	
	submittingList.reverse();
	currentItem = submittingList.pop();
	submittingList.reverse();
	submitSingleFile(currentItem.file);
}

// 上传服务器
function submitSingleFile(file) {
	currentItem.zipstate = "upload";
	
	var formData = new FormData();
	formData.append("file", file);
	formData.append("type", compressType);
	
	$.ajax({
        type : "POST",
        url  : ACTION_UPLOAD,
        data : formData,
        processData : false,
        contentType : false ,
        error: function(data) {
        	onerror(data);
        	ProcessOneSubmit();
        },
        success: function(data) {
        	onsuccess(data);
        	ProcessOneSubmit();
        },
 	   	xhr: function() {
 	   		var xhr = $.ajaxSettings.xhr();
 	   		if (onprogress && xhr.upload) {
 	   			xhr.upload.addEventListener("progress", onprogress, false);
 	   			return xhr;
   			}
   		}
    });
}

// 取出item子元素的语法糖
function getItemSubElement(element) {
	return $("#" + currentItem.id + " ." + element);
}

// 监听上传进度，处理进度条
function onprogress(evt) {
	var loaded = evt.loaded;
	var tot = evt.total;
	var per = Math.floor(100*loaded/tot);
	if (per > 4 && currentItem) {
		getItemSubElement("CompressProgressBar").css("width" ,per * 3.5 +"px");
//		getItemSubElement("CompressProgressBar").css("width" ,per * 0.47 +"%");
		if (per > 57)
			getItemSubElement("progressBarTitle").html("<span style='color:#fffcfc;'>上传中</span>");
		else if (per > 52)
			getItemSubElement("progressBarTitle").html("<span style='color:#fffcfc;'>上传</span>中");
		else if (per > 47)
			getItemSubElement("progressBarTitle").html("<span style='color:#fffcfc;'>上</span>传中");
	}
} 

// 处理成功
function onsuccess (data) {
	if (data.code != 200 && data.code != "200") {
		onerror(data);
		return;
	}
	
	currentItem.file     = null;	// release ref
	currentItem.zipurl   = data.url;
	currentItem.zipstate = "finish";
	currentItem.zipsize  = bytesToSize(data.size);
	
	getItemSubElement("progressBarTitle").html("<span style='color:#FFFFFF;'>压缩完成<i></i></span>");
	getItemSubElement("finishedSize")    .html(currentItem.zipsize);
	getItemSubElement("CompressProgressBar").removeClass("Upload");
	getItemSubElement("CompressProgressBar").addClass("Compressdone");
	
	var seeButton = getItemSubElement("seeButton");
	var samplePic = getItemSubElement("samplePic");
	samplePic.attr("src",   currentItem.zipurl);
	seeButton.hover(
		function() {
			seeButton.attr("src",   "/images/tool/icon_see_enable.png");
			samplePic.css("display", "block");
	    },
	    function(){
	    	seeButton.attr("src",   "/images/tool/icon_see_disable.png");
	    	samplePic.css("display", "none");
	    }
    );
	
	sucessItemList[currentItem.id] = currentItem;
	
	jiathis_config.url = "http://www.soogif.com/compress";
	if (sucessCount > 0)
		jiathis_config.pic = jiathis_config.pic + "||" + currentItem.zipurl;
	else
		jiathis_config.pic = currentItem.zipurl;

	sucessCount ++;
	updateSharePanel();
	
	if (data.count != null)
		updateFootCount(data.count);
}

// 处理失败
function onerror(data) {
	currentItem.file      = null;	// release ref
	currentItem.zipstate  = "fail";
	currentItem.errorcode = data.msg != null ?  data.msg : "请重新上传";
	getItemSubElement("failReason").html(currentItem.errorcode);
	getItemSubElement("failReason")    .css("display", "block");
	getItemSubElement("seeButton")     .css("display", "none");
	getItemSubElement("downloadButton").css("display", "none");
	getItemSubElement("CompressProgressBar").removeClass("Upload");
	getItemSubElement("CompressProgressBar").addClass("Error");
    getItemSubElement("CompressProgressBar").css("width", "350px")
//  getItemSubElement("CompressProgressBar").css("width", "46%")
	getItemSubElement("progressBarTitle").html("<span style='color:#FFFFFF;'>上传失败</span>");
	
}

// 下载图片
function downloadPicFromUrl(itemID) {
	if (sucessItemList[itemID] == null)
		return;

	var link = document.createElement("a");
	link.download = "";
	link.href = sucessItemList[itemID].zipurl;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}


/******************************************
 * 
 * Share Panel
 * 
 ******************************************/
// 更新分享框的成功处理数量
function updateSharePanel() {
	if($(".downloadWrap").css("display") == "none"){
		$(".downloadWrap").css("display","block");
	}
//	if (!isSharePanelShown) {
//		isSharePanelShown = true;
//		$("#SharePanel").css("display", "block");
//		paddingHeight = Math.max(paddingHeight - 100, 40);
//		$("#autoPaddingHelper").css("height", paddingHeight + "px");
//		var _src = $("#iframe").attr("src").replace(/#\d+/g,"");
//		$("#iframe").attr("src",_src+"#"+$(document).height());
//	}
//	$("#shareHint").html("" + sucessCount + "张动图压缩成功,快传到公众号里试试吧！");
}

// 打包下载
function downloadZip() {
	var form=$("<form>");
	form.attr('style','display:none');
	form.attr('method','post');
	form.attr('action', ACTION_DOWLOADZIP);
	$('body').append(form);
	
	for(var itemID in sucessItemList){
	    if(sucessItemList.hasOwnProperty(itemID)){
	    	var input = $('<input>'); 
	    	input.attr('type','hidden'); 
	    	input.attr('name','urls'); 
	    	input.attr('value',sucessItemList[itemID].zipurl);
	    	form.append(input);
	    }
	}	
	form.submit();
}

// 显示分享popup
function ShowSaveSharePanel() {
	$("#PopPageShare").css("display", "block");
	$("#block_overlay").css("display", "block");
	$("#block_overlay").css("height", document.body.scrollHeight + "px");
	$("#PaddingSpaceShare").css("height", $(document).scrollTop() + 125 + "px");

	addFavorite();
}

// 自动添加到收藏
function addFavorite() {
	var url   = document.URL;
	var title = document.title;
	try {
		window.external.addFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch (e) {
			//console.log('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
	}
}

// 关闭分享popup
function closeSharePop() {
	$("#PopPageShare").css("display", "none");
	$("#block_overlay").css("display", "none");
}



/******************************************
 * 
 * Foot Counter
 * 
 ******************************************/
// 查询压缩成功的数量
function querySuccessCount() {
	$.ajax({
        type : "GET",
        url  : ACTION_COUNT,
        error: function(data) {
        	onQueryError(data);
        },
        success: function(data) {
        	onQuerySuccess(data);
        }
    });
}

// 查询成功
function onQuerySuccess(data) {
	if (data.count != null)
		updateFootCount(data.count);
}

// 查询失败
function onQueryError(data) {}

// 更新成功数量数字
function updateFootCount(count) {
	for(var i = 0;i < 9;i++){
		if(count > 0){
			var _num = count % 10;
		}else{
			var _num = 0;
		}
		count = Math.floor(count / 10);
		$(".num"+(i+1)).html(_num);
	}
}


function InitBgHeight() {
	paddingHeight = Math.max(40, document.body.scrollHeight - 750);
	$("#autoPaddingHelper").css("height", paddingHeight + "px");
}
