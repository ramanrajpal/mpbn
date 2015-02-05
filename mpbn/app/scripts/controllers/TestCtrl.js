define(['controllers/controllers','services/myTestservice'], function(controllers) {
controllers.controller('TestCtrl', ['$scope', 'myTestservice',function($scope,myTestservice) {
console.log("loading the contoller-------------------");
$scope.test = myTestservice.name;
}]);
});