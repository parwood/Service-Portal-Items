function($scope, $uibModal) {
	/* widget controller */
	var c = this;
	c.data.survey=true;
	c.data.banking_task=true;

	c.closeVideo = function(){
		c.data.closeVideo = true;
		c.server.update();//.then(c.data.closeVideo=undefined);
	}

	c.closeSurvey = function(){
		c.data.survey=false;
	}

	c.closeBanking = function(sid){
		c.data.closeBanking=true;
		c.data.banking_task=false;
		c.data.task_to_close=sid;
		c.server.update();
	}
}
