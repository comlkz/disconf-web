<template>
<div class="page-breadcrumbs">
    <ul class="breadcrumb">
        <li>
            <a >zk部署情况</a>
        </li>
        
        
    </ul>
</div>
<div class="page-body">
    <div class="row">
        <div class="widget">
                <div class="widget-header">
                    <span class="widget-caption">zk部署情况</span>
                </div>
                <div class="widget-body">
                <div>
                  <pre id="zk_deploy_info_pre" style="min-height:200px">
                 </pre>
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
       appId:null,
       version:null,
       envId:null,
       content:null,
    }
  },
   route: {
    
    data ({ to, next }) {
      this.appId =to.query.appId;
      this.version = to.query.version;
      this.envId = to.query.envId;
       this.loadData();

    }
  },
  ready () {
   
  },
  methods :{
	  loadData(){
         var params ={}
              params.appId = this.appId;
              params.version = this.version;
              params.envId = this.envId;
              ajaxUtil.doGet(Url.ZK_INFO,params).then((xhr,response) => {
                   this.content= response.result.hostInfo;
                  
              });
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

</style>