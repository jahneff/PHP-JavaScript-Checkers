function turn(){
    var gameString = JSON.stringify(gameState);
    alert("Gamestring:" + gameString);
    $.post("../src/alterstate.php", gameString, function (data) {
    alert(data);
    });
}
