define(['services/services'], function(services) {
services.factory('myTestservice', ['$resource','$q', function($resource,$q) {
console.log("Trying to instatiate the service");
var obj = {};
obj.name = "krishna";
return obj;
}]);
});