<?php
    //db connection --
$con_str = "Data Source=dwhdb; Uid=dcbo; Pwd=dcbo;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");
$json_input = json_decode(file_get_contents('php://input'),true);	
//$json_input = json_decode('{"Port Utilization":{"time":"","nodeInfo":[{"name":"Node1","portlist":["1","2"]},{"name":"Node2","portlist":["33"]}]}}',true);
print_r($json_input);

foreach($json_input as $key => $val) {
		//print_r($val);
      	foreach($val['nodeInfo'] as $key => $nodeval) {
			$a = array();
			foreach($nodeval['portlist'] as $df => $portval) {
			$a[] = $portval;
			}
		
			$node_name = $nodeval['name'];
		
		if (count($a) == 1){
			$port_list_fin = $a[0];
			
			$query_and_clause = 'and ports = ';
			$query_string = "select * from 	dc.mpbn_ifentry_custom_one_min_new where nodename = $node_name and port =$port_list_fin;";			
			}
		else{
			$port_list_fin = implode(',',$a); 
			$query_string = "select * from 	dc.mpbn_ifentry_custom_one_min_new where nodename = $node_name and ports in ($port_list_fin);";
			}
		
		
$result=sasql_query($connect,$query);

		echo $query_string;	
		}
}

	
?>