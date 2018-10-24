(function() {

	/* Step 1. Load initial data from the server */
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	if(!input) {
		data.applications=[];
		var table = options.table;
		var grApps = new GlideRecord(options.table);
		grApps.addQuery('install_status','1');
		grApps.query();

		while(grApps.next()){
			data.applications.push({
				appName:grApps.getDisplayValue('name'),
				appSysID:grApps.getUniqueValue()
			});
		}

	}



	/* Step 4. Process user input */

	if(input) {

	}

})();
