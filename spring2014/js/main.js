//内容模型
var shareData = {
    imgUrl:"http://www.itsabutterfly.com/activity/spring2014/img/urlImg.jpg",
    imgWidth:"600",
    imgHeight:"600",
    link:window.location.href,
    desc:"",
    title:""
};
function $cookie(name, value, options) {
		if (typeof value != 'undefined') {
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
				} else {
					date = options.expires
				}
				expires = '; expires=' + date.toUTCString()
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
		} else {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break
					}
				}
			}
			return cookieValue
		}
}
// 分享
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "img_url":shareData.imgUrl,
        "img_width":shareData.imgWidth,
        "img_height":shareData.imgHeight,
        "link":shareData.link,
        "desc":shareData.desc,
        "title":shareData.title
    }, function (res) {
        _report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url":shareData.imgUrl,
        "img_width":shareData.imgWidth,
        "img_height":shareData.imgHeight,
        "link":shareData.link,
        "desc":shareData.desc,
        "title":shareData.title
    }, function (res) {
        _report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content":shareData.title,
        "url":shareData.link
    }, function (res) {
        _report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
try {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            shareFriend();
        });
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            shareTimeline();
        });
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            shareWeibo();
        });
        WeixinJSBridge.call('hideToolbar');
    }, false);
} catch (err) {

}