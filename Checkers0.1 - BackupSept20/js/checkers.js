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


function createNewGameObject(){
    var game = {red: {pieceslost: 0}, black: {pieceslost: 0}, board:[], tempboard:[], turn: 1, jumpsonly: 0, squaretomove: 0};
    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none");
    }
    for(i = 10; i < 36; i+=2){
        game['board'][i].red();
    }
    game['board'][18].color = "none"; //would be placed off the board, in the hidden column
    for(i = 56; i < 82; i+=2){
        game['board'][i].black();
    }
    game['board'][72].color = "none"; //would be placed off the board, in the hidden column

    sessionStorage.setItem('gameObj', JSON.stringify(game));
    alert("New board object stored in sessionStorage");
}

function createNewTestObject(){
    sessionStorage.removeItem('gameObj');

    var game = {red: {pieceslost: 0}, black: {pieceslost: 0}, board:[], tempboard:[], turn: 1, jumpsonly: 0, squaretomove: 0};
    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none");
    }


    game['board'][20].color = "red"; //would be placed off the board, in the hidden column
    game['board'][30].color = "red"; //would be placed off the board, in the hidden column
    game['board'][40].color = "red"; //would be placed off the board, in the hidden column
    game['board'][50].color = "red"; //would be placed off the board, in the hidden column
    game['board'][58].color = "red"; //would be placed off the board, in the hidden column

    game['board'][42].color = "black"; //would be placed off the board, in the hidden column
    game['board'][52].color = "black"; //would be placed off the board, in the hidden column
    game['board'][60].color = "black"; //would be placed off the board, in the hidden column
    game['board'][68].color = "black"; //would be placed off the board, in the hidden column
    game['board'][78].color = "black"; //would be placed off the board, in the hidden column

    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    alert("New board object stored in sessionStorage");
}



window.onload = function(){
    if(sessionStorage.getItem('gameObj') === null) {
        createNewGameObject();
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
    window.location.href = ("checkers.php");
}


function deselect() {
    var moveFrom = document.getElementById("moveFromCoords").value;
    if(moveFrom !== "null") {
        document.getElementById("sq-" + moveFrom).style.backgroundColor = "white";
        document.getElementById("moveFromCoords").value = "null";
    }
    var moveTo= document.getElementById("moveToCoords").value;
    if(moveTo !== "null") {
        document.getElementById("sq-" + moveTo).style.backgroundColor = "white";
        document.getElementById("moveFromCoords").value = "null";
    }
}

function selectHandle(squareId){
    var coords = arrayifyCoords(squareId);
    select(coords);
}

function selectAfterJump(squareId){
    selectHandle(squareId);
}

function select(coords){
    var moveTo = document.getElementById("moveToCoords");
    var moveFrom = document.getElementById("moveFromCoords");
    //alert(moveFrom.value + ", " + moveTo.value);
    if(moveFrom.value === "null") {//MoveFrom has not been selected
        moveFrom.value = coords;                    //Update moveFrom form value
        document.getElementById("sq-" + coords).style.backgroundColor = "orange";    //Select clicked square
    }

    else {                                          //MoveFrom already has a value. The user has now clicked on a square to move to.
        moveTo.value = coords;                      //update moveTo form value
        if(playerMove(moveFrom.value, moveTo.value)) {
            document.getElementById("sq-" + moveFrom.value).style.backgroundColor = "white";    //Deselect from square
            moveFrom.value = "null";
            moveTo.value = "null";
            //if (game['jumpsonly'] !== 0) {  //More jumps are available for moved piece
             //   alert("here:" + coords);
             //   select(coords); //Select clicked square
            //}
        }
        else {
            if (game['jumpsonly'] === 0) {
                document.getElementById("sq-" + moveFrom.value).style.backgroundColor = "white";    //Deselect from square
                moveFrom.value = "null";
                moveTo.value = "null";
            }
            else {
                moveTo.value = "null";
            }

        }

    }
}

function arrayifyCoords(coords){ //Takes sq-# as an argument and returns only #
    coords = coords.split("-", 2).reverse();
    return coords[0];
}

function separate(combo){
    var arr = combo.split("x", 3);
    return arr;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}


//This function is for real moves that advance the game when successfully completed.
function attemptMove(from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to) && isMoversTurn(from, game['turn'])){
        animateMove(from, to, realMove);
        //realMove(from, to);
        return true;
    }
    else {
        return false;
    }
}

//This function is for moves within miniMax, which do not advance the game.
function attemptMiniMaxMove(from, to, depth){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to) && isMoversTurn(from, depth)){
        animateMove(from, to, miniMaxMove);
        return true;
    }
    else {
        return false;
    }
}

function playerMove(from, to){
    if(attemptMove(from, to)){
        return true;
    }
    else {
        alert("player move from " + from + " to " + to + " failed");
        return false;
    }
}

function attemptMoveBack(from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(moveBack(from, to)){
        //animateMove(from, to, Move2);
        return true;
    }
    else {
        return false;
    }
}

function pieceHasJump(from){
    if (isLegalMove(from, parseFloat(from) - 16) ||
        isLegalMove(from, parseFloat(from) - 20) ||
        isLegalMove(from, parseFloat(from) + 16) ||
        isLegalMove(from, parseFloat(from) + 20)){
        return true;
    }
    return false;
}

function animateMove(from, to, callbackFunc) {
    var piece = document.getElementById("p-" + from);
    var pos = 0;
    var dist = from - to;
    var vert = 0;
    var hor = 0;
    if(dist < 0){
        vert = 1;
        if((dist % 10) === 0){
            hor = 1
        }
        else {
            hor = -1
        }
    }
    else {
        vert = -1;
        if((dist % 10) === 0){
            hor = -1
        }
        else {
            hor = 1
        }
    }

    if(Math.abs(dist) > 10){
        hor = hor * 2;
        vert = vert * 2;
    }

    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 50) {
            clearInterval(id);
            callbackFunc(from, to); //Move()
            //updateBoardHTML();
        } else {
            pos++;
            piece.style.color = "green";
            piece.style.left = 15 + (pos * hor) + "px";
            piece.style.top = 15 + (pos * vert) + "px";
        }
    }
}

function realMove(from, to){
    if((to >= 10 && to <= 17) && game['board'][from].color === "black"){
        game['board'][from].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][from].color === "red") {
        game['board'][from].king = "True";
    }

    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none");
    var dist = from - to;

    if(Math.abs(dist) > 11){
        var jumpedPieceColor = game['board'][(from - Math.floor(dist/2))].color;
        game[jumpedPieceColor]['pieceslost']++;
        game['board'][(from - Math.floor(dist/2))] = new Piece("none");  //remove jumped piece from board
        if(pieceHasJump(to)){
            game['jumpsonly'] = to;
            game['squaretomove'] = to;
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            continueTurn();
        }
        else {
            endTurn();
        }
    }
    else {
        endTurn();
    }
}

function miniMaxMove(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none");
    var dist = from - to;

    if(Math.abs(dist) > 11){
        game['board'][(from - Math.floor(dist/2))] = new Piece("none");  //remove jumped piece from board
        sessionStorage.setItem('gameObj', JSON.stringify(game));         //need this here to set up piecehasjump
        if(pieceHasJump(to)){
            game['jumpsonly'] = to;
            game['squaretomove'] = to;
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            return 3;
        }
        else {
            game['jumpsonly'] = 0;
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            return 2
        }
    }
    else {
        game['jumpsonly'] = 0;
        sessionStorage.setItem('gameObj', JSON.stringify(game));
        return 1;
    }
}

function moveBack(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none");
    var dist = from - to;
    if(Math.abs(dist) > 10){
            if(game['board'][to].color === "red"){ //was it the cpus turn?
                game['board'][(from - Math.floor(dist/2))].color = "black";
            }
            else if (game['board'][to].color === "black"){
                game['board'][(from - Math.floor(dist/2))].color = "red";
            }
            if(from === game['jumpsonly']){
                game['jumpsonly'] = 0;
            }
        sessionStorage.setItem('gameObj', JSON.stringify(game));

    }
    else {
        sessionStorage.setItem('gameObj', JSON.stringify(game));
    }
}

function isMoversTurn(from, turn){
    var movingPiece = game['board'][from];
    if(movingPiece.color === "red" && turn % 2 == 0){
        //alert("wrong color, it is black's move");
        return true;
    }
    else if(movingPiece.color === "black" && turn % 2 == 1){
        //alert("wrong color, it is red's move");
        return true;
    }
    return false;
}

function isLegalMove(from, to){
    var dist = from - to;
    if (to < 10 || to > 80 || ((to % 9) === 0)){ return false; } //is this move off the board
    if(game['board'][to]['color'] !== "none") { return false; }//is the space being moved to already occupied?
    if(Math.abs(dist) > 10 && (from - Math.floor(dist / 2)) % 9 === 0){ return false; } //is the move a jump that wraps around the board?


    var phase = game['jumpsonly'];

    var movingPiece = game['board'][from];
    var jumpedPiece = game['board'][(from - Math.floor(dist / 2))];

    if(movingPiece.king === "True"){
        var moves = [-8, -10, 8, 10];
        var jumps = [-16, -20, 16, 20];
        if (inArray(dist, moves)){
            return true;
        }
        else if (inArray(dist, jumps) &&
            ((movingPiece.color === "red" && jumpedPiece.color === "black") ||
                (movingPiece.color === "black" && jumpedPiece.color === "red"))) {
            return true;
        }
        else { return false; }
    }

    switch(movingPiece.color){
        case "red":
            var moves = [-8, -10];
            var jumps = [-16, -20];

            if (inArray(dist, moves)){
                return true;
            }
            else if (inArray(dist, jumps) && jumpedPiece.color === "black") {
                return true;
            }
            else { return false; }
        case "black":
            var moves = [8, 10];
            var jumps = [16, 20];

            if (inArray(dist, moves)){
                return true;
            }
            else if (inArray(dist, jumps) && jumpedPiece.color === "red") {
                return true;
            }
            else { return false; }
        default: //clicked square has no piece
            return false;
    }
}




function updateSquareHTML(square, i){
    if(square['color'] !== "none") {
        if(square['king'] === "True"){
            document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-chess-king' id='p-" + i + "' style='color: " + square['color'] + "; position: absolute;'></i>";
        }
        else {
            document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-hockey-puck' id='p-" + i + "' style='color: " + square['color'] + "; position: absolute; left: 15px; top: 15px;'></i>";
        }
    }
    else {
        document.getElementById("sq-" + i).innerHTML = " ";
    }
}

function endTurn(){
    game['turn']++;
    game['jumpsonly'] = 0;
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    if ((game['turn'] % 2 != 1)) {
        setTimeout(cpuTurn, 1000);
    }
}

function continueTurn(){
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    if ((game['turn'] % 2 != 1)) {

        alert("jumpsonly: " + game['jumpsonly']);
        alert("squaretomove: " + game['squaretomove']);

        setTimeout(cpuTurn, 1000);
    }
    else{
        select(game['jumpsonly']);
    }
}

function leavePhase() {
    endTurn();
    deselect();
    updateBoardHTML();
}




function runMiniMax() {
    //endTurn();
    var board = game['board'];
    console.log("Minimax recursion is about to start");
    bestmoveArray = miniMax(0, 0, 0, 0);
    console.log(bestmoveArray);
    return bestmoveArray;
}

function getScore(board) {

    var score = 0;
    for (i = 10; i < 81; i++) {
        if(board[i].color === "red") {
            score++;
        }
        else if (board[i].color === "black") {
            score = score - 1;
        }
    }

    return score;
}

function isLegalJumpsOnlyMove(jumpsonly, toMove, from, to){
    if(jumpsonly){
        if(toMove !== from){
            return false;
        }
        if(Math.abs(from - to) <= 10){
            return false;
        }
        return true;
    }
    return true;
}

function miniMax(depth, jumpsonly, from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    board = game['board'];
    if(depth === 2){
        var returnval = {score: 0, to: to, from: from, moveIsInitialized: false};
        returnval.score = getScore(board);
        return returnval;
    }

    var score = getScore(board);
    var tempval = {score: 0, to: [], from: [], moveIsInitialized: false};
    var returnval = {score: 0, to: [], from: [], moveIsInitialized: false};
    returnval.score = score;




    var moves = [8, 10, 16, 20, -8, -10, -16, -20];
    for (var i = 10; i <= 81; i++){

        for (var j = 0; j < 8; j++){
            var num = i + moves[j];
            var legalmove = isLegalMove(i, num);
            var moversturn = isMoversTurn(i, depth);

                if(isLegalMove(i, num) && isMoversTurn(i, depth) && isLegalJumpsOnlyMove(jumpsonly, to, i, num)){
                    if(depth === 0){
                        console.log("legal move from " + i + " to " + num + " at depth " + depth);
                    }
                    else {
                        console.log("   legal move from " + i + " to " + num + " at depth " + depth);
                    }
                    miniMaxMove(i, parseFloat(num));
                    if(pieceHasJump(num) && Math.abs(num - i) > 10){
                        var tempval = miniMax(depth, true, i, num);
                        tempval.from.push(i);
                        tempval.to.push(num);
                        num = i + moves[j];
                        moveBack(parseFloat(num), i);
                        if(isNewValue(returnval.score, tempval.score, depth) || returnval.moveIsInitialized === false){
                            console.log("       New return val: " + tempval.score + ", old val: " + returnval.score + ", with move: to: " + tempval.to + ", from : " + tempval.from + " at depth " + depth);
                            returnval.score = tempval.score; //set returnval.score = tempval.score
                            returnval.from = tempval.from;
                            returnval.to = tempval.to;
                            returnval.moveIsInitialized = "true";
                        }
                    }
                    else {
                        var tempval = miniMax(depth + 1, false, i, num);
                        num = i + moves[j];
                        moveBack(parseFloat(num), i);
                        if(isNewValue(returnval.score, tempval.score, depth) || returnval.moveIsInitialized === false){
                            console.log("       New return val: " + tempval.score + ", old val: " + returnval.score + ", with move: to: " + num + ", from : " + i + " at depth " + depth);
                            returnval.score = tempval.score; //set returnval.score = tempval.score
                            returnval.from = [i];
                            returnval.to = [num];
                            returnval.moveIsInitialized = "true";
                        }
                    }
                }
        }
        if(i === 81){
            console.log("Returnval: " + returnval.score + " with move from " + returnval.from + " to " + returnval.to + " at depth " + depth);
            return returnval;
        }
    }
}

function isNewValue(oldval, newval, depth){
    if(depth % 2 === 0 && oldval < newval){
        return true;
    }
    else if(depth % 2 === 1 && oldval > newval){
        return true;
    }
    else {
        return false;
    }
}

function merciless(){
    for (i = 10; i < 81; i++) {
        if(game['board'][i].color === "red") {
            if(i < 63) { //prevents off-board jump attempt for cpu pieces on the first rank
                if (attemptMove(i, (parseFloat(i) + 16))) {
                    return true;
                }
                else if (attemptMove(i, (parseFloat(i) + 20))) {
                    return true;
                }
            }
            if(game['board'][i].king === "True") {
                if (attemptMove(i, (parseFloat(i) - 16))) {
                    return true;
                }
                else if (attemptMove(i, (parseFloat(i) - 20))) {
                    return true;
                }
            }
        }
    }
    for (j = 10; j < 81; j++) {
        if(game['board'][j].color === "red") {
            if (attemptMove(j, (parseFloat(j) + 8))){
                return true;
            }
            else if (attemptMove(j, (parseFloat(j) + 10))){
                return true;
            }
        }
        if(game['board'][i].king === "True") {
            if (attemptMove(i, (parseFloat(i) - 8))) {
                return true;
            }
            else if (attemptMove(i, (parseFloat(i) - 10))) {
                return true;
            }
        }
    }
    return false;
}

function cpuMove(from, to){
    alert("CPUmove from: " + from + " to " + to);
    if(attemptMove(from, to)){
        return true;
    }
    return false;
}

function cpuTurn(){

    //"Merciless" AI jumps as many times as it can. If no jumps are available, it plays a regular move.
    var bestmove;
    bestmove = runMiniMax();
    var size = bestmoveArray.from.length;
    var pos = 0;
    var k = size - 1;
    function frame() {
        if(pos === (size * 5) || k < 0) {
            clearInterval(id);
        }
        else if (pos % 5 === 0) {
            if(!cpuMove(bestmoveArray.from[k], bestmoveArray.to[k])) { //Move()
                alert("Move Failed");
            }
            k--;
        }
        pos++;

    }
    var id = setInterval(frame, 100);
    /*for (var i = (size - 1); i >= 0; i--){
        if(!cpuMove(bestmoveArray.from[i], bestmoveArray.to[i])){
            alert("Move failed");
            return false;
        }

    }*/
    if(bestmove.from.length === 0){
        alert("Move failed2");
        return false;
    }
    return true;
}

function updateBoardHTML(){
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
        document.getElementById("tile" + 18).innerHTML = 18;
        document.getElementById("tile" + 72).innerHTML = 72;

    }

    //update pieces lost display

    document.getElementById("red-pieces-lost").innerHTML = "Red pieces lost: " + game['red']['pieceslost'];
    document.getElementById("black-pieces-lost").innerHTML = "Black pieces lost: " + game['black']['pieceslost'];
    document.getElementById("current-turn").innerHTML = "Turn " + game['turn'];
    if(game['turn'] % 2 == 1){
        document.getElementById("team-to-move").innerHTML = "Team to move: black";
    }
    else {
        document.getElementById("team-to-move").innerHTML = "Team to move: red";
    }
    document.getElementById("jumps-only").innerHTML = "Turnphase " + game['jumpsonly'];
}

$( document ).ready(function() {
    //console.log(JSON.parse(sessionStorage.getItem('gameObj')));
});
