$(window).on("load", () => {
    var solves = [];
    var index = 0;
    var letters = [];
    var flat = [];
    $("#submit").on("click", () => {
        letters = $(".letters").get().map(
            (letters) => $(letters).find(".letter").get().map(
                (letter) => $(letter).val() || ""))
        flat = letters.flat();
        if (flat.find(letter => !"ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(letter)))
            return;
        let filter1 = words.filter(word => {
            let split = word.toUpperCase().split("");
            if (split.find(letter => !flat.includes(letter)))
                return false;
            let match = split.reduce((letter1, letter2) => {
                if (!letter1) return;
                let index1 = letters.findIndex((group, i) => group.includes(letter1));
                let index2 = letters.findIndex((group, i) => group.includes(letter2) && i != index1);
                if (index2 < 0) return false;
                return letter2;
            });
            return !!match;
        });
        console.log(flat)
        let chains = filter1.map((word) => {
            let lastLetter = word.slice(-1);
            let filter = filter1.filter(word2 => word2.startsWith(lastLetter));
            return filter.map(word2 => [word, word2]);
        }).flat().filter(chain =>
            !flat.find(letter => !chain.find(word => word.includes(letter.toLowerCase())))
        );
        solves = chains;
        index = 0;
        draw();
        return;
        var recur = (chain) => {
            if (chain.length >= 7) {
                return [];
            }
            if (!flat.find(letter => chain.find(word => !word.includes(letter.toLowerCase())))) {
                return chain;
            }
            let lastWord = chain.slice(-1);
            let lastLetter = lastWord.slice(-1);
            let filter = filter1.filter(word2 => word2.startsWith(lastLetter));
            return filter.map(word2 => recur([...chain, word2])).flat();
        }
        let chains2 = filter1.map(word1 => {
            let chains = recur([word1]);
            return chains;
        })
        let sort = chains.sort((a, b) => a.length - b.length)
    })
    $(".letter").on("input", function () {
        let val = $(this).val() || "";
        $(this).val(val.toUpperCase().slice(-1));
    });
    $("#next").on("click", () => {
        if (index < solves.length - 1) index++;
        draw();
    });
    $("#prev").on("click", () => {
        if (index > 0) index--;
        draw();
    })
    var draw = function () {
        let chain = solves[index];
        $("#solution").text(chain.map(word => word.toUpperCase()).join(" - "));
        $("#lines line").remove();
        let coords = [
            [4, 0], [15, 0], [26, 0],
            [0, 4], [0, 15], [0, 26],
            [30, 4], [30, 15], [30, 26],
            [4, 30], [15, 30], [26, 30]
        ];
        chain.map(word => {
            let split = word.split("");
            split.reduce((letter1, letter2) => {
                let index1 = flat.indexOf(letter1.toUpperCase());
                let index2 = flat.indexOf(letter2.toUpperCase());
                if (index2 < 0) return;
                let coord1 = coords[index1];
                let coord2 = coords[index2];
                let line = $(document.createElementNS("http://www.w3.org/2000/svg", "line"));
                line.attr("x1", coord1[0]);
                line.attr("y1", coord1[1]);
                line.attr("x2", coord2[0]);
                line.attr("y2", coord2[1]);
                $("#lines").append(line);
                return letter2;
            });
        })
    }
})