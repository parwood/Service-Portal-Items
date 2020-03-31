(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	data.pageID =$sp.getPortalRecord().getDisplayValue("url_suffix");

	var liu = gs.getUserID();
	if (!input){
		data.surveyData = getSurveys(liu);
		data.showVid = getVidStatus(liu);
		data.bankingTask = getBankingTask(liu);
	}

	if(input){
		if (input.closeVideo==true){
			if (getRecord(liu)){
				updateRecord(liu);
				data.showVid=0;
			}else{
				createRecord(liu);
				data.showVid=0;
			}
		}else if(input.closeBanking==true){
				closeBanking(input.task_to_close);
			}
	}

	function getRecord (user){
		var gr = new GlideRecord ('sn_hr_sp_u_hp_video_tracker');
		gr.addQuery('u_user',user);
		gr.query();

		if(gr.next()){
			return true;
		}else{
			return false;
		}
	}

	function updateRecord(user){
		var gr = new GlideRecord ('sn_hr_sp_u_hp_video_tracker');
		gr.addQuery('u_user',user);
		gr.query();

		while (gr.next()){
			gr.u_video_seen = true;
			gr.update();
		}
	}

	function createRecord(user){
		var gr = new GlideRecord ('sn_hr_sp_u_hp_video_tracker');
		gr.initialize();
		gr.u_user = user;
		gr.u_video_seen = true;
		gr.insert();
	}

	function getVidStatus (user){
		var showVid = '';

		var gr = new GlideRecord ('sn_hr_sp_u_hp_video_tracker');
		gr.addQuery('u_user',user);
		gr.query();

		if(gr.next() && gr.u_video_seen==true){
			showVid = 0;
		}else{
			showVid = 1;
		}
		return showVid;
	}

	function getSurveys(user){
		var survey_data=[];
		var gr=new GlideRecord('asmt_assessment_instance');
		gr.addQuery('user',user);
		gr.addEncodedQuery('state=ready');
		gr.query();

		while (gr.next()){
			survey_data.push({'sys_id':gr.sys_id.toString()});
		}

		return survey_data;
	}

	function getBankingTask(user){
		var taskData=[];
		var gr = new GlideRecord('sn_hr_core_task');
		//gr.addEncodedQuery('sn_hr_le_activity.activity_set=de178f301bd080508cd886ae6e4bcb20')
		gr.addQuery('assigned_to',gs.getUserID());
		gr.addQuery('state','10');

		gr.addQuery('short_description','Open a KeyBank Account');
		gr.query();

		while(gr.next()){
			if(gr.url.toString()!=''){
				taskData.push({'url':gr.url.toString(),
										 'sys_id':gr.sys_id.toString()});
			}else{
				taskData='';
			}

		}

		return taskData;
	}

	function closeBanking(sid){
		var gr = new GlideRecord('sn_hr_core_task');
		gr.addQuery('assigned_to',gs.getUserID());
		gr.addQuery('sys_id',sid);
		gr.setValue('state','3');
		gr.updateMultiple();
	}

})();
