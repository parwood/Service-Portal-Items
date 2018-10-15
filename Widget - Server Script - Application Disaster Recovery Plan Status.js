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

		data.update = [];
		data.exercise = [];
		var grApps = new GlideRecord(app_table);
		grApps.addQuery('sys_id',input.application);
		grApps.query();

		while (grApps.next()){

			var current_time = new GlideDateTime();
			var updated = grApps.u_dr_plan_last_updated;
			var exercised = grApps.u_dr_plan_last_exercised;
			var updated_date = new GlideDateTime(updated);
			var exercised_date = new GlideDateTime(exercised);
			var update_null = updated_date.getValue().length();
			var exercise_null = exercised_date.getValue().length();
			var diff_update = gs.dateDiff(updated_date.getDisplayValue(),current_time.getDisplayValue(),true);
			var diff_exercise = gs.dateDiff(exercised_date.getDisplayValue(),current_time.getDisplayValue(),true);
			var days_update = diff_update/(60*60*24);
			var days_exercise = diff_exercise/(60*60*24);

			if(!grApps.u_dr_plan_last_updated || grApps.u_dr_plan_last_updated){
				if (update_null == '0'){
				data.update.push({
				'last_update': updated_date.toString(),
				'days': diff_update,
				'current': current_time.toString(),
				'date_status':'fa fa-2x fa-ban text-danger'
			});
			} else if(days_update <= 181){
			data.update.push({
				'last_update': updated.toString(),
				'days': days_update,
				'date_status':'fa fa-2x fa-check-circle text-success'
			});
			} else if( days_update > 181 && days_update <= 364){
				data.update.push({
				'last_update': updated.toString(),
				'days': days_update,
				'date_status':'fa fa-2x fa-exclamation-circle text-warning'
			});
			} else if ( days_update > 364 ){
				data.update.push({
				'last_update': updated.toString(),
				'days': days_update,
				'date_status':'fa fa-2x fa-times-circle text-danger'
			});
			}else{
				return;
			}
			}

			if(!grApps.u_dr_plan_last_exercised || grApps.u_dr_plan_last_exercised){
			if (exercise_null == '0'){
				data.exercise.push({
				'last_exercise': exercised_date.toString(),
					'days': days_exercise,
				'date_status':'fa fa-2x fa-ban text-danger'
			});
			} else if(days_exercise <= 181){
			data.exercise.push({
				'last_exercise': exercised.toString(),
				'days': days_exercise,
				'date_status':'fa fa-2x fa-check-circle text-success'
			});
			} else if( days_exercise > 181 && days_exercise <= 364){
				data.exercise.push({
				'last_exercise': exercised.toString(),
					'days': days_exercise,
				'date_status':'fa fa-2x fa-exclamation-circle text-warning'
			});
			} else if ( days_exercise > 364 ){
				data.exercise.push({
				'last_exercise': exercised.toString(),
					'days': days_exercise,
				'date_status':'fa fa-2x fa-times-circle text-danger'
			});
			}else {
				return;
			}
			}


		}


	}

})();	
