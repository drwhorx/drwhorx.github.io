const letters = 'qwertyuiopasdfghjklzxcvbnm'.split("");
let output = [];
for (let i in letters) {
    let has = words.filter(e => e.includes(letters[i]));
    let dbl = has.filter(e => e.split("").filter(
        l => l == letters[i]).length > 1
    );
    let pos = [0,1,2,3,4].map(e => has.filter(
        w => w[e] == letters[i]).length / has.length
    );
    output.push({
        letter: letters[i],
        has_count: has.length,
        has: has.length / words.length,
        dbl_count: dbl.length,
        dbl: dbl.length / has.length,
        pos: pos
    })
}

for (let a of ["a", "e", "i", "o", "u"]) {
    let o = output.find(e => e.letter == a);
    let order = [0,1,2,3,4].sort((j, k) => o.pos[k] - o.pos[j]);
    console.log(o.letter + ": " + order.join(","));
    console.log(o.pos.join(","));
}

output = output.sort((a, b) => b.dbl - a.dbl);
//output.forEach(e => console.log(e.letter + ": " + 
//    (Math.round(e.has * 1000) / 10) + "%, " +
//    (Math.round(e.dbl * 1000) / 10) + "%"));

