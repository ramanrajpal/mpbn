define(['services/services'], function(services) {
console.log("Inside the resourse");
services.factory('alertResourceService', ['$resource','$rootScope',function($resource,$rootScope) {
console.log("Trying to instatiate the service");
var conf = {'query': {method:'GET',isArray:true}};
var User = $resource('http://localhost:8080/getAlertDetails',{},conf);
console.log(" MEWWWEW-Called");
return User;
}]);
});