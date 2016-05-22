<template>
<div class="page-breadcrumbs">
    <ul class="breadcrumb">
        <li>
            <a >配置</a>
        </li>
        
        <li>
           新建APP
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
                                    <label class="control-label">APP</label>
                                    <input type="text" class="form-control" v-model="app"/>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">说明:</label>
                                        <span class="input-icon icon-right">
                                            <textarea  class="form-control" rows="5" v-model="desc">
                                            </textarea>
                                        </span>
                                    
                                </div>
                             </div>
                          
                        </div>
                         <div class="row">
                            <div class="col-sm-12">
                                    <div class="form-group">
                                        <label  class=" control-label">Emails(;号分隔)：</label>
                                        <span class="input-icon icon-right">
                                            <textarea  class="form-control" rows="3" v-model="email">
                                                
                                            </textarea>
                                        </span>
                                    
                                </div>
                             </div>
                          
                        </div>
                       
                       <div class="row">
                            <div class="col-sm-12">
                           <button type="submit" class=" btn btn-blue" @click="newApp()">新建</button>
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
       app:null,
       desc:null,
       email:null,
    }
  },
  components: {
    
  },
  ready () {
   
  },
  methods :{
	  newApp(){
         var params ={}
              params.app = this.app;
              params.desc = this.desc;
              params.email = this.email;
              ajaxUtil.doPost(Url.APP_CREATE,params).then((xhr,response) => {
               
                   this.$router.go({ path: '/index'});
                   this.$broadcast('reload-menu', true);
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