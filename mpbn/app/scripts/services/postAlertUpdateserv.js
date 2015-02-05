define(['services/services'], function(services) {
console.log("Inside the POST alert info");
services.factory('postAlertUpdateserv', ['$resource','$rootScope',function($resource,$rootScope) {
console.log("Trying to instatiate the service");
var conf = {'save': {method:'POST',isArray:true}};
var User = $resource('http://localhost:8080/updateAlertInformation',{headers:{'Accept': 'application/json',"Content-type": 'application/json'}},conf);
console.log("---------------------Called");
return User;
}]);
});