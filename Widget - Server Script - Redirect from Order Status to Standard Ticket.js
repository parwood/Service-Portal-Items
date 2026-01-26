(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	data.newSid = getData();

	function getData (){
		if(input.params){
			
			var strIn = input.params;
			var searchTerm = 'sys_id=';
			
			var searchIndex = strIn.indexOf(searchTerm);
			data.strOut = strIn.substr(searchIndex + searchTerm.length); //this is where the magic happens :)
			
			var gr = new GlideRecord('sc_req_item');
			gr.addQuery('request',data.strOut);
			gr.query();

			while(gr.next()){
				data.newrecord = gr.sys_id.toString();
			}
		}
	}
	
	

})();