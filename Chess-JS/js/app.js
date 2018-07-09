var gameState;


function select(coords){
    alert(coords);
}


function updateBoard(gameState){
    document.getElementById("infobox").innerHTML = gameState.name;
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
            $.getJSON("../src/state", function( json ) {
                gameState = json;
            })
                .done(function () {
                    alert("Success");
                    document.getElementById("infobox").innerHTML = gameState.name;
                    updateBoard(gameState);
                })
                .fail(function (d, textStatus, error) {
                    alert("Fail");
                    console.error("getJSON failed, status: " + textStatus + ", error: "+error)
                })
            ;
        }
    };

    xmlhttp.open("POST", "alterstate.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("name=Joel");
}

function setupGame(){
    var state = {turn:"0"};
}


//triggers on load. Gets state from ../src/state
$( document ).ready(function() {
    $.getJSON("../src/state", function( json ) {
        gameState = json;
        console.log( "JSON Data: " + json );
    })
        .done(function () {
            alert("Get gamestate on load success");
            document.getElementById("infobox").innerHTML=gameState.name;
        })
        .fail( function(d, textStatus, error) {
            alert("Get gamestate on load failed");
            console.error("getJSON failed, status: " + textStatus + ", error: "+error)
        })
        .always(function () {
        })
    ;
});