<template>

    
     
    <li :class="{active:itemindex == func.id,open:itemindex ==func.id}" >
	     <a class="menu-dropdown"  :class="{'am-collapsed': menuindex == func.id}"  @click="toggle" :class="{active:itemindex == item.id}" >
	          <span class="menu-text">{{func.name}} </span>
               <i class="menu-expand"></i>
         </a>
         <ul class="submenu" :style="{display:display}">
              <li v-for="item in verisonList">
                   <a v-link="{ path: '/configList', query: { appId: func.id ,version:item}}" >
                        <span class="menu-text">{{item}}</span>
                   </a>
              </li>
         </ul>

    </li>

</template>
<script>
import * as ajaxUtil from '../util/Ajax.js'
import * as Url from '../util/Url.js'
export default {
  data () {
    return {
      itemActive: false,
      height:'0px',
      verisonList:[]
    }
  },
  props:{
    func: {
       type: Object
    },
    menuindex: {
      type: Number
    },
    itemindex: {
      type: Number
    }
  },
  methods: {
    toggle () {
      if(this.menuindex == this.func.id){
        this.menuindex = -1;
      }else{
          this.menuindex = this.func.id;
           var params={};
          params.appId = this.func.id;
          ajaxUtil.doGet(Url.VERSION_LIST,params).then((xhr,response) => {
                  var versionList = response;
                  this.verisonList = versionList.page.result;
                  

            });   
      }
    },
    toggleItem(id){
         this.itemindex = id;

    }
  },
  computed: {
    display(){
      var display = this.menuindex == this.func.id?'block':'none';

      return display;
      
    }
  }
}
</script>
