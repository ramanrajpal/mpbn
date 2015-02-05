define(['controllers/controllers'], function(controllers) {
controllers.controller('mainMonitoringCtrl',['$scope', '$cookies',function($scope,$cookies) {
//determine the tab selections here
$scope.tabulatY = {
	home:true,
	trending:false,
	alarm:false,
	};
$scope.tabulatYTrending = false;
$scope.setMainTab = function(type) {
	//set all the false first
	console.log("SASDNKOSJKLJFIKJDSOIJFDOI" + type);
	for (var k in $scope.tabulatY) {
		$scope.tabulatY[k] = false;
		}
	$scope.tabulatY[type] = true;
	console.log($scope.tabulatY.alarm);
	
	};
$scope.cocal = function() {
console.log("KROIHUDBUIWU89898989898");
$scope.tabulatYTrending = !$scope.tabulatYTrending;
};
}]);
});;