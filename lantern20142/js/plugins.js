// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
var jackyFn = {
    aLink:function () {
        /*
         * 空链接BUG修复
         * 示例如下：jackyFn.aLink();
         * */
        $(".aLink").each(function () {
            $(this).attr("title", $(this).text()).addClass("aLinkStyle");
            $(this).click(function () {
                $(this).blur();
            })
        });
    },
    filterAbs:function (_do, _wrape, _id, property) {
        /*
         * 公共遮罩层的调用：
         * 示例如下：
         jackyFn.filterAbs("yes",$("body"),"filterAbs_domId",{  } );
         * */
        switch (_do) {
            case "yes":
                if (!$(".filterAbs").hasClass("active")) {
                    var _visiH = $(window, "html").height(), _abs = $("<div class='filterAbs' id='" + _id + "'></div>"), _cntH = $("#wrap");
                    _abs.appendTo(_wrape).height((_visiH > _cntH) ? _visiH : _cntH).addClass("active");
                }
                if (property) {
                    if (property.zIndex) {
                        $("#" + _id).css({zIndex:property.zIndex});
                    }
                    if (property.opacity) {
                        $("#" + _id).css({opacity:property.opacity});
                    }
                    if (property.background) {
                        $("#" + _id).css({background:property.background});
                    }
                }
                break;
            case "no":
                if (_id) {
                    $("#" + _id).fadeOut(function () {
                        $(this).remove();
                    });
                } else {
                    $(".filterAbs").fadeOut(function () {
                        $(this).remove();
                    });
                }
                break;
            default:
                alert('sorry');
                break
        }
    },
    lazyImgFn:function () {
        /*
         图片延迟加载
         用法：src变成original，且新增class为imgJs在图片上
         */
        $(".imgJs").lazyload({
            threshold:200,
            placeholder:"/img/o_loading.gif",
            effect:"fadeIn"
        });
    },
    preLoadImagesFn:function (f) {
        /*
         图片素材后台运行的公共方法，调用示例如下：
         arrImgSrc：一个图片路径的二维数组
         jackyFn.preLoadImagesFn({src:arrImgSrc,callbackFn:function(){

         }});
         */
        var imgs = f.src;
        var fnLoad = function (i) {
            var oImg = new Image();
            oImg.onload = function () {
                i++;
                if (i < imgs.length) {
                    fnLoad(i);
                } else {
                    try {
                        f.callbackFn();
                    } catch (e) {
                    }
                }
            };
            oImg.src = imgs[i];
        };
        fnLoad(0);
    },
    mobileBugs:function (obj) {
        //在没有关闭虚拟键盘就直接点击搜索按钮，出现的bug
        obj.css({"position":"relative"});
        setTimeout(function () {
            obj.css({"position":"fixed"});
        }, 500);
    },
    coming:function () {//敬请期待的公共浮层
        var _popHtml = '<div class="popTip" id="popTip"><div class="closeDiv"><a href="javascript:void(0);">×</a></div><div class="boxBody">敬请期待</div></div>';
        $("#popHtml").html(_popHtml);
        jackyFn.filterAbs("yes", $("body"), "filterAbs_coming", {
            opacity:0.5
        });
        $("#popTip .closeDiv").unbind("click").bind("click", function () {
            $("#popTip").fadeOut();
            jackyFn.filterAbs("no", $("body"), "filterAbs_coming");
        });
    },
    loadingFn:function (_do) {  //页面正在loading的公共浮层
        /*
         页面正在loading的公共浮层，调用示例如下：
         显示浮层：jackyFn.loadingFn("yes")
         关闭浮层：jackyFn.loadingFn("no");
         */
        if (_do == "yes") {
            var _popHtml = '<div class="popLoading" id="popLoading" style="z-index: 1000;"> <div class="cnt"> <img src="/img/o_loading.gif">  正在加载……   </div>  </div>';
            $("#container").append(_popHtml);
            jackyFn.filterAbs("yes", $("#container"), "filterAbs_loading", {
                zIndex:999,
                opacity:1,
                background:"#F1F1F1"
            });
        } else {
            $(".popLoading").fadeOut(function () {
                $(".popLoading").remove();
                jackyFn.filterAbs("no", $("#container"), "filterAbs_loading");
            });
        }
    }
};
/*
 *
 * Find more about this plugin by visiting
 * http://alxgbsn.co.uk/
 *
 * Copyright (c) 2010-2012 Alex Gibson
 * Released under MIT license
 *
 */

(function (window, document) {

    function Shake() {

        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        //default velocity threshold for shake to register
        this.threshold = 15;

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof CustomEvent === "function") {
            this.event = new CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === "function") {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) { window.addEventListener('devicemotion', this, false); }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {

        if (this.hasDeviceMotion) { window.removeEventListener('devicemotion', this, false); }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {

        var current = e.accelerationIncludingGravity,
            currentTime,
            timeDifference,
            deltaX = 0,
            deltaY = 0,
            deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.threshold) && (deltaY > this.threshold)) || ((deltaX > this.threshold) && (deltaZ > this.threshold)) || ((deltaY > this.threshold) && (deltaZ > this.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > 1000) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {

        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    //create a new instance of shake.js.
    var myShakeEvent = new Shake();
    myShakeEvent && myShakeEvent.start();

}(window, document));

/*
 * 获取网址参数
 *
 */
function $G(){var Url=top.window.location.href;var u,g,StrBack='';if(arguments[arguments.length-1]=="#"){u=Url.split("#")}else{u=Url.split("?")}if(u.length==1){g=''}else{g=u[1]}if(g!=''){gg=g.split("&");var MaxI=gg.length;str=arguments[0]+"=";for(i=0;i<MaxI;i++){if(gg[i].indexOf(str)==0){StrBack=gg[i].replace(str,"");break}}}return StrBack}
function $DG(){var Url=window.location.href;var u,g,StrBack='';if(arguments[arguments.length-1]=="#"){u=Url.split("#")}else{u=Url.split("?")}if(u.length==1){g=''}else{g=u[1]}if(g!=''){gg=g.split("&");var MaxI=gg.length;str=arguments[0]+"=";for(i=0;i<MaxI;i++){if(gg[i].indexOf(str)==0){StrBack=gg[i].replace(str,"");break}}}return StrBack}
