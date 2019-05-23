(function() {

	/* Step 1. Load initial data from the server */
			/* populate the 'data' object */
			/* e.g., data.table = $sp.getValue('table'); */
var cur_user = gs.getUserID();
	if(!input) {
		data.user_info = [];

		var grUser = new GlideRecord('x_usdo2_phone_dire_numbers');
		grUser.addQuery('active',true);
		grUser.addQuery('user',cur_user);
		grUser.query();

			var count = grUser.getRowCount();
		if(count>0){
			while (grUser.next()){
			data.user_info.push({
				 'user_last': grUser.getDisplayValue('last_name'),
         'user_first': grUser.getDisplayValue('first_name'),
         'user_office': grUser.getDisplayValue('office'),
				 'user_location':grUser.getDisplayValue('location'),
         'user_title': grUser.getDisplayValue('job_title'),
         'user_office_phone': grUser.getDisplayValue('office_phone'),
         'user_official_cell': grUser.getDisplayValue('official_cell'),
         'user_home_phone': grUser.getDisplayValue('home_phone'),
         'user_alternate_phone': grUser.getDisplayValue('alternate_phone'),
         'user_short_extension': grUser.getDisplayValue('short_extension')
			});
		}
		}else{
			data.no_user=[];
		}
	}



	/* Step 4. Process user input */

	if(input) {

		var grUserUpdate = new GlideRecord('x_usdo2_phone_dire_numbers');
		grUserUpdate.addQuery('active',true);
		grUserUpdate.addQuery('user',cur_user);
		grUserUpdate.query();

		var count = grUserUpdate.getRowCount();
		if(count>0){
			 while (grUserUpdate.next()) {
				grUserUpdate.home_phone = input.user_home_phone;
				grUserUpdate.alternate_phone = input.user_alternate_phone;
				grUserUpdate.short_extension = input.user_short_extension;
        grUserUpdate.update();
				data.message="Your user record has successfully been updated in the Phone Directory Application!";
   }
		}

	}

})();	
