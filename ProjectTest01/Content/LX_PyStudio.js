function clx(values, vName, price) {
    var v = values;
    var islx = $('#' + v).data('lx');
    var count = $('.chose-list').data('pycount');
    if (islx) {
        $('div#' + v).remove();
        $('.chose-list').data('pycount', parseInt(count) - 1);
        $('#' + v).data('lx', false);
        var count1 = $('.chose-list').data('pycount');
        if (parseInt(count1) <= 0) {
            $(".pay-settlement").hide();
            $(".chose-list").hide();
        }
    } else {
        $('.chose-list').append('<div class="chose-one newChose" id="' + v + '">'
            + '<a class="delete-icon" onclick= "closeChose(this.id)" id= "' + v + '" ></a>'
            + '<a class="add-icon" onclick="quantityPlus(this.id)" id="' + v + '"></a>'
            + '<span class="chose-number" id="num_' + v + '">1</span>'
            + '<a class="reduce-no-icon" onclick="quantityReduce(this.id)" id="' + v + '"></a>'
            + '<p class="ticket-chose">￥' + price + '' + vName + '</p>'
            + '<input type="hidden" class="h-price" value=' + price + ' />'
            + '</div >');
        $('.chose-list').data('pycount', parseInt(count) + 1);
        $(".pay-settlement").show();
        $(".chose-list").show();
        $('#' + v).data('lx', true);
    }
    $('li a#' + v).toggleClass('lxlxlx');
    TotalPrice();
}

function closeChose(v) {
    $('#' + v).data('lx', false);
    $('li a#' + v).toggleClass('lxlxlx');
    $('div#' + v).remove();
}

function TotalPrice() {
    var TPrice = 0;
    var TNum = 0;
    $('.chose-one').each(function () {
        var num = parseInt($(this).find('.chose-number').text());
        var price = parseInt($(this).find('.h-price').val());
        var total = price * num;

        TPrice += total;
        TNum += num;
    });

    $('#totalInfo').text('￥' + TPrice.toFixed(2)).append('<b>(' + TNum + '份)</b >');
    console.log(TPrice);
    console.log(TNum);


}

function hideChoose() {
    $(".chose-list").hide();
    $(".zk-icon").show();
    $(".sq-icon").hide();
}

function showChoose() {
    $(".chose-list").show();
    $(".zk-icon").hide();
    $(".sq-icon").show();
}


function quantityPlus(id) {
    var num = $('#num_' + id).text();
    $('#num_' + id).text(parseInt(num) + 1);
    $('#' + id + '.reduce-no-icon').attr("class", "reduce-icon");
    TotalPrice();
}

function quantityReduce(id) {
    var num = $('#num_' + id).text();
    if (num <= 1) {
        $('#' + id + '.reduce-icon').attr("class", "reduce-no-icon");
        return;
    }
    $('#num_' + id).text(parseInt(num) - 1);
    TotalPrice();
}