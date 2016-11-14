define("boot", [],
function() {
    var a = "static_cart",
    b = "20161021_2",
    c = "dev" == b ? "http://f0.dev.jmstatic.com": "http://f0.jmstatic.com";
    location && location.search && location.search.indexOf("__debugger__") > -1 ? (seajs.config({
        base: c + "/" + a + "/src/js"
    }), $("link[rel=stylesheet]").each(function(c, d) {
        var e = $(d).attr("href");
        e && e.indexOf(a + "/dist/" + b + "/") > 0 && $(d).attr("href", $(d).attr("href").replace(a + "/dist/" + b + "/", a + "/src/"))
    })) : (c = c.replace(/(http:\/\/f)(\d)/,
    function(a, b) {
        return b + "{{0}}"
    }), seajs.config({
        base: c + "/" + a + "/dist/" + b + "/js"
    }))
}),
seajs.config({
    alias: {
        template: "library/template"
    }
}),
seajs.use("boot");