define(['controllers/controllers','services/myfetchAllNames','services/myextrafetchNames','services/myfetchNamesdetails'], function(controllers) {
controllers.controller('NameCtrlList', ['$scope', 'myfetchAllNames', 'myextrafetchNames','myfetchNamesdetails',function($scope,myfetchAllNames,myextrafetchNames,myfetchNamesdetails) {
console.log("loading the name contoller-------------------");
//var funref = myfetchAllNames.getNames;
$scope.data = [];
$scope.data = myfetchAllNames.getNames().then(function (response) {
	//console.log(response);
	//$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	$scope.data = response;
	
	
	});
$scope.getNameDetails = function(index) {
	console.log("callback called");
	var name = $scope.data[index].name;
	//get the service which will get the name details from the back-end here
	$scope.ndata = myfetchNamesdetails.getNames(name).then(function (response) {
	//console.log(response);
	//$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	console.log("======================================" + index);
	//$scope.data[index].showitems = "true";

  //$digest or $apply

	
		$scope.data[index].state = response.state;
	console.log($scope.data[index].state + ")))))))))))))))))))))");

	//$scope.ndata = response;
	
	});
};
	//$scope.test = myfetchNames.name;
}]);
});;