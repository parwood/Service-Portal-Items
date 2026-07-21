(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */


	data.gender_options =[];
	
	var genO = new GlideRecord('x_g_ousd_ocsd_core_properties');
	genO.addEncodedQuery('active=true^category=sex');
	genO.query();
	
	while(genO.next()){
		data.gender_options.push({
				gender:genO.getDisplayValue('input_value_1'),
				sysID:genO.getUniqueValue()
			});
	}
	
	if(input){
		data.table_widget=null;
		data.table_widget = $sp.getWidget("ocsd-widget-data-table", {
			async_load:true,
			title:"Found Inmates",
			table:'x_g_ousd_jms_core_bookings',
			filter:input.options,
			page:'ocsd_gsp_index',
			fields:'booking_number,last_name,first_name,middle_name,date_of_birth,sex,custody_status,book_date_time'
		});
	}
})();