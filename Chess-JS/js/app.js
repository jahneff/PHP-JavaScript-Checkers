var gameState;


function select(coords){
    var moveTo = document.getElementById("moveToCoords");
    var moveFrom = document.getElementById("moveFromCoords");
    var clicked = document.getElementById(coords);
    if(moveFrom.value == "null") {                      //MoveFrom has not been selected
            clicked.style.backgroundColor = "green";    //Select clicked square
            moveFrom.value = coords;                    //Update moveFrom form value
    }
    else {                                              //MoveFrom has been selected
        if(moveFrom.value == coords){                   //Clicked square is moveFrom
            clicked.style.backgroundColor = "white";    //deselect clicked square
            moveFrom.value = "null";                    //reset moveFrom form value
            document.getElementById(moveTo.value).style.backgroundColor = "white";      //deselect moveTo square
            moveTo.value = "null";                      //reset moveTo value
        }
        else if(moveTo.value == coords) {               //Clicked square is moveTo
            clicked.style.backgroundColor = "white";    //Deselect clicked square
            moveTo.value = "null";                      //reset moveTo value
        }
        else {
            if(moveTo.value != "null") {                //Clicked square is new
                document.getElementById(moveTo.value).style.backgroundColor = "white";  //deselect old moveTo square
            }
            clicked.style.backgroundColor = "orange";   //select new moveTo square
            moveTo.value = coords;                      //update moveTo form value
        }
    }
}


function updateBoard(gameState){
    var output = '';
    document.getElementById("turn").innerHTML = gameState["turn"];

    for (var property in gameState["black"]) {
        //alert("gamestate[black] " + property + ": " + gameState["black"][property] );
    }
    var i, j;
    //alert(gameState["board"][0][0]["type"]);
    //alert(gameState["board"][0][0]["id"]);
    for (i = 1; i <= 8; i++) {
        for (j = 1; j <= 8; j++) {
            //alert(i + "-" + j);
            document.getElementById(i + "-" + j).innerHTML = gameState["board"][(i-1)][(j-1)]["type"];  //deselect old moveTo square
            //document.getElementById(gameState["black"][property]).innerHTML = gameState[property];
        }
    }

}

function is_Legal_Move(from, to, gameState){
      //deselect old moveTo square
    var piece = gameState["board"][(from[0]-1)][(from[1]-1)];
    switch(piece["type"]){
        case "pawn":
            if(piece["color"] === "white"){
                alert("It's a white pawn");
            }
            else {
                alert("It's a black pawn");
            }
            return pawnMove(from, to, gameState, piece["color"]);
            break;
        case "w_pawn":
            alert("It's a white pawn");
            return pawnMove(from, to, gameState, "white");
            break;
        default:
            alert("Default branch of switch");
    }
}

function pawnMove(from, to, gameState, color){
    switch(color){
        case "black":
            break;
        case "white":
            break
    }
}

function arrayifyCoords(coords){
    return coords.split("-", 2);  //coords[0] == coords.y, coords[1] == coords.x
}

function turn() {
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            $.getJSON("../src/state.txt", function( json ) {
                gameState = json; //get updated game state
            })
                .done(function () {
                    alert("Turn Success");
                    updateBoard(gameState);
                })
                .fail(function (d, textStatus, error) {
                    alert("Turn Fail");
                    console.error("getJSON failed, status: " + textStatus + ", error: "+error)
                })
            ;
        }
    };
    var moveToCoords = arrayifyCoords(document.getElementById("moveToCoords").value);
    var moveFromCoords = arrayifyCoords(document.getElementById("moveFromCoords").value);
    is_Legal_Move(moveFromCoords, moveToCoords, gameState);
    var getString = "from=" + moveFromCoords[1] + ", " + moveFromCoords[0] + "&to=" + moveToCoords[1] + ", " + moveToCoords[0];
    alert(getString);

    xmlhttp.open("POST", "../src/alterstate.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(getString);

}

//triggers on load. Gets state from ../src/state
$( document ).ready(function() {
    $.getJSON("../src/state.txt", function( json ) {
        gameState = json;
        for (i = 1; i <= 8; i++) {
            for (j = 1; j <= 8; j++) {
                //populate board on load
                document.getElementById(i + "-" + j).innerHTML = gameState["board"][(i-1)][(j-1)]["type"];
            }
        }
        console.log( "JSON Data: " + json );
    })
        .done(function () {
            //alert("Gamestate fetched on load");
            console.log("Gamestate fetched on load");
        })
        .fail( function(d, textStatus, error) {
            alert("Get gamestate on load failed");
            console.error("getJSON failed, status: " + textStatus + ", error: "+error)
        })
        .always(function () {
        })
    ;
});