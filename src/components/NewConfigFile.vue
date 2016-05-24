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
                                    <select class="form-control" v-model="appId">
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
                                      <select class="form-control" v-model="version">
                                          <option  selected>选择版本</option>
                                           <option value="#">自定义版本</option>
                                         <option v-for="item in versionList">{{item}}</option>
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
                                       <select class="form-control" v-model="envId">
                                           <option selected>选择环境</option>
                                           <option v-for="item in envList" :value="item.id">{{item.name}}</option>

                                       </select>
                                </div>
                             </div>
                          
                        </div>
                     
                        
                         <div class="row">
                           <div  class="col-sm-2 ">上传方式：</div>
                           <div  class="col-sm-10">
                                <div class="form-group">
                                    
                                    <label>
                                        <input name="form-field-radio" type="radio"  v-model="type" class="col-sm-2" value="0">
                                        <span class="text">输入文本 </span>
                                    </label>
                                    <label>
                                        <input name="form-field-radio" type="radio" class="col-sm-2" v-model="type" value="1">
                                        <span class="text">上传配置文件 </span>
                                    </label>
                                </div>
                           </div>
                        </div>
                        
                          <div class="row" v-if="type == 0 ">
                             <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">文件名:</label>
                                        <span class="input-icon icon-right">
                                            <input type="text" class="form-control" v-model="fileName">

                                        </span>
                                    
                                </div>
                             </div>
                        </div>
                        
                         <div class="row" v-if="type == 0 ">
                             <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">输入文本:</label>
                                        <span class="input-icon icon-right">
                                            <textarea  class="form-control" rows="10" v-model="fileContent">
                                            </textarea>
                                        </span>
                                    
                                </div>
                             </div>
                        </div>
                        
                        <div class="row" v-if="type == 1">
                           <div class="form-group">
                                <label class="col-sm-3 control-label">上传配置文件：</label>
                                 <label for="uploadFile" class="btn btn-palegreen">上传配置文件</label>
                                 <form enctype="multipart/form-data">
                                       <input id="uploadFile" type="file"  class="inputfile"  v-el:file >
                                  </form>                            </div>
                           
                       </div>
                       <div class="row">
                            <div class="col-sm-12">
                           <button type="submit" class=" btn btn-blue" @click="save()">新建</button>
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
import qwest from 'qwest'

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
     type:-1,
     fileName:null,
     fileContent:null,
     versionList:[],
     customVersion:null
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
          if(this.type == 0 ){
              var params ={};
              params.appId = this.appId;
              params.fileName = this.fileName;
              params.fileContent = this.fileContent;
              params.version = this.version == '#'?this.customVersion:this.version;
              params.envId = this.envId;
              var config={cache:true,headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'}};
              ajaxUtil.doPost(Url.CONFIG_TEXT,params,config).then((xhr,response) => {
               
                this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.version,envId:this.envId}});
              });
          }else{
              var params ={}
              params.fileContent = this.fileContent;
                var oData =  new FormData(this.$els.file);
                oData.append("myfilerar",this.$els.file.files[0]);
                oData.append("appId",this.appId);
                oData.append("version", this.version == '#'?this.customVersion:this.version);
                oData.append("envId",this.envId); 
                qwest.post(Url.CONFIG_FILE,oData).then((xhr,response) => {
                    this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.version,envId:this.envId}});
                });
          }
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