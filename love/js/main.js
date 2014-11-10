function audioFn(srcs){
	$("#mylovewords").attr("src",'./audio/loveword.mp3');
	var _audioWords = document.getElementById("mylovewords");
	var _audioHeart = document.getElementById("loveheart");
	_audioWords.addEventListener("play", function () {
        console.log("playing....");
		_audioHeart.pause();
    });
    _audioWords.addEventListener("pause", function () {
        console.log("pause....");
		setTimeout(function(){
			$('.wxaudio').removeClass("audioN").addClass("audioY");
		},501);
		if(!$(".wxmusic").hasClass("btnPause")){
			_audioHeart.play();
		}
    });
	_audioHeart.addEventListener("pause", function () {
        console.log("pause....");
		if(!$(".wxmusic").hasClass("btnPause")){
			_audioHeart.play();
		}
    });
    _audioWords.addEventListener("end", function () {
        console.log("end....");
		setTimeout(function(){
			$('.wxaudio').removeClass("audioN").addClass("audioY");
		},501);
		if(!$(".wxmusic").hasClass("btnPause")){
			_audioHeart.play();
		}
    });
}
function ValentineAni(){
	console.log("ValentineAni");
	if(loveScene.animateTag){
		var op = '<div class="myballC ballAnimate1"><img src="./img/club1.png"/></div><div class="myballC ballAnimate2"><img src="./img/club2.png"/></div><div class="myballC ballAnimate3"><img src="./img/club3.png"/></div><div class="myballC ballAnimate4"><img src="./img/club4.png"/></div><div class="myballC ballAnimate5"><img src="./img/club5.png"/></div><div class="myballC ballAnimate6"><img src="./img/club6.png"/></div><div class="myballC ballAnimate7"><img src="./img/club7.png"/></div>';
		$("body").append(op);
		loveScene.animateTag = !loveScene.animateTag;
		var myinterval = setInterval(function(){
			if(loveInfoFn.loveKeepTime++ > 20){
				clearInterval(myinterval);
				loveInfoFn.loveKeepTime = 0;
				loveScene.animateTag = !loveScene.animateTag;
				return false;
			}
			var op = '';
			for(var i=1;i<8;i++){
				var ant = parseInt(Math.random()*7+1);
				op = '<div class="myballC ballAnimate'+ant+'"><img src="./img/club'+ant+'.png"/></div>';
			}
			$("body").append(op);
			var arrs = $(".myballC");
			if(arrs && arrs.length > 1){
				for(var i=0;i<arrs.length;i++){
					$(arrs[i]).css("opacity")=="0"?$(arrs[i]).remove():"";
				}
			}
		},200);
		myinterval;
	}
}
var loveInfoFn = {
	loveNum : 0,
	loveKeepTime: 0,
	loveZan: 0,
	loveClick:0,
	loveId:0
}
var loveScene = {
	animateTag: true,
	init: function(){
			document.getElementById("loveheart").play();
			var mybg = new Image;
			mybg.src = './img/bg1.jpg';
			mybg.onload = function(){
						$(".infoSec").css({"background":"url("+mybg.src+") no-repeat","backgroundSize":"100%"});	
						$(".wxname").html("BruceCham");
						$("#pcount").html(20);
						audioFn();
						var arrs = ["","2014，我会送你一次最浪漫的夕阳晚餐！","嫁给我吧！","让我带你去只有我们的爱情岛！","要月亮，不会给你星星！","让我给你一个家！"];
						
						var myhead = new Image;
						myhead.src = './img/wxImg0.jpg';
						myhead.onload = function(){
							$(".wxphoto img").attr("src",myhead.src);
							setTimeout(function(){
								$(".wxaudio").removeClass("audioN").addClass("audioY");
								$(".wxmusic").removeClass("btnPause").addClass("btnPlay");
							},501);
						}					
						loveInfoFn.loveNum = 20;
						setTimeout(function(){
							$(".lovewendu3 .lovenum span").html(loveInfoFn.loveNum);
							$(".lovewendu3").css("bottom",loveInfoFn.loveNum<93?loveInfoFn.loveNum+"%":"92%");
							$(".lovewendu2").css("height",loveInfoFn.loveNum+"%");
							setTimeout(function(){
								$(".lovesoeal").css("height","110px");
							},1501);
							setTimeout(function(){ValentineAni();},2000);
						},2000);
					}
	},
	events: function(){
		$(".lovewendu3").click(function(e){
			loveInfoFn.loveZan = parseInt(loveInfoFn.loveZan)+1;
			var arrs = ["","2014，我会送你一次最浪漫的夕阳晚餐！","嫁给我吧！","让我带你去只有我们的爱情岛！","要月亮，不会给你星星！","让我给你一个家！"];
			var ant = parseInt(loveInfoFn.loveId);
			loveInfoFn.loveNum = parseInt(loveInfoFn.loveNum) + 1;
			$(".lovewendu3 .lovenum span").html(loveInfoFn.loveNum);
			$(".lovewendu3").css("bottom",loveInfoFn.loveNum<93?loveInfoFn.loveNum+"%":"92%");
			$(".lovewendu2").css("height",loveInfoFn.loveNum+"%");
			ValentineAni();
		});
		$(".wxmusic").click(function(e){
			var that = $(e.currentTarget);
			that.hasClass("btnPlay")?function(){
				that.removeClass("btnPlay").addClass("btnPause");
				$(".wxaudio").removeClass("audioN").addClass("audioY");
				$("#loveheart")[0].pause();
				$("#mylovewords")[0].pause();
			}():function(){
				that.removeClass("btnPause").addClass("btnPlay");
				$(".wxaudio").removeClass("audioN").addClass("audioY");
				$("#mylovewords")[0].pause();
				$("#loveheart")[0].play();
			}();
		});
		$(".wxaudio").click(function(e){
			var that = $(e.currentTarget);
			that.hasClass("audioN")?function(){
				that.removeClass("audioN").addClass("audioY");
				$("#mylovewords")[0].pause();
			}():function(){
				that.removeClass("audioY").addClass("audioN");
				$(".wxmusic").removeClass("btnPlay").addClass("btnPause");
				$("#loveheart")[0].pause();
				$("#mylovewords")[0].play();
				//loveAnimateFn(1);
			}();
		});
		$(document).on("click",".myballC",function(e){
			var T = $(e.currentTarget);
			loveInfoFn.loveClick++;
			console.log("it is clicked");
			$(".myfinger").html('<div class="fingerClick">+'+loveInfoFn.loveClick+'</div>');
		});
	}
}
$(function(){
		_prarm = 18;
		try{
			_prarm = window.location.href.match(/\?id=.*/).toString().substring(4);
		}catch(e){
			_prarm = 18;
		}
		loveScene.init();
		loveScene.events();
});