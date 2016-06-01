<template>
<div class="page-breadcrumbs">
    <ul class="breadcrumb">
        <li>
            <a >配置</a>
        </li>
        
        <li>
          新建配置文件
        </li>
    </ul>
</div>
<div class="page-body">
    <div class="row">
        <div class="widget">
                <div class="widget-header">
                    <span class="widget-caption">新建APP</span>
                </div>
                <div class="widget-body">
                <div>
                    <form >
                       <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="control-label">APP选择</label>
                                    <select class="form-control"  v-select="appId">
                                         <option value="-1" selected>选择APP</option>
                                         <option v-for="item in appList" :value="item.id">{{item.name}}</option>
                                    </select>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">版本:</label>
                                      <select class="form-control"  v-select="version" >
                                          <option  selected>选择版本</option>
                                         <option v-for="item in versionList">{{item}}</option>
                                         <option value="#">自定义版本</option>
                                    </select>
                                    
                                </div>
                             </div>
                          
                        </div>
                          <div class="row" v-if="version == '#'">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">自定义版本:</label>
                                         <input type="text" class="form-control" v-model="customVersion"></input>
                                    
                                </div>
                             </div>
                          
                        </div>
                         <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">环境：</label>
                                       <select class="form-control"  v-select="envId"  >
                                           <option selected>选择环境</option>
                                           <option v-for="item in envList" :value="item.id">{{item.name}}</option>

                                       </select>
                                </div>
                             </div>
                          
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">配置名:</label>
                                      <input type="text" class="form-control" v-model="key">
                                      </input> 
                                </div>
                             </div>             
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">配置值:</label>
                                      <input type="text" class="form-control" v-model="value">
                                      </input> 
                                </div>
                             </div>             
                        </div>
                        
                       <div class="row">
                            <div class="col-sm-12">
                           <button type="submit" class=" btn btn-blue" @click="save">新建</button>
                           </div>
                       </div>
                    </form>
                    </div>
                </div>
            
        </div>
        
    </div>
</div>
</template>
<script>
    import * as ajaxUtil from '../util/Ajax.js'
import * as Url from '../util/Url.js'
export default {
  data () {
    return {
     key:null,
     value:null,
     appId:null,
     version:null,
     envId:null,
      appList:[],
     envList:[],
      versionList:[]
    }
  },
  components: {
    
  },
  ready () {
   this.loadAppData();
  },
  methods :{
	  loadAppData(){
            
            
             var params={}; 
           ajaxUtil.doGet(Url.APP_LIST,params).then((xhr,response) => {
                var apiObj = response;
                  this.appList = apiObj. page.result;
          });
            
            
      },
      loadEnv(){
          
              var params={};
           ajaxUtil.doGet(Url.ENV_LIST,params).then((xhr,response) => {
                var envObj = response;
                 this.envList = envObj.page.result;
          });
      },
      loadVersion(){
     
          var params={};
          params.appId = this.appId;
           ajaxUtil.doGet(Url.VERSION_LIST,params).then((xhr,response) => {
                var versionObj = response;
                this.versionList = versionObj.page.result;
          });
      },
      save(){
         
              var params ={};
              params.appId = this.appId;
              params.key = this.key;
              params.value = this.value;
              params.version = this.version == '#'?customVersion:this.version;            
              params.envId = this.envId;
              console.log("params="+JSON.stringify(params))
              ajaxUtil.doPost(Url.CONFIG_ITEM,params).then((xhr,response) => {
               
                this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.verison}});
              });
         
      }
  },
  watch:{
	appId(){
        if(this.appId != -1){
            this.loadVersion();
        }else{
            this.versionList=[];
        }
    },
    version(){
         if(this.version != null){
            this.loadEnv();
        }else{
            this.envList=[];
        }
    }
  }
}
</script>



<style>
.item-value{
    border: 1px solid #D6D6D6 ;
    border-radius: 5 px;
    text-align: left;
    vertical-align: middle;
}

</style>