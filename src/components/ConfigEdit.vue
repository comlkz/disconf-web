<template>
<div class="page-breadcrumbs">
    <ul class="breadcrumb">
        <li>
            <a  v-link="{ path: '/configList', query: { appId: item.appId ,version:item.version}}">配置</a>
        </li>
        <li>
            {{item.appName}}*{{item.version}}*{{item.envName}}
        </li>
        <li>
            配置文件修改
        </li>
    </ul>
</div>
<div class="page-body">
    <div class="row">
        <div class="col-lg-3 col-sm-3 col-xs-12">
            <div class="widget">
                <div class="widget-header">
                    <span class="widget-caption">配置列表</span>
                </div>
                <div class="widget-body">
                   <ol class="dd-list">
                        <li class="dd-item dd2-item dd-colored" data-id="13" v-for="(index,file) in fileList" :class="{'dd-colored':index == selectIndex}" @click="changeData(index,file.configId)">
                            
                            <div class="dd2-content" :class="{'bg-info':key == file.key}">{{file.key}}</div>
                        </li>
                     </ol>
                </div>
            </div>
        </div>
        <div class="col-lg-9 col-sm-9 col-xs-12">
        
        <div class="widget" v-if="configType=='配置项'">
                <div class="widget-header">
                    <span class="widget-caption">配置项修改</span>
                </div>
                <div class="widget-body">
                <div>
                    <form >
                        <div class="row">
                             <div class="form-group">
                                <label class="col-sm-3 control-label">APP id & 名称：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.appName}}
                                </span>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">版本：</label>
                                <span class="col-sm-9 control-label">
                                   {{item.version}}
                                </span>
                            </div>
                          
                        </div>
                         <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">环境：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.envName}}
                                </span>
                            </div>
                          
                        </div>
                        <div class="row">
                           <div class="form-group">
                                <label class="col-sm-3 control-label">配置KEY：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.value}}
                                </span>
                            </div> 
                       </div>
                        <div class="row">
                           <div class="form-group">
                                <label class="col-sm-3 control-label">配置值：</label>
                                <input type="text" class=" col-sm-9 form-control" v-model="configValue"></input>
                            </div> 
                       </div>
                        
                       <div class="row">
                            <div class="col-sm-12">
                           <button type="submit" class=" btn btn-blue" @click="saveProperty()">保存</button>
                            <button type="submit" class=" btn btn-blue">取消</button>
                           </div>
                       </div>
                    </form>
                    </div>
                </div>
            </div>
            
            
            
            <div class="widget" v-else>
                <div class="widget-header">
                    <span class="widget-caption">配置文件修改</span>
                </div>
                <div class="widget-body">
                <div>
                    <form >
                        <div class="row">
                             <div class="form-group">
                                <label class="col-sm-3 control-label">APP id & 名称：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.appName}}
                                </span>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">版本：</label>
                                <span class="col-sm-9 control-label">
                                   {{item.version}}
                                </span>
                            </div>
                          
                        </div>
                         <div class="row">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">环境：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.envName}}
                                </span>
                            </div>
                          
                        </div>
                        <div class="row">
                           <div class="form-group">
                                <label class="col-sm-3 control-label">配置文件名：</label>
                                <span class="col-sm-9 control-label">
                                    {{item.key}}
                                </span>
                            </div> 
                       </div>
                        <div class="row">
                           <div class="form-group">
                                <label class="col-sm-3 control-label">原配置文件内容：</label>
                                <!--<span class="col-sm-9 control-label" style="background-color:rgba(0, 0, 0, 0.15);">
                                    {{item.value}}
                                </span>-->
                                <pre style="margin-right:50px;">
                                    {{item.value}}
                                </pre>
                            </div> 
                       </div>
                       <div class="row">
                           <div  class="col-sm-3 ">修改方式：</div>
                           <div  class="col-sm-9">
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
                                        <label  class=" control-label">输入文本:</label>
                                        <span class="input-icon icon-right">
                                            <textarea  class="form-control" rows="10" v-model="fileContent">
                                                 {{item.value}}
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
                                  </form>
                            </div>
                           
                       </div>
                       <div class="row">
                            <div class="col-sm-12">
                             <button type="submit" class=" btn btn-blue" @click="saveProperty()" v-if="type ==0">
                               保存
                           </button>
                           <button type="submit" class=" btn btn-blue" @click="saveProperty()" v-if="type ==1">
                               上传
                           </button>
                            <button type="submit" class=" btn btn-blue">取消</button>
                           </div>
                       </div>
                    </form>
                    </div>
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
     item:[],
     fileList:[],
     selectIndex:0,
     type:0,
     configId:-1,
     fileContent:null,
     version:null,
     appId:null,
     envId:null,
     key:null,
     configType:null,
     configValue:null
    }
  },
  components: {
    
  },
  ready () {
    this.configId = this.$route.query.id;
    console.log('configId'+this.configId)
     this.loadData();
  
  },
  methods :{
	  loadData(){
        var params={};
           ajaxUtil.doGet(Url.CONFIG_ITEM+"/"+this.configId,params).then((xhr,response) => {
                var infoObj = response;
                this.content = infoObj.result.value;
                this.item = infoObj.result;
                this.appId = infoObj.result.appId;
                this.envId = infoObj.result.envId;
                this.version = infoObj.result.version;
                this.key = infoObj.result.key;
                this.configType = infoObj.result.type;
                this.loadList();

          });
      },
      loadList(){
          var params={};
          params.appId = this.appId;
          params.envId = this.envId;
          params.version = this.version;
           ajaxUtil.doGet(Url.SIMPLE_LIST,params).then((xhr,response) => {
                var listObj = response;
                  var fileList = listObj.page.result;
                    this.fileList =fileList;
          });
      },
      changeData(index,configId){
          this.selectIndex = index;
          this.configId = configId;
          this.loadData();
      },
      saveProperty(){
          if(this.configType =='配置项'){
              var params ={}
                    params.value = this.configValue;
                    var config={cache:true,headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'}};
                    ajaxUtil.doPut(Url.UPDATE_CONFIG+this.configId,params,config).then((xhr,response) => {
                        
                        this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.version,envId:this.envId}});

                    });
          }else{
                if(this.type == 0 ){
                    var params ={}
                    params.fileContent = this.fileContent;
                    var config={cache:true,headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'}};
                    ajaxUtil.doPut(Url.UPDATE_TEXT+this.configId,params,config).then((xhr,response) => {
                        
                        this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.version,envId:this.envId}});

                    });
                }else{
                    var params ={}
                    params.fileContent = this.fileContent;
                        var oData =  new FormData(this.$els.file);
                        oData.append("myfilerar",this.$els.file.files[0]);
                        
                        qwest.post(Url.UPDATE_FILE+this.configId,oData).then((xhr,response) => {
                        
                            this.$router.go({ path: '/configList', query: { appId:this.appId ,version:this.version,envId:this.envId}});

                        });
                }
           }
      }
  },
  watch:{
	
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
 .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

</style>