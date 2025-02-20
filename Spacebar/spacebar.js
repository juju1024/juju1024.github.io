let spacePressed = false;
let seconds = 0;
let interval;

document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        if (spacePressed == false) {
            spacePressed = true;
            document.getElementById("time").innerHTML = "Counting...";
            interval = setInterval(() => seconds++, 1000);
        } else {
            spacePressed = false;
            clearInterval(interval);
            if (seconds == 1) {
                document.getElementById("time").innerHTML = seconds + " second";
            } else {document.getElementById("time").innerHTML = seconds + " seconds";}
            seconds = 0;
        }
    }
};
