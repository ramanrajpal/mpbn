<?php
$con_str = "Data Source=dwhdb; Uid=dba; Pwd=sql;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");
//print_r(file_get_contents('php://input'),true);

$json_input = json_decode(file_get_contents('php://input'),true);
//print_r($json_input);
//die;
foreach($json_input as $key => $val) {
	//for all these values do an update to the table
	$status = "'" . $val . "'";
	$update_string = "UPDATE dc.alarmDataTable_custom_one_min "."SET alarm_status=$status " ."where alarm_id = $key;";
	$result=sasql_query($connect,$update_string);
	print_r($update_string);
	}
?>