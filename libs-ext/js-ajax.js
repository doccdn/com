 (function(w, n) {
	w[n] = ajax = {
		"paramUrl": function(obj){
			if(!obj || typeof(obj) != "object"){
				return "";
			}
			var param = [];
			var objKeys = Object.keys(obj);
			for(var i = 0; i < objKeys.length; i++){
				if(obj[objKeys[i]] != "undefined" &&  typeof obj[objKeys[i]] != "null" && obj[objKeys[i]] != null){
					param[i] = objKeys[i] + "=" + encodeURIComponent(obj[objKeys[i]]);
				}
			}
		
			return param.length > 0? param.join("&"): "";
		}
		, "xmlhttp": function(successFn, failFn){
			var xmlhttp;
			if(typeof XMLHttpRequest != 'undefined'){
				xmlhttp = new XMLHttpRequest();
			}else if(typeof ActiveXObject != 'undefined'){
			   	var versions = ['Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'MSXML.XMLHTTP'];
				for(var i=0; i<versions.length; i++) {
					try {
						xmlhttp = new ActiveXObject(versions[i]);
						if(xmlhttp) {
							break;
						}
					} catch(e) {
						//alert(e.message);
					}
				}
			} 
			
			if(xmlhttp){
				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState == 4){
						if(xmlhttp.status == 200){
							if(typeof successFn == 'function'){
								var response = "";
								try{
									var type = typeof xmlhttp.getResponseHeader == 'function'? xmlhttp.getResponseHeader('Content-type'): false;
									if(type && type.indexOf('xml') !== -1 && xmlhttp.responseXML) {
										response = xmlhttp.responseXML;
									}else if(type && type.indexOf('application/json') !== -1) {
										try{
											response = JSON.parse(xmlhttp.responseText);
										}catch(e){
											response = xmlhttp.responseText;
					   					}
									}else{
										response = xmlhttp.responseText;
									}
								}catch(e){
								}
								successFn(response);
							}
						}else if(typeof failFn == 'function'){
					    	failFn(xmlhttp.responseText)
					    }
						//console.log(xmlhttp.responseText);
				    }
				}
			}
			return xmlhttp;
		}
		, "get": function(url, params, successFn, failFn, async){
			var paramUrl = ajax.paramUrl(params);
			xmlhttp = ajax.xmlhttp(successFn, failFn);
			
			try{
				xmlhttp.open("GET", url + (paramUrl == ""? "": "?" + paramUrl) , async === false? false: true);
				xmlhttp.send();
			}catch(e){
			}
			
		}
		, "post": function(url, data, requestBody, successFn, failFn, async){
			var paramUrl = ajax.paramUrl(data);
			xmlhttp = ajax.xmlhttp(successFn, failFn);
			
			try{
				xmlhttp.open("POST", url, async === false? false: true);
				if(requestBody === true){
					var str = JSON.stringify(data);
					xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
					xmlhttp.send(str);	
				}else{
					xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlhttp.send(paramUrl == ""? null: paramUrl);
				}
			}catch(e){
			}
		}
	}
}) (window, "ajax");	
 


 