$(document).ready(function(){
    $(".bars").click(function(){
        $(".nav").toggleClass("active");
    })
});
$(document).ready(function(){
    pageUrl = $(location).attr("href");
    var array2 =pageUrl.split("/");
    var p = array2[array2.length - 1];
    var valueArray = p.split("=");
    var value = valueArray[valueArray.length - 1]

    var pageValue = $(".next").attr('id');

    var previous = value - 1 ;
    var next = parseInt(value, 10) + 1
    var limit = parseInt(pageValue, 10);

    if (value == 1){
        $("#previous").attr("href", "/page=1");
    }else if(value < 1){
        $("#previous").attr("href", "/page=1");
    }else{
        $("#previous").attr("href", "/page=" + previous);
    }

    if (value == pageValue){
        $("#nxt").attr("href", "/page=" + limit);
    }else if(value == ""){
        $("#1").css({
            "background-color": '#4Caf50',
            'color': 'white'
        });
        if (limit < 2){
            $("#nxt").attr("href", "/page=1");
        }else{
            $("#nxt").attr("href", "/page=2");
        }
       
    }else{
        $("#nxt").attr("href", "/page=" + next);
    }
    var idNo = $.each($('.pages'), function(){
        this.id;
    })
    
    for (var i = 0; i < idNo.length; i++){
        if (idNo[i].id == value){
            var ids = "#" + value;
            console.log(ids);
            $(ids).css({
                "background-color": '#4CAF50',
                "color": "white"
            });
        }
    }
})
