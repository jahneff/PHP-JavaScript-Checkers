

<?php
include 'functions.php';
$json_decoded = pageLoad(); //get game state as associative array
$json_decoded['turn'] = strval($json_decoded['turn'] + 1);
$json = json_encode($json_decoded);
//$fp = fopen("state-temp.txt", 'wa+');
$fp = fopen("state.txt", 'wa+');

fwrite($fp, $json);
fclose($fp);

?>