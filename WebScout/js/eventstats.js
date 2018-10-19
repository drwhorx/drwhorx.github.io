function eventstats() {
    this.init = function () {
        var checkbox = document.getElementById("non?").checked
        var event
        var titles = []
        var rankings
        if (checkbox == false) {
            document.getElementById("eventVar").innerText = document.getElementById("event").value
            event = document.getElementById("eventVar").innerText
            document.getElementById("extras").removeChild(document.getElementById("event"))
            document.getElementById("extras").removeChild(document.getElementById("eventSub"))
            rankings = getEventRankings(event)
            if (rankings !== null && rankings.rankings !== undefined && rankings.rankings.length !== 0) {
                rankings.sort_order_info.forEach(function (element) {
                    titles.push(element.name)
                })
                document.getElementById("rankingsVar").innerText = JSON.stringify(rankings)
            }
        }
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        var html = ""
        if (checkbox == false) {
            for (i = 0; i < titles.length; i++) {
                html += '<p onclick="new eventstats().item(\'' + titles[i] + '\')">' + titles[i] +
                    '</p>'
            }
            html += '<p onclick="new eventstats().general()">General</p>'
        }
        html += '<p onclick="new eventstats().avgInit()">Season Averages</p>'
        html += '<p onclick="menu()">Menu</p>'
        side.innerHTML += html
        document.getElementById("extras").appendChild(side)
        var override = document.getElementById("override").value.split(", ")
    }
    this.item = function (title) {
        var override = document.getElementById("override").value.split(", ")
        var rankings = JSON.parse(document.getElementById("rankingsVar").innerText)
        var event = document.getElementById("eventVar").innerText
        var keys = []
        if (!override || override.length == 1) {
            keys = getEventTeamsKeys(event)
        } else {
            override.forEach(function (element) {
                keys.push("frc" + element)
            })
        }
        for (a = 0; a < rankings.rankings.length; a++) {
            if (keys.indexOf(rankings.rankings[a].team_key) == -1) {
                rankings.rankings.splice(a, 1)
                a--
            }
        }
        var titles = []
        rankings.sort_order_info.forEach(function (element) {
            titles.push(element.name)
        })
        var exists = document.getElementsByClassName("table")
        if (exists.length > 0) {
            document.getElementById("extras").removeChild(document.getElementsByClassName("table").item(0))
        }
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        tbl.innerHTML += "<th align=\"left\">" + title + "</th>"
        var index = titles.indexOf(title)
        var teams = []
        var values = []
        rankings.rankings.forEach(function (element) {
            teams.push(element.team_key.slice(3))
            values.push(element.sort_orders[index])
        })
        var sorted = values.slice(0)
        sorted.sort(function (a, b) {
            return b - a;
        });
        var arr = []
        for (i = 0; i < document.getElementById("limit").value; i++) {
            if (sorted[i] !== undefined) {
                var val = sorted[i]
                var index = values.indexOf(val)
                arr.push('FRC ' + teams[index] + ': ' + val)
                teams.splice(index, 1)
                values.splice(index, 1)
            }
        }
        for (i = 0; i < arr.length; i++) {
            var row = tbl.insertRow()
            var td = row.insertCell()
            td.innerText = arr[i]
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
    this.general = function () {
        var override = document.getElementById("override").value.split(", ")
        var rankings = JSON.parse(document.getElementById("rankingsVar").innerText)
        var event = document.getElementById("eventVar").innerText
        var keys = []
        if (!override || override.length == 1) {
            keys = getEventTeamsKeys(event)
        } else {
            override.forEach(function (element) {
                keys.push("frc" + element)
            })
        }
        for (a = 0; a < rankings.rankings.length; a++) {
            if (keys.indexOf(rankings.rankings[a].team_key) == -1) {
                rankings.rankings.splice(a, 1)
                a--
            }
        }
        var titles = []
        rankings.sort_order_info.forEach(function (element) {
            titles.push(element.name)
        })
        var exists = document.getElementsByClassName("table")
        if (exists.length > 0) {
            document.getElementById("extras").removeChild(document.getElementsByClassName("table").item(0))
        }
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        var heading = "<tr>"
        for (a = 0; a < titles.length; a++) {
            heading += ("<th align=\"left\">" + titles[a] + "</th>")
        }
        tbl.innerHTML += heading
        var output = []
        for (a = 0; a < titles.length; a++) {
            var teams = []
            var values = []
            rankings.rankings.forEach(function (element) {
                teams.push(element.team_key.slice(3))
                values.push(element.sort_orders[a])
            })
            var sorted = values.slice(0)
            sorted.sort(function (a, b) {
                return b - a;
            });
            var arr = []
            for (i = 0; i < document.getElementById("limit").value; i++) {
                if (sorted[i] !== undefined) {
                    var val = sorted[i]
                    var index = values.indexOf(val)
                    arr.push('FRC ' + teams[index] + ': ' + val)
                    teams.splice(index, 1)
                    values.splice(index, 1)
                }
            }
            output.push(arr)
        }
        for (a = 0; a < document.getElementById("limit").value; a++) {
            if (output[0][a] !== undefined) {
                var row = tbl.insertRow()
                for (b = 0; b < titles.length; b++) {
                    var td = row.insertCell()
                    td.innerText = output[b][a]
                    var team = output[b][a].split(":")[0].slice(4)
                    td.setAttribute("onmouseover", "hover('" + team + "')")
                    td.setAttribute("team", team)
                }
            }
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
    this.avgInit = function () {
        var override = document.getElementById("override").value.split(", ")
        var keys = []
        var event = document.getElementById("eventVar").innerText
        if (!override || override.length == 1) {
            keys = getEventTeamsKeys(event)
        } else {
            override.forEach(function (element) {
                keys.push("frc" + element)
            })
        }
        var arr = {}
        var year
        if (document.getElementById("ovrYear").value !== "") {
            year = document.getElementById("ovrYear").value
        } else {
            year = event.slice(0, 4)
        }
        for (i = 0; i < keys.length; i++) {
            arr[keys[i]] = []
            var num = keys[i].slice(3)
            var key = "frc" + num
            var teamEvents = getTeamEventListKeys(num, year)
            for (e = 0; e < teamEvents.length; e++) {
                var thisEvent = getEventRankingsByTeam(teamEvents[e])
                if (thisEvent !== "NOPE" && thisEvent[key] !== undefined && thisEvent[key] !== "undefined") {
                    arr[keys[i]].push(thisEvent[key])
                }
            }
        }
        var choices = Object.keys(arr[keys[0]][0])
        document.getElementById("avg").innerText = JSON.stringify(arr)
        document.getElementById("extras").innerHTML = ""
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        var html = ""
        for (i = 0; i < choices.length; i++) {
            html += '<p onclick="new eventstats().avgItem(\'' + choices[i] + '\')">' + choices[i] +
                '</p>'
        }
        html += '<p onclick="new eventstats().avgGeneral()">General</p>'
        html += '<p onclick="menu()">Menu</p>'
        side.innerHTML += html
        document.getElementById("extras").appendChild(side)
    }
    this.avgGeneral = function () {
        if (document.getElementById("divTable") !== null) {
            document.getElementById("extras").removeChild(document.getElementById("divTable"))
        }
        var parsed = JSON.parse(document.getElementById("avg").innerText)
        var keys = Object.keys(parsed)
        var choices = Object.keys(parsed[keys[0]][0])
        var output = []
        var teams = []
        var sorted = []
        choices.forEach(function (title, a) {
            output.push([])
            teams.push([])
            keys.forEach(async function (element) {
                var thisTeam = parsed[element]
                var thisArr = []
                thisTeam.forEach(function (data, i) {
                    if (!data) {
                        thisTeam.splice(i, 1)
                        return
                    } else if (data == undefined) {
                        thisTeam.splice(i, 1)
                        return
                    }
                })
                thisTeam.forEach(async function (data) {
                    thisArr.push(data[title])
                })
                var sum = thisArr.reduce((a, b) => a + b)
                var avg = sum / thisArr.length
                output[a].push(Math.floor(avg * 100) / 100)
                teams[a].push(element.slice(3))
            })
        })
        output.forEach(function (data) {
            var copy = data.slice(0)
            copy.sort(function (a, b) {
                return b - a;
            });
            sorted.push(copy)
        })
        var length
        if (document.getElementById("limit").value < output[0].length) {
            length = document.getElementById("limit").value
        } else {
            length = output[0].length
        }
        var final = []
        for (let a = 0; a < choices.length; a++) {
            final.push([])
        }
        for (b = 0; b < length; b++) {
            if (sorted[0][b] !== undefined) {
                sorted.forEach(function (element, i) {
                    var spacing = " "
                    var index = output[i].indexOf(element[b])
                    var totalLength = 4 - teams[i][index].length
                    for (a = 0; a < totalLength; a++) {
                        spacing = spacing + " "
                    }
                    final[i].push("FRC " + teams[i][index] + ":" + spacing + element[b])
                    output[i].splice(index, 1)
                    teams[i].splice(index, 1)
                })
            }
        }
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        div.setAttribute("id", "divTable")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        var heading = "<tr>"
        for (a = 0; a < choices.length; a++) {
            heading += ("<th align=\"left\">" + choices[a] + "</th>")
        }
        tbl.innerHTML += heading
        for (a = 0; a < document.getElementById("limit").value; a++) {
            var row = tbl.insertRow()
            for (b = 0; b < choices.length; b++) {
                if (final[b][a] !== undefined) {
                    var td = row.insertCell()
                    td.innerText = final[b][a]
                    var team = final[b][a].split(":")[0].slice(4)
                    td.setAttribute("onmouseover", "hover('" + team + "')")
                    td.setAttribute("team", team)
                }
            }
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
        return final
    }
    this.avgItem = function (title) {
        var general = new eventstats().avgGeneral()
        if (document.getElementById("divTable") !== null) {
            document.getElementById("extras").removeChild(document.getElementById("divTable"))
        }
        if (document.getElementById("divTable") !== null) {
            document.getElementById("extras").removeChild(document.getElementById("divTable"))
        }
        if (document.getElementById("divTable") !== null) {
            document.getElementById("extras").removeChild(document.getElementById("divTable"))
        }
        var parsed = JSON.parse(document.getElementById("avg").innerText)
        var keys = Object.keys(parsed)
        var choices = Object.keys(parsed[keys[0]][0])
        var index = choices.indexOf(title)
        var div = document.createElement("DIV")
        div.setAttribute("class", "table")
        div.setAttribute("id", "divTable")
        var tbl = document.createElement("table")
        tbl.setAttribute("class", "blueTable")
        tbl.setAttribute("id", "table")
        tbl.innerHTML += "<th align=\"left\">" + title + "</th>"
        var item = general[index]
        for (a = 0; a < document.getElementById("limit").value; a++) {
            if (item[a] !== undefined) {
                var row = tbl.insertRow()
                var td = row.insertCell()
                td.innerText = item[a]
                var team = item[a].split(":")[0].slice(4)
                td.setAttribute("onmouseover", "hover('" + team + "')")
                td.setAttribute("team", team)
            }
        }
        div.appendChild(tbl)
        document.getElementById("extras").appendChild(div)
    }
}