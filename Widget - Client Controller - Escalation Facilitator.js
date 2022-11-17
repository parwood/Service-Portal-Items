api.controller=function($uibModal,$scope,spUtil) {
  /* widget controller */
  var c = this;

	c.spawnModal = function() {
		c.modalInstance = $uibModal.open({
			templateUrl: 'modalTemplate',
			templateController: this,
			scope: $scope,
			windowClass: 'esc-modal'
		});
	}

	c.closeModal = function() {api.controller=function($uibModal,$scope,spUtil) {
  /* widget controller */
  var c = this;

	c.spawnModal = function() {
		c.modalInstance = $uibModal.open({
			templateUrl: 'modalTemplate',
			templateController: this,
			scope: $scope,
			windowClass: 'esc-modal'
		});
	}

	c.closeModal = function(comms) {
		   if (comms !=undefined) {
				 c.data.insertEntry = false;
				  c.server.update().then(c.data.clearOptions(comms));
				 c.modalInstance.close();
    }else{c.modalInstance.close();}
	}

	c.insertEntry = function(comms){
		c.data.insertEntry = 'true';
		c.data.customerComment = comms;
		c.server.update().then(function (){
			c.data.clearOptions();
			alert('Thank you, your incident has been escalated. The appropriate team will be in contact with you shortly.');});
	}

	c.cancelEntry = function(){
		c.closeModal();
	}

	c.data.clearOptions = function(comms) {
		comms = undefined;
		c.data.insertEntry='false';
		c.modalInstance.close();
    c.server.update();
  }

};
		   if (escData !=undefined) {
				 c.data.insertEntry = false;
				  c.server.update().then(c.data.clearOptions);
				 c.modalInstance.close();
    }else{c.modalInstance.close();}
	}

	c.insertEntry = function(comms){
		c.data.insertEntry = 'true';
		c.data.customerComment = comms;
		c.server.update().then(c.data.clearOptions);
	}

	c.cancelEntry = function(){
		c.closeModal();
	}

	c.data.clearOptions = function() {
		escData = undefined;
		c.data.insertEntry='false';
		c.modalInstance.close();
    c.server.update();
  }

};
