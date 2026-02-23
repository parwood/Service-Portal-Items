(function() {
/* populate the 'data' object */
/* e.g., data.table = $sp.getValue('table'); */

//make sure widget options are name "time_pairs", type string, and takes data in the following format 
//[{"city":"Seattle","city_code":"Los_Angeles","iana":"America/Los_Angeles"},{"city":"Denver","city_code":"Denver","iana":"America/Denver"},{"city":"Chicago","city_code":"Chicago","iana":"America/Chicago"},{"city":"New York","city_code":"New_York","iana":"America/New_York"},{"city":"Glasgow","city_code":"London","iana":"Europe/London"},{"city":"Brisbane","city_code":"Brisbane","iana":"Australia/Brisbane"}]


var myList = options.time_pairs; //Get options list from widget or default if no options set.
data.timeOptions = JSON.parse(myList); //Parse options to JSON

})();