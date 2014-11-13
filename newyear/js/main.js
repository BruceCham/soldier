//播放声音
//audioFn("audio/heart.mp3")
function audioFn(_src) {
    var _audio = document.getElementById("audioId");
    var $playBtn = $("#pVoice");
    $(_audio).attr("src",_src);
    $playBtn.bind("click", function (ev) {
		if($("#pVoice").hasClass("pVoicePlaying")){
			_audio.pause();
			$playBtn.removeClass("pVoicePlaying");
			return false;
		}
        _audio.play();
    });
    _audio.addEventListener("play", function () {
        console.log("playing....");
        $playBtn.addClass("pVoicePlaying");
    });
    _audio.addEventListener("pause", function () {
        console.log("pause....");
		$playBtn.removeClass("pVoicePlaying");
    });
    _audio.addEventListener("end", function () {
        console.log("end....");
		$playBtn.removeClass("pVoicePlaying");
    });
}
//点燃烟花的全流程
var progressFn = {
    ad:function () {//广告标语
        $(".adBox").css({margin:"0 0 0 -184px" });
        $(".adBox .word").css({ margin:"-44px 0 0 -110px", width:234, height:106 })
    },
    fire:function () {
        $(".fireworks").fadeIn();
        setTimeout(function () {
            progressFn.ad();
        }, 1000);
    },
    init:function () {
        $('#ctrlBox .icoWord,#ctrlBox .icoFire').unbind("click").bind("click", function () {
			ajaxInfoFn.setPariseFn(_prarm);
            $(".ctrlBox .icoFire").animate({left:174, bottom:80}, 500, function () {
                $(this).fadeOut();
                $(".ctrlBox .icoWord").fadeOut();
                $(".ctrlBox .icoLine").animate({width:3}, 2000, function () {
                    progressFn.fire();
                });
				setTimeout(function(){
					$('#ctrlBox .icoMeTry').fadeIn(300);
					$(".ctrlBox .icoHeart").addClass("icoHeartAni");
					//初始化烟花素材，准备开炮
					var _html = '<img src="'+imgLoadFn.fire1ImgS+'" class="img1">';
					$(".fireworks").append(_html);
					setTimeout(function(){
						_html = '<img src="'+imgLoadFn.fire2ImgS+'" class="img2">';
						$(".fireworks").append(_html);
					},500);
					setTimeout(function(){
						_html = '<img src="'+imgLoadFn.fire3ImgS+'" class="img3">';
						$(".fireworks").append(_html);
					},3200);
					setTimeout(function(){
						_html = '<img src="'+imgLoadFn.fire4ImgS+'" class="img4">';
						$(".fireworks").append(_html);
					},6000);
					setTimeout(function(){
						_html = '<img src="'+imgLoadFn.fire5ImgS+'" class="img5">';
						$(".fireworks").append(_html);
					},800);		
				},2500);           
            });
        });
    }
}
var resizeFn = {
    prevMain:function () {
        var _windowHeight = window.innerHeight != null ? window.innerHeight : $(window).height();
        $("#wrap").height(_windowHeight + 200);
        $(window).scrollTop(1);
    },
    initDom:function () {
        var _windowHeight = window.innerHeight != null ? window.innerHeight : $(window).height();
        setInterval(function () {
            $("#wrap").height(_windowHeight);
        }, 100);
    }
};
//add counts
var imgLoadFn = {
	fire1ImgS: '',
	fire2ImgS: '',
	fire3ImgS: '',
	fire4ImgS: '',
	fire5ImgS: '',
	huanNum : '',
	horseImgS: '',
	shakeImgS1:'',
	imgtips: '',
	shakeImgArr: new Array,
	init: function(){
		var fire1Img = new Image;
		fire1Img.src = 'img/fire/1.gif';
		imgLoadFn.fire1ImgS = fire1Img.src;
		var fire2Img = new Image;
		fire2Img.src = 'img/fire/2.gif';
		imgLoadFn.fire2ImgS = fire2Img.src;
		var fire3Img = new Image;
		fire3Img.src = 'img/fire/3.gif';
		imgLoadFn.fire3ImgS = fire3Img.src;
		var fire4Img = new Image;
		fire4Img.src = 'img/fire/4.gif';
		imgLoadFn.fire4ImgS = fire4Img.src;
		var fire5Img = new Image;
		fire5Img.src = 'img/fire/5.gif';
		imgLoadFn.fire5ImgS = fire5Img.src;
		var horseImg = new Image;
		horseImg.src = './img/icon_3.gif';
		imgLoadFn.horseImgS = horseImg.src;
		var shakeImg1 = new Image;
		shakeImg1.src = '';
		imgLoadFn.shakeImgS1 = shakeImg1.src;
		var huan = new Image;
		huan.src = './img/icon_1.png';
		imgLoadFn.huanNum = huan.src;
		var tips = new Image;
		tips.src = './img/tips.png';
		imgLoadFn.imgtips = tips.src;
		
		var ImgArr0 = new Image;
		ImgArr0.src = './img/shakeImg1.gif';
		imgLoadFn.shakeImgArr[0] = ImgArr0.src;
		var ImgArr1 = new Image;
		ImgArr1.src = './img/shakeImg2.gif';
		imgLoadFn.shakeImgArr[1] = ImgArr1.src;
		var ImgArr2 = new Image;
		ImgArr2.src = './img/shakeImg3.gif';
		imgLoadFn.shakeImgArr[2] = ImgArr2.src;
		var ImgArr3 = new Image;
		ImgArr3.src = './img/shakeImg4.gif';
		imgLoadFn.shakeImgArr[3] = ImgArr3.src;
		var ImgArr4 = new Image;
		ImgArr4.src = './img/shakeImg5.gif';
		imgLoadFn.shakeImgArr[4] = ImgArr4.src;
		var ImgArr5 = new Image;
		ImgArr5.src = './img/icon_ny.png';
		imgLoadFn.shakeImgArr[5] = ImgArr5.src;
		
	}
}
var countN = 10,isShaking = true;
var contFn = {
	appendCountLay: function(){
		var myBlockLay = '<div class="countLays"><div class="countLayShake"><img src="./img/wxShake.gif"/><p>摇一摇</p></div><div class="layBack"></div><div id="counts" class="myNum animate" style="margin-top:'+marTop+'px;background-image: url('+imgLoadFn.huanNum+');background-size: 177px;">10</div></div>';
		$("body").append(myBlockLay);
		contFn.contAnimate();
		sIanimate = setInterval(function(){
			countN--;
			contFn.contAnimate();
		},1000);
		setTimeout(function(){
			console.log("test");
			//clearTimeout(clickTipsDelay);
			$("#counts").remove();
			$(".countLays").append('<div class="nYlay1"><div class="nylayClass"><div class="nYlay11"><img src="./img/icon_61.png"/></div><div class="nYlay12"><img src="'+imgLoadFn.horseImgS+'"/></div></div><div class="nylayClass" style="display: none;"><div class="nYlay11"><img src="'+imgLoadFn.shakeImgArr[5]+'"/></div><div class="nYlay13"><img src="'+imgLoadFn.shakeImgArr[0]+'"/></div></div><div class="nylayClass" style="display: none;"><div class="nYlay11"><img src="'+imgLoadFn.shakeImgArr[5]+'"/></div><div class="nYlay13"><img src="'+imgLoadFn.shakeImgArr[1]+'"/></div></div><div  class="nylayClass" style="display: none;"><div class="nYlay11"><img src="'+imgLoadFn.shakeImgArr[5]+'"/></div><div class="nYlay13"><img src="'+imgLoadFn.shakeImgArr[2]+'"/></div></div><div class="nylayClass" style="display: none;"><div class="nYlay11"><img src="'+imgLoadFn.shakeImgArr[5]+'"/></div><div class="nYlay13"><img src="'+imgLoadFn.shakeImgArr[3]+'"/></div></div><div class="nylayClass" style="display: none;"><div class="nYlay11"><img src="'+imgLoadFn.shakeImgArr[5]+'"/></div><div class="nYlay13"><img src="'+imgLoadFn.shakeImgArr[4]+'"/></div></div></div>');
			$(".countLays .countLayShake").fadeIn(500);
			$(".layBack").addClass("mymoneya");
			isShaking = false;
			console.log("happy new year");
		},11000);
	},
	contAnimate: function(){
		setTimeout(function(){
			$("#counts").removeClass("animate");
		},900);
		$("#counts").html(countN).addClass("animate");
		if(countN <= 0){
			clearInterval(sIanimate);
			return false;
		}
	}
}
var showTime = function(h,m,s){
		if(h < 10){
				document.getElementById('nyH').innerHTML = '0'+h;
		}else {
				document.getElementById('nyH').innerHTML = h;
		}
		if(m < 10){
				document.getElementById('nyM').innerHTML = '0'+m;
		}else {
				document.getElementById('nyM').innerHTML = m;
		}
		if(s < 10){
				document.getElementById('nyS').innerHTML = '0'+s;
		}else {
				document.getElementById('nyS').innerHTML = s;
		}
		refresh_m = window.setInterval(function() {
			if(s == 11 && m == 0 && h == 0){
				window.clearInterval(refresh_m);
				$(".footerCont").hide();
				console.log("test2");
				//clearTimeout(clickTipsDelay);
				$(".countLays").remove();
				contFn.appendCountLay();
				return false;
			}
			s--;
			if(s < 0){
				s = 59;
			}
			if(s < 10){
				document.getElementById('nyS').innerHTML = '0'+s;
			}else {
				document.getElementById('nyS').innerHTML = s;
			}
			if(s == 59){
				m--;
			}
			if(m < 0){
				m = 59;
			}
			if(m < 10){
				document.getElementById('nyM').innerHTML = '0'+m;
			}else {
				document.getElementById('nyM').innerHTML = m;
			}
			if(m == 59){
				h--;
			}
			if(h < 0){
				h = 0;
			}
			if(h < 10){
				document.getElementById('nyH').innerHTML = '0'+h;
			}else {
				document.getElementById('nyH').innerHTML = h;
			}
			refresh_m;
		}, 1000);
}
var ajaxInfoFn = {
	init: function(prarm){
			audioFn("audio/audio2.mp3");//加载音频
			var bodyBackImg = new Image;
			bodyBackImg.src = 'img/bg.jpg';//加载背景图片
			bodyBackImg.onload = function(){
				$("body").css({"backgroundImage":"url("+bodyBackImg.src+")","backgroundSize":"100% auto","backgroundRepeat":"no-repeat;"});
			}
			var headImg = new Image;
			headImg.src = 'img/wxImg1.jpg';//加载头像
			headImg.onload = function(){
				$(".pHeadPic img").attr("src",headImg.src);
			}
			$(".pName").html("源远流长");//加载用户名
			imgLoadFn.init();//图片预加载
			$("#pVoice .long").html("35\"");//音乐时长
			$("#ctrlBox .icoHeart").html(8);//点赞数
			ajaxInfoFn.ajaxForTime();
	},
	ajaxForTime: function(){
		//showTime(0,0,25);
	},
	setPariseFn : function(id){

	}
}
//摇一摇
try{
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideToolbar');
    });
}catch(err){

}

try{
    window.addEventListener('shake', function(){
		if(isShaking){
			return false;
		}
		$(".nylayClass").hide();
		$(".layBack").removeClass("mymoneya");
		var _index = parseInt(Math.random()*10/2+1);
		$(".nylayClass :eq("+_index+")").show();
		setTimeout(function(){
			isShaking = false;
		},1500);
	}, false);
}catch(err){

}
$(function () {
	var _H = window.innerHeight != null ? window.innerHeight : $(window).height();
	_prarm = 6;
	try{
		_prarm = window.location.href.match(/\?id=.*/).toString().substring(4);
	}catch(e){
		_prarm = 6;
	}
	ajaxInfoFn.init(_prarm);
	marTop = parseInt((_H - 177)/2);	
    resizeFn.prevMain();
    resizeFn.initDom();
    progressFn.init();
	$(document).on("click","#ctrlBox .icoMeTry",function(){
		var meTryLay = '<div class="countLays" id="tipsId"><div class="layBack"></div><img src="'+imgLoadFn.imgtips+'" style="display: block;width:293px;margin: 10px auto;"/></div>';
		$("body").append(meTryLay);
		//clickTipsDelay = setTimeout(function(){
			//console.log("test3");
			//$(".countLays").remove();
		//},10000);
		//clickTipsDelay;
	});
	$(document).on("click","#tipsId",function(){
		console.log("test4");
		//clearTimeout(clickTipsDelay);
		$("#tipsId").remove();
	});
})
