define(['controllers/controllers','services/snmpgauges'], function(controllers) {
controllers.controller('Snmp_interfaces', ['$scope','$interval','snmpgauges',function($scope,$interval,snmpgauges) {
console.log("loading the name contoller-------------------");
//var funref = myfetchAllNames.getNames;
//define the sppedometer here
$scope.highchartsNG = {
            chart: {
                type: 'bar'
            },

            title: {
                text: 'Jitter'
            },

            subtitle: {
                text: 'Nodes'
            },

            xAxis: {
				type: 'datetime',
                //tickInterval: 60, // one min
                tickWidth: 0,
                gridLineWidth: 1,
                labels: {
                    align: 'left',
                    x: 3,
                    //y: -3
                },
				//categories: [1418894316000,1418894376000,1418894436000,1418894496000,1418894556000,1418894616000,1418894676000],
				categories: [1418894316000],
				labels : {
				formatter: function() {
					//var myDate = new Date();
					//var newDateMs = Date.UTC(myDate.getUTCFullYear(),myDate.getUTCMonth(),myDate.getUTCDate(),myDate.getUTCHours(),myDate.getUTCMinutes());   
					//return Highcharts.dateFormat('%e. %b. %H:%M:%S',newDateMs);
						return Highcharts.dateFormat('%H:%M',this.value);
					//console.log("inside the highchart" + this.value);
				}
			},    
            },

            yAxis: [{ // left y axis
                title: {
                    text: 'Jitter(millisec)'
                },
                labels: {
                    align: 'left',
                    x: 3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }, { // right y axis
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {
                    text: 'Jitter(millisec)'
                },
                labels: {
                    align: 'right',
                    x: -3,
                    y: 16,
                    format: '{value:.,0f}'
                },
                showFirstLabel: false
            }],

            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: true,
                borderWidth: 0
            },

            tooltip: {
                shared: true,
                crosshairs: true
            },

            plotOptions: {
                series: {
                    cursor: 'pointer',
                    marker: {
                        lineWidth: 1
                    }
                }
            },

            series: [{
                name: 'Jitter',
				//data: [[1330300800000,20], [1330300800000,37], [1330300800000,26], [1330300800000,8], [1330300800000,7]],
				//data:[20,145,75,225,400],
				data:[65],
                lineWidth: 2,
				color:'red',
                marker: {
                    radius: 4
                }
            }, {
                name: '',
				//data: [9, 19, 11,22, 100],
				//data:[500,125,300,215,50],
				data:[85],
                lineWidth: 2,
				color:'green',
				marker: {
                    radius: 4
                }
			},
			{
                name: '',
				//data: [9, 19, 11,22, 100],
				data:[73],
                lineWidth: 2,
				color:'blue',
				marker: {
                    radius: 4
                }
			},
				{
				name: '',
				//data: [9, 19, 11,22, 100],
				data:[340,225,700,400,50],
                lineWidth: 4,
				marker: {
                    radius: 4
                }
			}
			
			]
        };

//repeated polling here to the system
//some setters on the scrren
$scope.showALLNodes = false;
$scope.showAllNodeFilter = function() {
	$scope.showALLNodes = !$scope.showALLNodes;
	$scope.value1 = true;
$scope.value2 = true;
$scope.value3 = true;
$scope.value4 = true;
$scope.value5 = true;
$scope.value6 = true;
	};
$scope.value1 = true;
$scope.value2 = true;
$scope.value3 = true;
$scope.value4 = true;
$scope.value5 = true;
$scope.value6 = true;
$scope.count = 1;
$interval(function () {
			snmpgauges.getAllDials().then(function (response) {
			console.log("kriririririiririr");
			//var cpu_util = parseInt(response.cpu);
			//console.log($scope.highchartsNG.series[0]);
			//var point = $scope.highchartsNG.series[0];
			//$scope.highchartsNG.series[0].setData(cpu_util)
			//point.update(cpu_util);
			//$scope.highchartsNG.series[0].data[0] = cpu_util;
			//$scope.highchartsNGtemp.series[0].data[0] = 50;
			//console.log("this is the value picked up"+ $scope.value1);
			//console.log(cpu_util + "this is the cpy");
			// var point = $scope.highchartsNG.series[0].points[0];
             // var newVal;
			//$scope.highchartsNG.series[0].setData(cpu_util)
			//  $scope.highchartsNG.series[0].setData(cpu_util);
			//var x = $scope.highchartsNG.xAxis.categories[0] + "22";
			//$scope.highchartsNG.xAxis.categories.push(1418894316000);
			console.log("++++++++++++++++++++++++++++++++++++");
			var t = $scope.highchartsNG.xAxis.categories[$scope.highchartsNG.xAxis.categories.length-1] + 60000;
			$scope.highchartsNG.xAxis.categories.push(t);
			/*
			var x;
			if ($scope.highchartsNG.series[0].data[$scope.highchartsNG.series[0].data.length - 1] == 9) {
			x = $scope.highchartsNG.series[0].data[$scope.highchartsNG.series[0].data.length - 1] + 3;
			} else {
			 x = $scope.highchartsNG.series[0].data[$scope.highchartsNG.series[0].data.length - 1] - 3;
			 }
			//console.log("krishna" + x);
			$scope.highchartsNG.series[0].data.push(x);
			if ($scope.highchartsNG.series[1].data[$scope.highchartsNG.series[1].data.length - 1] == 59) {
			x = $scope.highchartsNG.series[1].data[$scope.highchartsNG.series[1].data.length - 1] + 9;
			} else {
			 x = $scope.highchartsNG.series[1].data[$scope.highchartsNG.series[1].data.length - 1] - 9;
			 }
			//$scope.highchartsNG.series[0].data.push(x);
			//x = $scope.highchartsNG.series[1].data[$scope.highchartsNG.series[1].data.length - 1] + 1;
			$scope.highchartsNG.series[1].data.push(x);
			*/
			 //var x = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
			 var x = $scope.highchartsNG.series[0].data[$scope.highchartsNG.series[0].data.length - 1];
			 var y = Math.floor(Math.random() * (90 - 80 + 1)) + 80;
			 var z = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
			  if ($scope.count == 0) {
				x = x- 25;
		
				}
			 if ($scope.count == 30) {
			 //give it a jerk
			 $scope.count = -1;
			 x += 25;
			 }
			
			$scope.count++;
			 $scope.highchartsNG.series[0].data.push(x);
			 $scope.highchartsNG.series[1].data.push(y);
			 $scope.highchartsNG.series[2].data.push(z);
			//console.log("helloooooooooo" + x);
			//if ($scope.highchartsNG.xAxis.categories.length-1 > 5) {
				
				//$scope.highchartsNG.xAxis.categories.shift();
				//$scope.highchartsNG.series[0].data.shift();
				//$scope.highchartsNG.series[1].data.shift();
				//}
				
		})
	},
	10);
//$scope.chart = new Highcharts.Chart({});
 
}]);
});;