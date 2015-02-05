define(['services/services'], function(services) {
console.log("Inside the fetch names 22222");
services.factory('myextrafetchNames', ['$resource','$q', function($resource,$q) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.getVals = function(response) {
		var defer = $q.defer();
		response.val = "Radhe";
		console.log("now being called");
		defer.resolve(response);
		return defer.promise;
		};
	return obj;
	}]);
});