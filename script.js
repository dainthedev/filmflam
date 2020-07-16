"use strict";

function getMovie(){
    $("form").submit(function (event){
        event.preventDefault();
        console.log("getMovie");       
        let movieTitle = $("input[name='movieTitle']").val();
        console.log(movieTitle);
    })
}

$(getMovie);