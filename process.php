<?php
	
	session_start();

	$limit = 5;
	$result = [ 'limit' => false ];

	class Visitor{
		private $ip;
		private $topics;

		public function __construct(){
			$this->ip = $_SERVER['REMOTE_ADDR'];
		}
	}

	class Item{
		private $topic;
		private $word;

		public function __construct($topic, $word){
			$this->topic= topic;
			$this->word = word;
		}
	}
	/* Guarda IP para que no posteen más de una palabra por hora */
	/*if( isset($_SESSION["visitors"]) ){
		if( !in_array($_SERVER['REMOTE_ADDR'], $_SESSION["visitors"]) ){
			$_SESSION["visitors"][] = array( $_SERVER['REMOTE_ADDR'] => time() );
		}else{

		}
	}*/

	/* Guarda las últimas 500 palabras enviadas. Superado ese número borra el array.  */
	if( isset($_SESSION["names"]) ){
		if( $_POST['word'] === "---delete---" ){
			$_SESSION["names"] = [];
		}else if( count($_SESSION["names"]) == $limit ){
			$result['limit'] = true;
			unset($_SESSION["names"][0]);
			$_SESSION["names"] = array_values($_SESSION["names"]);
			array_push($_SESSION["names"], $_POST["word"]);
		}else if( count($_SESSION["names"]) > $limit ){
			$_SESSION["names"] = [];
			$_SESSION["names"][] = $_POST['word'];
		}else{
			array_push($_SESSION["names"], $_POST['word']);
		}
	}else{
		$_SESSION["names"][] = $_POST['word'];
	}

	$result['names'] = $_SESSION["names"];

	echo json_encode($result);
	//echo json_encode($_POST['topic']);

?>