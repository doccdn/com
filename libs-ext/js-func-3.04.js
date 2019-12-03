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
		console.log(m, typeof(o) == "undefined"? "": o);
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
	
	var getBasePath = function(){
		return window.location.protocol + "//" + window.location.host;
	}
	
	var getMs = function(d){
		return (!d? new Date(): d).getTime();
	}
	
	var getWindowHeight = function(){
		if(document.compatMode == "CSS1Compat"){
			return document.documentElement.clientHeight;
		}else{
			return document.body.clientHeight;
		}
	}
	
	var getScrollTop = function(){
		var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
		if(!!document.body){
			bodyScrollTop = document.body.scrollTop;
		}
		if(!!document.documentElement){
			documentScrollTop = document.documentElement.scrollTop;
		}
		return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	}
	
	var getScrollHeight = function(){
		var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
		if(!!document.body){
			bodyScrollHeight = document.body.scrollHeight;
		}
		if(!!document.documentElement){
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	}
	
	var isScrollBottom = function(){
		if(getScrollTop() + getWindowHeight() + 60 >= getScrollHeight()){
			return true;
		}else{
			return false;
		}
	}
	
	var scrollReset = function(){
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
	
	var getRnd = function(before, end){ 
		return before + Math.floor(Math.random() * (end - before));   
	}
	
	var getRndStr = function(len, mode){ //长度, 大写
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
	
	var display = function(elemId) {
		if (document.getElementById(elemId)){
			if (document.getElementById(elemId).style.display == 'none') {
				document.getElementById(elemId).style.display = '';
			} else {
				document.getElementById(elemId).style.display = 'none';
			}
		}
	}
	
	var hide = function(elemId) {
		if(document.getElementById(elemId)) document.getElementById(elemId).style.display = 'none';
	}
	
	var show = function(elemId) {
		if(document.getElementById(elemId)) document.getElementById(elemId).style.display = 'block';
	}
	
	var fadeOut = function(elemId, speed, opacity) {
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
	
	var fadeIn = function(elemId, speed, opacity) {
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
	
	var getLen = function(obj){
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
	
	var toArray = function(obj){
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
	
	var isInArray = function(obj, value, checkKey){
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
	
	var isInArrayStr = function(str, value){
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
	
	var getIndex = function(obj, value){
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
	
	var getNumList = function(before, end){
		before = Math.ceil(before);
		end = Math.ceil(end);
		var nums = [];
		for(var i = before; i <= end;i++){
			nums[i] = i;
		}
		return nums;
	}
	
	var regex = function(data, pattem, min, max){
		if((!!min && data.length < min) || (!!max && data.length > max)){
			return false;
		}
		var re = new RegExp(pattem);
		return re.test(data);
	}
	
	var isEmpty = function(value){ 
		return value && value != null && value >= 0 && value != "";	
	}
	
	var getCookie = function(n, d, c){
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
	
	var setCookie = function(n, v, s){
		var expireDate = new Date();
		v = typeof v == 'object'? JSON.stringify(v): v;
		if(s == 0){
			document.cookie=n + "=" +escape(v) + ";path=/";
			return;
		}
		expireDate.setTime(expireDate.getTime() + ( (s || 60 * 60 * 24 * 365) * 1000));
		document.cookie=n + "=" +escape(v) + ((expireDate==null)?"":";expires="+expireDate.toGMTString()) + ";path=/";
		
	}
	
	var delCookie = function(n){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		var cval = this.getCookie(n, null);
		if(cval !=null){
			document.cookie= n + "="+cval+";expires="+expireDate.toGMTString();
		}
	}
	
	var getParams = function(){
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
	
	var getParam = function(n, d){
		var params = getParams();
		return params[n] || d; 
	}
	
	var getParamUrl = function(url, srcObj, addParams){
		var obj = cloneObj(srcObj);
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

	var cloneObj = function(obj) {
		if(!obj){
			return obj;
		}
		if(Array.isArray(obj) && Object.keys(obj).length > 0){
			var o = [];
			for (var i = 0; i < obj.length; i++) {
				o.push(cloneObj(obj[i]));
			}
			return o;
		}
		if(typeof obj == "object" && Object.keys(obj).length > 0){
			var o = {};
			for (var j in obj) {
				o[j] = cloneObj(obj[j]);
			}
			return o;
		}
		return obj;
	}
	
	var merge = function (target, source)  {
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
	
	var getVar = function(name){
		return eval(name);
	}
	
	var getWeek = function(date){
		var date2=new Date(date.getFullYear(), 0, 1);
		var day1=date.getDay();
		if(day1==0) day1=7;
		var day2=date2.getDay();
		if(day2==0) day2=7;
		d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
		return Math.ceil(d /7)+1;
	}
	
	var monthCalc = function(add){
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
	
	var decimal = function(amount, num){
		var amount = new Number(amount);
		return amount.toFixed(num);
	}
	
	var getDateTime = function(ms){
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
	
	var urlEncode = function(data, js){
		 return js? window.escape(data): window.encodeURIComponent(data);
	}
	
	var urlDecode = function(data, js){
		 return js? window.unescape(data): window.decodeURIComponent(data);
	}
	
	var ceil = function(num){
		return !!num? Math.ceil(num): 0;
	}
	
	var floor = function(num){
		return !!num? Math.floor(num): 0;
	}
	
	var watchFunc = function(obj, keys, fn){
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
	
	var run = function(f, args){
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
	
	
	fn("getBasePath", getBasePath, 'getBasePath() => 獲取網址');
	fn("getMs", getMs, 'getMs(Date d?) => 獲取毫秒');
	fn("getWindowHeight", getWindowHeight, 'getWindowHeight() => 獲取窗口高度');
	fn("getScrollTop", getScrollTop, 'getScrollTop() => 獲取滾動條高度');
  	fn("getScrollHeight", getScrollHeight, 'getScrollHeight() => 獲取文檔總高度');
	fn("isScrollBottom", isScrollBottom, 'isScrollBottom() => 滾動條是否到達底部');
	fn("scrollReset", scrollReset, 'scrollReset() => 恢復滾動條高度');
	fn("getRnd", getRnd, 'getRnd(int before, int end) => 獲取範圍隔機數(不包含end)');
	fn("getRndStr", getRndStr, 'getRndStr(int len, int mode?) => 獲取隨機字串，已排除難識別英文，mode默認0(0=大寫, 1=小寫, 2=大小寫, 3=大小寫全, 4=大小寫全和=/+)');
	fn("display", display, 'display(Elem id) => 隱藏顯示物件');
	fn("hide", hide, 'hide(Elem id) => 隱藏物件');
	fn("show", show, 'show(Elem id) => 顯示物件');
	fn("fadeOut", fadeOut, 'fadeOut(Elem id, int speed?, int opacity?) => 物件淡出，speed默認值200，opacity默認值0');
	fn("fadeIn", fadeIn, 'fadeIn(Elem id, int speed?, int opacity?) => 物件淡入，speed默認值200，opacity默認值100');
	fn("getLen", getLen, 'getLen(Obj obj) => [] 或 {} 或 字串 > 數量');
	fn("toArray", toArray, 'toArray(Obj obj) => [] 或 {} 或 字串 > 數組');
	fn("isInArray", isInArray, 'isInArray(Obj obj, Obj value, Boolean checkKey?) (數組或對象，尋找值，是否檢查數組和對象的鍵) => ["aaa", "bbb"] 或 {bbb:"aaa", aaa:"bbb"} => 鍵或值是否包含值 => [aaa = true]');
	fn("isInArrayStr", isInArrayStr, 'isInArrayStr(String str, Obj value) => aaa,bbb => 組合是否包含值 => [aaa=true]');
	fn("getIndex", getIndex, 'getIndex(Obj obj, Obj value) => ["aaa","bbb"] 或 {name:"aaa", "name2":"bbb"} => 值在數組或對象的排序，0起步 => [bbb=1]');
	fn("getNumList", getNumList, 'getNumList(int start, int end) => 0.1-3.8 => 獲取before至end的數值數組，向上取捨，包含before和end => [[0, 1, 2, 3, 4]]');
	fn("regex", regex, 'regex(String data, String pattem, int lenMin?, int lenMax?) => 驗證格式，返回true符合格式');
	fn("isEmpty", isEmpty, 'isEmpty(String value) => 驗證無效格式，返回true為無效格式 (非NULL，大於或等於0，非空字串)');
	fn("getCookie", getCookie, 'getCookie(String n, Obj d?) (鍵，默認值) => 獲取設定Cookie的JSON對像,沒有默認值可能返回null');
	fn("setCookie", setCookie, 'setCookie(String n, Obj v, int s?) (鍵，值，過期秒數) => 設定Cookie為JSON字串,默認1年過期,0代表關閉瀏覽器即過期 ');
	fn("delCookie", delCookie, 'delCookie(String n) (鍵) => 刪除Cookie');
	fn("getParam", getParam, 'getParam(String n, Obj d?) (鍵，默認值) => 獲取url參數');
	fn("getParams", getParams, 'getParams() () => 獲取url params對象');
	fn("getParamUrl", getParamUrl, 'getParamUrl(Obj obj, Boolean addParams) => 獲取url params帶?');
	fn("cloneObj", cloneObj, 'cloneObj(Obj obj) => 克隆對像');
	fn("merge", merge, 'merge(Obj target, Obj source) => 合拼對像');
	fn("getVar", getVar, 'getVar(String name) => 獲取變量');
	fn("getWeek", getWeek, 'getWeek(date) => 獲取本年第幾周');
	fn("monthCalc", monthCalc, 'monthCalc(add) => 獲取月份的計算');
	fn("decimal", decimal, 'decimal(amount, num) => 保留小數點後');
	fn("getDateTime", getDateTime, 'getDateTime(Long ms?) => 獲取yyyy-MM-dd HH:mm:ss');
	fn("urlEncode", urlEncode, 'urlEncode(String data, Boolean js?) => 轉碼');
	fn("urlDecode", urlDecode, 'urlDecode(String data, Boolean js?) => 解碼');
	fn("ceil", ceil, 'ceil(int num) => 向上取整');
	fn("floor", floor, 'floor(int num) => 向下取整');
	fn("watchFunc", watchFunc, 'watchFunc(Object obj, String key, Function fnuc) (来源对象，来源键，函数) => 监听至有值执行');
	fn("run", run, 'run(Function f, Object args) (方法, 參數) => 執行方法');
	
}) (window, "js");	