function turn(){
    var gameString = JSON.stringify(gameState);
    alert("Gamestring:" + gameString);
    $.post("../src/alterstate.php", gameString, function (data) {
    alert(data);
    });
}

for (var property in gameState) {
    output += property + ': ' + gameState[property]+'; ';
}

//move made case of select
turn();
document.getElementById(document.getElementById("moveToCoords").value).style.backgroundColor = "white";
document.getElementById(document.getElementById("moveFromCoords").value).style.backgroundColor = "white";
document.getElementById("moveToCoords").value = "null";
document.getElementById("moveFromCoords").value = "null";


function move(){
    var moveFromCoords = document.getElementById("moveFromCoords").value;
    alert("from" + moveFromCoords);
    var moveToCoords = document.getElementById("moveToCoords").value;
    alert("to" + moveToCoords);
}

function deselect(coords) {
    var moveTo = document.getElementById("moveToCoords");
    var moveFrom = document.getElementById("moveFromCoords");
    if (moveTo.value == coords){
        document.getElementById("moveToCoords").value = "null";
        document.getElementById(coords).style.backgroundColor = "white";
    }
    else if (moveFrom.value == coords){
        document.getElementById("moveFromCoords").value = "null";
        document.getElementById(coords).style.backgroundColor = "white";
    }
}

function moveIsJump (from, to) {
    //if a move has a distance > 10, it must be a jump. Returns boolean
    return (Math.abs(getDistance(from, to)) > 10)
}

function minimaxScenario1(){
    select(58);
    select(48);
    select(34);
    select(42);
    select(68);
    select(58);
    select(28);
    select(38);
    select(58);
    select(50);
    select(26);
    select(34);
}