define(['services/services'], function(services) {
console.log("Inside the resourse");
services.factory('snmpgaugeget', ['$resource','$rootScope',function($resource,$rootScope) {
console.log("Trying to instatiate the service");
var conf = {'query': {method:'GET',isArray:false}};
var User = $resource('http://localhost:8080/getgauges/',{},conf);
console.log("---------------------Called");
return User;
}]);
});