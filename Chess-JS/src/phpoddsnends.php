<?php
//open and read from file
$state = fopen("state", "r") or die("Unable to open file!");
$json = fread($state, filesize("state"));
fclose($state);
echo "State: " . $json;
return json_decode($json, true);

?>