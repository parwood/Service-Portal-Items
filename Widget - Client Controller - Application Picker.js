function($scope,spAppPubSub) {
   /* widget controller */
   var c = this;


   /* Step 3. Accept user input */

	c.selectApp = function(select_app){
		spAppPubSub.notifyAppSelect(select_app.appSysID);
	}
}	
