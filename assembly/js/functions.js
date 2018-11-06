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

function click(date) {
    console.log(document.getElementById("date" + date).offsetTop)
}