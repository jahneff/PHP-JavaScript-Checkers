<!DOCTYPE html>

<html lang="en" data-framework="intercoolerjs" xmlns="http://www.w3.org/1999/html">


<head>
    <meta charset="utf-8">
    <title>Checkers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <script src="../js/jquery-2.2.4.min.js"></script>
    <script src="../js/checkers.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>

</head>

<body>
<div class="infobox" id="infobox">
    <div id="name">
        Name goes here
    </div>
    <div id="turn">
        Turn goes here
    </div>
</div>

<div class="boardwrapper-mini" style="margin-bottom: 2%";>
    <table class="board" style="width:100%; height:100%;">
        <?php
        for ($index = 0; $index <= 98; $index++){
            if(($index % 9) == 0){
                echo "<tr>";
                echo "<td id='tile" . $index . "' class='boardsquare' onclick='select(this.id)'>";
                echo "</td>";
                $end = $index + 8;
            }
            else {
                echo "<td id='tile" . $index . "' class='boardsquare' onclick='select(this.id)'></td>";
                if (($index % 8) == $end) {
                    echo "</tr>";
                }
            }
        }
        ?>
    </table>
</div>
<div class="boardwrapper">
<table class="board" style="width:100%; height:100%;">
        <?php
        for ($index = 9; $index <= 80; $index++){
            if(($index % 9) == 0){
                echo "<tr>";
                $end = $index + 8;
            }
            else {
                echo "<td id='sq-" . $index . "' class='boardsquare' onclick='select(this.id)'></td>";
                if (($index % 8) == $end) {
                    echo "</tr>";
                }
            }
        }
        ?>
    </table>
    <form id="movedata">
        <div id="red-pieces-lost">yo</div>
        <div id="black-pieces-lost">hi</div>

        <input type="hidden" id="moveFromCoords" value="null"/>
        <input type="hidden" id="moveToCoords" value="null"/>
        <input type="button" onclick="attemptMove()" value="Next Turn" style="border: 1px solid black; height: 20px; width: 100px;"/>
        <input type="button" onclick="newGame()" value="New game" style="border: 1px solid black; height: 20px; width: 100px;"/>

    </form>
</div>
</body>
</html>