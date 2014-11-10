var $win = $(window), $move = $("#dumpling"), $goal = $("#bowl"), $clock = $("#clock") , $collide = $("#collide") , $total = $(".ctrlBox ul li.total .num") , $time = $(".ctrlBox ul li.time .num");

var resizeFn = {
    init:function () {
        $("body").height($win.height());
    }
};
var moveL = 220;
var moveT = 100;
var speedX = 0, speedY = 0;
var moveAttr = {"left":moveL, "top":moveT, "width":30, "height":30};
var goalAttr = {"left":47, "top":270, "width":84, "height":84 };
var moveWrap = {"l":0, "r":280, "t":0, "b":300};
var collideTotal = 0;       //碰撞次数


//初始化移动物
$move.css(moveAttr);
//定义小球的移动范围
moveWrap.r = $win.width() - $move.width();
moveWrap.b = $win.height() - $move.height();
//定义障碍物的移动范围
goalAttr.l = 0;
goalAttr.r = $win.width() - $goal.width();
goalAttr.t = 0;
goalAttr.b = $win.height() - $goal.height();
//设定一个目标物
$goal.css({left:goalAttr.left, top:goalAttr.top, width:goalAttr.width, height:goalAttr.height});
//允许的误差，默认为球的半径
var deviation = 40;
//检测碰撞
var doCheckCollide = function () {
    if (moveL - deviation + $move.width() > goalAttr.left && moveL + deviation < goalAttr.left + goalAttr.width && moveT - deviation + $move.height() > goalAttr.top && moveT + deviation < goalAttr.top + goalAttr.height) {
        $goal.addClass("active");
        collideTotal++;
        $total.text(collideTotal);
        $collide[0].play();
        setTimeout(function () {
            //    $clock[0].play();
        }, 1000);
        $("#iconAdd").addClass("iconAdd_active");
        setTimeout(function () {
            $("#iconAdd").removeClass("iconAdd_active");
        }, 700);
        doBarrier();
        $goal.append('<div class="ico"></div>');
        shareData.title = "我滚了" + collideTotal + "个汤圆，元宵情人节快乐！滚不了床单，就来滚汤圆吧！";

    } else {
        $goal.removeClass("active");
    }
};
//变化目标物
var doBarrier = function () {
    goalAttr.left = parseInt(Math.random() * 1000) % goalAttr.r;
    goalAttr.top = parseInt(Math.random() * 1000) % goalAttr.b;
    $goal.css({left:goalAttr.left, top:goalAttr.top, width:goalAttr.width, height:goalAttr.height});

};
//定位移动物
var timeMove = null;



//倒计时30秒
var gameTimerFn = {
    to:null,
    num:null,
    init:function () {
        collideTotal = 0;           //碰撞次数归零
        gameTimerFn.num = 30;       //游戏时间
        goalAttr.left = 47;         //目标物初始化坐标
        goalAttr.top = 270;
        $time.text(gameTimerFn.num + "”");
        $total.text(collideTotal);
        $goal.empty();

        var readyTime = 3;
        var countdownFn = window.setInterval(function () {
            if (readyTime >= 1) {
                $("#popCountdown").html('<div class="num num' + readyTime + '"></div>').show();
                readyTime--;
            } else {
                $("#popCountdown").hide();
                //    $clock[0].play();
                window.clearInterval(countdownFn);      //预备倒计时结束
                window.clearInterval(gameTimerFn.to);   //清除游戏时间
                window.clearInterval(timeMove);         //清楚移动物的帧时间
                //游戏时间倒计时过程
                gameTimerFn.to = window.setInterval(function () {
                    if (gameTimerFn.num >= 1) {
                        gameTimerFn.num--;
                        $time.text(gameTimerFn.num + "”");
                    } else {
                        window.clearInterval(gameTimerFn.to);
                        window.clearInterval(timeMove);
                        //     $clock.remove();
                        $collide.remove();
                        gameOverFn();
                    }
                }, 1000);
                //定位汤圆位置
                timeMove = setInterval(function () {
                    moveL += speedX;
                    moveL = moveL > moveWrap.l ? moveL : moveWrap.l;
                    moveL = moveL < moveWrap.r ? moveL : moveWrap.r;
                    moveT += speedY;
                    moveT = moveT > moveWrap.t ? moveT : moveWrap.t;
                    moveT = moveT < moveWrap.b ? moveT : moveWrap.b;
                    $move.css({left:moveL + "px", top:moveT + "px"});
                    doCheckCollide();
                }, 13);
            }
        }, 1000);
    }
};

var gameStartFn = function () {
    $("#fixAd").hide();
    $("#popPlay").removeClass("popActive");
    setTimeout(function () {
        $("#popPlay").hide();
    }, 500);
    jackyFn.filterAbs("no", $("body"), "filterAbs_pop");

    gameTimerFn.init();
    setTimeout(function () {
        sceneInitFn();
    }, 500);
};
var gameReStartFn = function () {
    window.location.reload();
    /* $("#popRst").removeClass("popActive");
     jackyFn.filterAbs("no", $("body"), "filterAbs_pop");
     gameTimerFn.init();*/
};
var gameInitFn = function () {
    $("#fixAd").show();
    $("#popPlay").fadeIn(function () {
        $("#popPlay").addClass("popActive");
    });
    jackyFn.filterAbs("yes", $("body"), "filterAbs_pop", {background:"#b80a06", opacity:0.8});
    $(".flower").addClass("transPos");
    $(".light").addClass("transPos");
    $(".logo").addClass("transPos");
    $(".light").css({top:"-100%"});
    $(".logo").css({top:"-100%"});
    $(".flower1").css({top:"-100%"});
    $(".flower2").css({bottom:"-100%"});
    $(".flower3").css({bottom:"-100%"});
    $(".flower4").css({left:"-100%"});
    $(".flower5").css({left:"-100%"});
};
var gameOverFn = function () {
    $("#popRst .tip .num").text(collideTotal);
    $("#fixAd").show();
    $("#popRst").fadeIn(function () {
        $(this).addClass("popActive");
    });
    jackyFn.filterAbs("yes", $("body"), "filterAbs_pop", {background:"#b80a06", opacity:0.8});
    try {
        BfCodeBaX(collideTotal);
    } catch (e) {
    }
};
//场景初始化
var sceneInitFn = function () {
    $(".light").css({top:"-0%"});
    $(".logo").css({top:"-0%"});
    $(".flower1").css({top:"-0%"});
    $(".flower2").css({bottom:"-0%"});
    $(".flower3").css({bottom:"-0%"});
    $(".flower4").css({left:"-0%"});
    $(".flower5").css({left:"-0%"});
};

window.onorientationchange = function (e) {
};
window.ondeviceorientation = function (e) {
    var _angleX, _angleY;
    var o = window.orientation;
    if (o == 90) {
        _angleX = e.beta;
        _angleY = e.gamma;
    }
    else if (o == -90) {
        _angleX = -e.beta;
        _angleY = -e.gamma;
    }
    else if (o == 0) {
        _angleX = e.gamma;
        _angleY = e.beta;
    }
    // 定义X方向的移动速度
    if (_angleX > 10) {
        speedX = 5;
    }
    else if (_angleX > 5) {
        speedX = 2;
    }
    else if (_angleX > 1) {
        speedX = 1;
    }
    else if (_angleX < -10) {
        speedX = -5;
    }
    else if (_angleX < -5) {
        speedX = -2;
    }
    else if (_angleX < -1) {
        speedX = -1;
    }
    else {
        speedX = 0;
    }
    // 定义Y方向的移动速度
    if (_angleY > 10) {
        speedY = 5;
    }
    else if (_angleY > 5) {
        speedY = 2;
    }
    else if (_angleY > 1) {
        speedY = 1;
    }
    else if (_angleY < -10) {
        speedY = -5;
    }
    else if (_angleY < -5) {
        speedY = -2;
    }
    else if (_angleY < -1) {
        speedY = -1;
    }
    else {
        speedY = 0;
    }
};
window.onload = function () {
    var _audio = '';
    $("body").append(_audio);
    gameInitFn();
};

$(function () {
    resizeFn.init();
    $win.bind("resize", function () {
        resizeFn.init();
    });
    $("#fixAd a").on("click", function (e) {
        e.preventDefault();
        var _href = $(this).attr("href");
        var _prarm = $G("id");
        console.log("lantern_:" + _prarm);
        BfCodeBaX("lantern_" + _prarm);
        setTimeout(function () {
            window.location.href = "http://bsch.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=20&mc=click&pli=8983075&PluID=0&ord=&mb=1" + "&ref=lantern2014";
        }, 500);
    });


})

