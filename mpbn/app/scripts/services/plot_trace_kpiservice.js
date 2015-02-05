define(['services/services','services/plot_traceresource_serv'], function(services) {
console.log("Inside the fetch names");
services.factory('plot_trace_kpiservice', ['$resource','$q','$rootScope','plot_traceresource_serv', function($resource,$q,$rootScope,plot_traceresource_serv) {
console.log("Trying to instatiate the service to do real task");
//query the web-server for a json,asyn fetch
	
	var obj = {};
	obj.plot_trace = function(jsonObject) {
		var defer = $q.defer();
		console.log("---------------------------" + name);
		 //$rootScope.$apply(function(){
		 //$rootScope.$apply() (function () {
		  var serverData = JSON.stringify(jsonObject);
		  console.log("+++++++++++ : -------------" + serverData );
		plot_traceresource_serv.query(jsonObject,function(data) {
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