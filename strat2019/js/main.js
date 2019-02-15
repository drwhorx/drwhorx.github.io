window.onload = function () {
    var nodes = $("body").find("*")
    for (i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute("theme", "Dark")
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

            element = document.createElement("select")
            element.innerHTML = "<option>" + title + "</option><option>1 - Poor</option><option>2</option><option>3</option><option>4</option><option>5 - Excellent</option>"
            element.style = "left: " + data[cat][title].x + "px; top: " + data[cat][title].y + "px;"
            element.setAttribute("cat", cat)
            element.setAttribute("item", title)
            element.hidden = true
            document.getElementById("items").appendChild(element)
        }
    }
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
        for (i = 0; i < children.length; i++) {
            children[i].removeAttribute("width")
            children[i].removeAttribute("height")
            var isAddData = $("#alliance").val() == "Add Data" ? "SELECT" : "INPUT"
            if (children[i].getAttribute("cat") == status && ((children[i].tagName == "SELECT" && $("#alliance").val() == "Add Data") || $("#alliance").val() == children[i].getAttribute("ally"))) {
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
                nodes[i].setAttribute("theme", document.getElementById("theme").value)
            }
            document.body.setAttribute("theme", document.getElementById("theme").value)
        }
    }, 100)
}
function search() {
    var match = $("#event").val() + $("#match_type").val() + ($("#num2").val() == "" ? "m" + $("#num1").val() : $("#num1").val() + "m" + $("#num2").val())
    var event = $("#event").val()
    var type = ($("#match_type").val() == "_q" ? "qual" : "playoff")
    var predict = eventPredict(event)
    var stats = getMatch(match)
    var blue = predict.match_predictions[type][match].blue
    var red = predict.match_predictions[type][match].red
    var keys = Object.keys(blue)
    document.getElementById("blueStats").value = ""
    document.getElementById("redStats").value = ""
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
        if (children[i].tagName == "SELECT") {
            var opts = children[i].children
            for (a = 0; a < opts.length; a++) {
                if (opts[a].selected == true) {
                    if (out[children[i].getAttribute("cat")] == undefined) {
                        out[children[i].getAttribute("cat")] = {}
                    }
                    out[children[i].getAttribute("cat")][children[i].getAttribute("item")] = opts[a].textContent
                }
            }
            opts[0].selected = true;
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
        if (children[i].tagName == "SELECT") continue;
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
        if (!isDrawing || $("#alliance").val() == "Add Data") return;
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