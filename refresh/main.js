function rankings() {
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: "Rankings"
        }
    }).success(
        alert("Refreshed!")
    );
}
function compare() {
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: "Compare"
        }
    }).success(
        alert("Refreshed!")
    );
}
function matches() {
    var jqxhr = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        method: "GET",
        dataType: "json",
        data: {
            data: "Compare Matches"
        }
    }).success(
        alert("Refreshed!")
    );
}