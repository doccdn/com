/*
Angular common function
 (c) 2018 Sharp Point Ltd. http://www.sharppoint.com.hk
 Author: Calvin Yeung 
 Contact: calvinyeung@sharppoint.com.hk
*/

/*
onloaded()
loading(Boolean lock)
getErrorMsg(Model ctrl, String name?, Object list?)
getErrorType(Model ctrl)
formReset(From form, Object keyObj?, Boolean clear?)
isFormError(form, setDirty)
getElems(String selector)
*/

(function () {
	var apiFactory = function($timeout, $q, $http, fnService, dbFactory){
		var fn = fnService;
		var db = dbFactory;
		var api = {loading: false, locked: false, thread: 0, load: 0};
		
		api.basicOpt = { retry: 0, maxRetry: 5, setLock: true, setLoading: true, loadIcon: true, view: true, callback: null, config: null};
		
		api.callback = function(result, config, opt){
			//fn.log("Api callback -- url, [opt, config, result] => ", config.url, [opt, config, result]);
			if(opt && opt.callback && typeof(opt.callback) == "function"){
				opt.callback(result, config, opt);
			}
			api.thread = api.thread > 0? api.thread - 1: 0;
			if(api.thread == 0){
				api.locked = false;
			}
			if(opt && opt.loadIcon){
				api.load = api.load > 0? api.load - 1: 0;
				if(api.load == 0){
					fn.getElems(".ngFunc-loading").css("display", "none");
				}
			}
			api.loading = false;
		};
		
		api.error = function(response, config, opt, resolve, reject){
			if(opt.retry < opt.maxRetry){
				api.http(config, Object.assign(opt, { retry: (opt.retry + 1) })).then(resolve, reject);
				return;
			}
			api.callback({result: "error", error: response}, opt);
			reject({result: "error", error: response});
		};
		
		api.canSubmit = function(form){
			if(api.locked || obj.formError === true || (!!form && fn(form, true))){
				return false;
			}
			return true;
		}
		
		api.get = function(url, params, opt){
			return api.http({url: url, method: "GET", params: params}, opt, params); //application/x-www-form-urlencoded
		}
		
		api.post = function(url, params, opt){
			return api.http({url: url, method: "POST", data: JSON.stringify(params)}, opt, params); //application/json
		} 
		
		api.put = function(url, params, opt){
			return api.http({url: url, method: "PUT", data: JSON.stringify(params)}, opt, params); //application/json
		}
		
		api.del = function(url, params, opt){
			return api.http({url: url, method: "DELETE", params: params}, opt, params); //application/x-www-form-urlencoded
		}
		
		api.upload = function(url, elemId, opt){
			var form = new FormData();
            form.append('file', document.getElementById(elemId).files[0]);
			return api.http({url: url, method: "POST", data: form, headers: {"Content-Type": undefined}, transformRequest: angular.identity}, opt); //multipart/form-data
		}
		
		api.jsonp = function(url, params, opt){
			params = params? params: {};
			params.callback = "JSON_CALLBACK";
			return api.http({url: url, method: "JSONP", params: params}, opt, params); // return $_GET[callback]."(".json_encode($data).")"
		}
		
		api.http = function(config, currOpt, params){
			currOpt = Object.assign(api.basicOpt, currOpt && typeof(currOpt) == "object"? currOpt: {});
			currOpt.params = Object.assign({}, params || {});
			config = currOpt.config? Object.assign(config, currOpt.config): config;
			
			api.loading = true;
			api.locked = true;
			
			if(api.loading && currOpt.loadIcon){
				fn.getElems(".ngFunc-loading").css("display", "block");
				api.load++;
			}
			api.thread++;

			return $q(function(resolve, reject){
				$http(config).then(function(response){
					if(response.status != 200){
						api.error(response, config, currOpt, resolve, reject)
						return;
					}
					var result = response.data && response.data.result? response.data: Object.assign(response.data || {}, {result: "success"});
					api.view(result, currOpt);
					api.callback(result, config, currOpt);
					resolve(result);
				}, function(error){
					api.error(error, config, currOpt, resolve, reject)
				});
			});
		}

		return api;
	}
	
	var dbFactory = function(){
		var db = {};
		return db;
	}
	
	var fnService = function($timeout){
		var self = this;
		
		this.h = {};
		
		if(js){
			self.js = js;
		}
		
		self.lock = false;
		
		self.log =  function(m, o){
			console.log(m, typeof(o) == "undefined"? "": o);
		}
		
		self.addFn = function(n, f, r){
			self[n] = f;
			self.h[n] = r;
		}
		
		self.onloaded = function(){
			self.getElems(".ngFunc-onload").removeClass("ngFunc-onload");
			self.getElems(".ngFunc-onload-hide").removeClass("ngFunc-onload-hide");
			self.getElems(".ngFunc-loading").css("display", "none");
		}
		
		self.loading = function(lock){
			if(lock === false){
				self.lock = false;
				self.getElems(".ngFunc-loading").css("display", "none");
			}else if(lock === true){
				self.lock = true;
				self.getElems(".ngFunc-loading").css("display", "block");
			}
			return self.lock;
		}
		
		self.getErrorMsg = function(ctrl, name, list){
			if(ctrl && ctrl.$invalid){
				var basic = { required:  "內容必需填寫" , minlength: "內容過短", maxlength: "內容過長", pattern: "內容格式不符"};
				var msgList = list? Object.assign(basic, list): basic;
				var type = Object.keys(ctrl.$error)[0];
				return msgList[type]? (name? name: "") + msgList[type]: (name? name: "") + ("内容未有正确填写");
			}
			return "";
		}
	
		self.getErrorType = function(ctrl){
			if(ctrl){
				var value = ctrl.$modelValue || ctrl.$viewValue;
				if(!!value && value != ""){
					ctrl.$dirty = true;
					ctrl.$touched = true;
				}
				if(!!ctrl && ctrl.$dirty && ctrl.$touched && ctrl.$invalid){
					return Object.keys(ctrl.$error)[0];
				}
				return null;
			}
		}

		self.formReset = function(form, keyObj, clear){
			if(!!form && form.$setPristine && form.$setUntouched){
				form.$setPristine();
				form.$setUntouched();
			}
			if(!!keyObj){
				for(x in keyObj){
					if(!!form[x]){
						if(clear !== false){
							form[x].$modelValue = "";
							form[x].$viewValue = "";
						}
						form[x].$dirty = false;
						form[x].$touched = false;
					}
				}
			}
		}
		
		self.isFormError = function(form, setDirty){
			if(form && form.$invalid){
				if(!!setDirty && setDirty == true){
					for(var error in form.$error){
						for(var index in form.$error[error]){
								form.$error[error][index].$dirty = true;
								form.$error[error][index].$touched = true;
						}
					}
				}
				return true;
			}
			return !form;
		}
		
		self.getElems = function(selector){
			return angular.element(document.querySelectorAll(selector));
		}
	}
	
	
	var changeFunc = function(){
		return {
			require: 'ngModel',
			scope:{
				changeFunc: "="
			},
			link: function($scope, $elem, $attrs, ngModel) {
				$elem.bind('change', function() {
					if($scope.changeFunc && typeof $scope.changeFunc == 'function'){
						var value = ngModel.$modelValue || ngModel.$viewValue;
						$scope.changeFunc(value);
					}
				});
			}
		}
	}
	
	var getLen = function(){
		return function(input){
			if(!input){
				return 0;
			}
			if(Array.isArray(input)){
				return input.length;
			}else if(typeof(input) == "object"){
				return Object.keys(input).length;
			}else{
				return input.length;
			}
		}
	}


	
	angular.module('ngFunc', [])
		.factory('apiFactory', apiFactory)
		.factory('dbFactory', dbFactory)
		.service('fnService', fnService)
		.directive('changeFunc', changeFunc)
		.filter("getLen", getLen)
		;
		
})();


