<?php

	/*
		Mailbox 3 - Replacing mailto-links with contact-forms.
		Copyright by Leonard Lamprecht - //github.com/leo/mailbox
		License: http://git.io/c9_RLA
	*/


	if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
	
		$to = filter_var($_POST['to'], FILTER_SANITIZE_STRING);
			
		$cc = filter_var($_POST['cc'], FILTER_SANITIZE_STRING);
		$bcc = filter_var($_POST['bcc'], FILTER_SANITIZE_STRING);
	
		$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
		$address = filter_var($_POST['address'], FILTER_SANITIZE_STRING);
		$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
		$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

		$sent = email($to, $cc, $bcc, $name, $address, $subject, $message);
		
		if ($sent) {
			echo 'success';
		} else {
			echo 'error';
		}

		return;
	}

	function email($to, $cc, $bcc, $from_name, $from_email, $subject, $message){

		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=iso-8859-1";
		$headers[] = "From: {$from_name} <{$from_email}>";
		if ($cc !== 'false') {
			$headers[] = "Cc: {$cc}";
		}
		if ($bcc !== 'false') {
			$headers[] = "Bcc: {$bcc}";
		}
		$headers[] = "Subject: {$subject}";

	
		if( mail($to, $subject, $message, implode("\r\n", $headers)) ) return true; 
	}

?>
