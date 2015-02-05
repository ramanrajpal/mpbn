define(['controllers/controllers'], function(controllers) {
controllers.controller('alertAddCtrl',['$scope', '$cookies', 'configureAlertAction',function($scope,$cookies,configureAlertAction) {
console.log("loading the alertAdd contoller-------------------");
$scope.Alarmstatus = {
    isopen: false
  };
$scope.Trendingstatus = {
    isopen: false
  };
 //see if the user has the cookie for the admin true, if so the edit option of alarm must be rendered, else hid
 console.log("cookie++++++++" + $cookies.userAdminLevel);
 $scope.userAdmin = false;
 if ($cookies.userAdminLevel == '1') {
	$scope.userAdmin = true;
	}
$cookies.userAdminLevel = '1';

$scope.availabeKPI = ["Port_Utilization","CPU_Utilization","Temperature"];
$scope.kpiSelected = "";
$scope.NodeSelected = [];
//$scope.NodeSelected.nodes.push();
$scope.NodeList = ["Node1","Node2","Node3","Node4","Node5","Node6","Node7","Node8"];
$scope.portList = {
		Node1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node2 : [21,22,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node3 : [31,32,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node4 : [41,42,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node5 : [51,52,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node6 : [61,62,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		Node7 : [71,72,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		};
$scope.portSelected = {
		Node1 : [],
		Node2 : [],
		Node3 : [],
		Node4 : [],
		Node5 : [],
		Node6 : [],
		Node7 : [],
		Node8 : [],
		};
$scope.kpiType = {
	"Port_Utilization" : true,
	"CPU_Utilization" : false,
	"Temperature": false,
};
/*$scope.NodeList = {
    Node1: false,
    Node2: false,
    Node3: false,
	Node4: false,
	Node5: false,
	Node6: false,
	Node7: false,
	Node8: false,
  };
 */
  //set the port list here
  /*
  $scope.portList = {
	Node1: { 1: false,
			2 : false,
			3 : false,
			4 : false,
	},
	Node2: { 11: false,
			21 : false,
			33 : false,
			44 : false,
	
	},
	};
	*/
$scope.threshold = {
	value : 0,
	type : {
		"Percent" : true,
		"Value" : false,
		},
	};
$scope.threshold1 = -1;
$scope.threshold2 = -1;
$scope.threshold3 = -1;
$scope.threshold4 = -1;
$scope.severityList = ["Info","Warn","Min","Alert","Severe"];
$scope.chosenSeverity = "";
console.log($scope.kpiSelected);
$scope.divtoShow = {
		Viewlist : false,
		Alarmlist : false,
		Create : false,
		};
$scope.setshowIdentifier = function (type) {
	//disable all types to show as false
	for (var divType in $scope.divtoShow) {
		$scope.divtoShow[divType] = false;
		}
	$scope.divtoShow[type] = true;
	};
$scope.saveAlertConfiguration = function() {
//get the type of kpi being selected, we'll create the same request object as for the graph tracing
	var alert_reqObject = {};
	alert_reqObject[$scope.kpiSelected] = {};

	alert_reqObject[$scope.kpiSelected].nodeInfo = [];
	//var node_info = {};
	//if (kpiType == "Port_Utilization") {
		for (var t= 0; t<$scope.NodeSelected.length;t++) {
			//if (kpiType == "Port_Utilization") {
				var node_info = {};
				node_info.name = $scope.NodeSelected[t];
				console.log($scope.NodeSelected[t]);
				node_info.portlist = $scope.portSelected[$scope.NodeSelected[t]];
				node_info.values = [$scope.threshold1,$scope.threshold2,$scope.threshold3,$scope.threshold4];
				alert_reqObject[$scope.kpiSelected].nodeInfo.push(node_info);
				//}
			}
				//determine the portselected
			/*
				node_info[$scope.kpiType].nodeInfo = 
			for (var nodes in $scope.portSelected) {
				//the keys to this object are nodenames
				alert_reqObject.nodeInfo.name = nodes;
				alert_reqObject.nodeInfo.portlist = $scope.portSelected[nodes];
				alert_reqObject.nodeInfo.values = [$scope.threshold1,$scope.threshold2,$scope.threshold3,$scope.threshold4];
				alert_reqObject.nodeInfo.kpi = $scope.kpiType;
				}
		//}
		//upda the info into the DB, using the save ooption
		*/
		
		configureAlertAction.postAlert(alert_reqObject);
		//re-initialized the data here
		for (var t= 0; t<$scope.NodeSelected.length;t++) {
			$scope.portSelected[$scope.NodeSelected[t]] = [];
			}
		$scope.NodeSelected = [];
};
}]);
});;