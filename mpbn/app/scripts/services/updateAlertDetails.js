define(['services/services','services/postAlertUpdateserv'], function(services) {
console.log("Inside the fetch names");
services.factory('updateAlertDetails', ['$resource','$q','$rootScope','postAlertUpdateserv', function($resource,$q,$rootScope,postAlertUpdateserv) {
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
		postAlertUpdateserv.save(jsonObject,function(data) {
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