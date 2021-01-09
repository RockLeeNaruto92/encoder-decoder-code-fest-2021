window.rules = [-3, 2];
window.mode = "encode";
window.data = {
    alphabet: '1ABC2DEF3GHI4JKL5MNO6PQRS7TUV8WXYZ90'.split(''),
    keyboard: {
        "1": "1",
        "2": "ABC2",
        "3": "DEF3",
        "4": "GHI4",
        "5":  "JKL5",
        "6":  "MNO6",
        "7":  "PQRS7",
        "8":  "TUV8",
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
        let contents = $("#code").val().split(".");
        let contentIndex = 0;
        let ruleIndex = 0;
        let resultStr = "";
        window.startTime = new Date();
        window.stepsCount = 0;
        window.numberResult = "";
        switch (window.mode) {
            case "encode":
                encode(content);
                break;
            case "decode":
                window.result = decode(contents, contentIndex, window.rules, ruleIndex, resultStr);
                break;
            default:
                throw new Error("Not support");
        }
        window.endTime = new Date();

        $("#number-trans").html(window.numberResult);
        $("#result").html(window.result);
        $("#start-time").html(window.startTime.getTime());
        $("#end-time").html(window.endTime.getTime());
        $("#steps-count").html(window.stepsCount);
    });
});

const generateRuleHtml = function (rule) {
    return '<button type="button" class="btn btn-outline-primary btn-rule">' + rule + '</button>';
};

const encode = function () {
    console.log("TODO: Encode");
    window.numberResult = "Encode number result";
    window.result = "Encode result";
    window.stepsCount = "sample";
};

const decode = function (contents, contentIndex, rules, ruleIndex, resultStr) {
    console.log("TODO: decode");
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
    
    console.log(resultStr);
    let nextContentIndex = contentIndex + 1;
    let nextRuleIndex = (ruleIndex + 1) % rules.length;
    if (contents[contentIndex] === "\n") {
        nextRuleIndex = ruleIndex % rules.length;
    }

    // apply rule for each content
    return decode(contents, nextContentIndex, rules, nextRuleIndex, resultStr);
};

const encodeItem = function (item, rule) {
    

    return window.data.alphabet[(resIndexInKey + rule) % window.data.alphabet.length];
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