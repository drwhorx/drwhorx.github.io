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
        }
    }
}
function menu() {
    document.getElementById("extras").innerHTML = ""
    document.getElementById('menu').hidden = false
    sessionStorage.clear()
}

function evt (item) {
    sessionStorage.setItem(item, document.getElementById(item).value)
    document.getElementById(item).setAttribute("value", document.getElementById(item).value)
}

function getEvent(func) {
    var checkbox = document.getElementById("non?").checked
    var sidenav = document.getElementById("menu")
    sidenav.hidden = true
    if (checkbox == false) {
        document.getElementById("extras").innerHTML +=
            '<input type="text" id="event" placeholder="Event key (i.e. 2018milin)">'
        var button = document.createElement("BUTTON");
        button.setAttribute("onclick", func)
        button.setAttribute("id", "eventSub")
        document.getElementById("event").setAttribute("onchange", "evt(\"event\")")
        document.getElementById("extras").appendChild(button)
        document.getElementById("eventSub").innerText = "Submit"
    } else {
        eval(func)
    }
}

function getTeam(func) {
    var sidenav = document.getElementById("menu")
    sidenav.hidden = true
    document.getElementById("extras").innerHTML +=
        '<input type="text" id="team" placeholder="Team number (i.e. 5530)">'
    var button = document.createElement("BUTTON");
    button.setAttribute("onclick", func)
    button.setAttribute("id", "teamSub")
    document.getElementById("team").setAttribute("onchange", "evt(\"team\")")
    document.getElementById("extras").appendChild(button)
    document.getElementById("teamSub").innerText = "Submit"
}

function getYear(func) {
    var sidenav = document.getElementById("menu")
    sidenav.hidden = true
    document.getElementById("extras").innerHTML +=
        '<input type="text" id="year" placeholder="Year (i.e. 2018)">'
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

function hover(team) {
    var table = document.getElementById("table")
    for (a = 0; a < table.rows.length; a++) {
        for (b = 0; b < table.rows[a].cells.length; b++) {
            if (team == table.rows[a].cells[b].getAttribute("team")) {
                table.rows[a].cells[b].setAttribute("class", "hovered")
            } else if (table.rows[a].cells[b].getAttribute("class")) {
                table.rows[a].cells[b].removeAttribute("class")
            }
        }
    }
}