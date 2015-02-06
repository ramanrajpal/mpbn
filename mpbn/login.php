<?php
$con_str = "Data Source=dwhdb; Uid=dba; Pwd=sql;";
$connect = sasql_connect($con_str) or die("Cannot connect to the database");

	$username='';
	$password='';
	$flag=0;
	if (isset($_COOKIE['username']) && isset($_COOKIE['password'])){
	 $username=$_COOKIE['username'];
	 $password=$_COOKIE['password'];
	 $flag=1;
	}else{
		if(@$_POST['submit']){
		 $username = $_POST['username'];
		 $password = $_POST['password'];
		 $flag=1;
		 echo $username;
		 echo $password;

		}	
	}
	if(isset($_POST['fpsubmit']) && isset($_POST['fpemail'])){
		$flag = 2;
	}
	if(isset($_POST['registerSubmit'])){
		$flag = 3;
	}
	if($flag!=0){
		session_start();
		$_SESSION["smartSessionCheck"]=0;
		//require_once 'common.php';
	}
	if($flag == 3){
		$username = real_escape($_POST['registerUsername']);
		$password = real_escape($_POST['registerPassword']);
		$name = real_escape($_POST['registerName']);
		$email = real_escape($_POST['registerEmail']);
		if(sasql_query($connect,"SELECT id FROM users WHERE username = '$username'")){
			header('Location: index.php?r=registerUsernameTaken');
		}elseif(sasql_query($connect,"SELECT id FROM users WHERE email = '$email'")){
			header('Location: index.php?r=registerEmailTaken');
		}else{/*
			$password = md5($password);
			$cdate = date("Y-m-d");
			execute_query("INSERT INTO users (username, password, email, name, creation_date, bit_mask) 
			VALUES('$username','$password','$email','$name','$cdate',0)");
			$mail_body = "User name: - ".$username;
			send_email("vikrant.k.kumar@ericsson.com", 'SMART Tool: - New User has registered', $mail_body);
			header('Location: index.php?r=registerSuccess');
		*/}
	}
	if($flag == 2){
		$email = real_escape($_POST['fpemail']);
		$row = sasql_query($connect,"SELECT * FROM users WHERE email = '$email'");
		$get='';
		if($row){
			$random_password = base_convert(mt_rand(1000000000, 9999999999), 10, 16); 
			$password=md5($random_password);
			sasql_query($connect,"UPDATE users SET password='$password' WHERE email='$email'");
			$mail_body = "Your new password for SMART login is: - ".$random_password.""; 
			send_email($email, "SMART: New Password for SMART Login", $mail_body);
			$get='fpChg';
		} else {
			$get='fpNotFnd';
		}
		header('Location: index.php?r='.$get);
	}
	if($flag==1){
		
		if(!$username || !$password){
			header('Location: index.php?r=notGiven');
		}else{
			$query_string = "select * FROM users WHERE username = '$username' AND password = '$password'";
		echo $query_string;
			$row = sasql_query($connect,$query_string);
			$row = sasql_fetch_array($row);
			
			if(!$row){
				header('Location: index.php?r=notMatch');
				unset($_COOKIE['username']);
				unset($_COOKIE['password']);
			} else {
				echo "second";
				print_r($row);
			
				$active=$row['status'];
				if($active==1){
					$_SESSION['uid'] = $row['id'];
					$id=$row['id'];
					$_SESSION['username'] = $row['username'];
					$_SESSION['role'] = $row['role'];
					$_SESSION['name'] = $row['name'];
					$_SESSION['email'] = $row['email'];
					$_SESSION['last_login'] = $row['last_login'];
					$_SESSION['bit_mask'] = $row['bit_mask'];
					$_SESSION['customer_ids'] = $row['customer_ids'];
					$_SESSION['status'] = $row['status'];

					//sasql_query($connect,"update users set last_login=now() where id=$id");
	    		    if ($_POST['remember'] && $_POST['submit']){
	    		       setcookie('username', $_POST['username'],time()+(60*60*24*30));
	           		   setcookie('password', $_POST['password'],time()+(60*60*24*30));
	           		   if ($_SESSION['role'] == 'admin'){
	           		   setcookie('userAdminLevel',1,time()+(60*60*24*30));	
	           		} else{setcookie('userAdminLevel',0,time()+(60*60*24*30));	
	           			}
					}
					
					else{
					setcookie('userName', $_POST['username'],time()+(60*60*24*30));
	           		   setcookie('password', $_POST['password'],time()+(60*60*24*30));
	           		   	if ($_SESSION['role'] == 'admin'){
	           		   setcookie('userAdminLevel',1,time()+(60*60*24*30));	
	           		}
	           		else{setcookie('userAdminLevel',0,time()+(60*60*24*30));	}
					}
					$_SESSION["smartSessionCheck"]=1;
					header('Location: app\monitor_nodes.html');
				} else{
					header('Location: index.php?r=notActive');
				}
			}
		}
	}	
	if($flag!=0){
		close_db();
	}			
?>
