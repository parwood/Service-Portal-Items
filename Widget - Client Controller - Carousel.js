function($window, $scope, $timeout) {
	/* widget controller */
	var c = this;
	var slides = $scope.data.slides;
	var date_diff = c.data.start_diff;
	c.data.updateSlide=undefined;
	c.data.firstLoad = 'true';
	var initSlide = c.data.initial_load;
	c.data.closePreBoard=undefined;

	c.completeTasks = function(index){
		console.log("Completing Tasks");
		c.data.closePreBoard='true';
		c.data.slideDex = index;
		c.data.updateSlide=undefined;
		c.server.update().then($timeout(
			function(){
				console.log("Setting Undefined");
				c.data.updateSlide=undefined;
				c.data.slideDex = index;
				c.data.closePreBoard=undefined;
				c.server.update();
			},100));
	}

	c.changeActive = function(index){
		console.log('index: ', index);
		slides[index].active = true;
		c.data.slideDex = index;
		c.data.updateSlide = true;
		c.server.update().then(function(){ 
			console.log("after update: ", c.data.slideIndex);
		});

	}
	
	$scope.$watch(function () {
		for (var i = 0; i < slides.length; i++) {
			if (slides[i].active) {
				var indexSlide = i;
				return slides[i];
			}
		}
	}, function (currentSlide, previousSlide) {
		if (currentSlide != previousSlide && c.input==undefined) {
			var indexSlide = currentSlide.order.toString();
			console.log('previousSlide: ', previousSlide);
			console.log('currentSlide: ', currentSlide);
			console.log('firstLoad: ', c.data.firstLoad);
			c.changeActive(indexSlide);
		}
	});





}