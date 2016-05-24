<template>
	<div class="page-breadcrumbs">
    <ul class="breadcrumb">
       
       
        <li>
            配置文件修改
        </li>
    </ul>
</div>
    <div class="page-body">
	   
		<div class="row">
		    <div class="col-xs-12 col-md-12">       
                         
			    <div class="well with-header  with-footer">
				    <tabs :active-index.sync="activeTab">
					     <tab v-for="item in headers" :header="item.name" > 
                                 <div class="row">
                                  <div class="col-lg-8 col-sm-8 col-xs-12">
                                          		环境：{{item.name}}
				                                APP:{{titleObj.appName}}
                                                version:{{versionId}}

                                      </div>
                                      <div class="col-lg-4 col-sm-4 col-xs-12">
                                          		<a class="btn btn-primary" href="/api/web/config/downloadfilebatch?appId={{appId}}&envId={{item.id}}&&version={{versionId}}">批量下载</a>
				                                <a class="btn btn-primary"  @click="showZkDetail(appId,item.id,versionId)">ZK部署情况</a>

                                      </div>
                                 </div>
                                 <div class="row" v-show="hiddenZk">
                                    
                                       <div id="zk_deploy_info" style="padding-bottom:20px;">
                                            <pre id="zk_deploy_info_pre" style="min-height:200px">
                                                {{zkDetail}}
                                            </pre>
                                      </div>
                                     
                                 </div>
							    <table class="table table-hover" >
		                        <thead>
		                             <tr>
		                                <th style="width:5%">#</th>
		                                <th style="width:5%">APP</th>

		                                <th style="width:15%">KEY</th>
		                                <th style="width:15%">配置内容</th>
                                        <th style="width:15%">实例列表</th>
                                        <th style="width:15%">修改时间</th>
                                        <th style="width:20%">操作</th>
		                             </tr>
		                        </thead>
		                        <tbody>
		                            <tr v-if="items.length == 0"><td colspan = "7" >暂无数据</td></tr>
		                            <tr v-for="(index,item) in items">
                                    <td style="width:5%">{{index+1}}</td>
		                                <td style="width:5%">{{item.appId}}</td>
		                                <td style="width:15%">{{item.key}}</td>
                                        <td style="width:15%">
                                      
                                        <a  @click="getInfo(item.configId)">点击获取</a>
                                        </td>
                                        <td style="width:15%"><a @click="getZkInfo(item.configId)">{{item.machineSize}}台OK</a></td>
                                         <td style="width:15%">{{item.modifyTime}}</a></td>

		                                <td style="width:20%">
                                            <a class="btn btn-default  btn-circle btn-xs" v-link="{path:'/configEdit',query:{'id':item.configId}}"><i class="fa  fa-edit"></i></a>
                                            <a class="btn btn-default  btn-circle btn-xs" @click="alertDel(item.configId)"><i class="fa fa-times"></i></a>
                                            <a class="btn btn-default  btn-circle btn-xs" href="/api/web/config/download/{{item.configId}}"><i class="fa fa-download"></i></a>
                                        </td>
			                              

								</td>
		                                
		                            </tr>

		                        </tbody>
		                    </table>
        	                <pagination v-if="totalPage>1" :page-per-rows="rows" :total-page="totalPage" :cur-page.sync="curPage" :total-row="totalRows"></pagination>
        	            </tab>
					</tabs>
				</div>
			</div>
		</div>
	</div>

 <modal :show.sync="showInfo" title="配置详情" width="700px"> 
        <div class="modal-body" slot="modal-body">
            <pre style="width:680px">
                {{content}}
            </pre>
        </div>
        <div class="modal-footer" slot="modal-footer">
				<a class="btn btn-primary"  @click="showInfo=false">关闭</a>
		</div>
                            
  </modal>
   <modal :show.sync="showZkInfo" title="配置详情" width="700px">
        <div class="modal-body" slot="modal-body">
        <div class="row">
           <table class="table table-hover" >
                    <thead>
                            <tr>                    
                                <td style="width:100px;">机器</td>
                                <td style="width:550px;">值</td>
                                <td style="width:50px;">状态</td>
                            </tr>
                              <tr v-for="item in zkList">                    
                                <td style="width:100px;">{{item.machine}}</td>
                                <td style="width:550px;">{{item.value}}</td> 
                                <td style="width:50px;">
                                    <span v-if="item.errorList ==[]">正常</span>
                                     <span v-else>不正常</span>
                                </td>
                            </tr>
                             
                    </thead>
                    <tbody>
                    </tbody>
            </table>
            </div>
        </div>
        <div class="modal-footer" slot="modal-footer">
				<a class="btn btn-primary"  @click="showZkInfo=false">关闭</a>
		</div>
                            
  </modal>
  <modal :show.sync="showDel" title="删除配置">
        <div class="modal-body" slot="modal-body">
            确定要删除配置文件吗
        </div>
        <div class="modal-footer" slot="modal-footer">
				<a class="btn btn-primary"  @click="showDel=false">取消</a>
                <a class="btn btn-primary"  @click="delConfig()">确定</a>
		</div>
                            
  </modal>
</template>

<script>

import * as ajaxUtil from '../util/Ajax.js'
import * as Url from '../util/Url.js'
import pagination from './common/Pagination.vue'
import tabs from './common/Tabset.vue'
import tab from './common/Tab.vue'
import modal from './common/Modal.vue'
import qwest from 'qwest'

export default {
     route: {
    
    data ({ to, next }) {
      this.appId =to.query.appId;
      this.versionId = to.query.version;

       this.loadData();

    }
  },

  data () {
    return {
     headers:[],
     items:[],
     zkList:[],
     activeTab:0,
     showInfo:false,
     showDel:false,
     showZkInfo:false,
     content:null,
     appId:-1,
     envId:null,
     selectItem:-1,
     versionId:null,
     titleObj:null,
     zkDetail:null,
     hiddenZk:false,
    }
  },
  components: {
      tabs,
      tab,
      pagination,
      modal
  },
  
  ready () {
    
      this.loadEnv();
     

   
  },
  methods :{
      loadEnv(){
          var params={};
          qwest.get(Url.ENV_LIST,params).then((xhr,response) => {
                var envList = response;
                var headers=[];
                for(var i = 0 ;i <envList.page.result.length;i++){
                    console.log(envList.page.result[i])
                    headers.push(envList.page.result[i]);
                }
                this.headers = headers;
                this.loadData();
          }) 
      },
	  loadData(){
          console.log("start load data");
          if(this.headers.length >0){
                        console.log("begin load data");

           var envId = this.headers[this.activeTab].id;
           var params={};
           params.appId = this.appId;
           params.envId = envId;
           params.version = this.versionId;
           ajaxUtil.doGet(Url.CONFIG_LIST,params).then((xhr,response) => {
                var configObj = response;
                this.items = configObj.page.result;
                var titleObj = {};
                titleObj.appName = this.items[0].appName;
                titleObj.envName =  this.items[0].envName;
                titleObj.version =  this.items[0].versionId;
                this.titleObj = titleObj;
          });
      }
      },
      getInfo(id){
          
        
         var params={};
           ajaxUtil.doGet(Url.CONFIG_ITEM+"/"+id,params).then((xhr,response) => {
                var infoObj = response;
                this.content = infoObj.result.value;
                this.showInfo = true;
          });
      },
       getZkInfo(id){
          
        
         var params={};
           ajaxUtil.doGet(Url.CONFIG_ZK+"/"+id,params).then((xhr,response) => {
                var infoObj = response;
                this.zkList = infoObj.result.datalist;
                this.showZkInfo = true;
          });
      },
      alertDel(id){
          this.selectItem = id;
          this.showDel = true;
      },
      delConfig(){
          this.showDel = false;
          ajaxUtil.doDel(Url.CONFIG_ITEM+"/"+ this.selectItem).then((xhr,response) => {
                var infoObj = response;
                this.loadData();
          });
      },
      batchDownload(){
          window.location.href=Url.BATCH_DOWNLOAD+"?appId="+this.appId+"&envId="+this.envId+"&version="+this.versionId;
      },
      showZkDetail(appId,envId,version){
          if(this.hiddenZk == false){
            var params ={}
                params.appId = appId;
                params.version = version;
                params.envId = envId;
                ajaxUtil.doGet(Url.ZK_INFO,params).then((xhr,response) => {
                    this.zkDetail= response.result.hostInfo;
                    this.hiddenZk =true;
                });
            }else{
                this.hiddenZk = false;
            }
      }
      
     
  },
  watch:{
	activeTab(){
		this.loadData();
		
	} ,
	curPage () {
		  this.loadData()
	  }
     
  }
}
</script>