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

function select(coords){
    selectHTML(coords);
    var moveTo = document.getElementById("moveToCoords");
    var moveFrom = document.getElementById("moveFromCoords");

    var clickedSquare = document.getElementById(coords);
    var toSquare = document.getElementById(moveTo.value);

    if(moveFrom.value == "null") {                      //MoveFrom has not been selected
        clickedSquare.style.backgroundColor = "green";    //Select clicked square
        moveFrom.value = coords;                    //Update moveFrom form value
    }
    else {                                              //MoveFrom has been selected
        if(moveFrom.value == coords){                   //Clicked square is moveFrom
            clickedSquare.style.backgroundColor = "white";    //deselect clicked square
            moveFrom.value = "null";                    //reset moveFrom form value
            toSquare.style.backgroundColor = "white";      //deselect moveTo square
            moveTo.value = "null";                      //reset moveTo value
        }
        else if(moveTo.value == coords) {               //Clicked square is moveTo
            clickedSquare.style.backgroundColor = "white";    //Deselect clicked square
            moveTo.value = "null";                      //reset moveTo value
        }
        else {
            if(moveTo.value != "null") {                //Clicked square is new
                toSquare.style.backgroundColor = "white";  //deselect old moveTo square
            }
            clickedSquare.style.backgroundColor = "orange";   //select new moveTo square
            moveTo.value = coords;                      //update moveTo form value
        }
    }
}