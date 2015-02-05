define(['services/services','services/selectnamedetailresourceserv'], function(services) {
console.log("Inside the fetch names");
services.factory('selectfetchAllDetails', ['$resource','$q','$rootScope','selectnamedetailresourceserv', function($resource,$q,$rootScope,selectnamedetailresourceserv) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.getNames = function() {
		var defer = $q.defer();
		console.log("deferring called");
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		 selectnamedetailresourceserv.query(function(data) {
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