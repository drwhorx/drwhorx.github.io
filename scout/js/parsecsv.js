function parsecsv() {
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    this.init = function () {
        document.getElementById("event").remove()
        document.getElementById("eventSub").remove()
        var sidenav = document.getElementById("menu")
        sidenav.hidden = true
        document.getElementById("extras").innerHTML += "<input type=\"file\" name=\"file\" id=\"file\" class=\"inputfile\" accept=\".csv\"/>"
        document.getElementById("extras").innerHTML += "<label id=\"label\" for=\"file\">Choose a file</label>"
        document.getElementById("file").addEventListener("change", readFile, false)
    }
    this.choose = function () {
        document.getElementById("file").remove()
        document.getElementById("label").remove()
        var csv = sessionStorage.getItem("csv")
        var parsed = []
        csv = csv.replaceAll('\r', '')
        var rows = csv.split("\n")
        rows.forEach(function (element, i) {
            parsed.push([])
            var thing = element.split(",")
            parsed[i] = thing
        })
        var tables = 0
        var coords = []
        var output = {}

        function getItem(x, y) {
            if (parsed[y] == undefined) {
                return ""
            } else if (parsed[y][x] == undefined) {
                return ""
            } else {
                var item = parsed[y][x]
                return item
            }
        }

        function taken(x, y) {
            if (getItem(x, y) == "" && getItem(x, y + 1) !== "" && getItem(x + 1, y) !== "" && getItem(x, y - 1) == "" && getItem(x - 1, y) == "" && getItem(x - 1, y - 1) == "") {
                tables += 1
                coords.push([x, y])
            }
        }
        for (y = 0; y < parsed.length; y++) {
            for (x = 0; x < parsed[x].length; x++) {
                taken(x, y)
            }
        }
        var arr = []
        for (i = 0; i < tables; i++) {
            var a = 1
            var b = 0
            var x = coords[i][0]
            var y = coords[i][1]
            var output = {
                "titles": [],
                "rows": [],
                "titleTypes": [],
                "actions": [],
                "itemsByTeam": {},
                "index": i,
                "temp": false,
                "actual": 0
            }
            for (let a = 1; getItem(x + a, y) !== ""; a++) {
                var item = getItem(x + a, y)
                output.titles.push(item)
                output.titleTypes.push("int")
            }
            for (let a = 1; getItem(x, y + a) !== ""; a++) {
                var item = getItem(x, y + a)
                output.rows.push(item)
            }
            for (let a = 0; a < output.titles.length; a++) {
                for (let b = 0; b < output.rows.length; b++) {
                    var item = getItem(x + a + 1, y + b + 1)
                    if (item == "TRUE" || item == "FALSE") {
                        output.titleTypes[a] = "bool"
                    } else if (!+item && item !== "" && parseInt(item) !== 0) {
                        output.titleTypes[a] = "str"
                    }
                }
            }
            for (let a = 0; a < output.rows.length; a++) {
                if (output.itemsByTeam[output.rows[a]] !== undefined) {
                    var team = output.rows[a]
                    var next = {
                        "titles": output.titles,
                        "rows": [team],
                        "titleTypes": output.titleTypes,
                        "actions": [],
                        "itemsByTeam": {},
                        "temp": true,
                        "table": i,
                        "corresponds": -1
                    }
                    next.itemsByTeam[team] = []
                    for (let b = 0; b < output.titles.length; b++) {
                        next.itemsByTeam[team].push(getItem(x + b + 1, y + a + 1))
                    }
                    arr.push(next)
                } else {
                    output.itemsByTeam[output.rows[a]] = []
                    for (let b = 0; b < output.titles.length; b++) {
                        output.itemsByTeam[output.rows[a]].push(getItem(x + b + 1, y + a + 1))
                    }
                }
            }
            var tempRows = []
            for (let a = 0; a < output.rows.length; a++) {
                if (tempRows.indexOf(output.rows[a]) > -1) {
                    output.rows.splice(a, 1)
                    a--
                } else {
                    tempRows.push(output.rows[a])
                }
            }
            output.rows = tempRows
            output.actual = arr.length
            arr.push(output)
            arr.forEach(function (element, e) {
                if (element.corresponds == -1) {
                    element.corresponds = output.actual
                }
            })
        }
        var choices = []
        arr.forEach(function (element) {
            if (element.temp == false) {
                choices.push((element.index + 1) + ". \"" + element.titles.join("\", \"") + "\"")
            }
        })
        var div = document.createElement("div")
        div.setAttribute("id", "tables")
        div.setAttribute("style", "font-size: 12px")
        for (i = 0; i < choices.length; i++) {
            div.innerHTML += "<input name=\"check\" type=\"checkbox\" id=\"" + (i + 1) + "\">"
            div.innerHTML += choices[i]
        }
        div.innerHTML += "<br><button onclick=\"new parsecsv().options()\">Submit</button>"
        document.getElementById("extras").appendChild(div)
        sessionStorage.setItem("arr", JSON.stringify(arr))
    }
    this.options = function () {
        var tables = []
        var elements = document.getElementsByName("check")
        for (i = 0; i < elements.length; i++) {
            if (elements.item(i).checked == true) {
                tables.push(elements.item(i).id)
            }
        }
        var arr = JSON.parse(sessionStorage.getItem("arr"))
        document.getElementById("tables")
        for (let a = 0; a < arr.length; a++) {
            if (arr[a].temp == false) {
                var num = arr[a].index + 1
                var item = num.toString()
                if (tables.indexOf(item) == -1) {
                    arr.splice(a, 1)
                    a--
                }
            } else {
                var num = arr[a].corresponds
                var item = arr[num].index + 1
                if (tables.indexOf((item).toString()) == -1) {
                    arr.splice(a, 1)
                    a--
                }
            }
        }
        var div = document.createElement("div")
        div.setAttribute("class", "actions")
        div.setAttribute("id", "actions")
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].titles.length; b++) {
                if (arr[a].temp !== true) {
                    if (arr[a].titleTypes[b] == "bool") {
                        var choices = ['If true, stay at true', 'If false, stay at false', 'Percent true', 'Percent false']
                        var seldiv = document.createElement("div")
                        seldiv.setAttribute("class", "styled-select blue semi-square")
                        var sel = document.createElement("select")
                        sel.innerHTML += ("<option>" + arr[a].titles[b] + ": </option>")
                        for (i = 0; i < choices.length; i++) {
                            sel.innerHTML += ("<option>" + choices[i] + "</option>")
                        }
                        sel.setAttribute("id", arr[a].titles[b])
                        sel.setAttribute("onchange", "updated(" + a + ", " + b + ")")
                        seldiv.appendChild(sel)
                        div.appendChild(seldiv)
                        arr[a].actions[b] = "defaultTrue"
                    } else if (arr[a].titleTypes[b] == "int") {
                        var choices = ['Maximum', 'Minimum', 'Average', 'Total']
                        var seldiv = document.createElement("div")
                        seldiv.setAttribute("class", "styled-select blue semi-square")
                        var sel = document.createElement("select")
                        sel.innerHTML += ("<option>" + arr[a].titles[b] + ": </option>")
                        for (i = 0; i < choices.length; i++) {
                            sel.innerHTML += ("<option>" + choices[i] + "</option>")
                        }
                        sel.setAttribute("id", arr[a].titles[b])
                        sel.setAttribute("onchange", "updated(" + a + ", " + b + ")")
                        seldiv.appendChild(sel)
                        div.appendChild(seldiv)
                        arr[a].actions[b] = "max"
                    } else if (arr[a].titleTypes[b] == "str") {
                        arr[a].actions[b] = "str"
                    }
                }
            }
        }
        document.getElementById("tables").remove()
        var button = document.createElement("button")
        button.innerText = "Submit"
        button.setAttribute("onclick", "new parsecsv().final()")
        div.innerHTML += "<br>"
        div.appendChild(button)
        document.getElementById("extras").appendChild(div)
        sessionStorage.setItem("arr", JSON.stringify(arr))
    }
    this.final = function () {
        var arr = JSON.parse(sessionStorage.getItem("arr"))
        var last = {
            "titles": [],
            "titleTypes": [],
            "actions": [],
            "rows": [],
            "itemsByTeam": {}
        }
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].titles.length; b++) {
                if (arr[a].temp == true) {
                    var corr = arr[a].corresponds
                    arr[a].actions = arr[corr].actions
                }
            }
        }
        var allCol = []
        var colsByTable = []
        var allAct = []
        for (let a = 0; a < arr.length; a++) {
            if (arr[a].temp == false) {
                for (let b = 0; b < arr[a].titles.length; b++) {
                    allCol.push(arr[a].titles[b])
                    colsByTable.push(a)
                    allAct.push(arr[a].actions[b])
                }
            }
        }
        var allRows = []
        var rowsByTable = []
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].rows.length; b++) {
                allRows.push(arr[a].rows[b])
                rowsByTable.push(a)
            }
        }
        var allType = []
        for (let a = 0; a < arr.length; a++) {
            for (let b = 0; b < arr[a].titleTypes.length; b++) {
                allType.push(arr[a].titleTypes[b])
            }
        }
        for (let a = 0; a < allRows.length; a++) {
            var team = allRows[a]
            var thisTable = rowsByTable[a]
            if (last.itemsByTeam[team] !== undefined) {
                for (let b = 0; b < arr[thisTable].titles.length; b++) {
                    var title = arr[thisTable].titles[b]
                    var type = arr[thisTable].titleTypes[b]
                    var act = arr[thisTable].actions[b]
                    if (last.itemsByTeam[team][title] !== undefined) {
                        var value = arr[thisTable].itemsByTeam[team][b]
                        var item = last.itemsByTeam[team][title]
                        if (type == "str") {
                            item += ", " + value
                            last.itemsByTeam[team][title] = item
                        } else if (type == "bool") {
                            if (act == "defaultTrue") {
                                if (value == "TRUE") {
                                    last.itemsByTeam[team][title] = "TRUE"
                                }
                            } else if (act == "defaultFalse") {
                                if (value == "FALSE") {
                                    last.itemsByTeam[team][title] = "FALSE"
                                }
                            } else if (act == "percentTrue") {
                                var num = (value == "TRUE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            } else if (act == "percentFalse") {
                                var num = (value == "FALSE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            }
                        } else if (type == "int") {
                            var item = last.itemsByTeam[team][title]
                            if (act == "max") {
                                if (+value > item) {
                                    last.itemsByTeam[team][title] = +value
                                } else {
                                    last.itemsByTeam[team][title] = item
                                }
                            } else if (act == "min") {
                                if (+value < item) {
                                    last.itemsByTeam[team][title] = +value
                                } else {
                                    last.itemsByTeam[team][title] = item
                                }
                            } else if (act == "avg") {
                                last.itemsByTeam[team][title].push(value)
                            } else if (act == "total") {
                                last.itemsByTeam[team][title] += (+value)
                            }
                        }
                    } else {
                        var value = arr[thisTable].itemsByTeam[team][b]
                        if (type == "str") {
                            last.itemsByTeam[team][title] = value
                        } else if (type == "bool") {
                            if (act == "percentTrue") {
                                var num = (value == "TRUE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            } else if (act == "percentFalse") {
                                var num = (value == "FALSE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            } else {
                                last.itemsByTeam[team][title] = value
                            }
                        } else if (type == "int") {
                            if (act == "avg") {
                                last.itemsByTeam[team][title] = [value]
                            } else {
                                last.itemsByTeam[team][title] = +value
                            }
                        }
                    }
                }
            } else {
                last.itemsByTeam[team] = {}
                for (let b = 0; b < arr[thisTable].titles.length; b++) {
                    var title = arr[thisTable].titles[b]
                    var type = arr[thisTable].titleTypes[b]
                    var act = arr[thisTable].actions[b]
                    if (last.itemsByTeam[team][title] !== undefined) {
                        var value = arr[thisTable].itemsByTeam[team][b]
                        var item = last.itemsByTeam[team][title]
                        if (type == "str") {
                            item += ", " + value
                            last.itemsByTeam[team][title] = item
                        } else if (type == "bool") {
                            if (act == "defaultTrue") {
                                if (value == "TRUE") {
                                    last.itemsByTeam[team][title] = "TRUE"
                                }
                            } else if (act == "defaultFalse") {
                                if (value == "FALSE") {
                                    last.itemsByTeam[team][title] = "FALSE"
                                }
                            } else if (act == "percentTrue") {
                                var num = (value == "TRUE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            } else if (act == "percentFalse") {
                                var num = (value == "FALSE" ? 1 : 0)
                                last.itemsByTeam[team][title].push(num)
                            }
                        } else if (type == "int") {
                            if (act == "max") {
                                if (+value > item) {
                                    last.itemsByTeam[team][title] = +value
                                } else {
                                    last.itemsByTeam[team][title] = item
                                }
                            } else if (act == "min") {
                                if (+value < item) {
                                    last.itemsByTeam[team][title] = +value
                                } else {
                                    last.itemsByTeam[team][title] = item
                                }
                            } else if (act == "avg") {
                                last.itemsByTeam[team][title].push(value)
                            } else if (act == "total") {
                                last.itemsByTeam[team][title] += +value
                            }
                        }
                    } else {
                        var value = arr[thisTable].itemsByTeam[team][b]
                        if (type == "str") {
                            last.itemsByTeam[team][title] = value
                        } else if (type == "bool") {
                            if (act == "percentTrue") {
                                var num = (value == "TRUE" ? 1 : 0)
                                last.itemsByTeam[team][title] = [num]
                            } else if (act == "percentFalse") {
                                var num = (value == "FALSE" ? 1 : 0)
                                last.itemsByTeam[team][title] = [num]
                            } else {
                                last.itemsByTeam[team][title] = value
                            }
                        } else if (type == "int") {
                            if (act == "avg") {
                                last.itemsByTeam[team][title] = [value]
                            } else {
                                last.itemsByTeam[team][title] = +value
                            }
                        }
                    }
                }
            }
        }
        var keys = Object.keys(last.itemsByTeam)
        last.rows = keys
        for (let a = 0; a < allCol.length; a++) {
            if (last.titles.indexOf(allCol[a]) == -1) {
                last.titles.push(allCol[a])
                last.titleTypes.push(allType[a])
                last.actions.push(allAct[a])
            }
        }
        for (let a = 0; a < keys.length; a++) {
            var temp = {}
            var team = keys[a]
            for (let b = 0; b < last.titles.length; b++) {
                var title = last.titles[b]
                var type = last.titleTypes[b]
                var act = last.actions[b]
                if (last.itemsByTeam[team][title] == undefined) {
                    temp[title] = ""
                } else {
                    var value = last.itemsByTeam[team][title]
                    if (type == "str") {
                        temp[title] = value
                    } else if (type == "bool") {
                        if (act == "percentTrue" || act == "percentFalse") {
                            var sum = value.reduce((a, b) => (+a) + (+b))
                            var length = value.length
                            temp[title] = (sum / length)
                        } else {
                            temp[title] = value
                        }
                    } else if (type == "int") {
                        if (act == "avg") {
                            var sum = value.reduce((a, b) => (+a) + (+b))
                            var length = value.length
                            temp[title] = (sum / length)
                        } else {
                            temp[title] = value
                        }
                    }
                }
            }
            last.itemsByTeam[team] = temp
        }
        var event = sessionStorage.getItem("event")
        localStorage.setItem("scout" + event, JSON.stringify(last))
        document.getElementById("actions").remove()
        menu()
        addMes("\n\nScouting data added!")
    }
}