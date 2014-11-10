var wordsArr = ["马上去屎","马上有对象","马上发大财","马上回家","马上有车有房","马上得天下哈哈","马上什么什么","马上有钱","马上有小三","马上有一切"];
var homeFn = {
	init: function(){
		this.eventFn();
		var username = $cookie("wx_name");
		$(".ownName").html(username);
		shareData.title = "马年给"+$cookie("wx_name")+"拍马P";
		shareData.link = "http://www.itsabutterfly.com/activity/spring2014/index.html?id="+$cookie("wx_id");
	},
	eventFn: function(){
		$(".homeHorseGif").click(function(e){
			$("#homeEditPBox").is(":hidden")?'':$("#homeEditPBox").hide();
			$(".homePwordBox").append('<div class="homePngP"><img src="img/icon21.png"/></div>');
			$(".homePngP").addClass("homePngP2");
			setTimeout(function(){
				$("#homeEditPBox").is(":hidden")?$("#homeEditPBox").show():'';
				var i = parseInt(Math.random()*10);
				$("#homePwords").val(wordsArr[i]);
				$(".homePngP").remove();
			},2000);
		});
		//打开分享提示框
		$(".homeBtnBox").click(function(e){
			//验证信息
			var userName = $("#homeName").val().replace(/^\s+|\s+$/g,'');
			if(userName == ''){
				alertMsg("请填写姓名/微信昵称/或你们之间的亲密称呼");
				return false;
			}
			var regExp = /[^·0-9a-zA-Z\u4e00-\u9FA5]{1,}/g;
            var ant = true;
            if (regExp.test(userName)) {
                ant = false;
            }
			if(!ant){
				alertMsg("称呼只能是字母、汉字组合");
				return false;
			}
			var userPword = $("#homePwords").val();
			if(userPword == ''){
				alertMsg("请拍马屁股，给"+$cookie("wx_name")+"拍马P！");
				return false;
			}
			var regExp = /[^·a-zA-Z\u4e00-\u9FA5]{1,}/g;
            var ant = true;
            if (regExp.test(userPword)) {
                ant = false;
            }
			if(!ant){
				alertMsg("马P只能是字母、汉字组合");
				return false;
			}
			var _id = $cookie("wx_id")?$cookie("wx_id"):79;
			homeFn.newPajax(_id,userName,userPword);
		});
		//关闭分享提示框
		$(".shareSec1").click(function(e){
			$(".shareSec1").fadeOut(300);
			var _id = $cookie("wx_id")?$cookie("wx_id"):79;
			window.location.href = "index.html?id="+_id+"";
			var e = window.event || e;
			if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}
			return false;
		});
		$(document).on("click",".alertMsgBox",function(e){
			$(".alertBox").remove();
		});
	},
	newPajax: function(id,name,content){
		$.getJSON('http://admin.itsabutterfly.com/2/activity/default/add_actsub_detail?id='+id+'&name='+name+'&content='+content+'&jsonp=?',
			function(json){
				if(json.result == 'success'){
					$(".shareSec1").fadeIn(300);
				}else{
					alert(json.data.errmsg);
				}
			}).error(function(){
				alert("服务器连接失败");
			});
	}
}
function alertMsg(msg){
	var op = '<div class="alertBox"><div class="alertMsgBox"><div class="alertBtnClose"></div><div class="alertInfo">'+msg+'</div><div class="alertBtnSure">我知道了</div></div></div>';
	$("body").append(op);
}
/*home page end*/
function audioFn(url){
	$("#wxAudio").attr("src",url);
	var btn = $(".infoAudioPng");
	var _audio = document.getElementById("wxAudio");
	_audio.addEventListener("play", function () {
        console.log("playing....");
		btn.addClass("infoAudioGif");
        $(_audio).removeClass("pausing").addClass("playing");
    });
    _audio.addEventListener("pause", function () {
        console.log("pause....");
		btn.removeClass("infoAudioGif");
		$(_audio).removeClass("playing").addClass("pausing");;
    });
    _audio.addEventListener("end", function () {
        console.log("end....");
		btn.removeClass("infoAudioGif");
		$(_audio).removeClass("playing").addClass("pausing");;
    });
}
var springFn = {
	init: function(prarm){
		this.eventFn();
		$.getJSON('http://admin.itsabutterfly.com/2/activity/default/get_activity_sub?id='+prarm+'&jsonp=?',
			function(json){
				if(json.result == 'success'){
					var jsonData = json.jsonEcho.data;
					shareData.title = "马年给"+jsonData.f_username+"拍马P";
					$(".infoName").html(jsonData.f_username);
					$cookie("wx_name",jsonData.f_username);
					$cookie("wx_id",prarm);
					shareData.link = "http://www.itsabutterfly.com/activity/spring2014/index.html?id="+$cookie("wx_id");
					$("#pcount").html(jsonData.f_praise?jsonData.f_praise:0);
					$(".infoPhoto img").attr("src",jsonData.f_head);
					audioFn(jsonData.f_media);
					springFn.ajaxPdata(prarm);
				}else{
					alert(json.data.errmsg);
				}
			}).error(function(){
				alert("服务器连接失败");
			});
	},
	ajaxPdata: function(prarm){
		$.getJSON('http://admin.itsabutterfly.com/2/activity/default/get_actsub_detail?id='+prarm+'&jsonp=?',
			function(json){
				if(json.result == 'success'){
					var jsonData = json.jsonEcho.data;
					if(jsonData && jsonData.length>0){
						var op = '';
						for(var i=0;i<jsonData.length && i<=8;i++){
							op += "<span class='horseP Ppos"+(i+1)+"' dataid='p"+(i+1)+"' pdata='"+JSON.stringify(jsonData[i].namelist)+"'>"+jsonData[i].f_content+"</span>";
						}
						$("#pWords").append(op);
					}
				}else{
					alert(json.data.errmsg);
				}
			}).error(function(){
				alert("服务器连接失败");
			});
	},
	eventFn: function(){
		//播放语音事件
		$(".infoAudio").click(function(e){
			var e = window.event || e;
			var _audio = $("#wxAudio");
			var btn = $(".infoAudioPng");
			var dom_audio = $("#wxAudio")[0];
			_audio.hasClass("pausing")?function(){
                    _audio.removeClass("pausing").addClass("playing");btn.addClass("infoAudioGif");dom_audio.play();if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}return false;
                }():function(){
                    _audio.removeClass("playing").addClass("pausing");btn.removeClass("infoAudioGif");dom_audio.pause();if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}return false;
                }();
		});
		//点击马P banner，上拉动画效果
		$(".clF").click(function(e){
			console.log("上下拉动效果");
			var e = window.event || e;
			var _obj = $(".horseTagBox");
			_obj.hasClass("isDown")?function(){
                    _obj.css("height","99.5%").removeClass("isDown").addClass("isUp");
					setTimeout(function(){
						$("#doorid").attr("class","doorDown");
						$(".horseTagBox").append('<div class="indexHorseP"><img src="img/icon22.png"/></div>');
						setTimeout(function(){
							$("#pWords").fadeIn();
							$(".indexHorseP").remove();
						},2000);
					},800);
					if(document.all){
						e.cancelBubble = true;
					}else{
						e.stopPropagation();
					}
					return false;
                }():function(){
                    _obj.css("height","37px").removeClass("isUp").addClass("isDown");
					$(".rightBox").css("width","0px");
					$(".rightBar").removeClass("showing").addClass("hiding");
					$(".horseP").removeClass("horseTagChoice");
					setTimeout(function(){
						$("#doorid").attr("class","doorUp");
						$("#pWords").fadeOut();},800);
						if(document.all){
							e.cancelBubble = true;
						}else{
							e.stopPropagation();
						}
						return false;
                }();
		});
		//打开分享提示框
		$(".mCard").click(function(e){
			$(".shareSec1").fadeIn(300);
		});
		//关闭分享提示框
		$(".shareSec1").click(function(e){
			$(".shareSec1").fadeOut(300);
			var e = window.event || e;
			if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}
			return false;
		});
		//right banner点击效果
		$(document).on("click",".horseP",function(e){
			console.log("子层被点击");
			var T = $(e.currentTarget);
			var _obj = $(".rightBar");
			var _box = $(".rightBox");
			var _wrap = $(".wrapperBox");
			var e = window.event || e;
			$(".horseP").not(T).removeClass("horseTagChoice");
			if(T.attr("dataid") == _obj.attr("dataid")){
				_obj.hasClass("hiding")?function(){
					T.addClass("horseTagChoice");_box.css("width","105px");_obj.removeClass("hiding").addClass("showing");if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}return false;
				}():function(){
					T.removeClass("horseTagChoice");_box.css("width","0px");_obj.removeClass("showing").addClass("hiding");if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}return false;
				}();
			}else{
				T.addClass("horseTagChoice");
				var namedata = '';
				try{
					namedata = JSON.parse(T.attr("pdata"))?JSON.parse(T.attr("pdata")):"";
					console.log(namedata.length);
				}catch(e){}
				if(namedata != ''){
					_wrap.html("");
					var op = '';
					for(var i=0;i<namedata.length;i++){
						op += '<p class="pName">'+namedata[i].f_name+'</p>';
					}
					_wrap.append(op);
				}
				_obj.attr("dataid",T.attr("dataid"));
				_box.css("width","0px");
				_obj.removeClass("showing").addClass("hiding");
				setTimeout(function(){
					_box.css("width","105px");_obj.removeClass("hiding").addClass("showing");
				},300);
				if(document.all){e.cancelBubble = true;}else{e.stopPropagation();}return false;
			}
			
		});
		//点击空白处，关闭right-Banner
		if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i)) ){
			$(".footerLayZ").click(function(e){
					$(".rightBox").css("width","0px");$(".rightBar").removeClass("showing").addClass("hiding");
					$(".horseP").removeClass("horseTagChoice");
			});
        }else{
			
		}
	}
}
var scrollFn = {
	myScroll:null,
	init: function(){
		var T = this;
		this.myScroll = new iScroll("wrap", {
			myscroll:false,
			vScrollbar:true,
			bounce:true,
			fixedScrollbar:false,
			checkDOMChanges:true,
			useTransform:false,
			hideScrollbar:true,
			onScrollMove:function () {
			},
			onScrollEnd:function () {
				if(T.myScroll.y < -10){
					//$(".detailToTop").fadeIn();
				}else{
					//$(".detailToTop").fadeOut();
				}
			}
		})
	}
};
$(function(){
	$("body").attr("id") == "indexBody"?function(){
		_prarm = 79;
		try{
			_prarm = window.location.href.match(/\?id=.*/).toString().substring(4);
		}catch(e){
			_prarm = 79;
		}
		var _windowHeight = window.innerHeight != null ? window.innerHeight : $(window).height();
		var _top = parseInt(_windowHeight)*0.90;
		$(".btnToPP").css("top",_top+"px").show();
		setTimeout(function(){
			springFn.init(_prarm);
			scrollFn.init();
		},501);
	}():function(){
		setTimeout(function(){
			homeFn.init();
		},501);
	}();
});