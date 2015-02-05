define(['controllers/controllers','services/plot_trace_kpiservice','services/plot_traceresource_serv','services/nodePortConfigFile'], function(controllers) {
controllers.controller('CCCVCVC', ['$scope','$resource','$interval','plot_trace_kpiservice', 'plot_traceresource_serv', 'nodePortConfigFile', function($scope,$resource,$interval,plot_trace_kpiservice,plot_traceresource_serv,nodePortConfigFile) {
console.log("loading theCCCVCVC-------------------");
$scope.default_home = true;
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1'},
    { title:'Dynamic Title 2' }
  ];
  //
  //Start of the highchart holder for each KPI, we'll keep them seperate
  $scope["trace"] = {};
  $scope["trace"]["Port_Utilization"]= {};
  $scope["trace"]["CPU_Utilization"]= {};
  $scope["trace"]["Memory_Utilization"]= {};
  $scope["trace"]["Session_Utilization"]= {};
  $scope["trace"]["System_Uptime"]= {};
  $scope["displaychecker"] = {};
  $scope["displaychecker"]["Port_Utilization"]= false;
  $scope["displaychecker"]["CPU_Utilization"]= false;
  $scope["displaychecker"]["System_Uptime"]= false;
  $scope["displaychecker"]["Memory_Utilization"]= false;
  $scope["displaychecker"]["Session_Utilization"]= false;
  $scope["displaychecker"]["Protocol_Utilization"]= false;
  //objects to hold the highchart config element
  $scope.config_charter = {};
  $scope.config_highchart = {};
  //for each type of kpi, there are sub kpis under the port_utilization namely, traffic_in,utilization_in,error_in,discard_in
  $scope.config_charter.Port_Utilization = {};
  $scope.config_highchart.Port_Utilization = {};
  $scope.config_highchart.traffic_in = {};
  $scope.config_highchart.utilization_in = {};
  $scope.config_highchart.error_in = {};
  $scope.config_highchart.discard_in = {};
  $scope.config_highchart.cpu_util = {};
  $scope.config_highchart.temp_util = {};
  $scope.config_charter.traffic_in = {};
  $scope.config_charter.utilization_in = {};
  $scope.config_charter.error_in = {};
  $scope.config_charter.discard_in = {};
  $scope.config_charter.cpu_util = {};
  $scope.config_charter.temp_util = {};
   $scope.config_charter.system_uptime = {};
  $scope.config_highchart.system_uptime = {};
  $scope.config_charter.memory_util = {};
  $scope.config_highchart.memory_util = {};
  $scope.config_charter.session_util = {};
  $scope.config_highchart.session_util = {};
  $scope.tracer = false;
  //default
  $scope.textForLeftNav = 'System Uptime';
  //$scope["trace"]["CPU Utilization"] = [];
  //$scope["trace"]["Temperature"] = [];
  //$scope["trace"]["System Uptime"] = [];
  //End of highchart holder here
//default color setting for multiple check box selection as the drop down value
/*
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
	*/
$scope.backgroundcolorports = nodePortConfigFile.backgroundcolorPorts;
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
   //addition on 20_jan-2015
    $scope.$watch(
  // This function returns the value being watched. It is called for each turn of the $digest loop
  function() { return $scope.tabulatYTrending; },
  // This is the change listener, called when the value returned from the above function changes
  function(newValue, oldValue) {
    if ( newValue !== oldValue ) {
      // Only increment the counter if the value changed
      console.log("watch called at all or not");
	  if ($scope.isCollapsed) {
			$scope.isCollapsed = false;
			console.log("+++++++++++++++++&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + $scope.tabulatYTrending);
			}
      
    }
  }
);
   //end of additions
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
  //set the nodes and ports to "unselected"
	for (nodes in $scope.checkModel) {
		$scope.checkModel[nodes] = false;
		}
	//set the ports to "ünseleted"
	for (nodes in $scope.portList) {
		for (ports in $scope.portList[nodes]) {
			$scope.portList[nodes][ports] = false;
			}
		}
  
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
	 $scope.checkModel= nodePortConfigFile.checkModel;
 $scope.portList= nodePortConfigFile.portList;
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
  /*
  for (var nodes in $scope.portList) {
	for (var ports in $scope.portList[nodes]) {
		console.log("this is the value selected by the user for node " + nodes + " and port is " + ports + "value selected is : " + $scope.portList[nodes][ports] );
		}
		}
	*/
	//create the req object here, assuming the kpi is a selected once, multiple selection later may not be a big chage here using a
	//correct data-structure
	var kpi_selected = $scope.textForLeftNav;
	console.log("this is the kpi selected: " + kpi_selected);
	var req_object = {};
	req_object[kpi_selected] = {};
	//set the time to -ve
	req_object[kpi_selected]["time"] = -1;
	req_object[kpi_selected]["nodeInfo"] = [];
	for (var nodes in $scope.checkModel) {
		//conside if the value is true
		
		var node_info = {};
		if($scope.checkModel[nodes]) {
			//create a object with name as node name and portList as an array of all port selected
			//req_object.kpi_selected['nodeInfo']['name'] = nodes;
			
			node_info['name'] = nodes;
			//req_object.kpi_selected['nodeInfo'] = [];
			//retrieve all the ports selected for this node item
			var node_portList = [];
			
			for (var ports in $scope.portList[nodes]) {
				if ($scope.portList[nodes][ports]) {
					node_portList.push(ports);
					}
				}
			node_info['portlist'] = node_portList;
			req_object[kpi_selected]['nodeInfo'].push(node_info);
			console.log("adding the values in the request object: " + node_info.name );
			}
			//console.log("this is the object found so far....." + req_object[kpi_selected].nodeInfo )
			
			}
					
// test the req object created
		//for (var k in req_object[kpi_selected].nodeInfo) {
		//
		console.log("this is the request objext: " + req_object);
		console.log(req_object[kpi_selected]["nodeInfo"].length + "+++++++++++++++++++++++");
		
		if (kpi_selected == "Port Utilization") {
			$scope.displaychecker.Port_Utilization = true;
			for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {
			//console.log("this is the node user: " + k + " followed by the ports selected   :" + req_object[kpi_selected].nodeInfo[k].name);
				var nodex = req_object[kpi_selected].nodeInfo[k].name;
				$scope["trace"]["Port_Utilization"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].portlist;
				$scope.config_highchart["traffic_in"][nodex] = {};
				$scope.config_highchart["utilization_in"][nodex] = {};
				$scope.config_highchart["discard_in"][nodex] = {};
				$scope.config_highchart["error_in"][nodex] = {};
				for (var z = 0; z < req_object[kpi_selected].nodeInfo[k].portlist.length;z++) {
				/*console.log("port selected is : " + req_object[kpi_selected].nodeInfo[k].portlist[z] + " ---this is the node: " + req_object[kpi_selected].nodeInfo[k].name);	*/
					var portx = req_object[kpi_selected].nodeInfo[k].portlist[z];
					//create identifier for each category of kpi within port utilization, viz:traffic_in,discard_in etc
					var subkpi_list = ["traffic_in","utilization_in","error_in","discard_in"];
					for (var kpi=0;kpi<subkpi_list.length;kpi++) {
						var unique_identifier = "highchartsNG" + nodex + portx + subkpi_list[kpi];
						console.log("this is the value:    " + unique_identifier);
						$scope.config_highchart[subkpi_list[kpi]][nodex][portx] = "highchartsNG" + nodex + portx + subkpi_list[kpi];
						$scope[unique_identifier] = false;
						//console.log("testing:::::   "+ $scope.config_highchart[req_object[kpi_selected].nodeInfo[k].name][req_object[kpi_selected].nodeInfo[k].portlist[z]]);
						//
						var text_type = "packets/sec";
						//var series_0text = subkpi_list[kpi]
						if (subkpi_list[kpi] == "traffic_in") {
							text_type = "Mbps";
							}
						if (subkpi_list[kpi] == "utilization_in") {
							text_type = "Utilization";
							}
						$scope.config_charter[subkpi_list[kpi]][unique_identifier] = {
						
																		chart: {
																		type: 'bar'
																		},

																		title: {
																		text: subkpi_list[kpi]
																		},

																		subtitle: {
																			text: unique_identifier
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
																			console.log("inside the formatter the value is ::::" + this.value);
																				return Highcharts.dateFormat('%H:%M',this.value);
																			//console.log("inside the highchart" + this.value);
																		}
																	},    
																	},

																	yAxis: [{ // left y axis
																		title: {
																			text: text_type
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
																			text: text_type
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
																		name: subkpi_list[kpi] + "in",
																		//data: [[1330300800000,20], [1330300800000,37], [1330300800000,26], [1330300800000,8], [1330300800000,7]],
																		data:[20],
																		//data:[65],
																		lineWidth: 2,
																		color:'red',
																		marker: {
																			radius: 4
																		}
																	}, {
																		name: subkpi_list[kpi] + "out",
																		//data: [9, 19, 11,22, 100],
																		data:[20],
																		//data:[85],
																		lineWidth: 2,
																		color:'green',
																		marker: {
																			radius: 4
																		}
																	},
																	/*
																	{
																		name: '',
																		data: [9, 19, 11,22, 100],
																		//data:[73],
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
																	*/
																	
																	]
																};
														}

					}
					
			}
		}
	if (kpi_selected == "CPU Utilization") {
			$scope.displaychecker.CPU_Utilization = true;
			for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {
			console.log("this is the node user: " + k + " followed by the ports selected   :" + req_object[kpi_selected].nodeInfo[k].name);
				var nodex = req_object[kpi_selected].nodeInfo[k].name;
				$scope["trace"]["CPU_Utilization"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].name;
				$scope.config_highchart["cpu_util"][nodex] = {};
				$scope.config_highchart["temp_util"][nodex] = {};
				//for (var z = 0; z < req_object[kpi_selected].nodeInfo[k].portlist.length;z++) {
				/*console.log("port selected is : " + req_object[kpi_selected].nodeInfo[k].portlist[z] + " ---this is the node: " + req_object[kpi_selected].nodeInfo[k].name);	*/
					//var portx = req_object[kpi_selected].nodeInfo[k].portlist[z];
					//create identifier for each category of kpi within port utilization, viz:traffic_in,discard_in etc
					//var subkpi_list = ["traffic_in","utilization_in","error_in","discard_in"];
					//for (var kpi=0;kpi<subkpi_list.length;kpi++) {
						var unique_identifier_cpu = "highchartsNG" + nodex + "cpu_util";
						var unique_identifier_temp = "highchartsNG" + nodex + "temp_util";
						//console.log("this is the value:    " + unique_identifier);
						$scope.config_highchart["cpu_util"][nodex] = "highchartsNG" + nodex + "cpu_util";
						$scope.config_highchart["temp_util"][nodex] = "highchartsNG" + nodex + "temp_util";
						$scope[unique_identifier_cpu] = false;
						$scope[unique_identifier_temp] = false;
						//console.log("testing:::::   "+ $scope.config_highchart[req_object[kpi_selected].nodeInfo[k].name][req_object[kpi_selected].nodeInfo[k].portlist[z]]);
						//
						//var text_type = "packets/sec";
						//var series_0text = subkpi_list[kpi]
						/*if (subkpi_list[kpi] == "traffic_in") {
							text_type = "Mbps";
							}
						if (subkpi_list[kpi] == "utilization_in") {
							text_type = "Utilization";
							}
							*/
						$scope.config_charter["cpu_util"][unique_identifier_cpu] = {
																	options: {
																		chart: {
																			type: 'gauge',
																			plotBackgroundColor: null,
																			plotBackgroundImage: null,
																			plotBorderWidth: 0,
																			plotShadow: false
																		},
																		title: {
																			text: nodex
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
						$scope.config_charter["temp_util"][unique_identifier_temp] = {
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
														

					
					
			}
		}
		//for Memory utilizatrion
		if (kpi_selected == "Memory Utilization") {

			$scope.displaychecker.Memory_Utilization = true;

			for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {

			console.log("this is the node user: " + k + " followed by the ports selected   :" + req_object[kpi_selected].nodeInfo[k].name);

				var nodex = req_object[kpi_selected].nodeInfo[k].name;

				$scope["trace"]["Memory_Utilization"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].name;

				$scope.config_highchart["memory_util"][nodex] = {};

						var unique_identifier_mem = "highchartsNG" + nodex + "memory_util";
						$scope.config_highchart["memory_util"][nodex] = "highchartsNG" + nodex + "memory_util";
						$scope[unique_identifier_mem] = false;
						
						$scope.config_charter["memory_util"][unique_identifier_mem] = {



																	options: {



																		chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: 'Disk/Space Percentage'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
		},



																	 series: [{
            type: 'pie',
            name: 'Disk Space share',
            data: [
                ['Used',   45.0],
                ['Remaining',       55],
            ]
        }]
		};



															

				}

		}
		/*
if (kpi_selected == "Session Utilization") {
	$scope.displaychecker.Session_Utilization = true;
	for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {
		var nodex = req_object[kpi_selected].nodeInfo[k].name;
		$scope["trace"]["Session_Utilization"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].name;
		$scope.config_highchart["session_util"][nodex] = {};
		var unique_identifier_ses = "highchartsNG" + nodex + "session_util";
		$scope.config_highchart["session_util"][nodex] = "highchartsNG" + nodex + "session_util";
		$scope[unique_identifier_ses] = false;
		$scope.config_charter["session_util"][unique_identifier_ses] = {
																	options: {

																		chart: {

																				plotBackgroundColor: null,

																				plotBorderWidth: 1,//null,

																				plotShadow: false

																			},

																			title: {

																				text: 'Session Percentage'

																			},

																			tooltip: {

																				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'

																			},

																			plotOptions: {

																				pie: {

																					allowPointSelect: true,

																					cursor: 'pointer',

																					dataLabels: {

																						enabled: true,

																						format: '<b>{point.name}</b>: {point.percentage:.1f} %',

																						style: {

																							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'

																						}

																					}

																				}

																			},

																			},

																	 series: [{

																				type: 'pie',

																				name: 'Session share',

																				data: [

																					['Used',   45.0],

																					['Remaining',       55],

																				]

																			}]

																			};

			}

		}
*/
if (kpi_selected == "Protocol Utilization") {
	$scope.displaychecker.Protocol_Utilization = true;
	$scope.config_status = {
							mplv3: {
								status_color: {
									1:'success',
									2:'warning',
									3:'danger',
									4:'info',
									0:'danger'
									},
								status_text:{
									1: 'UP',
									2: 'Started',
									3:'down',
									0: 'down',
								}
							},
							bgp: {
								status_color: {
									1:'success',
									2:'warning',
									3:'danger',
									4:'info',
									5:'info',
									6:'active',
									0:'danger'
									},
								status_text:{
									1: 'IDLE',
									2: 'CONNECT',
									3:'ACTIVE',
									4:'COM IN',
									5:'COM OUT',
									6: 'ESTABLISHED',
								}
							}
	};
}
if (kpi_selected == "Session Utilization") {

			console.log("ever vsalled:"+ kpi_selected);

			$scope.displaychecker.Session_Utilization = true;

			for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {

			console.log("this is the node user: " + k + " followed by the ports selected   :" + req_object[kpi_selected].nodeInfo[k].name);

				var nodex = req_object[kpi_selected].nodeInfo[k].name;

				$scope["trace"]["Session_Utilization"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].name;

				$scope.config_highchart["session_util"][nodex] = {};

						var unique_identifier_sysup = "highchartsNG" + nodex + "session_util";

					

						//console.log("this is the value:    " + unique_identifier);

						$scope.config_highchart["session_util"][nodex] = "highchartsNG" + nodex + "session_util";

						$scope[unique_identifier_sysup] = false;

						

						$scope.config_charter["session_util"][unique_identifier_sysup] = {

						

																		chart: {

																		type: 'area'

																		},



																		title: {

																		text: "Session Utilization"

																		},

																	

																		subtitle: {

																			text: ''

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

																			text: text_type

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

																			text: text_type

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

																		name: "Percent",

																		//data: [[1330300800000,20], [1330300800000,37], [1330300800000,26], [1330300800000,8], [1330300800000,7]],

																		data:[20],

																		//data:[65],

																		lineWidth: 2,

																		color:'red',

																		marker: {

																			radius: 4

																		}

																	}, 

																	/*

																	{

																		name: '',

																		data: [9, 19, 11,22, 100],

																		//data:[73],

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

																	*/

																	

																	]

																};

						

					

					

			}

		}


	
		if (kpi_selected == "System Uptime") {
			console.log("ever vsalled:"+ kpi_selected);
			$scope.displaychecker.System_Uptime = true;
			for(var k = 0; k < req_object[kpi_selected].nodeInfo.length; k++) {
			console.log("this is the node user: " + k + " followed by the ports selected   :" + req_object[kpi_selected].nodeInfo[k].name);
				var nodex = req_object[kpi_selected].nodeInfo[k].name;
				$scope["trace"]["System_Uptime"][req_object[kpi_selected].nodeInfo[k].name] = req_object[kpi_selected].nodeInfo[k].name;
				$scope.config_highchart["system_uptime"][nodex] = {};
						var unique_identifier_sysup = "highchartsNG" + nodex + "system_uptime";
					
						//console.log("this is the value:    " + unique_identifier);
						$scope.config_highchart["system_uptime"][nodex] = "highchartsNG" + nodex + "system_uptime";
						$scope[unique_identifier_sysup] = false;
						
						$scope.config_charter["system_uptime"][unique_identifier_sysup] = {
						
																		chart: {
																		type: 'area'
																		},

																		title: {
																		text: "System Uptime"
																		},
																	
																		subtitle: {
																			text: ''
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
																			text: text_type
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
																			text: text_type
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
																		name: "Percent",
																		//data: [[1330300800000,20], [1330300800000,37], [1330300800000,26], [1330300800000,8], [1330300800000,7]],
																		data:[20],
																		//data:[65],
																		lineWidth: 2,
																		color:'red',
																		marker: {
																			radius: 4
																		}
																	}, 
																	/*
																	{
																		name: '',
																		data: [9, 19, 11,22, 100],
																		//data:[73],
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
																	*/
																	
																	]
																};
						
					
					
			}
		}
			
	$interval(function () {
	plot_trace_kpiservice.plot_trace(req_object).then(function (response) {
	//console.log(response);
	//$scope.test = response.name;
	//return myextrafetchNames.getVals(response);
	//var len = response.length;
	//set the value greater than -ve
	req_object[kpi_selected]["time"]++;
	console.log("**********************************");
	console.log("======================================" + response);
	//get the response from the db here and set the objects of the charts here
	//for port utilization, the object should look like
	/* var response = {
				traffic_in : {
					node1 :
						{ port1 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
								},
							
						  port2 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
									},
						  ....
						 },
					},
				utilization_in : {
					node1 :
						{ port1 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
								},
							
						  port2 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
									},
						  ....
						 },
					},
				error_in : {
					node1 :
						{ port1 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
									},
						  port2 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
									},
						  ....
						 },
					},
				discard_in : {
					node1 :
						{ port1 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
								},
							
						  port2 : {
									invalue : {
												data : [],
												
											},
									outvalue : {
												data : [],
												
											},
									timeframe : [],
									},
						  ....
						 },
					},
				};
			*/
					
	//dummy setting here
	/*
	var response = {
				traffic_in : {
					Node1 :
						{ 1 : {
									invalue : {
												data : [100],
												
											},
									outvalue : {
												data : [1000],
												
											},
									timeframe : [1418894676000],
								},
							
						  2 : {
									invalue : {
												data : [2000],
												
											},
									outvalue : {
												data : [3000],
												
											},
									timeframe : [1418894676000],
									},
						 
						 },
					},
				utilization_in : {
					Node1 :
						{ 1 : {
									invalue : {
												data : [100],
												
											},
									outvalue : {
												data : [1000],
												
											},
									timeframe : [1418894676000],
								},
							
						  2 : {
									invalue : {
												data : [2000],
												
											},
									outvalue : {
												data : [3000],
												
											},
									timeframe : [1418894676000],
									},
						 
						 },
					},
				error_in : {
					Node1 :
						{ 1 : {
									invalue : {
												data : [100],
												
											},
									outvalue : {
												data : [1000],
												
											},
									timeframe : [1418894676000],
								},
							
						  2 : {
									invalue : {
												data : [2000],
												
											},
									outvalue : {
												data : [3000],
												
											},
									timeframe : [1418894676000],
									},
						 
						 },
					},
				discard_in : {
					Node1 :
						{ 1 : {
									invalue : {
												data : [100],
												
											},
									outvalue : {
												data : [1000],
												
											},
									timeframe : [1418894676000],
								},
							
						  2 : {
									invalue : {
												data : [2000],
												
											},
									outvalue : {
												data : [3000],
												
											},
									timeframe : [1418894676000],
									},
						 
						 },
					},
				cpu_util : {
					Node1 : 67,
					Node2 : 33,
					Node3 : 88,
					},
				temp_util : {
					Node1 : 27,
					Node2 : 33,
					Node3 : 55,
					},
				};
				*/
	//end of dummy settings
	//$scope.data[index].showitems = "true";

  //$digest or $apply
	//update the highcart object here with the values obtained from the db
	/*
	response = {
    "traffic_in": {
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        10
                    ]
                },
                "outvalue": {
                    "data": [
                        12
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        139
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        },
        "LS-DR02": {
            "11": {
                "invalue": {
                    "data": [
                        121
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "12": {
                "invalue": {
                    "data": [
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "13": {
                "invalue": {
                    "data": [
                        138
                    ]
                },
                "outvalue": {
                    "data": [
                        121
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        }
    },
    "utilization_in": {
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        23
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        22
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        },
        "LS-DR02": {
            "11": {
                "invalue": {
                    "data": [
                        12
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "12": {
                "invalue": {
                    "data": [
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "13": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        22
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        }
    },
    "error_in": {
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        22
                    ]
                },
                "outvalue": {
                    "data": [
                        22
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        1
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        },
        "LS-DR02": {
            "11": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        12
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "12": {
                "invalue": {
                    "data": [
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "13": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        }
    },
    "discard_in": {
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        21
                    ]
                },
                "outvalue": {
                    "data": [
                        12
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        22
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        },
        "LS-DR02": {
            "11": {
                "invalue": {
                    "data": [
                        11
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "12": {
                "invalue": {
                    "data": [
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            },
            "13": {
                "invalue": {
                    "data": [
                        21
                    ]
                },
                "outvalue": {
                    "data": [
                        11
                    ]
                },
                "timeframe": {
                    "data": [
                        1418618280000
                    ]
                }
            }
        }
    }
};
*/	
/*
var response = {
    "traffic_in": {
        "LS-DR02": {
            "1": {
                "invalue": {
                    "data": [
                        39268742,
                        33281781
                    ]
                },
                "outvalue": {
                    "data": [
                        238865374,
                        126621683
                    ]
                },
                "timeframe": {
                    "data": [
                        1420882560000,
                        1420883040000
                    ]
                }
            },
            "10": {
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            }
        },
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        14153,
                        60054,
                        103391
                    ]
                },
                "outvalue": {
                    "data": [
                        14153,
                        60054,
                        103391
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        40452,
                        65396,
                        82866
                    ]
                },
                "outvalue": {
                    "data": [
                        18511,
                        51364,
                        63163
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            }
        }
    },
    "utilization_in": {
        "LS-DR02": {
            "1": {
                "invalue": {
                    "data": [
                        39268742,
                        33281781
                    ]
                },
                "outvalue": {
                    "data": [
                        238865374,
                        126621683
                    ]
                },
                "timeframe": {
                    "data": [
                        1420882560000,
                        1420883040000
                    ]
                }
            },
            "10": {
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            }
        },
        "zmpdns1": {
            "1": {
                "invalue": {
                    "data": [
                        14153,
                        60054,
                        103391
                    ]
                },
                "outvalue": {
                    "data": [
                        14153,
                        60054,
                        103391
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            },
            "2": {
                "invalue": {
                    "data": [
                        40452,
                        65396,
                        82866
                    ]
                },
                "outvalue": {
                    "data": [
                        18511,
                        51364,
                        63163
                    ]
                },
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                }
            }
        }
    },
    "error_in": {
        "LS-DR02": {
            "1": {
                "timeframe": {
                    "data": [
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0
                    ]
                }
            },
            "10": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            }
        },
        "zmpdns1": {
            "1": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            },
            "2": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            }
        }
    },
    "discard_in": {
        "LS-DR02": {
            "1": {
                "timeframe": {
                    "data": [
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0
                    ]
                }
            },
            "10": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            }
        },
        "zmpdns1": {
            "1": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            },
            "2": {
                "timeframe": {
                    "data": [
                        1420782121000,
                        1420882560000,
                        1420883040000
                    ]
                },
                "invalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                },
                "outvalue": {
                    "data": [
                        0,
                        0,
                        0
                    ]
                }
            }
        }
    }
};
*/
	for (var kpi in response) {
		console.log("this is the kpi responsed: " + kpi);
		if (kpi == "traffic_in" || kpi == "utilization_in" || kpi == "error_in" || kpi == "discard_in") {
			for (var node in response[kpi]) {
				for (var port in response[kpi][node]) {
					var highchart_identifier =  "highchartsNG" + node + port + kpi;
					console.log("obtained id for chart:   " + highchart_identifier + "also kpi is " + kpi +  " object poineted is : " + $scope.config_charter[kpi]);
					console.log("ts is hi" + response[kpi][node][port]['timeframe']['data'].length + "woww" + " value is : " + response[kpi][node][port]['timeframe']['data'][0]);
					if (response[kpi][node][port]['timeframe']['data'].length == 1) {
						//instanteneous value obtained just push it to the categories and data
							//update only if the node and port were part iof the initial request
							//if(req_object[kpi_selected][node][port]) {
							$scope.config_charter[kpi][highchart_identifier].xAxis.categories.push(response[kpi][node][port]['timeframe']['data'][0]);
							//update the data too, for in and out
							//console.log("Value from the DB respoinse object : "+ response[kpi][node][port]['invalue'][0]);
							$scope.config_charter[kpi][highchart_identifier].series[0].data.push(response[kpi][node][port]['invalue']['data'][0]);
							$scope.config_charter[kpi][highchart_identifier].series[1].data.push(response[kpi][node][port]['outvalue']['data'][0]);
							//}
							console.log("PROCEEEEEEEEEEEEEEEEEEEEEE");
							} else {
							//the value retured from the DB is an array of the items
							//if(req_object[kpi_selected][node][port]) {
							$scope.config_charter[kpi][highchart_identifier].xAxis.categories = response[kpi][node][port]['timeframe']['data'];
							$scope.config_charter[kpi][highchart_identifier].series[0].data = response[kpi][node][port]['invalue']['data'];
							$scope.config_charter[kpi][highchart_identifier].series[1].data = response[kpi][node][port]['outvalue']['data'];
						//}
						}
					}
				}
			}
			
		if (kpi == "cpu_util" || kpi == "temp_util") {
			console.log("this is the joyyyy+ " + kpi);
			for (var node in response[kpi]) {
				var highchart_identifier =  "highchartsNG" + node + kpi;
				var highchart_identifier_cpu = "highchartsNG" + node + 'cpu_util';
				var highchart_identifier_temp = "highchartsNG" + node + 'temp_util';
				console.log("end of the progra: " + highchart_identifier + "value is" + response[kpi][node] );
				//$scope.config_charter[kpi][highchart_identifier].series[0].data[0] = response[kpi][node];
				$scope.config_charter[kpi][highchart_identifier].series[0].data[0] = response[kpi][node];
				$scope.config_charter['temp_util'][highchart_identifier_temp].series[0].data[0] = response['temp_util'][node];
				$scope.config_charter['cpu_util'][highchart_identifier_cpu].series[0].data[0] = response['cpu_util'][node];
			}
		}
		if (kpi == "memory_util") {
			console.log("this is the joyyyycccccc+ " + kpi);
			for (var node in response[kpi]) {
				//var highchart_identifier =  "highchartsNG" + node + kpi;
				//var highchart_identifier_mem = "highchartsNG" + node + 'memory_util';
				var highchart_identifier_mem = "highchartsNG" + node + kpi;
				var seriesData = [];
				//$scope.config_charter[kpi][highchart_identifier_mem].series[0].data[0][1] = response[kpi][node];
				//$scope.config_charter[kpi][highchart_identifier_mem].series[1].data[1][1] = 100-response[kpi][node];
				seriesData.push(["used", response[kpi][node]]);
				seriesData.push(["remaining", 100- response[kpi][node]]);
				//$scope.config_charter[kpi][highchart_identifier_mem].chart.series[0].setData(seriesData,true);
				var arr1 = ['Used',   response[kpi][node]];
				var arr2 = ['Remaining',       100- response[kpi][node]];
				var obj = {
            		type: 'pie',
            		name: 'Space share',
            		data: [
                			arr1,
                			arr2,
            		]
        		};
        		$scope.config_charter[kpi][highchart_identifier_mem].series[0] = obj;
			}
		}
		if (kpi == "protocol_util") {
			console.log("this is the protocol+ " + kpi);
			$scope.protocol_utilization = {};
			for (var type in response[kpi]) {
				$scope.protocol_utilization[type] = [];
				if (type == "mplv3" || type == "bgp") {
					//the DS is an array of objects
					$scope.protocol_utilization[type] = response[kpi][type];
				}
			}
				
		}
		if (kpi == "system_uptime" || kpi == "session_util") {
			console.log("this is the joyyyy+ " + kpi);
			for (var node in response[kpi]) {
				var highchart_identifier =  "highchartsNG" + node + kpi;
				console.log("end of the progra: " + highchart_identifier );
				//$scope.config_charter[kpi][highchart_identifier].series[0].data[0] = response[kpi][node];
				if (response[kpi][node]['timeframe']['data'].length == 1) {
						//instanteneous value obtained just push it to the categories and data
							$scope.config_charter[kpi][highchart_identifier].xAxis.categories.push(response[kpi][node]['timeframe']['data'][0]);
							//update the data too, for in and out
							console.log("Value from the DB respoinse object : "+ response[kpi][node]['invalue'][0]);
							$scope.config_charter[kpi][highchart_identifier].series[0].data.push(response[kpi][node]['invalue']['data'][0]);
						
							console.log("PROCEEEEEEEEEEEEEEEEEEEEEE");
							} else {
							//the value retured from the DB is an array of the items
							$scope.config_charter[kpi][highchart_identifier].xAxis.categories = response[kpi][node]['timeframe']['data'];
							$scope.config_charter[kpi][highchart_identifier].series[0].data = response[kpi][node]['invalue']['data'];
							
						}
			}
		}
	}
	
	

	//$scope.ndata = response;
	
		})
	},
	60000);
  };
  //show/hide the charts
  $scope.hidechartfromview = function (identifier) {
	$scope[identifier] = !$scope[identifier];
	}
  ///images for the carousel
  $scope.slides = [ {
       
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
});


