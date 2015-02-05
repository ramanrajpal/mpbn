define(['controllers/controllers','services/snmpgauges'], function(controllers) {
controllers.controller('Snmp_dials', ['$scope','$interval','snmpgauges',function($scope,$interval,snmpgauges) {
console.log("loading the name contoller-------------------");
//var funref = myfetchAllNames.getNames;
//define the sppedometer here
$scope.highchartsNG = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 1'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: 'cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [50],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    };
  
$scope.highchartsNG2 = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 2'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ' cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [50],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp2 = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [50],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    };
$scope.highchartsNG3 = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 3'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ' cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [90],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp3 = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    };
$scope.highchartsNG4 = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 4'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ' cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [40],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp4 = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    };
	$scope.highchartsNG5 = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 5'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ' cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [40],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp5 = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
    };
	$scope.highchartsNG6 = {
        options: {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Node 6'
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            }
        },
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ' cpu%'
	        },
	        plotBands: [{
	            from: 0,
	            to: 60,
	            color: '#55BF3B' // green
	        }, {
	            from: 60,
	            to: 80,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 80,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Cpu-usage',
	        data: [40],
	        tooltip: {
	            valueSuffix: ' %'
	        }
	    }]
    };
$scope.highchartsNGtemp6 = {
        options: {
            chart: {
                type: 'solidgauge'
            },
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: -30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [16],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' + 
                   	'<span style="font-size:8px;color:silver">Celsius</span></div>'
	        }
        }],
        title: {
            text: 'Temp',
            y: 50
        },
        yAxis: {
            currentMin: 0,
            currentMax: 200,
            title: {
                y: 140
            },      
			stops: [
                [0.1, '#55BF3B'], // green#DF5353
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            tickInterval: 40,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 15
            }   
        },
        loading: false
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
$interval(function () {
			snmpgauges.getAllDials().then(function (response) {
			var cpu_util = parseInt(response.cpu);
			//console.log($scope.highchartsNG.series[0]);
			//var point = $scope.highchartsNG.series[0];
			//$scope.highchartsNG.series[0].setData(cpu_util)
			//point.update(cpu_util);
			$scope.highchartsNG.series[0].data[0] = cpu_util;
			$scope.highchartsNGtemp.series[0].data[0] = 50;
			//console.log("this is the value picked up"+ $scope.value1);
			//console.log(cpu_util + "this is the cpy");
			// var point = $scope.highchartsNG.series[0].points[0];
             // var newVal;
			//$scope.highchartsNG.series[0].setData(cpu_util)
			//  $scope.highchartsNG.series[0].setData(cpu_util);
		})
	},
	10000);
//$scope.chart = new Highcharts.Chart({});
 
}]);
});;