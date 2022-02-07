function predict() {
    this.init = function () {
        document.getElementById("extras").removeChild(document.getElementById("event"))
        document.getElementById("extras").removeChild(document.getElementById("eventSub"))
        var options = ['Qualification', 'Quarters 1', 'Quarters 2', 'Quarters 3', 'Quarters 4', 'Semis 1', 'Semis 2', 'Finals']
        var filtered = ['_qm', '_qf1m', '_qf2m', '_qf3m', '_qf4m', '_sf1m', '_sf2m', '_f1m']
        var side = document.createElement("DIV");
        side.setAttribute('class', 'sidenav')
        var html = ""
        for (i = 0; i < options.length; i++) {
            html += ('<p onclick="new predict().match(\'' + filtered[i] + '\')">' + options[i] + '</p>')
        }
        html += '<p onclick="menu()">Menu</p>'
        side.innerHTML += html
        document.getElementById("extras").appendChild(side)
    }

    this.match = function (type) {
        document.getElementById("extras").getElementsByClassName("sidenav").item(0).remove()
        document.getElementById("extras").innerHTML +=
            '<input type="text" id="match" style="margin-left:10px;margin-top:10px" placeholder="Match Number:">'
        var button = document.createElement("BUTTON");
        button.setAttribute("onclick", "new predict().predict(\"" + type + "\")")
        button.setAttribute("id", "matchSub")
        document.getElementById("match").setAttribute("onchange", "evt(\"match\")")
        document.getElementById("extras").appendChild(button)
        document.getElementById("matchSub").innerText = "Submit"
    }

    this.predict = function (type) {
        var event = sessionStorage.getItem("event")
        var match = sessionStorage.getItem("match")
        var predict = eventPredict(event)
        console.log(predict)
        if (type == "_qm") {

        } else {

        }
    }
}