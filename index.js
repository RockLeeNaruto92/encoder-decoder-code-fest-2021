window.rules = [+2, -3];

$(document).ready(function () {
    for (var i = 0; i < window.rules.length; i++) {
        $(generateRuleHtml(window.rules[i])).insertBefore("#new-rule-input");
    }

    // click button thêm quy luật
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

    // Click button Dịch
});

const generateRuleHtml = function (rule) {
    return '<button type="button" class="btn btn-outline-primary btn-rule">' + rule + '</button>';
}