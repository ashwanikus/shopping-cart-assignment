Handlebars.registerHelper('ifFirstIndex', function (index, options) {
    if (index == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('inc', function (index, options) {
    return parseInt(index) + 1;
});

Handlebars.registerHelper("multiply", function (a, b) {
    return parseInt(a) * parseInt(b);
});
