$(".decrease_one").click(function () {
    var id=$(this).attr("id");
    var n = $(this).next().val();
    var num = parseInt(n) - 1;
    if (num == 0) {
        return;
    }
    $(this).next().val(num);
    $('.cart_item_attribut').html(num);
    ChangeNum(id, num);
    var jianshu = parseInt($('.item_quantity').val()) - (n - num);
    $('.total_amount').html(jianshu)
    
})

$(".increase_one").click(function () {
    var id=$(this).attr("id");
    var n = $(this).prev().val();
    var num = parseInt(n) + 1;
    if (num == 0) {
        return;
    }
    $(this).prev().val(num);
    $('.cart_item_attribut').html(num);
    ChangeNum(id, num);
    var jiashu = parseInt($('.item_quantity').val()) + (num - n);
    $('.total_amount').html(jiashu)
})



function ChangeNum(id,num) {
    $.ajax({
        url: '/User/Product/ChangeNum?id=' + id + "&count=" + num,
        type: 'POST',
        dataType: 'string',
        success: function (data) {
            if (data=="true") {

            }
        }
    })
}


//计算数量增减之后的价钱
$('.item_total_price').html()