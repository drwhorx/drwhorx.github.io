// use json file as website structure, then use a variable as current subnav
window.onload = function () {
    var data = $.getJSON("https://drwhorx.github.io/strat2019/js/organize.json")
    console.log(data.responseJSON)
    setInterval(function checkPeriod() {
        var arr = ["Auton", "Teleop", "Endgame"]
        var i = arr.indexOf($("#gameStatus").val())
        document.getElementById(arr[i] + "Canvas").removeAttribute("hidden")
        arr.splice(i, 1)
        document.getElementById(arr[0] + "Canvas").hidden = true
        document.getElementById(arr[1] + "Canvas").hidden = true
    }, 100)
}
function color(obj) {
    sessionStorage.setItem("color", obj.id)
}
function initDraw() {
    const ctx = []
    const canvas = []
    const arr = ["Auton", "Teleop", "Endgame"]
    for (i = 0; i < arr.length; i++) {
        var element = document.querySelector("#" + arr[i] + "Canvas");
        element.width = window.innerWidth;
        element.height = window.innerHeight;
        canvas[i] = element
        ctx[i] = element.getContext('2d');
        ctx[i].lineJoin = 'round';
        ctx[i].lineCap = 'round';
        ctx[i].lineWidth = 5;
        ctx[i].strokeStyle = "black";
    }

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        if (!isDrawing) return;
        var i = arr.indexOf($("#gameStatus").val())
        ctx[i].beginPath();
        ctx[i].moveTo(lastX, lastY);
        ctx[i].lineTo(e.offsetX, e.offsetY);
        ctx[i].stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    for (i = 0; i < canvas.length; i++) {
        canvas[i].addEventListener('mousedown', (e) => {
            var i = arr.indexOf($("#gameStatus").val())
            ctx[i].strokeStyle = sessionStorage.getItem("color");
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        canvas[i].addEventListener('mousemove', draw);
        canvas[i].addEventListener('mouseup', () => isDrawing = false);
        canvas[i].addEventListener('mouseout', () => isDrawing = false);
    }
}