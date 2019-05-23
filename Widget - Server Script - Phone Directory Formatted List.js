(function() {
var directory = $sp.getParameter('directory');
	/* Step 1. Load initial data from the server */
			/* populate the 'data' object */
			/* e.g., data.table = $sp.getValue('table'); */

	if(!input) {
//console.log('*** SERVER BEGIN ***'); // info line
data.parent = []; // leave it empty to troubleshoot later.

//console.log('SERVER: Initiate Parent query'); // info line
var grParent = new GlideRecord('x_usdo2_phone_dire_divisions');
		grParent.addQuery('associated_directory',directory);
    grParent.addQuery('active',true);
    grParent.orderBy('order');
    grParent.query();

//console.log('Parent Row Count: '+grParent.getRowCount());

while(grParent.next())
{
    var sys_id = grParent.getValue('sys_id')+""; // cleaner
    var tempObj =  {
        'id': sys_id+"",
        'room':grParent.getDisplayValue('room_number')+"",
        'display': grParent.getDisplayValue('label')+"",
        'child': []
        }

    //console.log('parent tempObj:'); // log object to make sure everything looks ok
    //console.log(JSON.stringify(tempObj));

    data.parent.push(tempObj); // push object to associative array value, using sys_id as key
}

//console.log('parent');
//console.log(JSON.stringify(data.parent));

//console.log('SERVER: Initiate Child Queries'); // info line
for(x in data.parent)
{
    var parentRec = data.parent[x]; // cleaner
    var parentID = parentRec.id+""; // cleaner
    //console.log('parent: ' + parentRec.display); // show which object you're currently on a loop for

    var grChild = new GlideRecord('x_usdo2_phone_dire_numbers');
        grChild.addQuery('division',parentID+"");
        grChild.addQuery('active',true);
				grChild.orderBy('order');
        grChild.query();

    //console.log('Child Row Count: '+grChild.getRowCount());

    while(grChild.next())
    {
        var childID = grChild.getValue('sys_id')+""; // cleaner
        var tempObj = {
            'parentID': parentID+"", // make sure parent ID is in object so you can match to parent if needed.
            'sys_id': childID+"", // make sure sys_id is in object so you can match to key if needed.
            'user_last': grChild.getDisplayValue('last_name')+"",
            'user_first': grChild.getDisplayValue('first_name')+"",
            'user_office': grChild.getDisplayValue('office')+"",
            'user_title': grChild.getDisplayValue('job_title')+"",
            'user_div': grChild.getDisplayValue('division')+"",
            'user_office_phone': grChild.getDisplayValue('office_phone')+"",
            'user_official_cell': grChild.getDisplayValue('official_cell')+"",
            'user_home_phone': grChild.getDisplayValue('home_phone')+"",
            'user_alternate_phone': grChild.getDisplayValue('alternate_phone')+"",
            'user_short_extension': grChild.getDisplayValue('short_extension')+""
            }

       // console.log('child tempObj')
       // console.log(JSON.stringify(tempObj)); // log object to make sure everything looks ok
        parentRec.child.push(tempObj); // push object to associative array value, using sys_id as key
        //console.log('parentRec: ');
        //console.log(JSON.stringify(parentRec));
        //console.log('');
     }
}


//console.log('data.parent: '); // final progress of associative array
//console.log(JSON.stringify(data.parent));
//console.log('*** SERVER END ***');
	}


	/* Step 4. Process user input */

	if(input) {

	}

})();
