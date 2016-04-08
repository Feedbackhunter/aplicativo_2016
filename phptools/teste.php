<?php

	include_once('bd.php');
	$bd = new bd();
	$bd->connect();
	if ($bd->insertAnswers(1,0)){
		header("agradecimento.html");
	}
	else header("fail.html");



?>