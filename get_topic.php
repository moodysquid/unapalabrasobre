<?php
	session_start();

	$topics = ['Macri', 'Aborto Legal', 'Papa Francisco'];
	
	$max = count($topics) - 1;
	$num = rand(0, $max);

	echo json_encode($topics[$num]);

?>