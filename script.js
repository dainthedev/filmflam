"use strict";

//const tmdbKey = "e306284dee83c46d017fd5f454816f12"
//tmdbBaseUrl = https://api.themoviedb.org

//const tasteKey = "378860-FilmFlam-JQEPAYXT"
//tasteBaseUrl = "https://tastedive.com/api"

function formatParameters(parameters){
    console.log("format parameters")
    const queryItems = Object.keys(parameters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`);
        console.log(queryItems);
}

function initialResults(movieTitle){
    console.log("initial results");   
    const tmdbKey = "e306284dee83c46d017fd5f454816f12"
    const tmdbBaseUrl = "https://api.themoviedb.org"
    const parameters = {
        api_key: tmdbKey,
        query: movieTitle
    }

    console.log(parameters);
    const queryString = formatParameters(parameters);
    const finalUrl = tmdbBaseUrl + "?" + queryString;
}

function getMovie(){
    $("form").submit(function (event){
        event.preventDefault();
        console.log("getMovie");       
        let movieTitle = $("input[name='movieTitle']").val();
        console.log(movieTitle);
        initialResults(movieTitle);
    });
}

$(getMovie);