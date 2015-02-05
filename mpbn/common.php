<?php
@session_start();
date_default_timezone_set('Etc/GMT-10');
if(@$_SESSION['smartSessionCheck']!=0){
	if(isset($_SESSION["uid"])){
		if(isset($_SESSION["role"])){
			$id=$_SESSION["uid"];
			$username=$_SESSION["username"];
			$role=$_SESSION["role"];
			$name=$_SESSION['name'];
			$lastLogin=$_SESSION['last_login'];
			$bit_mask=$_SESSION['bit_mask'];
			$email=$_SESSION['email'];
			$customer_ids=$_SESSION['customer_ids'];
		}else{
			header('Location: notAllowed.php');
			exit();
		}
	}else{
		header('Location: index.php');
		exit();
	}
}
$host='localhost';
$account='root';
$dbpassword='root';
$database='db_smart';
$connect = mysqli_connect($host,$account,$dbpassword,$database) or die("Cannot connect to the database");
function admin_security_check(){
	if($_SESSION["role"]!='admin'){
		header('Location: notAllowed.php');
		myExit();
	}
}
function security_logger($msg){
	$username=$_SESSION["username"];
	$timestamp=date("Y-m-d H:i:s");
}
function logger($string, $normal=FALSE){
	if($normal===TRUE)
		$pass='[ OK ]';
	else
		$pass='[FAIL]';
	$string = str_pad($string,130," ",STR_PAD_RIGHT).$pass."\n";
	$query="insert into log_tbl(report_date,log) values('".date("Y-m-d")."','".real_escape($string)."')";
	execute_query($query);
}
function myExplode($del,$line){
	$line = trim($line);
	$line = explode($del, $line);
	foreach ($line as $key => $value)
		$line[$key] = remove_feeders($value);
	return $line;
}
function close_db(){
	global $connect;
	mysqli_close($connect);
}
function getDBError(){
	global $connect;
	return mysqli_errno($connect);
}
function getRowCount($result){
	if($result===FALSE)
		return FALSE;
	return $result->num_rows;
}
function execute_query($query){
	global $connect;
	$result=mysqli_query($connect,$query);
	if($result===FALSE)
		logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
	return $result;
}
function dml_query($query){
	global $connect;
	$result=mysqli_query($connect,$query);
	$error_no = mysqli_errno($connect);
	if($result===FALSE && $error_no != 1062)
		logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
	return $error_no;
}
function execute_query_one_row($query,$row_type=MYSQLI_BOTH){
	global $connect;
	$result=mysqli_query($connect,$query);
	if($result===FALSE){
		logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
		return FALSE;
	}
	if($result!==FALSE)if ($result->num_rows > 0)
	if($row=mysqli_fetch_array($result,$row_type))
		return $row;
	return FALSE;
}
function execute_query_one_value($query, $row_type=MYSQLI_BOTH){
	global $connect;
	$result=mysqli_query($connect,$query);
	if($result===FALSE){
		logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
		return FALSE;
	}
	if($result!==FALSE)if ($result->num_rows > 0)
	if($row=mysqli_fetch_array($result,$row_type))
		return $row[0];
	return FALSE;
}
function real_escape($str){
	global $connect;
	$str=mysqli_real_escape_string($connect, $str);
	return $str;
}
function extract_number($string){
    $string=preg_replace('/[^0-9.]/', '', $string);
    return trim($string);
}
function isFieldNull($field){
	$field=trim($field);
	if($field == null || $field == '' || $field == 'NULL' || $field == 'undefined' || !isset($field) || $field == 'null')
		return TRUE;
	else
		return FALSE; 
}
function isFieldZero($field){
	$field=trim($field);
	if($field == null || $field == '' || $field == 0 || $field == '0' || $field == 'NULL' || $field == 'undefined' || !isset($field) || $field == 'null' || !is_numeric($field))
		return TRUE;
	else
		return FALSE; 
}
function replaceNull($field,$default=''){
	$field=trim($field);
	if($field == null || $field == '' || $field == 'NULL' || $field == 'undefined' || !isset($field) || $field == 'null')
		return $default;
	else
		return $field;
}
function make_denominator($field){
	$field=trim($field);
	if($field == null || $field == '' || $field == 0 || $field == '0' || $field == 'NULL' || $field == 'undefined' || !isset($field) || $field == 'null' || !is_numeric($field))
		return 1;
	else
		return $field;
}
function execute_query_one_insert_get_id($query){
	global $connect;
	$result=mysqli_query($connect,$query);
	if($result===FALSE)
		logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
	return mysqli_insert_id($connect);
}
function table_exists($tablename,$schema='NOT SET'){
	global $connect;
	global $database;
	if($schema=='NOT SET')
		$schema = $database;
	$query="select count(*) from information_schema.tables where table_schema = '$schema' and table_name = '$tablename'";
	$result=mysqli_query($connect,$query);
	$row=mysqli_fetch_array($result);
	return $row[0] != 0;
}
function getCollumnInfo($tablename,$not,$schema='NOT SET'){
    global $connect;
    global $database;
    if($schema=='NOT SET')
        $schema = $database;
    $query="select column_name from information_schema.columns where table_schema='$schema' and table_name='$tablename' and column_name not in ($not)";
    $result=mysqli_query($connect,$query);
    if($result===FALSE)
        logger("Cannot execute the query: - ".$query." Error Msg: - ".mysqli_error($connect)." Error Code: - ".mysqli_errno($connect));
    return $result;
}
function remove_feeders($string){
	$string=trim($string);
	$string=str_replace(chr(10), '', $string);
	$string=str_replace(chr(11), '', $string);
	$string=str_replace(chr(12), '', $string);
	$string=str_replace(chr(13), '', $string);
	return trim($string);
}
function make_string_column($string_parse, $reduleLen=TRUE) {
	$string_parse = preg_replace('/[^A-Za-z0-9_ -]/', '', $string_parse);
	$string_parse = trim($string_parse);
	$string_parse = str_replace("-", "_", $string_parse);
	$string_parse = str_replace(" ", "_", $string_parse);
	$string_parse = preg_replace('/_+/', "_", $string_parse);
	$string_parse = preg_replace('/^_/', "", $string_parse);
	$string_parse = preg_replace('/_$/', "", $string_parse);
	$string_parse = strtolower($string_parse);
	if($reduleLen)
	   if(strlen($string_parse) > 64)
		  $string_parse = substr($string_parse,0,64);
	return trim($string_parse);
}
function make_column_string($string_parse,$upper_case=TRUE){
	$string_parse = trim($string_parse);
	$string_parse = str_replace(" and "," & ",$string_parse);
	$string_parse = str_replace(" AND "," & ",$string_parse);
	$string_parse = str_replace("_"," ",$string_parse);
	$string_parse = trim($string_parse);
	$string_parse = ucwords($string_parse);
	if($upper_case==TRUE){
		$string_parse = strtoupper($string_parse);
	}
	return $string_parse;
}
function getTagValue($tagname,$filename){
	$doc = new DOMDocument(); 
	$doc->load($filename); 
	$MyArray = array();
	$info = $doc->getElementsByTagName($tagname);
	foreach($info as $key => $value){
		$MyArray[]= $info->item($key)->nodeValue;
	}
	return $MyArray;
}
function strlpos($haystack, $needle){
	$pos=strpos($haystack, $needle);
	if($pos===FALSE)
		return FALSE;
	$pre=0;
	while($pre!==FALSE){
		$pre=strpos($haystack, $needle, $pos + 1);
		if($pre!==FALSE)
			$pos=$pre;
	}
	return $pos;
}
function send_email($recipient,$subject,$mail_body,$ccemails=''){
	ini_set('sendmail_from', 'vikrant.k.kumar@ericsson.com');
	ini_set( 'SMTP', "smtp.internal.ericsson.com" );
	if(count($ccemails) > 0 && $ccemails !== FALSE){
		$headers='Cc: '.$ccemails;
		if(!@mail($recipient, $subject, $mail_body, $headers)){
			logger("Failed to send notification  email");
			return FALSE;
		}	
	} else {
		if(!@mail($recipient, $subject, $mail_body)){
			logger("Failed to send notification  email");
			return FALSE;
		}
	}
	return TRUE;
}
function send_sms($recipient,$subject,$mail_body){
    ini_set('sendmail_from', 'vikrant.k.kumar@ericsson.com');
    ini_set( 'SMTP', "smtp.internal.ericsson.com" );
	if(count($recipient) < 1)
		return FALSE;
	foreach ($recipient as $key => $value) 
		$recipient[$key] = '+'.$value.'@sms.ericsson.se';
	$recipient=implode(",", $recipient);
    if(!@mail($recipient, $subject, $mail_body)){
        logger("Failed to send notification  email");
        return FALSE;
    }
    return TRUE;
}
function myExit($str=''){
	if(trim($str) != '') logger($str);
	close_db();
	exit();
	die();
}
?>
