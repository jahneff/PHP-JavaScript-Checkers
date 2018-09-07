<!DOCTYPE html>

<html lang="en" data-framework="intercoolerjs" xmlns="http://www.w3.org/1999/html">


<head>
    <meta charset="utf-8">
    <title>Checkers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">

    <script src="../js/jquery-2.2.4.min.js"></script>
    <script src="../js/checkers.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
    <nav class="navbar  navbar-dark bg-primary sticky-top" style="margin-bottom: 0px; background-color: #5cb85c;">
        <a class="navbar-brand" href="#" style="color: white;"><b>Checkers</b></a>
        <div class="gs2-button" style="float:right; margin-right: 10px;">
            <a class="btn btn-primary" href="parameters.php?" role="button" style="background-color:#5cb85c; border-color: #ffffff; margin: 5% auto; font-size: 125%;"><b>Settings</b></a>
        </div>
    </nav>
</head>

<body>
<a href="home.php">Home</a>
<div class="container">
    <div class="row">
        <div class="col-md-2">
            <div class="infobox" id="infobox" style="border: 1px solid black">
                <div id="name">
                    Name goes here
                </div>
                <div id="turn">
                    Turn goes here
                </div>
            </div>
            <div class="boardwrapper-mini" style="margin-bottom: 2%";>
                <table class="board" style="color:#c7ddef; width:100%; height:100%;">
                    <?php
                    for ($index = 0; $index <= 98; $index++){
                        if(($index % 9) == 0){
                            echo "<tr>";
                            echo "<td id='tile" . $index . "' class='boardsquare' onclick='select(this.id)'></td>";
                            $end = $index + 8;
                        }
                        else {
                            echo "<td id='tile" . $index . "' class='boardsquare' onclick=''></td>";
                            if (($index % 8) == $end) {
                                echo "</tr>";
                            }
                        }
                    }
                    ?>
                </table>
            </div>
        </div>
        <div class="col-md-8">
            <div class="boardwrapper" style="background-color: white; margin: 10px auto;">
                <table class="board" style="width:90%; height:90%; margin: 5% auto;">
                    <?php
                    for ($index = 9; $index <= 80; $index++){
                        if(($index % 9) == 0){
                            echo "<tr>";
                            $end = $index + 8;
                        }
                        else {
                            echo "<td id='sq-" . $index . "' class='boardsquare' onclick='selectHandle(this.id)'></td>";
                            if (($index % 8) == 80) {
                                echo "</tr>";
                            }
                        }
                    }
                    ?>
                </table>

            </div>
            <div class="playerdata" id="playerdata" >
                Player data:
                <br>
                <div id="black-pieces-lost"></div>
            </div>
            <div class="playerdata" id="cpudata">
                CPU data:
                <br>
                <div id="red-pieces-lost"></div>
            </div>
            <div class="playerdata" id="gamedata">
                Game data:
                <br>
                <div id="current-turn"></div>
                <div id="team-to-move"></div>
                <div id="jumps-only"></div>
            </div>
            <form id="movedata">
                <input type="text" id="moveFromCoords" value="null"/>
                <input type="text" id="moveToCoords" value="null"/>
                <input type="button" onclick="newGame()" value="New game" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="leavePhase()" value="End Turn" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="cpuTurn()" value="CPUturn" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="runMiniMax()" value="Run Minimax" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="minimaxScenario1()" value="Minimax scenario 1" style="border: 1px solid black; height: 20px; width: 100px;"/>



            </form>
            <div id="i-at-0">0</div>
            <div id="i-at-1">0</div>
            <div id="i-at-2">0</div>
            <div id="i-at-3">0</div>


            <h2 style="color:white;">If turn is odd, it is blacks move. If it is even, it is white's move.</h2>
        </div>
        <div class="col-md-2">
            allo
        </div>
    </div>
</div>

</body>
</html>