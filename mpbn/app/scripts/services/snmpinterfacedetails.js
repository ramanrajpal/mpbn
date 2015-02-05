define(['services/services','services/snmpinterfaceresourceserv'], function(services) {
console.log("Inside the fetch names");
services.factory('snmpinterfacedetails', ['$resource','$q','$rootScope','snmpinterfaceresourceserv', function($resource,$q,$rootScope,snmpinterfaceresourceserv) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.getNames = function(name) {
		var defer = $q.defer();
		console.log("---------------------------" + name);
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		 snmpinterfaceresourceserv.query({nname:name},function(data) {
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