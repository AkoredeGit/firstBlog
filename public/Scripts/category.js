$(document).ready(function(){
    $(".bars").click(function(){
        $(".nav").toggleClass("active");
    })
});

$(document).ready(function(){
    pageUrl = $(location).attr("href");
    var urlArray = pageUrl.split("/");
    var category;
    var pageDetail;
    var splitPage;
    var pageNo;

    if (urlArray.length == 5 ){
        urlArray.push("page=0");

        category = urlArray[urlArray.length - 2];
        pageDetail = urlArray[urlArray.length - 1];
    
        splitPage = pageDetail.split("=");
        pageNo = splitPage[splitPage.length - 1];
    
    }else{
        var category = urlArray[urlArray.length - 2];
        var pageDetail = urlArray[urlArray.length - 1];
    
        splitPage = pageDetail.split("=");
        pageNo = splitPage[splitPage.length - 1];
    }

    var pageLength = $(".next").attr('id');
    
    var previous = pageNo - 1;
    var next = parseInt(pageNo, 10) + 1;
    var limit = parseInt(pageLength, 10);

    if (pageNo == 0){
        $('#previous').attr("href", "/category/" + category + "/page=" + next );
        $('#1').css({
            "background-color": '#4Caf50',
            'color': 'white'
        })
    }
    else if (pageNo == 1){
        $('#previous').attr("href", "/category/" + category + "/page=1" );
    }else{
        $("#previous").attr("href", "/page=" + previous);
    }

    if (pageNo == pageLength){
        $("#nxt").attr("href", "/category/" + category + "/page=" + limit);
    }
    else if (pageNo == 0){
        if (limit < 2){
            $("#nxt").attr("href", "/category/" + category + "/page=" + limit);
        }else{
            $("#nxt").attr("href", "/category/" + category + "/page=2");
        }
    }else{
        $("#nxt").attr("href", "/category/" + category + "/page=" + next);
    }

    var idNo = $.each($('.pages'), function(){
        this.id;
    });

    for (var i= 0; i < idNo.length; i++){
        if (idNo[i].id == pageNo){
            var ids = "#" + pageNo;
            $(ids).css({
                "background-color": '#4Caf50',
                'color': 'white'
            })
        }
    }

    
   
    

})