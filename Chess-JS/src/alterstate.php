

<?php
include 'functions.php';
$json_decoded = pageLoad();
$json_decoded['turn'] = strval($json_decoded['turn'] + 1);
$json = json_encode($json_decoded);

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $fp = fopen("state.txt", 'wa+');
    $string = "{ \"name\": \"" . $name . "\"}";

    fwrite($fp, $json);
    fclose($fp);
}
?>