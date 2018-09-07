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
    var game = {red: {pieceslost: 0}, black: {pieceslost: 0}, board:[], tempboard:[], turn: 1, jumpsonly: 0};
    var move = {to: 0, from: 0}; //add functions such as selectFrom, selectTo
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
    sessionStorage.setItem('moveObj', JSON.stringify(move));

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
    window.location.href = ("checkers2.php");
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





function isJumpDistance(from, to, colorToMove){
    if(colorToMove === "black"){
        var move1 = -16;
        var move2 = -20;
    }
    else if(colorToMove === "red"){
        var move1 = 16;
        var move2 = 20;
    }
    if(getDistance(from, to) === move1 || getDistance(from, to) === move2){
        return true;
    }
}

function isMoveDistance(from, to, colorToMove){
    if(colorToMove === "black"){
        var move1 = -8;
        var move2 = -10;
    }
    else if(colorToMove === "red"){
        var move1 = 8;
        var move2 = 10;
    }
    if(getDistance(from, to) === move1 || getDistance(from, to) === move2){
        return true;
    }
}

function opponentsPieceJumped(from, to){
    dist = getDistance(from, to);
    jumpedindex = from - Math.floor(-dist/2);
    var jumpedcolor = getPieceColor(jumpedindex);
    if(jumpedcolor === "black" && getPieceColor(from) === "red"){
        return true;
    }
    else if(jumpedcolor === "red" && getPieceColor(from) === "black"){
        return true;
    }
    return false;

}

function getPieceColor(coords){
    //Get the color of the piece at the specific coordinates.
    //Color may be red, black, or none
    var game = JSON.parse(sessionStorage.getItem('gameObj'));
    return (game['board'][coords].color);
}

function getColor(index){
    return game['board'][index].color;
}

function getColorToMove(turn){
    if(turn % 2 === 0){
        return 'red';
    }
    else{
        return 'black';
    }
}

function moveIsLegal(from, to, colorToMove){

    if(!moveIsOnBoard(from, to)){
        return false;
    }
    if(!moveToIsClear(to)){
        return false;
    }

    if(isJumpDistance(from, to, colorToMove) && opponentsPieceJumped(from, to)){
            return true;
    }
    else if (isMoveDistance(from, to, colorToMove) && game['jumpsonly'] === 0){
            return true;
    }
    return false;
}

function getTeamToMove(){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(game['turn'] % 2 === 0){
        return "red";
    }
    else{
        return "black";
    }
}

function moveToIsClear(to){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    var moveToSquare = game['board'][to];
    if(moveToSquare.color === "none") {
        return true;
    }
    else {
        return false;
    }
}


//Checks whether the piece being moved is on the team of the player to move
function isMoversTurn(from){
    game = JSON.parse(sessionStorage.getItem('gameObj'));
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

function getDistance(from, to){
    return (to - from);
}


//makes sure the move is on the board, and if it is a jump, it does not wrap around the board
function moveIsOnBoard(from, to){
    if (to < 10 || to > 80 || ((to % 9) === 0)){ //is the space being moved to off the board?
        return false;
    }
    var dist = getDistance(from, to);
    if(Math.abs(dist) > 10 && (from - Math.floor(dist / 2)) % 9 === 0){
        return false;
    }
    return true;
}

function getFrom(){
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    return move['from'];
}

function getTo(){
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    return move['to'];
}

function selectAfterJump(squareId){
    selectHandle(squareId);
}

function selectFrom(coords) {
    if (coords === 0) {
        document.getElementById("sq-" + getFrom()).style.backgroundColor = "white";
        document.getElementById("moveFromCoords").value = "null";
    }
    else {

        document.getElementById("moveFromCoords").value = coords;
        document.getElementById("sq-" + coords).style.backgroundColor = "orange";    //Select clicked square
    }
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    move['from'] = coords;
    sessionStorage.setItem('moveObj', JSON.stringify(move));
    return true;
}


function selectTo(coords) {
    if (coords === 0) {
        document.getElementById("sq-" + getTo()).style.backgroundColor = "white";
        document.getElementById("moveToCoords").value = "null";
    }
    else {
        document.getElementById("sq-" + coords).style.backgroundColor = "orange";    //Select clicked square
        document.getElementById("moveToCoords").value = coords;
    }
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    move['to'] = coords;
    sessionStorage.setItem('moveObj', JSON.stringify(move));
    return true;
}

function test(){
    newGame();
    if(selectFromTest() === true){
        alert("selectFrom test Passed!")
    }
    else {
        alert("selectFrom test Failed!");
    }
    if(selectToTest() === true){
        alert("selectTo test Passed!")
    }
    else {
        alert("selectTo test Failed!")
    }
}

function selectFromTest(){
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    if(move.to !== 0){
        alert("move.to does not equal zero!");
        return false;
    }
    if(move.from !== 0){
        alert("move.from does not equal zero!");
        return false;
    }
    selectFrom(50);
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    if(move.from !== 50){
        alert("move.from does not equal 50!");
        return false;
    }
    selectFrom(0);
    return true;
}

function selectToTest(){
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    if(move.to !== 0){
        alert("move.to does not equal zero!");
        return false;
    }
    if(move.from !== 0){
        alert("move.to does not equal zero!");
        return false;
    }
    selectTo(50);
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    if(move.to !== 50){
        alert("move.to does not equal 50!");
        return false;
    }
    selectTo(0);

    return true;
}

function updateObject(object, objectname) { //need handlers for if object DNE
    sessionStorage.setItem(objectname, JSON.stringify(object));
}

function getObject(objectname){ //need handlers for if object DNE
    return (JSON.parse(sessionStorage.getItem(objectname)));
}

function moveHandle(from, to, turn){
    var colorToMove = getColorToMove(turn);
    if(colorToMove !== getColor(from)){
        alert("Wrong color, it is " + colorToMove + "'s turn.");
        return false;
    }
    if(moveIsLegal(from, to, colorToMove)){
        animateMove(from, to);
        Move3(from, to);

    }
    else {
        alert("move is not legal");
        return 0;
    }

    /*
    if(game['jumpsonly'] === 0){
        alert("move handle: regular move");
        if(moveIsLegal(from, to, colorToMove)){
            Move3(from, to);
        }
        else {
            alert("move is not legal");
            return 0;
        }
    }
    else if(game['jumpsonly'] === 1){
        alert("move handle: jumps only");
        if(moveIsLegal(from, to, colorToMove)){
            Move3(from, to);
        }
        else {
            alert("move is not legal");
            return 0;
        }
    }
    */

    game = getObject('gameObj');
    if(game['jumpsonly'] === 0){
        endTurn();
    }
}

function selectHandle(squareId){
    var move = JSON.parse(sessionStorage.getItem('moveObj'));
    game = JSON.parse(sessionStorage.getItem('gameObj'));
    var coords = arrayifyCoords(squareId);
    if(move['from'] === 0){
        selectFrom(coords);
    }
    else{
        selectTo(coords);
        moveHandle(getFrom(), getTo(), game['turn']);

        //reset html elements and move object
        selectFrom(0);
        selectTo(0);
    }

}

function pieceInBackRank(i){
    if((i >= 10 && i <= 17) && game['board'][i].color === "black"){
        return true;
    }
    else if((i >= 73 && i <= 80) && game['board'][i].color === "red") {
        return true;
    }
}


function Move3(from, to){ //returns 1 if the move was a jump and another jump is available. Else
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;

    var dist = getDistance(from, to);
    if(pieceInBackRank(to)){
        game['board'][to].king = "True";
    }
    if(Math.abs(dist) > 10){
        game['board'][(from - Math.floor(-dist/2))] = emptyPiece;  //remove jumped piece from board
    }
    updateObject(game, 'gameObj');
    updateBoardHTML();
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



function animateMove(from, to) {
    var elem = document.getElementById("sq-" + from);
    var piece = document.getElementById("p-" + to);
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
        if (pos === 50) {
            clearInterval(id);
            updateBoardHTML();
        } else {
            pos++;
            piece.style.color = '#' + pos;
            piece.style.left = 15 + (pos * hor) + "px";
            piece.style.top = 15 + (pos * vert) + "px";
            elem.style.backgroundColor = '#' + pos;
        }
    }
}

function Move(from, to){
    alert(game['board'][to].color);
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;
    var dist = from - to;


    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        game['board'][to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        game['board'][to].king = "True";
    }
    alert(game['board'][to].color);

    if(Math.abs(dist) > 10){
        game['board'][(from - Math.floor(dist/2))] = emptyPiece;  //remove jumped piece from board
        if(pieceHasJump(to)){
            game['jumpsonly'] = 1;
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            if(game['board'][to].color === "red"){ //was it the cpus turn?
                cpuTurn();
            }
        }
        else {
            endTurn();
        }
    }
    else {
        endTurn();
    }
}

function Move2(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;
    var dist = from - to;


    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        game['board'][to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        game['board'][to].king = "True";
    }

    if(Math.abs(dist) > 10){
        game['board'][(from - Math.floor(dist/2))] = emptyPiece;  //remove jumped piece from board
        if(pieceHasJump(to)){
            game['jumpsonly'] = 1;
            //sessionStorage.setItem('gameObj', JSON.stringify(game));
            if(game['board'][to].color === "red"){ //was it the cpus turn?
                //cpuTurn();
            }
        }
        else {
            //endTurn();
        }
    }
    else {

        //endTurn();
    }
}

function moveBack(from, to){
    game['board'][to] = game['board'][from];
    game['board'][from] = emptyPiece;
    var dist = from - to;


    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        game['board'][to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        game['board'][to].king = "True";
    }

    if(Math.abs(dist) > 10){

          //remove jumped piece from board
            sessionStorage.setItem('gameObj', JSON.stringify(game));
            if(game['board'][to].color === "red"){ //was it the cpus turn?
                game['board'][(from - Math.floor(dist/2))].color = "black";
                sessionStorage.setItem('gameObj', JSON.stringify(game));

                //cpuTurn();
            }
            else if (game['board'][to].color === "black"){
                game['board'][(from - Math.floor(dist/2))].color = "red";
                sessionStorage.setItem('gameObj', JSON.stringify(game));
            }
            else {
                //endTurn();
            }
    }
    else {
        sessionStorage.setItem('gameObj', JSON.stringify(game));
        //endTurn();
    }
}


function isLegalMove(from, to){
    if (to < 10 || to > 80 || ((to % 9) === 0)){ //is the space being moved to off the board?
        return false;
    }

    //maybe dont need this conditional. SHould be taken care of in switch statement below
    if(game['board'][to]['color'] !== "none") { //is the space being moved to already occupied?
        return false;
    }
    var phase = game['jumpsonly'];
    var dist = from - to;
    if(Math.abs(dist) > 10 && (from - Math.floor(dist / 2)) % 9 === 0){
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
            return false;
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
        //setTimeout(cpuTurn, 3000);
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
    var arry = separate(miniMax(board, 0, 0));
    alert("done");
    alert(arry[0]);
    alert(arry[1]);
    return 0;
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

function modifyScore(colorToMove, score, tempscore){
    if(colorToMove === "red"){
        if((tempscore) > score){
            alert("new score: " + tempscore);
            return tempscore;
        }
    }
    if(colorToMove === "black"){
        if((tempscore) < score){
            alert("new score: " + tempscore);
            return tempscore;
        }
    }
    return tempscore;
}



function miniMax(board, depth, score){
    //var originalBoard = board;

    game = JSON.parse(sessionStorage.getItem('gameObj'));
    board = game['board'];
    score = getScore(board);
    if(depth === 2){ //this is an end node
       // alert("depth == 4, current score: " + score);
        if(score !== 0) {
            //alert("returning " + score + " depth: " + depth);
        }
        return score;
    }

    var tempscore = score;
    var tempto = 0;
    var tempfrom = 0;
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
    //alert("Minimax called. Depth: " + depth + ", board score: " + score + ", color to move: " + colorToMove);
    //alert("depth going in: " + depth);

    for (var i = 10; i < 82; i++) {
        if(i === 81){
            alert("returning " + tempscore2 + " depth: " + depth);
            return tempscore2;
        }
        if(board[i].color === colorToMove) {
            var num1 = 16 * flip;
            var num2 = 20 * flip;
            var num3 = 8 * flip;
            var num4 = 10 * flip;
            if (isLegalMove(i, (parseFloat(i) + num1))) {
                console.log("depth: " + depth + ", " + colorToMove + "moves from: " + i + " to " + (parseFloat(i) + num1));
                attemptMove2(i, parseFloat(i) + num1);
                updateBoardHTML();
                tempscore = miniMax(board, parseFloat(depth)+1, score);
                if(colorToMove === "red" && tempscore > tempscore2){
                    alert("1: tempscore " + tempscore + "tempscore2: " + tempscore2);
                    tempfrom = i;
                    tempto = parseFloat(i) + num1;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if(colorToMove === "black" && tempscore < tempscore2){
                    alert("2: tempscore " + tempscore + "tempscore2: " + tempscore2);
                    tempfrom = i;
                    tempto = parseFloat(i) + num1;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                moveBack(parseFloat(i) + num1, i);
                updateBoardHTML();
            }
            //if (i === 48 && (parseFloat(i) + num2) === 28) {
                //alert((isLegalMove(i, (parseFloat(i) + num2))));
                //alert(game['board'][38]['color']);

            //}
            if (isLegalMove(i, (parseFloat(i) + num2))){
                console.log("depth: " + depth + ", " + colorToMove + "moves from: " + i + " to " + (parseFloat(i) + num2));
                if(i === 48 && (parseFloat(i) + num4) === 28){
                    alert("Reacdhed");
                }
                attemptMove2(i, parseFloat(i) + num2);
                updateBoardHTML();
                tempscore = miniMax(board, parseFloat(depth)+1, score);
                if(colorToMove === "red" && tempscore > tempscore2){
                    alert("3: tempscore " + tempscore + "tempscore2: " + tempscore2);

                    tempfrom = i;
                    tempto = parseFloat(i) + num2;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if(colorToMove === "black" && tempscore < tempscore2){
                    alert("4: tempscore " + tempscore + "tempscore2: " + tempscore2 + " depth: " + depth);

                    tempfrom = i;
                    tempto = parseFloat(i) + num2;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                moveBack(parseFloat(i) + num2, i);
                updateBoardHTML();
            }
            if (isLegalMove(i, (parseFloat(i) + num3))) {
                console.log("depth: " + depth + ", " + colorToMove + "moves from: " + i + " to " + (parseFloat(i) + num3));
                attemptMove2(i, parseFloat(i) + num3);
                updateBoardHTML();
                tempscore = miniMax(board, parseFloat(depth)+1, score);
                if(colorToMove === "red" && tempscore > tempscore2){
                    alert("5: tempscore " + tempscore + "tempscore2: " + tempscore2);

                    tempfrom = i;
                    tempto = parseFloat(i) + num3;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if(colorToMove === "black" && tempscore < tempscore2){
                    alert("6: tempscore " + tempscore + "tempscore2: " + tempscore2 + " depth: " + depth);

                    tempfrom = i;
                    tempto = parseFloat(i) + num3;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }


                moveBack(parseFloat(i) + num3, i);
                updateBoardHTML();
            }
                if (isLegalMove(i, (parseFloat(i) + num4))) {
                console.log("depth: " + depth + ", " + colorToMove + "moves from: " + i + " to " + (parseFloat(i) + num4));
                attemptMove2(i, parseFloat(i) + num4);
                updateBoardHTML();
                tempscore = miniMax(board, parseFloat(depth)+1, score);
                if(colorToMove === "red" && tempscore > tempscore2){
                    alert("7: tempscore " + tempscore + "tempscore2: " + tempscore2 + "depth: " + depth);

                    tempfrom = i;
                    tempto = parseFloat(i) + num4;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }
                else if(colorToMove === "black" && tempscore < tempscore2){
                    alert("8: tempscore " + tempscore + "tempscore2: " + tempscore2);

                    tempfrom = i;
                    tempto = parseFloat(i) + num4;
                    //alert("New tempscore: " + tempscore + " depth: " + depth + ", move from: " + tempfrom + " to: " + tempto);
                    tempscore2 = modifyScore(colorToMove, score, tempscore);
                }

                moveBack(parseFloat(i) + num4, i);
                updateBoardHTML();
            }

        }
        if(depth === 0 && i === 80){
            //attemptMove()
            alert("best possible score at 0 for " + colorToMove + ": " + tempscore);
            alert("best possible move for " + colorToMove + " : from : " + tempfrom + " to : " + tempto);
            alert("returning now");
            return (tempfrom + "-" + tempto);
        }

    }

    //alert("returning " + score);

    //alert("depth returns: " + depth);
    return score;
}

function miniMaxMove(board, from, to){
    board[to] = board[from];
    board[from] = emptyPiece;
    var dist = from - to;

    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        board[to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        board[to].king = "True";
    }

    if(Math.abs(dist) > 10){
        board[(from - Math.floor(dist/2))] = emptyPiece;  //remove jumped piece from board
        if(pieceHasJump(to)){
            var jumpsonly = 1; //will need to work with this to allow multiple jumps
        }
    }
    return board;
}

function miniMaxMoveBack(board, from, to){
    board[to] = board[from];
    board[from] = emptyPiece;
    var dist = from - to;

    if((to >= 10 && to <= 17) && game['board'][to].color === "black"){
        board[to].king = "True";
    }
    else if((to >= 73 && to <= 80) && game['board'][to].color === "red") {
        board[to].king = "True";
    }

    if(Math.abs(dist) > 10){
        if(board[from].color === "red" && board[(from - Math.floor(dist/2))].color === "none") {
            alert("here");
            board[(from - Math.floor(dist / 2))].color = "black";  //remove jumped piece from board
        }
        else if(board[from].color === "black" && board[(from - Math.floor(dist/2))].color === "none") {
            alert("here");
            board[(from - Math.floor(dist / 2))].color = "red";  //remove jumped piece from board
        }
    }
    return board;
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

function cpuTurn(){
    //"Merciless" AI jumps as many times as it can. If no jumps are available, it plays a regular move.
    var bestmove;
    bestmove = miniMax();
    alert("Bestmove: " + bestmove);
    if(bestmove !== 0){
        alert("Bestmove: " + bestmove);
        return true;
    }
    else if(merciless()){
        return true;
    }
    return false;
}

function updateBoardHTML2(board) {
    //Instantiate pieces on board
    for (var i = 10; i < 81; i++) {
        if((i % 9) !== 0){
            updateSquareHTML(board[i], i);
        }
    }
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
    //console.log(game);
}

$( document ).ready(function() {
    console.log(JSON.parse(sessionStorage.getItem('gameObj')));
});
