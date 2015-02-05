define(['controllers/controllers'], function(controllers) {
controllers.controller('CCCVCVC', ['$scope',function($scope) {
console.log("loading theCCCVCVC-------------------");
$scope.default_home = true;
  $scope.tabs = [
    { title:'Dynamic Title 1' },
    { title:'Dynamic Title 2' }
  ];
//default color setting for multiple check box selection as the drop down value
$scope.backgroundcolorports = {
Node1: { 1: {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
			2 : {
			'background-color' : '#fff',
			'z-index':'-1',
		
			},
			3 : {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
			4 : {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
	},
	Node2: { 11: {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
			21 : {
			'background-color' : '#fff',
			'z-index':'-1',
			
			
			},
			33 : {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
			44 : {
			'background-color' : '#fff',
			'z-index':'-1',
			
			},
	
	},
	};
$scope.setMultipleSelectBackground = function(node, port,bool) {
//set the background to the color you want if the check box has been checked
if (bool) {
$scope.backgroundcolorports[node][port] = {
'background-color' : '#A0CFEC',
'z-index':'1000',


};
} else {
$scope.backgroundcolorports[node][port] = {
'background-color' : '#fff',
'z-index':'1000',

};
}
};
  $scope.lineChartCategory = true;
  $scope.gaugeCategory = true;
  $scope.stackedChartsCategory = true;
  $scope.ports_utilization = false;
  
  
  $scope.enableOnlyStackCharts = function () {
	 $scope.gaugeCategory = false;
	 $scope.lineChartCategory = false;
	 $scope.stackedChartsCategory = true;
	 $scope.isCollapsed = false;
	 //default values for the kpi dropdown in the navbar-left when the user selects the Gauge,charts and the stackedcharts options
	 $scope.textForLeftNav = 'System Uptime';
	 $scope.ports_utilization = false;
  };
  $scope.enableOnlylineChart = function () {
	 $scope.gaugeCategory = false;
	 $scope.stackedChartsCategory = false;
	 $scope.lineChartCategory = true;
	  $scope.isCollapsed = false;
	  //default values for the kpi dropdown in the navbar-left when the user selects the Gauge,charts and the stackedcharts options
	 $scope.textForLeftNav = 'Port Utilization';
	 $scope.ports_utilization = true;
  };
  $scope.enableOnlygaugeCharts = function () {
	 $scope.lineChartCategory = false;
	 $scope.stackedChartsCategory = false;
	 $scope.gaugeCategory = true;
	  $scope.isCollapsed = false;
	  //default values for the kpi dropdown in the navbar-left when the user selects the Gauge,charts and the stackedcharts options
	 $scope.textForLeftNav = 'CPU Utilization';
	 $scope.ports_utilization = false;
  };
	
   $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
   $scope.status = {
    isopen: false
  };
   $scope.isCollapsed = true;
   $scope.cheeee = function(listitem) {
	console.log("dddddddddddd");
	$scope.isCollapsed = false;
	$scope.textForLeftNav = listitem;
	//update the variable in case its the port utilization selected by the user here
	if(listitem == "Port Utilization") {
		$scope.ports_utilization = true;
		} else {
		$scope.ports_utilization = false;
		}
	$scope.lineChartCategory = true;
  $scope.gaugeCategory = true;
  $scope.stackedChartsCategory = true;
  
	};
	$scope.updateLeftNav = function(item) {
		$scope.textForLeftNav = item;
		if(item == "Port Utilization") {
		$scope.ports_utilization = true;
		} else {
		$scope.ports_utilization = false;
		}
		};
	//accordian sign changes
	//$scope.accordian.trending = {
	//};
	//for node selection
	$scope.checkModel = {
    Node1: false,
    Node2: false,
    Node3: false,
	Node4: false,
	Node5: false,
	Node6: false,
	Node7: false,
	Node8: false,
  };
  //set the port list here
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
  //timepicker
  $scope.mytime = new Date();
 $scope.hstep = 1;
  $scope.mstep = 15;



 

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  
  

  $scope.clear = function() {
    $scope.mytime = null;
  };
  //end timepicker
  //start the trending here
  $scope.hidemynavleft = function() {
  $scope.isCollapsed = true;
  $scope.default_home = false;
  //var t = $scope.portList.Node1 + '.1';
  for (var nodes in $scope.portList) {
	for (var ports in $scope.portList[nodes]) {
		console.log("this is the value selected by the user for node " + nodes + " and port is " + ports + "value selected is : " + $scope.portList[nodes][ports] );
		}
		}
  console.log("this is the caught :" + $scope.portList.Node1[1]);
  };
  ///images for the carousel
  $scope.slides = [ {
       
        image: "C:\\Project\\Javascript\\app\\scripts\\vendor\\bootstrap-3.2.0-dist\\images\\g1.png"
    },
    {
       
        image: "C:\\Project\\Javascript\\app\\scripts\\vendor\\bootstrap-3.2.0-dist\\images\\g2.png"
    },
	{
       
        image: "C:\\Project\\Javascript\\app\\scripts\\vendor\\bootstrap-3.2.0-dist\\images\\g3.png"
    },
	{
       
        image: "C:\\Project\\Javascript\\app\\scripts\\vendor\\bootstrap-3.2.0-dist\\images\\g4.png"
    }];
}]);
});


