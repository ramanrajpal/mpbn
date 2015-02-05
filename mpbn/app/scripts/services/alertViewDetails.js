define(['services/services','services/alertResourceService'], function(services) {
console.log("Inside the Alert View Services names");
services.factory('alertViewDetails', ['$resource','$q','$rootScope','alertResourceService', function($resource,$q,$rootScope,alertResourceService) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch the alerts as an array of objects
	
	var obj = {};
	obj.getAllAlerts = function() {
		var defer = $q.defer();
		console.log("deferring called");
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		 alertResourceService.query(function(data) {
		//var returnobj = {};
		console.log("this is the " + data);
		//obj = data;
		//obj.name = myresourceserv.name;
		//$rootScope.$apply;
		
		defer.resolve(data);

		
		},function(err) {
		console.log("error");
		defer.reject({"name" : "mess"});
		});
		
		//});
	return defer.promise;
	};
	
	
	return obj;
	}]);
});