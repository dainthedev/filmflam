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
        return queryItems.join("&");
}

function displayInitialResults(results){
    console.log(results);
    $("#results").empty()
        .append("<h2 class='remove'>Theses are the titles that matched your search.</h2>");
    for(let i = 0; i < results.results.length; i++){  
        $("#results")
            .append(`<p class='remove'>
                <a data-id="${results.results[i].id}" class="result-link" href="#">
                    ${results.results[i].title}</a></p>`);
            console.log(results.results[i].id);
    }
}

function initialResults(movieTitle){
    console.log("initial results");   
    const tmdbKey = "e306284dee83c46d017fd5f454816f12";
    const tmdbBaseUrl = "https://api.themoviedb.org/3/search/movie/";
    const parameters = {
        api_key: tmdbKey,
        query: movieTitle
    };

    console.log(parameters);
    const queryString = formatParameters(parameters);
    console.log(queryString);
    const finalUrl = tmdbBaseUrl + "?" + queryString;
    console.log(finalUrl);

    fetch(finalUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(results => displayInitialResults(results))
}

function displayFinalResults(results){
    console.log(results);
    $("#results").append(`<h3>${results.title}</h3>
        <p>${results.overview}</p>
        <p>${results.genres[0].name}</p>
        <p>${results.release_date}</p>`);
}

function main(){
    $("form").submit(function (event){
        event.preventDefault();
        console.log("getMovie");       
        let movieTitle = $("input[name='movieTitle']").val();
        console.log(movieTitle);
        initialResults(movieTitle);
    });

    $("#results").on("click", ".result-link", function(event){
        event.preventDefault();
        const tmdbKey = "e306284dee83c46d017fd5f454816f12";
        const tmdbBaseUrl = "https://api.themoviedb.org/3/movie/";
        console.log("click link");
        $(".remove").empty();
        let selectionId = $(this).data("id");
        console.log(selectionId);
        let movieDetailsUrl = tmdbBaseUrl + selectionId + "?" + "api_key=" + tmdbKey;
        console.log(movieDetailsUrl);
        fetch(movieDetailsUrl)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(results => displayFinalResults(results))
    })
}

$(main);