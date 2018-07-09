

<?php
if(isset($_POST['gameString'])){
    echo $_POST['gameString'];
    var_dump($_POST);
}
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $fp = fopen("state", 'wa+');
    $string = "{ \"name\": \"" . $name . "\"}";
    fwrite($fp, $string);
    fclose($fp);
}
?>