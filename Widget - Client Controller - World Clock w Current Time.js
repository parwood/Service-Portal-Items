api.controller=function($scope, $interval, $filter, angularJSClock) {
	/* widget controller */
	var c = this;
	c.data.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; //Get users current TZ
	angularJSClock.startClock($scope, 'myTime',c.data.userTimeZone);	

	for (var i = 0; i < c.data.timeOptions.length; i++) {
		// Access current item in the loop
		var item = c.data.timeOptions[i];

		//Set currentTime to current city code in the loop and start that time using the angularJSClock dependency
		currentTime=item.city_code;
		angularJSClock.startClock($scope, currentTime,item.iana);
	}



};