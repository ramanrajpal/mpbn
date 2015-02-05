define(['services/services','services/snmpgaugeget'], function(services) {
services.factory('snmpgauges', ['$resource','$q','$rootScope','snmpgaugeget',function($resource,$q,$rootScope,snmpgaugeget) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.getAllDials = function() {
		var defer = $q.defer();
		console.log("deferring called with" +name);
		 snmpgaugeget.query(function(data) {
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