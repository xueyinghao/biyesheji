
$(".quick_links_panel li").mouseenter(function () {
    $(this).children(".mp_tooltip").animate({
        left: -92,
        queue: true
    });
    $(this).children(".mp_tooltip").css("visibility", "visible");
    $(this).children(".ibar_login_box").css("display", "block");
});
$(".quick_links_panel li").mouseleave(function () {
    $(this).children(".mp_tooltip").css("visibility", "hidden");
    $(this).children(".mp_tooltip").animate({
        left: -121,
        queue: true
    });
    $(this).children(".ibar_login_box").css("display", "none");
});
$(".quick_toggle li").mouseover(function () {
    $(this).children(".mp_qrcode").show();
});
$(".quick_toggle li").mouseleave(function () {
    $(this).children(".mp_qrcode").hide();
});

// 元素以及其他一些变量 
var eleFlyElement = document.querySelector("#flyItem"),
eleShopCart = document.querySelector("#shopCart");
var numberItem = 0;
// 抛物线运动 
var myParabola = funParabola(eleFlyElement, eleShopCart, {
    speed: 400,
    //抛物线速度 
    curvature: 0.0008,
    //控制抛物线弧度 
    complete: function () {
        eleFlyElement.style.visibility = "hidden";
        eleShopCart.querySelector("span").innerHTML = ++numberItem;
    }
});
// 绑定点击事件 
if (eleFlyElement && eleShopCart) {

    [].slice.call(document.getElementsByClassName("btnCart")).forEach(function (button) {
        button.addEventListener("click",
        function (event) {
            var src = $(this).parents("a").find("img").attr("src");
            $("#flyItem").find("img").attr("src", src);

            //var src = $(this).parents("li").find('.p-img').find("img").attr("src");
            //$("#flyItem").find("img").attr("src", src);
            // 滚动大小 
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
            eleFlyElement.style.left = event.clientX + scrollLeft + "px";
            eleFlyElement.style.top = event.clientY + scrollTop + "px";
            eleFlyElement.style.visibility = "visible";

            // 需要重定位 
            myParabola.position().move();
        });
    });
}



$('.grid_2-right').click(function () {
    //var msg = $(this).parents(".grid_2").find("p").text();
    //var pic = $(this).parents("a").find("img").attr("src");
    //var msg1 = msg.split("￥");
    //var name = msg1[0];
    //var price = msg1[1];
    //$.ajax({
    //    url: '/User/Product/ShopCart?pic=' + pic + '&name=' + name + '&price=' + price,
    //    type: 'POST',
    //    dataType: 'text',
    //    success: function (data)
    //    {
            
    //    }
    //})
    var id = $(this).find("div").attr("id");
    var TotalCount = $('#buy_number').val();
    var PName=$(this).parents(".grid_2").find("p").first().text();
    if (TotalCount==null) {
        TotalCount = 1;
    }
   
    $.ajax({
        url: '/User/Product/AddCart?id=' + id + '&count=' + TotalCount+'&name='+PName,
        type: 'POST',
        success: function () {
            $('#pop_panel').removeClass("ibar_cart_empty");
        }
    })
})

//商品数量增减

$("#num_rduce").click(function () {
    var n = $(this).next().val();
    var num = parseInt(n) - 1;
    if (num==0) {
        return;
    }
    $(this).next().val(num);
        
})

$("#num_add").click(function () {
    var n = $(this).prev().val();
    var num = parseInt(n) + 1;
    if (num==0) {
        return;
    }
    $(this).prev().val(num);
})

$('#shopCart').click(function () {
    $.post('Product/getFromCart', function (data) {
        var code = $("<code></code>").append($(data));
        var html = $(".cart_item", code).html();

        if (html == "") {
            //$("#pop_panel").attr('style', 'background:url(http://a4.jmstatic.com/daf3e7fd00ae46fd/cart_empty_bg.jpg)  50% 20px no-repeat');
            $("#pop_panel").addClass('ibar_cart_empty');
        }
        else {
            $("#pop_panel").html(data);
        }

    });

})
//$(".thickbox").click(function () {
//    var id = $(this).parents("a").attr("id");
//    location.href("/User/Product/Single?id=" + id);
//})