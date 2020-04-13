/*
Javascript pattem
 (c) 2018 Sharp Point Ltd. http://www.sharppoint.com.hk
 Author: Calvin Yeung 
 Contact: calvinyeung@sharppoint.com.hk
*/

	/**
	 * 通用格式
	 * 不可空格 不能換行
	 */
	var REGEX_WORD = /^((?!.*(select|update|delete|insert|union|trancate|char|substr|ascii|declare|exec|count|master|into|grant|create|alter|drop|execute|like|values|where|from|alert|java|script|eval|window|href|history)\b)+[^\s]+){0,}$/;//通用

	/**
	 * 通用格式
	 * 可空格 不行換行
	 */
	var REGEX_CHAR = /^((?!.*(select|update|delete|insert|union|trancate|char|substr|ascii|declare|exec|count|master|into|grant|create|alter|drop|execute|like|values|where|from|alert|java|script|eval|window|href|history)\b)+.+){0,}$/;//通用 可空格
	
	/**
	 * 通用格式
	 * 可空格 可換行
	 */
	var REGEX_BLOG = /^((?!.*(select|update|delete|insert|union|trancate|char|substr|ascii|declare|exec|count|master|into|grant|create|alter|drop|execute|like|values|where|from|alert|java|script|eval|window|href|history)\b)+[\s\S]*){0,}$/;//通用  可空格 可换行
	
	var REGEX_PRODUCT = /^[a-zA-Z0-9\.]{1,20}$/;
	
	/**
	 * 用戶User ID
	 * 可使用＿＠.-符號
	 */
	var REGEX_USER_ID = /^[A-Za-z0-9_@\.\-]{2,16}$/;
		
	/**
	 * 用戶密碼 
	 * 不可中文，不可空格
	 */
	var REGEX_PASSWORD = /^((?!.*(select|update|delete|insert|union|trancate|char|substr|ascii|declare|exec|count|master|into|grant|create|alter|drop|execute|like|values|where|from|alert|java|script|eval|window|href|history|[\u4e00-\u9fa5])\b)+[^\s]+){2,16}$/;

	var REGEX_NAME = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{2,60}$/;
		
	/**
	 * 中國手機號碼
	 * 寬鬆，開頭可加0
	 */
	var REGEX_MOBLIE_CHINA = /(0)?(1)[0-9]{10}/;
	
	/**
	 * 香港手機號碼
	 * 寬鬆
	 */
	var REGEX_MOBLIE_HK = /^[0-9]{8}$/;
	
	/**
	 * 通用手機號碼
	 * 寬鬆
	 */
	var REGEX_MOBLIE = /^(\+)?[0-9]{6,24}$/;
	
	/**
	 * 通用電話號碼
	 * 寬鬆，可區號符號-
	 */
	var REGEX_PHONE = /^(\+)?([0-9]{1,20}\-)*[0-9]{1,20}$/;
	
	var REGEX_MAIL = /\w[_\-\.\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	
	var REGEX_QQ = /^[0-9]{5,18}$/;
	
	/**
	 * 中國身份證
	 * 寬鬆
	 */
	var REGEX_ID_NO_CHINA = /(^\d{18}$)|(^\d{15}$)/;
	
	/**
	 * 香港身份證
	 * 寬鬆
	 */
	var REGEX_ID_NO_HK = /(^[A-Za-z]{1,2}[0-9]{6}(\(){1}[0-9A-Za-z]{1}(\)){1}$)/;
	
	/**
	 * 逍用證件號碼
	 * 寬鬆
	 */
	var REGEX_ID_NO = /^[A-Za-z0-9()_\-]{6,20}$/;
	
	/**
	 * 資料庫、資料表、字段
	 * 限英數和符號-_
	 */
	var REGEX_DB_NAME = /^[a-zA-Z0-9_\-]{1,}$/;
	
	var REGEX_BOOLEAN = /^(0|1|true|false)$/;
	
	//var REGEX_URL = /http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?/;
	
	var REGEX_URL =  /^((https|http|ftp|rtsp|mms)?:\/\/)?[^\s]+/;
	
	var REGEX_PATH = /^([a-zA-Z0-9_@:\-\.\/\\\u4e00-\u9fa5]){1,}$/;
	
	var REGEX_IP = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
    
	var REGEX_CH = /^[\u4e00-\u9fa5]{0,}$/;
	
	var REGEX_CH_EXCLUDE = /^(?!.*([\u4e00-\u9fa5]))+/;
	
	/**
	 * 金額、浮點數值
	 * 整數或浮點數，可負數，可範圍
	 */
	var REGEX_FLOAT = /^(\-)?([1-9]\d*.\d*)|(0.\d*[1-9]\d*)|([0-9]\d*)$/;
	
	/**
	 * 數值
	 * 限數字
	 */
	var REGEX_NUM = /^[0-9]{0,}$/;
	
	/**
	 * 數值
	 * 限數值，可負數，可範圍
	 */
	var REGEX_RANGE = /^[0-9\-]{0,}$/;
	
	var REGEX_RANGE_INT = /^[0-9\-]{0,11}$/;
	
	var REGEX_RANGE_LONG = /^[0-9\-]{0,19}$/;
	
	var REGEX_ENG = /^[a-zA-Z]{0,}$/;
	
	var REGEX_ENG_NUM = /^[a-zA-Z0-9]{0,}$/;
	
	var REGEX_ENG_NUM_ARRAY = /^[a-zA-Z0-9\,]{0,}$/;
	
	var REGEX_ENG_NUM_CONCAT = /^[a-zA-Z0-9_\-\,\:\=]{0,}$/;
	
	var REGEX_COMMON = /^([\u4e00-\u9fa5]|[A-Za-z0-9]){0,}$/;
	
	var REGEX_COMMON_CONCAT = /^([\u4e00-\u9fa5]|[A-Za-z0-9_\-\,\:\=]){0,}$/;
	
	/**
	 * 時分 / 時分秒
	 * e.g. 2359
	 * e.g. 23:59
	 * e.g. 235959
	 * e.g. 23:59:59
	 */
	var REGEX_TIME = /^[0-2][0-9]([:]?)[0-5][0-9]((([:]?)[0-5][0-9])?)$/;
	
	/**
	 * 月日
	 * e.g. 0930
	 * e.g. 09-30
	 * e.g. 09/30
	 */
	var REGEX_DATE = /^[0-1][0-9]((\-|\/)?)[0-3][0-9]$/;
	
	/**
	 * 年月日
	 * e.g. 19920930
	 * e.g. 1992-09-30
	 * e.g. 1992/09/30
	 */
	var REGEX_DAY = /^[1-2][0-9][0-9][0-9]((\-|\/)?) [0-1][0-9]((\-|\/)?) [0-3][0-9]$/;
	
	/**
	 * 年月
	 * e.g. 199209
	 * e.g. 1992-09
	 * e.g. 1992/09
	 */
	var REGEX_MONTH = /^[1-2][0-9][0-9][0-9]((\-|\/)?) [0-1][0-9]$/;
	
	/**
	 * 年
	 * e.g. 1992
	 */
	var REGEX_YEAR = /^[1-2][0-9][0-9][0-9]$/;
	
	/**
	 * 完整時間
	 * e.g. 199209302359
	 * e.g. 1992-09-30 23:59
	 * e.g. 1992/09/30 23:59
	 * e.g. 19920930235959
	 * e.g. 1992-09-30 23:59:59
	 * e.g. 1992/09/30 23:59:59
	 */
	var REGEX_TIMESTAMP = /^[1-2][0-9][0-9][0-9]((\-|\/)?) [0-1][0-9]((\-|\/)?) [0-3][0-9]([\s]?)[0-2] [0-9]([:]?)[0-5][0-9]((([:]?)[0-5][0-9])?)$/;

	//var REGEX_SQL_CMD = "^((.+\s)|()|(\s))(((select|update|delete|insert|union|trancate|char|substr|ascii|declare|exec|count|master|into|grant|create|alter|drop|execute|like|values|where|from|alert|java|script|eval|window|href|history)(\s){1})\b)+.*$/;
			
			
			
			
			
	