function() {
   /* widget controller */
   var c = this;

   /* Step 3. Accept user input */
		c.selectAg = function(record){
		c.data.selectedAg = record.agValue.toString();
		c.data.selectedState = record.agState.toString();
		c.data.selection = record.agName.toString();
		c.server.update();
	}

	//Sort Functionality
		c.sortOrder = false;
	c.changeSortCol=function(key){
		if(key == c.orderCol)
			c.sortOrder = !c.sortOrder;
		else
			c.sortOrder = false;
		c.orderCol = key;
	}





}
