/* Date: 2016-10-18T18:37:53Z Path: js/monitor/monitor.js */
define("env",
function(e, n, r) {
    var t = {
        ua: navigator.userAgent.toLowerCase(),
        browser: [["qq", "tencenttraveler "], ["ff", "firefox/"], ["ff", "minefield/"], ["ff", "shiretoko/"], ["opera", "opera/"], ["ie", "msie "], ["chrome", "chrome/"], ["safa", "safari/"], ["qq", "qqbrowser/"]],
        system: [["winxp", "windows nt 5.1"], ["win7", "windows nt 6.1"], ["win8", "windows nt 6.2"], ["vista", "windows nt 6.0"], ["mac", "mac"], ["wince", "windows ce"], ["wince", "windows phone"], ["android", "android"], ["ios", "ipad"], ["ios", "iphone"], ["symbian", "symbianos"], ["linux", "linux"]],
        getSys: function() {
            for (var e = this.system,
            n = this.ua,
            r = "",
            t = 0,
            o = e.length; o > t; t++) if (n.indexOf(e[t][1]) > -1) {
                r = e[t][0];
                break
            }
            return r
        },
        getBr: function() {
            for (var e = this.ua,
            n = this.browser,
            r = "other",
            t = 0,
            o = n.length; o > t; t++) if (e.indexOf(n[t][1]) > -1) {
                if (r = n[t][0], "ie" === r) {
                    var i = e.match(/msie ([\w]+)/);
                    i && (r += i[1])
                }
                break
            }
            return r
        },
        getDs: function() {
            return window.screen.width + "_" + window.screen.height
        }
    };
    r.exports = t
}),
define("config", ["env"],
function(e, n, r) {
    function t() {
        var e = s.getCookie("cookie_uid");
        return e || (e = String((new Date).getTime()) + String(Math.random()).slice( - 7), s.setCookie("cookie_uid", e)),
        e
    }
    function o() {
        var e = s.getCookie("uid"),
        n = s.getCookie("m_vid");
        e ? (l.uid = l.vid = e, s.setCookie("m_vid", e, {
            exp: "forever"
        })) : n ? (l.uid = -1, l.vid = n) : l.uid = l.vid = 0
    }
    function i(e, n) {
        e = e || (n ? window.location.hash: window.location.search);
        var r, t, o, i, a, c, s = n ? "#": "?",
        u = {},
        f = 0;
        if (!~e.indexOf(s) || e.slice( - 1) === s) return u;
        for (r = e.slice(e.indexOf(s) + 1), t = r.split("&"), o = t.length; o > f; f++) i = t[f],
        a = i.indexOf("="),
        c = i.slice(0, a),
        u[c] = i.slice(a + 1);
        return u
    }
    function a() {
        return f.referrer ? f.referrer: i().referer || ""
    }
    var c = e("env"),
    s = {},
    u = window.location,
    f = document,
    l = {
        v: "1.0"
    };
    s.getCookie = function(e) {
        var n = new RegExp("(?:^| )" + e + "=([^;]*)(?:;|$)"),
        r = n.exec(f.cookie);
        return r ? unescape(r[1]) : ""
    },
    s.setCookie = function(e, n, r) {
        r || (r = {});
        var t = new Date,
        o = window.location.hostname.split(".").slice( - 2).join(".");
        "number" == typeof r.exp ? t.setTime(t.getTime() + 36e5 * r.exp) : "forever" === r.exp ? t.setFullYear(t.getFullYear() + 50) : null === n ? (n = "", t.setTime(t.getTime() - 36e5)) : t = r.exp instanceof Date ? r.exp: "",
        f.cookie = e + "=" + escape(n) + (t && "; expires=" + t.toGMTString()) + "; domain=" + (r.domain || o) + "; path=" + (r.path || "/") + (r.secure ? "; secure": "")
    },
    o(),
    l.mid = t(),
    l.url = u.href,
    l.ref = a(),
    l.st = s.getCookie("default_site_25") ? s.getCookie("default_site_25") : "0",
    l.ds = c.getDs(),
    l.sys = c.getSys(),
    l.br = c.getBr(),
    r.exports = l
}),
define("inface",
function(e) {
    function n(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    function r(e) {
        if (n(e, "category") && n(e, "action")) {
            var r = {
                cg: e.category,
                at: e.action,
                lb: e.label || "",
                vl: e.value || "",
                et: "event"
            };
            return o._DATAS.push(r),
            r
        }
        return ! 1
    }
    function t(e, n, r, t) {
        var a = {
            et: "jserror",
            msg: e || "",
            file: n || "",
            line: r || 0,
            num: t || "",
            lost: i.join(",")
        };
        return o._DATAS.push(a),
        a
    }
    var o = window.monitor = {};
    o._DATAS = [];
    var i = [],
    a = {};
    o.lost = function(e) {
        a.hasOwnProperty(e) || (a[e] = !0, i.push(e))
    },
    o.log = function(e, n) {
        if (e || n) {
            var t, i = n.length;
            switch (e) {
            case "custom":
                if (i === +i) for (t = 0; i > t; t++) o.log("custom", n[t]);
                else n.et = "custom",
                o._DATAS.push(n);
                break;
            case "event":
                if (i === +i) for (t = 0; i > t; t++) o.log("event", n[t]);
                else r(n);
                break;
            default:
                throw new Error("Not support the data.")
            }
        }
    },
    o.error = function(e) {
        return e instanceof Error ? t(e.message || e.description, e.fileName, e.lineNumber || e.line, e.number) : void 0
    },
    window.onerror = function(e, n, r) {
        return t(e, n, r),
        !1
    }
}),
define("monitor", ["inface", "config"],
function(e, n, r) {
    function t(e) {
        return Object.prototype.toString.call(e)
    }
    function o(e) {
        var n;
        if (null === e) return null;
        switch (t(e)) {
        case "[object String]":
        case "[object Number]":
        case "[object Boolean]":
            n = e;
            break;
        case "[object Array]":
            n = [];
            for (var r = e.length - 1; r >= 0; r--) n[r] = o(e[r]);
            break;
        case "[object RegExp]":
            n = new RegExp(e.source, (e.ignoreCase ? "i": "") + (e.global ? "g": "") + (e.multiline ? "m": ""));
            break;
        case "[object Date]":
            n = new Date(e.valueOf());
            break;
        case "[object Error]":
            e = n;
            break;
        case "[object Object]":
            n = {};
            for (var i in e) u(e, i) && (n[i] = o(e[i]));
            break;
        default:
            throw new Error("Not support the type.")
        }
        return n
    }
    function i(e, n) {
        if (!n) return e;
        for (var r in n) u(n, r) && (e[r] = n[r]);
        return e
    }
    function a() {
        return ("" + Math.random()).slice( - 6)
    }
    function c(e) {
        if (void 0 === e || "string" != typeof e) return "";
        var n = e.indexOf(";jsessionid=");
        if (n >= 0) return e.substr(0, n);
        do {
            if (n = e.indexOf("?", n), 0 > n) break;
            if ("?" !== e.charAt(n + 1)) break;
            n += 2
        } while ( n >= 0 );
        return 0 > n ? e: e.substr(0, n)
    }
    function s(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return "";
        var n = [];
        for (var r in e) if (u(e, r)) if ("[object Array]" === t(e[r])) for (var o = 0,
        i = e[r].length; i > o; o++) n.push(r + "=" + encodeURIComponent(e[r][o]));
        else n.push(r + "=" + encodeURIComponent(e[r]));
        return n.join("&")
    }
    function u(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    function f(e, n, r) {
        if (r || (r = function() {}), !n) return r();
        var t = s(n),
        o = e + (e.indexOf("?") < 0 ? "?": "&") + t,
        i = new Image(1, 1);
        i.onload = i.onerror = i.onabort = function() {
            r(),
            i.onload = i.onerror = i.onabort = null,
            i = null
        },
        i.src = o
    }
    function l() {
        if (g && !h) {
            var e = p._DATAS.shift();
            if (e) {
                h = !0;
                var n = o(d);
                c(e.url),
                "jserror" === e.et && (e.file = c(e.file)),
                n = i(n, e),
                n.rnd = a(),
                f(w, n,
                function() {
                    h = !1,
                    l()
                })
            }
        }
    }
    e("inface");
    var d = e("config"),
    p = window.monitor,
    w = "http://click.srv.jumei.com:8080/jm.gif",
    g = !1,
    h = !1,
    v = p._DATAS.push;
    p._DATAS.push = function() {
        v.apply(p._DATAS, arguments),
        l()
    },
    p.boot = function(e) {
        g = e !== !1
    },
    g && p._DATAS.push({
        et: "page"
    }),
    r.exports = p
});