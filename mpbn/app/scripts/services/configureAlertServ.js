define(['services/services'], function(services) {
console.log("Inside the POST alert info");
services.factory('configureAlertServ', ['$resource','$rootScope',function($resource,$rootScope) {
console.log("Trying to instatiate the service");
var conf = {'save': {method:'POST',isArray:true}};
var User = $resource('http://localhost:80/mpbn/insertUpdateAlert.php',{headers:{'Accept': 'application/json',"Content-type": 'application/json'}},conf);
console.log("---------------------Called");
return User;
}]);
});