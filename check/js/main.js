function minimizeElement(element, id) {
    document.getElementById(id).toggleAttribute("hidden")

}
var checked;
var title;
var error;
var footer;
function newCall() {
    var calls = JSON.parse(localStorage.getItem("calls"))
    $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbz-R1qyevrkZwcHv-KuQIzcjsPOnch_YbI6N3on0y0D55raAvIV/exec",
        "crossDomain": true,
        success: function (msg) {
            var obj = JSON.parse(msg.data)
            checked = checked.cloneNode(true)
            checked.innerHTML = "<button class=\"minimize\" onclick=\"minimize(this)\">-</button>"
            title = title.cloneNode(true)
            title.innerText = obj.title
            checked.appendChild(title)
            footer = footer.cloneNode(true)
            footer.innerText = obj.footer
            for (i = 0; i < obj.errors.length; i++) {
                error = error.cloneNode(true)
                error.children[1].innerText = obj.errors[i]
                checked.appendChild(error)
            }
            checked.appendChild(footer)
            document.getElementById("wrapper").appendChild(checked)
            calls.push(obj)
            localStorage.setItem("calls", JSON.stringify(calls))
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage)
        }
    });
}
function minimize(element) {
    var parent = element.parentElement
    var children = parent.children
    for (i = 0; i < children.length; i++) {
        if (children[i].getAttribute("class") == "error") {
            children[i].toggleAttribute("hidden")
        }
    }
    element.innerText = (element.innerText == "-" ? "+" : "-")
}
window.onload = function () {
    var calls = JSON.parse(localStorage.getItem("calls"))
    checked = document.getElementsByClassName("checked")[0].cloneNode(true)
    checked.hidden = false
    title = document.getElementsByClassName("title")[0].cloneNode(true)
    title.hidden = false
    error = document.getElementsByClassName("error")[0].cloneNode(true)
    error.hidden = false
    footer = document.getElementsByClassName("footer")[0].cloneNode(true)
    footer.hidden = false

    for (i = 0; i < calls.length; i++) {
        var obj = calls[i]
        checked = checked.cloneNode(true)
        checked.innerHTML = "<button class=\"minimize\" onclick=\"minimize(this)\">-</button>"
        title = title.cloneNode(true)
        title.innerText = obj.title
        checked.appendChild(title)
        footer = footer.cloneNode(true)
        footer.innerText = obj.footer
        for (i = 0; i < obj.errors.length; i++) {
            error = error.cloneNode(true)
            error.children[1].innerText = obj.errors[i]
            checked.appendChild(error)
        }
        checked.appendChild(footer)
        document.getElementById("wrapper").appendChild(checked)
    }
}