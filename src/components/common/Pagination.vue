<template>
<div class="row DTTTFooter">
    <div class="col-sm-6">
        共{{totalRow}}条记录
    </div>
    <div class="col-sm-6">
        <ul class="pagination">
             <li :class="{'disabled': curPage == 1}"><a @click="changePage(1)">首页</a></li>
            <li :class="{'disabled': curPage == 1}"><a @click="prePage(curPage)">上一页</a></li>
            <li v-for="item in items"  :class="{'active':item == curPage}"><a @click="changePage(item)">{{item}}</a></li>
           <li :class="{'disabled':curPage == totalPage}"><a @click="nextPage(curPage)">下一页</a></li>
            <li :class="{'disabled':curPage == totalPage}"><a @click="changePage(totalPage)">尾页</a></li>

    	</ul>
    </div>

</div>
</template>
<script>
export default{
    data () {
      return {
      }
    },
    props: ['totalPage','curPage','totalRow'],
    ready () {
       
    },
    methods: {
      changePage (item) {
        
        this.curPage = item;
        console.log(this.curPage)
      },
      prePage (item) {
        if(item > 1){
          this.curPage = parseInt(item) -1;
        }else{
          this.curPage = 1;
        }
      },
      nextPage (item) {
        if(item < this.totalPage){
          this.curPage = parseInt(item) + 1;
        }else{
          this.curPage = this.totalPage;
        }
      }
    },
     computed: {
      items: function(){
        var curPage = parseInt(this.curPage);
        var left = 1;
        var totalPage = this.totalPage;
        console.log('totalPage:'+totalPage)
        var right = totalPage;
        var ar = [];
        if(totalPage>= 7){
          if(curPage > 5 && curPage <totalPage-4){
            left = curPage - 3;
            right = curPage + 3;
          }else{
            if(curPage<=5){
              left = 1;
              right = 7;
            }else{
              right = totalPage;
              left = totalPage - 6;
            }
          }
        }
        console.log('left:'+left+"right:"+right)
        while (left <= right){
          ar.push(left);
          left ++;
        }
        return ar;
      }
    }
  }

</script>