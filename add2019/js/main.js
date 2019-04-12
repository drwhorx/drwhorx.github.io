
window.onload = function () {
    var keys = Object.keys(table)
    if (localStorage.getItem("arr") == null) {
        localStorage.setItem("arr", "[]")
    }
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
                child.value = 0;
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
    var err = false;
    for (i = 0; i < data.length; i++) {
        var plc = data[i].id
        if (table[plc].optional == undefined) {
            var bool1 = table[plc].type == "number" && (Number(data[i].value) == NaN || data[i].value == "")
            var bool2 = table[plc].type == "text" && data[i].value == ""
            if (bool1 || bool2) {
                alert("Data entry for \"" + plc + "\" is invalid!")
                err = true;
            }
        }
        out.push(data[i].value)
    }
    if (err) return;
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: out
        }
    }).success(function () {

        var arr = JSON.parse(localStorage.getItem("arr"))
        for (i = 0; i < arr.length; i++) {
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
                method: "GET",
                dataType: "json",
                data: {
                    data: arr[i]
                }
            })
        }
        alert("Data submitted!")
        arr = []
        localStorage.setItem("arr", JSON.stringify(arr))
    }).fail(function () {
        var arr = JSON.parse(localStorage.getItem("arr"))
        arr.push(out);
        alert("Data added, but held for later.")
        localStorage.setItem("arr", JSON.stringify(arr))
    })
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