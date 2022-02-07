window.onload = function() {
    var arr = ["getTeamHistory","getSum","getEventRankingsByTeam","getTitles","updateTBA","TBAConfig","getSettings","getArr","getLast","combineData","compare","parseAct","compareMatches","strategy","main","suffix","percentRank","eventMatches","predict","addCol","onChange","getItem","getEntries","setAll","getMatches","getEventTeamsKeys","eventPredict","eventOPRS","getTeam","getEvent","getTeamEventListKeys","getEventRankings","getYearsParticipated","getTBA"]
    for (i = 0; i < arr.length; i++) {
        document.getElementById("select").innerHTML += ("<option>" + arr[i] + "</option>")
    }
}
function submit() {
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: document.getElementById("select").value
        }
    }).success(
        alert("Function sent!")
    );
}