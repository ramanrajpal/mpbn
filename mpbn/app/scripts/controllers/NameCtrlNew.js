define(['controllers/controllers','services/selectfetchAllDetails','services/selectfetchNamesid'], function(controllers) {
controllers.controller('NameCtrlNew', ['$scope', 'selectfetchAllDetails','selectfetchNamesid',function($scope,selectfetchAllDetails,selectfetchNamesid) {
console.log("loading the name contoller-------------------");
//var funref = myfetchAllNames.getNames;
$scope.data = [];
$scope.data = selectfetchAllDetails.getNames().then(function (response) {
	//console.log(response);
	//$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	$scope.data = response;
	//$scope.myColor = $scope.data[0].name;
	$scope.mystate = response[0];
	});
	//$scope.mystate = "HP";
	//$scope.test = myfetchNames.name;
$scope.mystate2 = "select id";
$scope.ndata = [];
$scope.getdetails = function() {
	//the mystate object contains the object on which onchange event was fired!!
	//get the data from the db for this name
	$scope.ndata = selectfetchNamesid.getNames($scope.mystate.name).then(function (response) {
	$scope.ndata = response;
	$scope.mystate2 = response[0];
	console.log(response[0].id + "--------------+++++++++++++++++++");
	});
	};
}]);
});;