(function() {

	/* Step 1. Load initial data from the server */
			/* populate the 'data' object */
			/* e.g., data.table = $sp.getValue('table'); */
		var user_role = gs.hasRole('x_usdo2_phone_dire.Phone Directory Application Administrator');
		var user_org = gs.getUser().getCompanyID();

	if(!input) {
		data.summary = [];
			var dir_list = new GlideRecord('x_usdo2_phone_dire_directories');
		if(user_role){
			dir_list.addQuery('active',true);
			dir_list.query();

			while(dir_list.next()){
					data.summary.push({
				'sys_id': dir_list.sys_id.getDisplayValue(),
				'title': dir_list.directory_name.getDisplayValue(),
				'short_description': dir_list.short_description.getDisplayValue()
			});
			}
		}else{
			dir_list.addQuery('active',true);
			dir_list.addQuery('bureau_org',user_org);
			dir_list.query();
		}

			while(dir_list.next()){
					data.summary.push({
				'sys_id': dir_list.sys_id.getDisplayValue(),
				'title': dir_list.directory_name.getDisplayValue(),
				'short_description': dir_list.short_description.getDisplayValue()
			});
			}
	}



	/* Step 4. Process user input */

	if(input) {

	}

})();	
