$(".decrease_one").click(function () {
    var id = $('.item_quantity').attr("id");
    var n = $(this).next().val();
    var num = parseInt(n) - 1;
    if (num == 0) {
        return;
    }
    $(this).next().val(num);
    ChangeNum(id, num);
    var jianshu = parseInt($('.total_amount').html()) -parseInt((n - num));
    $('.total_amount').html(jianshu)

    //修改小计
    //当前商品的单价
    var thisPrice = $(this).parents(".cart_item").find(".jumei_price").html();

    var item_total_price = (parseFloat(thisPrice) * parseFloat(num));
    $(this).parents('.cart_item').find(".item_total_price").html(item_total_price.toFixed(2));
    

    //总金额的变化
    var changePrice = (parseFloat(thisPrice) * parseFloat(n - num));
    var group_total_price = $('.group_total_price').html().replace("¥", "");
    var LastTotalPrice = parseFloat(group_total_price) - parseFloat(changePrice);
    $('.group_total_price').html(LastTotalPrice.toFixed(2));
    $('.total_price').html(LastTotalPrice.toFixed(2));
  
})

$(".increase_one").click(function () {
    var id = $('.item_quantity').attr("id");
    var n = $(this).prev().val();
    var num = parseInt(n) + 1;
    if (num == 0) {
        return;
    }
    $(this).prev().val(num);
    //修改数据库商品数量记录
    ChangeNum(id, num);
    var jiashu = parseInt($('.total_amount').html()) +parseInt((num - n));
    $('.total_amount').html(jiashu)

    //修改小计
    //当前商品的单价
    var thisPrice = $(this).parents(".cart_item").find(".jumei_price").html();
    var item_total_price = (parseFloat(thisPrice) * parseFloat(num));
    $(this).parents('.cart_item').find(".item_total_price").html(item_total_price.toFixed(2));

    //总金额的变化
    var changePrice = (parseFloat(thisPrice) * parseFloat(num - n));
    var group_total_price = $('.group_total_price').html().replace("¥", "");
    var LastTotalPrice = parseFloat(group_total_price) + parseFloat(changePrice);
    $('.group_total_price').html(LastTotalPrice.toFixed(2));
    $('.total_price').html(LastTotalPrice.toFixed(2));
})



function ChangeNum(id,num) {
    $.ajax({
        url: '/User/Product/ChangeNum?id=' + id + '&count=' + num,
        type: 'POST',
        dataType: 'string',
        success: function (data) {
            if (data=="true") {

            }
        }
    })
}

//删除商品
$('.delete_item').click(function () {
    //价钱
    var thisPrice = $(this).parents(".cart_item").find(".item_total_price").html();
    var totalPrice = parseFloat($('.group_total_price').html().replace("¥", ""));
    var LeftPeice = totalPrice - thisPrice;
    //$('.group_total_price').html(LeftPeice.toFixed(2));
    //$('.total_price').html(LeftPeice.toFixed(2));
    //数量
   
    var thisCount =parseInt($(this).parents(".cart_item").find(".item_quantity").val());
    var TotalCount = parseInt($(".total_amount").html());
    var leftCount = TotalCount - thisCount;
    var htmlData = $(this).parents(".cart_item");
    var id =parseInt(htmlData.attr("id"));
    $.ajax({
        url: '/User/Product/DeleteProduct?id=' + id,
        type: 'POST',
        success: function (data) {
            if (data == "False") {
                alert("删除数据失败");
            }
            else {
                $('.group_total_price').html(LeftPeice.toFixed(2));
                $('.total_price').html(LeftPeice.toFixed(2));
                $('.total_amount').html(leftCount);
                htmlData.html("");
            }
        }
    })
})


//单选框,全选框
