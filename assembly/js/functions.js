function getJSON() {
    var str = $.ajax({
        url: "http://67.172.86.193/get.php",
        type: "GET",
        async: false
    }).responseText
    return JSON.parse(JSON.parse(str))
}

function writeJSON(data) {
    $.ajax({
        url: "http://67.172.86.193/post.php",
        type: "POST",
        dataType: "application/json",
        data: data,
        async: false
    })
}

function clicked(date) {
    var top = document.getElementById("date" + date).offsetTop
    document.getElementById("popup").hidden = false
    document.getElementById("popup").setAttribute("style", "margin-top:" + top + "px")
    
}