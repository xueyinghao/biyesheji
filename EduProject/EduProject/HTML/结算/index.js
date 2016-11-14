define("views/show/index", ["../../library/ga_track", "../../library/common", "library/template", "../../templates/loading", "./group", "../../templates/show/group", "../../templates/show/cartItem", "../../templates/show/combineItem", "../../templates/show/promo", "../../templates/show/undoDelete", "./analytics", "./statistics", "../../templates/show/content", "../../templates/show/sale_gifts", "../../templates/show/common_handler", "../../templates/show/timer", "../../templates/show/pay_account", "../../templates/show/retail_global"],
function(a) {
    var b = a("../../library/ga_track"),
    c = a("../../library/common"),
    d = a("library/template"),
    e = a("./group"),
    f = a("./statistics"),
    g = a("./analytics"),
    h = {},
    i = {
        FULL: "FULL",
        HALF: "HALF",
        NONE: "NONE"
    };
    d.helper("num2Fixed",
    function(a, b) {
        return new Number(a).toFixed(b)
    });
    var j = {
        content: a("../../templates/show/content"),
        saleGifts: a("../../templates/show/sale_gifts"),
        commonHandler: a("../../templates/show/common_handler"),
        timer: a("../../templates/show/timer"),
        account: a("../../templates/show/pay_account"),
        retailGlobal: a("../../templates/show/retail_global")
    },
    k = [{
        type: "product",
        title: "聚美优品发货"
    },
    {
        type: "media",
        title: "名品特卖"
    },
    {
        type: "global",
        title: "海外直邮",
        hasGroup: !0
    },
    {
        type: "promo_cards",
        title: "聚美红包"
    }],
    l = GLOBAL.initData.item_limit,
    m = function(a) {
        d.compile("show/common_handler", j.commonHandler),
        d.compile("show/timer", j.timer),
        a.gifts_info && d.compile("show/sale_gifts", j.saleGifts),
        d.helper("$show_item_quantity_limit", l)
    },
    n = null,
    o = function(a) {
        this.options = a,
        this.groups = {},
        f.init(a.data),
        this.init(a),
        g.init(window, document, encodeURIComponent, a.data)
    };
    return o.init = function(a) {
        return n || (n = new o(a)),
        n
    },
    o.prototype = {
        constructor: o,
        init: function(a) {
            var b = a.data || {
                etime: 1e3
            };
            b.marketPriceShow || $.extend(b, {
                marketPriceShow: !1
            }),
            this.options = a,
            this.groups = {},
            this.initAOP(),
            m(b),
            this.render(b),
            b.isEmpty ? this.initEmptyShow() : this.initHandlerScroll(),
            b.recommend && this._initRecommend(a),
            b.gifts_info && this.initSaleGifts(b),
            this._bindEvents(b),
            this.gaTrackAdd("view")
        },
        _initRecommend: function(b) {
            var c = $(window),
            d = $(".common_handler"),
            e = !1,
            f = function() {
                e || (a.async("./recommend",
                function(a) {
                    a.init(b)
                }), e = !0)
            };
            return 0 == d.length ? (f(), void 0) : d.hasClass("common_handler_fixed") ? (c.scroll(function() {
                d.hasClass("common_handler_fixed") || f()
            }), void 0) : (f(), void 0)
        },
        initEmptyShow: function() {
            var a = this.element.find(".search_block form"),
            b = a.find("input[name='search']");
            a.submit(function() {
                var a = b.val();
                return ! a || a.length < 2 ? (alert("搜索字数太少，会影响到搜索结果，重新填写一下吧"), !1) : void 0
            }),
            c.util.placeholderShim(b)
        },
        initHandlerScroll: function(a) {
            var b = this.element.find(".common_handler"),
            c = this.element.find(".common_handler_anchor"),
            d = $(window),
            e = function() {
                var a = d.scrollTop(),
                e = d.height(),
                f = c.offset().top + b.height(),
                g = a + e;
                f > g ? b.addClass("common_handler_fixed") : b.removeClass("common_handler_fixed")
            };
            a || (d.scroll(e), d.resize(e)),
            e()
        },
        initSaleGifts: function() {
            var a = this.element.find("#sale_gifts_box"),
            b = a.find(".JS_sale_gifts_nav ");
            b.mouseover(function() {
                var c = $(this),
                d = c.attr("data-for"),
                e = a.find("#" + d);
                b.removeClass("active"),
                c.addClass("active"),
                a.find(".gifts_container").removeClass("active"),
                e.addClass("active")
            }),
            this.saleGiftTips = b,
            this.saleGiftEl = a,
            a.delegate(".disabled .gift_item_add", "click",
            function(a) {
                return a.preventDefault(),
                !1
            })
        },
        toggleSaleGiftStatus: function(a) {
            if (a && a.total_amount && this.saleGiftTips) {
                var b = this,
                c = new Number(a.total_amount),
                d = this.saleGiftTips;
                d.each(function(a, d) {
                    var e = $(d),
                    f = b.saleGiftEl.find("#" + e.attr("data-for")),
                    g = new Number(e.attr("data-sale-price"));
                    g > c ? f.addClass("disabled") : f.removeClass("disabled")
                })
            }
        },
        initTimer: function(a, b) {
            var d = this.element.find(".cart_timer_text"),
            e = this.element.find(".cart_timer_wrapper");
            this.cdInterval && window.clearInterval(this.cdInterval),
            a > 0 ? (a = 1e3 * a, e.removeClass("cart_out_of_time"), this.cdInterval = setInterval(function() {
                if (a >= b) {
                    var f = c.util.countDownFormat(a, "mm分ss秒");
                    d.text(f),
                    a -= b
                } else e.addClass("cart_out_of_time")
            },
            b)) : e.addClass("cart_out_of_time")
        },
        renderContent: function(a) {
            var b = d.compile(j.content)(a);
            this.element = $(b)
        },
        beforeRender: function(a) {
            var b = a.promo_sale_type;
            d.helper("$show_get_promo_type",
            function(a) {
                return b[a]
            })
        },
        render: function(a) {
            if (this.beforeRender(a), this.renderContent(a), this._promoSaleType = a.promo_sale_type, !a.isEmpty) for (var b in k) {
                var c = k[b],
                d = c.type,
                e = c.title,
                f = c.hasGroup,
                g = a[d];
                g && (f ? $.isArray(g) && $.each(g,
                function(b, c) {
                    $.extend(c, {
                        marketPriceShow: a.marketPriceShow
                    })
                }) : $.extend(g, {
                    marketPriceShow: a.marketPriceShow
                })),
                f ? this.renderGroupWithSub(g, e, d) : this.renderGroup(g, e, d)
            }
            this.initTimer(a.etime, 1e3),
            this.initClearSoldout(),
            this.element.appendTo(this.options.container)
        },
        initClearSoldout: function() {
            var a, b, c, d = this,
            e = this.element,
            f = e.find(".sold_out,.cb_sold_out"),
            g = f.length;
            g && (a = e.find(".common_handler"), b = $("<span class='seperate_line'>|</span>"), c = $("<a class='clear_sold_out' href='javascript:void(0)'>删除已抢光商品</a>").click(function() {
                d.doClearSoldOut()
            }), a.append(b).append(" ").append(c))
        },
        doClearSoldOut: function() {
            $.ajax({
                url: "/i/cart/delSkuNoNum",
                success: function(a) {
                    a && "success" === a.status ? (window.location = window.location, c.ui.loading("操作成功，正在刷新...")) : alert("删除失败，请重试或刷新页面")
                }
            })
        },
        getAllGroupsItems: function() {
            var a, b, d, e, f = Array.prototype,
            g = this.groups,
            h = [],
            i = c.util.plainObj2Array;
            for (var j in k) if (b = k[j], a = g[b.type]) if (b.hasGroup) for (var d in a) e = a[d],
            e && e.itemsHash && (h = f.concat(h, i(e.itemsHash)));
            else a.itemsHash && (h = f.concat(h, i(a.itemsHash)));
            return h
        },
        gaTrackAdd: function(a) {
            try {
                var c = this.getAllGroupsItems();
                b.track_add(a, c)
            } catch(d) {}
        },
        initAOP: function() {
            var a = c.func.after;
            this.render = a(this.render, this.initSoldoutState, this.refreshSelectState)
        },
        initSoldoutState: function(a) {
            if (!a || !a.isEmpty) {
                var b = !0;
                this.processEachGroup(function(a) {
                    b = a.isNoneInSold() && b
                }),
                b ? this.element.find("#go_to_order").addClass("disabled") : this.element.find("#go_to_order").removeClass("disabled")
            }
        },
        processEachGroup: function(a, b) {
            var c, d, e, f, g = Object.prototype.hasOwnProperty,
            h = this.groups;
            for (var i in k) if (g.call(k, i) && (d = k[i], c = h[d.type])) if (d.hasGroup) {
                for (var j in c) if (g.call(c, j) && (e = c[j], e && (f = a.call(this || b, e), f === !1))) break
            } else if (c && (f = a.call(this || b, c), f === !1)) break
        },
        refreshSelectState: function(a) {
            if (!a || !a.isEmpty) {
                var b = this.calculateSelectState();
                this.setSelector(b),
                this.toggleGoToOrderBySelect(b)
            }
        },
        calculateSelectState: function() {
            var a = !0,
            b = 0,
            c = i.NONE;
            return this.processEachGroup(function(c) {
                if (c && !c.isNoneInSold()) {
                    var d = c.getSelectState();
                    "FULL" !== d.state && (a = !1),
                    b += d.selectedNum
                }
            }),
            c = 0 === b ? i.NONE: a === !0 ? i.FULL: i.HALF,
            {
                selectedNum: b,
                state: c
            }
        },
        setSelector: function(a) {
            var b = !1;
            a.state === i.FULL && (b = !0),
            this.element.find(".js_all_selector")[0].checked = b
        },
        toggleGoToOrderBySelect: function(a) {
            var b = this.element.find("#go_to_order");
            0 === a.selectedNum ? b.addClass("disabled") : a.selectedNum > 0 && b.removeClass("disabled")
        },
        onSelectorChecked: function(a) {
            var b = [];
            this.processEachGroup(function(c) {
                b = b.concat(c.getSelectChangedItemkeys(a))
            }),
            this.localSelectItems(a, b)
        },
        renderGroup: function(a, b, c, d) {
            var f = this,
            g = this.groups,
            h = null;
            a && (h = new e({
                container: this.element.find(".groups_wrapper"),
                data: a,
                title: b,
                type: c,
                subType: d,
                onGaTrackAdd: function(a, b) {
                    f.gaTrackAdd(a, b)
                },
                onChange: function(a, b, c, d) {
                    f.refreshNumAndPrice(),
                    f.onFrameDataChange(a),
                    "delete" === d ? f.syncGroupState(!1, [c]) : f.syncGroupState(!0, [c]),
                    f.refreshSelectState()
                }
            }), h.on("onItemSelect",
            function(a, b) {
                f.localSelectItems(b, a)
            }).on("onSelectStateChange",
            function() {
                f.refreshSelectState()
            })),
            d ? g[c][d] = h: g[c] = h
        },
        onFrameDataChange: function(a) {
            var b = this,
            c = b.element,
            e = this.options.data,
            f = d.get("show/common_handler")(e);
            c.find(".common_handler").empty().append($(f)),
            a.showcd && 1 != a.showcd ? c.find(".cart_timer_wrapper").hide() : c.find(".cart_timer_wrapper").show(),
            b.options.data.gifts_info && b.toggleSaleGiftStatus(e),
            null != a.etime && b.initTimer(a.etime, 1e3),
            b.initClearSoldout(),
            b.initHandlerScroll(!0)
        },
        renderGroupWithSub: function(a, b, c) {
            this.groups[c] = {};
            var d = this;
            $.each(a || [],
            function(a, e) {
                d.renderGroup(e, b, c, e.shipping_system_id)
            })
        },
        refreshNumAndPrice: function() {
            var a = this.options.data,
            b = 0,
            c = 0;
            this.processEachGroup(function(a) {
                var d = a.options.data.quantity,
                e = a.options.data.group_total_amount;
                b += Number(e),
                c += Number(d)
            }),
            a.total_amount = b,
            a.quantity = c
        },
        localSelectItems: function(a, b) {
            var c = this;
            return b && b.length ? (c.syncGroupState(a, b), c.refreshNumAndPrice(), c.refreshGroupFrame(), c.onFrameDataChange({}), c.refreshSelectState(), void 0) : (c.refreshSelectState(), void 0)
        },
        ajaxSelectItems: function(a, b) {
            var c, d = this;
            return b && b.length ? (c = a === !0 ? "/i/cart/ajax_select_items": "/i/cart/ajax_cancel_items", $.ajax({
                url: c,
                type: "post",
                data: {
                    items_key: b.join("|"),
                    _ajax_: 1,
                    rich: +new Date
                },
                success: function(c) {
                    "success" === c.status ? (d.refreshGroupFrame(c), d.onFrameDataChange({
                        before_baoyou_postage: c.before_baoyou_postage,
                        quantity: c.quantity,
                        total_amount: c.redeem_amount,
                        showcd: c.showcd,
                        etime: c.sec
                    }), d.syncGroupState(a, b)) : (d._toggleBannerTip(c.error_msg || "请求失败，请刷新页面或重试"), d.syncGroupState(void 0, b))
                },
                error: function() {
                    d._toggleBannerTip("请求失败，请刷新页面或重试"),
                    d.syncGroupState(void 0, b)
                }
            }), void 0) : (d.refreshSelectState(), void 0)
        },
        syncGroupState: function(a, b) {
            this.processEachGroup(function(c) {
                c.syncItemsSelectState(b, a)
            })
        },
        refreshGroupFrame: function() {
            var a, b = this.groups;
            Object.prototype.hasOwnProperty;
            var c, d;
            for (c in b) if (this._getGroupCfgByType(c).hasGroup) for (d in b[c]) a = b[c][d],
            a && a.refreshGroupContent && a.refreshGroupContent({});
            else a = b[c],
            a && a.refreshGroupContent && a.refreshGroupContent({})
        },
        _toggleBannerTip: function(a, b) {
            var c = this.element.find(".cart_notification");
            if (a) {
                var d = c.find(".message");
                b ? d.html(a) : d.find("p").text(a),
                c.show(),
                $(window).scrollTop(0, 500)
            } else c.hide()
        },
        _getGroupCfgByType: function(a) {
            for (var b = 0,
            c = k.length; c > b; b++) if (k[b].type === a) return k[b]
        },
        _getSelectedItems: function() {
            return this._getItems(function(a) {
                var b = !1;
                a.is_cb && $.each(a.sub_items,
                function(a, c) {
                    return "app" === c.platform ? (b = !0, !1) : void 0
                });
                var c = !1;
                return c = a.is_cb ? b: "app" === a.platform,
                !!a.selected && !a.sale_status && !c
            })
        },
        _getItems: function(a) {
            var b = [];
            return this.processEachGroup(function(c) {
                b = b.concat(c.getItems(a))
            }),
            b
        },
        _goToOrder: function(a, b) {
            var c = $("#form_to_order"),
            d = c.find("[name='items_key']");
            0 === b.length && window.location.reload(!0),
            c.attr("action", a),
            d.val(b),
            c.submit()
        },
        _clearSelected: function() {
            var a = this.calculateSelectState(),
            b = 0,
            d = [];
            if (a.state === i.FULL ? b = 1 : d = c.util.pluck(this._getSelectedItems(), "item_key"), !b && 0 === d.length) return alert("请选择要删除的商品"),
            void 0;
            if (confirm("您确定要清空选中的商品吗？")) {
                try {
                    $.each(this._getSelectedItems(),
                    function(a, b) {
                        g.yimaDelete(b)
                    })
                } catch(e) {
                    console.log(e)
                }
                setTimeout(function() {
                    c.util.standardPost("/i/cart/clear/?from=cartadd_clearcart&which_cart=all", {
                        all: b,
                        items_key: d.join(",")
                    },
                    50)
                })
            }
        },
        _checkPOPAmount: function() {
            var a = 1e3,
            b = !0;
            return this.processEachGroup(function(c) {
                var d = c.options.type,
                e = c.options.data.group_total_amount,
                f = c.options.data.quantity;
                return "global" === d && f > 1 && e >= a ? (b = !1, !1) : void 0
            }),
            b || this._toggleBannerTip("海关公告规定，极速免税单个商家多件商品结算不能超过1000元，请选择商品结算。"),
            b
        },
        _retailGlobal: function(b) {
            var c = this,
            e = function(b) {
                var e = f(b.list);
                a.async(["./slide.js"],
                function() {
                    $("#JS_loading_box").remove(),
                    $("body").append(d.compile(j.retailGlobal)(e));
                    var a = $("#JS_retail_global_dialog");
                    a.dialog({
                        onClose: function() {
                            a.parents(".lightbox").remove()
                        }
                    }).show(),
                    g(a, b.callback),
                    c.bindPayHander = !1
                })
            },
            f = function(a) {
                for (var b = [], c = {},
                d = 0, e = 0, f = a.length; f > e; e++) for (var g = 0; g < a[e].num; g++) b.push(a[e]),
                d++,
                a[e].is_cb && d++;
                return c = {
                    list: b,
                    isScroll: d > 4 ? !0 : !1
                }
            },
            g = function(a, b) {
                var c = a.find(".JS_order_btn").length,
                d = 0;
                a.delegate(".JS_order_btn", "click",
                function() {
                    var b = $(this);
                    b.hasClass("checked_order") || (b.addClass("checked_order").find("span").html("已下单"), d++, d == c && (a.find(".JS_pay_btn").addClass("pay_btn_active"), a.find(".JS_order_warning_tips").hide()))
                }),
                a.delegate(".JS_pay_btn", "click",
                function() {
                    var a = $(this);
                    a.hasClass("pay_btn_active") && b()
                })
            };
            e(b)
        },
        _handleBindPhone: function(b, c, e, f) {
            var g = this;
            a.async(["../../templates/show/show_bind_phone"],
            function(a) {
                function i() {
                    var b = d.compile(a)({});
                    $("body").append(b)
                }
                function j(a, b) {
                    b ? (a.find("span").text(b), a.css({
                        visibility: "visible"
                    })) : (a.css({
                        visibility: "hidden"
                    }), a.find("span").text(""))
                }
                function k(a) {
                    var b = $(a.target),
                    c = b.attr("name"),
                    d = b.parent().siblings(".error_message");
                    j(d, w[c].message)
                }
                function l(a) {
                    a ? (t = !0, u.show()) : (t = !1, u.hide())
                }
                $(".show_bind_phone").length ? $(".show_bind_phone").show() : i();
                var m = $(".show_bind_phone"),
                n = m.find(".close"),
                o = m.find(".bind_phone_tip"),
                p = m.find(".form_error_tip"),
                q = m.find(".phone_number input"),
                r = (m.find(".change_code"), m.find(".code"), m.find('.message_code input[name="confirm_code"]')),
                s = m.find('.message_code input[type="button"]'),
                t = !1,
                u = m.find(".phone_number_ok"),
                v = (m.find(".input_data"), m.find('button[type="submit"]')),
                w = {
                    phone_number: {
                        reg: /^[0-9]{11}$/,
                        validate: "您输入的手机号格式有误",
                        message: "请输入11位手机号码",
                        empty: "请输入11位手机号码"
                    },
                    confirm_code: {
                        message: "请输入短信校验码",
                        empty: "请输入短信校验码"
                    }
                };
                o.text(b.error_msg),
                n.click(function() {
                    $("#JS_loading_box").remove(),
                    m.hide(),
                    g.bindPayHander = !1
                }),
                q.blur(function(a) {
                    var b = $(a.target),
                    c = b.val(),
                    d = b.attr("name"),
                    e = b.parent().siblings(".error_message");
                    c ? w[d].reg.test(c) ? (j(e, ""), l(!0)) : (l(!1), j(e, w[d].validate)) : (l(!1), j(e, w[d].empty))
                }).focus(function(a) {
                    k(a)
                }),
                r.blur(function(a) {
                    var b = $(a.target),
                    c = b.val(),
                    d = b.attr("name"),
                    e = b.parent().siblings(".error_message");
                    c ? j(e, "") : j(e, w[d].empty)
                }).focus(function(a) {
                    k(a)
                }),
                s.click(function() {
                    if (!t || $(this).hasClass("disabled")) return q.blur(),
                    void 0;
                    var a = 60;
                    s.val(a + "秒后重试"),
                    s.addClass("disabled");
                    var b = setInterval(function() {
                        a > 0 ? (a--, s.val(a + "秒后重试")) : (clearInterval(b), s.val("获取短信校验码"), s.removeClass("disabled"))
                    },
                    1e3);
                    $.ajax({
                        url: "/i/account/ajax_mobile_bind",
                        type: "get",
                        dataType: "json",
                        data: {
                            action: "send_sms",
                            from: h.cartWebMobileFrom,
                            operationType: "operationtype_user_bind_mobile",
                            token: h.cartWebMobileToken,
                            mobile: q.val()
                        },
                        success: function(a) {
                            alert(a.message)
                        }
                    })
                });
                var x = !1;
                v.click(function() {
                    $(this),
                    (t && r.val() || x) && (x = !0, $.ajax({
                        url: "/i/account/ajax_mobile_bind",
                        type: "get",
                        dataType: "json",
                        data: {
                            action: "try_bind",
                            from: h.cartWebMobileFrom,
                            operationType: "operationtype_user_bind_mobile",
                            token: h.cartWebMobileToken,
                            mobile: q.val(),
                            confirm_code: r.val()
                        },
                        success: function(a) {
                            x = !1,
                            "success" === a.error ? ($("#JS_loading_box").html(""), m.html('<div class="bind_success clearfix"><i></i>绑定成功，正在为您跳转购物车页面...</div>'), m.css({
                                margin: "-30px 0 0 -150px"
                            }), setTimeout(function() {
                                g._splitOrder(c, e, f)
                            },
                            1e3)) : (p.find("span").text("绑定失败，" + a.message), p.show())
                        }
                    }))
                })
            })
        },
        _splitOrder: function(b, c, e) {
            var f = this,
            g = b.jumei_confirm_url,
            i = function(a) {
                a.global_confirm_url = b.global_confirm_url,
                a.jumei_confirm_url = b.jumei_confirm_url,
                a.pageMax = 4,
                a.maxHeight = 0;
                var c = $(window).height();
                a.scrollHeight = 400 > c ? c: 400,
                a.j && (a.maxHeight += 80),
                a.g && (a.maxHeight += 80);
                var d = 0;
                if (a.r) for (var e = 0,
                f = a.r.length; f > e; e++) {
                    d = 0;
                    for (var g = 0,
                    h = a.r[e].items.length; h > g; g++) if (a.r[e].items[g].is_cb) for (var i = 0,
                    j = a.r[e].items[g].cb_items.length; j > i; i++) d++;
                    else d++;
                    a.r[e].count = d,
                    a.maxHeight += 80
                }
                return a
            };
            $.post("/i/cart/ajax_check_confirm_group", {
                items_key: c
            },
            function(j) {
                if (h = j, j.error_msg) return j.is_need_bind_mobile ? f._handleBindPhone(j, b, c, e) : (alert(j.error_msg), window.location.reload(!0)),
                void 0;
                if (j.loginUrl) return window.location.href = j.loginUrl,
                !1;
                if (3 != j.flag) {
                    var k = [];
                    return $("#JS_loading_box").remove(),
                    1 != j.flag ? (g = b.global_confirm_url, k = j.g.items_key) : k = j.items_key ? j.items_key: [],
                    e.attr("href", g),
                    f._goToOrder(g, k.join(",")),
                    f.bindPayHander = !1,
                    e.addClass("disabled"),
                    !1
                }
                j = i(j),
                a.async(["./slide.js", "../../templates/show/pay_account1"],
                function(a, b) {
                    if ($("#JS_loading_box").remove(), j.j && j.j.items && $.isArray(j.j.items)) {
                        var c = 0;
                        $.each(j.j.items,
                        function(a, b) {
                            1 === b.is_cb ? c += b.cb_items.length: c++
                        }),
                        j.j.allImageNum = c
                    }
                    $("body").append(d.compile(b)(j));
                    var e = $("#JS_account_dialog1");
                    e.dialog({
                        onClose: function() {
                            e.parents(".lightbox").remove()
                        }
                    }).show(),
                    $(".JS_slide_jumei_item").each(function() {
                        var b = $(this);
                        a.slide({
                            $dom: b,
                            indexLen: Math.ceil(b.find("img").length / j.pageMax),
                            width: 440
                        })
                    }),
                    f.bindPayHander = !1,
                    e.delegate(".pay_btn", "click",
                    function() {
                        var a = $(this),
                        b = a.attr("href"),
                        c = a.attr("data-index");
                        if (!a.hasClass("disabled")) {
                            e.find(".pay_btn").attr("href", "javascript:void(0);").addClass("disabled"),
                            a.text("处理中");
                            var d = [];
                            return a.hasClass("pay_btn_gl") ? d = j.g.items_key: a.hasClass("pay_btn_jm_r") ? (d = j.r[c].items_key, j.j && j.j.items_key && (d = d.concat(j.j.items_key))) : (d = j.j.items_key, j.r && $.isArray(j.r) && j.r.length > 0 && (d = d.concat(j.r[0].items_key))),
                            f._goToOrder(b, d.join(",")),
                            !1
                        }
                    })
                })
            },
            "json")
        },
        _confirmOrder: function(b, c, e) {
            var f = this,
            g = b.jumei_confirm_url;
            $.post("/i/cart/ajax_check_confirm", {
                items_key: c
            },
            function(c) {
                if (c.error_msg) return alert(c.error_msg),
                window.location.reload(!0),
                void 0;
                if (c.loginUrl) return window.location.href = c.loginUrl,
                !1;
                if (3 == c.flag) {
                    if (!c.g.items.length || !c.g.items.length && 1 == c.j.items.length) {
                        var h = c.j.items_key;
                        return f._retailGlobal({
                            list: c.j.retail_global_items,
                            callback: function() {
                                f._goToOrder(b.jumei_confirm_url, h.join(","))
                            }
                        }),
                        void 0
                    }
                    a.async(["./slide.js"],
                    function(a) {
                        $("#JS_loading_box").remove(),
                        c.global_confirm_url = b.global_confirm_url,
                        c.jumei_confirm_url = b.jumei_confirm_url,
                        c.g.count = c.g.items.length,
                        c.j.count = c.j.items.length,
                        $("body").append(d.compile(j.account)(c));
                        var e = $("#JS_account_dialog");
                        e.dialog({
                            onClose: function() {
                                e.parents(".lightbox").remove()
                            }
                        }).show(),
                        a.slide({
                            $dom: $("#JS_slide_jumei_item"),
                            itemNum: 5,
                            width: 320
                        }),
                        a.slide({
                            $dom: $("#JS_slide_globel_item"),
                            itemNum: 5,
                            width: 320
                        }),
                        f.bindPayHander = !1,
                        e.delegate(".pay_btn", "click",
                        function() {
                            var a = $(this),
                            b = a.attr("href");
                            if (!a.hasClass("disabled")) {
                                e.find(".pay_btn").attr("href", "javascript:void(0);").addClass("disabled"),
                                a.text("处理中");
                                var d = c.j.items_key;
                                return a.hasClass("pay_btn_gl") && (d = c.g.items_key),
                                c.j.retail_global_items.length && a.hasClass("pay_btn_jm") ? (e.parent().find(".close").click(), f._retailGlobal({
                                    list: c.j.retail_global_items,
                                    callback: function() {
                                        f._goToOrder(b, d.join(","))
                                    }
                                })) : f._goToOrder(b, d.join(",")),
                                !1
                            }
                        })
                    })
                } else {
                    var h = void 0;
                    $("#JS_loading_box").remove(),
                    1 != c.flag ? (g = b.global_confirm_url, h = c.g.items_key) : h = c.items_key,
                    e.attr("href", g),
                    f._goToOrder(g, h.join(",")),
                    f.bindPayHander = !1,
                    e.addClass("disabled")
                }
            },
            "json")
        },
        _alertMessageForOrderLimit: function(a, b, c, d) {
            var e, f = "";
            switch (a) {
            case "product":
                e = "国内";
                break;
            case "retail_global":
                e = "极速免税",
                f = "异国";
                break;
            default:
                e = "国内"
            }
            var g;
            switch (b) {
            case 429:
                g = "食品";
                break;
            case 1384:
                g = "母婴食品";
                break;
            default:
                g = "食品"
            }
            return c > d ? e + g + "一次购物需满" + Number(c).toFixed(2) + "元，您还差" + Number(c - d).toFixed(2) + "元；去继续挑选" + f + "美味吧^_^": null
        },
        _bindEvents: function(e) {
            var f = this;
            f.bindPayHander = !1,
            f.element.delegate("#go_to_order", "click",
            function() {
                var b = $(this);
                if (e.jumei_confirm_url, f.gaTrackAdd("clicked"), !b.hasClass("disabled") && !f.bindPayHander) {
                    f.bindPayHander = !0;
                    var g = [];
                    f.processEachGroup(function(a) {
                        var b, c, d, e, f = a.getItems();
                        if (f) for (b = 0, c = f.length; c > b; b++) if (d = f[b], d.is_cb) for (var h = 0,
                        i = d.sub_items.length; i > h; h++) e = d.sub_items[h],
                        g.push({
                            category_v3_3: e.category_v3_3,
                            quantity: e.quantity,
                            product_type: e.product_type,
                            product_id: e.product_id,
                            brand_id: e.brand_id,
                            price: e.item_price,
                            sold: e.sale_status ? 1 : 2,
                            category_v3_1: d.category_v3_1,
                            category_v3_2: d.category_v3_2,
                            item_category: d.item_category,
                            is_main: 1 == d.is_main,
                            is_cb: d.is_cb,
                            is_food: d.is_food
                        });
                        else g.push({
                            category_v3_3: d.category_v3_3,
                            quantity: d.quantity,
                            product_type: d.product_type,
                            product_id: d.product_id,
                            brand_id: d.brand_id,
                            price: d.item_price,
                            sold: d.sale_status ? 1 : 2,
                            category_v3_1: d.category_v3_1,
                            category_v3_2: d.category_v3_2,
                            item_category: d.item_category,
                            is_main: 1 == d.is_main,
                            is_cb: d.is_cb,
                            is_food: d.is_food
                        })
                    });
                    try {
                        "function" == typeof setCart.settle && setCart.settle(),
                        "function" == typeof setCart.settle2 && setCart.settle2(g)
                    } catch(h) {}
                    var i = 19.9,
                    j = {},
                    k = [],
                    l = ["product", "retail_global"],
                    m = [429, 1384];
                    $.each(g,
                    function(a, b) {
                        1384 == b.category_v3_2 && 429 == b.category_v3_1 && (b.category_v3_1 = -1)
                    }),
                    $.each(m,
                    function() {
                        var a = 1 * (this + "");
                        $.each(l,
                        function() {
                            var b = this + "",
                            c = b + a;
                            k.push(c);
                            var d = $.grep(g,
                            function(c) {
                                var d = 1384 == a ? "category_v3_2": "category_v3_1";
                                return 1 == c.is_cb ? c.is_main && c[d] == a && c.item_category == b && 1 == c.is_food: c[d] == a && c.item_category == b && 1 == c.is_food
                            }),
                            e = 0,
                            h = !1;
                            $.each(d,
                            function() {
                                $('tr[product_id="' + this.product_id + '"]').find('input[type="checkbox"]:visible').is(":checked") && (h = !0, e += this.quantity * this.price)
                            }),
                            j[c] = {
                                show: h,
                                total: e
                            },
                            h && i > e && (j[c].message = f._alertMessageForOrderLimit(b, a, i, e))
                        })
                    });
                    var n;
                    if ($.each(k,
                    function() {
                        return j[this].message ? (n = j[this], !1) : void 0
                    }), n) return alert(n.message),
                    f.bindPayHander = !1,
                    void 0;
                    var o = $('.js_item_selector[data-app="app"]');
                    if (o.is(":checked")) {
                        var p = o.parent(),
                        q = p.find("a.cart_item_link").attr("title");
                        return alert("[" + q + "]为APP专享，请在聚美客户端结算哦！"),
                        f.bindPayHander = !1,
                        void 0
                    }
                    a.async("../../templates/loading",
                    function(a) {
                        $("body").append(d.compile(a)({}));
                        var g = f._getSelectedItems(),
                        h = c.util.pluck(g, "item_key"),
                        i = h.join(",");
                        Number(e.confirm_version) ? f._splitOrder(e, i, b) : f._confirmOrder(e, i, b)
                    })
                }
            }).delegate(".clear_cart_all", "click",
            function(a) {
                return b.ga_event("cart_empty", RM_CONTROL + "_" + RM_ACTION, ""),
                f._clearSelected(),
                a.preventDefault && a.preventDefault(),
                !1
            }).delegate(".go_back_shopping", "click",
            function() {
                b.ga_event("continue_shopping", RM_CONTROL + "_" + RM_ACTION, "")
            }),
            this.element.delegate(".js_all_selector", "click",
            function() {
                var a = $(this),
                b = a[0].checked;
                f.onSelectorChecked(b)
            }),
            this.element.delegate("#cart_side_nav a", "click",
            function() {
                c.ui.loading(),
                a.async(["../../templates/show/cart_popd_cj", "../../library/jquery.lightbox.js"],
                function(a) {
                    c.ui.loaded();
                    var b = $(d.compile(a)({})),
                    e = b.dialog({
                        onClose: function() {
                            b.parents(".lightbox").remove()
                        }
                    }).show();
                    b.siblings("h2").children("#cboxClose").html('<i class="close_btn png"></i>');
                    var f = b.find("#cart_survey_textarea"),
                    g = f.attr("note"),
                    h = b.find(".cart_pop_tip"),
                    i = b.find(".cart_popd_hash"),
                    j = b.find(".cart_popd_email"),
                    k = b.find(".cart_popd_name"),
                    l = function() {
                        setTimeout(function() {
                            h.hide()
                        },
                        1e3)
                    };
                    f.val(g),
                    f.focus(function() {
                        $(this).css("color", "#000"),
                        $(this).val() == g && $(this).val("")
                    }).blur(function() {
                        var a = $(this).val();
                        "" == a && ($("#cart_survey_textarea").val(g), $(this).css("color", "#ccc"))
                    }),
                    b.find("#change_code").click(function() {
                        var a = new Date,
                        b = "/i/cart/hash_code?from=user_feedback&" + a.getTime();
                        $("#code").attr("src", b)
                    }),
                    b.find("#change_code").click(),
                    b.find(".cart_pop_form").submit(function(a) {
                        a.preventDefault();
                        var c = f.val(),
                        d = i.val(),
                        m = j.val(),
                        n = k.val();
                        return "" == $.trim(n) ? (h.text("请填您的称呼。").show(), l(), !1) : "" == $.trim(m) ? (h.text("请填写联系方式。").show(), l(), !1) : "" == $.trim(c) || c == g ? (h.text("请填写建议内容。").show(), l(), !1) : "" == $.trim(d) ? (h.text("请填写验证码。").show(), l(), !1) : ($.ajax({
                            url: "/i/feedback/addfeedback",
                            type: "post",
                            dataType: "json",
                            data: {
                                feedback_from: "cart",
                                name: n,
                                content: c,
                                verify_code: d,
                                email: m
                            },
                            success: function(a) {
                                "success" == a.error ? (h.text("提交成功，感谢您的参与！").show(), l(), setTimeout(function() {
                                    $(e.lightbox).find("#cboxClose").click()
                                },
                                1e3)) : (h.text(a.message).show(), l(), b.find("#change_code").click())
                            }
                        }), !1)
                    })
                })
            })
        }
    },
    $.extend(o.prototype, c.Events),
    o
}),
define("library/ga_track", [],
function() {
    var a = {
        ga_event: function(a, b, c) {
            try {
                _gaq.push(["_trackEvent", a, b, c])
            } catch(d) {}
        },
        track_add: function(a, b) {
            try {
                if (_gaq.push(["_trackEvent", "new_cart_add", a]), !b || b.length <= 0) return ! 1;
                for (var c, d, e, f, g, h, i = b.length,
                j = 0; i > j; j++) c = b[j],
                d = c.deal_hash_id || c.product_id,
                e = c.short_name,
                g = c.item_price,
                h = c.quantity,
                f = c.deal_hash_id ? "deal": "product",
                _gaq.push(["_addItem", "", d, e, f, g, h]);
                _gaq.push(["_trackTrans"])
            } catch(k) {}
        },
        track_confirmation: function(a) {
            try {
                _gaq.push(["_trackEvent", "new_cart_confirmation", a])
            } catch(b) {}
        },
        track_pay: function(a) {
            try {
                _gaq.push(["_trackEvent", "new_cart_pay", a])
            } catch(b) {}
        },
        track_check: function(a) {
            try {
                _gaq.push(["_trackEvent", "new_cart_check", a])
            } catch(b) {}
        }
    };
    return a
}),
define("library/common", ["library/template", "templates/loading"],
function(a) {
    var b = a("library/template"),
    c = a("templates/loading"),
    d = Object.prototype,
    e = (String.prototype, Array.prototype),
    f = {}; !
    function() {
        var a = function(a) {
            return window[a]
        },
        c = function(a, b, c) {
            var d = 0,
            e = a,
            f = !1;
            if (a.length <= b / 2) return a;
            for (var g = 0; g < a.length; g++) if (f = a.charCodeAt(g) > 256, f ? d += 2 : d++, d > b) {
                e = a.slice(0, f ? g - 1 : g - 2) + (c || "…");
                break
            }
            return e
        },
        d = {
            cutStr: c
        };
        b.helper("getGlobalVar", a),
        b.helper("tplUtils", d),
        b.helper("Date", Date)
    } ();
    var g = {
        countDownFormat: function(a) {
            var b, c, d, e, f, a, g = a,
            h = 864e5,
            i = 36e5,
            j = 6e4,
            k = 1e3,
            l = 100,
            m = function(a, b) {
                var c = parseInt(g / a).toString();
                return b && (c = c.length > 1 ? c: "0" + c),
                g %= a,
                c
            };
            return g > 0 ? (b = m(h, !0), c = m(i, !0), d = m(j, !0), e = m(k, !0), f = m(l), d + "分" + e + "秒") : null
        },
        getUrlArgs: function(a) {
            var b = window.location.href;
            return new RegExp(".+" + a + "=([^&]+).*", "gi").test(b) ? RegExp.$1: ""
        }
    };
    f.util = $.extend(f.util || {},
    g);
    var h = {
        throttle: function(a, b) {
            var c;
            return function() {
                var d = this,
                e = arguments;
                clearTimeout(c),
                c = setTimeout(function() {
                    a.apply(d, e)
                },
                b)
            }
        }
    };
    f.util = $.extend(f.util || {},
    h);
    var i = !1,
    j = {
        hasPlaceholderSupport: function() {
            var a = "placeholder",
            b = document.createElement("input");
            return a in b
        },
        placeholderShim: function(a) {
            var b = j.hasPlaceholderSupport();
            return b || (i || ($("body").delegate("input", "focus",
            function() {
                var a = $(this),
                b = a.attr("placeholder");
                a.val() == b ? a.val("") : a.select(),
                a.addClass("ph_shim_focus").removeClass("ph_shim_blur")
            }).delegate("input", "blur",
            function() {
                var a = $(this),
                b = a.attr("placeholder");
                "" == a.val() && a.val(b).addClass("ph_shim_blur").removeClass("ph_shim_focus")
            }), i = !0), $.fn.each.call(a,
            function(a, b) {
                var c = $(b);
                c.val(c.attr("placeholder")).addClass("ph_shim_blur")
            })),
            b
        },
        standardPost: function(a, b) {
            var c, d = $("<form method='post' style='display: none;'></form>");
            d.attr({
                action: a
            }),
            $.each(b,
            function(a, b) {
                c = $("<input type='hidden'>"),
                c.attr({
                    name: a
                }),
                c.val(b),
                d.append(c)
            }),
            d.appendTo(document.body),
            d.submit(),
            document.body.removeChild(d[0])
        }
    };
    f.util = $.extend(f.util || {},
    j);
    var k = {
        plainObj2Array: function(a) {
            var b = [];
            for (var c in a) d.hasOwnProperty.call(a, c) && b.push(a[c]);
            return b
        },
        pluck: function(a, b) {
            for (var c = [], d = 0, e = a.length; e > d; d++) c.push(a[d][b]);
            return c
        }
    };
    f.util = $.extend(f.util || {},
    k);
    var l = null,
    m = {
        loading: function(a) {
            if (!l) {
                var d = b.compile(c)({});
                l = $(d),
                a && l.find(".txt").text(a),
                $("body").append(l)
            }
            return l
        },
        loaded: function() {
            l && (l.remove(), l = null)
        }
    };
    f.ui = m;
    var n = function() {
        var a = function(a) {
            var b = function() {
                var c = arguments.length;
                if (2 === c) {
                    var d = arguments[0],
                    f = arguments[1];
                    return a(d, f)
                }
                return c > 2 ? b.call(this, b.apply(this, e.slice.call(arguments, 0, c - 1)), arguments[c - 1]) : arguments[0]
            };
            return b
        };
        return {
            $stopChain: {
                message: "return this object in a function will abort AOP chain after it"
            },
            before: a(function(a, b) {
                return function() {
                    try {
                        b.apply(this, arguments)
                    } catch(c) {
                        console && console.error(c)
                    }
                    return a.apply(this, arguments)
                }
            }),
            after: a(function(a, b) {
                return function() {
                    var c = a.apply(this, arguments);
                    try {
                        b.apply(this, arguments)
                    } catch(d) {
                        console && console.error(d)
                    }
                    return c
                }
            }),
            chainBefore: a(function(a, b) {
                return function() {
                    var c = b.apply(this, arguments);
                    return c !== n.$stopChain ? a.apply(this, arguments) : void 0
                }
            }),
            chainAfter: a(function(a, b) {
                return function() {
                    var c = a.apply(this, arguments);
                    return c !== n.$stopChain && (c = b.apply(this, arguments)),
                    c
                }
            })
        }
    } ();
    f.func = n;
    var o = function() {
        var a = d.hasOwnProperty,
        b = d.toString,
        c = e.slice,
        f = {
            once: function(a) {
                var b, c = !1;
                return function() {
                    return c ? b: (c = !0, b = a.apply(this, arguments), a = null, b)
                }
            },
            isObject: function(a) {
                return a === Object(a)
            },
            isArray: Array.isArray ||
            function(a) {
                return "[object Array]" == b.call(a)
            },
            isString: function(a) {
                return "[object String]" == b.call(a)
            },
            has: function(b, c) {
                return a.call(b, c)
            },
            keys: function(a) {
                if (!f.isObject(a)) return [];
                if (nativeKeys) return nativeKeys(a);
                var b = [];
                for (var c in a) f.has(a, c) && b.push(c);
                return b
            },
            isEmpty: function(a) {
                if (null == a) return ! 0;
                if (f.isArray(a) || f.isString(a)) return 0 === a.length;
                for (var b in a) if (f.has(a, b)) return ! 1;
                return ! 0
            }
        },
        g = {
            on: function(a, b, c) {
                if (!i(this, "on", a, [b, c]) || !b) return this;
                this._events || (this._events = {});
                var d = this._events[a] || (this._events[a] = []);
                return d.push({
                    callback: b,
                    context: c,
                    ctx: c || this
                }),
                this
            },
            once: function(a, b, c) {
                if (!i(this, "once", a, [b, c]) || !b) return this;
                var d = this,
                e = f.once(function() {
                    d.off(a, e),
                    b.apply(this, arguments)
                });
                return e._callback = b,
                this.on(a, e, c)
            },
            off: function(a, b, c) {
                if (!this._events || !i(this, "off", a, [b, c])) return this;
                if (!a && !b && !c) return this._events = void 0,
                this;
                for (var d = a ? [a] : f.keys(this._events), e = 0, g = d.length; g > e; e++) {
                    a = d[e];
                    var h = this._events[a];
                    if (h) if (b || c) {
                        for (var j = [], k = 0, l = h.length; l > k; k++) {
                            var m = h[k]; (b && b !== m.callback && b !== m.callback._callback || c && c !== m.context) && j.push(m)
                        }
                        j.length ? this._events[a] = j: delete this._events[a]
                    } else delete this._events[a]
                }
                return this
            },
            trigger: function(a) {
                if (!this._events) return this;
                var b = c.call(arguments, 1);
                if (!i(this, "trigger", a, b)) return this;
                var d = this._events[a],
                e = this._events.all;
                return d && j(d, b),
                e && j(e, arguments),
                this
            },
            stopListening: function(a, b, c) {
                var d = this._listeningTo;
                if (!d) return this;
                var e = !b && !c;
                c || "object" != typeof b || (c = this),
                a && ((d = {})[a._listenId] = a);
                for (var g in d) a = d[g],
                a.off(b, c, this),
                (e || f.isEmpty(a._events)) && delete this._listeningTo[g];
                return this
            }
        },
        h = /\s+/,
        i = function(a, b, c, d) {
            if (!c) return ! 0;
            if ("object" == typeof c) {
                for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
                return ! 1
            }
            if (h.test(c)) {
                for (var f = c.split(h), g = 0, i = f.length; i > g; g++) a[b].apply(a, [f[g]].concat(d));
                return ! 1
            }
            return ! 0
        },
        j = function(a, b) {
            var c, d = -1,
            e = a.length,
            f = b[0],
            g = b[1],
            h = b[2];
            switch (b.length) {
            case 0:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
                return;
            case 1:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f);
                return;
            case 2:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g);
                return;
            case 3:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g, h);
                return;
            default:
                for (; ++d < e;)(c = a[d]).callback.apply(c.ctx, b);
                return
            }
        };
        return g.bind = g.on,
        g.unbind = g.off,
        g
    } ();
    return function() {
        $ && $.fn.extend({
            lightbox: function() {
                return lightbox(this)
            },
            dialog: function(a) {
                var b = $('<div class="dialog">').html($("<h2/>").append(a.title || this.attr("dialogTitle") || "&nbsp;").append('<a class="close" href="#"></a>')),
                c = lightbox(b.append(this));
                return $(c.dialog).delegate(".close", "click",
                function() {
                    return c.hide(),
                    a && a.onClose && a.onClose(),
                    !1
                }),
                c
            }
        })
    } (),
    f.Events = o,
    f
}),
function(a) {
    "use strict";
    var b = function(a, c) {
        return b["string" == typeof c ? "compile": "render"].apply(b, arguments)
    };
    b.version = "2.0.4",
    b.openTag = "<%",
    b.closeTag = "%>",
    b.isEscape = !0,
    b.isCompress = !1,
    b.parser = null,
    b.render = function(a, c) {
        var d = b.get(a) || e({
            id: a,
            name: "Render Error",
            message: "No Template"
        });
        return d(c)
    },
    b.compile = function(a, d) {
        function g(c) {
            try {
                return new k(c, a) + ""
            } catch(f) {
                return i ? e(f)() : b.compile(a, d, !0)(c)
            }
        }
        var h = arguments,
        i = h[2],
        j = "anonymous";
        "string" != typeof d && (i = h[1], d = h[0], a = j);
        try {
            var k = f(a, d, i)
        } catch(l) {
            return l.id = a || d,
            l.name = "Syntax Error",
            e(l)
        }
        return g.prototype = k.prototype,
        g.toString = function() {
            return k.toString()
        },
        a !== j && (c[a] = g),
        g
    };
    var c = b.cache = {},
    d = b.helpers = function() {
        var a = function(b, c) {
            return "string" != typeof b && (c = typeof b, "number" === c ? b += "": b = "function" === c ? a(b.call(b)) : ""),
            b
        },
        c = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        d = function(b) {
            return a(b).replace(/&(?![\w#]+;)|[<>"']/g,
            function(a) {
                return c[a]
            })
        },
        e = Array.isArray ||
        function(a) {
            return "[object Array]" === {}.toString.call(a)
        },
        f = function(a, b) {
            if (e(a)) for (var c = 0,
            d = a.length; d > c; c++) b.call(a, a[c], c, a);
            else for (c in a) b.call(a, a[c], c)
        };
        return {
            $include: b.render,
            $string: a,
            $escape: d,
            $each: f
        }
    } ();
    b.helper = function(a, b) {
        d[a] = b
    },
    b.onerror = function(b) {
        var c = "Template Error\n\n";
        for (var d in b) c += "<" + d + ">\n" + b[d] + "\n\n";
        a.console && console.error(c)
    },
    b.get = function(d) {
        var e;
        if (c.hasOwnProperty(d)) e = c[d];
        else if ("document" in a) {
            var f = document.getElementById(d);
            if (f) {
                var g = f.value || f.innerHTML;
                e = b.compile(d, g.replace(/^\s*|\s*$/g, ""))
            }
        }
        return e
    };
    var e = function(a) {
        return b.onerror(a),
        function() {
            return "{Template Error}"
        }
    },
    f = function() {
        var a = d.$each,
        c = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        e = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,
        f = /[^\w$]+/g,
        g = new RegExp(["\\b" + c.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        h = /^\d[^,]*|,\d[^,]*/g,
        i = /^,+|,+$/g,
        j = function(a) {
            return a.replace(e, "").replace(f, ",").replace(g, "").replace(h, "").replace(i, "").split(/^$|,+/)
        };
        return function(c, e, f) {
            function g(a) {
                return r += a.split(/\n/).length - 1,
                b.isCompress && (a = a.replace(/[\n\r\t\s]+/g, " ").replace(/<!--.*?-->/g, "")),
                a && (a = w[1] + l(a) + w[2] + "\n"),
                a
            }
            function h(a) {
                var c = r;
                if (o ? a = o(a) : f && (a = a.replace(/\n/g,
                function() {
                    return r++,
                    "$line=" + r + ";"
                })), 0 === a.indexOf("=")) {
                    var e = !/^=[=#]/.test(a);
                    if (a = a.replace(/^=[=#]?|[\s;]*$/g, ""), e && b.isEscape) {
                        var g = a.replace(/\s*\([^\)]+\)/, "");
                        d.hasOwnProperty(g) || /^(include|print)$/.test(g) || (a = "$escape(" + a + ")")
                    } else a = "$string(" + a + ")";
                    a = w[1] + a + w[2]
                }
                return f && (a = "$line=" + c + ";" + a),
                i(a),
                a + "\n"
            }
            function i(b) {
                b = j(b),
                a(b,
                function(a) {
                    a && !s.hasOwnProperty(a) && (k(a), s[a] = !0)
                })
            }
            function k(a) {
                var b;
                "print" === a ? b = y: "include" === a ? (t.$include = d.$include, b = z) : (b = "$data." + a, d.hasOwnProperty(a) && (t[a] = d[a], b = 0 === a.indexOf("$") ? "$helpers." + a: b + "===undefined?$helpers." + a + ":" + b)),
                u += a + "=" + b + ","
            }
            function l(a) {
                return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
            }
            var m = b.openTag,
            n = b.closeTag,
            o = b.parser,
            p = e,
            q = "",
            r = 1,
            s = {
                $data: 1,
                $id: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            },
            t = {},
            u = "var $helpers=this," + (f ? "$line=0,": ""),
            v = "".trim,
            w = v ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            x = v ? "$out+=$text;return $text;": "$out.push($text);",
            y = "function($text){" + x + "}",
            z = "function(id,data){data=data||$data;var $text=$helpers.$include(id,data,$id);" + x + "}";
            a(p.split(m),
            function(a) {
                a = a.split(n);
                var b = a[0],
                c = a[1];
                1 === a.length ? q += g(b) : (q += h(b), c && (q += g(c)))
            }),
            p = q,
            f && (p = "try{" + p + "}catch(e){" + "throw {" + "id:$id," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + l(e) + ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')" + "};" + "}"),
            p = u + w[0] + p + "return new String(" + w[3] + ");";
            try {
                var A = new Function("$data", "$id", p);
                return A.prototype = t,
                A
            } catch(B) {
                throw B.temp = "function anonymous($data,$id) {" + p + "}",
                B
            }
        }
    } ();
    "function" == typeof define ? define("library/template", [],
    function() {
        return b
    }) : "undefined" != typeof exports && (module.exports = b),
    a.template = b
} (this),
define("templates/loading", [],
function() {
    return '<div class="loading_box" id="JS_loading_box"> <div class="loading_img"></div> <p class="txt">正在处理，请稍候……</p> </div>'
}),
define("views/show/group", ["library/ga_track", "templates/show/group", "templates/show/cartItem", "templates/show/combineItem", "templates/show/promo", "templates/show/undoDelete", "library/common", "library/template", "templates/loading", "views/show/analytics"],
function(a) {
    var b = a("library/ga_track"),
    c = a("templates/show/group"),
    d = a("templates/show/cartItem"),
    e = a("templates/show/combineItem"),
    f = a("templates/show/promo"),
    g = a("templates/show/undoDelete"),
    h = a("library/common"),
    i = a("views/show/analytics"),
    j = {
        FULL: "FULL",
        HALF: "HALF",
        NONE: "NONE"
    },
    k = GLOBAL.initData.item_limit;
    template.compile("show/group/item", d),
    template.compile("show/group/cbItem", e),
    template.compile("show/group/promo", f);
    var l = function(a, b) {
        var c;
        return function() {
            var d = this,
            e = arguments;
            clearTimeout(c),
            c = setTimeout(function() {
                a.apply(d, e)
            },
            b)
        }
    },
    m = function(a, b, c) {
        a = Number(a),
        b = Number(b);
        var d = !1;
        b || (b = k);
        var e = c.find(".decrease_one"),
        f = c.find(".increase_one"),
        g = c.find(".item_quantity");
        return a > 1 && b > a ? (e.removeClass("disabled"), a >= k ? f.addClass("disabled") : f.removeClass("disabled")) : (1 == a ? e.addClass("disabled") : e.removeClass("disabled"), a >= b ? f.addClass("disabled") : f.removeClass("disabled")),
        a >= 1 && b >= a && (d = !0),
        g.val(a),
        d
    },
    n = !1,
    o = function(a) {
        this.options = a,
        this.init(a)
    };
    return o.prototype = {
        constructor: o,
        init: function(a) {
            this.options = a = $.extend({},
            {
                data: null,
                title: "",
                type: "product",
                onChange: $.noop
            },
            a),
            this.initAOP(),
            this.itemsHash = {},
            this.render(a.data),
            this.afterRender(a.data),
            this.bindEvents(a.data),
            this.$groupSelector = this.element.find(".js_group_selector")
        },
        processData: function(a) {
            var b = this.itemsHash;
            a.title = this.options.title;
            for (var c in a.items) {
                var d = a.items[c];
                b[d.item_key] = d
            }
            a.isNoneInSold = this.isNoneInSold(),
            a.isAllSelect = this.isGroupAllSelect()
        },
        render: function(a, b) {
            a._groupType = this.options.type,
            a.items && $.isArray(a.items) && $.each(a.items,
            function(b, c) {
                $.extend(c, {
                    marketPriceShow: a.marketPriceShow
                })
            });
            var d = template.compile("show/group", c)(a),
            e = $(d);
            b ? this.element.html(e.html()) : (this.element = e.addClass("cart_group_item_" + this.options.type), this.element.appendTo(this.options.container)),
            this.element.find("tr").each(function(a, b) {
                $(b).find("span.app-type").length > 0 && $(b).find(".item_quantity_editer").children("span").addClass("disabled").end().children("input").attr("readonly", !0)
            })
        },
        initAOP: function() {
            this.render = h.func.before(this.render, this.processData),
            this.render = h.func.after(this.render, this.refreshGroupSelectState)
        },
        afterRender: function() {},
        renderUndo: function(a, b) {
            var c = template.compile(g)(a),
            d = $(c);
            this.undoEl && (delete this.itemsHash[this.undoEl.attr("data-for")], this.undoEl.remove()),
            this.undoEl = d,
            b.after(d)
        },
        removeUndo: function(a) {
            if (a) {
                var b = this.undoEl.attr("data-for");
                this.element.find("#" + b).show()
            }
            this.undoEl.remove(),
            this.undoEl = null
        },
        refreshGroupContent: function(a) {
            var b = this.element,
            c = b.find(".group_total_price"),
            d = b.find(".cart_group_ship"),
            e = d.find("span"),
            f = d.find(".icon_ship_free"),
            g = b.find(".js_group_selector"),
            h = {
                baoyou_status: "none",
                delivery_fee_desc: "",
                group_total_amount: 0
            },
            i = this.options.data.isNoneInSold = this.isNoneInSold();
            a = $.extend(this.options.data, a || h),
            i === !0 ? g.attr("disabled", "disabled") : g.removeAttr("disabled"),
            d.removeClass("ship_status_1 ship_status_2 ship_status_3 ship_status_none").addClass("ship_status_" + a.baoyou_status),
            1 != a.baoyou_status ? e.html(a.delivery_fee_desc) : f.html(a.delivery_fee_desc),
            c.text("¥" + Number(a.group_total_amount).toFixed(2))
        },
        bindEvents: function() {
            var a = this,
            b = l(this.doUpdateNum, 300);
            this.element.delegate(".delete_item", "click",
            function() {
                var b = $(this).attr("data-item-key");
                a.doDelete(b)
            }).delegate(".decrease_one:not(.disabled),.increase_one:not(.disabled)", "click",
            function() {
                var c = $(this),
                d = c.closest(".item_quantity_editer"),
                e = d.attr("data-item-key"),
                f = a.itemsHash[e],
                g = f.user_purchase_limit || k,
                h = d.find(".item_quantity"),
                i = Number(h.val());
                c.is(".decrease_one") ? i > g ? (alert("您最多能购买" + g + "件该商品"), i = g) : i--:c.is(".increase_one") && (i >= g ? (alert("您最多能购买" + g + "件该商品"), i = g) : i++),
                a.ajaxUpReq && (n = !0, a.ajaxUpReq.abort(), a.ajaxUpReq = null);
                var j = m(i, f.user_purchase_limit || k, d);
                j && b.call(a, e, i, d)
            }).delegate(".item_quantity:enabled", "change",
            function(b) {
                var c = $(this),
                d = c.closest(".item_quantity_editer"),
                e = d.attr("data-item-key"),
                f = a.itemsHash[e],
                g = f.user_purchase_limit || k,
                h = a.itemsHash[e].quantity,
                i = ~~Number(c.val());
                "focusin" === b.type || "focusout" === b.type || "change" === b.type && i != h && (i > g && (alert("您最多能购买" + g + "件该商品"), i = g), m(i, g, d) ? a.doUpdateNum(e, i, d) : m(h, g, d))
            }).delegate(".do_cancel_delete", "click",
            function() {
                var b = $(this),
                c = b.closest(".cancel_delete");
                key = c.attr("data-for"),
                a.doCancelDelete(key)
            }).delegate(".JS_sale_tag", "mouseenter",
            function() {
                $(this).parent().siblings(".JS_pop_box").slideDown(50)
            }).delegate(".JS_tips_pop_full", "mouseleave",
            function() {
                $(this).find(".JS_pop_box").slideUp(50)
            }).delegate(".js_item_selector", "click",
            function() {
                var b = $(this),
                c = b.attr("data-item-key"),
                d = b[0].checked;
                a.trigger("onItemSelect", [c], d)
            }).delegate(".js_group_selector", "click",
            function() {
                var b = $(this),
                c = b[0].checked;
                a.trigger("onItemSelect", a.getSelectChangedItemkeys(c), c)
            })
        },
        syncItemsSelectState: function(a, b) {
            var c, d, e = this._itemsFilter(a);
            if (void 0 !== b) for (c = 0, d = e.length; d > c; c++) e[c].selected = b ? 1 : 0;
            this._syncItemSelector(e),
            this.refreshGroupSelectState(),
            this.refreshNumAndPrice()
        },
        _syncItemSelector: function(a) {
            var b, c, d;
            for (c = 0, d = a.length; d > c; c++) b = a[c],
            this.element.find("[data-item-key='" + b.item_key + "']")[0].checked = b.selected ? !0 : !1
        },
        _itemsFilter: function(a) {
            for (var b, c = [], d = 0, e = a.length; e > d; d++) b = a[d],
            this.itemsHash[b] && c.push(this.itemsHash[b]);
            return c
        },
        getSelectChangedItemkeys: function(a) {
            var b, c, d, e = this._getInSoldItems(),
            f = [];
            for (c = 0, d = e.length; d > c; c++) b = e[c],
            b && !b.__deleted__ && b.selected !== a && f.push(b.item_key);
            return f
        },
        isGroupAllSelect: function() {
            return this.calculateGroupSelectState().state === j.FULL ? !0 : !1
        },
        isNoneInSold: function() {
            var a = this._getInSoldItems();
            return 0 === a.length ? !0 : !1
        },
        refreshNumAndPrice: function() {
            for (var a = 0,
            b = 0,
            c = this.getItems(function(a) {
                var b = !1;
                a.is_cb && $.each(a.sub_items,
                function(a, c) {
                    return "app" === c.platform ? (b = !0, !1) : void 0
                });
                var c = !1;
                return c = a.is_cb ? b: "app" === a.platform,
                !!a.selected && !a.sale_status && !c
            }), d = 0, e = c.length; e > d; d++) {
                var f = c[d],
                g = 0,
                h = f.item_price * f.quantity;
                if (f.is_cb) for (var i = 0,
                j = f.sub_items.length; j > i; i++) {
                    var k = f.sub_items[i];
                    g += k.quantity
                } else g = f.quantity;
                b += Number(g),
                a += h
            }
            this.options.data.group_total_amount = a,
            this.options.data.quantity = b
        },
        getSelectedItems: function() {
            return this.getItems(function(a) {
                return !! a.selected
            })
        },
        getItems: function(a) {
            var b, c, d, e = this.options.data.items,
            f = [];
            for (c = 0, d = e.length; d > c; c++) b = e[c],
            b && !b.__deleted__ && ("function" == typeof a ? a(b) && f.push(b) : f.push(b));
            return f
        },
        _getInSoldItems: function() {
            var a = this;
            return function() {
                var b, c, d, e = [],
                f = a.options.data.items;
                for (Object.prototype.hasOwnProperty, c = 0, d = f.length; d > c; c++) {
                    b = f[c];
                    var g = !1;
                    b.is_cb && $.each(b.sub_items,
                    function(a, b) {
                        return "app" === b.platform ? (g = !0, !1) : void 0
                    });
                    var h = !1;
                    h = b.is_cb ? g: "app" === b.platform,
                    !b || b.__deleted__ || b.sale_status || h || e.push(b)
                }
                return e
            } ()
        },
        calculateGroupSelectState: function() {
            var a, b, c, d = 0,
            e = j.NONE,
            f = this._getInSoldItems();
            for (b = 0, c = f.length; c > b; b++) a = f[b],
            a && 1 === a.selected && d++;
            return e = 0 === d ? j.NONE: d === c ? j.FULL: j.HALF,
            {
                selectedNum: d,
                state: e
            }
        },
        refreshGroupSelectState: function() {
            var a = this.calculateGroupSelectState();
            this.setSelectState(a)
        },
        setSelectState: function(a) {
            var b = this.selectState;
            if (null == b) this.selectState = a;
            else {
                var c = !1;
                a.state === j.FULL && (c = !0),
                this.$groupSelector[0].checked = c,
                this.selectState = a,
                (a.selectedNum !== b.selectedNum || a.state !== b.state) && this.trigger("onSelectStateChange", a)
            }
        },
        getSelectState: function() {
            return this.selectState
        },
        trigglerCallback: function() {
            var a = this.options[arguments[0]],
            b = Array.prototype.slice.call(arguments, 1);
            "function" == typeof a && a.call(this, b)
        },
        doCancelDelete: function(a) {
            var c = this,
            d = this.itemsHash[a];
            this.ajaxRevert(d,
            function() {
                delete d.__deleted__,
                d.selected = 1,
                c.removeUndo(!0),
                b.ga_event("new_cart_recover", RM_CONTROL + "_" + RM_ACTION, a)
            },
            function(a) {
                a && a.error_msg ? alert(a.error_msg) : alert("操作失败，请重试或刷新页面")
            })
        },
        doUpdateNum: function(a, b, c) {
            var d = this,
            e = this.itemsHash[a],
            f = this.options.onGaTrackAdd,
            g = function(b) {
                var c = d.element.find("#" + a),
                f = e.item_price * b,
                g = (e.original_price - e.item_price) * b;
                c.find(".item_total_price").text(Number(f).toFixed(2)),
                c.find(".item_saved_price").text(Number(g).toFixed(2))
            },
            h = function(a) {
                for (var b, c, f = e.quantity,
                g = e.sub_items,
                h = 0,
                i = g.length; i > h; h++) {
                    b = g[h],
                    c = d.element.find("#" + e.item_key).find("[data-cb-item-key='" + b.item_key + "']");
                    var j = b.quantity / f;
                    b.quantity = parseInt(a * j, 10),
                    c.find(".cart_cb_sub_quantity").text(b.quantity)
                }
            };
            this.ajaxUpdate({
                item_key: a,
                item_quantity: b
            },
            function() {
                m(b, e.user_purchase_limit, c),
                g(b),
                e.is_cb && h(b),
                e.quantity = b,
                e.selected = 1,
                f("quantity_change", e)
            },
            function(a) {
                m(e.quantity, e.user_purchase_limit, c),
                a && a.error_msg ? alert(a.error_msg) : alert("操作失败，请重试或刷新页面")
            })
        },
        doDelete: function(a) {
            var b = this,
            c = this.options.onGaTrackAdd,
            d = this.element;
            this.ajaxUpdate({
                item_key: a,
                item_quantity: 0
            },
            function() {
                var e = d.find("#" + a),
                f = b.itemsHash[a];
                i.yimaDelete(f),
                f.__deleted__ = !0,
                e.hide(),
                f.sale_status || b.renderUndo(f, e),
                c("delete", f)
            },
            function(a) {
                a && a.error_msg ? alert(a.error_msg) : alert("删除失败，请重试或刷新页面")
            })
        },
        ajaxUpdate: function(a, b, c) {
            var d = this,
            e = a.item_key,
            f = a.item_quantity;
            this.ajaxUpReq && (n = !0, this.ajaxUpReq.abort(), this.ajaxUpReq = null),
            this.ajaxUpReq = $.ajax({
                url: "/i/cart/ajax_group_update_cart",
                type: "get",
                data: $.extend({},
                {
                    which_cart: "all"
                },
                a),
                success: function(a) {
                    n || ("success" == a.status ? (b(a), d.afterUpdateItem(a, e, f)) : c(a)),
                    n = !1,
                    d.ajaxUpReq = null
                },
                error: function(a) {
                    c(a),
                    n = !1,
                    d.ajaxUpReq = null
                }
            })
        },
        ajaxRevert: function(a, b, c) {
            var d, e = this;
            d = a.is_cb ? this._getCbAddKey(a) : a.sku_no + "," + a.deal_hash_id + "," + a.quantity,
            $.get("/i/cart/ajax_group_add_to_cart", $.extend({},
            {
                from: "flow_cart_undorecover",
                which_cart: "all"
            },
            {
                items: d
            }),
            function(d) {
                "success" == d.type ? (b(d), e.afterRevertItem(d, a.item_key)) : c(d)
            })
        },
        _getCbAddKey: function(a) {
            for (var b, c = "cb," + a.group_id + ",",
            d = [], e = a.sub_items, f = 0, g = e.length; g > f; f++) b = e[f],
            d.push(b.sku_no + "-" + b.deal_hash_id);
            return c = c + d.join("^") + "," + a.quantity
        },
        afterUpdateItem: function(a, b, c) {
            var d = (this.options.data, this.options.type);
            this.options.subType,
            this.refreshNumAndPrice(),
            this.refreshGroupContent({}),
            this.options.onChange({},
            d, b, 0 === c ? "delete": "update")
        },
        afterRevertItem: function(a, b) {
            var c = (this.options.data, this.options.type);
            this.options.subType,
            this.refreshNumAndPrice(),
            this.refreshGroupContent({}),
            this.options.onChange({
                showcd: a.showcd,
                etime: a.sec
            },
            c, b, "revert")
        }
    },
    $.extend(o.prototype, h.Events),
    o
}),
define("templates/show/group", [],
function() {
    return '<table class="cart_group_item "> <thead> <tr> <th class="cart_overview"> <div class="cart_group_header"> <input type="checkbox" class="js_group_selector cart_group_selector" <%=isAllSelect ? " checked=checked": ""%> <%=isNoneInSold? " disabled = disabled": ""%> /> <h2> <%if( title != \'海外直邮\' ) {%> <%=title;%> <%}else{%> <%=name || ""%>发货 <%}%> </h2> </div> </th> <th class="cart_price">价格（元）</th> <th class="cart_num">数量</th> <th class="cart_total">小计（元）</th> <th class="cart_option">操作</th> </tr> </thead> <tbody> <%for (var i = 0, len=items.length; i < len; i ++) {%> <%if (items[i][\'is_cb\']){%> <%include(\'show/group/cbItem\', items[i])%> <%}else{%> <%include(\'show/group/item\', items[i])%> <%}%> <%}%> </tbody> <tfoot> <tr> <td colspan="5"> 商品金额： <span class="group_total_price">¥<%=group_total_amount ? num2Fixed(group_total_amount, 2) : 0%></span> </td> </tr> </tfoot> </table>'
}),
define("templates/show/cartItem", [],
function() {
    return '<tr class="cart_item <%if(sale_status){%>sold_out<%}%>" hashid="<%=deal_hash_id%>" id="<%=item_key%>" product_id="<%=product_id%>" item_price="<%=num2Fixed(item_price, 2)%>" category_v3_3="<%=category_v3_3%>" brand_id="<%=brand_id%>" product_type="<%=product_type%>" vcb="<%=!!is_vcb ? \'true\' : \'false\'%>"> <td valign="top"> <div class="cart_item_desc clearfix"> <%if(!sale_status){%> <input type="checkbox" class="js_item_selector cart_item_selector<%=platform===\'app\'?\' app\':\'\';%>" <%=platform===\'app\'?\'disabled=true\':\'\';%> data-item-key="<%=item_key%>" data-app="<%=platform%>" <%=selected && platform !== \'app\' ? "checked=\'checked\'": ""%>/> <%}%> <div class="cart_item_desc_wrapper"> <a class="cart_item_pic" href="<%=url%>" target="_blank"> <img src="<%=image_60%>" alt="<%=short_name%>"/> <span class="sold_out_pic png"></span> </a> <%if(item_category === "redeem"){%> <span class="cart_item_redeem">换购</span> <%} else if(item_category === "retail_global"){%> <span class="cart_item_global">[极速免税]</span> <%}%> <a class="cart_item_link" title="<%=short_name%>" href="<%=url%>" target="_blank"><%=short_name%></a> <p class="sku_info"> <%if(attribute){%> 型号：<span class="cart_item_attribute"><%=attribute%></span>&nbsp; <%}%> <%if(capacity){%> 容量：<span class="cart_item_capacity"><%=capacity%></span> <%}%> <%if( !attribute && !capacity && platform === \'app\'){%> <span class="app-type">APP专享</span> <%}else if(platform === \'app\'){%> <br/> <span class="app-type">APP专享</span> <%}%> </p> <div class="sale_info clearfix"> <%include(\'show/group/promo\', {promo_sale: promo_sale})%> </div> </div> </div> </td> <td> <div class="cart_item_price"> <%if(!!is_vcb){%> <div class="vcb-comment"> 套装价 <span class="vcb-item-icon"> <div class="vcb-items-wrapper"> <span class="vcb-comment-corner"></span> <h1 class="vcb-items-title">超值套装搭配:</h1> <div class="vcb-items"> <%if(child_items && child_items.length == 2){%> <div class="inline-block sub-item"> <a class="clearfix" href="javascript:void(0)"> <div class="vcb-img-wrap"> <img height="100" width="100" src="<%=child_items[0][\'image_100\']%>" alt="<%=child_items[0][\'item_short_name\']%>"/> </div> </a> <a class="clearfix inline-block sub-title" href="javascript:void(0)"><%=child_items[0][\'item_short_name\']%></a> <span class="sub-item-model inline-block"> <%=!!child_items[0][\'attribute\']?(\'\'+child_items[0][\'attribute\']):\'\'%> <%=!!child_items[0][\'size\']?(\' \'+child_items[0][\'size\']):\'\'%> </span> </div> <span class="inline-block vcb-and-icon">+</span> <div class="inline-block sub-item"> <a class="clearfix" href="javascript:void(0)"> <div class="vcb-img-wrap"> <img height="100" width="100" src="<%=child_items[1][\'image_100\']%>" alt="<%=child_items[1][\'item_short_name\']%>"/> </div> </a> <a class="clearfix inline-block sub-title" href="javascript:void(0)"><%=child_items[1][\'item_short_name\']%></a> <span class="sub-item-model inline-block"> <%=!!child_items[1][\'attribute\']?(\'\'+child_items[1][\'attribute\']):\'\'%> <%=!!child_items[1][\'size\']?(\' \'+child_items[1][\'size\']):\'\'%> </span> </div> <%}%> </div> <span class="vcb-items-explain">搭配商品库存若抢光,小美将为您随机搭配其他小物</span> </div> </span> </div> <%}%> <p class="jumei_price"><%=num2Fixed(item_price, 2)%></p> <%if(original_price){%> <p class="market_price <%if(!marketPriceShow){%> hide<%}%>"><%=num2Fixed(original_price, 2)%></p> <%}%> </div> </td> <td> <%if(item_category === "redeem"){%> <div class="cart_item_num"> <%=quantity%> </div> <%}else {%> <div class="cart_item_num <%if(low_inventory || user_purchase_limit){%>item_num_tip <%}%>"> <div class="item_quantity_editer clearfix" data-item-key="<%=item_key%>"> <span class="decrease_one <%if(sale_status || quantity == 1){%>disabled <%}%>">-</span> <input class="item_quantity" type="text" value="<%=quantity%>" <%if(sale_status){%> disabled="disabled" <%}%> /> <span class="increase_one <%if(sale_status || quantity >= $show_item_quantity_limit ||(user_purchase_limit && quantity >= user_purchase_limit)){%>disabled <%}%>">+</span> </div> <div class="item_shortage_tip"> <%if(low_inventory){%> <p>库存紧张</p> <%}%> <%if(user_purchase_limit){%> <p>限购<%=user_purchase_limit%>件</p> <%}%> </div> </div> <%}%> </td> <td> <div class="cart_item_total"> <p class="item_total_price"><%=num2Fixed(item_price*quantity, 2)%></p> <%if(original_price){%> <p <%if(!marketPriceShow){%>class="hide"<%}%>>省 <span class="item_saved_price"><%=num2Fixed((original_price-item_price)*quantity, 2)%></span></p> <%}%> </div> </td> <td> <div class="cart_item_option"> <a class="icon_small delete_item png" data-item-key="<%=item_key%>" href="javascript:void(0)" title="删除"></a> </div> </td> </tr>'
}),
define("templates/show/combineItem", [],
function() {
    return '<tr class="cart_item cart_cb_item <%if(sale_status){%>cb_sold_out<%}%>" id="<%=item_key%>" > <td> <div class="cart_item_desc clearfix"> <%var appOnly = false;%> <%for(var i = 0, len = sub_items.length; i < len; i++){%> <%var subItem = sub_items[i]%> <%if(subItem.platform === \'app\'){%> <%appOnly = true;%> <%break;%> <%}%> <%}%> <%if(!sale_status){%> <input type="checkbox" class="js_item_selector cart_item_selector<%=appOnly?\' app\':\'\'%>" <%=appOnly?\'disabled=true\':\'\';%> data-item-key="<%=item_key%>" data-app="<%=appOnly?\'app\':\'\'%>" <%=selected && !appOnly ? "checked=\'checked\'": ""%>/> <%}%> <div class="cart_item_desc_wrapper"> <%for(var i = 0, len = sub_items.length; i < len; i++){%> <%var subItem = sub_items[i]%> <div data-cb-item-key="<%=subItem.item_key%>" class="cart_cb_sub <%if(i === 0){%> cart_cb_sub_first<%}%> <%if(subItem.sale_status){%>cb_sub_sold_out<%}%>"> <a class="cart_item_pic" href="<%=subItem.url%>" target="_blank"> <img src="<%=subItem.image_60%>" alt="<%=subItem.short_name%>"/> <span class="sold_out_pic png"></span> </a> <%if(subItem.item_category === "redeem"){%> <span class="cart_item_redeem">换购</span> <%} else if(subItem.item_category === "retail_global"){%> <span class="cart_item_global">[极速免税]</span> <%}%> <a class="cart_item_link" title="<%=subItem.short_name%>" href="<%=subItem.url%>" target="_blank"> <%=subItem.short_name%> </a> <span class="cart_cb_sub_quantity_wrapper"> X <span class="cart_cb_sub_quantity"> <%=subItem.quantity%> </span> </span> <p class="sku_info"> <%if(subItem.attribute){%> 型号：<span class="cart_item_attribute"><%=subItem.attribute%></span>&nbsp; <%}%> <%if(subItem.capacity){%> 容量：<span class="cart_item_capacity"><%=subItem.capacity%></span> <%}%> <%if( !subItem.attribute && !subItem.capacity && subItem.platform === \'app\'){%> <span class="app-type">APP专享</span> <%}else if(subItem.platform === \'app\'){%> <br/> <span class="app-type">APP专享</span> <%}%> </p> <div class="sale_info clearfix"> <%include(\'show/group/promo\', {promo_sale: subItem.promo_sale})%> </div> </div> <%}%> </div> </div> </td> <td class="" style="overflow: visible"> <div class="cart_item_price"> <p class="jumei_price"><%=num2Fixed(item_price, 2)%></p> <p class="market_price<%if(!marketPriceShow){%> hide<%}%>"><%=num2Fixed(original_price, 2)%></p> </div> <div class="cart_cb_item_tip_wrapper"> <p class="cart_cb_item_tip"> 超值组合购，仅限一起退货 </p> </div> </td> <td> <%if(item_category === "redeem"){%> <div class="cart_item_num"> <%=quantity%> </div> <%}else {%> <div class="cart_item_num <%if(low_inventory || user_purchase_limit){%>item_num_tip <%}%>"> <div class="item_quantity_editer clearfix" data-item-key="<%=item_key%>"> <span class="decrease_one <%if(sale_status || quantity == 1){%>disabled <%}%>">-</span> <input class="item_quantity" type="text" value="<%=quantity%>" <%if(sale_status){%> disabled="disabled" <%}%> /> <span class="increase_one <%if(sale_status || quantity >= $show_item_quantity_limit ||(user_purchase_limit && quantity >= user_purchase_limit)){%>disabled <%}%>">+</span> </div> <div class="item_shortage_tip"> <%if(low_inventory){%> <p>库存紧张</p> <%}%> <%if(user_purchase_limit){%> <p>限购<%=user_purchase_limit%>件</p> <%}%> </div> </div> <%}%> </td> <td> <div class="cart_item_total"> <p class="item_total_price"><%=num2Fixed(item_price*quantity, 2)%></p> <%if(original_price){%> <p <%if(!marketPriceShow){%>class="hide"<%}%>>省 <span class="item_saved_price"><%=num2Fixed((original_price-item_price)*quantity, 2)%></span></p> <%}%> </div> </td> <td> <div class="cart_item_option"> <a class="icon_small delete_item png" data-item-key="<%=item_key%>" href="javascript:void(0)" title="删除"></a> </div> </td> </tr>'
}),
define("templates/show/promo", [],
function() {
    return '<%for(var promo_key in promo_sale){%> <div class="tips_pop_full float_box JS_tips_pop_full"> <%if(promo_key !== "yiqituan"){%> <div> <a class="sale_tag <%=promo_key%> JS_sale_tag" data-promo-type="<%=promo_key%>"> <%=$show_get_promo_type(promo_key)%> <i class="icon_small png"></i> </a> </div> <div class="pop_box JS_pop_box"> <div><span class="arrow_t_1"><span class="arrow_t_2"></span></span></div> <%for(var i = 0, ii = promo_sale[promo_key].length; i < ii; i++){%> <%if(i!=0){%><div class="underline"></div><%}%> <div> <a class="clearfix promo_sale_item <%if(promo_sale[promo_key][i].url){%>promo_has_url<%}%>" <%if(promo_sale[promo_key][i].url != \'\'){%> target="_blank" href="<%=promo_sale[promo_key][i].url%>" <%}else{%> href="javascript:void(0)" <%}%> > <span class="title"><%if (ii != 1){%> <%= i+1%>.<%}%><%=promo_sale[promo_key][i].show_name%></span> <%if(promo_sale[promo_key][i].url != \'\'){%> <span class="tips">查看活动</span> <%}%> </a> </div> <%}%> </div> <%}%> </div> <%}%>'
}),
define("templates/show/undoDelete", [],
function() {
    return '<tr class="cancel_delete" data-for="<%=item_key%>"> <td colspan="5"> <div class="cancel_delete_wrapper"> 您已删除 <%if(is_cb){%> <a class="deleted_item_url" href="<%=sub_items[0].url%>" target="_blank"><%=sub_items[0].short_name%></a> 等商品，如有误， 可<a class="do_cancel_delete" href="javascript:void(0)">撤销删除</a> <%}else {%> <a class="deleted_item_url" href="<%=url%>" target="_blank"><%=short_name%></a> ，如有误， 可<a class="do_cancel_delete" data-add-args="<%=sku_no%>,<%=deal_hash_id%>,<%=quantity%>" href="javascript:void(0)">撤销删除</a> <%}%> </div> </td> </tr>'
}),
define("views/show/analytics", [],
function(a, b) {
    var c = [],
    d = {
        pinyou: function(a, b, c, d) { !
            function(a, b, c, d) {
                function e() {
                    b.body ? (k = b.createElement("script"), k.src = r, b.body.insertBefore(k, b.body.firstChild)) : setTimeout(e(), 100)
                }
                var f = d.sum,
                g = d.idList,
                h = d.countList;
                $.each(g,
                function(a, b) {
                    g[a] = b.replace("product_", "")
                });
                var i = [];
                $.each(g,
                function(a, b) {
                    var c = h[a];
                    i.push(b + "," + c)
                });
                var j, k, l = i.join(";"),
                m = location.href,
                n = b.referrer,
                o = b.cookie,
                p = o.match(/(^|;)\s*ipycookie=([^;]*)/),
                q = o.match(/(^|;)\s*ipysession=([^;]*)/);
                a.parent != a && (j = m, m = n, n = j);
                var r = "//stats.ipinyou.com/cvt?a=" + c("_d.Du.lVGoat57ZgX5jhlhRpflAX") + "&c=" + c(p ? p[2] : "") + "&s=" + c(q ? q[2].match(/jump\%3D(\d+)/)[1] : "") + "&u=" + c(m) + "&r=" + c(n) + "&rd=" + (new Date).getTime() + "&Money=" + c(f) + "&ProductList=" + c(l) + "&e=";
                e()
            } (a, b, c, d)
        },
        yima: function(a, b, c, d, e, f, g) {
            a._adwq = a._adwq || [],
            a._adwq.push(["_setAccount", "1ng4e"]),
            a._adwq.push(["_setDomainName", ".jumei.com"]),
            a._adwq.push(["_trackPageview"]);
            var h = document.createElement("script");
            h.type = "text/javascript",
            h.async = !0,
            h.src = ("https:" == document.location.protocol ? "https://ssl": "http://s") + ".emarbox.com/js/adw.js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(h, i);
            var j = null;
            $ && $.cookie && (j = $.cookie("uid")),
            setTimeout(function() {
                $.each(b,
                function(h) {
                    var i = b[h] + "",
                    k = c[h] + "",
                    l = d[h] + "",
                    m = e[h] + "",
                    n = f[h] + "",
                    o = g[h] = "";
                    a._adwq.push(["_setDataType", "cart"]),
                    a._adwq.push(["_setCustomer", j ? j: ""]);
                    var p = ["_setItem", i, k, l, m, n, o];
                    a._adwq.push(p),
                    a._adwq.push(["_trackTrans"])
                })
            },
            10)
        },
        mediaV: function(a, b, c, d) {
            a._mvq = a._mvq || [],
            a._mvq.push(["$setAccount", "m-183-0"]),
            a._mvq.push(["$logConversion"]);
            var e = document.createElement("script");
            e.type = "text/javascript",
            e.async = !0,
            e.src = "https:" == document.location.protocol ? "https://static-ssl.mediav.com/mvl.js": "http://static.mediav.com/mvl.js";
            var f = document.getElementsByTagName("script")[0];
            f.parentNode.insertBefore(e, f),
            setTimeout(function() {
                a._mvq = a._mvq || [],
                a._mvq.push(["$setGeneral", "cartview", c, d, ""]);
                var e = ["$addItem"];
                e = e.concat(b),
                a._mvq.push(e),
                a._mvq.push(["$logData"])
            },
            10)
        },
        jinzhan: function(a, b, c) {
            $.each(a,
            function(b, c) {
                a[b] = c.replace("product_", "")
            });
            var d = 0;
            $.each(b,
            function(a, b) {
                d += 1 * b
            });
            var e = {
                productId_list: a,
                totalPrice: c,
                totalNum: d
            }; !
            function(a) {
                var b = {
                    query: [],
                    args: a || {}
                };
                b.query.push(["_setAccount", "428"]),
                b.query.push(["_setSiteID", "1"]),
                (window.__zpSMConfig = window.__zpSMConfig || []).push(b);
                var c = document.createElement("script");
                c.type = "text/javascript",
                c.async = !0,
                c.src = ("https:" == document.location.protocol ? "https:": "http:") + "//cdn.zampda.net/s.js";
                var d = document.getElementsByTagName("script")[0];
                d.parentNode.insertBefore(c, d)
            } (e)
        },
        convertToItems: function(a) {
            $.each(a,
            function(a, b) { ($.isPlainObject(b) || $.isArray(b)) && (b.category_v3_3 && c.push(b), b.is_cb && $.each(b.sub_items,
                function() {
                    $.extend(this, {
                        parentQuantity: b.quantity
                    })
                }), d.convertToItems(b))
            })
        },
        buildOptionsFromItems: function(a) {
            var b = [],
            e = [],
            f = [],
            g = [],
            h = [],
            i = [],
            j = [],
            k = a.total_amount,
            l = "",
            m = "";
            return $ && $.cookie && (m = $.cookie("uid")),
            $.each(c,
            function(a, c) {
                c.parentQuantity ? e.push(1 * 1 * c.quantity * c.parentQuantity) : e.push(1 * c.quantity),
                b.push(d.getUniqueUrlProductId(c)),
                f.push(c.short_name),
                g.push(c.category_v3_3),
                h.push(""),
                i.push(c.item_price),
                j.push(c.product_id)
            }),
            {
                idList: b,
                nameList: f,
                priceList: i,
                countList: e,
                categoryList: g,
                categoryNameList: h,
                productIdList: j,
                sum: k,
                username: l,
                userId: m
            }
        },
        getUniqueUrlProductId: function(a) {
            var b = /\/\w*?.html/,
            c = a.url || "",
            d = c.match(b),
            e = a.deal_hash_id || "";
            if (d) {
                var f = d[0];
                e = f.replace("/", ""),
                e = e.replace(".html", "")
            }
            return "" === e ? a.product_id || "": e
        }
    };
    b.init = function(a, b, c, e) {
        var f = {};
        d.convertToItems(e);
        var g = d.buildOptionsFromItems(e);
        $.extend(f, g),
        d.pinyou(a, b, c, f),
        d.yima(a, f.idList, f.nameList, f.priceList, f.countList, f.categoryList, f.categoryNameList),
        d.jinzhan(f.idList, f.countList, f.sum)
    },
    b.yimaDelete = function(a) {
        var b = [].concat(a.is_cb ? a.sub_items: [a]),
        c = $.cookie("uid");
        $.each(b,
        function(a, b) {
            var d = window._adwq;
            d.push(["_setDataType", "delete"]),
            d.push(["_setCustomer", c]),
            d.push(["_setItem", b.deal_hash_id || (b.product_id || "").replace("product_", ""), b.short_name, b.item_price, b.quantity, b.category_v3_3, ""]),
            d.push(["_trackTrans"])
        })
    }
}),
define("views/show/statistics", [],
function() {
    var a = {},
    b = function() {
        for (var b = ["product", "media", "global", "promo_cards"], d = [], e = 0, f = b.length; f > e; e++) if ("undefined" != typeof a[b[e]]) if ("global" == b[e]) for (var g = 0,
        h = a[b[e]].length; h > g; g++) d = d.concat(c(a[b[e]][g].items));
        else d = d.concat(c(a[b[e]].items));
        return d
    },
    c = function(a) {
        var b = [],
        c = a.length;
        if (!c) return b;
        for (var e = 0; c > e; e++) if (a[e].is_cb) for (var f = 0,
        g = a[e].sub_items.length; g > f; f++) b.push({
            id: d(a[e].sub_items[f]),
            quantity: Number(a[e].sub_items[f].quantity),
            price: Number(a[e].sub_items[f].item_price)
        });
        else b.push({
            id: d(a[e]),
            quantity: Number(a[e].quantity),
            price: Number(a[e].item_price)
        });
        return b
    },
    d = function(a) {
        var b = "";
        return b = a.product_type.indexOf("global") > -1 && a.deal_hash_id ? a.deal_hash_id: a.product_id
    },
    e = function() {
        window.criteo_q = window.criteo_q || [];
        var a = ($.cookie("uid") || "0") + "_" + (new Date).getTime();
        window.criteo_q.push({
            event: "setAccount",
            account: 16779
        },
        {
            event: "setHashedEmail",
            email: ""
        },
        {
            event: "setSiteType",
            type: "d"
        },
        {
            event: "trackTransaction",
            id: a,
            item: b()
        }),
        $.getScript("//static.criteo.net/js/ld/ld.js")
    },
    f = function() {
        window._agt = window._agt || [],
        _agt.push(["_atscu", "AG_774222_DMOV"]),
        _agt.push(["_atsdomain", RM_CURRENT_SITE_DOMAIN]),
        _agt.push(["_atsev", "104"]),
        _agt.push(["_atsbas", "http://" + RM_CURRENT_SITE_DOMAIN]),
        _agt.push(["_atsaqi", a.total_amount]),
        function() {
            var a = document.createElement("script");
            a.type = "text/javascript",
            a.async = !0,
            a.src = ("https:" == document.location.protocol ? "https": "http") + "://" + "t.agrantsem.com/js/ag.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b)
        } ()
    },
    g = function(b) {
        a = b,
        e(),
        f()
    };
    return {
        init: g
    }
}),
define("templates/show/content", [],
function() {
    return '<div class="content_show_wrapper"> <div class="cart_notification cart_error" style="<%if(error_msg){%>display:block; <%}%>"> <div class="message"> <p><%=error_msg%></p> </div> </div> <div id="group_show"> <div class="content_header clearfix"> <%if(!isEmpty){%> <%include(\'show/timer\')%> <div class="top_banner"> <ul class="header_icons"> <li> <span> <i class="icon_zhenpin header_icon png"></i> 真品防伪码 </span> </li> <li> <span> <i class="icon_tuihuo header_icon png"></i> 30天无条件退货 </span> </li> <li> <span> <i class="icon_baoyou header_icon png"></i> 美妆满2件或299元包邮 </span> </li> </ul> </div> <%if(baoyouInfo && baoyouInfo.length){%> <div class="common_shippment"> <i class="icon_small icon_baoyou png">包邮</i> <%=baoyouInfo.join(",")%> </div> <%}%> <%}%> </div> <%if(!isEmpty){%> <div class="groups_wrapper"> </div> <div class="common_handler_anchor"></div> <div class="common_handler"> <%include(\'show/common_handler\')%> </div> <%}else{%> <div class="cart_empty clearfix"> <img class="cart_empty_logo" src="http://s0.jmstatic.com/assets/images/jumei/cart_v2/empty_icon.jpg" alt="" class="empty_icon"/> <div class="cart_empty_right"> <h2>您的购物车中没有商品，请先去挑选心爱的商品吧！</h2> <p class="cart_empty_backtip"> 您可以 <a class="btn" href="<%=back_to_shopping%>?from=flow_cart_empty_null_null_null_new"> <%if(is_from_mall){%> 返回商城 <%}else{%> 返回首页 <%}%> </a> 挑选喜欢的商品,或者 </p> <div class="search_block"> <form action="http://search.<%=getGlobalVar(\'RM_SITE_MAIN_TOPLEVELDOMAINNAME\')%>" method="get" pos="top"> <input name="filter" type="hidden" value="0-0-0-0-11-1"> <button type="submit" class="btn_cart_search">搜索</button> <input name="search" type="text" class="search_input" placeholder="搜搜您想要的商品" autocomplete="off"> <input name="from" type="hidden"> </form> </div> </div> </div> <%}%> <div class="content_footer clearfix"> <%if(!isEmpty){%> <%include(\'show/timer\')%> <%}%> </div> <%if(advertising && advertising.all_cart_show_middle_promo_banner && advertising.all_cart_show_middle_promo_banner.length){%> <div class="advWrap"> <%for(var key in advertising.all_cart_show_middle_promo_banner){var advItem = advertising.all_cart_show_middle_promo_banner[key];%> <div class="ad_item"><%==advItem.content%></div> <%}%> </div> <%}%> <%if(gifts_info){%> <%include(\'show/sale_gifts\')%> <%}%> </div> <div id="cart_side_nav"> <a href="javascript:void(0)"></a> </div> </div>'
}),
define("templates/show/sale_gifts", [],
function() {
    return '<div id="sale_gifts_box" class="sale_gifts_box"> <div class="nav_tips"> <%for (var i in gifts_info) {            var gifts_one = gifts_info[i];%> <a href="javascript:;" class="JS_sale_gifts_nav<%if (i == gifts_first) {%> active<%}%>" data-for="sale_gifts_level_<%=i%>" data-sale-price="<%=i%>"> 满<%=i%>元换购 <i class="under_border"></i> </a> <%}%> </div> <%for (var i in gifts_info) {    var gifts_one = gifts_info[i];%> <div id="sale_gifts_level_<%=i%>" class="gifts_container <%if (i == gifts_first) {%> active<%}%> <%if (i > total_amount) {%> disabled<%}%>"> <ul class=" clearfix"> <%for(var j in gifts_one){                var gift_item = gifts_one[j];%> <li class="gift_item list"> <div class="item_pic_container"> <img class="gift_item_pic" src="<%=gift_item.picture%>" alt="<%=gift_item.short_name%>" title="<%=gift_item.short_name%>"/> <span class="sold_out_tip"></span> </div> <div class="gift_item_name"> <%=gift_item.short_name%> </div> <div class="gift_item_price"> <span class="discounted_price">¥<%=gift_item.discounted_price%></span> <span class="original_price">¥<%=gift_item.original_price%></span> </div> <%if(!gift_item.sold_out){%> <a class="gift_item_add btn" href="http://cart.<%=getGlobalVar(\'RM_SITE_MAIN_TOPLEVELDOMAINNAME\')%>/i/cart/new_items/<%=gift_item.sku_no%>,<%=gift_item.hash_id%>,1?from=cart_redeem" product_id="<%=gift_item[\'product_id\']%>" brand_id="<%=gift_item[\'brand_id\']%>"> 加入购物车 </a> <%}else{%> <span class="btn gift_sold_out">暂时缺货</span> <%}%> </li> <%}%> </ul> </div> <%}%> </div>'
}),
define("templates/show/common_handler", [],
function() {
    return '<div class="right_handler"> 共 <span class="total_amount"> <%=quantity%> </span> &nbsp;件商品 &nbsp;&nbsp; 商品应付总额：<span class="total_price">¥<%=num2Fixed(total_amount, 2)%></span> <a id="go_to_order" class="btn <%if(!quantity){%> disabled <%}%>" href="javascript:;">去结算</a> </div> <label for="js_all_selector" class="cart_all_selector_wrapper"> <input type="checkbox" id="js_all_selector" class="js_all_selector all_selector" /> 全选 </label> <a class="go_back_shopping" href="<%=back_to_shopping%>">继续购物</a> <span class="seperate_line">|</span> <a class="clear_cart_all" href="" >清空选中商品</a> <form id="form_to_order" action="" method="post" style="display: none;"> <input type="hidden" name="items_key"/> </form>'
}),
// define("templates/show/timer", [],
// function() {
//     return '<div class="cart_timer_wrapper"> <i class="icon_small png"></i> <span class="cart_timer_counting"> 请在 <span class="cart_timer_text"> </span> 内去结账，并在下单后 <span class="pink">20</span> 分钟内完成支付 </span> <span class="cart_timer_out"> 已超过购物车商品保留时间，请尽快结算。 </span> [<a class="cart_timer_tip float_box" href="javascript:void(0)"> ? <div class="pop_box">  <span class="arrow_t_1"><span class="arrow_t_2"></span></span> <div class="timer_tip_text"> 由于商品库存有限，我们只能暂为您最多保存20分钟，<br/>20分钟后购物车将被清空，请尽快结算订单。 </div> </div> </a>] </div>'
// }),
// define("templates/show/pay_account", [],
// function() {
//     return '<div dialogTitle="温馨提示" class="pay_account" id="JS_account_dialog"> <div class="title">限于法律规定，请分开结算<span style="color: #ed145b;">「国内发货商品」</span>和<span style="color: #ed145b;">「海外直邮商品」</span></div> <%if(j){%> <div class="clearfix border_tips"> <div class="item_box" id="JS_slide_jumei_item"> <div>国内发货商品<span style="color: #ed145b;"><%=j.count%></span>件</div> <div class="item_list_box"> <ul class="clearfix JS_slide_items box_ul" style="width:<%=j.count * 64%>px;"> <%for ( var i = 0; i < j.count; i ++) {%> <li class="item"><a href="<%=j.items[i].url%>" title="<%=j.items[i].title%>"><img src="<%=j.items[i].img%>" width="60" height="60"></a></a></li> <%}%> </ul> </div> <%if(j.count > 5) {%> <a href="javascript:;" class="scroll_page_prev disable JS_scroll_page_prev"><i class="arrow_right png"></i></a> <a href="javascript:;" class="scroll_page_next JS_scroll_page_next"><i class="arrow_left png"></i></a> <div class="page_index JS_page_index"> <%for ( var i = 0; i < j.count; i += 5) {%> <a href="javascript:;" class="tips <%if (i == 0){%>active<%}%>"></a> <%}%> </div> <%}%> </div> <div class="pay_box"> <div>总额：<span class="price">¥<%=j.total%></span></div> <div><a <%if(j.count != 0){%>href="<%=jumei_confirm_url%>"<%}else{%>href="javascript:;" style="background: #999;"<%}%> class="pay_btn pay_btn_jm <%if(j.count == 0){%> disabled<%}%>">去结算</a></div> </div> </div> <%}%> <%if(g){%> <div class="clearfix"> <div class="item_box" id="JS_slide_globel_item"> <div>海外直邮商品<span style="color: #ed145b;"><%=g.count%></span>件</div> <div class="item_list_box"> <ul class="clearfix JS_slide_items box_ul" style="width:<%=g.count * 64%>px;"> <%for ( var i = 0; i < g.count; i ++) {%> <li class="item"><a href="<%=g.items[i].url%>" title="<%=g.items[i].title%>"><img src="<%=g.items[i].img%>" width="60" height="60"></a></a></li> <%}%> </ul> </div> <%if(g.count > 5) {%> <a href="javascript:;" class="scroll_page_prev disable JS_scroll_page_prev"><i class="arrow_right png"></i></a> <a href="javascript:;" class="scroll_page_next JS_scroll_page_next"><i class="arrow_left png"></i></a> <div class="page_index JS_page_index"> <%for ( var i = 0; i < g.count; i += 5) {%> <a href="javascript:;" class="tips <%if (i == 0){%>active<%}%>"></a> <%}%> </div> <%}%> </div> <div class="pay_box"> <div>总额：<span class="price">¥<%=g.total%></span></div> <div><a <%if(g.count != 0){%>href="<%=global_confirm_url%>"<%}else{%>href="javascript:;" style="background: #999;"<%}%> class="pay_btn pay_btn_gl <%if(g.count == 0){%> disabled<%}%>">去结算</a></div> </div> </div> <%}%> </div>'
// }),
define("templates/show/retail_global", [],
function() {
    return '<div dialogTitle="温馨提示" class="retail_global" id="JS_retail_global_dialog"> <div class="tips"><i class="icon_warning icon"></i>聚美优品极速免税每个订单仅限购买一个商品，请点击“下订单”按钮后结算</div> <div <%if (isScroll){%> class="item_main"<%}%>> <%for ( var i = 0, iLen = list.length; i < iLen; i ++) {%> <%if (list[i].is_cb){%> <div class="clearfix item_cb_box" <%if (i == iLen - 1){%> style="border:0;"<%}%> > <div class="clearfix"> <div class="fl clearfix item_cb_left"> <div class="clearfix item_cb"> <div class="fl"><a href="<%=list[i].items[0].url%>" target="_blank"><img src="<%=list[i].items[0].img%>"></a></div> <div class="fl"> <div class="tit"><a href="<%=list[i].items[0].url%>" target="_blank" title="<%=list[i].items[0].title%>"><%=list[i].items[0].title%></a></div> </div> </div> <div class="clearfix item_cb" style="border:0;"> <div class="fl"><a href="<%=list[i].items[1].url%>" target="_blank"><img src="<%=list[i].items[1].img%>"></a></div> <div class="fl"> <div class="tit"><a href="<%=list[i].items[1].url%>" title="<%=list[i].items[1].title%>" target="_blank"><%=list[i].items[1].title%></a></div> </div> </div> </div> <div class="fr item_rgt"><a href="javascript:;" class="order_btn JS_order_btn"><i class="icon icon_checked"></i><span>下订单</span></a></div> </div> </div> <%}else{%> <div class="clearfix item_box" <%if (i == iLen - 1){%> style="border:0;"<%}%> > <div class="fl clearfix"> <div class="fl"><a href="<%=list[i].items[0].url%>" target="_blank"><img src="<%=list[i].items[0].img%>"/></a></div> <div class="fl"> <div class="tit"><a href="<%=list[i].items[0].url%>" target="_blank" title="<%=list[i].items[0].title%>"><%=list[i].items[0].title%></a></div> </div> </div> <div class="fr item_rgt"><a href="javascript:;" class="order_btn JS_order_btn"><i class="icon icon_checked"></i><span>下订单</span></a></div> </div> <%}%> <%}%> </div> <div class="item_bottom clearfix"> <div class="fr"><a href="javascript:;" class="pay_btn JS_pay_btn">去结算</a></div> <div class="fr tips_order JS_order_warning_tips"><i class="icon_warning icon"></i>请点击“下订单”按钮后结算</div> </div> </div>'
});