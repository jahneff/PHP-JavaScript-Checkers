<!DOCTYPE html>

<html lang="en" data-framework="intercoolerjs" xmlns="http://www.w3.org/1999/html">

<?php
    function pageLoad(){
        $state = fopen("state", "r") or die("Unable to open file!");
        $json = fread($state, filesize("state"));
        echo "State: " . $json;
        $decoded = json_decode($json, true);
        var_dump($decoded);
        fclose($state);
    }
    pageLoad();

?>

    <head>
        <meta charset="utf-8">
        <title>Chess</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="../css/styles.css">
        <script src="../js/jquery-2.2.4.min.js"></script>
        <script src="../js/app.js"></script>
    </head>

    <body>

        <div class="boardwrapper">
                <table class="board" style="width:100%; height:100%;">
                    <?php
                    for ($row = 1; $row <= 8; $row++){
                        echo "<tr id='row" . $row . "'>";
                        for ($col = 1; $col <= 8; $col++){
                            echo "<td id='" . $row . "-" . $col . "' class='boardsquare' onclick='select(this.id)'></td>";
                        }
                        echo "</tr>";
                    }
                    ?>
                </table>
            <div class="infobox" id="infobox">

            </div>
            <div onclick="turn()" style="border: 1px solid black; height: 100px; width: 100px;">
                Next Turn
            </div>
        </div>
    </body>
</html>