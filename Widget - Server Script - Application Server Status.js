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

		data.appServers = [];
		var grApps = new GlideRecord(options.table);
		grApps.addQuery('itapps_sys_id',input.application);
		grApps.query();

		while (grApps.next()){
			var current_time = new GlideDateTime();
			var zerto = grApps.cmdb_u_dr_replication_date;
			var zerto_date = new GlideDateTime(zerto);
			var zerto_null = zerto_date.getValue().length();
			var diff_zerto = gs.dateDiff(zerto_date.getDisplayValue(),current_time.getDisplayValue(),true);
			var hours = diff_zerto/(60*60);

			if (zerto_null == '0'){
				data.appServers.push({
				'name': grApps.relci_child.name.toUpperCase(),
				'date_status':'fa fa-2x fa-ban invisible-fa text-success'
			});
			} else if(hours <= 4){
			data.appServers.push({
				'name': grApps.relci_child.name.toUpperCase(),
				'date_status':'fa fa-2x fa-check-circle text-success'
			});
			} else if( hours > 4 && hours <= 24){
				data.appServers.push({
				'name': grApps.relci_child.name.toUpperCase(),
				'date_status':'fa fa-2x fa-exclamation-circle text-warning'
			});
			} else if ( hours > 24 ){
				data.appServers.push({
				'name': grApps.relci_child.name.toUpperCase(),
				'date_status':'fa fa-2x fa-times-circle text-danger'
			});
			}else {
				return;
			}
		}
	}

})();	
