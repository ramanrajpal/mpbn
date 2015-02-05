define(['services/services','services/configureAlertServ'], function(services) {
console.log("Inside the fetch names");
services.factory('configureAlertAction', ['$resource','$q','$rootScope','configureAlertServ', function($resource,$q,$rootScope,configureAlertServ) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.postAlert = function(jsonObject) {
		var defer = $q.defer();
		console.log("---------------------------" + name);
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		  var serverData = JSON.stringify(jsonObject);
		  console.log("+++++++++++ : -------------" + serverData );
		configureAlertServ.save(jsonObject,function(data) {
		//var returnobj = {};
		console.log("Are we geting here 1!!!!!!! " + data);
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