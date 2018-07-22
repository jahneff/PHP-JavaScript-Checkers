var board;
var game;
var emptyPiece = new Piece("none", "normal");

window.onload = function(){
    if(sessionStorage.getItem('gameObj') === null) {
        var game = {red: {pieceslost: 0}, black: {pieceslost: 0}, board:[]};
        for (i = 0; i < 99; i++) {
            game['board'][i] = new Piece("none", "normal");
        }
        for(i = 10; i < 36; i+=2){
            game['board'][i].red();
        }
        for(i = 56; i < 82; i+=2){
            game['board'][i].black();
        }
        sessionStorage.setItem('gameObj', JSON.stringify(game));
        alert("New board object stored in sessionStorage");
    }
    updateBoard();
    /*
    -----------------------------------------
    Only spaces 10-89, excluding multiples of 9, are in play.
     0      1  2  3  4  5  6  7  8

     9      10 11 12 13 14 15 16 17
    18      19 20 21 22 23 24 25 26
    27      28 29 30 31 32 33 34 35
    36      37 38 39 40 41 42 43 44
    45      46 47 48 49 50 51 52 53
    54      55 56 57 58 59 60 61 62
    63      64 65 66 67 68 69 70 71
    72      73 74 75 76 77 78 79 80
    81      82 83 84 85 86 87 88 89

    90      91 92 93 94 95 96 97 98
    -----------------------------------------
     */
};

function newGame(){
    sessionStorage.removeItem('gameObj');
    window.location("checkers.php");
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

function arrayifyCoords(coords){
    return coords.split("-", 2).reverse();  //coords[0] == coords.y, coords[1] == coords.x
}

function attemptMove(){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    var moveTo = arrayifyCoords(document.getElementById("moveToCoords").value);
    var moveFrom = arrayifyCoords(document.getElementById("moveFromCoords").value);
    // To(X,Y) == (moveTo[1],moveTo[0])
    // From(X,Y) == (moveFrom[1],moveFrom[0])
    var getString = "from:" + moveFrom[0] + ", to: " + moveTo[0];
    alert(getString);
    alert(game['board'][moveFrom[0]]['color']);
    var from = moveFrom[0];
    var to = moveTo[0];

    if(isLegalMove(from, to)){
        alert("Is legal move: true");
        Move(from, to);
        updateBoard();
    }
    else {
        alert("Is legal move: false");
    }
}

function Move(from, to){
    alert("yo");
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;
    var dist = from - to;
    if(Math.abs(dist) > 10){
        game['board'][(from - (dist/2))] = emptyPiece;
        deselect("sq-" + to);
        deselect("sq-" + from);
        select("sq-" + to);
    }
    else {
        alert("here");

        deselect("sq-" + to);
        alert("here");

        deselect("sq-" + from);

    }
    sessionStorage.setItem('gameObj', JSON.stringify(game));
}

function isLegalMove(from, to){
    var dist = from - to;
    switch(game['board'][from]['color']){
        case "red":
            if(game['board'][to]['color'] !== "none"){
                return false;
            }
            if ((dist === -8 || dist === -10)){
                //endTurn();
                return true;
            }
            var jumpedOver = from - (dist / 2);
            if ((dist === -16 || dist === -20) && game['board'][jumpedOver]['color'] === "black"){
                alert(game['black']['pieceslost']);
                game['black']['pieceslost'] = game['black']['pieceslost'] + 1;
                alert(game['black']['pieceslost']);
                return true;
            }
            return false;
        case "black":
            if(game['board'][to]['color'] !== "none"){
                return false;
            }
            if ((dist === 8 || dist === 10)){
                //endTurn();
                return true;
            }
            var jumpedOver = from - (dist / 2);
            if ((dist === 16 || dist === 20) && game['board'][jumpedOver]['color'] === "red"){
                alert(game['black']['pieceslost']);
                game['red']['pieceslost'] = game['red']['pieceslost'] + 1;
                alert(game['black']['pieceslost']);
                return true;
            }
                return false;
        default:
            alert(game['board'][to]['color']);
            return false;
    }
}

function Piece(color, type){
    this.color = color;
    this.type = type;
    Piece.prototype.red = function(){
        this.color = "red";
    };
    Piece.prototype.black = function(){
        this.color = "black";
    };
}

function updateBoard(){
    //board = JSON.parse(sessionStorage.getItem('boardObj'));
    game = JSON.parse(sessionStorage.getItem('gameObj'));

    //Instantiate pieces on board
    var i = 0;
    for (i = 10; i < 81; i++) {
        if((i % 9) != 0){
            //document.getElementById("sq-" + i).innerHTML = board[i]['color'];
            if(game['board'][i]['color'] !== "none") {
                document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-hockey-puck' style='color: " + game['board'][i]['color'] + ";'></i>";
            }
            else {
                document.getElementById("sq-" + i).innerHTML = " ";
            }
        }
    }

    //for debug board in top corner
    for (i = 10; i < 81; i++) {
        if((i % 9) != 0) {
            document.getElementById("tile" + i).innerHTML = i;
            document.getElementById("tile" + i).innerHTML = "<i class='fas fa-hockey-puck' style='color: " + game['board'][i]['color'] + ";'></i>";

        }
    }

    //update pieces lost display
    
    document.getElementById("red-pieces-lost").innerHTML = "Red pieces lost: " + game['red']['pieceslost'];
    document.getElementById("black-pieces-lost").innerHTML = "Black pieces lost: " + game['black']['pieceslost'];
}

$( document ).ready(function() {
    console.log(JSON.parse(game));
});
