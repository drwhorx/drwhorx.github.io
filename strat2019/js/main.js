window.onload = function () {
    var nodes = $("body").find("*")
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("print") == true) {
            nodes[i].setAttribute("theme", "Light")
        } else {
            nodes[i].setAttribute("theme", "Dark")
        }
    }
    document.body.setAttribute("theme", "Dark")
    sessionStorage.setItem("data", JSON.stringify(data))
    document.getElementById("blueStats").value = ""
    document.getElementById("redStats").value = ""
    document.getElementById("match_type").children[0].selected = true
    document.getElementById("theme").children[0].selected = true
    document.getElementById("num1").value = ""
    for (i = 1; i < 4; i++) {
        document.getElementById("bbot" + i).value = ""
        document.getElementById("rbot" + i).value = ""
    }
    document.getElementById("event").value = ""
    const arr = Object.keys(data)
    for (i = 0; i < arr.length; i++) {
        var keys = Object.keys(data[arr[i]])
        for (b = 0; b < keys.length; b++) {
            var element = document.createElement("input")
            var cat = arr[i]
            var title = keys[b]
            element.setAttribute("type", "text")
            element.setAttribute("cat", cat)
            element.setAttribute("ally", "Red")
            element.width = "25px"
            element.height = "10px"
            element.style = "left: " + data[cat][title].x + "px; top: " + data[cat][title].y + "px;"
            element.placeholder = title
            document.getElementById("items").appendChild(element)

            element = document.createElement("input")
            element.setAttribute("type", "text")
            element.setAttribute("cat", cat)
            element.setAttribute("ally", "Blue")
            element.width = "25px"
            element.height = "10px"
            element.style = "right: " + data[cat][title].x + "px; top: " + data[cat][title].y + "px;"
            element.placeholder = title
            document.getElementById("items").appendChild(element)

            element = document.createElement("input")
            element.setAttribute("type", "text")
            element.value = "(Percentile)"
            element.setAttribute("percentile", true)
            element.style = "left: " + data[cat][title].x + "px; top: " + data[cat][title].y + "px;"
            element.setAttribute("cat", cat)
            element.setAttribute("item", title)
            element.hidden = true
            element.placeholder = title
            document.getElementById("items").appendChild(element)
        }
    }
    document.getElementById("print").hidden = true
    setInterval(function checkPeriod() {
        var arr = Object.keys(JSON.parse(sessionStorage.getItem("data")))
        var i = arr.indexOf($("#gameStatus").val())
        if ($("#alliance").val() == "Add Data") {
            document.getElementById("DataCanvas").removeAttribute("hidden")
            arr.forEach(function (element) {
                document.getElementById(element + "Canvas").hidden = true
            })

            for (let element of document.getElementsByClassName("RedBot")) {
                element.hidden = true
            }
            for (let element of document.getElementsByClassName("BlueBot")) {
                element.hidden = true
            }
            document.getElementById("calculate").hidden = true

            document.getElementById("dataBot").hidden = false
            document.getElementById("submit").hidden = false
        } else {
            document.getElementById(arr[i] + "Canvas").removeAttribute("hidden")
            arr.splice(i, 1)
            document.getElementById(arr[0] + "Canvas").hidden = true
            document.getElementById(arr[1] + "Canvas").hidden = true
            document.getElementById("DataCanvas").hidden = true

            for (let element of document.getElementsByClassName("RedBot")) {
                element.hidden = false
            }
            for (let element of document.getElementsByClassName("BlueBot")) {
                element.hidden = false
            }
            document.getElementById("calculate").hidden = false

            document.getElementById("dataBot").hidden = true
            document.getElementById("submit").hidden = true
        }
        var status = $("#gameStatus").val()
        var children = document.getElementById("items").children
        var exp = {}
        for (i = 0; i < children.length; i++) {
            children[i].removeAttribute("width")
            children[i].removeAttribute("height")
            if (children[i].getAttribute("cat") == status && ((children[i].getAttribute("percentile") == "true" && $("#alliance").val() == "Add Data") || $("#alliance").val() == children[i].getAttribute("ally"))) {
                children[i].hidden = false
            } else {
                children[i].hidden = true
            }
        }
        if ($("#match_type").val() == "_q" && document.getElementById("num2").hidden != true) {
            var val = $("#num2").val()
            document.getElementById("match_num").innerHTML = "<input value=\"" + val + "\" type=\"text\" id=\"num2\" placeholder=\"#\" hidden><button id=\"search\" onclick=\"search()\" style=\"width: 60px\">Search!</button>"
            document.getElementById("shifted").innerHTML = ""
        } else if ($("#match_type").val() != "_q" && document.getElementById("num2").hidden == true) {
            var val = $("#num2").val()
            document.getElementById("match_num").innerHTML = "<input value=\"" + val + "\" type=\"text\" id=\"num2\" placeholder=\"#\">"
            document.getElementById("shifted").innerHTML = "<button id=\"search\" onclick=\"search()\" style=\"width: 60px\">Search!</button>"
        }

        var nodes = $("body").find("*")
        if (nodes[0].getAttribute("theme") != document.getElementById("theme").value) {
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute("print") == true) {
                    nodes[i].setAttribute("theme", "Light")
                } else {
                    nodes[i].setAttribute("theme", document.getElementById("theme").value)
                }
            }
            document.body.setAttribute("theme", document.getElementById("theme").value)
        }


    }, 100)
}
function print() {
    var children = document.getElementById("items").children
    for (i = 0; i < children.length; i++) {
        if (children[i].getAttribute("percentile") == "true") continue;
        var canvas = document.getElementById(children[i].getAttribute("ally") + children[i].getAttribute("cat") + "Canvas")
        var ctx = canvas.getContext("2d")
        ctx.fillStyle = children[i].getAttribute("ally").toLowerCase()
        var x = children[i].getAttribute("ally") == "Red" ? parseInt(children[i].style.left.replace("px", "")) : (canvas.width - children[i].style.right.replace("px", "") - 150)
        ctx.fillRect(x, parseInt(children[i].style.top.replace("px", "")) + 2, 150, 25)

        ctx = canvas.getContext("2d")
        ctx.font = "14px Arial";
        ctx.fillStyle = "#000000"
        ctx.textAlign = "start"
        ctx.fillText(children[i].value, x + 5, parseInt(children[i].style.top.replace("px", "")) + 20)

        ctx = canvas.getContext("2d")
        ctx.font = "20px Arial";
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.fillText(children[i].getAttribute("ally") + "- " + children[i].getAttribute("cat"), canvas.width / 2, 25)

        if (children[i].value == "") {
            ctx = canvas.getContext("2d")
            ctx.font = "14px Arial";
            ctx.fillStyle = "#333333"
            ctx.textAlign = "start"
            ctx.fillText(children[i].placeholder, x + 5, parseInt(children[i].style.top.replace("px", "")) + 20)
        }
    }
    document.getElementById("print").hidden = false
    var opts = {
        filename: 'test.pdf',
        image: {
            type: 'jpeg',
            quality: 1
        },
        html2canvas: {
            scale: 3
        },
        jsPDF: {
            unit: 'mm',
            format: [canvas.width / 4, canvas.height * 1.5 + 20],
            orientation: 'portrait'
        }
    }
    html2pdf().from(document.getElementById("print")).set(opts).save()
    setTimeout(function myFunction() {
        document.getElementById("print").hidden = true
    }, 3000)
}
function search() {
    var match = $("#event").val() + $("#match_type").val() + ($("#num2").val() == "" ? "m" + $("#num1").val() : $("#num1").val() + "m" + $("#num2").val())
    var event = $("#event").val()
    var type = ($("#match_type").val() == "_q" ? "qual" : "playoff")
    var predict = eventPredict(event)
    var stats = getMatch(match)
    if (predict == undefined) {
        alert("That event does not exist!")
        return
    } else if (stats == undefined) {
        alert("That match does not exist!")
        return
    }
    var blue = predict.match_predictions[type][match].blue
    var red = predict.match_predictions[type][match].red
    var keys = Object.keys(blue)
    for (i = 0; i < keys.length; i++) {
        document.getElementById("blueStats").value += ((filter[keys[i]] == undefined ? keys[i] : filter[keys[i]]) + ": " + blue[keys[i]] + "\n\n")
        document.getElementById("redStats").value += ((filter[keys[i]] == undefined ? keys[i] : filter[keys[i]]) + ": " + red[keys[i]] + "\n\n")
    }
    for (i = 0; i < stats.alliances.blue.team_keys.length; i++) {
        document.getElementById("bbot" + (i + 1)).value = stats.alliances.blue.team_keys[i].slice(3)
    }
    for (i = 0; i < stats.alliances.red.team_keys.length; i++) {
        document.getElementById("rbot" + (i + 1)).value = stats.alliances.red.team_keys[i].slice(3)
    }
}
function submit() {
    var children = document.getElementById("items").children
    var out = {}
    var coll = JSON.parse(localStorage.getItem("coll"))
    for (i = 0; i < children.length; i++) {
        if (children[i].getAttribute("percentile") == "true") {
            if (out[children[i].getAttribute("cat")] == undefined) {
                out[children[i].getAttribute("cat")] = {}
            }
            out[children[i].getAttribute("cat")][children[i].getAttribute("item")] = children[i].value
            children[i].value = "(Percentile)"
        }
    }
    coll[$("#dataBot").val()] = out
    localStorage.setItem("coll", JSON.stringify(coll))
    alert("Data submitted for team " + $("#dataBot").val() + "!")
    document.getElementById("dataBot").value = ""
}
function calculate() {
    var coll = JSON.parse(localStorage.getItem("coll"))
    var data = JSON.parse(sessionStorage.getItem("data"))
    var arr = Object.keys(data)
    var rTeams = []
    var bTeams = []
    var err = false
    for (i = 1; i < 4; i++) {
        var team = $("#rbot" + i).val()
        if (team == "") {
            alert("You have not stated Red Robot " + i + "!")
            err = true
        }
        rTeams.push(team)
    }
    for (i = 1; i < 4; i++) {
        var team = $("#bbot" + i).val()
        if (team == "") {
            alert("You have not stated Blue Robot " + i + "!")
            err = true
        }
        bTeams.push(team)
    }
    if (err) return;
    var children = document.getElementById("items").children
    for (i = 0; i < children.length; i++) {
        if (children[i].getAttribute("percentile") == "true") continue;
        var cat = children[i].getAttribute("cat")
        var title = children[i].placeholder
        var scores = []
        var teamCopy = []
        var sorted = []
        var useArr = children[i].getAttribute("ally") == "Red" ? rTeams : bTeams
        for (a = 0; a < useArr.length; a++) {
            if (coll[useArr[a]] == undefined) continue;
            var val = coll[useArr[a]][cat][title]
            val = val.slice(0, 1)
            if (parseInt(val) != val) continue;
            scores.push(coll[useArr[a]][cat][title])
            sorted.push(coll[useArr[a]][cat][title])
            teamCopy.push(useArr[a])
        }
        sorted.sort(function (a, b) {
            return b - a;
        })
        var out = []
        for (a = 0; a < 3; a++) {
            if (sorted[0] == undefined) continue;
            out.push(teamCopy[scores.indexOf(sorted[0])] + ": " + sorted[0].slice(0, 1))
            teamCopy.splice(scores.indexOf(sorted[0]), 1)
            scores.splice(scores.indexOf(sorted[0]), 1)
            sorted.splice(0, 1)
        }
        children[i].value = out.join(", ")
    }
}
function color(obj) {
    sessionStorage.setItem("color", obj.id)
}
function initDraw() {
    const ctx = []
    const blue_ctx = []
    const red_ctx = []
    const canvas = []
    const blue_canvas = []
    const red_canvas = []
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

        element = document.querySelector("#Blue" + arr[i] + "Canvas");
        element.width = window.innerWidth;
        element.height = window.innerHeight;
        blue_canvas[i] = element
        blue_ctx[i] = element.getContext('2d');
        blue_ctx[i].lineJoin = 'round';
        blue_ctx[i].lineCap = 'round';
        blue_ctx[i].lineWidth = 5;
        blue_ctx[i].strokeStyle = "black";

        element = document.querySelector("#Red" + arr[i] + "Canvas");
        element.width = window.innerWidth;
        element.height = window.innerHeight;
        red_canvas[i] = element
        red_ctx[i] = element.getContext('2d');
        red_ctx[i].lineJoin = 'round';
        red_ctx[i].lineCap = 'round';
        red_ctx[i].lineWidth = 5;
        red_ctx[i].strokeStyle = "black";
    }

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        if (!isDrawing || $("#alliance").val() == "Add Data") return;
        var i = arr.indexOf($("#gameStatus").val())
        if (sessionStorage.getItem("color") != "white") {
            ctx[i].globalCompositeOperation = "source-over";
            ctx[i].beginPath();
            ctx[i].moveTo(lastX, lastY);
            ctx[i].lineTo(e.offsetX, e.offsetY);
            ctx[i].stroke();

            blue_ctx[i].globalCompositeOperation = "source-over";
            blue_ctx[i].beginPath();
            blue_ctx[i].moveTo(lastX, lastY);
            blue_ctx[i].lineTo(e.offsetX, e.offsetY);
            blue_ctx[i].stroke();

            red_ctx[i].globalCompositeOperation = "source-over";
            red_ctx[i].beginPath();
            red_ctx[i].moveTo(lastX, lastY);
            red_ctx[i].lineTo(e.offsetX, e.offsetY);
            red_ctx[i].stroke();
        } else {
            ctx[i].globalCompositeOperation = "destination-out";
            ctx[i].beginPath();
            ctx[i].arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false);
            ctx[i].fill();

            blue_ctx[i].globalCompositeOperation = "destination-out";
            blue_ctx[i].beginPath();
            blue_ctx[i].arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false);
            blue_ctx[i].fill();

            red_ctx[i].globalCompositeOperation = "destination-out";
            red_ctx[i].beginPath();
            red_ctx[i].arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2, false);
            red_ctx[i].fill();
        }

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    for (i = 0; i < canvas.length; i++) {
        canvas[i].addEventListener('mousedown', (e) => {
            var i = arr.indexOf($("#gameStatus").val())
            ctx[i].strokeStyle = sessionStorage.getItem("color");
            blue_ctx[i].strokeStyle = sessionStorage.getItem("color");
            red_ctx[i].strokeStyle = sessionStorage.getItem("color");
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });
        canvas[i].addEventListener('mousemove', draw);
        canvas[i].addEventListener('mouseup', () => isDrawing = false);
        canvas[i].addEventListener('mouseout', () => isDrawing = false);
    }
}