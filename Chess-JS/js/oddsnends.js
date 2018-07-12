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