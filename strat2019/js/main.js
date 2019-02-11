// use json file as website structure, then use a variable as current subnav
const data = {
    "Sandstorm": {
        "Level 2 Start (1)": {
            "x": 290,
            "y": 250,
            "opts": []
        },
        "Level 2 Start (2)": {
            "x": 290,
            "y": 377,
            "opts": []
        },
        "Level 1 Start (1)": {
            "x": 350,
            "y": 272,
            "opts": []
        },
        "Level 1 Start (2)": {
            "x": 350,
            "y": 313,
            "opts": []
        },
        "Level 1 Start (3)": {
            "x": 350,
            "y": 355,
            "opts": []
        },
        "Rocket 1": {
            "x": 510,
            "y": 130,
            "opts": []
        },
        "Rocket 2": {
            "x": 510,
            "y": 499,
            "opts": []
        },
        "Cargo Ship": {
            "x": 565,
            "y": 313,
            "opts": []
        }
    },
    "Teleop": {
        "Rocket 1": {
            "x": 510,
            "y": 130,
            "opts": []
        },
        "Rocket 2": {
            "x": 510,
            "y": 499,
            "opts": []
        },
        "Cargo Ship": {
            "x": 565,
            "y": 313,
            "opts": []
        },
        "Defense": {
            "x": 850,
            "y": 313,
            "opts": []
        }
    },
    "Endgame": {
        "Rocket 1": {
            "x": 510,
            "y": 130,
            "opts": []
        },
        "Rocket 2": {
            "x": 510,
            "y": 499,
            "opts": []
        },
        "Cargo Ship": {
            "x": 565,
            "y": 313,
            "opts": []
        },
        "Defense": {
            "x": 850,
            "y": 313,
            "opts": []
        },
        "Level 3 Climb": {
            "x": 290,
            "y": 303,
            "opts": []
        },
        "Level 2 Climb (1)": {
            "x": 290,
            "y": 250,
            "opts": []
        },
        "Level 2 Climb (2)": {
            "x": 290,
            "y": 377,
            "opts": []
        },
        "Level 1 End (1)": {
            "x": 350,
            "y": 272,
            "opts": []
        },
        "Level 1 End (2)": {
            "x": 350,
            "y": 323,
            "opts": []
        },
        "Level 1 End (3)": {
            "x": 350,
            "y": 355,
            "opts": []
        },
    }
}
window.onload = function () {
    sessionStorage.setItem("data", JSON.stringify(data))
    const arr = Object.keys(data)
    for (i = 0; i < arr.length; i++) {
        var keys = Object.keys(data[arr[i]])
        for (b = 0; b < keys.length; b++) {
            var element = document.createElement("input")
            element.setAttribute("type", "text")
            element.setAttribute("cat", arr[i])
            element.width = "25px"
            element.height = "10px"
            element.style = "left: " + data[arr[i]][keys[b]].x + "px; top: " + data[arr[i]][keys[b]].y + "px;"
            element.placeholder = keys[b]
            document.getElementById("items").appendChild(element)
        }
    }
    setInterval(function checkPeriod() {
        var arr = Object.keys(JSON.parse(sessionStorage.getItem("data")))
        var i = arr.indexOf($("#gameStatus").val())
        document.getElementById(arr[i] + "Canvas").removeAttribute("hidden")
        arr.splice(i, 1)
        document.getElementById(arr[0] + "Canvas").hidden = true
        document.getElementById(arr[1] + "Canvas").hidden = true
        var status = $("#gameStatus").val()
        var children = document.getElementById("items").children
        var align = ($("#alliance").val() == "Red" ? "left: " : "right: ")
        var opp = (align == "left: " ? "right: " : "left: ")
        for (i = 0; i < children.length; i++) {
            children[i].removeAttribute("width")
            children[i].removeAttribute("height")
            if (children[i].getAttribute("style").indexOf(align) == -1) {
                children[i].setAttribute("style", children[i].getAttribute("style").replace(opp, align))
            }
            if (children[i].getAttribute("cat") != status) {
                children[i].hidden = true
            } else {
                children[i].hidden = false
            }
        }
    }, 100)
}
function color(obj) {
    sessionStorage.setItem("color", obj.id)
}
function initDraw() {
    const ctx = []
    const canvas = []
    const arr = Object.keys(JSON.parse(sessionStorage.getItem("data")))
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