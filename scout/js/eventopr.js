function eventopr() {
    this.init = function () {
        var override = document.getElementById("override").value.split(", ")
        var event = sessionStorage.getItem("event")
        var keys = []
        addMes("\n\nEvent OPRS for " + TBAEvent(event).name)
        if (!override || override.length == 1) {
            keys = getEventTeamsKeys(event)
        } else {
            override.forEach(function (element) {
                keys.push("frc" + element)
            })
        }
        var evt = eventOPRS(event)
        var objects = Object.keys(evt.oprs)
        for (a = 0; a < objects.length; a++) {
            if (keys.indexOf(objects[a]) == -1) {
                delete evt.oprs[objects[a]]
                delete evt.dprs[objects[a]]
                delete evt.ccwms[objects[a]]
                a--
            }
        }
        teams = Object.keys(evt.oprs)
        var oprs = []
        for (i = 0; i < teams.length; i++) {
            oprs.push(evt.oprs[teams[i]])
        }
        var dprs = []
        for (i = 0; i < teams.length; i++) {
            dprs.push(evt.dprs[teams[i]])
        }
        var ccwms = []
        for (i = 0; i < teams.length; i++) {
            ccwms.push(evt.ccwms[teams[i]])
        }
        var ccCopy = ccwms.slice(0)
        var ccSort = ccCopy.sort((a, b) => {
            return b - a
        })
        var dpCopy = dprs.slice(0)
        var dpSort = dpCopy.sort((a, b) => {
            return b - a
        })
        var opCopy = oprs.slice(0)
        var opSort = opCopy.sort((a, b) => {
            return b - a
        })
        var output = [
            [],
            [],
            []
        ]
        ccSort.forEach(function (element) {
            var index = ccwms.indexOf(element)
            output[2].push("FRC " + keys[index].slice(3) + ": " + element)
        })
        dpSort.forEach(function (element) {
            var index = dprs.indexOf(element)
            output[1].push("FRC " + keys[index].slice(3) + ": " + element)
        })
        opSort.forEach(function (element) {
            var index = oprs.indexOf(element)
            output[0].push("FRC " + keys[index].slice(3) + ": " + element)
        })
        var exists = document.getElementsByClassName("table")
        if (exists.length > 0) {
            document.getElementById("extras").removeChild(document.getElementsByClassName("table").item(0))
        }
        document.getElementById("extras").removeChild(document.getElementById("event"))
        document.getElementById("extras").removeChild(document.getElementById("eventSub"))
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        side.innerHTML += '<p onclick="new eventopr().avginit()">Season Averages</p><p onclick="menu()">Menu</p>'
        document.getElementById("extras").appendChild(side)
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        tbl.innerHTML += "<th align=\"left\">OPRS</th><th align=\"left\">DPRS</th><th align=\"left\">CCWMS</th>"
        for (let i = 0; i < document.getElementById("limit").value; i++) {
            if (output[0][i] !== undefined) {
                var row = tbl.insertRow()
                for (b = 0; b < 3; b++) {
                    var td = row.insertCell()
                    var team = output[b][i].split(":")[0].slice(4)
                    td.innerText = "FRC " + team + ": " + (Math.floor((output[b][i]).split(": ")[1] * 1000) / 1000)
                    td.setAttribute("onmouseover", "hover('" + team + "')")
                    td.setAttribute("onclick", "clicked('" + team + "')")
                    td.setAttribute("team", team)
                }
            }
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
}