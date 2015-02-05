define(['controllers/controllers','services/snmpnodedetails','services/snmpinterfacedetails','services/getoidList'], function(controllers) {
controllers.controller('Snmp_Ctrl', ['$scope','$interval','snmpnodedetails','snmpinterfacedetails','getoidList',function($scope,$interval,snmpnodedetails,snmpinterfacedetails,getoidList) {
console.log("loading the name contoller-------------------");
//var funref = myfetchAllNames.getNames;
$scope.data = [];
$scope.data = snmpnodedetails.getNames().then(function (response) {
	//console.log(response);
	//$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	$scope.data = response;
	//$scope.myColor = $scope.data[0].name;
	//$scope.mystate = response[0];
	});
	//$scope.mystate = "HP";
	//$scope.test = myfetchNames.name;
$scope.mystate2 = "select id";
$scope.ndata = [];
//define the bar graph here
$scope.highchartsNG = {
        options: {
            chart: {
                type: 'area'
            }
        },
		 xAxis: {
            type: 'datetime',
			labels : {
				formatter: function() {
					//var myDate = new Date();
					//var newDateMs = Date.UTC(myDate.getUTCFullYear(),myDate.getUTCMonth(),myDate.getUTCDate(),myDate.getUTCHours(),myDate.getUTCMinutes());   
					//return Highcharts.dateFormat('%e. %b. %H:%M:%S',newDateMs); 
					console.log("inside the highchart" + this.value);
				}
			},    
            
            title: {
                text: 'Date'
            }
        },
        series: [{
            data: [],
        }],
        title: {
            text: 'Data Trend'
        },
        loading: false
    }
$scope.getdetails = function() {
	//the mystate object contains the object on which onchange event was fired!!
	//get the data from the db for this name
	$scope.ndata = snmpinterfacedetails.getNames($scope.mystate.name).then(function (response) {
	$scope.ndata = response;
	$scope.mystate2 = response[0];
	console.log(response[0].id + "--------------+++++++++++++++++++");
	});
	};
$scope.getInterfacedetails = function() {
	console.log("Hello krishna");
	//call the snmp server program here
	console.log("this is the passed value" + $scope.mystate2.interfaces);
	$scope.snmpobject = getoidList.getSNMPOids($scope.mystate2.interfaces).then(function (response) {
	$scope.snmpobject = response;
	//$scope.mystate2 = response[0];
	console.log(response + "--------------+++++++++++++++++++");
	//add the value to the graph element
	$scope.highchartsNG.series[0].data.push($scope.snmpobject.ifType);
	});
	};
//repeated polling here to the system
$interval(function () {
			getoidList.getSNMPOids($scope.mystate2.interfaces).then(function (response) {
			$scope.snmpobject = response;
	//$scope.mystate2 = response[0];
			console.log(response + "--------------+++++++++++++++++++");
	//add the value to the graph element
			$scope.highchartsNG.series[0].data.push($scope.snmpobject.ifType);
			//adding pioints to the graphs
			//series.addPoint([x, y], true, true);
			//$scope.highchartsNG.xAxis.labels.push($scope.snmpobject.ifType);
		})
	},
	10000);
//$scope.chart = new Highcharts.Chart({});
 
}]);
});;