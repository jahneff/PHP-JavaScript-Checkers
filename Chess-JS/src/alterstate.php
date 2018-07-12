

<?php
include 'functions.php';
$json_decoded = pageLoad();
$json_decoded['turn'] = strval($json_decoded['turn'] + 1);
$json = json_encode($json_decoded);
$fp = fopen("state.txt", 'wa+');
fwrite($fp, $json);
fclose($fp);

?>