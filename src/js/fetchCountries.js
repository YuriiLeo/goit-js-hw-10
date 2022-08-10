const BASE_URL = "https://restcountries.com/v3.1";
const countryResponse = "/name";
// const countryID = "/uk";
const FILTER_RESPONSE = "?fields=name,capital,population,flags,languages"

function fetchCountrys(countryID) {
    return fetch(`${BASE_URL}${countryResponse}/${countryID}${FILTER_RESPONSE}`)
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
}

export default { fetchCountrys };