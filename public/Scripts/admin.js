// const writePostDoc = document.getElementById("writePost");
// const allPostDoc = document.getElementById("allPost");
// const allNavs = document.getElementsByClassName("navs");

$(document).ready(function(){
    $('.delete').on('click', function(){
       $.ajax({
           type: "DELETE",
           url: "/" + this.id , 
           success: function(data){
               alert("Sucessfully Deleted");
               location.reload();
           }
       }) 
    });
})

$(document).ready(function(){
    $('post').on('click', function(){
        $.ajax({
            type: "POST",
            url: "/",
            success: function(data){
                alert("Article Posted Succesfully");
                location.reload();
            }
        })
    });
})

$(document).ready(function(){
    $(".head").click(function(){
        $("form").toggleClass("active");
    });

    $(".bars").click(function(){
        $("aside").toggleClass("active");
        $("main").toggleClass("main2");
    })
})


