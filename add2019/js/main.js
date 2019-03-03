
window.onload = function () {
    var keys = Object.keys(table)

    for (i = 0; i < keys.length; i++) {
        if (table[keys[i]].type == "stack") {
            var div = document.createElement("div")
            var p = document.createElement("p")
            p.innerText = keys[i]
            p.style = "margin-bottom:3px;margin-top:1px"
            div.appendChild(p)
            div.setAttribute("id", keys[i])
            div.setAttribute("stack", true)
            div.hidden = true;
            document.getElementById("items").appendChild(div)
        } else {
            var div = document.createElement("div")
            div.setAttribute("id", keys[i] + "Div")
            document.getElementById("items").appendChild(div)
        }
    }

    for (i = 0; i < keys.length; i++) {
        switch (table[keys[i]].type) {
            case "text":
                var div = document.getElementById(keys[i] + "Div")
                var p = document.createElement("p")
                p.innerText = keys[i]
                p.style = "margin-bottom:0px;margin-top:0px"
                div.appendChild(p)

                var child = document.createElement("input")
                child.type = "text"
                child.setAttribute("id", keys[i])
                child.setAttribute("data", true)

                div.appendChild(child)

                if (table[keys[i]].parent != undefined) {
                    div.setAttribute("class", "stacked")
                    document.getElementById(table[keys[i]].parent).hidden = false;
                    $("#" + keys[i] + "Div").appendTo($("#" + table[keys[i]].parent))
                }
                break;
            case "number":
                var div = document.getElementById(keys[i] + "Div")
                var p = document.createElement("p")
                p.innerText = keys[i]
                p.style = "margin-bottom:0px;margin-top:0px"
                div.appendChild(p)

                var child = document.createElement("input")
                child.type = "text"
                child.setAttribute("id", keys[i])
                child.setAttribute("data", true)

                var inc = document.createElement("button")
                inc.innerText = "+"
                inc.setAttribute("onclick", "increment(\'" + keys[i] + "\')")

                var dec = document.createElement("button")
                dec.innerText = "-"
                dec.setAttribute("onclick", "decrement(\'" + keys[i] + "\')")

                div.appendChild(child)
                div.appendChild(inc)
                div.appendChild(dec)

                if (table[keys[i]].parent != undefined) {
                    div.setAttribute("class", "stacked")
                    document.getElementById(table[keys[i]].parent).hidden = false;
                    $("[id='" + keys[i] + "Div']").appendTo($("[id='" + table[keys[i]].parent + "']"))
                }
                break;
            case undefined:
                var div = document.getElementById(keys[i] + "Div")
                var p = document.createElement("p")
                p.innerText = keys[i]
                p.style = "margin-bottom:0px;margin-top:0px"
                div.appendChild(p)

                var opts = table[keys[i]].opts
                var child = document.createElement("select")
                child.setAttribute("id", keys[i])
                child.setAttribute("data", true)

                for (a = 0; a < opts.length; a++) {
                    var opt = document.createElement("option")
                    opt.innerText = opts[a]
                    child.appendChild(opt)
                }

                div.appendChild(child)
                if (table[keys[i]].parent != undefined) {
                    div.setAttribute("class", "stacked")
                    document.getElementById(table[keys[i]].parent).hidden = false;
                    $("#" + keys[i] + "Div").appendTo($("#" + table[keys[i]].parent))
                }
                break;
        }
    }
}

function submit() {
    var out = []
    var data = $("[data='true']")
    for (i = 0; i < data.length; i++) {
        out.push(data[i].value)
    }
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: out
        }
    }).success(
        alert("Data Submitted!")
    );
}

function increment(name) {
    if (document.getElementById(name).value != "") {
        document.getElementById(name).value++;
    } else {
        document.getElementById(name).value = 1
    }
}

function decrement(name) {
    if (document.getElementById(name).value != "") {
        document.getElementById(name).value--;
    } else {
        document.getElementById(name).value = -1
    }
}