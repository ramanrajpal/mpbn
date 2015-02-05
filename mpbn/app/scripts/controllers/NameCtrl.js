define(['controllers/controllers','services/myfetchNames','services/myextrafetchNames'], function(controllers) {
controllers.controller('NameCtrl', ['$scope','$interval','myfetchNames', 'myextrafetchNames',function($scope,$interval,myfetchNames,myextrafetchNames) {
console.log("loading the name contoller-------------------");
//var funref = myfetchNames.getNames;
$scope.test = $interval(function() {
	myfetchNames.getNames().then(function (response) {
	console.log("Response getting available");
	$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	//}).then(function (myresp) {
		//$scope.test = myresp.val;
		//$scope.$apply();
		
		})},20000);

	//$scope.test = myfetchNames.name;
}]);
});;