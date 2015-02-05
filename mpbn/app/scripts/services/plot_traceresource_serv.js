define(['services/services'], function(services) {
console.log("Inside the PLOTTTTTT");
services.factory('plot_traceresource_serv', ['$resource','$rootScope',function($resource,$rootScope) {
console.log("Trying to instatiate the service");
var conf = {'query': {method:'POST',isArray:false}};
var User = $resource('http://localhost:80/mpbn/json_connect.php',{headers:{'Accept': 'application/json',"Content-type": 'application/json'}},conf);
console.log("---------------------Called");
return User;
}]);
});