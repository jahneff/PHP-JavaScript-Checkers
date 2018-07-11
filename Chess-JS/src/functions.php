<?php
function pageLoad(){
if (file_exists("state.txt") && filesize("state.txt") > 0) {
    echo "File state.txt exists";
    $fp = fopen("state.txt", 'r');
    $json = fread($fp, filesize("state.txt"));
    fclose($fp);
    return json_decode($json, true);
}
else {
    echo "File state.txt does not exist, creating...";
    $fp = fopen("state.txt", 'wa+');
    $json = "{ \"name\": \"Jimmy\", \"turn\": \"1\"}";
    fwrite($fp, $json);
    fclose($fp);
    return json_decode($json, true);
    }
}
?>