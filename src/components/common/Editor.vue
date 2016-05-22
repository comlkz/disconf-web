<template>
	<script id="container"></script>
</template>
<script>

	export default {
		props: {
			content: {
              type: String
            },
			text:{
				type:String
			},
            initcontent:{
	            type:String
            }
    },
		beforeCompile(){
			var ue = UE.getEditor('container');
		    
			 if(typeof(ue.container) != 'undefined') {
			 	//UE.delEditor("container");
				  UE.getEditor('container').destroy();
			}
		},
        ready () {
			var ue = UE.getEditor('container');
			
			var ue = UE.getEditor('container');
			var self = this;
			
			ue.ready(function() {
				
			
				ue.addListener("contentChange", function(editor){
					self.content = ue.getContent();
					self.text = ue.getContentTxt();
					//var txt = um.getContentTxt();
				})

           });
           
        },
        watch:{
	        initcontent(){
		        var ue = UE.getEditor('container');
				console.log(ue)
		        if(this.initcontent != null && typeof(ue.container) != 'undefined' ){
					var self = this;
					ue.ready(function() {
			             ue.setContent(UE.utils.html(self.initcontent));
					})
		        }
	        }
        }
        
	}
</script>