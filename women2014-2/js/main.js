var $win = $(window),
    game = {},          //游戏主对象
    $canvas = $("#canvas"), //用作事件触发对象
    $female = $("#female"), //移动物的对象
    $move = $("#propsId"), //移动物的对象
    $goal = $("#male"), //被击打的对象
    $intro = $("#game .intro") , //游戏介绍层对象
    $score = $("#score") , //输出有效得分的对象
    $time = $("#game .time label");     //输出有效时间的对象
var __subid = "";
var __fromid = "";
/*
 * 游戏执行模块
 * */
game = {


    //检测碰撞
    doCheckCollide:function () {
        if (game.moveL - game.deviation + $move.width() > game.goalAttr.left && game.moveL + game.deviation < game.goalAttr.left + game.goalAttr.width && game.moveT - game.deviation + $move.height() > game.goalAttr.top && game.moveT + game.deviation < game.goalAttr.top + game.goalAttr.height) {
            $goal.addClass("active");
            game.collideTotal++;
            $score.text(game.collideTotal * 10);
            clearInterval(game.moveInterval);
            $goal.html('<div class="maleIco"></div>');
            setTimeout(function () {
                $(".maleIco").remove();
            }, 500);
            $("#sound")[0].play();
            game.shootCan = "yes";
            game.readyShoot();
            game.goalChange();
        } else {
            $goal.removeClass("active");
            if (parseInt($move.css("top")) <= 0) {
                game.shootCan = "yes";
                game.readyShoot();
            }
        }
    },
    //更新目标物
    goalChange:function () {
    },
    //游戏有效时间
    timeFn:{
        timerInterval:null,
        num:null,
        init:function () {
            game.collideTotal = 0;           //碰撞次数归零
            game.timeFn.num = 60;       //游戏时间
            game.goalStep = 5;
            game.goalDuration = 50;
            $time.text(game.timeFn.num + "S");
            $score.text(game.collideTotal);

            window.clearInterval(game.timeFn.timerInterval);         //清除游戏时间
            window.clearInterval(game.timeMove);         //清楚移动物的帧时间
            //游戏时间倒计时过程
            game.timeFn.timerInterval = window.setInterval(function () {
                if (game.timeFn.num >= 1) {
                    game.timeFn.num--;
                    $time.text(game.timeFn.num + "S");
                    if (game.timeFn.num >= 50) {
                        game.goalStep = 5;
                    }
                    else if (game.timeFn.num  >= 40) {
                        game.goalStep = 10;
                    }
                    else if (game.timeFn.num  >= 30) {
                        game.goalStep = 15;
                    }
                    else if (game.timeFn.num  >= 20) {
                        game.goalStep = 20;
                    }
                    else {
                        game.goalStep = 25;
                    }

                } else {
                    window.clearInterval(game.timeFn.timerInterval);
                    window.clearInterval(game.timeMove);
                    game.over();
                    $("#sound")[0].pause();
                }
            }, 1000);
        }
    },
    readyShoot:function () {
        clearInterval(game.propsInterval);
        clearInterval(game.moveInterval);
        game.moveT = this.moveInitT;
        $move.css({top:game.moveT});
        game.propsJSON = ["props_01.png", "props_02.png", "props_03.png", "props_04.png"];
        $move.addClass("props").find("img").attr("src", "img/38/" + game.propsJSON[parseInt(Math.random() * 10) % 4]);     //更新道具
        $move.css({"-moz-transform":"rotate(0deg)", "-webkit-transform":"rotate(0deg)"});
        $canvas.show();
    },

    //目标物自动闪避
    goalAutoDuck:function () {
        var i = game.goalStep;
        game.goalInterval = setInterval(function () {
            game.goalAttr.left = game.goalAttr.left + i;
            if (game.goalAttr.left >= game.goalAttr.r) {
                i = -game.goalStep;
            }
            if (game.goalAttr.left <= game.goalAttr.l) {
                i = game.goalStep;
            }
            $goal.css({left:game.goalAttr.left});
        }, game.goalDuration);
    },

    start:function () {
        $("section").hide();
        $("#game").show();
        $("#fixAd").hide();
        game.timeFn.init();       //开始计时
        game.readyShoot();      //预备炮弹
        game.goalAutoDuck();      //循环躲避
        $move.css({left:game.moveAttr.left, top:game.moveAttr.top });
        $female.css({left:game.moveAttr.left - 40, top:game.moveAttr.top - 18});
        $canvas.off("click").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            //console.log("click:" + game.shootCan);
            if(game.shootCan == "no"){
            //    console.log("nonononono");
            }else{
            //    console.log("yesyesyesyes");
                game.shootCan = "no";
                game.moveL = e.pageX;
                game.moveInterval = setInterval(function () {
                    //    game.moveL += game.speedX;
                    game.moveL = game.moveL > game.moveWrap.l ? game.moveL : game.moveWrap.l;
                    game.moveL = game.moveL < game.moveWrap.r ? game.moveL : game.moveWrap.r;
                    game.moveT += game.speedY;
                    game.moveT = game.moveT > game.moveWrap.t ? game.moveT : game.moveWrap.t;
                    game.moveT = game.moveT < game.moveWrap.b ? game.moveT : game.moveWrap.b;
                    $move.css({top:game.moveT, left:game.moveL});
                    $female.css({ left:game.moveL - 40});
                    game.doCheckCollide();       //随时检测是否碰撞
                }, 6);
                var sdegree = 0;
                game.propsInterval = setInterval(function () {
                    sdegree += 10;
                    var srotate = "rotate(" + sdegree + "deg)";
                    $move.css({"-moz-transform":srotate, "-webkit-transform":srotate});
                }, 5);
            }

        });
    },
    reStart:function(){
        window.location.reload();
    },
    over:function () {
        jackyFn.loadingFn("yes");

        clearInterval(game.goalInterval);
        clearInterval(game.propsInterval);
        clearInterval(game.moveInterval);
        $canvas.hide();
        var _score = $score.text();
        var _goalName = $("#maleName").text();
        $("#result .userDiv .pPic img").attr("src", readerFn.headPic);
        $("#result .userDiv .pName").html(readerFn.userName);
        $("#result .pScore").html(_score);
        $("#result .tips .word b").text(_goalName);
        $("#result .prizeDiv p").html(game.resultFn(_goalName,_score));
        myWeixinFn.data.link = "http://www.itsabutterfly.com/activity/women2014/share.html?id="+readerFn.gameid + "&score="+_score + "&fromid=" + __fromid;
        myWeixinFn.data.desc = myWeixinFn.data.title = $("#result .prizeDiv p").text();
        //提交分数
        var _url = "http://admin.itsabutterfly.com/2/activity/Default/set_praise?id="+readerFn.gameid+"&openid="+readerFn.userid+"&amount="+_score+"&jsonp=?";
        $.getJSON(_url,function(d){
            if(d.result=="success"){
                console.log("分数提交成功！");
                $("section").hide();
                $("#result .rstBox").slideDown();
                $("#result").fadeIn();
                $("#fixAd").show();
            }else{
                alert("对不起，分数提交无效，请遵循游戏规则！");
            }
        });
        setTimeout(function(){
            jackyFn.loadingFn("no");
        },500);
    },
    //初始值设定
    init:function () {
        jackyFn.loadingFn("yes");
        //生成一个游戏回话，得到游戏id
        console.log(__subid,__fromid);
        var _url = "http://admin.itsabutterfly.com/2/activity/Default/add_activity_sub_simple?id=10&openid="+readerFn.userid+"&username="+escape(readerFn.userName)+"&head="+escape(readerFn.headPic)+"&content="+ $("#maleName").text()+"&subid="+__subid +"&fromid="+__fromid +"&jsonp=?";
        $.getJSON(_url,function(d){
                readerFn.gameid = d.data;
                if(d.result == "success"){
                    //    alert("新建游戏会话中……" + _url);
                    game.timeMove = null;
                    game.moveInitL = 175;   //默认位置
                    game.moveInitT = $("body").height() - $female.height() + 18;
                    game.moveL = game.moveInitL;
                    game.moveT = game.moveInitT;
                    game.speedX = 0;
                    game.speedY = -5;
                    game.moveAttr = {"left":game.moveL, "top":game.moveT, "width":30, "height":30};
                    game.goalAttr = {"left":147, "top":10, "width":58, "height":76 };
                    game.moveWrap = {"l":0, "r":280, "t":0, "b":300};
                    game.collideTotal = 0;       //碰撞次数
//允许的误差，默认为球的半径
                    game.deviation = 1;
//定义小球的移动范围
                    game.moveWrap.r = $("body").width() - $move.width();
                    game.moveWrap.b = $("body").height() - $move.height();
//定义障碍物的移动范围
                    game.goalAttr.l = 0;
                    game.goalAttr.r = $("body").width() - $goal.width();
                    game.goalAttr.t = 0;
                    game.goalAttr.b = $("body").height() - $goal.height();
//设定一个目标物
                    $goal.css({left:game.goalAttr.left, top:game.goalAttr.top, width:game.goalAttr.width, height:game.goalAttr.height});
//生成canvas
                    $("#fixAd").hide();
                    $("section").hide();
                    $("#game").fadeIn();
                    $intro.fadeIn();
                    setTimeout(function(){
                        $canvas.attr("width", $("body").width()).attr("height", $("body").height());
                        $intro.attr("width", $("body").width()).attr("height", $("body").height());
                        jackyFn.loadingFn("no");
                    },500);
                }
            });
    }
};

//排行榜
var rankingFn = {
    close:function(){
        $("#ranking").slideUp();
        jackyFn.filterAbs("no",$("body"),"filterAbs_ranking");
    },
    open:function(){
        $("#ranking").slideDown();
        jackyFn.filterAbs("yes",$("body"),"filterAbs_ranking");
        rankingFn.data();
    },
    myScroll:null,
    scrollFn:function(){
        var T = this;
        T.myScroll = new iScroll("rankingList", {
            hScrollbar:false,
            vScrollbar:true,
            bounce:true,
            fixedScrollbar:true,
            checkDOMChanges:true,
            useTransform:false,
            onRefresh:function () {},
            onScrollMove:function () { },
            onScrollEnd:function () {}
        });
        T.myScroll.refresh();
    },
    data:function(){
        //获得排名
        $.getJSON("http://admin.itsabutterfly.com/2/activity/Default/get_praise_list?actid=10&num=20&page=1&jsonp=?",function(d){
            console.log(d);
            var _html = '',_list = d.data;
            for(var i= 0;i< _list.length; i++){
                var _pic = _list[i].f_head !=""&&_list[i].f_head!=undefined?_list[i].f_head:"share.jpg";
                var _orderPic= 'img/38/num/'+_list[i].rowno+'.png';
                var _goalName = _list[i].f_content;
                var _score = _list[i].f_praise;
                var _msg = game.resultFn(_goalName,_score);
                _html += '<li><div class="liTop"><div class="order">'+_list[i].rowno+'</div><div class="image"><label><img src='+_pic+'></label></div><div class="name">'+unescape(_list[i].f_username)+'</div><div class="score">'+_score+' 分</div></div>' +
                    '<div class="liBody prizeDiv"><p>'+_msg +'</p></div></li>';
            }
            $("#ranking .listDiv ul").html(_html);
            $("#ranking .listDiv ul li .liTop .image").on("touchend",function(){
                var _idx = $("#ranking .listDiv ul li .liTop .image").index(this);
                var $currLi = $("#ranking .listDiv ul li");
                $currLi.find(".liBody").hide();
                $currLi.eq(_idx).find(".liBody").show();
            });
        });
    }
};
// 判断是否登录，如果已经登录则进入游戏，如果没有，则跳出授权页面，成功之后自动进入游戏页面
var gameLogin = {
    inFn:function () {
        if ( $("#txtGoalName").val() == "" ) {
            $("#txtGoalName").focus().addClass("txtStyleActive");
            alert("请写填写达令的名字哦！");
            return;
        }
        if ($.cookie("isLogin") == "true") {
            $("#maleName").html($("#txtGoalName").val());
            $("#female b img").attr("src",readerFn.headPic);
            setTimeout(function(){
                game.init();
            },600);
        }else{
            if(window.navigator.userAgent.indexOf("MicroMessenger") != -1){        //微信浏览器
                var _hash = "loginyes" +"__"+ $("#txtGoalName").val() +"__" + readerFn.userid ;
                var _urlForm = window.location.search.indexOf("?") != -1 ? window.location.href + "&#"+_hash+"":window.location.href + "#"+_hash+"" ;
                window.location.href = readerFn.authUrlWeixin + "&url=" + escape(_urlForm);
            }else {
                $("#maleName").html($("#txtGoalName").val());
                $("#female b img").attr("src",readerFn.headPic);
                setTimeout(function(){
                    game.init();
                },600);
            }
        }
    },
    outFn:function () {
        $.getJSON("http://admin.itsabutterfly.com/butterfly/index.php?r=Login/LoginOut&jsonp=?", function (data) {
            if (data.result == "success") {
                console.log("退出成功！")
            } else {
                ////console.log("退出失败！")
            }
        });
    }
};
var myWeixinFn = weixinFn;
myWeixinFn.data.desc = myWeixinFn.data.title= "女生节来当一次女神吧，女神提出的条件男人怎么能拒绝？";
myWeixinFn.data.img_url = "http://www.itsabutterfly.com/activity/women2014/share.jpg";
myWeixinFn.data.link = "http://www.itsabutterfly.com/activity/women2014/index.html" + window.location.search;
weixinFn.init();


//全局的用户信息或者登录授权状态
var readerFn = {
    isLogin:false,
    headPic:"",
    authUrlWeixin:"",
    userName:"",
    init:function () {
        $.getJSON("http://admin.itsabutterfly.com/butterfly/index.php?r=user/Reader&jsonp=?&_" + Math.random(),function (data) {
            if (data.authstate == "true") { //授权成功
            //    $("#test").show().html(JSON.stringify(data));
                /*if( Number(readerFn.userid) == 515 || Number(readerFn.userid) == 370){
                    alert(JSON.stringify(data));
                }*/
                $.cookie("isLogin", "true");
                readerFn.headPic = data.headimg;
                readerFn.userid = data.userid;
                readerFn.userName = data.nickname;
                $(".aWeixin").addClass("aGo");
                var _arr = (window.location.hash).split("__");
                $("#test").html( _arr[0] + " " + unescape(_arr[1]) );
                if ( _arr[0] == "#loginyes" ) {        //表示正在授权登录后回来的，可以直接进去游戏，
                    $("#txtGoalName").val(unescape(_arr[1]));     //表示自动填充带过去的达令名称
                    $("#maleName").html( $("#txtGoalName").val() );
                    $("#female b img").attr("src",readerFn.headPic);
                    setTimeout(function(){
                       game.init();                        //因为先判断的达令名字，才去授权的。所以这里不需要再判断
                    },555);
                }
            } else {
                $.cookie("isLogin", "false");
                readerFn.headPic = null;
                readerFn.userName = null;
            }
            readerFn.authUrlWeixin = data.authUrlWeixin;
        }).error(function (err) {
                console.log(err);
            });
    }
};

//user
var userFn = {
    data:function(gameid,score){
        $.getJSON("http://admin.itsabutterfly.com/2/activity/Default/get_activity_sub?id="+gameid+"&jsonp=?",function(d){
            if(d.result == "success"){
                var _goalName = d.jsonEcho.data.f_content !="" &&  d.jsonEcho.data.f_content !=undefined &&  d.jsonEcho.data.f_content !=null ? d.jsonEcho.data.f_content:"匿名";
             //临时读取URL上的分数，待后台完善好功能，可以直接读取数据库保存的游戏分数
             //   var _score = d.jsonEcho.data.f_praise ;
                var _score = score ;
                var _userName = unescape(d.jsonEcho.data.f_username) ;
                var _userPic = d.jsonEcho.data.f_head ;
                $("#share .userDiv .pPic img").attr("src", _userPic);
                $("#share .userDiv .pName").html(_userName);
                $("#share .userDiv .pScore").html(_score);
                $("#share .prizeDiv p").html(game.resultFn(_goalName,_score));
            }else{
                window.location.href = "index.html" + window.location.search;
            }
        });
    },
    init:function(){
        var _gameid = $G("id");
        var _score = $G("score");
        if(_gameid == ""){
            window.location.href = "index.html" ;
        }else{
            this.data(_gameid,_score);
        }
    }
};
//结果分析
game.resultFn = function(_goalName,_score){
    var _goalName = unescape(_goalName);
    var _json = [
        {score:"0-9", msg:"我晕，不是吧，您一分也没有得到？快请<b>" + _goalName + "</b>来帮忙吧！" },
        {score:"10-50", msg:"女神不做家务，" + _goalName + "要承担洗碗拖地擦窗户的任务"},
        {score:"60-100", msg:"女神工作了一天，<b>" + _goalName + "</b>还不来帮女神马杀机，必须肩颈，后背，大腿一条龙服务" },
        {score:"110-150", msg:"女神都是浪漫的，<b>" + _goalName + "</b>安排烛光晚餐，要有蜡烛、月亮、红酒和玫瑰花哦" },
        {score:"160-200", msg:"<b>" + _goalName + "</b>要陪女神逛街，女神逛多久就要陪多久，要什么就得买什么，不许喊累，不许心疼钱" },
        {score:"210-100000", msg:"<b>" + _goalName + "</b>安排一次海岛之旅，女神就会给你比基尼的福利哦" }
    ];
    var i = 0,_content;
    while (i < 6) {
        var _form = parseInt(_json[i].score.split("-")[0]);
        var _to = parseInt(_json[i].score.split("-")[1]);
        if (_score >= _form && _score <= _to ) {
            _content = _json[i].msg;
            break;
        } else {
            i++;
        }
    }
    return _content;
};

//DOM 模块分段加载
var domFn = {
    init:function(){
        $("#popHtml").load("data.html?_" + Math.random(),function(){
            $canvas = $("#canvas"), //用作事件触发对象
                $female = $("#female"), //移动物的对象
                $move = $("#propsId"), //移动物的对象
                $goal = $("#male"), //被击打的对象
                $intro = $("#game .intro") , //游戏介绍层对象
                $score = $("#score") , //输出有效得分的对象
                $time = $("#game .time label");     //输出有效时间的对象
            $canvas.attr("width", $("body").width()).attr("height", $("body").height());
            $intro.attr("width", $("body").width()).attr("height", $("body").height());
            if(checkPlatform() == "ipad" || checkPlatform() == "ipod" || checkPlatform() == "iphone"  ){
                $("#game").on('touchmove', function (e) {
                    e.preventDefault();
                }, false);
                rankingFn.scrollFn();
            }else{
                $win.on('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            }
        });
    }
};
//横竖屏的判断
function orientationChange(){
    if (window.orientation == 90 || window.orientation == -90) {      //横屏
        $("#popScreenH").show();
        jackyFn.filterAbs("yes", $("body"), "fiterAbs_popScreenH", {
            zIndex:999
        });
    } else {
        $("#popScreenH").hide();
        jackyFn.filterAbs("no", $("body"), "fiterAbs_popScreenH");
        var _h = $win.height()>416?$win.height():416;
        $("body").height(_h);

        if($canvas.length>0){
            $canvas.attr("width", $win.width()).attr("height", $win.height());
            $intro.attr("width", $win.width()).attr("height", $win.height());
        }

    }
}


window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);

$(function () {
    $("body").append('<div class="popScreenH" id="popScreenH"></div>');         //出现横屏遮罩，提示用户竖屏浏览
    orientationChange();

    $(document).on("blur","#txtGoalName",function(e){
        e.preventDefault();
        $.cookie("goalName",$("#txtGoalName").val());
    });
    $(document).on("touchend",".aRanking",function(e){
        e.preventDefault();
        rankingFn.open();
    });
    $(document).on("touchend",".aReplay",function(e){
        e.preventDefault();
        window.location.href = "index.html";
    });
    $(document).on("touchend",".aWeixin",function(e){
        e.preventDefault();
        gameLogin.inFn();
    });
    $(document).on("touchend",".aBack",function(e){
        e.preventDefault();
        rankingFn.close();
    });
    $(document).on("touchend","#game .intro",function(e){
        e.stopPropagation();
        $intro.hide();
        setTimeout(function(){
            game.start();
        },500);
    });
    $(document).on("touchend","#index .time",function(e){
        e.stopPropagation();
        gameLogin.outFn();
    });

    $(document).on("click","#fixAd .aImg",function(e){
        e.preventDefault();
        var _prarm = $G("id");
        BfCodeBaX("women_" + _prarm);
         setTimeout(function () {
            window.location.href = "http://e.cn.miaozhen.com/r.gif?k=1010699&p=3zVRj0&ro=sm&ae=1000440&rt=2&ns=[M_ADIP]&ni=[M_IESID]&na=[M_MAC]&o=http://www.itsabutterfly.com/activity/benzaclass/?ref=women2014" + "";
         }, 500);
    });
    $(document).on("click","#fixAd .aClose",function(e){
        e.preventDefault();
        $("#fixAd").hide();
    });
    jackyFn.loadingFn("yes");
    if(window.orientation == 0 ){
        setTimeout(function(){
            setTimeout(function(){
                __subid = $G("id");
                __fromid = $G("fromid");
                if(window.location.pathname.indexOf("share.html")!= -1){
                    userFn.init();
                }else{
                    $("#txtGoalName").val("");
                    readerFn.init();
                    jackyFn.loadingFn("no");
                }
                jackyFn.loadingFn("no");
            },1000);
            jackyFn.loadingFn("no");
        },1000);
    }else{
        if(window.orientation == undefined){
            setTimeout(function(){
                __subid = $G("id");
                __fromid = $G("fromid");
                if(window.location.pathname.indexOf("share.html")!= -1){
                    userFn.init();
                }else{
                    $("#txtGoalName").val("");
                    readerFn.init();
                    jackyFn.loadingFn("no");
                }
                jackyFn.loadingFn("no");
            },1000);
        }else{
            alert("什么情况？"+window.orientation);
        }
    }


    domFn.init();
});

