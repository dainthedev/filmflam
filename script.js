"use strict";

//const tmdbKey = "e306284dee83c46d017fd5f454816f12"
//tmdbBaseUrl = https://api.themoviedb.org

//const tasteKey = "378860-FilmFlam-JQEPAYXT"
//tasteBaseUrl = "https://tastedive.com/api/similar"

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
        .append("<h2 class='remove'>These are the titles that matched your search.</h2>");
    for(let i = 0; i < results.results.length; i++){  
        $("#results")
            .append(`<p class='remove bottom-space'>
                <a data-id="${results.results[i].id}" class="result-link" href="#">
                    ${results.results[i].title}</a> ${results.results[i].release_date}</p>`);
            console.log(results.results[i].id);
    }
}

function displayFinalResults(results){
    console.log(results);
    $("#results").append(`<h2>${results.title}</h2>
        <p>${results.overview}</p>
        <p>${results.genres[0].name}</p>
        <p>${results.release_date}</p>`);
}

function initialResults(movieTitle){
    console.log("initial results");   
    const tmdbKey = "e306284dee83c46d017fd5f454816f12";
    const tmdbBaseUrl = "https://api.themoviedb.org/3/search/movie";
    const parameters = {
        api_key: tmdbKey,
        query: movieTitle
    };

    console.log(parameters);
    const queryString = formatParameters(parameters);
    console.log(queryString);
    const initialResultsUrl = tmdbBaseUrl + "?" + queryString;
    console.log(initialResultsUrl);

    fetch(initialResultsUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(results => displayInitialResults(results))
}

function finalResults(selectionId){
    console.log("final Results");
    const tmdbKey = "e306284dee83c46d017fd5f454816f12";
    const tmdbBaseUrl = `https://api.themoviedb.org/3/movie/${selectionId}`;
    const parameters = {
        //query: selectionId,
        api_key: tmdbKey
    };
    console.log(parameters);
    const queryString = formatParameters(parameters);
    console.log(queryString);
    const movieDetailsUrl = tmdbBaseUrl + "?" + queryString;
    //const movieDetailsUrl = tmdbBaseUrl + "?" + "api_key=" + tmdbKey;
    console.log(movieDetailsUrl);

    fetch(movieDetailsUrl)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(results => displayFinalResults(results))
}

function recommendations(selectionTitle){
    console.log(selectionTitle)
    const tasteBaseUrl = "https://tastedive.com/api/similar"
    const tasteKey = "378860-FilmFlam-JQEPAYXT"
    const parameters = {
        k: tasteKey,
        type: "movie",
        info: "1",
        q: selectionTitle,
        limit: 10
    };

    console.log(parameters);
    const queryString = formatParameters(parameters);
    console.log(queryString);
    const recommendationsUrl = tasteBaseUrl + "?" + queryString;
    console.log(recommendationsUrl);
    //let recommendationsUrl = "https://tastedive.com/api/similar?k=378860-FilmFlam-JQEPAYXT&type=movie&info=1&q=Back+to+the+Future";
    //console.log(recommendationsUrl);
    fetchJsonp(recommendationsUrl)
    .then(results => {
        console.log("secondary fetch")
        if(results.ok){
            return results.json()
        }
        console.log(results);
    })
    .then(data  => displayRecommendations(data))
}

// function displayFinalResults(results){
//     console.log(results);
//     $("#results").append(`<h3>${results.title}</h3>
//         <p>${results.overview}</p>
//         <p>${results.genres[0].name}</p>
//         <p>${results.release_date}</p>`);
// }

function displayRecommendations(data){
    console.log(data);
    $("#results").append("<h3>You may also like the following:</h3>")
    for(let i = 1; i < data.Similar.Results.length; i++){
    $("#results").append(`<h4>${data.Similar.Results[i].Name}</h4>
        <div class="group">
            <p class="item">${data.Similar.Results[i].wTeaser}</p>
            <iframe class="item-double" width="300px" height="300px" src="${data.Similar.Results[i].yUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`);
    }
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
        //const tmdbKey = "e306284dee83c46d017fd5f454816f12";
        //const tmdbBaseUrl = "https://api.themoviedb.org/3/movie/";
        console.log("click link");
        $(".remove").empty();
        let selectionTitle = $(event.target).html().trim();
        console.log("Title",selectionTitle);
        let selectionId = $(this).data("id");
        console.log(selectionId);
        finalResults(selectionId);
        recommendations(selectionTitle);

        //let movieDetailsUrl = tmdbBaseUrl + selectionId + "?" + "api_key=" + tmdbKey;
        //console.log(movieDetailsUrl);
        // fetch(movieDetailsUrl)
        //     .then(response => {
        //         if(response.ok){
        //             return response.json();
        //         }
        //         throw new Error(response.statusText);
        //     })
        //     .then(results => displayFinalResults(results))

            // let tasteBaseUrl= "https://tastedive.com/api/similar"
            // let recommendationsUrl = "https://tastedive.com/api/similar?k=378860-FilmFlam-JQEPAYXT&type=movie&info=1&q=Back+to+the+Future";
            // console.log(recommendationsUrl);
            // fetchJsonp(recommendationsUrl)
            // .then(results => {
            //     console.log("secondary fetch")
            //     if(results.ok){
            //         return results.json()
            //     }
            //     console.log(results);
            // })
            // .then(data  => displayRecommendations(data))
    })
}

$(main);