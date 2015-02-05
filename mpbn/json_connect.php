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
			//print_r($json_input);
			//die;
			if ($val["time"] >= 0) {
			$query_string = "
select * from( select datatime,nodename,ifIndex,dense_RANK() OVER ( PARTITION BY nodename ORDER BY datatime desc) as row_num,ifInOctets,ifHCInOctets,ifOutOctets,ifHCOutOctets,ifInErrors,ifOutErrors,ifInDiscards,ifOutDiscards,ifSpeed,ifHighspeed from dc.mpbn_ifentry_custom_one_min_new where nodename in ($node_list_fin) and ifindex in ($port_list_fin)) as a where row_num < 3;";
			
		
		
		
//}
$result=sasql_query($connect,$query_string);


 //$reslt_set = sasql_fetch_array($result);
 //print_r($reslt_set);

 //created object with nodes----> ports--->row_num as the heirarchy
 $obj_holder = array();
 while ($reslt_set = sasql_fetch_array($result))
 	{
 		//print_r($reslt_set);
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
//print_r($obj_holder);
//die;
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
				$traffic_IN = max($traff_in_x,$traff_inhc_x);
				$traffic_IN = $traffic_IN/120;
				//mbps conversion
				$traffic_IN = ($traffic_IN*8)/(1024*1024);
				//Traffic out processing now
				$traff_out_x = $obj_holder[$nodeval['name']][$portval]['1']['ifoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifoutoctets'];
				$traff_outhc_x = $obj_holder[$nodeval['name']][$portval]['1']['ifhcoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifhcoutoctets'];
				$traffic_OUT = max($traff_out_x,$traff_outhc_x);
				$traffic_OUT = $traffic_OUT/120;
				//mbps conversion
				$traffic_OUT = ($traffic_OUT*8)/(1024*1024);
				//for utilization_in/out
				//utilization_in--
				$utilization_in_x_num = ($obj_holder[$nodeval['name']][$portval]['1']['ifinoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifinoctets']); 
				$utilization_in_x_den =  $obj_holder[$nodeval['name']][$portval]['2']['ifspeed']; 
				if($utilization_in_x_den==0){
					$utilization_in_x = 0;
				}else{
				$utilization_in_x = ($utilization_in_x_num*8*8*100)/($utilization_in_x_den*120*1024*1024);
				}//utilization_out
				$utilization_out_x_num = ($obj_holder[$nodeval['name']][$portval]['1']['ifoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifoutoctets']); 
				$utilization_out_x_den =  $obj_holder[$nodeval['name']][$portval]['2']['ifspeed']; 
				if ($utilization_out_x_den ==0){
					$utilization_out_x =0;
				}else{
				$utilization_out_x = ($utilization_out_x_num*8*8*100)/($utilization_out_x_den*120*1024*1024);
				}
				//utilization_in_hc  ifhcinoctets
				$utilization_in_hc_x_num = ($obj_holder[$nodeval['name']][$portval]['1']['ifhcinoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifhcinoctets']);
				$utilization_in_hc_x_den =  $obj_holder[$nodeval['name']][$portval]['2']['ifhighspeed']; 
				if ($utilization_in_hc_x_den ==0){
							$utilization_in_x_hc = 0;
				}
				else{
				$utilization_in_x_hc = ($utilization_in_hc_x_num*8*8*100)/($utilization_in_hc_x_den*10000000*1024*1024*120);
				}
				//utilization_out_hc
				$utilization_out_hc_x_num = ($obj_holder[$nodeval['name']][$portval]['1']['ifhcoutoctets'] - $obj_holder[$nodeval['name']][$portval]['2']['ifhcoutoctets']);

				$utilization_out_hc_x_den =  $obj_holder[$nodeval['name']][$portval]['2']['ifhighspeed']; 
				if($utilization_out_hc_x_den ==0 ){
					$utilization_out_x_hc = 0;
				}
				else{
				$utilization_out_x_hc = ($utilization_out_hc_x_num*8*8*100)/($utilization_out_hc_x_den*10000000*1024*1024*120);
				}
				$utilization_in = max($utilization_in_x,$utilization_in_hc_x);
				$utilization_out = max($utilization_out_x_hc,$utilization_out_x);
				$timestamp_all = strtotime($obj_holder[$nodeval['name']][$portval]['1']['database_time']);
				$json_return['traffic_in'][$nodeval['name']][$portval]['invalue']['data'] = array($traffic_IN);
				$json_return['traffic_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($traffic_OUT);
				$json_return['traffic_in'][$nodeval['name']][$portval]['timeframe']['data'] = array($timestamp_all * 1000);

				

				$json_return['utilization_in'][$nodeval['name']][$portval]['invalue']['data'] = array($utilization_in);
				$json_return['utilization_in'][$nodeval['name']][$portval]['outvalue']['data'] = array($utilization_out);
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

} else {
	//print_r($json_input);
	//die;
			        $query_string = "
select datatime,nodename,ifIndex,ifInOctets,ifHCInOctets,ifOutOctets,ifHCOutOctets,ifInErrors,ifOutErrors,ifInDiscards,ifOutDiscards,ifSpeed,ifHighspeed from dc.trig_mpbn_delta_values where nodename in ($node_list_fin) and ifindex in ($port_list_fin);";
//print_r($query_string);
//die;		


//}
$result=sasql_query($connect,$query_string);
//echo gettype($result);
 //$reslt_set = sasql_fetch_array($result);
 //print_r($reslt_set);
 //created object with nodes----> ports--->row_num as the heirarchy
 $obj_holder = array();
 $json_return = array();
 while ($reslt_set = sasql_fetch_array($result))
 	    {
         //print_r($reslt_set[0]);
         //$date_time = $reslt_set[0];
		 //
		 //ifinoctects > inhcinoctects
     	 $found_flag= 0;
		 foreach($json_input as $key => $val) {

 				//print_r();

			foreach($val['nodeInfo'] as $key => $nodeval) {

			

			foreach($nodeval['portlist'] as $df => $portval) {
				if ($portval == $reslt_set[2] && $nodeval['name'] == $reslt_set[1]) {
					$found_flag = 1;
					}
				}
			}
		}
		if ($found_flag == 1) {
		 if ($reslt_set[3] > $reslt_set[4]) {
			if (is_array($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('invalue',$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]])) {

					//array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],($reslt_set[3] - 0));
					array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],($reslt_set[3] - 0)*8/(120*1024*1024));


							//just make copy into utilization as of now
					
					$utilization_inter = 0;
					if ($reslt_set[11]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[3]-0)*8*8*100)/($reslt_set[11]*120*1024*1024);
					}


					array_push($json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],$utilization_inter);
				

					} else {

					$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array(($reslt_set[3] - 0)*8/(120*1024*1024));

					$utilization_inter = 0;
					if ($reslt_set[11]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[3]-0)*8*8*100)/($reslt_set[11]*120*1024*1024);
					}
					//make copy 

					$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array($utilization_inter);
					//$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],((($reslt_set[3] - 0)*8*8*100))/$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],((($reslt_set[12] - 0)*120*1024*1024));
					}

					} else {

					 if (is_array($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('invalue',$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],($reslt_set[4] -0 )*8/(120*1024*1024));

					$utilization_inter = 0;
					if ($reslt_set[12]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[4]-0)*8*8*100)/($reslt_set[12]*1000000*120*1024*1024);
					}
					array_push($json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],$utilization_inter);

					} else {

					$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array(($reslt_set[4] - 0)*8/(120*1024*1024));

					$utilization_inter = 0;
					if ($reslt_set[12]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[4]-0)*8*8*100)/($reslt_set[12]*1000000*120*1024*1024);
					}
					$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array($utilization_inter);

					}

					}

			

			

		//ifoutoctects and ofhoutoctets

		 if ($reslt_set[5] > $reslt_set[6]) {

			if (is_array($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('outvalue',$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],($reslt_set[5] - 0)*8/(1024*1024*120));

					//make a copy

					$utilization_inter = 0;
					if ($reslt_set[11]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[5]-0)*8*8*100)/($reslt_set[11]*120*1024*1024);
					}

					array_push($json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],$utilization_inter);

					} else {

					$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array(($reslt_set[5] - 0)*8/(1024*1024*120));

					//make copy

					$utilization_inter = 0;
					if ($reslt_set[11]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[5]-0)*8*8*100)/($reslt_set[11]*120*1024*1024);
					}
					$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array($utilization_inter);

					}

					} else {

					 if (is_array($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('outvalue',$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],($reslt_set[6]-0)*8/(1024*1024*120));

					//make copy

					$utilization_inter = 0;
					if ($reslt_set[12]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[6]-0)*8*8*100)/($reslt_set[12]*120*1024*1024*10000000);
					}
					array_push($json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],($utilization_inter));

					} else {

					$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array(($reslt_set[6]-0)*8/(1024*1024*120));

					//make copy

					$utilization_inter = 0;
					if ($reslt_set[12]==0){
						$utilization_inter = 0;}
					else {
						$utilization_inter = (($reslt_set[6]-0)*8*8*100)/($reslt_set[12]*10000000*120*1024*1024);
					}
					$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array($utilization_inter);

					}

					}

		//set the time here now

			$timestamp_all = strtotime($reslt_set[0]) * 1000;

			if (is_array($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('timeframe',$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'],$timestamp_all);

					//make copy

					array_push($json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'],$timestamp_all);

					//make copy

					array_push($json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'],$timestamp_all);

					//make copy

					array_push($json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'],$timestamp_all);

					} else {

					$json_return['traffic_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'] = array($timestamp_all);

					//copy

					$json_return['utilization_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'] = array($timestamp_all);

					//copy

					$json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'] = array($timestamp_all);

					//copy

					$json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['timeframe']['data'] = array($timestamp_all);

					}

			//for error in

			

			if (is_array($json_return['error_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('invalue',$json_return['error_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],($reslt_set[7]-0));

					//just make copy into utilization as of now

					

					} else {

					$json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array(($reslt_set[7]-0));

					//make copy 

					

					}

			

			if (is_array($json_return['error_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('outvalue',$json_return['error_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],($reslt_set[8]-0));

					

					} else {

					$json_return['error_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array(($reslt_set[8]-0));

					

					}

					

					

				//for discard in

				

			if (is_array($json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('invalue',$json_return['discard_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'],($reslt_set[9]-0));

					//just make copy into utilization as of now

					

					} else {

					$json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['invalue']['data'] = array(($reslt_set[9]-0));

					//make copy 

					

					}

					

			 if (is_array($json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]) && array_key_exists('outvalue',$json_return['discard_in'][$reslt_set[1]][$reslt_set[2]])) {

					array_push($json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'],($reslt_set[10]-0));

					

					} else {

					$json_return['discard_in'][$reslt_set[1]][$reslt_set[2]]['outvalue']['data'] = array(($reslt_set[10]-0));

					

					}

					

			

		}

    //

    //die;
    } 
    /*
    $temp_json = array();
	foreach($json_input as $key => $val) {

 				//print_r();

			foreach($val['nodeInfo'] as $key => $nodeval) {

			

			foreach($nodeval['portlist'] as $df => $portval) {
				
				$temp_json['traffic_in'][$nodeval['name']][$portval]['invalue']['data'] = $json_return['traffic_in'][$nodeval['name']][$portval]['invalue']['data'];

				$temp_json['traffic_in'][$nodeval['name']][$portval]['outvalue']['data'] = $json_return['traffic_in'][$nodeval['name']][$portval]['outvalue']['data'];
				$temp_json['traffic_in'][$nodeval['name']][$portval]['timeframe']['data'] = $json_return['traffic_in'][$nodeval['name']][$portval]['timeframe']['data'];
				$temp_json['utilization_in'][$nodeval['name']][$portval]['invalue']['data'] = $json_return['utilization_in'][$nodeval['name']][$portval]['invalue']['data'];
				$temp_json['utilization_in'][$nodeval['name']][$portval]['outvalue']['data'] = $json_return['utilization_in'][$nodeval['name']][$portval]['outvalue']['data'];
				$temp_json['utilization_in'][$nodeval['name']][$portval]['timeframe']['data'] = $json_return['utilization_in'][$nodeval['name']][$portval]['timeframe']['data'];
				$temp_json['error_in'][$nodeval['name']][$portval]['invalue']['data'] = $json_return['error_in'][$nodeval['name']][$portval]['invalue']['data'];
				$temp_json['error_in'][$nodeval['name']][$portval]['invalue']['data'] = $json_return['error_in'][$nodeval['name']][$portval]['outvalue']['data'];

				$temp_json['error_in'][$nodeval['name']][$portval]['timeframe']['data']=$json_return['error_in'][$nodeval['name']][$portval]['timeframe']['data'];



					//Discard in/out settings

				$temp_json['discard_in'][$nodeval['name']][$portval]['invalue']['data']= $json_return['discard_in'][$nodeval['name']][$portval]['invalue']['data'];

				$temp_json['discard_in'][$nodeval['name']][$portval]['outvalue']['data']=$json_return['discard_in'][$nodeval['name']][$portval]['outvalue']['data'];

				$temp_json['discard_in'][$nodeval['name']][$portval]['timeframe']['data']=$json_return['discard_in'][$nodeval['name']][$portval]['timeframe']['data'];	
				

					
			}
		}
	}
	$json_return = $temp_json;
	
}
*/
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
 //rbn type querying for cpu

$query_string = "
select datatime,nodename,avg(rbnCpuMeterFiveMinuteAvg) from dc.rbnCpuMeterMIB_custom_one_min where datatime = (select max(datatime) from dc.rbnCpuMeterMIB_custom_one_min) and nodename IN ($node_list_fin)  group by datatime,nodename order by nodename,datatime desc;";
$result=sasql_query($connect,$query_string);

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		$date_time = $reslt_set[0];
		$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
		//$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[3];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}
//rbn type querying for temp

$query_string = "
select datatime,nodename,avg(rbnEntityTempCurrent) from dc.rbnEntityTempSensorEntry_custom_one_min where datatime =(select max(datatime) from dc.rbnEntityTempSensorEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename;";
$result=sasql_query($connect,$query_string);

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		$date_time = $reslt_set[0];
		//$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}
//extreme switch cpu and temp utilization here
$query_string = "
select datatime,nodename,avg(extremeCpuMonitorTotalUtilization),avg(extremeCurrentTemperature) from dc.extremeSystemCommon_custom_one_min where datatime =(select max(datatime) from dc.extremeSystemCommon_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename;";
$result=sasql_query($connect,$query_string);

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		$date_time = $reslt_set[0];
		$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[3];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}
//netscreen temp here
$query_string = "
select datatime,nodename,avg(nsTemperatureCur) from dc.netScreenTemp_custom_one_min where datatime =(select max(datatime) from dc.netScreenTemp_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename;";
$result=sasql_query($connect,$query_string);

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		$date_time = $reslt_set[0];
		//$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["cpu"] = 0;
		$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}
//juniper srx cpu here
$query_string = "
select datatime,nodename,avg(jnxJsSPUMonitoringCPUUsage) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min where datatime =(select max(datatime) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename;";
$result=sasql_query($connect,$query_string);

 while ($reslt_set = sasql_fetch_array($result))

 	{

 		$date_time = $reslt_set[0];
		$obj_holder[$reslt_set[1]]["cpu"] = $reslt_set[2];
		//$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["temp"] = 0;
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
//protocol utilization
if ($key == "Protocol Utilization") {
	$node_list = array();
	$a = array();
	foreach($val['nodeInfo'] as $key => $nodeval) {
	$node_list[] = "'".($nodeval['name'])."'";
	}

	$node_list_fin = implode(',',$node_list); 
	$query_string = "
select datatime,nodename,mplsL3VpnVrfDescription,mplsL3VpnVrfRD,mplsL3VpnVrfOperStatus from dc.mplsL3VpnVrfPerfEntry_custom_one_min where datatime =(select max(datatime) from dc.mplsL3VpnVrfPerfEntry_custom_one_min) and nodename IN ($node_list_fin) order by nodename;";
$result=sasql_query($connect,$query_string);

//$reslt_set = sasql_fetch_array($result);
$obj_holder = array();
$obj_holder["protocol_util"]["mplv3"] = array();
while ($reslt_set = sasql_fetch_array($result))
{
		$obj_arr = array();
		$obj_arr["nodename"] = $reslt_set[1];
		$obj_arr["datatime"] = $reslt_set[0];
		$obj_arr["desc"] = $reslt_set[2];
		$obj_arr["id"] = $reslt_set[3];
		$obj_arr["status"] = round($reslt_set[4]);
		array_push($obj_holder["protocol_util"]["mplv3"],$obj_arr);
}
//bgp polling here, change the table name later 
$query_string = "
select datetime_id,SNMP,bgpPeerIdentifier,bgpPeerLocalAddr,bgpPeerRemoteAddr,bgpPeerLocalPort,bgpPeerState from dc.CUSTOM_DC_E_SNMP_bgpPeerEntry_RAW_01 where datetime_id =(select max(datetime_id) from dc.CUSTOM_DC_E_SNMP_bgpPeerEntry_RAW_01) and SNMP IN ($node_list_fin) order by SNMP;";
$result=sasql_query($connect,$query_string);
//$reslt_set = sasql_fetch_array($result);
$obj_holder["protocol_util"]["bgp"] = array();

while ($reslt_set = sasql_fetch_array($result))
{
		$obj_arr = array();
		$obj_arr["nodename"] = $reslt_set[1];
		$obj_arr["datatime"] = $reslt_set[0];
		$obj_arr["Remote Address"] = $reslt_set[4];
		$obj_arr["Local Address"] = $reslt_set[3];
		$obj_arr["Identifier"] = round($reslt_set[2]);
		$obj_arr["Port"] = round($reslt_set[5]);
		$obj_arr["Status"] = round($reslt_set[6]);
		array_push($obj_holder["protocol_util"]["bgp"],$obj_arr);
}

$json_return = array();
print_r(json_encode($obj_holder));

}
if ($key == "Memory Utilization") {
	$node_list = array();
	$a = array();
	foreach($val['nodeInfo'] as $key => $nodeval) {
			$node_list[] = "'".($nodeval['name'])."'";
		}
	$node_list_fin = implode(',',$node_list); 


//extreme memory usage
			$query_string = "
select datatime,nodename,sum(extremeMemoryMonitorSystemTotal),sum(extremeMemoryMonitorSystemUsage) from dc.extremeMemoryMonitorSystemEntry_custom_one_min where datatime =(select max(datatime) from dc.extremeMemoryMonitorSystemEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);

//$reslt_set = sasql_fetch_array($result);
$obj_holder = array();



 while ($reslt_set = sasql_fetch_array($result))
	{

 		$obj_holder[$reslt_set[1]]["memory"] = ($reslt_set[3]/$reslt_set[2]) * 100;
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}

 //rbn type queryiing



$query_string = "

select datatime,nodename,avg(rbnSRStorageUtilization) from dc.rbnSRStorageEntry_custom_one_min where datatime =(select max(datatime) from dc.rbnSRStorageEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);
while ($reslt_set = sasql_fetch_array($result))
{
		$date_time = $reslt_set[0];
		$obj_holder[$reslt_set[1]]["memory"] = $reslt_set[2];
		//$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[3];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];

}

//rbn type querying for temp
$query_string = "

select datatime,nodename,avg(jnxOperatingHeap) from dc.jnxOperatingEntry_custom_one_min where datatime =(select max(datatime) from dc.jnxOperatingEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);
while ($reslt_set = sasql_fetch_array($result))
{
		$obj_holder[$reslt_set[1]]["memory"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];

}

//extreme switch cpu and temp utilization here

$query_string = "

select datatime,nodename,avg(jnxJsSPUMonitoringMemoryUsage) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min where datatime =(select max(datatime) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);
while ($reslt_set = sasql_fetch_array($result))
	{


		$obj_holder[$reslt_set[1]]["memory"] = $reslt_set[2];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];

}


 	$json_return = array();

	foreach($json_input as $key => $val) {

		foreach($val['nodeInfo'] as $key => $nodeval) {

				$memory_u = $obj_holder[$nodeval['name']]["memory"];
				$timestamp_all = $obj_holder[$nodeval['name']]["database_time"];
				$json_return['memory_util'][$nodeval['name']]= round($memory_u);
				//$json_return['temp_util'][$nodeval['name']]= round($temp_u);

		}

	}

print_r(json_encode($json_return));

}
if ($key == "Session Utilization") {
	$node_list = array();
	$a = array();
	foreach($val['nodeInfo'] as $key => $nodeval) {
			$node_list[] = "'".($nodeval['name'])."'";
		}
	$node_list_fin = implode(',',$node_list); 


//extreme memory usage
			$query_string = "
select datatime,nodename,sum(jnxJsSPUMonitoringCurrentFlowSession),sum(jnxJsSPUMonitoringMaxFlowSession) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min where datatime =(select max(datatime) from dc.jnxJsSPUMonitoringObjectsEntry_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);

//$reslt_set = sasql_fetch_array($result);
$obj_holder = array();



 while ($reslt_set = sasql_fetch_array($result))
	{

 		$obj_holder[$reslt_set[1]]["session"] = ($reslt_set[2]/$reslt_set[3]) * 100;
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];
}

 //rbn type queryiing



$query_string = "

select datatime,nodename,sum(nsResSessAllocate),sum(nsResSessMaximum) from dc.netScreenSession_custom_one_min where datatime =(select max(datatime) from dc.netScreenSession_custom_one_min) and nodename IN ($node_list_fin) group by datatime,nodename order by nodename,datatime desc;";

$result=sasql_query($connect,$query_string);
while ($reslt_set = sasql_fetch_array($result))
{
		$date_time = $reslt_set[0];
		$obj_holder[$reslt_set[1]]["session"] = ($reslt_set[2]/$reslt_set[3]) * 100;
		//$obj_holder[$reslt_set[1]]["temp"] = $reslt_set[3];
		$obj_holder[$reslt_set[1]]["database_time"] = $reslt_set[0];

}
 	$json_return = array();

	foreach($json_input as $key => $val) {

		foreach($val['nodeInfo'] as $key => $nodeval) {

				$session_u = $obj_holder[$nodeval['name']]["session"];
				$timestamp_all = $obj_holder[$nodeval['name']]["database_time"];
				//$json_return['session_util'][$nodeval['name']]= round($session_u);
				//$timestamp_all = strtotime($obj_holder[$nodeval['name']]['1']["database_time"]);



				//$json_return['sys_up'][$nodeval['name']]= round($cpu_u/60*2);
				$json_return['session_util'][$nodeval['name']]['invalue']['data'] = array($session_u);
				$json_return['session_util'][$nodeval['name']]['timeframe']['data'] = array($timestamp_all * 1000);
				//$json_return['temp_util'][$nodeval['name']]= round($temp_u);

		}

	}

print_r(json_encode($json_return));

}
if ($key == "System Uptime") {



		$node_list = array();



		$a = array();



      	foreach($val['nodeInfo'] as $key => $nodeval) {



			$node_list[] = "'".($nodeval['name'])."'";



		


		}



			
			$node_list_fin = implode(',',$node_list); 



			$query_string = "



select * from( select datatime,nodename,dense_RANK() OVER ( PARTITION BY nodename ORDER BY datatime desc) as row_num,sysUpTime from  dc.mpbn_system_custom_one_min where nodename in ($node_list_fin)) as a where row_num < 3;";

$result=sasql_query($connect,$query_string);

//$reslt_set = sasql_fetch_array($result);







 $obj_holder = array();



 while ($reslt_set = sasql_fetch_array($result))



 	{



 		//print_r($query_string);

 		//die;



 		$date_time = $reslt_set[0];

$obj_holder[$reslt_set[1]][$reslt_set[2]]["systemup"] = $reslt_set[3];
$obj_holder[$reslt_set[1]][$reslt_set[2]]["database_time"] = $reslt_set[0];







 		



 	}



 



 	$json_return = array();

	foreach($json_input as $key => $val) {



 				



			foreach($val['nodeInfo'] as $key => $nodeval) {



				$cpu_u = round(($obj_holder[$nodeval['name']]['1']["systemup"] - $obj_holder[$nodeval['name']]['2']["systemup"])/(60*2*1));

				

				$timestamp_all = strtotime($obj_holder[$nodeval['name']]['1']["database_time"]);



				//$json_return['sys_up'][$nodeval['name']]= round($cpu_u/60*2);
				$json_return['system_uptime'][$nodeval['name']]['invalue']['data'] = array($cpu_u);
				$json_return['system_uptime'][$nodeval['name']]['timeframe']['data'] = array($timestamp_all * 1000);

				



				



				//$json_return['cpu_util'][$nodeval['name']]['timeframe']['data'] = array($timestamp_all * 1000);







				







		}



	//



	//die;



	}

print_r(json_encode($json_return));

}

}
 	?>