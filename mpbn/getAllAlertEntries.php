<?php

    //db connection --
$con_str = "Data Source=dwhdb; Uid=dba; Pwd=sql;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");
$query_string ="select alarm_in_time,kpi,L1,L2,L3,L4,alarm_status,alarm_id,nodename,portname from dc.alarmDataTable_custom_one_min order by alarm_in_time;";
$result=sasql_query($connect,$query_string);
$res_object = array();
while ($reslt_set = sasql_fetch_array($result)) {
		if ($reslt_set[2] == 1) {
				$sev = "Major";
				}
		if ($reslt_set[2] == 0 && $reslt_set[3] == 1) {
				$sev = "Warning";
			}
		if ($reslt_set[2] == 0 && $reslt_set[3] == 0 && $reslt_set[4] == 1) {
				$sev = "Minor";
			}
		if ($reslt_set[2] == 0 && $reslt_set[3] == 0 && $reslt_set[4] == 0 && $reslt_set[5] == 1) {
				$sev = "Info";
			}
		$object_hash = array();
		$object_hash["ID"] = $reslt_set[7];
		$object_hash["Alarm IN Time"] = $reslt_set[0];
		$object_hash["Alarm Description"] = $reslt_set[9];
		$object_hash["NodeName"] = $reslt_set[8];
		$object_hash["Severity"] = $sev;
		$object_hash["Alarm Status"] = $reslt_set[6];
		$object_hash["Alarm Count"] = 1;
		array_push($res_object,$object_hash);
		}
//send the object formed to the client here
print_r(json_encode($res_object));
?>