function teamseason() {
    this.init = function () {
        var year = document.getElementById("year").value
        var team = document.getElementById("team").value
        document.getElementById("extras").removeChild(document.getElementById("year"))
        document.getElementById("extras").removeChild(document.getElementById("team"))
        document.getElementById("yearVar").innerText = year
        document.getElementById("teamVar").innerText = team
        document.getElementById("extras").removeChild(document.getElementById("teamSub"))
        document.getElementById("extras").removeChild(document.getElementById("yearSub"))
        var events = getTeamEventListKeys(team, year)
        var output = {}
        var titles
        for (i = 0; i < events.length; i++) {
            var name = TBAEvent(events[i]).name
            var byTeam = getEventRankingsByTeam(events[i])
            var rankings = getEventRankings(events[i])
            if (rankings !== null && rankings !== undefined && rankings.rankings !== undefined && rankings.rankings.length > 0) {
                output[name] = byTeam["frc" + team]
                titles = Object.keys(byTeam["frc" + team])
            }
        }
        console.log(output)
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        var html = ""
        for (i = 0; i < titles.length; i++) {
            html += '<p onclick="new teamseason().item(\'' + titles[i] + '\')">' + titles[i] +
                '</p>'
        }
        html += '<p onclick="new teamseason().general()">General</p>'
        html += '<p onclick="menu()">Menu</p>'
        side.innerHTML += html
        document.getElementById("extras").appendChild(side)
        document.getElementById("rankingsVar").innerText = JSON.stringify(output)
    }

    this.general = function () {
        var rankings = JSON.parse(document.getElementById("rankingsVar").innerText)
        var events = Object.keys(rankings)
        console.log(events)
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        var titles = Object.keys(rankings[events[0]])
        for (a = 0; a < events.length; a++) {
            var heading = "<tr><th align=\"left\"></th><th align=\"left\">" + events[a] + "</th></tr>"
            tbl.innerHTML += heading
            for (i = 0; i < titles.length; i++) {
                var row = tbl.insertRow()
                var title = row.insertCell()
                title.innerText = titles[i]
                var item = row.insertCell()
                item.innerText = rankings[events[a]][titles[i]]
            }
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }

    this.item = function (title) {

    }
}