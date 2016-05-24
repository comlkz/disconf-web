
import qwest from 'qwest'
import libbase64 from 'libbase64'
var store = require('store')
export function decodeContent(content){
	return  libbase64.decode(content).toString("UTF-8");
	
}
export function doGet(url,params){    
	
	var config={cache:true};
	if(params == null){
		params = {};
	}
	
    return qwest.get(url,params);
}
export function doPost(url,params){

	var config={cache:true};
	if(params == null){
		params = {};
	}
	return qwest.post(url,params);
}

export function doPost(url,params,config){

	var config={cache:true};
	if(params == null){
		params = {};
	}
	return qwest.post(url,params,config);
}

export function doPut(url,params){
	
	return qwest.put(url,params);
}

export function doPut(url,params,config){
	
	return qwest.put(url,params,config);
}

export function doDel(url){
	
	return qwest.delete(url);
}

export function doError(obj,self){
	if(obj.status == 5){
		store.remove('user');
        self.$router.go({"path":"/login"});
	}
	if(obj.status == 400){
		return "系统异常";
	}
}

