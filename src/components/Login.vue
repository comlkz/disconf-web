<template>
        <form @keyup.enter="login()">
		<div class="login-container animated fadeInDown">
            <div class="loginbox bg-white">
                <div class="loginbox-title">微信后台管理系统</div>
                <div class="loginbox-social">
                    <div class="social-title ">登录</div>

                </div>
                <div class="loginbox-social" v-if="error != null">
                   {{error}}

                </div>
                <div class="loginbox-or">
                    <div class="or-line" ></div>
                </div>
                <div class="loginbox-textbox">
                    <input type="text" class="form-control"  v-model="login_name" placeholder="用户名" />
                </div>
                <div class="loginbox-textbox">
                    <input type="password" class="form-control" placeholder="密码" v-model="password"/>
                </div>
                <div class="loginbox-forgot">
                    <a href="">忘记密码?</a>
                </div>
                <div class="loginbox-submit">
                    <input type="button" class="btn btn-primary btn-block" value="登录"  @click="login()">
                </div>

            </div>
            <div class="logobox">
            </div>
        </div>
        </form>
</template>

<script>
import * as ajaxUtil from '../util/Ajax.js'
import * as Url from '../util/Url.js'
var store = require('store')
export default {
  data () {
    return {
    
      login_name: "",
      password:"",
      remember:-1,
        error:null,
    }
  },
  ready () {
  },
  methods :{
	  login() {
		  var params = {name:this.login_name,"password":this.password,"remember":0};
		    console.log(params);
		    var url = Url.SIGN_IN;
		     ajaxUtil.doPost(url,params).then((xhr,response) =>{
                   if(response.success =="true"){
			           this.$router.go({"path":"/index"});
                   }
		    })
	  }
  }
}
</script>