/* Date: 2016-08-01T17:55:03Z Path: js/ui/ui.js */
define("drag",
function(e, t, i) {
    "use strict";
    var n, o = {
        left: ["left"],
        top: ["top"],
        right: ["left", "Width"],
        bottom: ["top", "Height"]
    },
    r = {
        axis: null,
        container: null,
        handle: null,
        moveHand: !0,
        proxy: !1,
        refresh: !0
    },
    a = navigator.userAgent.toLowerCase(),
    l = a.match(/ms(ie)\s(\d+\.\d)/),
    s = l && "ie" === l[1],
    c = s && "6.0" === l[2],
    d = {
        getPosition: function(e, t) {
            var i = e.css("position");
            if ("static" === i) return "auto";
            if ("relative" === i) return "0px";
            var n, r, a, l, s = o[t][0],
            c = Jumei.util.capitalize(s),
            d = e.offset()[s],
            u = "right" === t || "bottom" === t,
            f = 0;
            return "absolute" === i ? (n = e[0].offsetParent, "BODY" !== n.tagName && "HTML" !== n.tagName || (n = window), r = $(n), $.isWindow(n) || (f = parseFloat(r.css("border" + c + "Width"))), a = r.offset()[s] + f) : (r = $(window), a = r["scroll" + c]()),
            d -= a,
            u ? (l = o[t][1], r["inner" + l]() - e["outer" + l]() - d + "px") : d + "px"
        },
        getBoundary: function(e, t) {
            var i, n, o = $.isWindow(e[0]),
            r = 0,
            a = 0,
            l = 0,
            s = 0,
            c = e.offset(),
            u = t.offset(),
            f = t.css("top"),
            p = t.css("left");
            return "auto" === f && (f = d.getPosition(t, "top")),
            "auto" === p && (p = d.getPosition(t, "left")),
            o ? (i = e.scrollTop(), n = e.scrollLeft()) : (i = c.top, n = c.left, r = e.css("borderTopWidth"), a = e.css("borderRightWidth"), l = e.css("borderBottomWidth"), s = e.css("borderLeftWidth"), "medium" === r && (r = "0px"), "medium" === a && (a = "0px"), "medium" === l && (l = "0px"), "medium" === s && (s = "0px"), r = parseFloat(r), a = parseFloat(a), l = parseFloat(l), s = parseFloat(s)),
            i = i - u.top + parseFloat(f),
            n = n - u.left + parseFloat(p),
            {
                top: i + r,
                right: n + e.outerWidth() - t.outerWidth() - a,
                left: n + s,
                bottom: i + e.outerHeight() - t.outerHeight() - l
            }
        },
        copyPosition: function(e, t) {
            var i = e.offset(),
            n = t.offset(),
            o = t.css("top"),
            r = t.css("left");
            "auto" === o && (o = d.getPosition(t, "top")),
            "auto" === r && (r = d.getPosition(t, "left")),
            t.animate({
                top: i.top - n.top + parseInt(o) + "px",
                left: i.left - n.left + parseInt(r) + "px"
            })
        },
        createProxy: function(e) {
            var t = e.target,
            i = t.offset(),
            o = t.css("zIndex");
            return o ? o = parseInt(o) + 1 : (t.css("zIndex", "1"), o = "2"),
            n || (n = $('<div class="ecope_drag_proxy" style="position:absolute;border:2px dashed #a0a1a2;"/>')),
            n.css({
                top: i.top + "px",
                left: i.left + "px",
                cursor: e.moveHand ? "move": "",
                width: e.width - 4 + "px",
                height: e.height - 4 + "px",
                zIndex: o
            }),
            n
        }
    },
    u = function(e, t) {
        if (e = $(e).eq(0), t = t || {},
        e.length) {
            var i, n, o, a, l, u = $.extend({},
            r, t),
            f = e.css("position"),
            p = "fixed" === f || c && void 0 !== e[0].style.getExpression("top"),
            m = e[0].ownerDocument,
            h = m.defaultView || m.parentWindow,
            g = $(h),
            v = u.handle ? $(u.handle) : e,
            _ = s ? v: $(m),
            w = u.container ? $(u.container) : null,
            x = 0,
            y = this,
            b = u.axis,
            E = !1,
            k = u.proxy,
            z = u.refresh,
            I = "getSelection" in h ?
            function() {
                h.getSelection().removeAllRanges()
            }: function() {
                try {
                    m.selection.empty()
                } catch(e) {}
            },
            T = function(t) {
                u.isDown = !0;
                var r, h, x, E = e;
                u.width = e.outerWidth(),
                u.height = e.outerHeight(),
                z || (f = e.css("position"), "static" === f && E.css("position", "relative")),
                k && (n = d.createProxy(u), E = n.appendTo(m.body), s && (_ = n)),
                u.handle = _,
                r = E.css("left"),
                h = E.css("top"),
                x = E.offset(),
                "auto" === h && (h = d.getPosition(e, "top")),
                "auto" === r && (r = d.getPosition(e, "left")),
                z || (l = {
                    left: r,
                    top: h
                }),
                y.left = r = parseInt(r),
                y.top = h = parseInt(h),
                y.offsetLeft = x.left,
                y.offsetTop = x.top,
                o = t.pageX - r,
                a = t.pageY - h,
                (!i && w || p) && (i = d.getBoundary(p ? g: w, E)),
                b && ("x" === b ? a = !1 : "y" === b && (o = !1)),
                s && _[0].setCapture(),
                _.on("mousemove.drag", S).on("mouseup.drag", H),
                s && _.on("losecapture.drag", H),
                c && p && !k && e[0].style.removeExpression("top"),
                v.trigger("likedragstart"),
                Jumei.ui.Drop && Jumei.ui.Drop.refresh(),
                t.stopPropagation(),
                t.preventDefault()
            },
            S = function(t) {
                if (u.isDown && (x++, x % 2 !== 0)) {
                    var r, l, s, c, d, f, p = t.pageX,
                    m = t.pageY,
                    h = t.offsetX,
                    g = t.offsetY,
                    _ = k ? n[0].style: e[0].style;
                    I(),
                    E = !0,
                    void 0 === h && (h = t.originalEvent.layerX, g = t.originalEvent.layerY),
                    o && (r = p - o, i && (s = i.left, c = i.right, r = s > r ? s: r > c ? c: r), _.left = r + "px", y.left = r, y.offsetLeft = p - h),
                    a && (l = m - a, i && (d = i.top, f = i.bottom, l = d > l ? d: l > f ? f: l), _.top = l + "px", y.top = l, y.offsetTop = m - g),
                    e.trigger("likedrag", [p, m]),
                    !Jumei.ui.Drop || t.target !== v[0] && "ecope_drag_proxy" !== t.target.className || Jumei.ui.Drop.fire(u, t, !0),
                    t.stopPropagation()
                }
            },
            H = function(t) {
                void 0 === t.offsetX && (t.offsetX = t.originalEvent.layerX, t.offsetY = t.originalEvent.layerY),
                u.isDown = !1,
                s && _.off("losecapture.drag"),
                _.off("mousemove.drag mouseup.drag"),
                s && _[0].releaseCapture(),
                E ? (k ? z ? d.copyPosition(n, e) : e.css("position", "static" === f ? "": f) : z || e.css(l), c && p && !k && e[0].style.setExpression("top", "fuckIE6=document.documentElement.scrollTop+" + (y.top - g.scrollTop()) + '+"px"'), E = !1, Jumei.ui.Drop && Jumei.ui.Drop.fire(u, t, !1)) : z || "static" !== f || e.css("position", ""),
                k && n.remove(),
                v.trigger("likedragend"),
                t.stopPropagation()
            };
            z && "static" === f && e.css("position", "relative"),
            u.moveHand && v.css("cursor", "move"),
            v.on("mousedown.drag", T),
            u.originHandle = v,
            u.target = e,
            y.__o__ = u
        }
    };
    u.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this.__o__;
                e.originHandle.css("cursor", "").off("mousedown.drag likedragstart likedragend"),
                e.isDown && e.handle.trigger("mouseup"),
                e.target.off("likedrag"),
                this.__o__ = e = null,
                delete this.__o__
            }
        },
        on: function(e, t) {
            if (!this.__o__) return this;
            var i = this,
            n = this.__o__,
            o = "drag" === e,
            r = o ? n.target: n.originHandle;
            return r.on("like" + e,
            function(o, r, a) {
                o.type = e,
                o.drag = n.target[0],
                r && (o.pageX = r, o.pageY = a),
                t.call(i, o),
                o.stopPropagation()
            }),
            this
        },
        un: function(e) {
            if (!this.__o__) return this;
            var t = this.__o__,
            i = "drag" === e ? t.target: t.originHandle;
            return i.off("like" + e),
            this
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Drag = u
}),
define("htmlslider",
function(e) {
    "use strict";
    Jumei.using("ui").HtmlSlidePlayer = function(e, i) {
        this.obj = e,
        this.n = 0,
        this.j = 0,
        this.first_show = 1;
        var n, o = this,
        r = this.obj,
        a = {
            fontsize: 12,
            right: 10,
            bottom: 15,
            time: 5e3,
            autosize: 0,
            slidearrow: !1,
            dot: !0
        };
        this.config = $.extend(a, i),
        this.count = $(r + " li").length,
        this.factory = function() {
            var e = $("<div class='slide_control'></div>");
            $(r).prepend(e),
            this.config.dot || e.hide(),
            $(r + " li").css({
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }).hide().each(function(t) {
                e.append("<a>" + (t + 1) + "</a>")
            }),
            this.count <= 1 && e.hide(),
            this.resetclass(r + " .slide_control a", 0);
            var t = $(r + " li").first(),
            i = $("img[lazyload]", t);
            $.each(i,
            function(e) {
                $(this).attr("src", $(this).attr("lazyload")).removeAttr("lazyload")
            }),
            t.length > 0 && t.attr("lazyload") && t.css("background-image", "url(" + t.attr("lazyload") + ")").removeAttr("lazyload"),
            this.slide(),
            this.slidearrow(),
            n = setInterval(this.autoplay, this.config.time),
            $(r + " .slide_control a").eq(0).triggerHandler("mouseover")
        },
        this.slidearrow = function() {
            var e, t;
            if (this.config.slidearrow && this.count > 1) e = $('<em class="slidearrow slidearrow_l"><</em>'),
            t = $('<em class="slidearrow slidearrow_r">></em>'),
            $(r).append(e).append(t);
            else {
                var i = $(r).find(".img_slider_btn");
                i.length && (e = i.eq(0), t = i.eq(1))
            }
            t && e && (t.bind("click",
            function() {
                o.n == o.count - 1 ? $(r + " .slide_control a").eq(0).triggerHandler("mouseover") : $(r + " .slide_control a").eq(o.n + 1).triggerHandler("mouseover")
            }), e.bind("click",
            function() {
                0 === o.n ? $(r + " .slide_control a").eq(o.count - 1).triggerHandler("mouseover") : $(r + " .slide_control a").eq(o.n - 1).triggerHandler("mouseover")
            }))
        },
        this.slide = function() {
            t.lazyhover($(r + " .slide_control a"),
            function() {
                if (o.j = $(this).text() - 1, o.n = o.j, !(o.j >= o.count)) {
                    if (o.first_show) o.first_show = 0,
                    $(r + " li:eq(" + o.j + ")").show().siblings("li").hide();
                    else {
                        var e, t = $(r + " li:eq(" + o.j + ")");
                        o.count >= o.j + 1 && (e = $(r + " li:eq(" + (o.j + 1) + ")")),
                        t.fadeIn("200").siblings("li").fadeOut("200");
                        var i = $("img[lazyload]", t);
                        $.each(i,
                        function(e) {
                            $(this).attr("src", $(this).attr("lazyload")).removeAttr("lazyload")
                        });
                        var n, a = t.attr("lazyload");
                        if (a || (n = t.find("a"), a = n.attr("lazyload")), void 0 !== a && (n ? n.css("background", "url(" + a + ") no-repeat center 0").removeAttr("lazyload") : t.css("background-image", "url(" + a + ")").removeAttr("lazyload"), void 0 !== e && e.length >= 1)) {
                            var l, s = e.attr("lazyload");
                            s || (l = e.find("a"), s = n.attr("lazyload")),
                            void 0 !== s && (l ? l.css("background", "url(" + s + ") no-repeat center 0").removeAttr("lazyload") : e.css("background-image", "url(" + s + ")").removeAttr("lazyload"))
                        }
                    }
                    o.resetclass(r + " .slide_control a", o.j)
                }
            },
            200, 500)
        };
        var l = $(r + " li").length;
        $(r)[0].onmouseover = function(e) {
            n && clearInterval(n),
            l > 1 && $(r + " .img_slider_btn").css("display", "block")
        },
        $(r)[0].onmouseout = function(e) {
            n = setInterval(o.autoplay, o.config.time),
            l > 1 && $(r + " .img_slider_btn").hide()
        },
        this.autoplay = function() {
            o.n = o.n >= o.count - 1 ? 0 : ++o.n,
            $(r + " .slide_control a").eq(o.n).triggerHandler("mouseover")
        },
        this.resetclass = function(e, t) {
            $(e).removeClass("mall_dot_hover").addClass("mall_dot"),
            $(e).eq(t).addClass("mall_dot_hover")
        },
        this.factory()
    };
    var t = {
        lazyhover: function(e, t, i, n) {
            var o, r = 1,
            a = function(i) {
                return clearTimeout(o),
                r || e.removeData("timer"),
                r ? t.apply(i) : null
            },
            l = i || 0,
            s = n || 500,
            c = function(t) {
                o && clearTimeout(o),
                o = setTimeout(function() {
                    a(t)
                },
                r ? l: s),
                e.data("timer", o)
            };
            return e.hover(function() {
                r = 1,
                c(this)
            },
            function() {
                r = 0,
                c(this)
            }),
            e
        }
    }
}),
define("menuaim",
function(e, t, i) {
    "use strict";
    function n(e, t) {
        var i = $(e),
        n = null,
        o = [],
        r = null,
        a = null,
        l = $.extend({
            rowSelector: "> li",
            submenuSelector: "*",
            submenuDirection: "right",
            tolerance: 75,
            enter: $.noop,
            exit: $.noop,
            activate: $.noop,
            deactivate: $.noop,
            exitMenu: $.noop
        },
        t),
        s = l.exit,
        c = null;
        l.exit = function(e) {
            function t() {
                n && l.deactivate(n),
                n = null
            }
            c && clearTimeout(c);
            var i = o[o.length - 1],
            r = o[0];
            i && r && i.x - r.x > 0 ? c = setTimeout(function() {
                s(e, t)
            },
            u) : s(e, t)
        };
        var d = 3,
        u = 300,
        f = function(e) {
            o.push({
                x: e.pageX,
                y: e.pageY
            }),
            o.length > d && o.shift()
        },
        p = function() {
            a && clearTimeout(a),
            l.exitMenu(this) && (n && l.deactivate(n), n = null)
        },
        m = function() {
            a && clearTimeout(a),
            l.enter(this),
            _(this)
        },
        h = function() {
            l.exit(this)
        },
        g = function() {
            v(this)
        },
        v = function(e) {
            e != n && (n && l.deactivate(n), l.activate(e), n = e)
        },
        _ = function(e) {
            var t = w();
            t ? a = setTimeout(function() {
                _(e)
            },
            t) : v(e)
        },
        w = function() {
            function e(e, t) {
                return (t.y - e.y) / (t.x - e.x)
            }
            if (!n || !$(n).is(l.submenuSelector)) return 0;
            var t = i.offset(),
            a = {
                x: t.left,
                y: t.top - l.tolerance
            },
            s = {
                x: t.left + i.outerWidth(),
                y: a.y
            },
            c = {
                x: t.left,
                y: t.top + i.outerHeight() + l.tolerance
            },
            d = {
                x: t.left + i.outerWidth(),
                y: c.y
            },
            f = o[o.length - 1],
            p = o[0];
            if (!f) return 0;
            if (p || (p = f), p.x < t.left || p.x > d.x || p.y < t.top || p.y > d.y) return 0;
            if (r && f.x == r.x && f.y == r.y) return 0;
            var m = s,
            h = d;
            "left" == l.submenuDirection ? (m = c, h = a) : "below" == l.submenuDirection ? (m = d, h = c) : "above" == l.submenuDirection && (m = a, h = s);
            var g = e(f, m),
            v = e(f, h),
            _ = e(p, m),
            w = e(p, h);
            return _ > g && v > w ? (r = f, u) : (r = null, 0)
        };
        i.mouseleave(p).find(l.rowSelector).mouseenter(m).mouseleave(h).click(g),
        $(document).mousemove(f)
    }
    var o = function(e, t) {
        n(e, t)
    };
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.menuAim = o
}),
define("timer",
function(e, t, i) {
    "use strict";
    var n = {
        format: "<em>DD</em><em>HH</em><em>MM</em><em>SS</em>",
        dtime: 1e3,
        scroll: !0,
        attrName: "diff",
        onStart: function() {},
        onEnd: function() {}
    },
    o = {
        start: function(e, t) {
            var i = this.getDiffs(e.selector, e.attrName);
            e._timer = setInterval(function() {
                if (i.length > 0 && o.dealTimer(e, i), e.diffs && e.diffs.length > 0) for (var t = 0; t < e.diffs.length; t++) o.dealTimer(e.diffs[t].option, e.diffs[t].data)
            },
            e.dtime)
        },
        dealTimer: function(e, t) {
            for (var i = {},
            n = 0; n < t.length; n++) {
                var r = t[n].diff = t[n].diff - e.dtime / 1e3;
                e.scroll && !o.bindScroll(t[n].$selector) || (i.$target = t[n].$selector, i.dif = r, r && r > 0 ? (i.html = Jumei.util.getDifTime(r, e.format), e.onStart.apply(i)) : (e.onEnd.apply(i), t.splice(n, 1), n--))
            }
        },
        getDiffs: function(e, t) {
            var i = [];
            return e.each(function() {
                $(this).attr(t) && $(this).attr(t) > 0 && i.push({
                    $selector: $(this),
                    diff: $(this).attr(t)
                })
            }),
            i
        },
        bindScroll: function(e) {
            var t = $(window),
            i = t.scrollTop(),
            n = i + t.height(),
            o = e.offset();
            return o.top + 30 > i && o.top < n
        }
    },
    r = function(e, t) {
        var i = $.extend({},
        n, t);
        i.selector = e,
        this.__o = i,
        o.start(this.__o)
    };
    r.prototype = {
        stop: function() {
            clearInterval(this.__o._timer)
        },
        add: function(e, t) {
            var i = $.extend({},
            n, t),
            r = {
                data: o.getDiffs(e, i.attrName),
                option: i
            };
            this.__o.diffs instanceof Array ? this.__o.diffs.push(r) : this.__o.diffs = [r]
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.TimeCounter = r
}),
define("tab",
function() {
    "use strict";
    var e = {
        auto: !1,
        duration: 200,
        easing: "swing",
        effects: null,
        interval: 3e3,
        init: null,
        trigger: "click"
    },
    t = {
        initLayout: function(e) {
            var t, i, n, o, r = e.contentElem,
            a = e.boxElem,
            l = a.outerWidth(),
            s = a.outerHeight(),
            c = parseInt(e.menuElem.filter("data-index"));
            return "slideX" === e.effects ? (t = l, i = "width", n = "left", o = "left") : (t = s, i = "height", n = "top", o = "none"),
            e.wrapElem.css({
                overflow: "hidden",
                position: "relative",
                width: l + "px",
                height: s + "px"
            }),
            r.css(i, t * a.length + "px").css("position", "absolute"),
            c && r.css(n, "-" + t * c + "px"),
            a.css({
                "float": o,
                display: "block"
            }),
            t
        },
        initMenu: function(e) {
            var i, n = t.patterns[e.effects],
            o = e.contentElem,
            r = e.menuElem,
            a = e.trigger;
            r.each(function(e) {
                var t = $(this);
                t.attr("data-index", e)
            }),
            "click" === a ? r.on("click.tab",
            function(t) {
                o.is(":animated") && o.stop(!0, !0),
                n(e, this)
            }) : "mouseenter" === a && r.on("mouseenter.tab",
            function() {
                var t = this;
                i = setTimeout(function() {
                    o.is(":animated") && o.stop(!0, !0),
                    n(e, t)
                },
                50)
            }).on("mouseleave.tab",
            function() {
                clearTimeout(i),
                i = null
            })
        },
        clear: function(e) {
            clearInterval(e.timer),
            e.timer = null
        },
        autoRun: function(e) {
            e.timer = setInterval(function() {
                t.patterns[e.effects](e)
            },
            e.interval)
        }
    };
    t.patterns = {
        normal: function(e, t) {
            var i, n = e.menuElem,
            o = e.boxElem,
            r = n.length,
            a = n.filter(".current"),
            l = parseInt(a.attr("data-index"));
            r--,
            t ? (t = $(t), i = parseInt(t.attr("data-index"))) : (i = l === r ? 0 : l + 1, t = n.eq(i)),
            a.removeClass("current"),
            t.addClass("current").trigger("likeinit"),
            o.eq(l).hide(),
            o.eq(i).show(),
            e.target.trigger("likechange")
        }
    },
    $.each({
        slideX: ["left", "width"],
        slideY: ["top", "height"]
    },
    function(e, i) {
        var n = i[0],
        o = i[1];
        t.patterns[e] = function(e, t) {
            var i, r, a, l, s = e.boxElem,
            c = e.menuElem,
            d = e.contentElem,
            u = e.size,
            f = c.length,
            p = c.filter(".current"),
            m = parseInt(p.attr("data-index")),
            h = parseInt(d.css(o)),
            g = parseInt(d.position()[n]),
            v = 1,
            _ = {},
            w = !1,
            x = function() {
                e.target.trigger("likechange")
            };
            if (f--, void 0 !== t) {
                if (t = $(t), l = parseInt(t.attr("data-index")), l === m) return;
                l > m ? (w = !1, v = l - m) : (w = !0, v = m - l)
            } else l = w ? m - 1 : m === f ? 0 : m + 1,
            t = c.eq(l);
            a = u * v,
            w ? g += a: (g -= a, m === f && (i = s.first(), r = h + "px", x = function() {
                d.css(n, "0px"),
                i.css("position", "").css(n, ""),
                e.target.trigger("likechange")
            })),
            _[n] = g + "px",
            p.removeClass("current"),
            t.addClass("current").trigger("likeinit"),
            i && i.css("position", "relative").css(n, r),
            d.animate(_, e.duration, e.easing, x)
        }
    });
    var i = function(i, n) {
        if (i = $(i).eq(0), n = n || {},
        i.length) {
            var o = $.extend({},
            e, n),
            r = o.effects || "normal",
            a = t;
            o.effects = r,
            o.target = i,
            o.menuElem = i.children("ul.tab_menu").children("li"),
            o.wrapElem = i.children("div.tab_wrapper"),
            o.contentElem = o.wrapElem.children("div.tab_content"),
            o.boxElem = o.contentElem.children("div.tab_box"),
            a.initMenu(o),
            r && "normal" !== r && (o.size = a.initLayout(o)),
            o.init && (o.init.call(i[0]), delete o.init),
            o.auto && (i.on("mouseenter.tab",
            function() {
                t.clear(o)
            }).on("mouseleave.tab",
            function() {
                t.autoRun(o)
            }), t.autoRun(o)),
            this.__o__ = o
        }
    };
    i.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this.__o__;
                e.auto && (t.clear(e), e.target.off("mouseenter.tab mouseleave.tab")),
                e.target.off("likechange"),
                e.menuElem.off("click.tab mouseenter.tab mouseleave.tab"),
                this.__o__ = e = null,
                delete this.__o__
            }
        },
        on: function(e, t) {
            if (!this.__o__) return this;
            var i = this,
            n = i.__o__,
            o = "init" === e,
            r = n.menuElem,
            a = o ? r.not(".current") : n.target,
            l = o ? "one": "on";
            return a[l]("like" + e,
            function(o) {
                var a = r.filter(".current");
                o.index = a.attr("data-index"),
                o.target = n.boxElem[o.index],
                o.menu = a[0],
                o.type = e,
                t.call(i, o),
                o.stopPropagation()
            }),
            this
        },
        un: function(e) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        },
        pause: function() {
            var e = this.__o__;
            e && (t.clear(e), e.auto && e.target.off("mouseleave.tab"))
        },
        play: function() {
            var e = this.__o__;
            e && (t.autoRun(e), e.auto && e.target.on("mouseleave.tab",
            function() {
                t.autoRun(e)
            }))
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Tab = i
}),
define("switchable",
function() {
    "use strict";
    var e = {
        auto: !0,
        interval: 3e3,
        duration: 600,
        index: !0,
        customIndex: !1,
        nav: !0,
        effects: "fade",
        imglazyload: !1,
        easing: "swing",
        init: null,
        indexClickTrigger: !0
    };~navigator.userAgent.toLowerCase().indexOf("msie 6.0") && document.execCommand("BackgroundImageCache", !1, !0);
    var t = {
        switchHandle: function(e, i) {
            var n = e.effects,
            o = !1,
            r = "number" == typeof i ? i: $(i).attr("data-index"),
            a = t.patterns[n];
            void 0 === r && (o = !!~i.className.indexOf("prev")),
            e.isAnim || a(e, r, o)
        },
        loadImg: function(e) {
            $("img", e).each(function() {
                var t = $(e).attr("data-lazysrc");
                if (t) return void $(e).css("background-image", "url(" + t + ")").removeAttr("data-lazysrc");
                var i = $(this),
                n = i.attr("data-lazysrc");
                n && (this.src = n, i.removeAttr("data-lazysrc"))
            })
        },
        initIndex: function(e) {
            var i, n, o = 0,
            r = "",
            a = e.itemElem.length,
            l = e.index;
            if ("expandSlideX" === e.effects && a--, e.customIndex) i = e.target.find(".sc_index a"),
            i.each(function(e) {
                $(this).attr("data-index", e)
            });
            else {
                for (; a > o; o++) r += '<a href="#"' + (0 === o ? ' class="current"': "") + (l ? "": ' style="display:none"') + ' data-index="' + o + '">' + (o + 1) + "</a>";
                i = $('<div class="sc_index">' + r + "</div>").appendTo(e.target).find("a")
            }
            return (l || e.customIndex) && (e.indexClickTrigger ? i.on("click.switchable",
            function(i) {
                $(this).hasClass("current") || t.switchHandle(e, this),
                i.preventDefault()
            }) : i.on("mouseover.switchable",
            function() {
                var i = this;
                $(i).hasClass("current") || (n = setTimeout(function() {
                    t.switchHandle(e, i)
                },
                200))
            }).on("mouseout.switchable",
            function() {
                clearTimeout(n),
                n = null
            })),
            i
        },
        initNav: function(e) {
            var i, n, o = e.target;
            return e.nav ? (n = '<a href="#" class="sc_prev" style="display:none"></a><a href="#" class="sc_next" style="display:none"></a>', i = $(n).appendTo(o), o.on("mouseenter.switchable",
            function() {
                i.show()
            }).on("mouseleave.switchable",
            function() {
                i.hide()
            })) : i = $("a.sc_prev,a.sc_next", o),
            i.on("click.switchable",
            function(i) {
                t.switchHandle(e, this),
                i.preventDefault()
            }),
            i
        },
        initLayout: function(e) {
            var t, i, n, o = e.itemElem,
            r = o.outerWidth(),
            a = o.outerHeight(),
            l = e.effects,
            s = "expandSlideX" === l,
            c = "0px";
            return 2 === o.length && (l = e.effects = "slideX", s = !1),
            "slideX" === l || s ? (t = r, i = "width", n = "left") : "slideY" === l && (t = a, i = "height", n = "none"),
            s && (o.each(function(e) {
                $(this).attr("data-index", e)
            }), e.index = !1),
            e.containerElem.css({
                overflow: "hidden",
                position: "relative",
                width: r + "px",
                height: a + "px"
            }),
            o.css({
                "float": n,
                display: "block"
            }),
            s && (e.containerElem.css("overflow", "visible"), e.listElem.prepend(o.last().clone()), c = 0 - t + "px", o = e.itemElem = e.listElem.children("li")),
            e.listElem.css(i, t * o.length + "px").css({
                position: "absolute",
                top: "0px",
                left: c
            }),
            t
        },
        clear: function(e) {
            clearInterval(e.timer),
            e.timer = null
        },
        autoRun: function(e) {
            e.timer = setInterval(function() {
                t.patterns[e.effects](e, void 0, !1)
            },
            e.interval)
        },
        addElems: function(e, t, i) {
            for (var n = e.size,
            o = e.listElem,
            r = parseInt(o.css("width")), a = parseInt(o.css("left")), l = t.length, s = 0; l > s; s++) o[i ? "prepend": "append"](t[s]),
            r += n,
            i && (a -= n),
            o.css({
                width: r + "px",
                left: a + "px"
            })
        },
        removeElems: function(e, t, i) {
            for (var n = e.size,
            o = e.listElem,
            r = parseInt(o.css("width")), a = parseInt(o.css("left")), l = t.length, s = 0; l > s; s++) r -= n,
            i || (a += n),
            t[s].remove(),
            o.css({
                width: r + "px",
                left: a + "px"
            });
            l && (e.itemElem = o.children("li"))
        },
        refreshItem: function(e, i, n) {
            var o, r, a, l, s, c = (e.size, e.itemElem),
            d = e.indexElem,
            u = (e.listElem, i),
            f = c.length > d.length,
            p = [],
            m = [];
            return f ? (m.push(c[n ? "last": "first"]()), o = c.eq(n ? 0 : u + 1)) : o = c.eq(u),
            r = parseInt(o.attr("data-index")),
            u !== r && (o = c.filter(function() {
                var e = $(this).attr("data-index");
                return e = +e,
                e === u
            })),
            a = o[n ? "prev": "next"](),
            a.length || (l = c[n ? "last": "first"](), f && (l = l[n ? "prev": "next"]()), s = l.clone(), p.push(s), m.push(l)),
            t.addElems(e, p, n),
            function() {
                e.isAnim = !1,
                t.removeElems(e, m, n),
                e.target.trigger("likechange")
            }
        },
        patterns: {
            fade: function(e, t, i) {
                var n, o, r, a = e.itemElem,
                l = e.indexElem,
                s = l.filter(".current"),
                c = parseInt(s.attr("data-index")),
                d = a.length - 1;
                c !== t && (void 0 === t && (t = i ? 0 === c ? d: c - 1 : c === d ? 0 : c + 1), n = a.eq(c), o = a.eq(t), o.css("display", "block").trigger("loadimg").next().trigger("loadimg"), r = function() {
                    e.isAnim = !1,
                    n.css({
                        zIndex: "1",
                        display: "none"
                    }),
                    o.css("zIndex", "2"),
                    e.target.trigger("likechange")
                },
                l.eq(c).removeClass("current"), l.eq(t).addClass("current").trigger("likeinit"), e.indexClickTrigger ? (e.isAnim = !0, n.stop(!0, !0).fadeOut(e.duration, e.easing, r)) : r())
            }
        },
        init: function(e) {
            "fade" !== e.effects ? e.size = t.initLayout(e) : e.itemElem.css({
                position: "absolute",
                display: "none",
                zIndex: "1",
                top: "0px",
                left: "0px"
            }).eq(0).css({
                display: "block",
                zIndex: "2"
            }),
            e.indexElem = t.initIndex(e),
            e.navElem = t.initNav(e),
            e.imglazyload && e.itemElem.slice(2).one("loadimg",
            function() {
                t.loadImg(this)
            }),
            e.init && (e.init.call(e.target[0]), delete e.init),
            e.auto && (e.target.on("mouseenter.switchable",
            function() {
                t.clear(e)
            }).on("mouseleave.switchableauto",
            function() {
                t.autoRun(e)
            }), t.autoRun(e))
        }
    };
    $.each({
        slideX: ["left", "width"],
        slideY: ["top", "height"],
        expandSlideX: ["left", "width"]
    },
    function(e, i) {
        var n = i[0],
        o = i[1];
        t.patterns[e] = function(i, r, a) {
            var l, s, c, d = i.itemElem,
            u = i.listElem,
            f = i.indexElem,
            p = f.length - 1,
            m = void 0 !== r,
            h = f.filter(".current"),
            g = parseInt(h.attr("data-index")),
            v = i.size,
            _ = parseFloat(u.css(o)),
            w = parseFloat(u.css(n)),
            x = 1,
            y = {},
            b = function() {
                i.isAnim = !1,
                i.target.trigger("likechange")
            };
            r = +r,
            g !== r && (m ? r > g ? (a = !1, x = r - g) : (a = !0, x = g - r) : r = a ? 0 === g ? p: g - 1 : g === p ? 0 : g + 1, c = v * x, a ? ("expandSlideX" === e ? b = t.refreshItem(i, r, a) : 0 === g && (l = d.last(), s = "-" + _ + "px", b = function() {
                i.isAnim = !1,
                u.css(n, "-" + (_ - v) + "px"),
                l.css("position", "").css(n, ""),
                i.target.trigger("likechange")
            }), w = parseFloat(u.css(n)), w += c) : ("expandSlideX" === e ? b = t.refreshItem(i, r, a) : g === p && (l = d.first(), s = _ + "px", b = function() {
                i.isAnim = !1,
                u.css(n, "0px"),
                l.css("position", "").css(n, ""),
                i.target.trigger("likechange")
            }), w = parseFloat(u.css(n)), w -= c), y[n] = w + "px", l && l.css("position", "relative").css(n, s), i.isAnim = !0, u.animate(y, i.duration, i.easing, b), d.eq(r).trigger("loadimg").next().trigger("loadimg"), f.eq(g).removeClass("current"), f.eq(r).addClass("current").trigger("likeinit"))
        }
    });
    var i = function(i, n) {
        if (i = $(i).eq(0), n = n || {},
        i.length) {
            var o = $.extend({},
            e, n),
            r = i.children("div.sc_container"),
            a = r.children("ul"),
            l = a.children("li");
            this.__o__ = o,
            l.length < 2 || ($.extend(o, {
                target: i,
                containerElem: r,
                listElem: a,
                itemElem: l,
                indexElem: null,
                navElem: null,
                size: null,
                timer: null,
                isAnim: !1
            }), t.init(o))
        }
    };
    i.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this.__o__,
                i = e.target;
                e.auto && t.clear(e),
                i.off("mouseenter.switchable").off("mouseleave.switchable").off("mouseleave.switchableauto").off("likechange"),
                e.nav && e.navElem.remove(),
                e.index && e.indexElem.remove(),
                e.imglazyload && e.itemElem.slice(2).off("loadimg"),
                this.__o__ = e = null,
                delete this.__o__
            }
        },
        on: function(e, t) {
            if (!this.__o__) return this;
            var i = this,
            n = i.__o__,
            o = "init" === e,
            r = n.indexElem,
            a = o ? r.not(".current") : n.target,
            l = o ? "one": "on";
            return a[l]("like" + e,
            function(o) {
                o.index = parseInt(r.filter(".current").attr("data-index")),
                o.target = n.itemElem[o.index],
                o.type = e,
                t.call(i, o),
                o.stopPropagation()
            }),
            this
        },
        un: function(e) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        },
        change: function(e) {
            this.__o__ && t.switchHandle(this.__o__, +e)
        },
        pause: function() {
            var e = this.__o__;
            e && (t.clear(e), e.auto && e.target.off("mouseleave.switchableauto"))
        },
        play: function() {
            var e = this.__o__;
            e && (t.autoRun(e), e.auto && e.target.on("mouseleave.switchableauto",
            function() {
                t.autoRun(e)
            }))
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Switchable = i
}),
define("scrollloader",
function(e, t, i) {
    "use strict";
    var n = {
        create: null,
        container: window,
        load: null,
        appendContainer: null,
        cells: 8,
        scrollType: "normal",
        serialize: function(e) {
            return e
        }
    },
    o = 0,
    r = {
        load: function(e) {
            var t, i;
            e.isLoading = !0,
            e.loadEnd ? e.data.length ? r.create(e) : (e.container.off("scroll." + e.customEventName).off("resize." + e.customEventName), e.target.trigger("likecreateend").off("likecreateafter").off("likecreateend")) : e.data.length <= e.cells ? (t = e.load(), i = function(t) {
                t && (t = e.serialize(t), t.length ? (e.data = e.data.concat(t), r.create(e)) : e.target.trigger("likecreateend"))
            },
            t && ("function" == typeof t.then ? t.then(i,
            function() {
                e.target.trigger("likeerror")
            }) : i(t))) : r.create(e)
        },
        create: function(e) {
            for (var t, i, n = e.data,
            o = e.target,
            a = e.appendContainer || e.target,
            l = "",
            s = 0; s < e.cells; s++) n.length && (t = n.shift(), t && (l += e.create(t)));
            if ("" !== l && (o.trigger("likecreatebefore", [n]), a.append(l), o.trigger("likecreateafter", [n]), e.initHeight)) {
                if (i = o.outerHeight() + o.offset().top, i < e.initHeight) return void r.load(e);
                e.initHeight = null
            }
            e.isLoading = !1
        },
        bindScroll: function(e) {
            e.container.on("scroll." + e.customEventName,
            function() {
                if (!e.isLoading) {
                    var t = e.container.scrollTop(),
                    i = e.target.offset().top,
                    n = e.target.outerHeight() + i,
                    o = n - 1.5 * e.containerHeight;
                    o && t >= o && ("normal" === e.scrollType ? r.load(e) : "top" === e.scrollType && n > t && r.load(e))
                }
            })
        },
        bindResize: function(e) {
            e.container.on("resize." + e.customEventName,
            function() {
                e.containerHeight = e.container.height()
            })
        },
        init: function(e) {
            var t = e.container.scrollTop(),
            i = e.containerHeight + t,
            n = e.target.offset().top;
            r.bindScroll(e),
            r.bindResize(e),
            i >= n && (r.load(e), e.initHeight = t + Math.round(1.5 * e.containerHeight))
        }
    },
    a = function(e, t) {
        if (e = $(e).eq(0), t = t || {},
        e.length) {
            var i = $.extend({},
            n, t);
            this.__o__ = i,
            i.container = $(i.container),
            i.appendContainer = i.appendContainer ? $(i.appendContainer) : null,
            o++,
            $.extend(i, {
                target: e,
                containerHeight: i.container.height(),
                data: [],
                isLoading: !1,
                loadEnd: !1,
                createEnd: !1,
                initHeight: null,
                customEventName: "scrollload" + o
            }),
            r.init(i)
        }
    };
    a.prototype = {
        destroy: function() {
            var e = this.__o__;
            e.container.off("scroll." + e.customEventName).off("resize." + e.customEventName),
            e.target.off("likecreateafter").off("likecreateend"),
            this.__o__ = e = null,
            delete this.__o__
        },
        on: function(e, t) {
            if (this.__o__) {
                var i = this;
                this.__o__.target.on("like" + e,
                function(n, o) {
                    n.type = e,
                    n.extraData = o,
                    t.call(i, n),
                    n.stopPropagation()
                })
            }
            return this
        },
        un: function(e) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        },
        loadEnd: function() {
            this.__o__.loadEnd = !0
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.ScrollLoader = a
}),
define("lazyload",
function() {
    "use strict";
    var e = {
        effects: null,
        type: "img",
        trigger: "scroll",
        container: window,
        axis: "y",
        threshold: 0,
        duration: 400,
        attrName: "data-lazysrc"
    },
    t = $(window);
    $.fn.__offset__ = function() {
        var e = {
            top: 0,
            left: 0
        },
        t = this[0];
        return t && 1 === t.nodeType ? {
            top: t.offsetTop,
            left: t.offsetLeft
        }: e
    };
    var i = {
        triggerHandle: function(e, t) {
            var i = e.threshold,
            n = e.scroll;
            return t.offsetReverse >= n - i && t.offsetForward <= e.size + n + i
        },
        load: {
            img: function(e, t, n) {
                var o, r = e.attrName;
                "IMG" === t[0].tagName && (o = t.attr(r), o && (e.effects && n && t.css("visibility", "hidden").one("load",
                function() {
                    i.effects[e.effects](e, this)
                }), t[0].src = o, t.removeAttr(r)))
            },
            dom: function(e, t) {
                var i, n = t.val();
                "TEXTAREA" === t[0].tagName && (i = t.parent(), i.html(n), i.trigger("likeload"), t.remove())
            }
        },
        loadHandle: function(e) {
            var n, o, r, a, l, s, c = 0,
            d = e.data.o,
            u = d.elems,
            f = !1,
            p = d.type,
            m = d.container,
            h = $.isWindow(m[0]),
            g = "y" === d.axis,
            v = g ? "top": "left",
            _ = g ? "height": "width",
            w = g ? "outerHeight": "outerWidth",
            x = g ? "scrollTop": "scrollLeft",
            y = h ? "offset": "__offset__",
            b = i.triggerHandle;
            for (d.scroll = m[x](), d.size = m[_](), d.isReverse = d.scroll < d.originalScroll, d.originalScroll = d.scroll, e && (s = e.type, "scroll" !== s && "resize" !== s && (f = !0)); c < u.length; c++) {
                if (a = $(u[c]), f) n = f;
                else {
                    if (l = a.parent(), !l.length) continue;
                    r = l[y]()[v],
                    o = {
                        offsetForward: r,
                        offsetReverse: r + l[w]()
                    },
                    n = b(d, o)
                }
                n && (n = !1, i.load[p](d, a, "scroll" === s), u.splice(c--, 1))
            }
            u && !u.length && (m.off(s + ".lazyload"), t.off("resize.lazyload"), u = null)
        }
    };
    i.effects = {
        fade: function(e, t) {
            $(t).css({
                display: "none",
                visibility: ""
            }).fadeIn(e.duration)
        }
    },
    $.each({
        slideX: ["left", "width"],
        slideY: ["top", "height"]
    },
    function(e, t) {
        var n = t[0],
        o = t[1];
        i.effects[e] = function(e, t) {
            t = $(t);
            var i = t.parent(),
            r = {},
            a = {},
            l = function() {
                t.css({
                    position: "",
                    top: "",
                    left: ""
                }),
                i.css({
                    overflow: "",
                    position: ""
                })
            };
            r[n] = "-" + t[o]() + "px",
            a[n] = "0px",
            i.css({
                overflow: "hidden",
                position: "relative"
            }),
            t.css({
                position: "relative",
                visibility: ""
            }).css(r).animate(a, e.duration, l)
        }
    });
    var n = function(n, o) {
        if (n = $(n), o = o || {},
        n.length) {
            var r = $.extend({},
            e, o),
            a = $.makeArray(n),
            l = "scroll" === r.trigger,
            s = $(r.container),
            c = $.isWindow(s[0]),
            d = l ? s: n;
            a && a.length && (r.container = s, r.elems = a, r.originalScroll = 0, r.isReverse = null, d[l ? "on": "one"](r.trigger + ".lazyload", {
                o: r
            },
            i.loadHandle), c && t.on("resize.lazyload", {
                o: r
            },
            i.loadHandle), l && i.loadHandle({
                type: "scroll",
                data: {
                    o: r
                }
            }), r.target = n, this.__o__ = r)
        }
    };
    n.prototype = {
        on: function(e, t) {
            if (!this.__o__) return this;
            var i = this.__o__,
            n = this,
            o = i.target,
            r = "img" === i.type ? e: "like" + e,
            a = function(i) {
                $(this).off(r),
                i.type = e,
                t.call(n, i),
                i.stopPropagation()
            };
            return "img" === i.type ? o.on(r, a) : o.each(function() {
                $(this).parent().on(r, a)
            }),
            this
        },
        load: function() {
            i.loadHandle({
                type: "scroll",
                data: {
                    o: this.__o__
                }
            })
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Lazyload = n
}),
define("dialog", ["drag"],
function(e, t, i) {
    "use strict";
    e("drag");
    var n, o, r, a, l, s, c, d, u = {
        autoClose: null,
        content: "Hello world : )",
        title: null,
        yesText: "确定",
        noText: "取消",
        yesFn: null,
        noFn: null,
        width: "320px",
        height: "auto",
        top: null,
        left: null,
        trigger: "click",
        overlay: !0,
        overlayClose: !1,
        lock: !1,
        effects: null,
        zIndex: 9999,
        drag: !1,
        topWindow: !1,
        elem: null,
        dragHandle: null
    },
    f = "margin:0;padding:0;display:none;position:absolute;top:0;left:0;bottom:0;right:0;",
    p = !!~navigator.userAgent.toLowerCase().indexOf("msie"),
    m = !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0"),
    h = !!~navigator.userAgent.toLowerCase().indexOf("firefox");
    $.fn.wheel = function(e, t) {
        var i = h ? "DOMMouseScroll.dialog": "mousewheel.dialog",
        n = function(e) {
            var t = e.originalEvent,
            i = {};
            return "wheelDelta" in t ? i.wheelDelta = Math.round(t.wheelDelta) : "detail" in t && (i.wheelDelta = 40 * -t.detail),
            i
        };
        "on" === e ? this.on(i,
        function(e) {
            $.extend(e, n(e));
            t.call(this, e)
        }) : "off" === e && this.off(i)
    };
    var g = {
        appendIframe: function(e) {
            var t, i = '<iframe class="ecope_bg_iframe" frameborder="0" tabindex="-1" src="javascript:false;" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"/>';
            $("select").length && !e.children("iframe.ecope_bg_iframe").length && (t = $(i, r), e.prepend(t))
        },
        createDialogBox: function(e) {
            if (!e.dialogElem) {
                var t = '<div class="ecope_dialog"style="' + f + "z-index:" + n+++';overflow-x:hidden;overflow-y:auto;"><div class="ecope_overlay" style="' + f + 'z-index:1;width:100%;height:100;"></div></div>';
                e.dialogElem = $(t, r),
                e.overlayElem = e.dialogElem.find("div.ecope_overlay")
            }
            p && g.appendIframe(e.dialogElem),
            d.append(e.dialogElem)
        },
        createDialogContent: function(e) {
            var t, i, n, o, a, l = e.dialogElem,
            s = e.wrapElem,
            c = e.btnClose,
            d = e.btnYes,
            u = e.btnNo;
            return e.elem ? (l.append(e.elem), void e.elem.css({
                zIndex: 2,
                position: "absolute"
            })) : (t = $.isFunction(e.yesFn), i = $.isFunction(e.noFn) || e.noFn === !0, n = t || i, a = function(t) {
                g.close(e),
                t && t.preventDefault()
            },
            s || (o = '<div class="dg_wrapper" style="position:absolute;z-index:2;"><a href="###" class="dg_btn_close">&times;</a><div class="dg_header"' + (e.title ? "": ' style="display:none"') + ">" + e.title + '</div><div class="dg_content">' + e.content + '</div><div class="dg_footer"' + (n ? "": ' style="display:none"') + '><a href="###" class="dg_btn_no"' + (i ? "": ' style="display:none"') + ">" + e.noText + '</a><a href="###" class="dg_btn_yes"' + (t ? "": ' style="display:none"') + ">" + e.yesText + "</a></div></div>", s = $(o, r)), l.append(s), d = s.find("a.dg_btn_yes"), u = s.find("a.dg_btn_no"), t && d.on("click.dialog",
            function(t) {
                e.yesFn.call(l[0], t) !== !1 && g.close(e),
                t.preventDefault()
            }), i && (a = function(t) {
                e.noFn.call(l[0], t) !== !1 && g.close(e),
                this.href && t.preventDefault()
            },
            u.on("click.dialog", a)), c = s.find("a.dg_btn_close"), e.lock ? c.hide() : (c.show(), c.on("click.dialog", a)), e.wrapElem = s, e.btnClose = c, e.btnYes = d, void(e.btnNo = u))
        },
        heightOverflow: function(e) {
            var t = e.elem || e.wrapElem,
            i = l.height(),
            n = t.outerHeight(),
            o = {};
            return n - i > 30 ? (e.overlayElem.css("height", n + 60 + "px"), o.top = "30px", o.marginTop = "", d.wheel("off")) : (e.overlayElem.css("height", "100%"), g.disableMouseWheel()),
            o
        },
        resize: function(e) {
            var t = e.data.o,
            i = t.elem || t.wrapElem,
            n = l.width(),
            o = l.height(),
            r = l.scrollTop(),
            a = l.scrollLeft(),
            s = i.outerWidth(),
            c = i.outerHeight(),
            d = n / 2,
            u = o / 2,
            f = {},
            p = {};
            t.top || t.left || (f.top = u + "px", f.left = d + "px", f.marginTop = "-" + c / 2 + "px", f.marginLeft = "-" + s / 2 + "px"),
            p = g.heightOverflow(t),
            m && t.dialogElem.css({
                top: r + "px",
                left: a + "px",
                width: n + "px",
                height: o + "px"
            }),
            p.top && (f.top = p.top, f.marginTop = p.marginTop),
            i.css(f)
        },
        disableMouseWheel: function() {
            d.wheel("on",
            function(e) {
                e.preventDefault(),
                e.stopPropagation()
            })
        },
        layout: function(e) {
            c.css({
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden"
            });
            var t, i, n = e.dialogElem,
            o = e.overlayElem,
            r = e.elem || e.wrapElem,
            a = {},
            s = {},
            d = l.width(),
            u = l.height(),
            f = d / 2,
            p = u / 2,
            h = l.scrollTop(),
            v = l.scrollLeft(),
            _ = {
                visibility: "hidden",
                display: "block"
            };
            n.css("position", m ? "absolute": "fixed"),
            o.css("opacity", e.overlay ? "": "0"),
            n.css(_),
            o.css(_),
            r.css(_),
            m && n.css({
                top: h + "px",
                left: v + "px",
                width: d + "px",
                height: u + "px"
            }),
            e.elem || r.css({
                width: e.width,
                height: e.height
            }),
            t = r.outerWidth(),
            i = r.outerHeight(),
            a.position = "absolute",
            a.top = p + "px",
            a.left = f + "px",
            a.marginTop = "-" + i / 2 + "px",
            a.marginLeft = "-" + t / 2 + "px",
            s = g.heightOverflow(e),
            s.top ? (a.top = s.top, a.marginTop = s.marginTop) : (e.top && (a.top = e.top, a.marginTop = ""), e.bottom && (a.bottom = e.bottom, a.top = "auto", a.marginTop = "")),
            e.left && (a.left = e.left, a.marginLeft = ""),
            e.right && (a.right = e.right, a.left = "auto", a.marginLeft = ""),
            r.css(a)
        },
        bindDrag: function(e) {
            if (e.drag) {
                var t = e.dragHandle || e.wrapElem.find("div.dg_header");
                t.length && t.is(":visible") && (e.dragObject = new Jumei.ui.Drag(e.wrapElem, {
                    handle: t
                }))
            }
        },
        patterns: function(e, t, i) {
            var n = e.elem || e.wrapElem,
            o = n[0].style,
            r = o.top,
            a = o.left,
            l = "from",
            s = "to",
            c = "Out",
            d = (n.offset(), parseInt(r)),
            u = parseInt(a),
            f = n.outerWidth(),
            p = n.outerHeight(),
            m = {},
            h = {
                opacity: "",
                width: "",
                height: "",
                overflow: "",
                top: r,
                left: a
            };
            switch (i && (l = "to", s = "from", c = "In", h.display = "none"), t) {
            case "fade":
                m[l] = {
                    opacity: "0",
                    top: d - 50 + "px"
                },
                m[s] = {
                    opacity: "1",
                    top: d + "px"
                },
                m.duration = 200;
                break;
            case "slide":
                m[l] = {
                    top: 0 - p / 2 + "px"
                },
                m[s] = {
                    top: d + "px"
                },
                m.easing = "ease" + c + "Strong";
                break;
            case "zoom":
                m[l] = {
                    opacity: "0",
                    left: u + f / 2 + "px",
                    top: d + p / 2 + "px",
                    width: "0px",
                    height: "0px"
                },
                m[s] = {
                    opacity: "1",
                    left: u + "px",
                    top: d + "px",
                    width: f + "px",
                    height: p + "px"
                },
                m.duration = 200,
                m.easing = "ease" + c
            }
            return [m, h]
        },
        open: function(e) {
            var t, i = e.dialogElem,
            n = e.overlayElem,
            o = e.elem || e.wrapElem,
            r = e.effects,
            a = function(t) {
                return function() {
                    o.css(t),
                    g.bindDrag(e),
                    e.elem || e.btnYes.is(":visible") && e.btnYes[0].focus(),
                    l.on("resize.dialog", {
                        o: e
                    },
                    g.resize),
                    e.target.trigger("likeopen")
                }
            };
            i.css("visibility", "visible"),
            r ? (t = function() {
                var t = $.Deferred(),
                i = n.css("opacity");
                return e.overlay ? n.css({
                    visibility: "",
                    opacity: "0"
                }).animate({
                    opacity: i
                },
                200,
                function() {
                    t.resolve()
                }) : t.resolve(),
                t.promise()
            },
            t().then(function() {
                var t = g.patterns(e, r, !1),
                i = t[0];
                i.complete = a(t[1]),
                o.css({
                    visibility: "",
                    overflow: "zoom" === r ? "hidden": ""
                }).css(i.from).animate(i.to, i.duration, i.easing, i.complete)
            })) : (e.overlay && n.css("visibility", ""), a({
                visibility: ""
            })())
        },
        close: function(e, t) {
            var i, n, o = e.dialogElem,
            r = e.overlayElem,
            a = e.elem || e.wrapElem,
            u = e.effects;
            e.timer && (clearTimeout(e.timer), e.timer = null),
            n = function() {
                e.drag && (e.dragObject.destroy(), e.dragObject = null),
                e.wrapElem && (e.btnYes.off("click.dialog"), e.btnNo.off("click.dialog"), e.btnClose.off("click.dialog")),
                $("div.ecope_dialog").length || (c.css({
                    width: "",
                    height: "",
                    position: "",
                    overflow: ""
                }), d.wheel("off"), l.off("resize.dialog"), s.off("keyup.dialog")),
                e.overlayClose && r.off("click.dialog"),
                e.target.trigger("likeclose"),
                "function" == typeof t && t()
            },
            u ? (i = function() {
                var t = $.Deferred(),
                i = g.patterns(e, u, !0),
                r = i[0];
                return r.complete = function() {
                    a.css(i[1]),
                    o.remove(),
                    n(),
                    t.resolve()
                },
                a.css("overflow", "zoom" === u ? "hidden": "").css(r.from).animate(r.to, r.duration, r.easing, r.complete),
                t.promise()
            },
            i().then(function() {
                if (e.overlay) {
                    var t = r.css("opacity");
                    r.animate({
                        opacity: "0"
                    },
                    200,
                    function() {
                        r.css({
                            display: "none",
                            opacity: t
                        }),
                        e.elem && e.elem.hide().appendTo(d)
                    })
                }
            })) : (o.remove(), e.elem && e.elem.hide().appendTo(d), n())
        },
        init: function(e, t) {
            g.createDialogBox(e),
            g.createDialogContent(e),
            g.layout(e),
            g.open(e),
            e.overlayClose && e.overlayElem.on("click.dialog",
            function() {
                g.close(e)
            }),
            e.lock || s.on("keyup.dialog",
            function(t) {
                27 === t.which && g.close(e)
            }),
            e.autoClose && (e.timer = setTimeout(function() {
                g.close(e)
            },
            e.autoClose))
        }
    },
    v = function(e, t) {
        if (e = $(e), t = t || {},
        e.length) {
            var i = $.extend({},
            u, t);
            o = i.topWindow ? window.top: window,
            r = o.document,
            a = r.documentElement,
            l = $(o),
            s = $(r),
            c = $(a),
            d = $(r.body),
            n = i.zIndex,
            i.elem && (i.elem = $(i.elem).eq(0), i.elem.length || (i.elem = null)),
            i.dragHandle && (i.dragHandle = $(i.dragHandle).eq(0), i.dragHandle.length || (i.dragHandle = null)),
            e.on(i.trigger + ".dialog",
            function() {
                g.init(i)
            }),
            i.target = e,
            this.__o__ = i
        }
    };
    v.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this,
                t = this.__o__,
                i = function() {
                    t.elem && (t.elem.hide(), d.append(t.elem)),
                    t.overlayElem = t.dialogElem = null,
                    t.target.off(t.trigger + ".dialog likeopen likeclose"),
                    delete e.__o__
                };
                t.dialogElem.is(":visible") ? this.close(i) : i()
            }
        },
        on: function(e, t) {
            if (this.__o__) {
                var i = this;
                i.__o__.target.on("like" + e,
                function(n) {
                    var o = i.__o__.dialogElem;
                    o && o.length && (n.type = e, n.target = o[0], t.call(i, n)),
                    n.stopPropagation()
                })
            }
            return this
        },
        un: function(e) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        },
        close: function(e) {
            return this.__o__ && g.close(this.__o__, e),
            this
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Dialog = v
}),
define("carousel",
function() {
    "use strict";
    var e = {
        index: 0,
        indexSwitch: !1,
        imglazyload: !1,
        duration: 600,
        easing: "easeInStrong",
        singleSlide: !1,
        vertical: !1
    },
    t = {
        loadImg: function(e, t) {
            var i, n, o = e.wrapOffset,
            r = o + e.wrapSize,
            a = t.offset()[e.posName];
            return a >= o && r > a && (n = t.find("img"), i = n.attr("data-lazysrc")) ? (n[0].src = i, n.removeAttr("data-lazysrc"), !0) : !1
        },
        lazyLoad: function(e) {
            for (var i = e.beLoaded,
            n = 0; n < i.length; n++) t.loadImg(e, i[n]) && i.splice(n--, 1)
        },
        slide: function(e, i) {
            var n, o, r, a = e.target,
            l = e.listElem,
            s = Math.abs(parseInt(l.css(e.posName))),
            c = e.wrapSize,
            d = e.listSize - c,
            u = e.singleSlide,
            f = e.itemSize,
            p = {};
            if (i) {
                if (0 === s) return;
                u ? (n = f, s === f && (r = "liketoStart")) : c >= s ? (n = s, r = "liketoStart") : n = c,
                o = "+="
            } else {
                if (s >= d) return;
                u ? (n = f, s + f >= d && (r = "liketoEnd")) : s + c >= d ? (n = d - s, r = "liketoEnd") : n = c,
                o = "-="
            }
            p[e.posName] = o + n + "px",
            l.animate(p, e.duration, e.easing,
            function() {
                e.imglazyload && t.lazyLoad(e),
                r && a.trigger(r)
            })
        },
        switchHandle: function(e, i, n) {
            var o, r, a, l, s, c, d, u, f = e.target,
            p = e.posName,
            m = e.listElem,
            h = e.itemSize,
            g = {};
            e.slide && (u = e.wrapSize, o = Math.abs(parseInt(m.css(p))), r = o + u / 2, a = Math.floor(i.offset()[p]) - e.wrapOffset + o, l = e.listSize - u, a > r ? (s = a - r, h > s ? s = h: s % h !== 0 && (s -= s % h), o + s >= l && (s = l - o, d = "liketoEnd"), c = "-=") : 0 !== o && (s = r - a, s % h !== 0 && (s -= s % h), s >= o && (s = o, d = "liketoStart"), c = "+="), s ? (g[p] = c + s + "px", m.animate(g, e.duration, e.easing,
            function() {
                e.imglazyload && t.lazyLoad(e),
                d && f.trigger(d),
                f.trigger("likeslided", [i[0], i.attr("data-index")])
            })) : e.imglazyload && t.lazyLoad(e)),
            e.indexSwitch && n && f.trigger("likechange", [i[0], i.attr("data-index")])
        },
        init: function(e) {
            var i = e.listElem,
            n = e.imglazyload,
            o = e.indexSwitch,
            r = e.index,
            a = {};
            e.wrapElem.css({
                overflow: "hidden",
                position: "relative"
            }),
            a[e.sizeName] = e.listSize + "px",
            a[e.posName] = "0px",
            i.css("position", "absolute").css(a),
            n && (e.beLoaded = []),
            e.itemElem.each(function(i) {
                var a = $(this);
                o && (a.attr("data-index", i), r === i && a.addClass("current")),
                n && !t.loadImg(e, a) && e.beLoaded.push(a)
            }),
            o && (i.on("click.carousel", "li",
            function() {
                var n = $(this);
                i.stop(!0, !0),
                !n.hasClass("current") && n.parent().hasClass("cs_list") && (t.switchHandle(e, n, !0), i.find("li.current").removeClass("current"), n.addClass("current"))
            }), r && t.switchHandle(e, e.itemElem.eq( + e.index))),
            e.slide && (e.prevElem.on("click.carousel",
            function(n) {
                i.stop(!0, !0),
                t.slide(e, !0),
                n.preventDefault()
            }), e.nextElem.on("click.carousel",
            function(n) {
                i.stop(!0, !0),
                t.slide(e),
                n.preventDefault()
            })),
            setTimeout(function() {
                e.target.trigger("likelayout")
            },
            50)
        }
    },
    i = function(i, n) {
        i = $(i).first(),
        n = n || {};
        var o, r = $.extend({},
        e, n);
        this.__o__ = r,
        r.index = +r.index,
        $.extend(r, {
            target: i,
            wrapElem: i.find("div.cs_wrapper"),
            listElem: i.find("ul.cs_list"),
            prevElem: i.find("a.cs_prev"),
            nextElem: i.find("a.cs_next"),
            itemElem: null,
            itemSize: null,
            listSize: null,
            wrapSize: null,
            wrapOffset: null,
            beLoaded: null,
            slide: null,
            sizeName: null,
            posName: null
        }),
        r.vertical ? (r.sizeName = "height", r.posName = "top") : (r.sizeName = "width", r.posName = "left"),
        o = "outer" + Jumei.util.capitalize(r.sizeName),
        r.itemElem = r.listElem.children("li"),
        r.itemSize = r.itemElem[o](),
        r.listSize = r.itemSize * r.itemElem.length,
        r.wrapSize = r.wrapElem[o](),
        r.wrapOffset = Math.floor(r.wrapElem.offset()[r.posName]),
        r.listSize <= r.wrapSize ? (r.prevElem.hide(), r.nextElem.hide(), r.slide = !1) : (r.prevElem.show(), r.nextElem.show(), r.slide = !0),
        t.init(r)
    };
    i.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this.__o__;
                e.target.off("likechange liketoStart liketoEnd"),
                e.listElem.off("click.carousel"),
                e.prevElem.off("click.carousel"),
                e.nextElem.off("click.carousel"),
                e.itemElem.filter(".current").removeClass("current"),
                this.__o__ = e = null,
                delete this.__o__
            }
        },
        on: function(e, t) {
            if (this.__o__) {
                var i = this;
                this.__o__.target.on("like" + e,
                function(n, o, r) {
                    o && (n.target = o, n.index = +r),
                    n.type = e,
                    t.call(i, n),
                    n.stopPropagation()
                })
            }
            return this
        },
        un: function(e, t) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        },
        change: function(e) {
            var i = this.__o__,
            n = i.itemElem.eq(e),
            o = i.listElem;
            return n.hasClass("current") || (o.stop(!0, !0), t.switchHandle(i, n), o.find("li.current").removeClass("current"), n.addClass("current")),
            this
        },
        splice: function(e, i, n) {
            var o, r, a, l, s = this.__o__,
            c = s.listElem,
            d = s.itemElem.length;
            o = s.itemElem.eq(i),
            o.after(e),
            r = s.itemElem = c.children("li"),
            a = r.length,
            l = a - d + i + 1,
            s.listWidth = s.itemWidth * a,
            c.css("width", s.listWidth + "px"),
            r.each(function(e) {
                var t = $(this);
                t.attr("data-index", e),
                l > e && e > i && s.beLoaded.push(t)
            }),
            t.lazyLoad(this.__o__),
            $.isFunction(n) && n.call(this, o)
        },
        prepend: function(e, t) {
            var i, n, o, r = this.__o__,
            a = r.listElem,
            l = r.itemElem.length,
            s = parseInt(a.css("left"));
            a.prepend(e),
            i = r.itemElem = a.children("li"),
            n = i.length,
            o = n - l,
            r.listWidth = r.itemWidth * n,
            a.css({
                width: r.listWidth + "px",
                left: s - r.itemWidth * o + "px"
            }),
            i.each(function(e) {
                var t = $(this);
                t.attr("data-index", e),
                o > e && r.beLoaded.push(t)
            }),
            $.isFunction(t) && t.call(this)
        },
        append: function(e, t) {
            var i, n, o, r = this.__o__,
            a = r.listElem,
            l = r.itemElem.length;
            for (a.append(e), i = r.itemElem = a.children("li"), n = i.length, r.listWidth = r.itemWidth * n, a.css("width", r.listWidth + "px"), o = l - 1; n > o; o++) r.beLoaded.push(i.eq(o).attr("data-index", o));
            $.isFunction(t) && t.call(this)
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Carousel = i
}),
define("gotop",
function() {
    var e, t = {
        position: {
            bottom: "0px",
            right: "0px"
        },
        fixed: !0,
        isAnim: !1
    },
    i = !1,
    n = !0,
    o = $(window),
    r = Math.round(o.height() / 2),
    a = function() {
        e.is(":animated") && e.stop(!0, !0)
    },
    l = function() {
        o.bind("scroll.gotop",
        function() {
            var t = $(this).scrollTop();
            t > r ? i || (i = !0, a(), e.css("visibility", "visible"), e.fadeIn()) : i && (i = !1, a(), e.fadeOut(400,
            function() {
                e.css({
                    visibility: "hidden",
                    display: "block"
                })
            }))
        })
    },
    s = function() {
        o.unbind("scroll.gotop")
    },
    c = function(t) {
        e.find("a.btn_gotop").bind("click.gotop",
        function(i) {
            var n;
            e.hide(),
            t.isAnim ? (n = Math.round(.33 * o.scrollTop()), s(), $("body,html").animate({
                scrollTop: 0
            },
            n, "easeOutStrong",
            function() {
                l()
            })) : o.scrollTop(0),
            i.preventDefault()
        })
    },
    d = function(i, o) {
        $.isPlainObject(i) && (o = i, i = null),
        o = o || {};
        var r, a = $.extend({},
        t, o),
        s = a.position;
        e = $("#gotop"),
        e.length || (n = !1, e = $('<div class="gotop" id="gotop" style="display:none;"><a href="javascript:;" class="btn_gotop">返回顶部</a></div>')),
        a.fixed && (i && (i = $(i).eq(0), r = Math.round(i.outerWidth() / 2), e.css({
            marginLeft: r + parseInt(s.left) + "px"
        }), s.left = "50%"), n || e.appendTo(document.body), Jumei.util.fixed(e[0], s)),
        l(),
        c(a),
        a.target = i,
        this.__o__ = a
    };
    d.prototype = {
        position: function(t) {
            var i, n = this.__o__.target;
            n && (i = Math.round(n.outerWidth() / 2), e.css({
                marginLeft: i + parseInt(t.left) + "px"
            }), t.left = "50%"),
            Jumei.util.fixed(e[0], t)
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Gotop = d
}),
define("anchorbar",
function(e, t, i) {
    "use strict";
    var n = navigator.userAgent.toLowerCase(),
    o = n.match(/ms(ie)\s(\d+\.\d)/),
    r = null !== o && "ie" === o[1] && "6.0" === o[2],
    a = document.documentElement,
    l = $("body,html"),
    s = $(document.body),
    c = $(window),
    d = {
        fixedHeight: !1,
        animation: !1,
        zIndex: 1001,
        height: 0,
        lazy: !1,
        vertical: !1
    },
    u = {
        createPlaceholderElem: function(e) {
            var t, i, n, o, r, a, l, s, c, d, u, f = e.target,
            p = f.css("position");
            "absolute" !== p && (i = f.outerWidth(), n = f.outerHeight(), o = f.css("marginTop"), r = f.css("marginRight"), a = f.css("marginBottom"), l = f.css("marginLeft"), s = f.css("top"), c = f.css("right"), d = f.css("bottom"), u = f.css("left"), t = '<div style="width:' + i + "px;height:" + n + "px;padding:0;margin:" + o + " " + r + " " + a + " " + l + ";top:" + s + ";right:" + c + ";bottom:" + d + ";left:" + u + ';"/>', e.placeholderElem = $(t))
        },
        reComuputedOffset: function(e) {
            for (var t = e.offsets,
            i = e.targetElems,
            n = e.targetElems.length,
            o = e.height,
            r = 0; n > r; r++) t[r] = i[r].offset().top - o;
            e.minScrollTop = t[e.minIndex],
            e.maxScrollTop = t[e.maxIndex] + i[e.maxIndex].outerHeight()
        },
        monitorScroll: function(e, t) {
            var i, n, o, r = e.anchorElems,
            a = e.offsets,
            l = a.length,
            s = e.target.find("a.current"),
            c = 0;
            if (e.minScrollTop > t || e.maxScrollTop < t) s.removeClass("current");
            else for (; l > c; c++) if (i = a[c], n = a[c + 1], o = r[c], t + 1 >= i && (void 0 === n || n > t)) {
                o.hasClass("current") || (s.removeClass("current"), o.addClass("current"));
                break
            }
        },
        bindClick: function(e, t, i) {
            t.on("click.anchorbar",
            function(t) {
                var n = e.offsets[i],
                r = Math.round(.33 * n);
                200 > r ? r = 200 : r > 600 && (r = 600),
                !e.animation || null !== o && "ie" === o[1] && parseInt(o[2]) < 9 ? l.scrollTop(n) : l.animate({
                    scrollTop: n
                },
                r, "easeOutStrong"),
                t.preventDefault()
            })
        },
        lazyContent: function(e) {
            for (var t, i = e.targetElems,
            n = c.scrollTop(), o = n + c.height(), r = 0; r < i.length; r++) if (t = i[r], "loaded" !== t.attr("loaded")) {
                var a = t.offset();
                if (a.top - 200 > n && a.top < o || a.top > n && a.top < o) {
                    var l = t.find("textarea").val();
                    t.attr("loaded", "loaded"),
                    t.find("textarea").parent().html(l),
                    t.find("textarea").css("visibility", "visible")
                }
            }
        },
        bindScroll: function(e) {
            c.on("scroll.anchorbar",
            function() {
                var t = c.scrollTop(),
                i = e.target;
                e.animation || e.lazy || u.lazyContent(e),
                e.fixed ? (e.fixedHeight || u.reComuputedOffset(e), t <= e.targetOffsetTop ? (e.fixed = !1, i.css({
                    position: "",
                    top: "",
                    left: "",
                    zIndex: ""
                }), r && (e.placeholderElem && e.placeholderElem.before(i), i[0].style.removeExpression("top")), e.placeholderElem && e.placeholderElem.remove(), i.trigger("likefixedend")) : u.monitorScroll(e, t)) : t > e.targetOffsetTop && (e.fixed = !0, e.vertical || i.css({
                    left: e.targetOffsetLeft + "px"
                }).before(e.placeholderElem), i.css({
                    position: "fixed",
                    top: "0px",
                    zIndex: e.zIndex
                }).trigger("likefixedstart"), r && (i.css("position", "absolute"), s.append(i), i[0].style.setExpression("top", 'fuckIE6=document.documentElement.scrollTop + "px"'))),
                u.monitorScroll(e, t)
            })
        },
        init: function(e) {
            var t, i, n, o = e.height,
            l = 0,
            s = 0,
            c = 0;
            e.items.each(function() {
                var r = $(this),
                a = this.hash;
                a.length > 1 && (i = $(a), i.length && (t = i.offset().top - o, e.offsets[c] = t, u.bindClick(e, r, c), e.anchorElems.push(r), e.targetElems.push(i), l ? l > t && (l = t, e.minIndex = c) : (l = t, e.minIndex = c), t > s && (s = t, n = i, e.maxIndex = c), c++))
            }),
            e.minScrollTop = l,
            e.maxScrollTop = s + n.outerHeight(),
            e.vertical || u.createPlaceholderElem(e),
            r && "fixed" !== a.currentStyle.backgroundAttachment && (a.style.backgroundImage = "url(about:blank)", a.style.backgroundAttachment = "fixed"),
            u.bindScroll(e)
        }
    },
    f = function(e, t) {
        e = $(e);
        var i = $.extend({},
        d, t),
        n = e.offset();
        this.__o__ = i,
        $.extend(i, {
            target: e,
            items: e.find("a"),
            fixed: !1,
            anchorElems: [],
            targetElems: [],
            offsets: [],
            minScrollTop: null,
            maxScrollTop: null,
            minIndex: null,
            maxIndex: null,
            placeholderElem: null,
            targetOffsetTop: n.top,
            targetOffsetLeft: n.left
        }),
        i.vertical ? i.height = 0 : i.height || (i.height = e.outerHeight()),
        u.init(i)
    };
    f.prototype = {
        destroy: function() {
            if (this.__o__) {
                var e = this.__o__;
                e.target.off("likefixedstart likefixedend"),
                e.items.off("click.anchorbar"),
                c.off("scroll.anchorbar"),
                e.placeholderElem && e.placeholderElem.remove(),
                this.__o__ = e = null,
                delete this.__o__
            }
        },
        on: function(e, t) {
            if (!this.__o__) return this;
            var i = this,
            n = i.__o__;
            return n.target.on("like" + e,
            function(n) {
                n.type = e,
                t.call(i, n),
                n.stopPropagation()
            }),
            this
        },
        un: function(e) {
            return this.__o__ && this.__o__.target.off("like" + e),
            this
        }
    },
    window.Jumei = window.Jumei || {},
    window.Jumei.ui = window.Jumei.ui || {},
    window.Jumei.ui.Anchorbar = f
}),
define("async_css_loader",
function(e) {
    for (var t = document.getElementsByTagName("link"), i = t.length, n = [], o = 0; i > o; o++)"stylesheet/async" === t[o].rel && n.push(t[o].href);
    n.length && e.async(n)
}),
define("easing",
function() {
    var e = Math.pow,
    t = (Math.sin, Math.PI),
    i = 1.70158,
    n = {
        linear: function(e) {
            return e
        },
        easeIn: function(e) {
            return e * e
        },
        easeOut: function(e) {
            return (2 - e) * e
        },
        easeBoth: function(e) {
            return (e *= 2) < 1 ? .5 * e * e: .5 * (1 - --e * (e - 2))
        },
        easeInStrong: function(e) {
            return e * e * e * e
        },
        easeOutStrong: function(e) {
            return 1 - --e * e * e * e
        },
        easeBothStrong: function(e) {
            return (e *= 2) < 1 ? .5 * e * e * e * e: .5 * (2 - (e -= 2) * e * e * e)
        },
        easeOutQuart: function(t) {
            return - (e(t - 1, 4) - 1)
        },
        easeInOutExpo: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * e(2, 10 * (t - 1)) : .5 * ( - e(2, -10 * --t) + 2)
        },
        easeOutExpo: function(t) {
            return 1 === t ? 1 : -e(2, -10 * t) + 1
        },
        swing: function(e) {
            return.5 - Math.cos(e * t) / 2
        },
        swingFrom: function(e) {
            return e * e * ((i + 1) * e - i)
        },
        swingTo: function(e) {
            return (e -= 1) * e * ((i + 1) * e + i) + 1
        },
        backIn: function(e) {
            return 1 === e && (e -= .001),
            e * e * ((i + 1) * e - i)
        },
        backOut: function(e) {
            return (e -= 1) * e * ((i + 1) * e + i) + 1
        },
        bounce: function(e) {
            var t, i = 7.5625;
            return t = 1 / 2.75 > e ? i * e * e: 2 / 2.75 > e ? i * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? i * (e -= 2.25 / 2.75) * e + .9375 : i * (e -= 2.625 / 2.75) * e + .984375
        },
        doubleSqrt: function(e) {
            return Math.sqrt(Math.sqrt(e))
        }
    };
    $.extend($.easing, n)
}),
define("util",
function() {
    "use strict";
    window.Jumei = window.Jumei || {},
    Jumei.using = function() {
        var e, t, i, n, o = arguments,
        r = this;
        if (i = o[0], n = o[1], i && i.indexOf(".")) for (t = i.split("."), e = "Jumei" == t[0] ? 1 : 0; e < t.length; e++) {
            if (!r[t[e]] && n) return null;
            r[t[e]] = r[t[e]] || {},
            r = r[t[e]]
        } else r[i] = r[i] || {};
        return r
    },
    function(e) {
        e.cookie = {
            set: function(e, t, i) {
                i || (i = {});
                var n = new Date,
                o = window.location.hostname.split(".").slice( - 2).join("."),
                r = i.exp;
                "number" == typeof r ? n.setTime(n.getTime() + 36e5 * r) : "forever" === r ? n.setFullYear(n.getFullYear() + 50) : null === t ? (t = "", n.setTime(n.getTime() - 36e5)) : n = r instanceof Date ? r: "",
                document.cookie = e + "=" + encodeURIComponent(t) + (n && "; expires=" + n.toUTCString()) + "; domain=" + (i.domain || o) + "; path=" + (i.path || "/") + (i.secure ? "; secure": "")
            },
            get: function(e) {
                e += "=";
                for (var t, i = (document.cookie || "").split(";"), n = e.length, o = i.length; o--;) if (t = i[o].replace(/^\s+/, ""), t.slice(0, n) === e) return decodeURIComponent(t.slice(n)).replace(/\s+$/, "");
                return ""
            }
        }
    } (Jumei.using("util")),
    function(e) {
        $.extend(e, {
            throttle: function(e, t) {
                var i;
                return function() {
                    var n = this,
                    o = arguments;
                    clearTimeout(i),
                    i = setTimeout(function() {
                        e.apply(n, o)
                    },
                    t)
                }
            },
            fixed: function(e, t) {
                var i, n, o, r, a, l = document.documentElement,
                s = e.style,
                c = !!~navigator.userAgent.toLowerCase().indexOf("msie 6.0");
                t ? (n = t.top, o = t.bottom, r = t.right, a = t.left) : (n = "0px", a = "0px"),
                void 0 !== a ? s.left = a: s.right = r,
                c ? ("fixed" !== l.currentStyle.backgroundAttachment && (l.style.backgroundImage = "url(about:blank)", l.style.backgroundAttachment = "fixed"), void 0 !== n ? t = parseInt(n) : void 0 !== o && (i = e.offsetHeight, i || (s.visibility = "hidden", s.display = "block", i = e.offsetHeight, s.visibility = "", s.display = "none"), t = l.clientHeight - i - parseInt(o), window.onresize = function() {
                    t = l.clientHeight - i - parseInt(o),
                    s.setExpression("top", "fuckIE6=document.documentElement.scrollTop + " + t + ' + "px"')
                }), "BODY" !== e.parentNode.tagName && document.body.appendChild(e), s.position = "absolute", s.setExpression("top", "fuckIE6=document.documentElement.scrollTop + " + t + ' + "px"')) : (s.position = "fixed", void 0 !== n ? s.top = n: s.bottom = o)
            },
            capitalize: function(e) {
                var t = e.charAt(0);
                return t.toUpperCase() + e.replace(t, "")
            },
            parseUrl: function(e, t) {
                e = e || (t ? window.location.hash: window.location.search);
                var i, n, o, r, a, l, s = t ? "#": "?",
                c = {},
                d = 0;
                if (!~e.indexOf(s) || e.slice( - 1) === s) return c;
                for (i = e.slice(e.indexOf(s) + 1), n = i.split("&"), o = n.length; o > d; d++) r = n[d],
                a = r.indexOf("="),
                l = r.slice(0, a),
                c[l] = r.slice(a + 1);
                return c
            },
            findNumIndex: function(e) {
                for (var t, i = 0; i < e.length; i++) if (t = e.charAt(i), t.match(/^\d$/g)) return i;
                return - 1
            },
            reallength: function(e) {
                return e.replace(/[^\x00-\xff]/g, "^^").length
            },
            clipstring: function(e, t) {
                if (!e || !t) return "";
                var i = 0,
                n = 0,
                o = "";
                for (n = 0; n < e.length; n++) {
                    if (e.charCodeAt(n) > 255 ? i += 2 : i++, i > t) return o + "..";
                    o += e.charAt(n)
                }
                return e
            },
            replaceNotNumber: function(e) {
                return e = e.replace(/[^\d.]/g, ""),
                e = e.replace(/^\./g, ""),
                e = e.replace(/\.{2,}/g, "."),
                e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
            },
            gotoAnchor: function(e) {
                var t = $(e);
                if (! (t.length < 0)) {
                    var i = $(window),
                    n = $(window.document.documentElement),
                    o = navigator.userAgent.toLowerCase();
                    o.indexOf("webkit") > -1 && (n = $(window.document.body));
                    var r = t.offset(),
                    a = r.top - i.scrollTop(),
                    l = i.height() - a;
                    l < t.outerHeight() && n.animate({
                        scrollTop: r.top
                    },
                    "normal")
                }
            },
            getDifTime: function(e, t) {
                var i, n, o, r, a, l = {
                    DD: "00",
                    D: "0",
                    HH: "00",
                    MM: "00",
                    SS: "00",
                    TT: "00",
                    H: "0",
                    M: "0",
                    S: "0",
                    T: "0"
                };
                return e = parseInt(1e3 * e),
                n = e,
                n > 0 ? (i = parseInt(n / 864e5).toString(), l.DD = l.D = i, i.toString().length < 2 && (l.DD = "0" + i), n %= 864e5, o = parseInt(n / 36e5).toString(), l.HH = l.H = o, o.toString().length < 2 && (l.HH = "0" + o), n %= 36e5, r = parseInt(n / 6e4).toString(), l.MM = l.M = r, r.toString().length < 2 && (l.MM = "0" + r), a = parseInt(n % 6e4 / 100), n = parseInt(a / 10), l.TT = l.T = a - 10 * n, l.SS = l.S = n, n.toString().length < 2 && (l.SS = "0" + n), t.replace(/\b[DHMST]+\b/g,
                function(e) {
                    return l[e] || 0
                })) : ""
            },
            addFavorite: function(e, t) {
                try {
                    window.external.addFavorite(e, t)
                } catch(i) {
                    try {
                        window.sidebar.addPanel(t, e, "")
                    } catch(n) {
                        alert("您的浏览器不支持点击收藏，请按快捷键Ctrl+d收藏聚美优品")
                    }
                }
            },
            hoverIntent: function(e, t) {
                var i = {
                    interval: 100,
                    sensitivity: 6,
                    timeout: 0
                };
                i = $.extend(i, t);
                var n, o, r, a, l = function(e) {
                    n = e.pageX,
                    o = e.pageY
                },
                s = function(e, t) {
                    return t.hoverIntent_t = clearTimeout(t.hoverIntent_t),
                    Math.sqrt((r - n) * (r - n) + (a - o) * (a - o)) < i.sensitivity ? ($(t).off("mousemove.hoverIntent", l), t.hoverIntent_s = !0, i.over.apply(t, [e])) : (r = n, a = o, t.hoverIntent_t = setTimeout(function() {
                        s(e, t)
                    },
                    i.interval), void 0)
                },
                c = function(e, t) {
                    return t.hoverIntent_t = clearTimeout(t.hoverIntent_t),
                    t.hoverIntent_s = !1,
                    i.out.apply(t, [e])
                },
                d = function(e) {
                    var t = $.extend({},
                    e),
                    n = this;
                    n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)),
                    "mouseenter" === e.type ? (r = t.pageX, a = t.pageY, $(n).on("mousemove.hoverIntent", l), n.hoverIntent_s || (n.hoverIntent_t = setTimeout(function() {
                        s(t, n)
                    },
                    i.interval))) : ($(n).off("mousemove.hoverIntent", l), n.hoverIntent_s && (n.hoverIntent_t = setTimeout(function() {
                        c(t, n)
                    },
                    i.timeout)))
                };
                return e.on({
                    "mouseenter.hoverIntent": d,
                    "mouseleave.hoverIntent": d
                },
                i.selector)
            }
        })
    } (Jumei.using("util"))
}),
define("ui", ["util", "easing", "async_css_loader", "anchorbar", "gotop", "carousel", "dialog", "lazyload", "scrollloader", "switchable", "tab", "timer", "menuaim", "htmlslider"],
function(e) {
    e("util"),
    e("easing"),
    e("async_css_loader"),
    e("anchorbar"),
    e("gotop"),
    e("carousel"),
    e("dialog"),
    e("lazyload"),
    e("scrollloader"),
    e("switchable"),
    e("tab"),
    e("timer"),
    e("menuaim"),
    e("htmlslider")
});