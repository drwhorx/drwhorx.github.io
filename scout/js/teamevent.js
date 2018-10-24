function teamevent() {
    this.init = function () {
        var event = document.getElementById("event").value
        var team = document.getElementById("team").value
        addMes("\n\nTeam stats for " + team + " at " + TBAEvent(event).name)
        document.getElementById("extras").removeChild(document.getElementById("event"))
        document.getElementById("extras").removeChild(document.getElementById("team"))
        var rankings = getEventRankingsByTeam(event)["frc" + team]
        sessionStorage.setItem("rankings", JSON.stringify(rankings))
        var titles = Object.keys(rankings)
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        var html = ""
        for (i = 0; i < titles.length; i++) {
            html += '<p onclick="new teamevent().item(\'' + titles[i] + '\')">' + titles[i] +
                '</p>'
        }
        html += '<p onclick="new teamevent().general()">General</p>'
        html += '<p onclick="menu()">Menu</p>'
        side.innerHTML += html
        document.getElementById("extras").appendChild(side)
        document.getElementById("extras").removeChild(document.getElementById("teamSub"))
        document.getElementById("extras").removeChild(document.getElementById("eventSub"))
    }
    this.item = function (title) {
        var rankings = JSON.parse(sessionStorage.getItem("rankings"))
        var team = sessionStorage.getItem("team")
        var exists = document.getElementsByClassName("table")
        if (exists.length > 0) {
            document.getElementById("extras").removeChild(document.getElementsByClassName("table").item(0))
        }
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        var heading = "<tr><th align=\"left\"></th><th align=\"left\">" + team + "</th></tr>"
        tbl.innerHTML += heading
        var row = tbl.insertRow()
        var td = row.insertCell()
        td.innerText = title
        var item = row.insertCell()
        item.innerText = rankings[title]
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
    this.general = function () {
        var rankings = JSON.parse(sessionStorage.getItem("rankings"))
        var team = sessionStorage.getItem("team")
        var exists = document.getElementsByClassName("table")
        if (exists.length > 0) {
            document.getElementById("extras").removeChild(document.getElementsByClassName("table").item(0))
        }
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        var heading = "<tr><th align=\"left\"></th><th align=\"left\">" + team + "</th></tr>"
        tbl.innerHTML += heading
        var titles = Object.keys(rankings)
        for (i = 0; i < titles.length; i++) {
            var row = tbl.insertRow()
            var title = row.insertCell()
            title.innerText = titles[i]
            var item = row.insertCell()
            item.innerText = rankings[titles[i]]
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
}