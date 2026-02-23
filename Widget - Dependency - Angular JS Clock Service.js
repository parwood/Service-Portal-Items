//name service angularJSClock create angular provider as a service
//make sure widget options are name "time_pairs", type string, and takes data in the following format 
//[{"city":"Seattle","city_code":"Los_Angeles","iana":"America/Los_Angeles"},{"city":"Denver","city_code":"Denver","iana":"America/Denver"},{"city":"Chicago","city_code":"Chicago","iana":"America/Chicago"},{"city":"New York","city_code":"New_York","iana":"America/New_York"},{"city":"Glasgow","city_code":"London","iana":"Europe/London"},{"city":"Brisbane","city_code":"Brisbane","iana":"Australia/Brisbane"}]

function($timeout, $window) {
    var service = {};
    
    // Function to get the current time
    service.getCurrentTime = function() {
        return new Date();
    };

    // Function to start a clock that updates a scope variable
    service.startClock = function($scope, timeVariableName,tz) {
        function updateTime() {
            $scope[timeVariableName] = new Date().toLocaleString('en-US', { timeZone: tz, timeStyle:'medium'});
            // Use $timeout to schedule the next update, integrated with Angular's digest cycle
            $timeout(updateTime, 1000); 
        }
        updateTime();
    };

    return service;
}