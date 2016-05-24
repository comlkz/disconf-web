<template>
<div class="navbar">
    <div class="navbar-inner">
        <div class="navbar-container">
            <!-- Navbar Barnd -->
            <div class="navbar-header pull-left">
                <a href="#" class="navbar-brand">
                    <h4>
                       Disconf
                    </h4>
                </a>
            </div>
            <!-- /Navbar Barnd -->

          
            <!-- /Sidebar Collapse -->
            <!-- Account Area and Settings -->
            <div class="navbar-header pull-right">
                <div class="navbar-account">
                    <ul class="account-area">
                        <li :class="{'open':showOpen==true}" >
                                <a class="login-area dropdown-toggle" data-toggle="dropdown" @click="showDrop()">
                                    <div class="avatar" title="View your public profile">
                                       
                                    </div>
                                    <section>
                                        <h2><span ><span>新建</span></span></h2>
                                    </section>
                                </a>
                                <!--Login Area Dropdown-->
                                <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                    <li ><a v-link="{path:'newApp'}" @click="showOpen=false">新建APP</a></li>
                                    <li><a v-link="{path:'newConfigItem'}" @click="showOpen=false">新建配置项</a></li>
                                   <li ><a v-link="{path:'newConfigFile'}" @click="showOpen=false">新建配置文件</a></li>
                                   <li > <a @click="signout()">注销</a></li>
                                </ul>
                                <!--/Login Area Dropdown-->
                            </li>
                    </ul>

                    <div class="setting-container">
                   
                </div>
                    <!-- Settings -->
                </div>
            </div>
            <!-- /Account Area and Settings -->
        </div>
    </div>
</div>
<div class="main-container container-fluid">
    <!-- Page Container -->
    <div class="page-container">
        <!-- Page Sidebar -->
        <div class="page-sidebar" id="sidebar" :class="{'menu-compact':menucompact==true,'hide':hide==true}">
            <!-- Page Sidebar Header-->

            <!-- /Page Sidebar Header -->
            <!-- Sidebar Menu -->
            <ul class="nav sidebar-menu">

		       <Menu v-for="function in functions" :func.sync="function" :menuindex.sync="activeIndex" :itemindex.sync="itemIndex" :user="user">
		    </ul>
        </div>
        <!-- Page Sidebar -->

        <div class="page-content">

                 <router-view></router-view>
            </div>
    </div>


    
 </div>   
</template>

<script>
import Menu from './Menu.vue'
import * as ajaxUtil from '../util/Ajax.js'
import * as Url from '../util/Url.js'
import qwest from 'qwest'

export default {
  data () {
    return {
      functions: [],
      activeIndex: -1,
      itemIndex:-1,
        menucompact:false,
        showOpen:false,
    }
  },
   props:{
    user: {
       type: String
    }
  },
  components: {
    'Menu': Menu
  },
  ready () {
      this.loadMenu();

  },
  methods :{
      loadMenu(){
          ajaxUtil.doGet(Url.APP_LIST,null).then((xhr,response) => {
               
                var apiObj = response;
               
                var apiItems = apiObj.page.result;
                
                for(var i =0 ;i<apiItems.length;i++){
                    var item = apiItems[i]; 
                                    
                }
                    this.functions = apiItems;

            });
      },
	  showDrop(){
          this.showOpen = !this.showOpen;
      },
      signout(){
            var url = Url.SIGN_OUT;
		     ajaxUtil.doGet(url,null).then((xhr,response) =>{
                   if(response.success =="true"){
			           this.$router.go({"path":"/login"});
                   }
		    })
      }
  },
  computed:{
      hide(){
          if(screen.width<600 && this.menucompact){
              return true;
          }
          return false;
      }
  },
  events: {
    'reload-menu': function (msg) {
         this.loadMenu();
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
