define(['controllers/controllers'], function(controllers) {
controllers.controller('homeMonitorCtrl',['$scope', '$cookies',function($scope,$cookies) {
console.log("loading the home monitor contoller-------------------");
 //see if the user has the cookie for the admin true, if so the edit option of alarm must be rendered, else hid
 console.log("cookie++++++++" + $cookies.userAdminLevel);
 $scope.userAdmin = false;
 if ($cookies.userAdminLevel == '1') {
	$scope.userAdmin = true;
	}
$cookies.userAdminLevel = '1';
//get the name of the user from the cookie here
$scope.userName = $cookies.userName;
 $scope.slideH = [ {
		image: "scripts/vendor/bootstrap-3.2.0-dist/images/a4.png"
		},
		{
		image: "scripts/vendor/bootstrap-3.2.0-dist/images/a2.jpg"
		},
		{
		image: "scripts/vendor/bootstrap-3.2.0-dist/images/a2.png"
		},
		{
		image: "scripts/vendor/bootstrap-3.2.0-dist/images/a3.jpg"
		}];
}]);
});;