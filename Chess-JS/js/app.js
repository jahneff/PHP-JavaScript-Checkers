var gameState;


function select(coords){
    document.getElementById(coords).style.backgroundColor = "green";
    if(document.getElementById("moveFromCoords").value == "null") {
        document.getElementById("moveFromCoords").value = coords;
    }
    else {
        document.getElementById("moveToCoords").value = coords;
    }
}


function updateBoard(gameState){
    //document.getElementById("infobox").innerHTML = gameState.name;
    var output = '';
    for (var property in gameState) {
        alert(property);
        alert(gameState[property]);
        document.getElementById(property).innerHTML = gameState[property];
    }
}

function move(){
    var moveFromCoords = document.getElementById("moveFromCoords").value;
    alert("from" + moveFromCoords);
    var moveToCoords = document.getElementById("moveToCoords").value;
    alert("to" + moveToCoords);
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
                gameState = json;
            })
                .done(function () {
                    alert("Success");
                    //document.getElementById("infobox").innerHTML = gameState.name;
                    updateBoard(gameState);
                })
                .fail(function (d, textStatus, error) {
                    alert("Fail");
                    console.error("getJSON failed, status: " + textStatus + ", error: "+error)
                })
            ;
        }
    };

    xmlhttp.open("POST", "../src/alterstate.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=Joel&turn=1");
}

function setupGame(){
    var state = {turn:"0"};
}


//triggers on load. Gets state from ../src/state
$( document ).ready(function() {
    $.getJSON("../src/state.txt", function( json ) {
        gameState = json;
        console.log( "JSON Data: " + json );
    })
        .done(function () {
            alert("Get gamestate on load success");
        })
        .fail( function(d, textStatus, error) {
            alert("Get gamestate on load failed");
            console.error("getJSON failed, status: " + textStatus + ", error: "+error)
        })
        .always(function () {
        })
    ;
    $('')
});