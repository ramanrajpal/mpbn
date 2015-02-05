define(['services/services','services/snmpoidget'], function(services) {
console.log("Inside the fetch names");
services.factory('getoidList', ['$resource','$q','$rootScope','snmpoidget', function($resource,$q,$rootScope,snmpoidget) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.getSNMPOids = function(name) {
		var defer = $q.defer();
		console.log("deferring called with" +name);
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		 snmpoidget.query({nname:name},function(data) {
		//var returnobj = {};
		console.log("From the snmp get " + data);
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