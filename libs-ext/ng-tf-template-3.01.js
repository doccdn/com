/*
Angular http function
 (c) 2018 Sharp Point Ltd. http://www.sharppoint.com.hk
 Author: Calvin Yeung 
 Contact: calvinyeung@sharppoint.com.hk
*/

/* Example：
<data-fresh-handle data-send="" data-close=""></data-fresh-handle>
db.testData = [{name: "第1個", icon: 0, result: "處理中"}, {name: "第2個", icon: 1, result: "成功"}, {name: "第3個", icon: 2, result: "錯誤"}, {name: "第4個", icon: 3, result: "異常"}];
db.testSet ={title: "處理執行結果", data: db.testData, size: "small", icon: false, done: false, doneText: "全部处理完成", closeText: "關閉", closeFn: null};
$scope.sendHandle(db.testSet);
*/
var freshHandle = function($timeout){
	return {
		restrict: 'E',
		templateUrl: 'template/ng-tf-handle-1.01.html', 
		scope:{
			send: "@"
			, close: "@"
		},
		link: function($scope, $elem, $attrs, ngModel) {
			$scope.sendHandle = $scope.$parent[$scope.sendHandle || "sendHandle"] = function(handleData){
				$scope.msgIcon = ["tf-load", "tf-icon-success", "tf-icon-fail", "tf-icon-tips"];
				$scope.handleData = handleData || {};
			}

			$scope.closeHandle = $scope.$parent[$scope.closeHandle || "closeHandle"] = function(){
				if($scope.handleData.closeFn){
					$scope.handleData.closeFn();
				}
				$scope.handleData = false;
			}
			
		}
	}
}

/* Example：
 * <data-fresh-message data-send="msg" data-close="msg"></data-fresh-message>
 * msg.sendMessage()
 * msg.closeMessage()
 */
var freshMessage = function($timeout){
	return {
		restrict: 'E',
		templateUrl: 'template/ng-tf-message-1.01.html', 
		scope:{
			send: "@"
			, close: "@"
		},
		link: function($scope, $elem, $attrs, ngModel) {
			$scope.closeMessage = $scope.$parent[$scope.closeMessage || "closeMessage"] = function(fn, data){
				$scope.message = false;
				$timeout.cancel($scope.closeTime);
				if(fn){
					fn(data);
				}
			}

			$scope.sendMessage = $scope.$parent[$scope.sendMessage || "sendMessage"] = function(con, title, style, option){
				if($scope.message){
					$scope.closeMessage($scope.cancelBtn? $scope.cancelBtn.callback: null, $scope.cancelBtn? $scope.cancelBtn.data: null);
					$scope.msgLoad = true; //外層庶罩
					$timeout(function(){
						$scope.msgLoad = false;
						$scope.sendMessage(con, title, style, option);
					}, 300);
					return;
				}
				//mini, small, large, huge, full
				var styleBasic = {top: true, topColour: "gray", topClose: true, conColour: "black", conCircle: false, conClose: true, conText: "center", lastRight: false, bottom: true, bottomColour: "black", bodyCover: true, cover: true, size: "small", iconType: "icon", icon: false,  iconSize: "img", time: 3800, ad: null};
				var confirmBtn = {text: "確認", callback: null, data: null, style: "blue2"};
				var cancelBtn = {text: false, callback: null, data: null, style: "gray1"};
				var middleBtn = {text: false, callback: null, data: null, style: "blue2"};
				$scope.message = { con: (Array.isArray(con)? con: [con]), title: title || "系統提示"};
				$scope.msgIcon = ["success", "fail", "tips", "wait"];
				style = style? style: "tips";
				option = option || {};
				option.iconType =  option.iconType && option.iconType == "load"? "load": "icon";
				
				//console.log("con", con);
				var msgStyle = {
					result :{ top: false, topClose: false, conCircle: true, conClose: false, bottom: false, size: "mini", icon: 0, iconSize: "img" } //僅大圖示和內容
					, tips :{ top: false, topClose: false, conClose: false } //無標題、無關閉圖示，全透黑
					, tipsClose :{ top: false, topClose: false, conColour: "blue", bottomColour: "white", cover: false} //無標題、有關閉圖示，藍身、白底
					, msg :{ topClose: false, conColour: "blue", conClose: false, bottomColour: "blue", cover: false} //有標題、無關閉圖示，灰頂、藍身、藍底
					, msgClose :{ conColour: "white", conClose: false, bottomColour: "white", cover: false}  //有標題、有關閉圖示，灰頂、白色、白底
					, common :{ conColour: "white", conClose: false, bottomColour: "white", cover: false, iconSize: "img", time: 0}  //有標題、有關閉圖示，灰頂、白色、白底
					, ad: { top: false, conClose: true, conColour: "white", bottomColour: "white", cover: false, size: "ad", time: 0 } //無標題, 有關閉圖示，白色、白底
				}
				confirmBtn.text = style == "common"? "知道了": confirmBtn.text;
				
				$scope.msgStyle = Object.assign(styleBasic, msgStyle[style], option);
				$scope.confirmBtn = Object.assign(confirmBtn, option.confirmBtn || {});
				$scope.middleBtn = Object.assign(middleBtn, option.middleBtn || {});
				$scope.cancelBtn = option.cancelBtn && typeof(option.cancelBtn) == "object"?Object.assign(cancelBtn, option.cancelBtn): (option.cancelBtn === true? {text: "取消", callback: $scope.closeMessage, data: null, style: "gray1"}: cancelBtn);
				$scope.btnSize = $scope.confirmBtn.text && $scope.middleBtn.text && $scope.cancelBtn.text?"tf-fit-normal": "";
				
				if($scope.msgStyle.time > 0){
					$scope.closeTime = $timeout(function(){
						$scope.message = false;
						$timeout.cancel($scope.closeTime);
					}, $scope.msgStyle.time)
				}

			}
		}
	}
}

/* Example：
 * <form class="dqForm" name="from" data-ng-submit="" data-ng-if="fromConfig">
 * <data-fresh-form data-form-config="fromConfig" data-form-set="from" data-form-obj="fromObj" ></data-fresh-form>
 * </form>
 */
var freshForm = function(){
	return {
		restrict: 'E',
		scope:{
			formConfig: "="
			, formSet: "="
			, formObj: "="
		},
		templateUrl: 'template/ng-tf-from-1.01.html', 
		link: function($scope, $elem, $attrs, ngModel) {
		}
	}
}

/* Example：
 * <data-fresh-easy-form data-send="" data-boxSize="large" ></data-fresh-easy-form>
 */
var freshEasyForm = function(fnService){
	return {
		restrict: 'E',
		scope:{
			send: "@"
			, boxSize: "@"
		},
		templateUrl: 'template/ng-tf-easy-form-1.01.html', 
		link: function($scope, $elem, $attrs, ngModel) {
			var fn = $scope.fn = fnService;
			$scope.closeFrom = $scope.$parent[$scope.closeFrom || "closeFrom"] = function(fnuc, form, obj){
				delete $scope.easyForm;
				if(typeof(fnuc) == "function"){
					fnuc(form, obj);
				}
			}

			$scope.sendFrom = $scope.$parent[$scope.sendFrom || "sendFrom"] = function(opt, easyData, formItem, confirmBtn, cancelBtn){
				var option = {title: "填写资料", size: "large"};
				var confirmButtton = {text: "提交", fn: null};
				var cancelButtton = {text: "取消", fn: null};
				$scope.easyData = easyData;
				$scope.easyForm = {};
				$scope.easyForm.formItem = formItem;
				$scope.easyForm.option = Object.assign(option, opt || {});
				$scope.easyForm.confirmBtn =  confirmBtn === false? false: Object.assign(confirmButtton, confirmBtn || {});
				$scope.easyForm.cancelBtn = cancelBtn === false? false: Object.assign(cancelButtton, cancelBtn || {});
			}
			
		}
	}
}

angular.module('themeFresh', ['ngFunc'])
	.directive('freshMessage', freshMessage)
	.directive('freshHandle', freshHandle)
	.directive('freshForm', freshForm)
	.directive('freshEasyForm', freshEasyForm)
	;
	
