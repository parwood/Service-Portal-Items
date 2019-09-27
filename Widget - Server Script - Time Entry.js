(function() {
  var utils = new x_usdo2_eta.EnterpriseTaUtils();
	var liu = gs.getUserID();

  function initialize() {
    data.profile = utils.getEmployeeProfile(gs.getUserID());
    data.timeCodes = utils.getTimeCodes();
    loadPayPeriods();
    setSelectedDate();
    data.timeCard = utils.getTimeCard(data.profile.sys_id, data.selectedPeriod.sys_id);
		checkForSig();
		setDefault();
    checkForInsert();
    data.dates = utils.getDates(data.timeCard.sys_id);
		data.totalHoursByCode = utils.getTotalHoursByCode(data.dates);
		totalHours();
    expandAllEntries();
    setEntriesList();
		setAttachment();
		entriesLength();
		loadRejectionReasons();
		loadSignatureNotes();
		loadDs7100(liu,data.selectedPeriod.sys_id,data.timeCard.sys_id);
		insertLeave();
	}

	function totalHours(){
		var hours = 0;
		 for (var i = 0; i < data.dates.length; i++) {
			 if(data.dates[i].totalHours != "--"){
				 hours += data.dates[i].totalHours;
			 }
		 }

		data.selectedPeriod.totalHours = hours;
	}

	function entriesLength(){
    for (var i = 0; i < data.dates.length; i++) {
      for (var j = 0; j < data.dates[i].entries.length; j++) {
        if (data.dates[i].entries[j].time_code.length > 12){
					data.dates[i].entries[j].time_code = data.dates[i].entries[j].time_code.substring(0, 9) + "...";
        }
      }
    }
  }

  function expandAllEntries() {
    for (var i = 0; i < data.dates.length; i++) {
      while (data.dates[i].entries.length < 4) {
        var tempDay = {
          time_code: "",
          hours: "--",
					short_code:""
        };
        data.dates[i].entries.push(tempDay);
      }
    }
  }

  function loadPayPeriods() {
    data.pay_periods = utils.getPayPeriods();
    data.pay_periods.forEach(function(period, idx) {
      if (period.current == 'true') {
        data.selectedPeriodIndex = getSelectedPeriod(period);
        data.currentPeriodIndex = period.index;
      }
    });
    data.selectedPeriod = data.pay_periods[data.selectedPeriodIndex];
  }

  function getSelectedPeriod(period) {
    var periodIndex;
    if (input && input.periodIndex != undefined) {
      periodIndex = input.periodIndex;
    } else {
      periodIndex = period.index;
    }
    return periodIndex;
  }

  function setSelectedDate() {
    if (input && input.selectedDate != undefined) {
      data.selectedDate = input.selectedDate
    } else {
      var gDate = new GlideDateTime().getLocalDate();
      data.selectedDate = {
        display: gDate.getByFormat("dd MMM YY"),
        query: gDate.getByFormat("yyyy-MM-dd")
      }
    }
  }

  function setEntriesList() {
    var timeCard = data.timeCard.sys_id;
		var sig = data.timeCard.employee_signature
    var date = data.selectedDate.query;
    var query = "time_card=" + timeCard + "^date_of_recordON" + date + "@javascript:gs.dateGenerate('" +
      date + "','start')@javascript:gs.dateGenerate('" + date + "','end')";
   gs.info(sig + ' ' + timeCard + ' ' + date + ' ' + query)
		var listOpt = {
      "table": "x_usdo2_eta_entry",
      "filter": query,
	  "signature_status": sig
    };
    data.listWidget = $sp.getWidget("ent-ta-edit", listOpt);
  }

	function setAttachment(){
		var attachmentOpt = {
        record_id: data.timeCard.sys_id,
				record_table: "x_usdo2_eta_timecard_entries"
      }
		 data.attachment = $sp.getWidget("timecard-attachments", attachmentOpt);
	}

  function checkForInsert() {
    if (input && input.selectedCode != undefined && input.inputHours != undefined && input.insertEntry) {
      var timeCard = data.timeCard.sys_id;
      var timeCode = input.selectedCode;
      var hours = input.inputHours;
      var dateOfRecord = data.selectedDate.query;
      utils.insertEntry(timeCard, timeCode, hours, dateOfRecord);
    }
  }

  function checkForSig() {
    if (input && input.signCard != undefined) {
      utils.employeeSig(data.timeCard.sys_id, input.signCard,data.profile.name);

		}
	}

	function setDefault() {
    if (input && input.setDefault == true) {
			//gs.info("input.setDefault == true")
      utils.setDefaultTimecard(data.timeCard.sys_id);
			}
	}

	function loadRejectionReasons() {
		data.reasons = utils.getRejectReason(data.timeCard.sys_id);
		data.reject = data.timeCard.rejected;
		//data.reasons = test.split("\n");
	}

	function loadSignatureNotes() {
		data.employee = utils.getEmployeeSignature(data.timeCard.sys_id);
		data.supervisor = utils.getSupervisorSignature(data.timeCard.sys_id);
		data.timekeeper = utils.getTimekeeperSignature(data.timeCard.sys_id);

		data.emp_sig = data.timeCard.employee_signature;
		if(data.emp_sig=="true"){
		data.test_emp = data.employee[0].employee_signature.split("Employee Signature: ");
		data.employee_sig = data.test_emp[1];
		}else{
			data.employee_sig = undefined;
		}

		data.sup_sig = data.timeCard.supervisor_signature;
		if(data.sup_sig=="true"){
		data.test_sup = data.supervisor[0].supervisor_signature.split("Supervisor Signature: ");
		data.supervisor_sig = data.test_sup[1];
		}else{
			data.supervisor_sig = undefined;
		}

		data.tk_sig = data.timeCard.timekeeper_signature;
	  if(data.tk_sig=="true"){
		data.test_tk = data.timekeeper[0].timekeeper_signature.split("Timekeeper Signature: ");
		data.timekeeper_sig = data.test_tk[1];
		}else{
		data.timekeeper_sig = undefined;
		}
	}

	function loadDs7100(emp,period,card){

		var sig = data.timeCard.employee_signature
    var query = "timecard=" + card;

    var listOpt = {
      "table": "x_usdo2_eta_leave_requests",
      "filter": query,
	  "signature_status": sig
    };
    data.leaveWidget = $sp.getWidget("ent-ta-leave", listOpt);
		var attachments = '';
		var fa = new GlideRecord('x_usdo2_eta_leave_requests');
		fa.addQuery('timecard',card);
		fa.query();

		while (fa.next()){
			attachments +=(','+fa.ds7100.sys_id.toString());
		}

		data.avail_ds_7100 = [];

		var ds = new GlideRecord('x_usdo2_t_a_ds_7100');
		ds.addQuery('opened_by',emp);
		ds.addQuery('pay_period','CONTAINS',period)
		ds.addQuery('sys_id','NOT IN',attachments)
		ds.query();

		while (ds.next()){
			data.avail_ds_7100.push({number:ds.number.toString(),
													period:ds.pay_period.getDisplayValue(),
															sys_id:ds.sys_id.toString()});
		}
	}

	function insertLeave(){
		 if (input && input.selectedLeave != undefined && input.insertLeave) {
			 var timeCard = data.timeCard.sys_id;
			 var leaveRecord = input.selectedLeave;

			 var il = new GlideRecord('x_usdo2_eta_leave_requests');

			 il.initialize();
			 il.timecard = timeCard;
			 il.ds7100 = leaveRecord;
			 il.insert();

			 loadDs7100(liu,data.selectedPeriod.sys_id,data.timeCard.sys_id);
    }
	}

  initialize();
})();
