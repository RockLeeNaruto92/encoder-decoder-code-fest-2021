window.rules = [-3, 2];
window.mode = "encode";
window.data = {
    alphabet: '1ABC2DEF3GHI4JKL5MNO6PQRS7TUV8WXYZ90'.split(''),
    keyboard: {
        "1": "1",
        "A": "ABC2",
        "B": "ABC2",
        "C": "ABC2",
        "2": "ABC2",
        "D": "DEF3",
        "E": "DEF3",
        "F": "DEF3",
        "3": "DEF3",
        "G": "GHI4",
        "H": "GHI4",
        "I": "GHI4",
        "4": "GHI4",
        "J": "JKL5",
        "K": "JKL5",
        "L": "JKL5",
        "5": "JKL5",
        "M": "MNO6",
        "N": "MNO6",
        "O": "MNO6",
        "6": "MNO6",
        "P": "PQRS7",
        "Q": "PQRS7",
        "R": "PQRS7",
        "S": "PQRS7",
        "7": "PQRS7",
        "T": "TUV8",
        "U": "TUV8",
        "V": "TUV8",
        "8": "TUV8",
        "W": "WXYZ9",
        "X": "WXYZ9",
        "Y": "WXYZ9",
        "Z": "WXYZ9",
        "9": "WXYZ9",
        "0": "0"
    }
};

$(document).ready(function () {
    for (var i = 0; i < window.rules.length; i++) {
        $(generateRuleHtml(window.rules[i])).insertBefore("#new-rule-input");
    }

    $("#add-new-rule").click(function () {
        $("#new-rule-input").removeClass("d-none");
    });

    $("#new-rule-input").keydown(function (e) {
        if (e.keyCode === 13) {
            const value = parseInt($("#new-rule-input").val());
            if (!window.rules.includes(value)) {
                $("#new-rule-input").val("");
                window.rules.push(value);
                $(generateRuleHtml(value)).insertBefore("#new-rule-input");
            }
            $("#new-rule-input").addClass("d-none");
        }
    });

    $("[name=mode]").change(function (e) {
        window.mode = e.target.value;
    });

    $("#translate").click(function () {
        let contents = $("#code").val();
        let contentIndex = 0;
        let ruleIndex = 0;
        let resultStr = "";
        window.startTime = new Date();
        window.stepsCount = 0;
        window.numberResult = "";
        switch (window.mode) {
            case "encode":
                contents = contents.split("");
                window.result = encode(contents, contentIndex, window.rules, ruleIndex, resultStr);
                break;
            case "decode":
                contents = contents.split(".");
                window.result = decode(contents, contentIndex, window.rules, ruleIndex, resultStr);
                break;
            default:
                throw new Error("Not support");
        }
        window.endTime = new Date();

        $("#number-trans").html(window.numberResult);
        $("#result").html(window.result.replaceAll("\n", "<br>"));
        $("#start-time").html(window.startTime.getTime());
        $("#end-time").html(window.endTime.getTime());
        $("#steps-count").html(window.stepsCount);
    });
});

const generateRuleHtml = function (rule) {
    return '<button type="button" class="btn btn-outline-primary btn-rule">' + rule + '</button>';
};

const decode = function (contents, contentIndex, rules, ruleIndex, resultStr) {
    window.stepsCount += 1;

    if (contentIndex >= contents.length) {
        return resultStr;
    }

    let newLineIndex = contents[contentIndex].indexOf("\n");

    if (contents[contentIndex] !== "\n" && newLineIndex !== -1) {
        let items = contents[contentIndex].split("\n");
        contents.splice(contentIndex, 1, items[0], "\n", items[1]);
    }

    resultStr += decodeItem(contents[contentIndex], rules[ruleIndex]);
    
    let nextContentIndex = contentIndex + 1;
    let nextRuleIndex = (ruleIndex + 1) % rules.length;
    if (contents[contentIndex] === "\n") {
        nextRuleIndex = ruleIndex % rules.length;
    }

    return decode(contents, nextContentIndex, rules, nextRuleIndex, resultStr);
};

const encode = function (contents, contentIndex, rules, ruleIndex, resultStr) {
    window.stepsCount += 1;

    if (contentIndex >= contents.length) {
        return resultStr;
    }

    const decodeItemRes = encodeItem(contents[contentIndex], rules[ruleIndex]);
    if (decodeItemRes === "\n") {
        resultStr += "\n";
    } else {
        if (resultStr.length === 0 || resultStr[resultStr.length - 1] === "\n" ) {
            resultStr += decodeItemRes;
        } else {
            resultStr += "." + decodeItemRes;
        }
    }

    let nextContentIndex = contentIndex + 1;
    let nextRuleIndex = (ruleIndex + 1) % rules.length;

    if (contents[contentIndex] === " ") {
        nextRuleIndex = ruleIndex % rules.length;
    }

    return encode(contents, nextContentIndex, rules, nextRuleIndex, resultStr);
};

const encodeItem = function (item, rule) {
    window.stepsCount += 1;
    if (item === " ") {
        window.numberResult += "<br>";
        return "\n";
    }
    const resIndexInKey = window.data.alphabet.indexOf(item);
    const baseCharacter = window.data.alphabet[(resIndexInKey - rule + window.data.alphabet.length) % window.data.alphabet.length];

    window.numberResult += baseCharacter;
    if (!window.data.keyboard[baseCharacter]) {
        debugger;
    }
    const charactersList = window.data.keyboard[baseCharacter].split("");
    const key = charactersList[charactersList.length - 1];
    const index = charactersList.indexOf(baseCharacter) + 1;

    return key + "-" + index;
    
};

const decodeItem = function (item, rule) {
    let res = nokiaToChar(item);
    window.numberResult += res;

    if (res === " ") {
        return res;
    }
    const resIndexInKey = window.data.alphabet.indexOf(res);

    return window.data.alphabet[(resIndexInKey + rule) % window.data.alphabet.length];
}

const nokiaToChar = function (val) {
    if (val === "\n") {
        return " ";
    }
    const key = parseInt(val.split("-")[0]);
    const pressTimes = val.split("-")[1];
    return window.data.keyboard[key][parseInt(pressTimes) - 1];
}