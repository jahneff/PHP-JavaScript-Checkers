function createNewGameObject(){
    var game = {red: {pieceslost: 0, winner: false}, black: {pieceslost: 0, winner: false}, board:[], tempboard:[], turn: 1, jumpsonly: 0, squaretomove: 0, selected: null};
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

function test01NormalMove(){
    createNewGameObject();
    select(62);
    select(52);
    var game = JSON.parse(sessionStorage.getItem('gameObj'));
    if(game['board'][52].color === "black" && game['board'][52].king === "false" &&
        game['board'][62].color === "none" && game['board'][62].king === "false"){
        document.getElementById("test_01").innerHTML = "Test one PASSED, move from 62 to 52";
        return true;
    }
    else{
        document.getElementById("test_01").innerHTML = "Test one Failed, move from 62 to 52";
    }

}