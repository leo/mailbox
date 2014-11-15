<?php
	
	/*
		Mailbox 4 - A contact-form for the new web.
		Made by Leonard Lamprecht - //github.com/leo/mailbox
	*/
	
	if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ) {
		
		foreach( $_POST as $key => $content ) {
			$args[$key] = filter_var( $_POST[$key], FILTER_SANITIZE_STRING );
		}
		
		$headers = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=iso-8859-1";
		$headers[] = "Return-Path: {$args['adress']}";
		$headers[] = "From: {$args['name']} <{$args['adress']}>";
		
		if( $args['cc'] !== null ) {
			$headers[] = "Cc: {$args['cc']}";
		}
		
		if( $args['bcc'] !== null ) {
			$headers[] = "Bcc: {$args['bcc']}";
		}
		
		if( mail( $args['to'], $args['subject'], $args['body'], implode( "\r\n", $headers ) ) ) {
			echo 1;
		} else {
			echo 0;
		}
		
		return;
	
	}

?>
