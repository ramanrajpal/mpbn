<?php require_once 'common.php';
if(isset($_POST['func'])){
	switch ($_POST['func']) {
		case 'changeProfileEmail':
			$email = $_POST['email'];
			if(execute_query("update users set email='$email' where id=$id"))
				echo '<p style="color:blue">Email Address Updated</p>';
			else
				echo '<p style="color:red">Email Address Cannot be Updated</p>';
			break;
		case 'changeProfilePwd':
			$oldpwd = real_escape(md5($_POST['oldpwd']));
			$newpwd = real_escape(md5($_POST['newpwd']));
			if(execute_query_one_value("select id from users where id=$id and password='$oldpwd'")){
				if(execute_query("update users set password='$newpwd' where id=$id")){
					echo '<p style="color:blue">Password Updated</p>';
				}else{
					echo '<p style="color:red">Password cannot be changed</p>';
				}
			}else {
				echo '<p style="color:red">Old Password does not match</p>';
			}
			break;
		
	}
	myExit();
}
close_db();?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>MPBN Monitoring</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="icon" type="image/png" href="img/logo_san.png"/>
	<link rel="stylesheet" type="text/css" href="css/start.css" />
	<link rel="stylesheet" type="text/css" href="css/service_list.css" />
	<link rel="stylesheet" type="text/css" href="css/main.css" />
</head>
	<body onload="initloadscript();">
		<div style="background:url(img/line_thinest.png) repeat;height: 4px;width:100%;"> </div>
		<div class="mainbar">
			<img src="img/erric_logo.png" style="cursor: pointer;position:absolute;top:-8px;left:8px;" onClick="window.location.reload()"/>
			<table class="menubar">
				<tr valign="center" height="25px">
					<td><a onClick="window.location.reload()"><img src="img/home_w.png" />&nbsp;Home</a>
					<td><a href="http://store.internal.ericsson.com/alex"><img src="img/alex.png" />&nbsp;Alex</a>
					<td><a href="http://internal.ericsson.se/"><img src="img/ericsson.png" />&nbsp;Ericsson Home Page</a>
					<td><?php if($role=="admin"){?>	<a href="admin.php"><img src="img/admin_min.png" />&nbsp;Admin Panel</a> <?php } ?>
					<td><a href="work_flow.php"><img src="img/order_192.png" />&nbsp;Work Order</a>
					<td><a href="logout.php"><img src="img/gnome_session_logout.png" />&nbsp;Logout</a>
				</table>
		</div>
		<img class="service-hover-class" title="Service List" src="img/service-icon3.png" onclick="window.location.reload()"/>
		<div class="sidepanel" id="sidepanel">
			<table width="100%" height="100%" style="border: 0px solid red;color:#fff;" cellspacing="0">
				<tr>
					<td id="drawer" width="170px" style="background-color: #000;padding-top: 60px;" class="sidemenu" valign="top">&nbsp;</td>
					<td width="32px" class="drawerClick"><img src="img/launchert_32.png" style="cursor: pointer;" onclick="show_drawer()"/></td>
					<td valign="center" align="center">
						<div id="iconsFunc">
							<?php if(($bit_mask&1)!=0){?>
							<div class="radial_gradient_white" onclick="loadgraphpage()"><table width="100%" height="100%"><tr><td valign="middle" align="center" width="100px">
								<img src="img/TrendingIcon.png" /><td>Trending</table></div>
							<?php } ?>
							<?php if(($bit_mask&2)!=0){?>
							<div class="radial_gradient_dark_blue" onclick="loadnetworkdiagram()"><table width="100%" height="100%"><tr><td valign="middle" align="center" width="100px">
								<img src="img/network_diagram.png" /><td>Network Diagram</table></div>
							<?php } ?>
							<?php if(($bit_mask&4)!=0){?>
							<div class="radial_gradient_green" onclick="loadlcm()"><table width="100%" height="100%"><tr><td valign="middle" align="center" width="100px">
								<img src="img/license_manager.png" /><td>LCM</table></div>
							<?php } ?>
						</div>
						<div class="selectSmartOtherOptions" id="breachList" style="display: none">
							<h3>Please select one of the below Breach Lists</h3> 
							<a href='issue.php?isu=alert' target="_blank">Alerts</a><br /><br />
							<a href="issue.php?isu=exception" target="_blank">Exception</a><br /><br />
							<a href="comment.php" target="_blank">Comments</a><br /><br />
						</div>
						<div class="selectSmartOtherOptions" id="userManage" style="display: none">
							<h3>Manage Profile</h3> 
							<div id="changeForm">
								<a href='#' onclick="changeFormPawword()">Change Password</a><br /><br />
								<a href='#' onclick="changeFormEmail()">Change Email Address</a><br /><br />
							</div>
							<div class="form" id="changePasswordForm" style="display: none">
								<table border="0"><tr><td><p>Old Password</p></td>
								<td><input type="password" id="oldpwd" placeholder="Old Password"/></td></tr>
								<tr><td><p>New Password</p></td><td><input type="password" id="newpwd" placeholder="New Password"/></td></tr>
								<tr><td><p>Confirm Password</p></td><td><input type="password" id="cnfpwd" placeholder="Confirm Password"/></td></tr>
								</table>
								<input class="submit" type="button" name="pwdChgSubmit" value="Submit" onclick="changePassword()"/>
								<input class="submit" type="button" value="Go Back" onclick="changeForm()"/>
							</div>
							<div class="form" id="changeEmailForm" style="display: none">
								<table border="0"><tr><td><p>Email ID</p></td>
								<td><input type="text" id="oldemail" style="width: 300px" name="oldemail" placeholder="Email Address"/></td></tr>
								</table>
								<input class="submit" type="button" name="emailChgSubmit" value="Submit" onclick="changeEmail()"/>
								<input class="submit" type="button" value="Go Back" onclick="changeForm()"/>
							</div>
							<div id="errorsdiv">
							</div>
						</div>
					</td>
				</tr>
			</table>	
		</div>
	</body>
	<script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/start.js"></script>
    <script type="text/javascript" src="js/ajax_script.js"></script>
</html>
