String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getTBA(url) {
    return JSON.parse($.ajax({
        url: "https://www.thebluealliance.com/api/v3/" + url,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-TBA-Auth-Key',
                'wFLfqneHnQeMApDRSJnAvtS1egVMBQzXxn2E6vGW0DuGy3HhRYztR8tGJvbdBX0G');
        },
        async: false
    }).responseText);
};

function getEventRankings(eventkey) {
    return getTBA('event/' + eventkey + '/rankings');
}

function getTeamEventListKeys(num, year) {
    return getTBA('team/frc' + num + '/events' + (year === undefined ? '' : '/' + year) + '/keys');
}

function TBAEvent(eventkey) {
    return getTBA('event/' + eventkey);
}

function eventOPRS(eventkey) {
    return getTBA('event/' + eventkey + '/oprs');
}

function eventPredict(eventkey) {
    return getTBA('event/' + eventkey + '/predictions');
}

function getEventRankingsByTeam(eventKey) {
    var rankings = getEventRankings(eventKey)
    if (!rankings) {
        return "NOPE"
    } else if (!rankings.rankings) {
        return "NOPE"
    }
    var titles = []
    var output = {}
    rankings.sort_order_info.forEach(function (element) {
        titles.push(element.name)
    });
    rankings.rankings.forEach(function (data) {
        output[data.team_key] = {}
        data.sort_orders.forEach(function (element, index) {
            if (index < titles.length) {
                output[data.team_key][titles[index]] = element
            }
        });
    })
    return output
}

function getEventTeamsKeys(eventkey) {
    return getTBA('event/' + eventkey + '/teams/keys');
}

function readFile(evt) {
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function (e) {
            var contents = e.target.result;
            sessionStorage.setItem("csv", contents)
            new parsecsv().choose()
        }
    }
}

function menu() {
    document.getElementById("extras").innerHTML = ""
    $("#menu").fadeIn(250)
    sessionStorage.clear()
    var bin = document.getElementById("messages")
    bin.innerText = "Welcome to Amon Green's WebScout!\nCheck \"Help\" for more info."
}

function evt(item) {
    sessionStorage.setItem(item, document.getElementById(item).value)
    document.getElementById(item).setAttribute("value", document.getElementById(item).value)
}

function getEvent(func) {
    var checkbox = document.getElementById("non?").checked
    $("#menu").fadeOut(150)
    if (checkbox == false) {
        document.getElementById("extras").innerHTML +=
            '<input type="text" id="event" style="margin-left:10px;margin-top:10px" placeholder="Event key (i.e. 2018milin)">'
        var button = document.createElement("BUTTON");
        button.setAttribute("onclick", func)
        button.setAttribute("id", "eventSub")
        document.getElementById("event").setAttribute("onchange", "evt(\"event\")")
        document.getElementById("extras").appendChild(button)
        document.getElementById("eventSub").innerText = "Submit"
    } else {
        if (document.getElementById("ovrYear").value == "") {
            menu()
            alert("You must state a year if you are going to have a nonexistent event!")
        } else {
            eval(func)
        }
    }
}

function getTeam(func) {
    $("#menu").fadeOut(150)
    document.getElementById("extras").innerHTML +=
        '<input type="text" id="team" style="margin-left:10px;margin-top:10px" placeholder="Team number (i.e. 5530)">'
    var button = document.createElement("BUTTON");
    button.setAttribute("onclick", func)
    button.setAttribute("id", "teamSub")
    document.getElementById("team").setAttribute("onchange", "evt(\"team\")")
    document.getElementById("extras").appendChild(button)
    document.getElementById("teamSub").innerText = "Submit"
}

function getYear(func) {
    $("#menu").fadeOut(150)
    document.getElementById("extras").innerHTML +=
        '<input type="text" id="year" style="margin-left:10px;margin-top:10px" placeholder="Year (i.e. 2018)">'
    var button = document.createElement("BUTTON");
    button.setAttribute("onclick", func)
    button.setAttribute("id", "yearSub")
    document.getElementById("year").setAttribute("onchange", "evt(\"year\")")
    document.getElementById("extras").appendChild(button)
    document.getElementById("yearSub").innerText = "Submit"
}

function hide() {
    var options = document.getElementById("options")
    options.toggleAttribute("hidden")
    var button = document.getElementById("hide")
    if (button.innerText == "Hide Options") {
        button.innerText = "Show Options"
    } else {
        button.innerText = "Hide Options"
    }
}

function hideMes() {
    var options = document.getElementById("messages")
    options.toggleAttribute("hidden")
    var button = document.getElementById("hideMes")
    if (button.innerText == "Hide Messages") {
        button.innerText = "Show Messages"
    } else {
        button.innerText = "Hide Messages"
    }
}

function hover(team) {
    var e = window.event
    var table = document.getElementById("table")
    var data = ""
    for (a = 0; a < table.rows.length; a++) {
        for (b = 0; b < table.rows[a].cells.length; b++) {
            if (team == table.rows[a].cells[b].getAttribute("team") && table.rows[a].cells[b].getAttribute("class") !== "clicked") {
                table.rows[a].cells[b].setAttribute("class", "hovered")
                if (e.altKey) {
                    table.rows[a].cells[b].setAttribute("style", "background-color:red")
                }
            } else if (table.rows[a].cells[b].getAttribute("class") == "hovered") {
                table.rows[a].cells[b].removeAttribute("class")
                table.rows[a].cells[b].removeAttribute("style")
            }

        }
    }
    for (a = 0; a < table.rows[0].cells.length; a++) {
        for (b = 0; b < table.rows.length; b++) {
            if (team == table.rows[b].cells[a].getAttribute("team") && table.rows[b].cells[a].getAttribute("class") == "hovered") {
                var value = table.rows[b].cells[a].innerText
                value = value.replace("FRC " + team + ": ", "")
                data += (table.rows[0].cells[a].innerText + ": " + value + "\n")
            }
        }
    }
    for (a = 0; a < table.rows[0].cells.length; a++) {
        for (b = 0; b < table.rows.length; b++) {
            if (team == table.rows[b].cells[a].getAttribute("team") && table.rows[b].cells[a].getAttribute("class") == "hovered") {
                table.rows[b].cells[a].setAttribute("title", data)
            }
        }
    }
}

function onpress(team) {
    var e = window.event
    if (e.altKey) {
        var table = document.getElementById("table")
        for (a = 0; a < table.rows.length; a++) {
            for (b = 0; b < table.rows[a].cells.length; b++) {
                if (team == table.rows[a].cells[b].getAttribute("team") && table.rows[a].cells[b].getAttribute("class") == "hovered") {
                    table.rows[a].cells[b].setAttribute("style", "background-color:red")
                }
            }
        }
    }
}

function onleave(team) {
    var table = document.getElementById("table")
    for (a = 0; a < table.rows.length; a++) {
        for (b = 0; b < table.rows[a].cells.length; b++) {
            if (team == table.rows[a].cells[b].getAttribute("team") && table.rows[a].cells[b].getAttribute("class") == "hovered") {
                table.rows[a].cells[b].removeAttribute("class")
                table.rows[a].cells[b].removeAttribute("style")
            }
        }
    }
}

function clicked(team) {
    var e = window.event
    if (e.altKey) {
        delClick(team)
    } else {
        var table = document.getElementById("table")
        for (a = 0; a < table.rows.length; a++) {
            for (b = 0; b < table.rows[a].cells.length; b++) {
                if (team == table.rows[a].cells[b].getAttribute("team") && table.rows[a].cells[b].getAttribute("class") !== "clicked") {
                    table.rows[a].cells[b].setAttribute("class", "clicked")
                    table.rows[a].cells[b].removeAttribute("style")
                } else if (team == table.rows[a].cells[b].getAttribute("team") && table.rows[a].cells[b].getAttribute("class") == "clicked") {
                    table.rows[a].cells[b].removeAttribute("class")
                    table.rows[a].cells[b].removeAttribute("style")
                }
            }
        }
    }
}

function delClick(team) {
    var existing = JSON.parse(sessionStorage.getItem("picked"))
    existing.push(team)
    sessionStorage.setItem("picked", JSON.stringify(existing))
    var table = document.getElementById("table")
    var headings = table.getElementsByTagName("th")
    var side = document.getElementById("extras").getElementsByClassName("sidenav").item(0)
    var names = []
    for (i = 0; i < side.getElementsByTagName("p").length; i++) {
        names.push(side.getElementsByTagName("p").item(i).innerText)
    }
    addMes("\n" + team + " was picked!")
    if (headings.length > 1 && names.indexOf("Season Averages") > -1) {
        new eventstats().general()
    } else if (headings.length == 1 && names.indexOf("Season Averages") > -1) {
        new eventstats().item(headings.item(0).innerText)
    } else if (headings.length > 1 && names.indexOf("Season Averages") == -1) {
        new eventstats().avgGeneral()
    } else if (headings.length == 1 && names.indexOf("Season Averages") == -1) {
        new eventstats().avgItem(headings.item(0).innerText)
    }
}

function updated(a, b) {
    var arr = JSON.parse(sessionStorage.getItem("arr"))
    if (arr[a].titleTypes[b] == "bool") {
        var choices = ['If true, stay at true', 'If false, stay at false', 'Percent true', 'Percent false']
        var filtered = ["defaultTrue", "defaultFalse", "percentTrue", "percentFalse"]
        var index = choices.indexOf(document.getElementById(arr[a].titles[b]).value)
        arr[a].actions[b] = filtered[index]
        sessionStorage.setItem("arr", JSON.stringify(arr))
    } else if (arr[a].titleTypes[b] == "int") {
        var choices = ['Maximum', 'Minimum', 'Average', 'Total']
        var filtered = ['max', 'mix', 'avg', 'total']
        var index = choices.indexOf(document.getElementById(arr[a].titles[b]).value)
        arr[a].actions[b] = filtered[index]
        sessionStorage.setItem("arr", JSON.stringify(arr))
    }
}

function addMes(message) {
    var bin = document.getElementById("messages")
    bin.innerText += message
}