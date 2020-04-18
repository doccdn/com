/*
Javascript common function
 (c) 2018 Sharp Point Ltd. http://www.sharppoint.com.hk
 Author: Calvin Yeung 
 Contact: calvinyeung@sharppoint.com.hk
*/

(function(w, n) {
	w[n] = js = function(){
		console.log("Js-common version1.0 is ready.");
	}
	
	if(typeof Object.assign != 'function'){
		Object.assign = function(target) {
			'use strict';
			/*if(target != null){
				throw new TypeError('Cannot convert undefined or null to object');
			}*/
			target = Object(target);
			for(var index = 1; index < arguments.length; index++){
				var source = arguments[index];
				if(source != null){
					for(var key in source){
			          if(Object.prototype.hasOwnProperty.call(source, key)){
			          	target[key] = source[key];
			          }
			       	}
				}
		   	}
			return target;
		};
	}
	
	if(!Object.keys){
	  Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = [
			  'toString',
			  'toLocaleString',
			  'valueOf',
			  'hasOwnProperty',
			  'isPrototypeOf',
			  'propertyIsEnumerable',
			  'constructor'
			],
			dontEnumsLength = dontEnums.length;
	
		return function (obj) {
		  if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
	
		  var result = [];
	
		  for (var prop in obj) {
			if (hasOwnProperty.call(obj, prop)) result.push(prop);
		  }
	
		  if (hasDontEnumBug) {
			for (var i=0; i < dontEnumsLength; i++) {
			  if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
			}
		  }
		  return result;
		}
	  })()
	};
	
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};
	
	var j = {};
	var h = {};
	
	js.log =  function(m, o){
		o = (typeof(o) == "undefined"? "": (Array.isArray(o)? o: [o]));
		console.log(m, o);
	}
	
	js.help = function(){
		js.log("Help:");
		var keys = Object.keys(h);
		for(var i = 0 ; i < keys.length ; i++){
			js.log(n +"." + h[keys[i]]);
		}
		js.log(n +".browser", js.browser);
	}
	
	var fn = function(n, f, r){
		js[n] = f;
		h[n] = r;
		return js;
	}
		
	js.browser = function(){
		var agent = navigator.userAgent;
		var app = navigator.appVersion;  
		return {   //移动终端浏览器版本信息  
			trident: agent.indexOf('Trident') > -1 //IE内核  
			, presto: agent.indexOf('Presto') > -1 //opera内核  
			, webKit: agent.indexOf('AppleWebKit') > -1 //苹果、谷歌内核  
			, gecko: agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') == -1 //火狐内核  
			, mobile: !!agent.match(/AppleWebKit.*Mobile.*/) //是否为移动终端  
			, ios: !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端  
			, android: agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1 //android终端或uc浏览器  
			, iPhone: agent.indexOf('iPhone') > -1 //是否为iPhone或者QQHD浏览器  
			, iPad: agent.indexOf('iPad') > -1 //是否iPad  
			, webApp: agent.indexOf('Safari') > -1 //是否web应该程序，没有头部与底部
			, language: (navigator.browserLanguage || navigator.language).toLowerCase()  
			, weixin: agent.indexOf('MicroMessenger') > -1 || typeof(navigator.wxuserAgent) !== "undefined" || typeof(WeixinJSBridge) !== "undefined"
			, weibo: agent.indexOf('WeiBo') > -1
			, qq: agent.indexOf('QQ') > -1
			, wap: !!agent.match(/AppleWebKit.*Mobile.*/) || !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1 || agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1 || agent.indexOf('MicroMessenger') > -1 || typeof(navigator.wxuserAgent) !== "undefined" || typeof(WeixinJSBridge) !== "undefined"
		};
	}();
	
	js.getBasePath = function(){
		return window.location.protocol + "//" + window.location.host;
	}
	
	js.getMs = function(d){
		return (!d? new Date(): d).getTime();
	}
	
	js.getWindowHeight = function(){
		if(document.compatMode == "CSS1Compat"){
			return document.documentElement.clientHeight;
		}else{
			return document.body.clientHeight;
		}
	}
	
	js.getScrollTop = function(){
		var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if(!!document.body){
			bodyScrollTop = document.body.scrollTop;
		}
		if(!!document.documentElement){
			documentScrollTop = document.documentElement.scrollTop;
		}
		return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	}
	
	js.getScrollHeight = function(){
		var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if(!!document.body){
			bodyScrollHeight = document.body.scrollHeight;
		}
		if(!!document.documentElement){
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	}
	
	js.isScrollBottom = function(){
		if(js.getScrollTop() + js.getWindowHeight() + 60 >= js.getScrollHeight()){
			return true;
		}else{
			return false;
		}
	}
	
	js.scrollReset = function(){
		j.resetScroll = setInterval(function(){
			var osTop = 0;
			if(!!document.documentElement && !!document.documentElement.scrollTop){
				osTop = document.documentElement.scrollTop;
			}else if(!!document.body){
				osTop = document.body.scrollTop;
			}
			var speed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			if(osTop == 0){
				clearInterval(j.resetScroll);
			}
		}, 30);
	}
	
	js.getRnd = function(before, end){ 
		return before + Math.floor(Math.random() * (end - before));   
	}
	
	js.getRndStr = function(len, mode){ //长度, 大写
		var upperCase = ['3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','W','X','Y'];
		var lowerCase =  ['3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','w','x','y'];
		var alls = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		var des = ['+', '=', '/','+', '=', '/','+', '=', '/'];
		var plan = [upperCase, lowerCase, upperCase.concat(lowerCase), alls, alls.concat(des)];
		var chars = plan[mode || 0];
		var res = "";
		 for(var i = 0; i < len ; i ++) {
			 var rnd = Math.ceil(Math.random()*(chars.length - 1));
			 res += chars[rnd];
		 }
		 return res;
	}
	
	js.display = function(elemId) {
		if (document.getElementById(elemId)){
			if (document.getElementById(elemId).style.display == 'none') {
				document.getElementById(elemId).style.display = '';
			} else {
				document.getElementById(elemId).style.display = 'none';
			}
		}
	}
	
	js.hide = function(elemId) {
		if(document.getElementById(elemId)) document.getElementById(elemId).style.display = 'none';
	}
	
	js.show = function(elemId) {
		if(document.getElementById(elemId)) document.getElementById(elemId).style.display = 'block';
	}
	
	js.fadeOut = function(elemId, speed, opacity) {
		var elem = document.getElementById(elemId);
		if(elem){
			j.hide = j.hide || {};
			var v = elem.style.filter.replace("alpha(opacity=", "").replace(")", "") || elem.style.opacity || 100;
			v < 1 && (v = v * 100);
			if(v > (opacity || 0) && (!j.hide[elemId] || j.hide[elemId] == false)){
				j.hide[elemId] = setInterval(function(){
					v--;
					if (v > (opacity || 0)) {
						elem.style.filter =  'alpha(opacity=' + v +')';
						elem.style.opacity = v / 100;
					} else {  
						clearInterval(j.hide[elemId]);  
						j.hide[elemId] = null;
					}  
				}, (speed || 200) / 100);
			}
		}
	}
	
	js.fadeIn = function(elemId, speed, opacity) {
		var elem = document.getElementById(elemId);
		if(elem){
			j.hide = j.hide || {};
			var v = elem.style.filter.replace("alpha(opacity=", "").replace(")", "") || elem.style.opacity || 100;
			v < 1 && (v = v * 100);
			if(v < (opacity || 100) && (!j.hide[elemId] || j.hide[elemId] == false)){
				j.hide[elemId] = setInterval(function(){
					v++;
					if (v < (opacity || 100)) {
						elem.style.filter =  'alpha(opacity=' + v +')';
						elem.style.opacity = v / 100;
					} else {  
						clearInterval(j.hide[elemId]); 
						j.hide[elemId] = null;
					}  
				}, (speed || 200) / 100);
			}
		}
	}
	
	js.getLen = function(obj){
		if(!obj){
			return 0;
		}
		if(Array.isArray(obj)){
			return obj.length;
		}else if(typeof(obj) == "object"){
			return Object.keys(obj).length;
		}else{
			return obj.length;
		}
	}
	
	js.toArray = function(obj){
		if(Array.isArray(obj)){
			return obj;
		}
		 if(typeof(obj) == "object"){
			var keys = Object.keys(obj);
			var a = [];
			for(var i = 0; i < keys.length; i++){
				a.push(obj[keys[i]])
			}
			return a;
		}
		
		return [obj];
	}
	
	js.isInArray = function(obj, value, checkKey){
		if(!obj || !value){
			return false;
		}
		if(Array.isArray(obj)){
			for(var i = 0; i < obj.length; i++){
				if(obj[i] == value){
					return true;
				}
				if(checkKey == true && i == value){
					return true;
				}
			}
		}else if(typeof(obj) == "object"){
			var keys = Object.keys(obj);
			for(var i = 0; i < keys.length; i++){
				if(obj[keys[i]] == value){
					return true;
				}
				if(checkKey == true && keys[i] == value){
					return true;
				}
			}
		}
		return false;
	}
	
	js.isInArrayStr = function(str, value){
		if(!!str){
			var array = str.split(",");
			for(var i = 0; i < array.length; i++){
				if(array[i] == value){
					return true;
				}
			}
		}
		return false;
	}
	
	js.getIndex = function(obj, value){
		if(Array.isArray(obj)){
			for(var i = 0; i < obj.length; i++){
				if(obj[i] == value){
					return i;
				}
			}
		}else if(typeof(obj) == "object"){
			var keys = Object.keys(obj);
			for(var i = 0; i < keys.length; i++){
				if(obj[keys[i]] == value){
					return i;
				}
			}
		}
		return -1;
	}
	
	js.getNumList = function(before, end){
		before = Math.ceil(before);
		end = Math.ceil(end);
		var nums = [];
		for(var i = before; i <= end;i++){
			nums[i] = i;
		}
		return nums;
	}
	
	js.regex = function(data, pattem, min, max){
		if((!!min && data.length < min) || (!!max && data.length > max)){
			return false;
		}
		var re = new RegExp(pattem);
		return re.test(data);
	}
	
	js.isEmpty = function(value){ 
		return value && value != null && value >= 0 && value != "";	
	}
	
	js.getCookie = function(n, d, c){
		var arr,reg=new RegExp("(^| )"+n+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			var r = unescape(arr[2]);
			var e;
			try{
				var j = JSON.parse(r);
				if(typeof j == 'object' && j){
					return j;
				}else{
					e = r? (r == "true"?true: r == "false"? false: r): d? d: null;
					return c?Number(e): e;
				}
			}catch(err){
				e = r? (r == "true"?true: r == "false"? false: r): d? d: null;
				return c?Number(e): e;
			}
		}else if(!!d){ 
			return c?Number(d): d;
		}
		return null;
	}
	
	js.setCookie = function(n, v, s){
		var expireDate = new Date();
		v = typeof v == 'object'? JSON.stringify(v): v;
		if(s == 0){
			document.cookie=n + "=" +escape(v) + ";path=/";
			return;
		}
		expireDate.setTime(expireDate.getTime() + ( (s || 60 * 60 * 24 * 365) * 1000));
		document.cookie=n + "=" +escape(v) + ((expireDate==null)?"":";expires="+expireDate.toGMTString()) + ";path=/";
		
	}
	
	js.delCookie = function(n){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		var cval = this.getCookie(n, null);
		if(cval !=null){
			document.cookie= n + "="+cval+";expires="+expireDate.toGMTString();
		}
	}
	
	js.getParams = function(){
		var url = window.location.toString();
		var start = url.indexOf("?");
		var params = {};
		url = url.substring(start);
		if (url.indexOf("?") != -1) { 
			var str = url.substr(1); 
			strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) {
				params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			} 
		} 
		return params; 
	}
	
	js.getParam = function(n, d){
		var params = getParams();
		return params[n] || d; 
	}
	
	js.getParamUrl = function(url, srcObj, addParams){
		var obj = js.cloneObj(srcObj);
		if(obj && addParams){
			obj = Object.assign(getParams(), obj);
		}
		if(!obj || typeof(obj) != "object" || Array.isArray(obj)){
			return url || "";
		}
		var param = [];
		var objKeys = Object.keys(obj);
		for(var i = 0; i < objKeys.length; i++){
			if(obj[objKeys[i]] != "undefined" &&  typeof obj[objKeys[i]] != "null" && obj[objKeys[i]] != null){
				param[i] = objKeys[i] + "=" + encodeURIComponent(obj[objKeys[i]]);
			}
		}
	
		return (url || "") + (param.length > 0? (!url || url.indexOf("?") == -1? "?": "&") + param.join("&"): "");
	}

	js.cloneObj = function(obj) {
		if(!obj){
			return obj;
		}
		if(Array.isArray(obj) && Object.keys(obj).length > 0){
			var o = [];
			for (var i = 0; i < obj.length; i++) {
				o.push(js.cloneObj(obj[i]));
			}
			return o;
		}
		if(typeof obj == "object" && Object.keys(obj).length > 0){
			var o = {};
			for (var j in obj) {
				o[j] = js.cloneObj(obj[j]);
			}
			return o;
		}
		return obj;
	}
	
	js.merge = function (target, source)  {
	    if (typeof target == "object" && typeof source == "object") {
	        for (const key in source) {
	            if (source[key] === null && (target[key] === undefined || target[key] === null)) {
	                target[key] = null;
	            } else if (source[key] instanceof Array) {
	                if (!target[key]) target[key] = [];
	                target[key] = target[key].concat(source[key]);
	            } else if (typeof source[key] == "object") {
	                if (!target[key]) target[key] = {};
	                this.merge(target[key], source[key]);
	            } else {
	                target[key] = source[key];
	            }
	        }
	    }
	    return target;
	}
	
	js.getVar = function(name){
		return eval(name);
	}
	
	js.getWeek = function(date){
		var date2=new Date(date.getFullYear(), 0, 1);
		var day1=date.getDay();
		if(day1==0) day1=7;
		var day2=date2.getDay();
		if(day2==0) day2=7;
		d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
		return Math.ceil(d /7)+1;
	}
	
	js.monthCalc = function(add){
		var date = new Date();
		var month = Number(date.getMonth()) + 1 + add;
		if(month < 1){
			month += 12;
		}
		if(month >12){
			month = month % 12;
		}
		return month;
	}
	
	js.decimal = function(amount, num){
		var amount = new Number(amount);
		return amount.toFixed(num);
	}
	
	js.getDateTime = function(ms){
		var date = new Date();
		if(!!ms){
			date.setTime(ms);
		}
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y+M+D+h+m+s;
	}
	
	js.urlEncode = function(data, js){
		 return js? window.escape(data): window.encodeURIComponent(data);
	}
	
	js.urlDecode = function(data, js){
		 return js? window.unescape(data): window.decodeURIComponent(data);
	}
	
	js.ceil = function(num){
		return !!num? Math.ceil(num): 0;
	}
	
	js.floor = function(num){
		return !!num? Math.floor(num): 0;
	}
	
	js.watchFunc = function(obj, keys, fn){
		var keyList = Array.isArray(keys)? keys: [keys];
		for(x in keyList){
			if(typeof(obj[keyList[x]]) =="undefined"){
				$timeout(function(){
					js.watchFunc(obj, keys, fn);
				}, 200)
				return;
			}
		}
		fn();
	}
	
	js.run = function(f, args){
		if(typeof(f) == "function"){
			return f.apply(this, args);
		}else if(typeof(f) == "string"){
			try{
				return eval(f).apply(this, args);
			} catch(err) {
			}
			return f;
		}else{
			return f;
		}
	}
	
	
}) (window, "js");	