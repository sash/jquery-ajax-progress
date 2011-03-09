<?php
/**
 * Sends data to the handling ajax progress handler
 */
function yield($data){
		static $sep;
		if ($_SERVER['HTTP_X_REQUESTED_WITH']!=='XMLHttpRequest'){
			throw new exception('Yielding result only works with XHR!');
		}
		else{
			if (!$sep){
				do{
					$sep = '---'.uniqid();
					echo $sep."\n";
				}while (strpos($data, $sep) !== false);
			}
			@ob_end_flush();
			fflush(fopen('php://stdout', 'r'));
			flush();
			echo $data."\n".$sep."\n";
			@ob_end_flush();
			fflush(fopen('php://stdout', 'r'));
			flush();
		}
}