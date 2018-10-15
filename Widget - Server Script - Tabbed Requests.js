(function() {

	/* Step 1. Load initial data from the server */
			/* populate the 'data' object */
			/* e.g., data.table = $sp.getValue('table'); */

		data.taskEncodeQuery = 'opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORu_requested_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORcaller_idDYNAMIC90d1921e5f510100a9ad2572f2b477fe';
		data.ritmEncodeQuery = 'opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORu_requested_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe';
		data.incEncodeQuery = 'caller_idDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORopened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe';
		data.fields = 'number,opened_by,u_requested_for,state,short_description';
		data.fieldsInputInc ='number,short_description,opened_by,caller_id,state';
		data.fieldsInputRitm = 'number,opened_by,u_requested_for,state,short_description';

	if(!input) {
		data.items = [];
		data.summary = [{
    "agValue": "sc_req_item",
    "agName": "Requested Items",
    "agCount": "0",
    "agState": "true"
  },
  {
    "agValue": "incident",
    "agName": "Incidents",
    "agCount": "0",
    "agState": "true"
  },
	{
    "agValue": "sc_req_item",
    "agName": "Closed Requested Items",
    "agCount": "0",
    "agState": "false"
  },
	{
    "agValue": "incident",
    "agName": "Closed Incidents",
    "agCount": "0",
    "agState": "false"
  }];
		data.groupBy = 'sys_class_name';

		var gaSum = new GlideAggregate('task');
		gaSum.addEncodedQuery(data.taskEncodeQuery)
		gaSum.addQuery('sys_class_name','IN','incident,sc_req_item');
		gaSum.addQuery('active','IN','true,false');
		gaSum.addAggregate('COUNT');
		gaSum.setGroup(true);
		gaSum.groupBy(data.groupBy);
		gaSum.groupBy('active');
		gaSum.orderByDesc('sys_class_name');
		gaSum.orderByDesc('active');
		gaSum.query();

	while (gaSum.next()) {
		var table = gaSum[data.groupBy].toString();
		var state = gaSum.getDisplayValue('active').toString();
		//data.summary[table][state] = parseInt(gaSum.getAggregate('COUNT'),10);
		for(var x = 0; x< data.summary.length; x++){
			if(data.summary[x].agValue === table){
				if(data.summary[x].agState === state){
					data.summary[x].agCount = parseInt(gaSum.getAggregate('COUNT'),10);
				}
			}
		}
	}


		var grItems = new GlideRecord('sc_req_item');
		grItems.addEncodedQuery(data.ritmEncodeQuery);
		grItems.addActiveQuery();
		grItems.query();

		data.labels=$sp.getFieldsObject(grItems,data.fields);

		while(grItems.next()){
			var o = {};

			$sp.getRecordDisplayValues(o,grItems,data.fields);
			$sp.getRecordValues(o,grItems,'sys_id');
			data.items.push(o);
		}

	}



	/* Step 4. Process user input */

	if(input) {
		data.itemsInput=[];
		data.inputQuery='';

		if(input.selectedAg == 'incident'){
			data.inputQuery=data.incEncodeQuery;
			data.fieldsIf = data.fieldsInputInc;
			}
		else if(input.selectedAg == 'sc_req_item'){
			data.inputQuery=data.ritmEncodeQuery;
			data.fieldsIf = data.fieldsInputRitm;
		}

		var grItemsInput = new GlideRecord(input.selectedAg);
		grItemsInput.addEncodedQuery(data.inputQuery);
		grItemsInput.addQuery('active', input.selectedState);
		grItemsInput.query();

		data.labels=$sp.getFieldsObject(grItemsInput,data.fieldsIf);

		while(grItemsInput.next()){
			var o = {};

			$sp.getRecordDisplayValues(o,grItemsInput,data.fieldsIf);
			$sp.getRecordValues(o,grItemsInput,'sys_id');
			data.itemsInput.push(o);
		}
	}
})();
