function($uibModal, $scope, $http, spUtil, $rootScope) {
	var c = this;
	//console.log("Total Hours: " + c.data.selectedPeriod.totalHours);

	c.openModal = function() {
		console.log('opening modal')
		c.modalInstance = $uibModal.open({
			templateUrl: 'modalTemplate',
			templateController: this,
			scope: $scope,
			windowClass: 'entries-modal'
		});
	}

	c.closeModal = function() {
		   if (c.data.inputHours >= 0||c.data.inputHours==undefined||c.data.selectedCode==undefined) {
				 c.data.insertEntry = false;
				  c.server.update().then(c.data.clearOptions);
				 c.modalInstance.close();
    }else{c.modalInstance.close();}
	}

  var _update = $rootScope.$on('updateAll', function() {
    c.server.update();
  })

  c.payPeriodChange = function(args, periodIndex) {
    c.data.periodIndex = periodIndex;
    c.server.update().then(function(){
			$rootScope.$broadcast('periodChange', {change:true});
		});
  };

  c.changeDate = function(date) {
    c.data.selectedDate = date;
    c.server.update();
		c.openModal();
  };

  c.data.clearOptions = function() {
		c.data.selectedCode = undefined;
    c.data.inputHours = undefined;
    c.server.update();
  };

	c.data.clearLeave = function() {
		c.data.selectedLeave = null;
    c.server.update();
  };

	c.data.clearDef = function(){
		c.data.setDefault = undefined;
		c.server.update();
	};

  c.insertEntry = function() {
    if ((c.data.selectedCode != undefined && c.data.inputHours > 0)||(c.data.selectedCode == 'b0991f38db84b3402d617e721f961974' && c.data.inputHours == 0)) {
			c.data.insertEntry = true;
      c.server.update().then(c.data.clearOptions);
    }
  }

  c.signCard = function(bool) {
    c.data.signCard = bool;
    c.server.update().then(function (){
			c.data.signCard=undefined;
			c.server.update();})
		//c.server.update();
  }

	c.setDefault = function(){
		c.data.setDefault = true;
		c.server.update().then(c.data.clearDef);
	}

	c.attachLeave = function() {
    if (c.data.selectedLeave != undefined) {
			console.log('Attaching Record');
			c.data.insertLeave = true;
      c.server.update().then(c.data.clearLeave);
    }
  }
}
