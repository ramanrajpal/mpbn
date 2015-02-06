<?php
//$path = 'C:\wamp\bin\php\php5.3.10\ext';
ini_set('include_path', 'C:\wamp\bin\php\php5.3.10\ext');
//set_include_path(get_include_path() . PATH_SEPARATOR . $path);
echo $path;
//1.db connection string
//ini_set('memory_limit','516M');
/*
$con_str = "Data Source=dwhdb; Uid=dba; Pwd=sql;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");
//2.fetch latest date from dc.trig_mpbn_delta_values
$fetch_latest_timestamp_delta = "select max(datatime) from dc.trig_mpbn_delta_values;";
$last_load_timestamp = sasql_query($connect,$fetch_latest_timestamp_delta);
$last_load_timestamp  =  sasql_fetch_array($last_load_timestamp);
$last_load_timestamp =  $last_load_timestamp[0];
//3. fetch data from ifentry > max_time_stamp
$fetch_if_entry_data = "select DATATIME,nodename,ifIndex,dense_RANK() OVER ( PARTITION BY nodename ORDER BY datatime asc) as row_num,ifType,ifMtu,ifSpeed,ifAdminStatus,ifOperStatus,ifLastChange,ifInOctets,ifInUcastPkts,ifInNUcastPkts,ifInDiscards,ifInErrors,ifInUnknownProtos,ifOutOctets,ifOutUcastPkts,ifOutNUcastPkts,ifOutDiscards,ifOutErrors,ifOutQLen,ifDescr,ifPhysAddress,ifName,ifInMulticastPkts,ifInBroadcastPkts,ifOutMulticastPkts,ifOutBroadcastPkts,ifHCInOctets,ifHCInUcastPkts,ifHCInMulticastPkts,ifHCInBroadcastPkts,ifHCOutOctets,ifHCOutUcastPkts,ifHCOutMulticastPkts,ifHCOutBroadcastPkts,ifHighSpeed from dc.mpbn_ifentry_custom_one_min_new where datatime between '".$last_load_timestamp."' and DATEADD( minute, 10, '".$last_load_timestamp."' ) order by nodename,ifIndex,row_num desc";
//echo $fetch_if_entry_data;
//die;
$result = sasql_query($connect,$fetch_if_entry_data);
$result_set = array();
while ($if_entry_data = sasql_fetch_array($result))
{
//array_push($result_set,$if_entry_data);
	//$result_set[nodename][ifIndex][row_num]['ifType'] = $if_entry_data[4];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifType'] = $if_entry_data[4];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['datatime'] = $if_entry_data[0];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifMtu'] = $if_entry_data[5];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifSpeed'] = $if_entry_data[6];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifAdminStatus'] = $if_entry_data[7];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOperStatus'] = $if_entry_data[8];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifLastChange'] = $if_entry_data[9];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInOctets'] = $if_entry_data[10];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInUcastPkts'] = $if_entry_data[11];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInNUcastPkts'] = $if_entry_data[12];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInDiscards'] = $if_entry_data[13];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInErrors'] = $if_entry_data[14];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInUnknownProtos'] = $if_entry_data[15];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutOctets'] = $if_entry_data[16];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutUcastPkts'] = $if_entry_data[17];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutNUcastPkts'] = $if_entry_data[18];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutDiscards'] = $if_entry_data[19];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutErrors'] = $if_entry_data[20];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutQLen'] = $if_entry_data[21];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifDescr'] = $if_entry_data[22];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifPhysAddress'] = $if_entry_data[23];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifName'] = $if_entry_data[24];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInMulticastPkts'] = $if_entry_data[25];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifInBroadcastPkts'] = $if_entry_data[26];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutMulticastPkts'] = $if_entry_data[27];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifOutBroadcastPkts'] = $if_entry_data[28];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCInOctets'] = $if_entry_data[29];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCInUcastPkts'] = $if_entry_data[30];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCInMulticastPkts'] = $if_entry_data[31];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCInBroadcastPkts'] = $if_entry_data[32];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCOutOctets'] = $if_entry_data[33];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCOutUcastPkts'] = $if_entry_data[34];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCOutMulticastPkts'] = $if_entry_data[35];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHCOutBroadcastPkts'] = $if_entry_data[36];
	$result_set[$if_entry_data[1]][$if_entry_data[2]][$if_entry_data[3]]['ifHighSpeed'] = $if_entry_data[37];


}
$first_row = array();
$second_row = array();
$result_set_length = count($result_set);
$insert_array = array();
//iterate over each value in the array
foreach($result_set as $node => $nodeObject) {
	//iterate over each port list here
	foreach ($result_set[$node] as $port => $value) {
		//substract the values here to get the items value
		//get the next rank value here
		foreach ($result_set[$node][$port] as $rank => $found) {
			$rank_next = $rank + 1;
			print_r($rank_next);
			//die;
			if (array_key_exists($rank_next,$result_set[$node][$port])) {
				$inoctet = (double)$result_set[$node][$port][$rank]['ifInOctets'] - (double)$result_set[$node][$port][$rank_next]['ifInOctets'];
				$outoctet = ($result_set[$node][$port][$rank]['ifOutOctets'] - $result_set[$node][$port][$rank_next]['ifOutOctets']);
				$hcinoctet = ($result_set[$node][$port][$rank]['ifHCInOctets'] - $result_set[$node][$port][$rank_next]['ifHCInOctets']);
				$hcoutoctet = ($result_set[$node][$port][$rank]['ifHCOutOctets'] - $result_set[$node][$port][$rank_next]['ifHCOutOctets']);
			} else {
		//do nothing
			}
		print_r($inoctet);
		print_r("\n");
		}
	}
	
}
die;
/*
$insert_query = "insert into dc.trig_mpbn_delta_values";

for($i=0 ; $i<= $result_set_length ;$i++){

	$first_row = $result_set[$i];

	$second_row = $result_set[$i+1];

	//print_r($first_row);

	//print_r($second_row);



	if($first_row['nodename'] = $second_row['nodename'] && $first_row['ifindex'] == $second_row['ifindex'] && $first_row['row_num'] != 1 && $first_row['1'] =='edns3'){

		$insert_values = array();



		//print_r($first_row['row_num']);

		//print_r($first_row[1]);

		

$insert_value[0] = $first_row[0];

$insert_value[1] = $first_row[1];

$insert_value[2] = $first_row[2];

$insert_value[3] = $first_row[4];

$insert_value[4] = $first_row[5];

$insert_value[5] = $first_row[6];

$insert_value[6] = $first_row[7];

$insert_value[7] = $first_row[8];

$insert_value[8] = $first_row[22];

$insert_value[9] = $first_row[23];

$insert_value[10] = $first_row[24];

$insert_value[11] = (double)$first_row[9] - (double)$second_row[9] ;

$insert_value[12] = (double)$first_row[10] - (double)$second_row[10]; 

$insert_value[13] = (double)$first_row[11] - (double)$second_row[11] ;

$insert_value[14] = (double)$first_row[12] - (double)$second_row[12] ;

$insert_value[15] = (double)$first_row[13] - (double)$second_row[13] ;

$insert_value[16] = (double)$first_row[14] - (double)$second_row[14] ;

$insert_value[17] = (double)$first_row[15] - (double)$second_row[15]; 

$insert_value[18] = (double)$first_row[16] - (double)$second_row[16]; 

$insert_value[19] = (double)$first_row[17] - (double)$second_row[17]; 

$insert_value[20] = (double)$first_row[18] - (double)$second_row[18]; 

$insert_value[21] = (double)$first_row[19] - (double)$second_row[19] ;

$insert_value[22] = (double)$first_row[20] - (double)$second_row[20] ;

$insert_value[23] = (double)$first_row[21] - (double)$second_row[21] ;

$insert_value[24] = (double)$first_row[25] - (double)$second_row[25] ;

$insert_value[25] = (double)$first_row[26] - (double)$second_row[26] ;

$insert_value[26] = (double)$first_row[27] - (double)$second_row[27] ;

$insert_value[27] = (double)$first_row[28] - (double)$second_row[28] ;

$insert_value[28] = (double)$first_row[29] - (double)$second_row[29] ;

$insert_value[29] = (double)$first_row[30] - (double)$second_row[30] ;

$insert_value[30] = (double)$first_row[31] - (double)$second_row[31] ;

$insert_value[31] = (double)$first_row[32] - (double)$second_row[32] ;

$insert_value[32] = (double)$first_row[33] - (double)$second_row[33] ;

$insert_value[33] = (double)$first_row[34] - (double)$second_row[34] ;

$insert_value[34] = (double)$first_row[35] - (double)$second_row[35] ;

$insert_value[35] = (double)$first_row[36] - (double)$second_row[36] ;

array_push($insert_array, $insert_value);



$insert_query = $insert_query." ('".$first_row['datatime'].

"','".$first_row[1]."',".

"','".$first_row[2]."',".

"','".$first_row[4]."',".

"','".$first_row[5]."',".

"','".$first_row[6]."',".

"','".$first_row[7]."',".

"','".$first_row[8]."',".

"','".$first_row[22]."',".

"','".$first_row[23]."',".

"','".$first_row[24]."',".

"','".$first_row[9] - $second_row[9] ."',".

"','".$first_row[10] - $second_row[10] ."',".

"','".$first_row[11] - $second_row[11] ."',".

"','".$first_row[12] - $second_row[12] ."',".

"','".$first_row[13] - $second_row[13] ."',".

"','".$first_row[14] - $second_row[14] ."',".

"','".$first_row[15] - $second_row[15] ."',".

"','".$first_row[16] - $second_row[16] ."',".

"','".$first_row[17] - $second_row[17] ."',".

"','".$first_row[18] - $second_row[18] ."',".

"','".$first_row[19] - $second_row[19] ."',".

"','".$first_row[20] - $second_row[20] ."',".

"','".$first_row[25] - $second_row[25] ."',".

"','".$first_row[26] - $second_row[26] ."',".

"','".$first_row[27] - $second_row[27] ."',".

"','".$first_row[28] - $second_row[28] ."',".

"','".$first_row[29] - $second_row[29] ."',".

"','".$first_row[30] - $second_row[30] ."',".

"','".$first_row[31] - $second_row[31] ."',".

"','".$first_row[32] - $second_row[32] ."',".

"','".$first_row[33] - $second_row[33] ."',".

"','".$first_row[34] - $second_row[34] ."',".

"','".$first_row[35] - $second_row[35] ."',".

"','".$first_row[36] - $second_row[36] ."'),";

	/*

		$insert_values[0] = $first_row['datatime'];

		$insert_values[1] =  $first_row[1];

		$insert_values[2] = $first_row['ifindex'];

		$insert_values[3] = $first_row['ifInOctets'] - $second_row['ifInOctets'];

		$insert_values[4] = $first_row['ifOutOctets'] - $second_row['ifOutOctets'];

		array_push($insert_array,$insert_values);

		print_r($insert_values);

		

		*/

		//print_r($insert_array);

		
/*
	}

	else{

		

		

		

	}



}

for($i=0;$i<=count($insert_array);$i++){



$ins_stat = "(".(implode(",",$insert_array[$i])).")";

echo $ins_stat;

$ins_stat = "insert into dc.mpbn_trig_delta_values ".$ins_stat;

echo $ins_stat;

die;



};

*/





?>



