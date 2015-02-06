<?php require_once "login.php"; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="icon" type="image/png" href="img/logo_san.png"/>
<title>MPBN Monitoring</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
<link rel="stylesheet" type="text/css" href="css/opaque.css"/>
</head>
	<body onLoad="checkBrowser();">
		<div class="overlay-opaque-none" id="cascadeDiv"></div>
		<table style="height: inherit;width: inherit;">
			<tr height="5%">
				<td class="layouvisible">
					<img src="img\ERI_logo.png" style="height: 25px; width: 120px; margin-left: 20px;"/>

				</td>
				<td class="layouvisible">
					&nbsp;
				</td>	
			</tr>
			<tr height="90%">
				</td>
				<td class="layouvisible" align="center" valign="top" style="padding-top: 50px;">	
					<form action="login.php" method="post" accept-charset="utf-8" id="LoginSMART">
					<div class="dialog">
						<div class="topbar"><span class="logintext">NETMONITOR Login</span></div><br>
						<div class="imagebar"><img src="img/logo_san.png" />&nbsp;</div>
						<div class="content">
							<table><tr><td>
								<label for="login">Username</label>
							<td>
								<input id="login" type="text" value="" autofocus="true" required="required" title="Please enter the Username" name="username" tabindex="1" style="width: 200px;" name="login">
							<tr><td>
								<label for="password">Password</label>
							<td>
								<input id="password" type="password" value="" required="required" title="Please enter the Password" name="password" tabindex="2" style="width: 200px;" name="password">
							<tr>
							<td><a onclick="fp()">I forgot my password</a>
							<td><input type="checkbox" name="remember" id="rembeber" /><label for="remember" style="font-weight: normal">Remember me on this computer</label>
							</table>
						</div>
						<div class="dialog_buttons">
							<input id="btn_signin" class="button default" name="submit" type="submit" value="Sign In" tabindex="3" style="font-size:17px; float:left" />
						</div>
						<img src="img/LoginPage_LoginIcon.png" />
						<p><?php 
							if(@$_GET['r']=="notAllowed") echo "Your are not authorize to access this page. ";
							elseif(@$_GET['r']=="notGiven") echo "You need to fill in <b>Username</b> and <b>Password</b>!";
							elseif(@$_GET['r']=="notMatch") echo "The <b>Username</b> and <b>Password</b> you supplied does not match!";
							elseif(@$_GET['r']=="notActive") echo "Your account is not active!";
							elseif(@$_GET['r']=="fpChg") echo "An Email has been sent to you with new password!";
							elseif(@$_GET['r']=="fpNotFnd") echo "This Email ID does not exists!";
							elseif(@$_GET['r']=="registerUsernameTaken") echo "The Username you have chosen is already taken!";							
							elseif(@$_GET['r']=="registerEmailTaken") echo "The E-mail address is already registered!";
							elseif(@$_GET['r']=="registerSuccess") echo "Registered. Your account is active!";
						?></p>
					</div>
					</form>
				</td>
			</tr>
			<tr height="5%">
				<td class="layouvisible">
					&nbsp;
				</td>
				<td class="layouvisible">
					<div style="float: right;margin-right: 10px;visibility: hidden">
						<a class="aclass" href="javascript:popup('aboutTool.html')">About Tool</a> | 
      				 	<a class="aclass" href="javascript:popup('contactUs.html')">Contact Us</a>
      				 </div>
				</td>
			</tr>
		</table>
		<form autocomplete="off" action="login.php" method="post" accept-charset="utf-8" class="registerForm" id="forgetPwdForm" style="display: none;width: 440px">
			<table width="100%" height="100%" cellspacing="0">
				<thead>
					<tr>
						<th align="left">
							<img src="img/register.png" />&nbsp;Forgot Password
							<img style="cursor:pointer;float: right" onclick="window.location.reload()" src="img/close.png" />
						</th>
					</tr>
				</thead>
				<tr>
					<td>
						<p>Email </p>
						<input required="required" name="fpemail" id="fpemail" type="text" title="Please enter a valid Email-ID" pattern="\b[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}\b" />
					</td>
				</tr>
				<tr><td><br></td></tr>
				<tfoot>
					<tr align="center">
						<td>
							<input type="submit" name="fpsubmit" value="Submit"/>
						</td>
					</tr>
				</tfoot>
			</table>
		</form>
		<form autocomplete="off" id="registerFormMain" style="display: none;width: 440px;height: 490px;" action="login.php" method="post" accept-charset="utf-8">
			<table width="100%" height="100%" id="contenttable" style="opacity: 0.85">
				<tr>
					<td align="center">
						<span class="welcome" id="welcome" style="display: none;">
							welcome
						</span>
						<span class="registerForm" style="display: none;" id="registerForm">
							<table width="100%" height="100%" cellspacing="0">
								<thead>
									<tr>
										<th align="left">
											<img src="img/register.png" />&nbsp;Register
											<img style="cursor:pointer;float: right" onclick="window.location.reload()" src="img/close.png" />
										</th>
									</tr>
								</thead>
								<tr>
									<td>
										<p>Username *</p>
										<input name="registerUsername" id="registerUsername" required="required" type="text" pattern="\w{6,30}" title="Use only Alphabets, Numbers, _ and must be between 6 to 30 characters long!"/>
									</td>
								</tr>
								<tr>
									<td>
										<p>Password *</p>
										<input name="registerPassword" id="registerPassword" required="required" type="password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,30}" title="Password must contain one Capital letter, one small letter, one special Characters, one number and must be between 6 to 30 characters long!"/>
									</td>
								</tr>
								<tr>
									<td>
										<p>Confirm Password *</p>
										<input name="cpassword" required="required" id="cpassword" type="password" onfocusout="checkBothPasswords()" onblur="checkBothPasswords()"/>
									</td>
								</tr>
								<tr>
									<td>
										<p>Name *</p>
										<input name="registerName" required="required" type="text" pattern="[A-Za-z ]+" title="Use only Alphabets"/>
									</td>
								</tr>
								<tr>
									<td>
										<p>Email *</p>
										<input required="required" name="registerEmail" type="text" pattern="\b[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}\b" title="Please enter a valid Email-ID"/>
									</td>
								</tr>
								<tfoot>
									<tr align="center">
										<td>
											<input type="submit" name="registerSubmit" value="Register" />
										</td>
									</tr>
								</tfoot>
							</table>
						</span>
					</td>
				</tr>
			</table>
		</form>
	</body>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</html>
