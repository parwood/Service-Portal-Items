(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	data.escalated='false';
	data.table=$sp.getParameter('table');
	data.record=$sp.getParameter('sys_id');
	getEscStat(data.record,data.table);




	if(input&&input.insertEntry=='true'){
		setEscStat(data.record,data.table,input.customerComment);
	}else if(input&&input.insertEntry=='false'){
		getEscStat(data.record,data.table);
	}


	function getEscStat(sid,tab){
		var escGR = new GlideRecord(tab);
		escGR.addActiveQuery();
		escGR.addQuery('sys_id',sid);
		escGR.query();

		while (escGR.next()){
			if(escGR.u_escalated==true){
				data.escalated='true';
			}else if (escGR.u_escalated==false){
				data.escalated='false';
			}
		}

	}

	function setEscStat(sid,tab,comms){
		var setEsc = new GlideRecord(tab);
		setEsc.get(sid);
		setEsc.work_notes = "Escalation Reason: " + comms;
		setEsc.u_escalated ='true';
		setEsc.update();
	}

})();
