var gameState;


function select(coords){
    if(document.getElementById("moveFromCoords").value == "null") {
            document.getElementById(coords).style.backgroundColor = "green";
            document.getElementById("moveFromCoords").value = coords;
    }
    else {
        if(document.getElementById("moveFromCoords").value == coords){
            document.getElementById(coords).style.backgroundColor = "white";
            document.getElementById("moveFromCoords").value = "null";
            document.getElementById(document.getElementById("moveToCoords").value).style.backgroundColor = "white";
            document.getElementById("moveToCoords").value = "null";
        }
        else if(document.getElementById("moveToCoords").value == coords) {
            document.getElementById(coords).style.backgroundColor = "white";
            document.getElementById("moveToCoords").value = "null";
        }
        else {
            if(document.getElementById("moveToCoords").value != "null") {
                document.getElementById(document.getElementById("moveToCoords").value).style.backgroundColor = "white";
            }
            document.getElementById(coords).style.backgroundColor = "orange";
            document.getElementById("moveToCoords").value = coords;
        }
    }
}


function updateBoard(gameState){
    var output = '';
    for (var property in gameState) {
        document.getElementById(property).innerHTML = gameState[property];
    }
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
    var moveFromCoords = document.getElementById("moveFromCoords").value;
    var moveToCoords = document.getElementById("moveToCoords").value;
    alert("from" + moveFromCoords + "to" + moveToCoords);


    xmlhttp.open("POST", "../src/alterstate.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
//    xmlhttp.send("name=Joel&turn=1");

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