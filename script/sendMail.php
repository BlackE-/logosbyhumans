<?php
	header('Content-Type: application/json');
	$email = $_POST['email'];
	$type = $_POST['type'];

	$returnValue = false; // NO error
	$message = 'Correo Enviado';
	$to = 'elizabeth@studio-sub.com';
	$subject = "MENSAJE CONTACTO";

	$headers =  "MIME-Version: 1.0" . "\r\n";
	$headers .=  "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= 'From: '.$email. "\r\n";

	$urlHeader = (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on')) ? 'https://' : 'http://';
	$urlHeader .= $_SERVER['HTTP_HOST'];

	$messageHTML = "<table style='border:0;'>
		            <tr>
		                <td style='border:0;'>MENSAJE DESDE FORMULARIO DE CONTACTO logosbyhumans.com</td>
		            </tr>";
	$messageHTML .="<tr>
	                <td style='border:0;'>Correo: ".$email."</td>
	            </tr>
	            <tr>
	                <td style='border:0;'>Origen: ".$type."</td>
	            </tr>
	        </table>";

	// if(!mail($to,$subject,$messageHTM,$headers)){
		// $returnValue = true; //ERROR
		// $message = 'CORREO NO ENVIADO';
	// }

	//JSON RETURN
	$json_return['return'] = $returnValue;
	$json_return['message'] = $message;
	echo json_encode($json_return);
?>