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