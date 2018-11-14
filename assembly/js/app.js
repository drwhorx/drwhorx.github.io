window.onload = function () {
    var d = new Date();
    var firstday = new Date();
    var lastday = new Date();
    firstday.setDate(1);
    lastday.setMonth(d.getMonth() + 1)
    lastday.setDate(0);
    first_wd = firstday.getDay();
    last_d = lastday.getDate();
    var tbl = document.createElement("table")
    tbl.setAttribute("class", "calendar")
    tbl.setAttribute("id", "calendar")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    tbl.innerHTML += "<caption align=\"center\">" + months[d.getMonth()] + "</caption"
    var head = tbl.insertRow()
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    for (i = 0; i < weekdays.length; i++) {
        head.innerHTML += "<th align=\"left\">" + weekdays[i] + "</th>"
    }
    var row = tbl.insertRow()
    var wd = first_wd
    for (let i = 1; i <= last_d; i++) {
        var td = row.insertCell()
        if (row.cells.length > wd) {
            td.innerText = i
            td.setAttribute("onclick", "clicked('" + i + "')")
            td.setAttribute("id", "date" + i)
        } else {
            td.innerText = ""
            i--
            wd--
        }
        if (wd + 1 == 7) {
            wd = 0
            row = tbl.insertRow()
        } else {
            wd++
        }
    }
    document.getElementById("calendar-div").appendChild(tbl)
}