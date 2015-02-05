<?php
    //db connection --
$con_str = "Data Source=dwhdb; Uid=dba; Pwd=sql;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");
//print_r(file_get_contents('php://input'),true);
$json_input = json_decode(file_get_contents('php://input'),true);	
//print_r($json_input);
//die;
//$json_input = json_decode('{'Port Utilization':{"time":"","nodeInfo":[{"name":"edns3","portlist":["3","6"]},{"name":"zmpdns1","portlist":["6","4"]}]}}',true);
//print_r($json_input);
//$json_input = json_decode('{"Port Utilization":{"time":"","nodeInfo":[{"name":"zmpdns1","portlist":["1","2","3"]},{"name":"LS-DR02","portlist":["1","10"]}]}}',true);
foreach($json_input as $key => $val) {
	
		if ($key == "Port Utilization") {
		$node_list = array();
		$a = array();
      	foreach($val['nodeInfo'] as $key => $nodeval) {
			$node_list[] = "'".($nodeval['name'])."'";
			foreach($nodeval['portlist'] as $df => $portval) {
				$a[] = "'".$portval."'";
			}
		

		}
			$port_list_fin = implode(',',$a);
			$node_list_fin = implode(',',$node_list); 
			$query_string = "
select * from( select datatime,nodename,ifIndex,dense_RANK() OVER ( PARTITION BY nodename ORDER BY datatime desc) as row_num,ifInOctets,ifHCInOctets,ifOutOctets,ifHCOutOctets,ifInErrors,ifOutErrors,ifInDiscards,ifOutDiscards,ifSpeed,ifHighspeed from dc.mpbn_ifentry_custom_one_min_new where nodename in ($node_list_fin) and ifindex in ($port_list_fin)) as a where row_num < 3;";
			
		
		
		
//}
$result=sasql_query($connect,$query_string);
//echo gettype($result);
 $reslt_set = sasql_fetch_array($result);
 //print_r($reslt_set);
 //created object with nodes----> ports--->row_num as the heirarchy
 $obj_holder = array();
 while ($reslt_set = sasql_fetch_array($result))
 	{
 		//print_r($reslt_set[0]);
 		$date_time = $reslt_set[0];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifinoctets"] = $reslt_set[4];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifhcinoctets"] = $reslt_set[5];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifoutoctets"] = $reslt_set[6];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifhcoutoctets"] = $reslt_set[7];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifinerrors"] = $reslt_set[8];
$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifouterrors"] = $reslt_set[9];
$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifindiscards"] = $reslt_set[10];
$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifoutdiscards"] = $reslt_set[11];
$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifspeed"] = $reslt_set[12];
$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["ifhighspeed"] = $reslt_set[13];
 		$obj_holder[$reslt_set[1]][$reslt_set[2]][$reslt_set[3]]["database_time"] = $reslt_set[0];

 		//$obj_holder->{$reslt_set}[1]->{$reslt_set}[2]->{$reslt_set}[3]["ifhcinoctets"] = $reslt_set[5];
 	}
 
 	$json_return = array();
 	foreach($json_input as $key => $val) {
 				//print_r();
			foreach($val['nodeInfo'] as $key => $nodeval) {
			
			foreach($nodeval['portlist'] as $df => $portval) {
				//"$obj_holder[$nodeval['name']][$portval]['1'];
				//calculate the traffic_in and traffic_out here
				$traff_in_x = $obj_holder[$nodeval['name']][$portval]['1']['ifinoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifinoctets'];
					$rr = $obj_holder[$nodeval['name']][$portval]['2']['ifhcinoctets'];
 	//print_r($rr);
 	
				$traff_inhc_x = $obj_holder[$nodeval['name']][$portval]['1']['ifhcinoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifhcinoctets'];
				$traffic_IN = ($traff_in_x > $traff_inhc_x) ? $traff_inhc_x : $traff_inhc_x/120;
				//Traffic out processing now
				$traff_out_x = $obj_holder[$nodeval['name']][$portval]['1']['ifoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifoutoctets'];
				$traff_outhc_x = $obj_holder[$nodeval['name']][$portval]['1']['ifhcoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifhcoutoctets'];
				$traffic_OUT = ($traff_out_x > $traff_outhc_x) ? $traff_outhc_x : $traff_outhc_x/120;

				$timestamp_all = strtotime($obj_holder[$nodeval['name']][$portval]['1']['database_time']);
				$json_return['traffic_in'][$nodeval['name']][$portval]['invalue']['data'] = array($traffic_IN);
				$json_return['traffic_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($traffic_OUT);
				$json_return['traffic_in'][$nodeval['name']][$portval]['timeframe']['data'] = array($timestamp_all * 1000);

				

				$json_return['utilization_in'][$nodeval['name']][$portval]['invalue']['data'] = array($traffic_IN);
				$json_return['utilization_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($traffic_OUT);
				$json_return['utilization_in'][$nodeval['name']][$portval]['timeframe']['data'] = array($timestamp_all * 1000);	

				//Error IN setting here
					$error_in = $obj_holder[$nodeval['name']][$portval]['1']['ifinerrors'] - $obj_holder[$nodeval['name']][$portval]['2']['ifinerrors'];
					$error_out = $obj_holder[$nodeval['name']][$portval]['1']['ifouterrors'] - $obj_holder[$nodeval['name']][$portval]['2']['ifouterrors'];
				$json_return['error_in'][$nodeval['name']][$portval]['invalue']['data'] = array($error_in);
				$json_return['error_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($error_out);
				$json_return['error_in'][$nodeval['name']][$portval]['timeframe']['data'] = array($timestamp_all * 1000);

					//Discard in/out settings
				$discard_in = $obj_holder[$nodeval['name']][$portval]['1']['ifindiscards'] - $obj_holder[$nodeval['name']][$portval]['2']['ifindiscards'];
				$discard_out = $obj_holder[$nodeval['name']][$portval]['1']['ifoutdiscards'] - $obj_holder[$nodeval['name']][$portval]['2']['ifoutdiscards'];
				$json_return['discard_in'][$nodeval['name']][$portval]['invalue']['data'] = array($discard_in);
				$json_return['discard_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($discard_out);
				$json_return['discard_in'][$nodeval['name']][$portval]['timeframe']['data'] = array($timestamp_all * 1000);	
						
			}
		

		}
	//
	//die;
	}
	print_r(json_encode($json_return));
}
//sif its the Cpu utilization
	if ($key == "CPU Utilization") {

		$node_list = array();

		$a = array();

      	foreach($val['nodeInfo'] as $key => $nodeval) {

			$node_list[] = "'".($nodeval['name'])."'";

		/*	foreach($nodeval['portlist'] as $df => $portval) {

				$a[] = "'".$portval."'";

			}
		*/
		



		}

			//$port_list_fin = implode(',',$a);

			$node_list_fin = implode(',',$node_list); 

			$query_string = "

select datatime,nodename,cpu,tempr,row_num from (select dense_RANK() OVER ( PARTITION BY nodename ORDER BY datatime desc) as row_num,nodename,datatime,cpu,tempr from (select avg(jnxOperatingCPU) as cpu,avg(jnxOperatingTemp) as tempr,nodename,datatime from dc.jnxOperatingEntry_custom_one_min where nodename in ($node_list_fin) group by (datatime,nodename)) as a) as q where row_num < 2;";
$result=sasql_query($connect,$query_string);
//$reslt_set = sasql_fetch_array($result);



 $obj_holder = array();

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		//print_r($query_string);
 		//die;

 		$date_time = $reslt_set[0];

 		$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
 		$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[3];

 		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];



 		

 	}

 

 	$json_return = array();
	foreach($json_input as $key => $val) {

 				

			foreach($val['nodeInfo'] as $key => $nodeval) {

				$cpu_u = $obj_holder[$nodeval['name']]["cpu"];
				$temp_u = $obj_holder[$nodeval['name']]["temp"];
				$timestamp_all = $obj_holder[$nodeval['name']]["database_time"];

				$json_return['cpu_util'][$nodeval['name']]= round($cpu_u);
				$json_return['temp_util'][$nodeval['name']]= round($temp_u);

				

				//$json_return['cpu_util'][$nodeval['name']]['timeframe']['data'] = array($timestamp_all * 1000);



				



		}

	//

	//die;

	}
print_r(json_encode($json_return));
}

}
 	?>