var jiathis_config = {};
$(function(){
	// 热搜里面的内容
	$.get('/hotword', function(result) {
		if(result.code!=0){
			return;
		}
		var hotwordhtml = "";
		$.each(result.data.list, function(n,v){
			// hotwordhtml+='<a class="search_query search_hovicon search_effect-1 search_sub-a">'+v.query+'</a>';
			hotwordhtml+='<a href="/search/'+v.query+'" class="name-1">'+v.query+'</a>';
		});
		$("#_focus").append(hotwordhtml);
		$('a').css('text-decoration','none');
	});



	// 搜索点击
    $('.in').bind('keydown',function(event){
		var button_search = '';
		button_search = $(this).val();
		button_search = $.trim(button_search);
		console.log(button_search);
		if (event.key === "Enter" && button_search != ''){
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
	


	// a的点击状态
	$('a').click(function(){
		$('a').css('text-decoration','none')
	})

	// tab切换下面块的右边间距
	// $('.section-one .module .bo').eq(3).css('margin-right','0');
	// $('.section-one .module .bo').eq(7).css('margin-right','0');
	// $('.section-one .module .bo').eq(11).css('margin-right','0');
	// $('.section-one .module .bo').eq(15).css('margin-right','0');
	// $('.section-one .module .bo').eq(19).css('margin-right','0');
	// $('.section-one .module .bo').eq(23).css('margin-right','0');
	// $('.section-one .module .bo').eq(27).css('margin-right','0');
	// $('.section-one .module .bo').eq(31).css('margin-right','0');
	// $('.section-one .module .bo').eq(35).css('margin-right','0');
	// $('.section-one .module .bo').eq(39).css('margin-right','0');
	// $('.section-one .module .bo').eq(43).css('margin-right','0');
	// $('.section-one .module .bo').eq(47).css('margin-right','0');
	// function _four(){
	// 	for(var g = 3;g<100;g+4){
	// 		$('.section-one .module .bo').eq(g).css('margin-right','0');
	// 	}
	// };
	// _four()



	// 获取焦点显示下拉框
	$('.in').focus(function(){
		$('.focus').css('display','block')
	})
	$('.in-2').focus(function(){
		$('.focus').css('display','none')
	})
	$('.focus').mouseover(function(){
		$('.focus').css('display','block');
	})
	$('.focus').mouseout(function(){
		$('.focus').css('display','none');
	})
	$('.in').click(function(){
		$('.focus').css('display','block');
	})
	$('.in').mouseover(function(){
		$('.focus').css('display','block');
	})
	$('.in').hover(function(){
		$('.focus').css('display','block');
	},function(){
		$('.focus').css('display','none');
	});


	// 第二个接口有用ajax遮罩渲染
	// var $activeImg = null;
	// $('grid').on('click','T-show',function(){
		// $activeImg = $(this);
		// console.log('1234567');
		// var id = $activeImg.attr('imgId');
		// console.log(id)
	// });


	// 轮播左右切换
	// $('.lubo').hover(function(){
	// 	$('.left_btn').css('display','block');
	// 	$('.right_btn').css('display','block');
	// },function(){
	// 	$('.left_btn').css('display','none');
	// 	$('.right_btn').css('display','none');
	// });



	// 遮罩点击弹出 显示
	$('.grid').on('click',".T-show",function(){
		$('body').css('overflow','hidden');
		$('.box-shaow').css('display','block')
		$('.focus').css('display','none')
		// $('.nav .box').css('transform','translate(0,0)');
		// console.log('12345678')
		$('.footer').css('display','none')
	})
	
	$('.opcity').click(function(){
		$('.box-shaow').css('display','none');
		$('body').css('overflow','auto')
		// $('.nav .box').css('transform','translate(0,-70px)');
		$('.footer').css('display','block')
	})


	 // 下载图片
	$(document).on("click", ".downloadImg", function() {
		console.log('1111111')
		var type = $(this).attr('downloadType');
		var id = $(".central").attr('imgId');
		location.href="/download/"+type+"/"+id;
		_czc.push(['_trackEvent', 'downloadImg', '点击下载', '点击下载','1','downloadImg']);
	});

	// 遮罩下的文字跳转
	$(document).on("click", ".search_query", function() {
		var search_label = "/search/2/"+$(this).text().replace("#","");
		location.pathname = search_label;
	});


	// 返回顶部1
	var topbtn = $("#totop");          
	var lastScroll = 0; 
	window.onscroll = function(){      
		var top = $(window).scrollTop();   
	};
	topbtn.click(function(){         
		var scrollTop = 0; 
		var curPos = $(window).scrollTop();   
		topbtn.addClass("movingtotop");       
		var step = Math.abs(scrollTop - curPos) / 100 ; 
		var tid = setInterval(function() {    
			topbtn.toggleClass("movingtotop");    
				if (curPos > scrollTop + 14) { 
				curPos -= step; 
				step = step * 1.05;                   
				window.scrollTo(0, curPos); 
			} else if (curPos <= scrollTop + 14){ 
				window.scrollTo(0, scrollTop); 
				topbtn.removeClass("movingtotop"); 
				clearInterval(tid);                   
			} 
		}, 0.01); 
	});


	
	
	
	
	// tab切换
	$('.tabb-1').click(function(){
		$('.tabb-1').removeClass('first-one');
		$(this).addClass('first-one')
		var count = $(this).index();
		$('.module-1').css('display','none')
		$('.module-1').eq(count).css('display','block')
		console.log(count)
	});

	// 分享布局
	$('.jiathis_txt').removeClass('jtico');	

	// 向下滚动返回顶部显示
	$(document).scroll(function(){
		var top = $(window).scrollTop();
		if(top > 300){
			$('#totop').css('display','block');
			$('#fedback').css('display','block');
		}else{
			$('#totop').css('display','none');
			$('#fedback').css('display','none');
		}
	})

	// 小图hover
	$(document).on("mouseenter", ".T-show", function(){
		// console.log('123')
		var $this = $(this);
		var src = $this.find('img').attr('src');
		$this.find('img').attr('src',src.replace('_jpg','_s200x0'));
		$(this).find('._bugload').css('display','block')
		$(this).find('.shaow').css('display','none');
		setTimeout(function(){
			$this.find('._bugload').css('display','none');
		},2000)

	});
	$(document).on('mouseleave',".T-show",function(){
		var src = $(this).find('img').attr('src');	
		$(this).find('img').attr('src',src.replace('_s200x0','_jpg'));
		// $(this).find('._bugload').css('display','none')
		$(this).find('.shaow').css('display','block');
	})

	$(document).on("mouseenter", ".grid-item[imgId]", function(){
		var $this = $(this);
		$this.find('.shaow').css('opcity',0);
	})


	// 首页大图
	$(document).on("click", ".grid-item--width2", function() {
		var id = $(this).attr('sourceid');
		var clickFrom = $(this).attr('click_from');
		window.location.href="/theme/"+id+"?clickFrom="+clickFrom; 
	});


	// 第一个接口有用ajax大图小图渲染
	var count = 1;
	var i = 12;
	var falg = true;
	$(window).scroll(function(){
		if ($(document).height() - $(this).scrollTop() - $(this).height() < 600){
			if ($("._nomore").css("display") !== "none") {
            	$('._load').css('display', 'none');
                falg = false;
            }
			if (falg) {
				falg = false;

				falg = false;
				var url = "themeOrPop", 
				smalStart = $('.grid .T-show').length,
				bigStart = $('.grid .grid-item--width2').length,
				// smalStart = count,
				// bigStart = $('.grid-item').length,
				size = 20;
				$(document).ajaxStart(function() {
			      $('._load').css('display', 'block');
			      _hmt.push(['_trackEvent', 'index', 'ajax', '下拉次数']);
			    });
				$.ajax({
			      	dataType: 'json',
			      	type: 'GET',
			      	url: url,
			      	data: {
			        smalStart: count,
			        bigStart: i
			        // size: size
			    	},
			    	success: function(result) {
				    	if(result.code == 0){ 
				    		var list = result.data.list;
				    		var html = '';
				    		if(list.length !== 20){
				    			$('._load').css('displayp','none')
				    			$('._nomore').css('displayp','block')
				    		}
				    		// console.log(list);
				    		$.each(list,function(i,n){
				    			if(n.type == 'pop'){
				    				
							    	html += '<div click_form="pop" class="grid-item T-show" imgId="'+n.sid+'" sourceid="'+n.sourceid +'">'
									html += '<figure>'
									html += '<div class="shaow">'
									$.each(n.subText.split(" "),function(a,v){
										if(a < 3 && v !== ""){
											html += '<figcaption>'+v+'</figcaption>'
										}
									})
									html += '</div>'
									html += '<img src="'+n.url+'_jpg" alt="" width="100%" height="100%">'
									html += '</figure>'
									html += '<div class="_bugload"></div>'
									html += '</div>'
				    			}else{
				    				html += '<div class="grid-item grid-item--width2 grid-item--height2" sourceid="' + n.sid + '"click_from ="index">'
									html += '<a href="/theme/' + n.sid + '" class="tiaozhuan">'
									html += '<div class="ng-app">'
									html +=	'<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">'
									html +=	'<div class="carousel-inner" role="listbox">'

				    				if(n.materialApplQueryVOList){
				    					$.each(n.materialApplQueryVOList,function(a,v){

											html +=	'<div class="item  '+ (a == 0 ? "active" : "") +' dd1">'
											html +=	'<figure>'
											html +=	'<img src="'+v.url+'" alt="' + (v.subText ? v.subText: "") + '" width="100%" height="100%">'
											html +=	'</figure>'
											html += '</div>'

											
											
										  	
				    					})
				    				}
				    				html +=	'</div>'
									html +=	'</div>'
				    				html +=	'</div>'
									html += '<div class="shaow">'
				    				html +=	'<figcaption class="">'+(n.title ? n.title:"")+'</figcaption>'
									html +=	'</div>'
									html +=	'<i class="i"></i>'
									html += '</a>'	
									html += '</div>'

				    			}
				    		});

				    		$elems = $(html);
					      	$('.grid').append($elems).masonry('appended', $elems);

				    	}

				    	// callback run
				    	count++;
						i+=12
				    	falg = true;
				    }
				});
			
			}
		}
	});



	// 第二个接口有用ajax遮罩渲染 点击小图弹出遮罩
	var $activeImg = null;
	$(document).on('click','.grid-item[imgId]',function(){
		$activeImg = $(this);
		var id = $activeImg.attr('imgId');
		var click_form = 'pop';
		getImg(id,click_form);
		_czc.push(['_trackEvent', 'clickImg', '点击图片', '点击图片',id,'.grid-item.T-show']);
	});

	// 遮罩右边的小图点击
	var $activeImg = null;
	$(document).on('click','.aside',function(){
		$activeImg = $(this);
		var id = $activeImg.attr('imgId');
		var click_form = 'pop';
		getImg(id,click_form);
		_czc.push(['_trackEvent', 'clickImg', '点击图片', '点击推荐动图',id,'.aside']);
	});
	// $(document).on("click", ".aside", function() {
	// 	var id = $(this).attr('imgId');
	// 	var click_form = 'pop';
	// 	getImg(id,click_from);
 //    });

	// 上一个
	$(document).on('click','#_pre',function(){
		var $prev = $activeImg.prev();
		$activeImg = $prev;
		var id = $activeImg.attr('imgId');
		if(id==null){
			if($activeImg.attr('class')){
				$activeImg = $activeImg.prev();
				id =  $activeImg.attr('imgId');
			}else{
				return
			}
		}
		var click_form = $activeImg.attr('click_form');
		var click_form = 'pop_left';
		getImg(id,click_form+'_left');
		_czc.push(['_trackEvent', 'clickImg', '点击左边图片', '点击左边图片',id,'#_pre']);
	});

	// 下一个
	$(document).on('click','#_nex',function(){
		var $prev = $activeImg.next();
		$activeImg = $prev;
		var id = $activeImg.attr('imgId');
		if(id==null){
			if($activeImg.attr('class')){
				$activeImg = $activeImg.prev();
				id =  $activeImg.attr('imgId');
			}else{
				return
			}
		}
		var click_form = $activeImg.attr('click_form');
		var click_form = 'pop_right';
		getImg(id,click_form+'_right');
		_czc.push(['_trackEvent', 'clickImg', '点击右边图片', '点击右边图片',id,'#_nex']);
		// $('._dg').imagesLoaded(function(){
			// $('._ii').css('display','block')
		// });
	});


	// 为遮罩封装函数
	function getImg(id,click_form){
		$(".central").attr("imgId",id);
		// 大图
		$.ajax({
			dataType:'json',
			type:'GET',
			url:"/materialJson/" + id,
			// beforeSend:function(){
			// 	$('._ii').css('display','block')
			// },
			data:{clickFrom: click_form},
			success:function(result){
				console.log(result);
				if(result.code!=0){
					return;
				}
				var material = result.data.material;
				// 下面是文字
				var html = "";
				if(material.subText){
					$.each(material.subText.split(" "),function(n,v){
						if(v&&n<4){
							html += '<a href="#" class="labelled search_query">'+v+'</a>';
						}
					});
				}
				$(".box-shaow .central-left .le").html(html);
				$('#activeImg').attr('src',material.url);
				setTimeout(function(){
					var im_width = $('#activeImg').width();
					var im_height = $('#activeImg').height();
					console.log(im_width);
					$("#activeImg").addClass("test");
					$('.measure-1').html('图片尺寸:'+im_width+'*'+im_height+'');
					$(".measure-2").html('图片大小:'+(material.size/1024).toFixed(2)+'KB');
				},100);


				// 小图
				$.ajax({
					dataType:'json',
					type:'GET',
					url:'/material/recommend',
					data:{pid:id,size:5},
					success:function(result){
						console.log(result);
						if(result.code!=0){
							return;
						}
						var list = result.data.list;
						var centralHtml = "";
						if(list){
							$.each(list,function(n,v){
								if(v.id!=id){
									var url = v.url;
									if(v.size>20*1000*1000){
										url = v.url+"_new";
									}
									centralHtml += '<div class="aside" imgId="'+v.sid+'"><figure><img src="'+url+'_jpg" alt="" width="100%"></figure></div>'
								}
							});
						}
						$('.box-shaow .central-right').html(centralHtml);
					}
				});




				// jiathis_config.url = "http://www.soogif.com/materialPage/"+id;
				// jiathis_config.url = "http://web.localhost:8080/materialPage/"+id;
				// jiathis_config.url = window.location.href.replace("#"," ") + "materialPage/"+id;
				// jiathis_config.url = "http://www.soogif.com/materialPage/"+id;
				jiathis_config.url = "http://demo.soogif.com/materialPage/"+id;
				jiathis_config.pic = material.url;
				// console.log(window.location.href);
				// var nosame = window.location.href
				// nosame = "/url"
			}
		});
	}






























});

	