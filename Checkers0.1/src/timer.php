<!DOCTYPE html>

<html lang="en" data-framework="intercoolerjs" xmlns="http://www.w3.org/1999/html">

<?php
    function printBoard8x8(){
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
    }
?>

<head>
    <meta charset="utf-8">
    <title>Checkers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">

    <script src="../js/jquery-2.2.4.min.js"></script>
    <script src="../js/timer.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
    <nav class="navbar navbar-dark bg-primary fixed-top sidebarNavigation" data style="margin-bottom: 0px; background-color: #3d9970;">
        <a class="navbar-brand" href="home.php"><b>Jack Neff</b></a>
        <a class="navbar-brand" href="checkers.php" ><b>Checkers</b></a>

        <div class="gs2-button" style="float:right; margin-right: 10px;">
            <a class="btn btn-primary" href="parameters.php?" role="button" style="background-color:#5cb85c; border-color: #ffffff; margin: 5% auto; font-size: 125%;"><b>Settings</b></a>
        </div>
    </nav>
</head>

<body>
<div class="container-fluid">
    <div class="row-fluid">
        <div class="col-md-2">
            <div class="sidebar-nav-fixed" data-spy="affix" data-offset-top="140">
                <ul class="nav nav-list">
                    <li><a class="sidebaritem" href="home.php">Home</a></li>
                    <li><a class="sidebaritem"  href="#">Responsive</a></li>
                    <li><a class="sidebaritem"  href="#">Layouts</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Bootstrap</a></li>
                    <li><a href="#">Resources</a></li>
                    <li><a href="#">Modal</a></li>
                    <li><a href="#">Carousel</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Typeahead</a></li>
                    <li><a href="#">Themes</a></li>
                    <li><a href="#">Template</a></li>
                    <li><a href="#">Affix</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Bootstrap 3</a></li>
                    <li><a href="#">Sidebar</a></li>
                    <li><a href="#">Grid</a></li>
                    <li><a href="#">Column</a></li>
                </ul>
            </div>
            <div class="infobox" id="infobox" style="border: 1px solid black">
                <div id="name">
                    Name goes here
                </div>
                <div id="turn">
                    Turn goes here
                </div>
            </div>

        </div>
        <div class="col-md-8">
            <div class="boardwrapper">
                <table class="board">
                    <?php
                    printBoard8x8();
                    ?>
                </table>

            </div>
            <div class="timerwrapper" style ="background-color: darkslategray; padding: 5px; width: 50px;">
                <div id="timer1">
                    0:00
                </div>
                <div id="timer2">
                    0:00
                </div>
            </div>
            <form id="movedata" style="color: #2e6da4">
                <input type="text" id="moveFromCoords" value="null"/>
                <input type="text" id="moveToCoords" value="null"/>
                <input type="button" onclick="newGame()" value="New game" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="leavePhase()" value="End Turn" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="cpuTurn()" value="CPUturn" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="runMiniMax()" value="Run Minimax" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="minimaxScenario1()" value="Minimax scenario 1" style="border: 1px solid black; height: 20px; width: 100px;"/>
                <input type="button" onclick="createNewTestObject()" value="Testboard" style="border: 1px solid black; height: 20px; width: 100px;"/>

            </form>
            <input type="button" onclick="timer(10)" value="START TIMERS" style="border: 1px solid black; height: 20px; width: 100px;"/>

        </div>
        <div class="col-md-2">
        </div>
    </div>
</div>

</body>
</html>