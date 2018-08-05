var board;
var game;
var emptyPiece = new Piece("none");

function Piece(color) {
    this.color = color;
    this.king = "false";
    Piece.prototype.red = function () {
        this.color = "red";
    };
    Piece.prototype.black = function () {
        this.color = "black";
    };
}

function Player(color, first) {
    this.color = color;
    this.takeFirstTurn = first;
}

window.onload = function(){
    if(sessionStorage.getItem('gameObj') === null) {
        var game = {red: {pieceslost: 0}, black: {pieceslost: 0}, board:[], turn: 1, jumpsonly: 0};
        for (i = 0; i < 99; i++) {
            game['board'][i] = new Piece("none");
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
    updateBoardHTML();
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

function cpuAttemptMove(from, to){

}

function selectHTML(coords){

}

function deselect() {
    var moveFrom = document.getElementById("moveFromCoords").value;
    if(moveFrom !== "null") {
        document.getElementById("sq-" + moveFrom).style.backgroundColor = "white";
        document.getElementById("moveFromCoords").value = "null";
    }
}

function select(coords){
    //selectHTML(coords);
    coords = arrayifyCoords(coords);
    var moveTo = document.getElementById("moveToCoords");
    var moveFrom = document.getElementById("moveFromCoords");

    if(moveFrom.value === "null") {//MoveFrom has not been selected
        moveFrom.value = coords;                    //Update moveFrom form value
        document.getElementById("sq-" + coords).style.backgroundColor = "orange";    //Select clicked square
    }
    else {//MoveFrom already has a value. The user has now clicked on a square to move to.
        moveTo.value = coords;                      //update moveTo form value
        var fromSquare = document.getElementById("sq-" + moveFrom.value);
        var toSquare = document.getElementById("sq-" + moveTo.value);
        if(attemptMove(moveFrom.value, moveTo.value)) {
                fromSquare.style.backgroundColor = "white";    //Select clicked square
                moveTo.value = "null";
                if (game['jumpsonly'] == 1) {
                    toSquare.style.backgroundColor = "orange";    //Select clicked square
                    moveFrom.value = coords;
                }
                else {
                    moveFrom.value = "null";
                }
            }
            else {
                if (coords == moveFrom.value && game['jumpsonly'] == 0) {
                    fromSquare.style.backgroundColor = "white";
                    moveFrom.value = "null";
                    moveTo.value = "null";
                }
            }
    }
}

function arrayifyCoords(coords){
    coords = coords.split("-", 2).reverse();  //coords[0] == coords.y, coords[1] == coords.x
    return coords[0];
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

function attemptMove(from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to)){
        Move(from, to);
        updateBoardHTML();
        return true;
    }
    else {
        alert("Not a legal move");
        return false;
    }
}

function pieceHasJump(from){
    if (isLegalMove(from, from - parseFloat(16)) ||
        isLegalMove(from, from - parseFloat(20)) ||
        isLegalMove(from, parseFloat(from) + parseFloat(16)) ||
        isLegalMove(from, parseFloat(from) + parseFloat(20))){
        return true;
    }
    return false;
}

function Move(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;
    var dist = from - to;
    if(Math.abs(dist) > 10){
        game['board'][(from - Math.floor(dist/2))] = emptyPiece;  //remove jumped piece from board
    }
    if(pieceHasJump(to)){
        game['jumpsonly'] = 1;
    }
    else {
        endTurn();
    }
    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        game['board'][to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        game['board'][to].king = "True";
    }
    sessionStorage.setItem('gameObj', JSON.stringify(game));
}


function isLegalMove(from, to){
    if(game['board'][to]['color'] !== "none") { //is the space being moved to already occupied?
        return false;
    }
    var phase = game['jumpsonly'];
    var dist = from - to;
    var movingPiece = game['board'][from];
    var jumpedPiece = game['board'][(from - Math.floor(dist / 2))];
    var redMoves = [-8, -10];
    var redJumps = [-16, -20];
    var blackMoves = [8, 10];
    var blackJumps = [16, 20];
    var kingMoves = redMoves.concat(blackMoves);
    var kingJumps= redJumps.concat(blackJumps);
    switch(movingPiece.color){
        case "red":
            if(game['turn'] % 2 !== 0){
                alert("wrong color, it is black's move");
                return false;
            }
            var moves;
            if (movingPiece.king === "True") {
                moves = kingMoves;
                jumps = kingJumps;
            }
            else {
                moves = redMoves;
                jumps = redJumps;
            }

            if (inArray(dist, moves) && phase == 0){
                return true;
            }
            else if (inArray(dist, jumps) && jumpedPiece.color === "black") {
                    game['black']['pieceslost']++;
                    return true;
            }
            return false;
        case "black":
            if(game['turn'] % 2 !== 1){
                alert("wrong color, it is red's move");
                return false;
            }
            var moves;
            if (movingPiece.king === "True") {
                moves = kingMoves;
                jumps = kingJumps;
            }
            else {
                moves = blackMoves;
                jumps = blackJumps;
            }

            if (inArray(dist, moves) && phase == 0){
                return true;
            }
            else if (inArray(dist, jumps) && jumpedPiece.color === "red") {
                game['red']['pieceslost']++;
                return true;
            }
            return false;
        default: //clicked square has no piece
            return false;
    }
}

function updateSquareHTML(square, i){
    if(square['color'] !== "none") {
        if(square['king'] === "True"){
            document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-chess-king' style='color: " + square['color'] + ";'></i>";
        }
        else {
            document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-hockey-puck' style='color: " + square['color'] + ";'></i>";
        }
    }
    else {
        document.getElementById("sq-" + i).innerHTML = " ";
    }
}

function endTurn(){
    game['turn']++;
    game['jumpsonly'] = 0;
}

function leavePhase() {
    endTurn();
    deselect();
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
}

function updateBoardHTML(){
    //board = JSON.parse(sessionStorage.getItem('boardObj'));
    game = JSON.parse(sessionStorage.getItem('gameObj'));

    //Instantiate pieces on board
    var i = 0;
    for (i = 10; i < 81; i++) {
        if((i % 9) !== 0){
            updateSquareHTML(game['board'][i], i);
        }
    }
    //debug board in top corner
    for (i = 10; i < 81; i++) {
        if((i % 9) !== 0) {
            document.getElementById("tile" + i).innerHTML = i;
            //document.getElementById("tile" + i).innerHTML = "<i class='fas fa-hockey-puck' style='color: " + game['board'][i]['color'] + ";'></i>";
        }
    }

    //update pieces lost display

    document.getElementById("red-pieces-lost").innerHTML = "Red pieces lost: " + game['red']['pieceslost'];
    document.getElementById("black-pieces-lost").innerHTML = "Black pieces lost: " + game['black']['pieceslost'];
    document.getElementById("current-turn").innerHTML = "Turn " + game['turn'];
    document.getElementById("current-turn-phase").innerHTML = "Turnphase " + game['jumpsonly'];

}

$( document ).ready(function() {
    console.log(JSON.parse(game));
});
