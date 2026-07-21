api.controller=function($scope) {
	/* widget controller */
	var c = this;

	c.data.options='';

	c.clearForm = function(){

		$scope.lastname='';
		$scope.middlename='';
		$scope.bookingnumber='';
		$scope.firstname='';
		$scope.birthday='';
		$scope.gender='';
		c.server.get(
			{options: 'booking_numberISEMPTY'}
		).then(function(response) { 
			c.data.table_widget = response.data.table_widget; 
			c.data.showTable =false;    });
	};

	c.sendParams = function(lastName,middleName,bookingNumber,firstName,birthday,gender) {
		if(lastName){
			var last_filter='^last_nameLIKE'+lastName;
		}else{
			last_filter='';
		}
		if(middleName){
			var middle_filter='^middle_nameLIKE'+middleName;
		}else{
			middle_filter='';
		}
		if(bookingNumber){
			var booking_filter='^booking_numberLIKE'+bookingNumber;
		}else{
			booking_filter='';
		}
		if(firstName){
			var first_filter='^first_nameLIKE'+firstName;
		}else{
			first_filter='';
		}
		if(birthday){
			var new_date = new Date(birthday).toISOString().split('T')[0]
			var bday_filter='^date_of_birthON'+new_date+`@javascript:gs.dateGenerate('`+new_date+`','start')@javascript:gs.dateGenerate('`+new_date+`','end')`
			}else{
				new_date='';
				bday_filter='';
			}
		if(gender){
			var gender_data = gender.sysID;
			var gender_filter='^sex='+gender_data
			}else{
				gender_data = '';
				gender_filter='';
			}
		c.data.showTable = false; 
		c.server.get(
			{options: 'book_date_timeONLast 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()'+last_filter+middle_filter+booking_filter+first_filter+bday_filter+gender_filter}
		).then(function(response) { 
			c.data.table_widget = response.data.table_widget; 
			c.data.showTable =true;    });
	};

};

