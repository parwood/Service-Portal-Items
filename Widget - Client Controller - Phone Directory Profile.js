function() {
   /* widget controller */
   var c = this;

	if(c.data.user_info[0]){
			c.short_ext = c.data.user_info[0].user_short_extension;
			c.alt_phone = c.data.user_info[0].user_alternate_phone;
	    c.home_phone = c.data.user_info[0].user_home_phone;

			}
	/* Step 3. Accept user input */
	c.Submit = function(){
		c.data.user_home_phone = c.home_phone;
		c.data.user_alternate_phone = c.alt_phone;
		c.data.user_short_extension = c.short_ext;

		c.server.update().then(function(response){
			c.message = response.message;
		})
	}


}	
