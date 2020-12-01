'use strict';
//create api and search url header
const apiKey = 'UmctMZrZlKl6DiKxCR1NXCzwzdkiOfAVA1IHr8WV';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

//format the query results for use in URL
/*function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}*/
//create a get parks function
function getParks(state, limit = 10) {
    const params = {
        stateCode: state,
        api_key: apiKey,
        limit: limit
    };
    //const queryString = formatQueryParams(params)
    //const url = searchURL + '?' + queryString;
    const url = `${searchURL}?api_key=${apiKey}&stateCode=${state}&limit=${limit}`;

    //check for correct url
    console.log(url)

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $('#error-message').text(`Oops! Something went wrong: ${error.message}`);
        });

}

function displayResults(responseJson) {
    console.log('display function ran')
    //clear previous results
    $('#results-list').empty();
    console.log('results emptied')
    for (let i = 0; i < responseJson.data.length; i++) {
        //show results on page 
        $('#results-list').append(
            `<li>
                <h2> ${responseJson.data[i].fullName} </h2> 
                <p> ${responseJson.data[i].description} </p> 
                <p> <a href= "${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url} </a> </p> 
                </li>` 
        ) 
        //$('#search-results').append(`<li><a href="${repo.owner.url}">${repo.name}</a></li>`)
        console.log('results appended')
    } 
                
    //remove hidden class to show results
    $('#results').removeClass('hidden')
console.log('results hidden')
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const state = $('#search-state').val();
        const limit = $('#search-max-results').val();
        getParks(state, limit);
    });
}

  
$(watchForm)