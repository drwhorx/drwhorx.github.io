document.addEventListener('keydown', keydown);

function select(element) {
    //let element = document.querySelector();
    if (element.classList.contains("selected")) {
        let state = element.getAttribute("state");
        if (state === null) state = 0;
        element.setAttribute("state", (state + 1) % 3);
    } else {
        let r_element = document.querySelector(".selected");
        if (r_element) r_element.classList.remove("selected");
        element.classList.add("selected");
    }
}

function keydown(key) {
    let element = document.querySelector(".selected");
    let inputs = Array.from(document.querySelectorAll("#input td"));
    let index = inputs.indexOf(element);
    if (!element) return;
    if (key.keyCode > 64 && key.keyCode < 91) {
        element.innerText = key.key.toUpperCase();
        if (!element.getAttribute("state")) element.setAttribute("state", 0);
        element.classList.remove("selected");
        inputs[(index + 1 + inputs.length) % inputs.length].classList.add("selected");
    }
    if (key.keyCode == 8) {
        element.innerText = "";
        element.removeAttribute("state");
        element.classList.remove("selected");
        inputs[(index - 1 + inputs.length) % inputs.length].classList.add("selected");
    }
    if (key.keyCode == 27) {
        element.classList.remove("selected");
    }
    if (key.keyCode >= 37 && key.keyCode <= 40) {
        let index = inputs.indexOf(element);
        if (key.keyCode == 37) index -= 1;
        if (key.keyCode == 39) index += 1;
        if (key.keyCode == 38) index -= 5;
        if (key.keyCode == 40) index += 5;
        element.classList.remove("selected");
        inputs[(index + inputs.length) % inputs.length].classList.add("selected");
    }
}

function calculate() {
    let output = words.map(e => e.split("").map(e => e.toUpperCase()));
    let inputs = Array.from(document.querySelectorAll(".input")).map(
        row => Array.from(row.querySelectorAll("td")).map(
            el => {
                return {
                    letter: el.innerText,
                    state: el.getAttribute("state")
                }
            }
        )
    ).filter(
        row => !row.find(e => !e.letter)
    );
    for (let filter of inputs) {
        for (let i in filter) {
            output = output.filter(word => {
                let state = filter[i].state;
                let letter = filter[i].letter;
                if (state == 0 || !state) {
                    if (word.find((e, j) => e == letter))
                        return false;
                } else if (state == 1) {
                    if (word.find((e, j) => e == letter && i == j))
                        return false;
                    if (!word.find((e, j) => e == letter))
                        return false;
                } else if (state == 2) {
                    if (!word.find((e, j) => e == letter && i == j))
                        return false;
                }
                return true;
            });
        }
    }
    let table = document.querySelector("#output");
    let row = document.querySelector(".output");
    table.innerHTML = "";
    for (let e of output) {
        let c_row = row.cloneNode(false);
        for (let i in e) {
            let node = row.children[i].cloneNode();
            node.innerText = e[i];
            c_row.appendChild(node);
        }
        table.appendChild(c_row);
    }
    console.log("done")
}