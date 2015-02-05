define(['services/services'], function(services) {
services.factory('subscriberaction', ['$resource', function($resource) {
var action = $resource('http://localhost:3000/myjson',
 {}, {
  details: {method:'GET', params:{charge:true}}
 });
return action;
}]);
});