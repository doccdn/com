/*
Javascript common function
 (c) 2018 Sharp Point Ltd. http://www.sharppoint.com.hk
 Author: Calvin Yeung 
 Contact: calvinyeung@sharppoint.com.hk
*/

(function(w, n) {
	w[n] = js = {};
	
	if(typeof Object.assign != 'function'){
		Object.assign = function(target) {
			'use strict';
			target = Object(target);
			for(js.index = 1; index < arguments.length; index++){
				js.source = arguments[index];
				if(source != null){
					for(js.key in source){
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
		js.hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
			dontEnumsLength = dontEnums.length;
	
		return function (obj) {
		  if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
	
		  js.result = [];
		  for (js.prop in obj) {
			if (hasOwnProperty.call(obj, prop)) result.push(prop);
		  }
		  if (hasDontEnumBug) {
			for (js.i=0; i < dontEnumsLength; i++) {
			  if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
			}
		  }
		  return result;
		}
	  })()
	};
	
	String.prototype.hashCode = function() {
		js.hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};
	
	js.j = {};
	
	js.log =  function(m, o){
		o = (typeof(o) == "undefined"? "": (Array.isArray(o)? o: [o]));
		console.log(m, o);
	}
		
	js.browser = function(){
		js.agent = navigator.userAgent;
		js.app = navigator.appVersion;  
		return {
			trident: agent.indexOf('Trident') > -1 //IE Core
			, presto: agent.indexOf('Presto') > -1 //Opera Core 
			, webKit: agent.indexOf('AppleWebKit') > -1 //Apple Core
			, gecko: agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') == -1 //Firefox Core
			, mobile: !!agent.match(/AppleWebKit.*Mobile.*/) //Moblie
			, ios: !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //IOS
			, android: agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1 //Android or UC
			, iPhone: agent.indexOf('iPhone') > -1 //iPhone or QQ HD Browser
			, iPad: agent.indexOf('iPad') > -1 //iPad  
			, webApp: agent.indexOf('Safari') > -1 //Safari
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
		js.scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if(!!document.body){
			bodyScrollTop = document.body.scrollTop;
		}
		if(!!document.documentElement){
			documentScrollTop = document.documentElement.scrollTop;
		}
		return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	}
	
	js.getScrollHeight = function(){
		js.scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if(!!document.body){
			bodyScrollHeight = document.body.scrollHeight;
		}
		if(!!document.documentElement){
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	}
	
	js.isScrollBottom = function(){
		if(getScrollTop() + getWindowHeight() + 60 >= getScrollHeight()){
			return true;
		}else{
			return false;
		}
	}
	
	js.scrollReset = function(){
		j.resetScroll = setInterval(function(){
			js.osTop = 0;
			if(!!document.documentElement && !!document.documentElement.scrollTop){
				osTop = document.documentElement.scrollTop;
			}else if(!!document.body){
				osTop = document.body.scrollTop;
			}
			js.speed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			if(osTop == 0){
				clearInterval(j.resetScroll);
			}
		}, 30);
	}
	
	js.getRnd = function(before, end){ 
		return before + Math.floor(Math.random() * (end - before));   
	}
	
	js.getRndStr = function(len, mode){ //0=upperCase, 1=lowerCase, 3=both, 4=allWords, 5=allWordsAndSymbol
		js.upperCase = ['3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','W','X','Y'];
		js.lowerCase =  ['3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','w','x','y'];
		js.alls = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		js.des = ['+', '=', '/','+', '=', '/','+', '=', '/'];
		js.plan = [upperCase, lowerCase, upperCase.concat(lowerCase), alls, alls.concat(des)];
		js.chars = plan[mode || 0];
		js.res = "";
		 for(js.i = 0; i < len ; i ++) {
			 js.rnd = Math.ceil(Math.random()*(chars.length - 1));
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
		js.elem = document.getElementById(elemId);
		if(elem){
			j.hide = j.hide || {};
			js.v = elem.style.filter.replace("alpha(opacity=", "").replace(")", "") || elem.style.opacity || 100;
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
		js.elem = document.getElementById(elemId);
		if(elem){
			j.hide = j.hide || {};
			js.v = elem.style.filter.replace("alpha(opacity=", "").replace(")", "") || elem.style.opacity || 100;
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
			js.keys = Object.keys(obj);
			js.a = [];
			for(js.i = 0; i < keys.length; i++){
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
			for(js.i = 0; i < obj.length; i++){
				if(obj[i] == value){
					return true;
				}
				if(checkKey == true && i == value){
					return true;
				}
			}
		}else if(typeof(obj) == "object"){
			js.keys = Object.keys(obj);
			for(js.i = 0; i < keys.length; i++){
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
			js.array = str.split(",");
			for(js.i = 0; i < array.length; i++){
				if(array[i] == value){
					return true;
				}
			}
		}
		return false;
	}
	
	js.getIndex = function(obj, value){
		if(Array.isArray(obj)){
			for(js.i = 0; i < obj.length; i++){
				if(obj[i] == value){
					return i;
				}
			}
		}else if(typeof(obj) == "object"){
			js.keys = Object.keys(obj);
			for(js.i = 0; i < keys.length; i++){
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
		js.nums = [];
		for(js.i = before; i <= end;i++){
			nums[i] = i;
		}
		return nums;
	}
	
	js.regex = function(data, pattem, min, max){
		if((!!min && data.length < min) || (!!max && data.length > max)){
			return false;
		}
		js.re = new RegExp(pattem);
		return re.test(data);
	}
	
	js.empty = function(value){ 
		return value && value != null && value >= 0 && value != "";	
	}
	
	js.getCookie = function(n, d, c){
		js.arr,reg=new RegExp("(^| )"+n+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			js.r = unescape(arr[2]);
			js.e;
			try{
				js.j = JSON.parse(r);
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
		js.expireDate = new Date();
		v = typeof v == 'object'? JSON.stringify(v): v;
		if(s == 0){
			document.cookie=n + "=" +escape(v) + ";path=/";
			return;
		}
		expireDate.setTime(expireDate.getTime() + ( (s || 60 * 60 * 24 * 365) * 1000));
		document.cookie=n + "=" +escape(v) + ((expireDate==null)?"":";expires="+expireDate.toGMTString()) + ";path=/";
		
	}
	
	js.delCookie = function(n){
		js.expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		js.cval = this.getCookie(n, null);
		if(cval !=null){
			document.cookie= n + "="+cval+";expires="+expireDate.toGMTString();
		}
	}
	
	js.getParams = function(){
		js.url = window.location.toString();
		js.start = url.indexOf("?");
		js.params = {};
		url = url.substring(start);
		if (url.indexOf("?") != -1) { 
			js.str = url.substr(1); 
			strs = str.split("&"); 
			for(js.i = 0; i < strs.length; i ++) {
				params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			} 
		} 
		return params; 
	}
	
	js.getParam = function(n, d){
		js.params = getParams();
		return params[n] || d; 
	}
	
	js.getParamUrl = function(url, srcObj, addParams){
		js.obj = cloneObj(srcObj);
		if(obj && addParams){
			obj = Object.assign(getParams(), obj);
		}
		if(!obj || typeof(obj) != "object" || Array.isArray(obj)){
			return url || "";
		}
		js.param = [];
		js.objKeys = Object.keys(obj);
		for(js.i = 0; i < objKeys.length; i++){
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
			js.o = [];
			for (js.i = 0; i < obj.length; i++) {
				o.push(cloneObj(obj[i]));
			}
			return o;
		}
		if(typeof obj == "object" && Object.keys(obj).length > 0){
			js.o = {};
			for (js.j in obj) {
				o[j] = cloneObj(obj[j]);
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
		js.date2=new Date(date.getFullYear(), 0, 1);
		js.day1=date.getDay();
		if(day1==0) day1=7;
		js.day2=date2.getDay();
		if(day2==0) day2=7;
		d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
		return Math.ceil(d /7)+1;
	}
	
	js.monthCalc = function(add){
		js.date = new Date();
		js.month = Number(date.getMonth()) + 1 + add;
		if(month < 1){
			month += 12;
		}
		if(month >12){
			month = month % 12;
		}
		return month;
	}
	
	js.decimal = function(amount, num){
		js.amount = new Number(amount);
		return amount.toFixed(num);
	}
	
	js.getDateTime = function(ms){
		js.date = new Date();
		if(!!ms){
			date.setTime(ms);
		}
		js.Y = date.getFullYear() + '-';
		js.M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		js.D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		js.h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		js.m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		js.s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
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
		js.keyList = Array.isArray(keys)? keys: [keys];
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