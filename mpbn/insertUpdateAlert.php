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
	
		if ($key == "Port_Utilization") {
		$kpi_name = "'".$key."'";
		$node_list = array();
		$a = array();
      	foreach($val['nodeInfo'] as $key => $nodeval) {
			//$node_list[] = "'".($nodeval['name'])."'";
			$nodeName = "'".($nodeval['name'])."'";
			//get the severities here
			$l_1 = (int)$nodeval['values'][0];
			$l_2 = (int)$nodeval['values'][1];
			$l_3 = (int)$nodeval['values'][2];
			$l_4 = (int)$nodeval['values'][3];
			foreach($nodeval['portlist'] as $df => $portval) {
				$portName = "'".$portval."'";
				/*$query_string = "INSERT INTO dc.alertConfiguration_custom_one_min "."(kpi,nodename,portname,L1,L2,L3,L4) ".
       						"VALUES ".
       								"($kpi_name,$nodeName,$portName,$l_1,$l_2,$l_3,$l_4);";
       			$result=sasql_query($connect,$query_string);
       			*/
       			$query_string ="select * from dc.alertConfiguration_custom_one_min ".
       			"where nodename = $nodeName and kpi = $kpi_name and portname = $portName;";
				$result=sasql_query($connect,$query_string);
				$num_rows = sasql_num_rows($result);
				//print_r($query_string);
				print_r($num_rows);
				//sasql_close($connect);
				if ($num_rows > 0) {
//perform update
				$update_string = "UPDATE dc.alertConfiguration_custom_one_min "."SET L1=$l_1,L2=$l_2,L3=$l_3,L4=$l_4 " ."where nodename = $nodeName and kpi = $kpi_name and portname = $portName;";
				print_r($update_string);
				} else {
//insert
				$update_string = "INSERT INTO dc.alertConfiguration_custom_one_min "."(kpi,nodename,portname,L1,L2,L3,L4) ". 
								"VALUES ".
							"($kpi_name,$nodeName,$portName,$l_1,$l_2,$l_3,$l_4);";
				
				}
				$result=sasql_query($connect,$update_string);
				//sasql_close($connect);

			}
		

		}
			$port_list_fin = implode(',',$a);
			$node_list_fin = implode(',',$node_list); 
			print_r($port_list_fin);
		}
	}
	?>