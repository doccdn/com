	
	var addPageFocusEvent = function(fn, delay){
		var hiddenProperty = 'hidden' in document? 'hidden': 'webkitHidden' in document? 'webkitHidden': 'mozHidden' in document ?'mozHidden': null;
		var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
		document.addEventListener(visibilityChangeEvent, function(){
			var visibility = !document[hiddenProperty];
			if(typeof fn == "function"){
				delay = delay || 2000;
				if(delay > 0){
					setTimeout(function(){
						fn(visibility);
					}, delay);
				}else{
					fn(visibility);
				}
			}
		});
	}
	