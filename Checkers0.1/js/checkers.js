var board;
var game;
var emptyPiece = new Piece("none", "False");

function Piece(color, king) {
    this.color = color;
    this.king = king;
    Piece.prototype.red = function () {
        this.color = "red";
    };
    Piece.prototype.black = function () {
        this.color = "black";
    };
}


function createNewGameObject(){
    var game = {
        red: {
            pieceslost: 0,
            winner: false
        },
        black: {
            pieceslost: 0,
            winner: false
        },
        board:[],
        tempboard:[],
        turn: 1,
        jumpsonly: 0,
        selected: null,
        mustJump: null,
        hasJump: false
    };
    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none", "False");
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

    var game = {
        red: {
            pieceslost: 0,
            winner: false
        },
        black: {
            pieceslost: 0,
            winner: false
        },
        board:[],
        tempboard:[],
        turn: 1,
        jumpsonly: 0,
        selected: null,
        mustJump: null,
        hasJump: false
    };
    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none", "False");
    }


    game['board'][20].color = "red"; //would be placed off the board, in the hidden column
    game['board'][30].color = "red"; //would be placed off the board, in the hidden column
    game['board'][34].color = "red"; //would be placed off the board, in the hidden column
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

function createNewTestObject2(){
    sessionStorage.removeItem('gameObj');

    var game = {
        red: {
            pieceslost: 0,
            winner: false
        },
        black: {
            pieceslost: 0,
            winner: false
        },
        board:[],
        tempboard:[],
        turn: 1,
        jumpsonly: 0,
        selected: null,
        mustJump: null,
        hasJump: false
    };

    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none", "False");
    }


    game['board'][16].color = "red"; //would be placed off the board, in the hidden column
    game['board'][20].color = "red"; //would be placed off the board, in the hidden column
    game['board'][22].color = "red"; //would be placed off the board, in the hidden column
    game['board'][24].color = "red"; //would be placed off the board, in the hidden column
    game['board'][26].color = "red"; //would be placed off the board, in the hidden column
    game['board'][28].color = "red"; //would be placed off the board, in the hidden column
    game['board'][30].color = "red"; //would be placed off the board, in the hidden column
    game['board'][32].color = "red"; //would be placed off the board, in the hidden column
    game['board'][34].color = "red"; //would be placed off the board, in the hidden column
    game['board'][38].color = "red"; //would be placed off the board, in the hidden column
    game['board'][42].color = "red"; //would be placed off the board, in the hidden column

    game['board'][40].color = "black"; //would be placed off the board, in the hidden column
    game['board'][44].color = "black"; //would be placed off the board, in the hidden column
    game['board'][46].color = "black"; //would be placed off the board, in the hidden column
    game['board'][48].color = "black"; //would be placed off the board, in the hidden column

    game['board'][50].color = "black"; //would be placed off the board, in the hidden column
    game['board'][52].color = "black"; //would be placed off the board, in the hidden column
    game['board'][56].color = "black"; //would be placed off the board, in the hidden column

    game['board'][58].color = "black"; //would be placed off the board, in the hidden column
    game['board'][62].color = "black"; //would be placed off the board, in the hidden column
    game['board'][78].color = "black"; //would be placed off the board, in the hidden column

    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    alert("New board object stored in sessionStorage");
}
function createNewTestObject3(){
    sessionStorage.removeItem('gameObj');

    var game = {
        red: {
            pieceslost: 0,
            winner: false
        },
        black: {
            pieceslost: 0,
            winner: false
        },
        board:[],
        tempboard:[],
        turn: 1,
        jumpsonly: 0,
        selected: null,
        mustJump: null,
        hasJump: false
    };    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none", "False");
    }


    game['board'][12].color = "red"; //would be placed off the board, in the hidden column

    game['board'][30].color = "red"; //would be placed off the board, in the hidden column
    game['board'][32].color = "red"; //would be placed off the board, in the hidden column
    game['board'][34].color = "red"; //would be placed off the board, in the hidden column
    game['board'][38].color = "red"; //would be placed off the board, in the hidden column
    game['board'][42].color = "red"; //would be placed off the board, in the hidden column

    game['board'][40].color = "red"; //would be placed off the board, in the hidden column
    game['board'][44].color = "red"; //would be placed off the board, in the hidden column
    game['board'][46].color = "red"; //would be placed off the board, in the hidden column
    game['board'][48].color = "red"; //would be placed off the board, in the hidden column

    game['board'][50].color = "black"; //would be placed off the board, in the hidden column
    game['board'][52].color = "black"; //would be placed off the board, in the hidden column
    game['board'][56].color = "black"; //would be placed off the board, in the hidden column

    game['board'][58].color = "black"; //would be placed off the board, in the hidden column
    game['board'][62].color = "black"; //would be placed off the board, in the hidden column
    game['board'][64].color = "black"; //would be placed off the board, in the hidden column

    game['board'][66].color = "black"; //would be placed off the board, in the hidden column
    game['board'][68].color = "black"; //would be placed off the board, in the hidden column
    game['board'][70].color = "black"; //would be placed off the board, in the hidden column


    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    alert("New board object stored in sessionStorage");
}

function createNewTestObject4(){
    sessionStorage.removeItem('gameObj');

    var game = {
        red: {
            pieceslost: 0,
            winner: false
        },
        black: {
            pieceslost: 0,
            winner: false
        },
        board:[],
        tempboard:[],
        turn: 1,
        jumpsonly: 0,
        selected: null,
        mustJump: null,
        hasJump: false
    };
    for (i = 0; i < 99; i++) {
        game['board'][i] = new Piece("none", "False");
    }

    game['board'][22].color = "red"; //would be placed off the board, in the hidden column

    game['board'][46].color = "black"; //would be placed off the board, in the hidden column
    game['board'][48].color = "black"; //would be placed off the board, in the hidden column
    game['board'][50].color = "black"; //would be placed off the board, in the hidden column
    game['board'][56].color = "black"; //would be placed off the board, in the hidden column

    game['board'][60].color = "red"; //would be placed off the board, in the hidden column
    game['board'][60].king = "True"; //would be placed off the board, in the hidden column

    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    alert("New board object stored in sessionStorage");
}

window.onload = loadGame;
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

function loadGame(){
    if(sessionStorage.getItem('gameObj') === null) {
        createNewGameObject();
    }
    updateBoardHTML();
}

function newGame(){
    document.getElementById("winner").innerHTML = "";
    sessionStorage.removeItem('gameObj');
    loadGame();
}

function selectHandle(squareId){
    var coords = arrayifyCoords(squareId);
    select(coords);
}

function selectAfterJump(squareId){
    selectHandle(squareId);
}




function userPass(){
    if (playerHasMove(game['turn'])) {
        alert("You can't pass when you have a move available!")
        return false;
    }
    endTurn();
    if (playerHasMove(game['turn'])) {     //will need to change later if CPU != red
        cpuTurn();
        endTurn();
        if (!playerHasMove(game['turn'])) {
            alert("You have no moves. Hit PASS to end your turn.");
        }
    }
    else {
        endTurn();
        if (!playerHasMove(game['turn'])) {
            gameOver("tie");
        }
    }
    return true;
}


function select(coords){
    //Called when a square on the board is clicked by the user.
    //If there is not a selected square already, return 1
    //If there is a selected square, return 2
    //These two return values direct the logic of the action() function.
    var from = game['selected'];
    if(!from) {
        document.getElementById("sq-" + coords).style.backgroundColor = "orange";    //Select clicked square
        return 1;
    }

    else {
        document.getElementById("sq-" + from).style.backgroundColor = "white";    //Deselect from square
        return 2;
    }
}

function turnPart0(boardIndex){
    game['selected'] = boardIndex;                    //Update moveFrom form value
    console.log("Square " + boardIndex + " selected.");
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
}

function turnPart1(boardIndex) {
    game['moveFrom'] = game['selected'];                    //Update moveFrom form value
    game['selected'] = null;
    game['hasMove'] = playerHasJump(game['turn']);


    var from = game['moveFrom'];
    var to = boardIndex;

    sessionStorage.setItem('gameObj', JSON.stringify(game));
    if (isLegalMove(from, to) && isMoversTurn(from, game['turn'])) {
        animateMove(from, to, turnPart2);
        return 1;
    }
    else {
        console.log("Square " + boardIndex + " selected, move to it is not legal.");
        return 0;
    }
}

function turnPart2(from, to) {
    playerMove(from, to);
    checkGameOver();
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    if (!jumpChain(from, to)) {
        endTurn();
        if (playerHasMove(game['turn'])) {     //will need to change later if CPU != red
            cpuTurn(turnPart3);
        }
        else {
            endTurn();
            if (!playerHasMove(game['turn'])) {
                gameOver("tie");
            }
        }
    }
    else { //a jump has been made, and another is available, so the turn continues.
        return 0;
    }
}

function turnPart3(){
    checkGameOver();
    endTurn();
    if (!playerHasMove(game['turn'])) {
        alert("You have no moves. Hit PASS to end your turn.");
    }
}

function action(squareID){
    var boardIndex = arrayifyCoords(squareID);
    switch (select(boardIndex)){
        case 1: //just a select
            turnPart0(boardIndex);
            break;
        case 2: //triggers a move
            turnPart1(boardIndex);
            break;
        default:
            alert("select failed!");
            break;
    }
}

function cpuTurn(callbackFunc){

    //"Merciless" AI jumps as many times as it can. If no jumps are available, it plays a regular move.
    var bestmoveArray;
    bestmoveArray = runMiniMax();
    var size = bestmoveArray.from.length;
    var pos = 0;
    var k = 0;
    var id = setInterval(function(){
        k = cpuTurnMeat(k, size, bestmoveArray)
    }, 1000);


    function cpuTurnMeat(k, size, bestmoveArray) {
        if(bestmoveArray.from.length === 0){
            alert("Move failed 2... possibly not an error if the CPU actually has no moves.");
            return k+1;
        }
        if(k === size){
            //alert("size " + size + ", k: " + k);
            clearInterval(id);
            callbackFunc();
            return k+1;
        }
        if (!animateMove(bestmoveArray.from[size - (k + 1)], bestmoveArray.to[size - (k + 1)], cpuMove)) { //Move()
            alert("Move Failed");
            return k+1;
        }

        return k+1;
    }

}


function jumpChain(from, to){
    var moveDistance = Math.abs(from - to);
    if(moveDistance > 10 && pieceHasJump(to)){
        return true;
    }
    return false;
}


function checkGameOver(opts){
    if(game['red']['pieceslost'] >= 12){
        return gameOver("black");
    }
    else if(game['black']['pieceslost'] >= 12){
        return gameOver("red");
    }
    return false;
}

function gameOver(opts){
    if(opts === "tie"){
        document.getElementById("winner").innerHTML = "It's a Tie!";
        return true;
    }
    else if(opts === "red"){
        game['black']['winner'] = true;
        document.getElementById("winner").innerHTML = "Black Wins!";
        return true;
    }
    else if(opts === "black"){
        game['red']['winner'] = true;
        document.getElementById("winner").innerHTML = "Red Wins!";
        return true;
    }
    return false;
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
    //game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to) && isMoversTurn(from, game['turn'])){
        //animateMove(from, to, realMove);
        realMove(from, to);
        return true;
    }
    else {
        return false;
    }
}

//This function is for moves within miniMax, which do not advance the game.
function attemptMiniMaxMove(from, to, depth){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to) && isMoversTurn(from, game['turn'])){
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
            callbackFunc(from, to);
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            updateBoardHTML();
                //alert("Move Failed");
             //Move()
        } else {
            pos++;
            //piece.style.color = "green";
            piece.style.left = 15 + (pos * hor) + "px";
            piece.style.top = 15 + (pos * vert) + "px";
        }
    }
    return true;
}

function kingHandle(from, to){
    if((to >= 10 && to <= 17) && game['board'][from].color === "black"){
        game['board'][from].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][from].color === "red") {
        game['board'][from].king = "True";
    }
}

function realMove(from, to){
    kingHandle(from, to);
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none", "False");
    game['mustJump'] = null;
    var dist = from - to;

    if(Math.abs(dist) > 11){
        var jumpedPieceColor = game['board'][(from - Math.floor(dist/2))].color;
        game[jumpedPieceColor]['pieceslost']++;
        game['board'][(from - Math.floor(dist/2))] = new Piece("none", "False");  //remove jumped piece from board
        if(pieceHasJump(to)){
            game['mustJump'] = to;
        }
    }
}



function moveBack(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none", "False");
    var dist = from - to;
    if(Math.abs(dist) > 10){
            if(game['board'][to].color === "red"){ //was it the cpus turn?
                game['board'][(from - Math.floor(dist/2))].color = "black";
            }
            else if (game['board'][to].color === "black"){
                game['board'][(from - Math.floor(dist/2))].color = "red";
            }
            if(from === game['jumpsonly']){
                game['mustJump'] = null;
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

function moveIsOnBoard(from, to){
    var dist = from - to;
    if (to < 10 || to > 80 || ((to % 9) === 0)){
        return false;
    } //is this move off the board
    if(Math.abs(dist) > 10 && (from - Math.floor(dist / 2)) % 9 === 0){
        return false;
    } //is the move a jump that wraps around the board?
    return true;
}



function isLegalMove(from, to){
    var signedDist = from - to;
    var movingPiece = game['board'][from];
    var jumpedPiece = game['board'][(from - Math.floor(signedDist / 2))];

    if(!moveIsOnBoard(from, to)){
        console.log("Move from " + from + " to " + to + " is off the board.");
        return false;
    }
    if(game['mustJump'] !== null){
        if(game['mustJump'] !== from || Math.abs(signedDist) <= 10){
                console.log("piece at " + game['mustJump'] + " must jump");
                return false;
        }
    }

    if(game['hasJump'] === true && Math.abs(signedDist) <= 10){
        console.log("Player has a jump, they must take it.");
        return false;
    }

    if(game['board'][to]['color'] !== "none") {
        console.log("Move from " + from + " to " + to + " is to an occupied space.");
        return false;
    }//is the space being moved to already occupied?



    if(movingPiece.king === "True"){
        var moves = [-8, -10, 8, 10];
        var jumps = [-16, -20, 16, 20];
        if (inArray(signedDist, moves)){
            return true;
        }
        else if (inArray(signedDist, jumps) &&
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

            if (inArray(signedDist, moves)){
                return true;
            }
            else if (inArray(signedDist, jumps) && jumpedPiece.color === "black") {
                return true;
            }
            else { return false; }
        case "black":
            var moves = [8, 10];
            var jumps = [16, 20];

            if (inArray(signedDist, moves)){
                return true;
            }
            else if (inArray(signedDist, jumps) && jumpedPiece.color === "red") {
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
            document.getElementById("sq-" + i).innerHTML = "<i class='fas fa-chess-king' id='p-" + i + "' style='color: " + square['color'] + "; position: absolute; left: 15px; top: 15px;'></i>";
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
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    //if ((game['turn'] % 2 != 1)) {
    //    setTimeout(cpuTurn, 1000);
    //}
}

function continueTurn(){
    sessionStorage.setItem('gameObj', JSON.stringify(game));
    updateBoardHTML();
    if ((game['turn'] % 2 != 1)) {


        alert("jumpsonly: " + game['jumpsonly']);

        setTimeout(cpuTurn, 1000);
    }
    else{
        select(game['jumpsonly']);
    }
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
            score--;
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

function miniMaxMove(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none", "False");
    var dist = from - to;

    if(Math.abs(dist) > 11){
        if(game['board'][(from - Math.floor(dist/2))].king === "True"){
            game['board'][(from - Math.floor(dist/2))] = new Piece("none", "True");  //remove jumped piece from board
        }
        else {
            game['board'][(from - Math.floor(dist / 2))] = new Piece("none", "False");  //remove jumped piece from board
        }
        sessionStorage.setItem('gameObj', JSON.stringify(game));         //need this here to set up piecehasjump
        if(pieceHasJump(to)){
            game['mustJump'] = to;
            return 3;
        }
        else {
            game['mustJump'] = null;
            return 2
        }
    }
    else {
        game['mustJump'] = null;
        return 1;
    }
}

function getTeamToMove(turn){
    if(turn % 2 === 0){
        return "red";
    }
    else if(turn % 2 === 1){
        return "black";
    }
    else {
        alert("ERR_713");
        return undefined;
    }

}

function playerHasJump(turn){
    var color = getTeamToMove(turn);
    var moves = [16, 20, -16, -20];
    for (var i = 10; i <= 81; i++) {
        if(isMoversTurn(i, turn)) {
            for (var j = 0; j < 4; j++) {
                var num = i + moves[j];
                if (isLegalMove(i, num)) {
                    //alert(color + " has a jump from " + i + " to " + num);
                    return true;
                }
            }
        }
    }
    //alert(color + " does not have a jump");

    return false;
}

function playerHasMove(turn){
    var moves = [8, 10, 16, 20, -8, -10, -16, -20];
    for (var i = 10; i <= 81; i++) {
        if(isMoversTurn(i, turn)) {
            for (var j = 0; j < 8; j++) {
                var num = i + moves[j];
                if (isLegalMove(i, num)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function comparisonTest(){
    if(teamHasMove("black") != playerHasMove(0)){
        alert("Here1");
    }
    if(teamHasMove("red") != playerHasMove(1)){
        alert("Here2");
    }
}

function teamHasMove(color){
    var flip;
    if(color == "black"){
        flip = -1;
    }
    else {
        flip = 1;
    }
    for (i = 10; i < 81; i++) {
        if(game['board'][i].color == color) {
            if (isLegalMove(i, (parseFloat(i) + (16 * flip)))) {
                return true;
            }
            else if (isLegalMove(i, (parseFloat(i) + (20 * flip)))) {
                return true;
            }
            if(game['board'][i].king == true) {
                if (isLegalMove(i, (parseFloat(i) - (20 * flip)))) {
                    return true;
                }
                else if (isLegalMove(i, (parseFloat(i) - (20 * flip)))) {
                    return true;
                }
            }
            if (isLegalMove(j, (parseFloat(j) + (8 * flip)))) {
                return true;
            }
            else if (isLegalMove(j, (parseFloat(j) + (10 * flip)))) {
                return true;
            }

            if (game['board'][j].king == true) {
                if (isLegalMove(j, (parseFloat(j) - (8 * flip)))) {
                    return true;
                }
                else if (isLegalMove(j, (parseFloat(j) - (10 * flip)))) {
                    return true;
                }
            }
        }
    }

    alert("false");
    return false;
}

function miniMax(depth, jumpsonly, from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    score = getScore(game['board']);
    if(depth === 2){
        var returnval = {score: score, to: to, from: from, moveIsInitialized: false};
        return returnval;
    }

    var tempval = {score: 0, to: [], from: [], moveIsInitialized: false};
    var returnval = {score: score, to: [], from: [], moveIsInitialized: false};

    var moves = [8, 10, 16, 20, -8, -10, -16, -20];
    var hasJump = playerHasJump(depth);
    for (var i = 10; i <= 81; i++){
        for (var j = 0; j < 8; j++){
            var num = i + moves[j];
            if(!(Math.abs(num - i) <= 10 && hasJump)) {
                if (isLegalMove(i, num) && isMoversTurn(i, depth)) {   //if move from i to num is legal at the current depth
                    if (depth === 0) {
                        console.log("legal move from " + i + " to " + num + " at depth " + depth);
                    }
                    else {
                        console.log("   legal move from " + i + " to " + num + " at depth " + depth);
                    }
                    miniMaxMove(i, parseFloat(num));
                    sessionStorage.setItem('gameObj', JSON.stringify(game));
                    if (pieceHasJump(num) && Math.abs(num - i) > 10) {
                        var tempval = miniMax(depth, true, i, num);
                        tempval.from.push(i);
                        tempval.to.push(num);
                        num = i + moves[j];
                        moveBack(parseFloat(num), i);
                        if (isNewValue(returnval.score, tempval.score, depth) || returnval.moveIsInitialized === false) {
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
                        if (isNewValue(returnval.score, tempval.score, depth) || returnval.moveIsInitialized === false) {
                            console.log("       New return val: " + tempval.score + ", old val: " + returnval.score + ", with move: to: " + num + ", from : " + i + " at depth " + depth);
                            returnval.score = tempval.score; //set returnval.score = tempval.score
                            returnval.from = [i];
                            returnval.to = [num];
                            returnval.moveIsInitialized = "true";
                        }
                    }
                }
            }
            else{
                console.log("A jump is available, so regular move " + from + " to " + to + "is not available.");
            }
        }
        if(i === 81){
            console.log("Returnval: " + returnval.score + " with move from " + returnval.from + " to " + returnval.to + " at depth " + depth);
            return returnval;
        }
    }
}

function isNewValue(oldval, newval, depth){
    if(depth % 2 === 0 && oldval < newval){ //depth % 2 = 0 and so it is the computers turn. Who wants the value as high as possible
        return true;
    }
    else if(depth % 2 === 1 && oldval > newval){ //depth % 2 = 1 and so it is the users turn. Who wants the value as low as possible
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
    //alert("CPUmove from: " + from + " to " + to);
    if(attemptMove(from, to)){
        return true;
    }
    return false;
}

function cpuTurnOld(){

    //"Merciless" AI jumps as many times as it can. If no jumps are available, it plays a regular move.
    var bestmoveArray;
    bestmoveArray = runMiniMax();

    var size = bestmoveArray.from.length;
    var pos = 0;
    for (var k = (size - 1); k >= 0; k--) {
        if (!cpuMove(bestmoveArray.from[k], bestmoveArray.to[k])) { //Move()
            alert("Move Failed");
            return false;
        }
        sessionStorage.setItem('gameObj', JSON.stringify(game));
    }

    if(bestmoveArray.from.length === 0){
        alert("Move failed 2... possibly not an error if the CPU actually has no moves.");
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

    document.getElementById("red-pieces-lost").innerHTML = game['red']['pieceslost'];
    document.getElementById("black-pieces-lost").innerHTML = game['black']['pieceslost'];
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
