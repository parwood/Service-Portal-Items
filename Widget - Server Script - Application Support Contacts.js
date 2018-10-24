(function() {

	/* Step 1. Load initial data from the server */
			/* populate the 'data' object */
			/* e.g., data.table = $sp.getValue('table'); */

	if(!input) {

	}



	/* Step 4. Process user input */

	if(input) {

		var app_table = options.table;
		var application = options.application;

		data.support_group = [];
		data.support_members = [];
		data.bus_owner = [];
		var grApps = new GlideRecord(options.table);
		grApps.addQuery('sys_id',input.application);
		grApps.query();


		while (grApps.next()){
			var supGroup = grApps.support_group;
				data.bus_owner.push({
				'name': grApps.u_business_owner.getDisplayValue(),
				'phone':grApps.u_business_owner.phone.getDisplayValue()
			});

			data.support_group.push({
				'name': grApps.support_group.getDisplayValue(),
				'manager':grApps.support_group.manager.getDisplayValue(),
				'manager_phone':grApps.support_group.manager.phone.getDisplayValue()
			});
		}

		var grSupGroup = new GlideRecord('sys_user_grmember');
		grSupGroup.addQuery('group', supGroup);
		grSupGroup.query();

		while (grSupGroup.next()){
			if(grSupGroup.user.active == true){
				data.support_members.push({
					'name': grSupGroup.user.getDisplayValue()
				});
			}
		}

	}

})();	
