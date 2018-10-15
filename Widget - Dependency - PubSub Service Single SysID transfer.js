function spAppPubSub($rootScope){
	var selectedApp = "selectedApplication";

	function _publish (applicationSysID){
		$rootScope.$emit(selectedApp,
			{
				appSysID: applicationSysID
			});
	}
	function _subscribe($scope, handler){
		$rootScope.$on(selectedApp, function(event, message){
			handler(message.appSysID);
		});
	}
	return{
		notifyAppSelect: _publish,
		onAppSelect: _subscribe}
	}
