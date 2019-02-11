// use json file as website structure, then use a variable as current subnav
window.onload = function () {
    $.getJSON("https://drwhorx.github.io/strat2019/js/organize.json", function (data) {
        sessionStorage.setItem("data", data)
        var arr = ["Auton", "Teleop", "Endgame"]
        for (i = 0; i < arr.length; i++) {
            var keys = Object.keys(data[arr[i]])
            for (b = 0; b < keys.length; b++) {
                var element = document.createElement("input")
                element.setAttribute("type", "text")
                element.setAttribute("id", keys[b])
                element.width = "25px"
                element.height = "10px"
                element.style = "font-size: 8px; left: " + data[arr[i]][keys[b]].x + "px; top: " + data[arr[i]][keys[b]].y + "px; position: absolute"
                element.placeholder = keys[b]
                document.getElementById("items").appendChild(element)
            }
        }
    })
    setInterval(function checkPeriod() {
        var arr = ["Auton", "Teleop", "Endgame"]
        var i = arr.indexOf($("#gameStatus").val())
        document.getElementById(arr[i] + "Canvas").removeAttribute("hidden")
        arr.splice(i, 1)
        document.getElementById(arr[0] + "Canvas").hidden = true
        document.getElementById(arr[1] + "Canvas").hidden = true

        $.getJSON("https://drwhorx.github.io/strat2019/js/organize.json", function (data) {
            var status = $("#gameStatus").val()
            var children = document.getElementById("items").children
            for (i = 0; i < children.length; i++) {
                if (data[status][children[i].id] == undefined) {
                    children[i].hidden = true
                } else {
                    children[i].hidden = false
                }
            }
        })
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