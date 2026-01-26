api.controller = function($window) {
	// widget controller

	var c = this;


	c.data.params = $window.location.search;
	c.data.host = $window.location.host;

	c.server.update().then(function(response){
		c.data.new_link = 'https://'+c.data.host+'/esc?id=ticket&table=sc_req_item&sys_id='+c.data.newrecord+'&view=sp';
		$window.location.href=c.data.new_link;

	});

	$("<style>")
		.prop("type", "text/css")
		.html("\
		body {\
			display: none !important;\
		}")
		.appendTo("body");

};