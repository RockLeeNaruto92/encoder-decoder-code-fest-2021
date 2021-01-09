window.rules = [+2, -3];

$(document).ready(function () {
    // Display default refault rules
    for (var i = 0; i < window.rules.length; i++) {
        $(generateRuleHtml(window.rules[i])).insertBefore("#add-new-rule");
    }
    // click button thêm quy luật

    // Click button Dịch
});

const generateRuleHtml = function (rule) {
    return '<button type="button" class="btn btn-outline-primary btn-rule">' + rule + '</button>';
}