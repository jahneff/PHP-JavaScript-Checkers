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
        if(attemptMove(moveFrom.value, moveTo.value)) {
            document.getElementById("sq-" + moveFrom.value).style.backgroundColor = "white";    //Deselect from square
            moveFrom.value = "null";
            moveTo.value = "null";
            if (game['jumpsonly'] === 1) {  //More jumps are available for moved piece
                select(coords); //Select clicked square
            }
        }
        else {
            if (game['jumpsonly'] === 0) {
                document.getElementById("sq-" + moveFrom.value).style.backgroundColor = "white";    //Deselect from square
                moveFrom.value = "null";
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
    var arr = combo.split("-", 2);
    return arr;
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
    if(isLegalMove(from, to) && isMoversTurn(from)){
        animateMove(from, to, Move);
        //Move(from, to);
        return true;
    }
    else {
        return false;
    }
}

function attemptMove2(from, to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(isLegalMove(from, to)){
        //animateMove(from, to, Move2);
        Move2(from, to);
        sessionStorage.setItem('gameObj', JSON.stringify(game));
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
    var elem = document.getElementById("sq-" + from);
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
    //alert("from: " + from + " to : " + to);
    //alert("vert: " + vert + " hor : " + hor);
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 50) {
            clearInterval(id);
            callbackFunc(from, to);
            //updateBoardHTML();
        } else {
            pos++;
            piece.style.color = "green";
            piece.style.left = 15 + (pos * hor) + "px";
            piece.style.top = 15 + (pos * vert) + "px";

            //elem.style.backgroundColor = '#' + pos;
        }
    }
}

function Move(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = new Piece("none");
    var dist = from - to;

    if(Math.abs(dist) > 10){
        var jumpedPieceColor = game['board'][(from - Math.floor(dist/2))].color;
        game[jumpedPieceColor]['pieceslost']++;
        game['board'][(from - Math.floor(dist/2))] = new Piece("none");  //remove jumped piece from board
        if(pieceHasJump(to)){
            game['jumpsonly'] = to;
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

function minimaxMove(from, to, gameobj){
    gameobj['board'][to] = gameobj['board'][from];
    gameobj['board'][from] = new Piece("none");
    var dist = from - to;

    if(Math.abs(dist) > 10){

        gameobj['board'][(from - Math.floor(dist/2))] = new Piece("none");  //remove jumped piece from board
        if(pieceHasJump(to)){
            gameobj['jumpsonly'] = to;
        }
        else {
            gameobj['jumpsonly'] = 0;
        }
    }
    else {
        game['jumpsonly'] = 0;
    }
    return gameobj;
}

function moveBack(from, to, gameobj){
    gameobj['board'][to] = gameobj['board'][from];
    gameobj['board'][from] = new Piece("none");
    var dist = from - to;




    if(Math.abs(dist) > 10){

        //remove jumped piece from board
        sessionStorage.setItem('gameObj', JSON.stringify(game));
        if(gameobj['board'][to].color === "red"){ //was it the cpus turn?
            gameobj['board'][(from - Math.floor(dist/2))].color = "black";
            //sessionStorage.setItem('gameObj', JSON.stringify(game));

            //cpuTurn();
        }
        else if (gameobj['board'][to].color === "black"){
            gameobj['board'][(from - Math.floor(dist/2))].color = "red";
            //sessionStorage.setItem('gameObj', JSON.stringify(game));
        }
        else {
            //endTurn();
        }
    }
    else {
        //sessionStorage.setItem('gameObj', JSON.stringify(game));
        //endTurn();
    }
    return gameobj;
}

function isMoversTurn(from){
    var movingPiece = game['board'][from];
    if(movingPiece.color === "red" && game['turn'] % 2 == 1){
        alert("wrong color, it is black's move");
        return false;
    }
    else if(movingPiece.color === "black" && game['turn'] % 2 == 0){
        alert("wrong color, it is red's move");
        return false;
    }
    return true;
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
        if (inArray(dist, moves) && phase == 0){
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

            if (inArray(dist, moves) && phase == 0){
                return true;
            }
            else if (inArray(dist, jumps) && jumpedPiece.color === "black") {
                return true;
            }
            else { return false; }
        case "black":
            var moves = [8, 10];
            var jumps = [16, 20];

            if (inArray(dist, moves) && phase == 0){
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


function isLegalMove2(from, to){
    if (to < 10 || to > 80 || ((to % 9) === 0)){ //is the space being moved to off the board?
        alert("here1");
        return false;
    }

    //maybe dont need this conditional. SHould be taken care of in switch statement below
    if(game['board'][to]['color'] !== "none") { //is the space being moved to already occupied?
        alert("here2");
        alert(to);
        alert(game['board'][to]['color']);
        alert(from);
        return false;
    }
    var phase = game['jumpsonly'];
    var dist = from - to;
    if(Math.abs(dist) > 10 && (from - Math.floor(dist / 2)) % 9 === 0){
        alert("here3");
        return false;
    }

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
            alert("here4");
            return false;
        case "black":
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
            alert("here5");

            return false;
        default: //clicked square has no piece
            alert("here6");

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
    if(game['squaretomove'] !== 0) {
        var arry = separate(miniMax(board, 0, 0, 0, 0, 1, 1));
    }
    else {
        var arry = separate(miniMax(board, 0, 0, 0, 0, 0, 1));
    }
    return arry;
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

function modifyScore(colorToMove, score, tempscore){
    if(colorToMove === "red"){
        if((tempscore) > score){
            //alert("new score: " + tempscore);
            return tempscore;
        }
    }
    if(colorToMove === "black"){
        if((tempscore) < score){
            //alert("new score: " + tempscore);
            return tempscore;
        }
    }
    return tempscore;
}




function miniMaxRecurse(board, depth, score, i, num, colorToMove, tempscore, tempscore2){
    var to = parseFloat(i) + num;
    var from = i;
    if (isLegalMove(i, parseFloat(i) + num)) {
        attemptMove2(i, parseFloat(i) + num);
        if(game['jumpsonly'] !== 0){
            tempscore2 = miniMax(board, parseFloat(depth), score, i, parseFloat(i) + num, parseFloat(i) + num, 0);

        }
        else {
            tempscore2 = miniMax(board, parseFloat(depth) + 1, score, i, parseFloat(i) + num, 0, 0);
        }
        moveBack(parseFloat(i) + num, i);
        return tempscore2;
    }
    else {
        return tempscore2;
    }

}
function miniMax(board, depth, score, from, to, jumpsonly, isrootcall){

    if(((depth + game['turn']) % 2) === 0){
        var colorToMove = "red";
        var flip = 1;   //changes movement direction based on team moving
        var tempscore2 = -10000;
    }
    else {
        var colorToMove = "black";
        var flip = -1;
        var tempscore2 = 10000;

    }

    if(depth === 0){
        console.log(game);
    }
    else if(depth === 1){
        console.log(game);
    }
    else if(depth === 2){
        console.log(game);
    }

    game = JSON.parse(sessionStorage.getItem('gameObj'));
    console.log(game);



    //console.log("Depth: " + depth + ", Player to move: " + colorToMove + ". Other player just moved From: " + from + ", To:" + to + ", Oldscore: " + score + ", Newscore: " + getScore(board));


    board = game['board'];
    score = getScore(board);
    if(depth === 2){ //this is an end node
        if(score !== 0) {
            //alert("returning " + score + " depth: " + depth + " move: " + to + " to " + from);
        }
        return score;
    }

    var tempscore = score;
    var tempto = 0;
    var tempfrom = 0;


    if(jumpsonly !== 0) {
        i = game['squaretomove'];
        var num1 = 16 * flip;
        var num2 = 20 * flip;
        var num3 = 8 * flip;
        var num4 = 10 * flip;

        tempscore = miniMaxRecurse(board, depth, score, i, num1, colorToMove, tempscore, tempscore2);
        if (colorToMove === "red" && tempscore > tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num1;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }
        else if (colorToMove === "black" && tempscore < tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num1;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }

        tempscore = miniMaxRecurse(board, depth, score, i, num2, colorToMove, tempscore, tempscore2);
        if (colorToMove === "red" && tempscore > tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num2;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }
        else if (colorToMove === "black" && tempscore < tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num2;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }

        tempscore = miniMaxRecurse(board, depth, score, i, num3, colorToMove, tempscore, tempscore2);

        if (colorToMove === "red" && tempscore > tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num3;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }
        else if (colorToMove === "black" && tempscore < tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num3;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }

        tempscore = miniMaxRecurse(board, depth, score, i, num4, colorToMove, tempscore, tempscore2);
        if (colorToMove === "red" && tempscore > tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num4;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }
        else if (colorToMove === "black" && tempscore < tempscore2) {
            tempfrom = i;
            tempto = parseFloat(i) + num4;
            tempscore2 = modifyScore(colorToMove, score, tempscore);
        }
        if (depth === 0 && isrootcall) {
            //alert("best possible score at 0 for " + colorToMove + ": " + tempscore);
            //alert("best possible move for " + colorToMove + " : from : " + tempfrom + " to : " + tempto);
            game['squaretomove'] = tempto;
            return (tempfrom + "-" + tempto);
        }
        else{
            return tempscore2;
        }
    }
    else {
        for (var i = 10; i < 82; i++) {
            if (i === 81) {
                return tempscore2;
            }
            if (board[i].color === colorToMove) {
                var num1 = 16 * flip;
                var num2 = 20 * flip;
                var num3 = 8 * flip;
                var num4 = 10 * flip;

                tempscore = miniMaxRecurse(board, depth, score, i, num1, colorToMove, tempscore, tempscore2);
                if (colorToMove === "red" && tempscore > tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num1;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if (colorToMove === "black" && tempscore < tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num1;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                tempscore = miniMaxRecurse(board, depth, score, i, num2, colorToMove, tempscore, tempscore2);
                if (colorToMove === "red" && tempscore > tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num2;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if (colorToMove === "black" && tempscore < tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num2;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                tempscore = miniMaxRecurse(board, depth, score, i, num3, colorToMove, tempscore, tempscore2);

                if (colorToMove === "red" && tempscore > tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num3;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if (colorToMove === "black" && tempscore < tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num3;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                tempscore = miniMaxRecurse(board, depth, score, i, num4, colorToMove, tempscore, tempscore2);
                if (colorToMove === "red" && tempscore > tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num4;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if (colorToMove === "black" && tempscore < tempscore2) {
                    tempfrom = i;
                    tempto = parseFloat(i) + num4;
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                /*if(board[i].king === "True") {
                    alert("King");
                    if (isLegalMove(i, parseFloat(i) + (num1 * -1))) {
                        attemptMove2(i, parseFloat(i) + num1);
                        tempscore = miniMax(board, parseFloat(depth) + 1, score, from, to);
                        if (colorToMove === "red" && tempscore > tempscore2) {
                            tempfrom = i;
                            tempto = parseFloat(i) + num1;
                            tempscore2 = modifyScore(colorToMove, score, tempscore);
                        }
                        else if (colorToMove === "black" && tempscore < tempscore2) {
                            tempfrom = i;
                            tempto = parseFloat(i) + num1;
                            tempscore2 = modifyScore(colorToMove, score, tempscore);
                        }

                        moveBack(parseFloat(i) + num1, i);
                    }
                    if (isLegalMove(i, parseFloat(i) + (num2 * -1))) {
                        attemptMove2(i, parseFloat(i) + num2);
                        tempscore = miniMax(board, parseFloat(depth) + 1, score, from, to);
                        if (colorToMove === "red" && tempscore > tempscore2) {
                            tempfrom = i;
                            tempto = parseFloat(i) + num2;
                            tempscore2 = modifyScore(colorToMove, score, tempscore);
                        }
                        else if (colorToMove === "black" && tempscore < tempscore2) {
                            tempfrom = i;
                            tempto = parseFloat(i) + num2;
                            tempscore2 = modifyScore(colorToMove, score, tempscore);
                        }

                        moveBack(parseFloat(i) + num2, i);
                    }

                }*/
            }
            if (depth === 0 && i === 80) {
                //alert("best possible score at 0 for " + colorToMove + ": " + tempscore);
                //alert("best possible move for " + colorToMove + " : from : " + tempfrom + " to : " + tempto);
                return (tempfrom + "-" + tempto);
            }

        }
    }
    alert("returning out of loop a score of" + score);

    //alert("depth returns: " + depth);
    return score;
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
    attemptMove(from, to);
    return 0;
}

function cpuTurn(){
    //"Merciless" AI jumps as many times as it can. If no jumps are available, it plays a regular move.
    var bestmove;


    //alert("CPU is calling minimax, please be patient...");
    bestmove = runMiniMax();
    //alert("Bestmove: " + bestmove[0] + "-" + bestmove[1]);
    if(bestmove !== undefined){
        //alert("Bestmove: " + bestmove);
        if(attemptMove(bestmove[0], bestmove[1])){
            //alert("Move success... right?");
            //console.log(game);
        }
        else {
            alert("Move failed");
            alert(bestmove[0], bestmove[1]);
            alert(isLegalMove(bestmove[0], bestmove[1]));
            //console.log(game);
        }
        return true;
    }
    else if(merciless()){
        return true;
    }
    return false;
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
