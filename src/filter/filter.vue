<script>
    var moment = require('moment')
	Vue.filter('date', function (value,format) {
		console.log( moment(value).format(format))
	  return moment(value).format(format)
	})
</script>