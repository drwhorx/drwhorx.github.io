window.onload = () => {
    reveal(document.querySelector("#about"));
}

async function reveal(parent) {
    let arr = parent.querySelectorAll("p, p span");
    parent.hidden = false;
    for (let el of arr) {
        el.style.animation = "none"
        el.offsetHeight
    }
    for (let el of arr) {
        el.style.animation = null
        el.classList.add("s1");
    }
}

async function hide(parent) {
    let arr = parent.querySelectorAll("p, p span");
    for (let el of arr) {
        el.style.animation = "none"
        el.offsetHeight
    }
    for (let el of arr) {
        el.style.animation = null
        el.classList.add("s1");
    }
    await timeout(300);
    parent.hidden = true;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function h_all() {
    let arr = document.querySelectorAll(".page:not([hidden])");
    for (let el of arr)
        await hide(el);
}

async function r_about() {
    if (document.querySelector("#about:not([hidden])")) return;
    await h_all();
    reveal(document.querySelector("#about"))
}

function h_about() {
    hide(document.querySelector("#about"))
}

async function r_projects() {
    if (document.querySelector("#projects:not([hidden])")) return;
    await h_all();
    reveal(document.querySelector("#projects"))
}

function h_projects() {
    hide(document.querySelector("#projects"))
}

async function r_experience() {
    if (document.querySelector("#experience:not([hidden])")) return;
    await h_all();
    reveal(document.querySelector("#experience"))
}

function h_experience() {
    hide(document.querySelector("#experience"))
}

async function r_education() {
    if (document.querySelector("#education:not([hidden])")) return;
    await h_all();
    reveal(document.querySelector("#education"))
}

function h_education() {
    hide(document.querySelector("#education"))
}