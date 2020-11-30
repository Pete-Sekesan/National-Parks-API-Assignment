//create api and search url header
const apiKey = 'UmctMZrZlKl6DiKxCR1NXCzwzdkiOfAVA1IHr8WV';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

//format the query results for use in URL
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
//create a get parks function
function getParks(location, maxResults = 10) {
    const params = {
        stateCode: state,
        api_key: apiKey,
        maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    //check for correct url
    console.log(url);

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
    //clear previous results
    $('#results').empty();

    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            <li>
                <h2> ${responseJson.data[i].fullName} </h2> 
                <p> ${responseJson.data[i].description} </p> 
                <p> ${responseJson.data[i].url} </p> 
                </li>
            )}}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const location = $('#search-state').val();
        const maxResults = $('#search-max-results').val();
        getParks(location, maxResults);
    });
}

  
$(watchForm)