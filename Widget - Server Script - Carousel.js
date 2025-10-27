(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	var widget='';

	data.slideIndex='';
	data.slides = $sp.getRelatedList('sp_carousel_slide','carousel');
	data.logged_in = gs.getUserDisplayName().split(' ');
	data.start_date = getStartDate();
	var date = new GlideDateTime();
	var today  = date.getLocalDate();
	data.start_diff =getDiffDate(data.start_date,today);
	data.initial_load=getInitialSlide(data.start_diff);
	data.message=getMarquee(data.start_diff);
	data.closed=getTaskList();

	if(!input){
		data.widget=getDayWidget(data.start_diff);
	}else if(input && input.updateSlide!=undefined){
		var index = input.slideDex;
		data.slideIndex=input.slideDex;
	}else if(input && input.closePreBoard=='true'){
		console.log("Server Side Close");
		closeTasks();
		data.slideIndex=input.slideDex;
	}else if (input && input.closePreBoard==undefined){
		console.log('updated');
		data.closed=getTaskList();
		data.slideIndex=input.slideDex;
		console.log(data.closed);
	}

	function getStartDate(){
		var blankDate = new GlideDateTime().getDate().toString();
		var hrProfile = new GlideRecord('sn_hr_core_profile');
		if(hrProfile.get('user', gs.getUserID())){
			var startDate = new GlideDateTime(hrProfile.employment_start_date).getDate().toString();
			return startDate;
		}else{
			return blankDate;
		}	
	}

	function getDiffDate(start_date,today){
		var sd = new GlideDateTime(start_date);
		var td = new GlideDateTime(today);
		var diff = GlideDateTime.subtract(td,sd);
		var days = diff.getDayPart().toString();

		return days;

	}

	function getDayWidget(dd){

		if (dd<0){
			data.slideIndex = 0;
		} else if (dd==0){
			data.slideIndex = 1;
		} else if (dd==1){
			data.slideIndex = 2;
		}else if (dd==4){
			data.slideIndex = 3;
		}else if (dd==9){
			data.slideIndex = 4;
		}else if (dd==14){
			data.slideIndex = 5;
		}else if (dd==19){
			data.slideIndex = 6;
		}else if (dd==29){
			data.slideIndex = 7;
		}else{
			data.slideIndex = 0;
		}
		return;
	}

	function getInitialSlide(diff){
		var slide='';

		if (diff<0){
			slide = 0;
		} else if (diff==0){
			slide = 1;
		} else if (diff==1){
			slide = 2;
		}else if (diff==4){
			slide = 3;
		}else if (diff==9){
			slide = 4;
		}else if (diff==14){
			slide = 5;
		}else if (diff==19){
			slide = 6;
		}else if (diff==29){
			slide = 7;
		}else{
			slide =0;
		}
		return slide;
	}

	function getMarquee(diff){
		var message_data=[];
		var message = new GlideRecord('sn_hr_sp_hp_portal_marquee');
		message.addQuery('u_category','Carousel');
		if (diff>7){
			message.addQuery('u_days_before_start','14');
			message.addQuery('u_activity_set','Preboarding');
			message.query();
		}else if(diff>1&&diff<=7){
			message.addQuery('u_days_before_start','7');
			message.addQuery('u_activity_set','Preboarding');
			message.query();
		}else if(diff==1){
			message.addQuery('u_days_before_start','1');
			message.addQuery('u_activity_set','Preboarding');
			message.query();
		}else if(diff==0){
			message.addQuery('u_activity_set','Day 1');
			message.query();
		}else if(diff<-1&&diff>-4){
			message.addQuery('u_activity_set','Day 2');
			message.query();
		}else if(diff<=-4&&diff>-9){
			message.addQuery('u_activity_set','Day 5');
			message.query();
		}else if(diff<=-9&&diff>-14){
			message.addQuery('u_activity_set','Day 10');
			message.query();
		}else if(diff<=-14&&diff>-19){
			message.addQuery('u_activity_set','Day 15');
			message.query();
		}else if(diff<=-19&&diff>-29){
			message.addQuery('u_activity_set','Day 20');
			message.query();
		}else if(diff<=-29&&diff>-59){
			message.addQuery('u_activity_set','Day 30');
			message.query();
		}else if(diff<-58){

			message.addQuery('u_activity_set','Day 60');
			message.query();
		}

		while (message.next()){
			message_data.push({heading:message.u_short_description.toString(),
												 sub_heading:message.u_subheading.toString()});
		}
		return message_data;	
	}
	function getTaskList(){
		var count=0;

		var gr = new GlideRecord('sn_hr_core_task');
		gr.addEncodedQuery('sn_hr_le_activity.activity_set=de178f301bd080508cd886ae6e4bcb20')
		gr.addQuery('assigned_to',gs.getUserID());
		gr.query();

		while(gr.next()){
			if(gr.state!=10){
				count=count+1;
			}	
		}
		return count;
	}

	function closeTasks(){
		var count=0;

		var gr = new GlideRecord('sn_hr_core_task');
		gr.addEncodedQuery('sn_hr_le_activity.activity_set=de178f301bd080508cd886ae6e4bcb20')
		gr.addQuery('assigned_to',gs.getUserID());
		gr.setValue('state','3');
		gr.updateMultiple();

	}

})();