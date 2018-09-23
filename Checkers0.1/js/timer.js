function timer(minutes){
    var now = new Date().getTime();
    var then = now + (minutes * 1000 * 60);
    var distance = then - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer2").innerHTML = minutes + ":0" + seconds;
    function tick(){
        if(seconds == 0){
            minutes--;
            seconds = 59;
        }
        else {
            seconds--;
        }
        if(seconds < 10){
            document.getElementById("timer2").innerHTML = minutes + ":0" + seconds;
        }
        else {
            document.getElementById("timer2").innerHTML = minutes + ":" + seconds;
        }
        if((minutes * 60) + seconds <= 0) {
            clearInterval(x);
            document.getElementById("timer2").innerHTML = "0:00";
        }
    }
    var x = setInterval(tick, 1000);
}