window.rules = [+2, -3];
window.mode = "encode";

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
        let content = $("#code").val();
        window.startTime = new Date();
        switch (window.mode) {
            case "encode":
                encode(content);
                break;
            case "decode":
                decode(content);
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

const decode = function () {
    console.log("TODO: decode");
    window.numberResult = "Decode number result";
    window.result = "Decode result";
    window.stepsCount = "sample";
};