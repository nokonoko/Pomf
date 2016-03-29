<?php
$waifus = 10;
$aWaifus = 0;
$images = array();

for ($i = 1; $i <= $waifus; $i++) {
	$images[] = '/img/'.$i.'.png';
}

for ($i = 1; $i <= $aWaifus; $i++) {
	$images[] = '/img/'.$i.'.gif';
}

if (headers_sent() === false) {
	header('Location: ' . $images[mt_rand(1, count($images))], true, 303);
}
?>
