var store = require('store')
import * as ajaxUtil from './util/Ajax.js'
import * as Url from './util/Url.js'
export function configRouter (router) {
  // normal routes
    router.map({
	     "/login":{
		    name:"login",
		    component:require('./components/Login.vue'),
	    },
	    "/":{
		       component: require('./components/Main.vue'),
		       subRoutes: {
					    '/': {
	                        component: require('./components/Index.vue')
	                    },
					    "/index":{
							  name:'index',
						      component: require('./components/Index.vue')
					    },
						 "/configList":{
							  name:'configList',
						      component: require('./components/ConfigList.vue')
					    },
						 "/configEdit":{
							  name:'configEdit',
						      component: require('./components/ConfigEdit.vue')
					    },
						 "/newApp":{
							  name:'newApp',
						      component: require('./components/NewApp.vue')
					    },
						"/newConfigFile":{
							  name:'newConfigFile',
						      component: require('./components/NewConfigFile.vue')
					    },
						"/newConfigItem":{
							  name:'newConfigItem',
						      component: require('./components/NewConfigItem.vue')
					    },
						"/zkInfo":{
							  name:'zkInfo',
						      component: require('./components/ZkInfo.vue')
					    }
					 
		        }
		        
	    },   
	   '*': {
	          component: require('./components/Index.vue')
	     }

    
  })

	router.beforeEach(function (transition) {
           ajaxUtil.doGet(Url.CHECK_LOGIN,null).then((xhr,response) => {
               if(response.success =="true"){
				   transition.next();
			   }else{
				     router.go({"path":"/login",append: false});
			       transition.next();
			   }
          });
   
	  
	})
}
