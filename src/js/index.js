import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from "./fetchCountries";

const refs = {
    searchBox: document.querySelector("#search-box"),
    // spusok znaydenuh krain
    countryList: document.querySelector(".country-list"), 
    // danni pro krainu
    countryInfo: document.querySelector(".country-info"),
}

const DEBOUNCE_DELAY = 300;

console.log("Hello world");

// console.log("Hello world");

refs.searchBox.addEventListener("input", debounce(handleReceivedData, DEBOUNCE_DELAY));


function handleReceivedData(event) {
    let countrySearch = event.target.value.trim();
  console.log(countrySearch);
  if (countrySearch === "") {
    removeData();
    return;
  }

  API.fetchCountrys(countrySearch)
    .then(renderСenturies)
    // .catch(error => {
    //   if (error.code === 404) {
    //     onFetchError();
    //   }
    // removeData();
    // });
    // .catch(onFetchError)
   .catch(error => console.log(error))
}
    // renderum kartky krainu
function renderСenturies(data) {
  console.log("Danni", data);

  if (data.length === 1) {
    const markupCard = data.reduce((acc, item) => (acc += `
      <div class="country-flags_name">
        <img src="${item.flags.svg}" alt="${item.name.official}" width="40px" height="30px">
        <h2 class="country_name">${item.name.official}</h2>
      </div>
      <div class="country-title">
        <p>Capital:  ${item.capital}</p>
        <p>Population:  ${item.population}</p>
        <p>Languages:  ${Object.values(item.languages)}</p>
      </div>`), "");
      refs.countryList.innerHTML = markupCard;
  } else if(data.length > 1 && data.length <= 10) {
    const markupCountrys = data.reduce((acc, item) => (acc += `
    <div class="country-flags_name">
    <img src="${item.flags.svg}" alt="${item.name.official}" width="40px" height="30px">
       <h2 class="country_name">${item.name.official}</h2>
    </div>
       `), "");

       refs.countryList.innerHTML = markupCountrys;
  } else if(data.length > 10) {
     Notify.info("Too many matches found. Please enter a more specific name.");
  } else {
    onFetchError();
  }
   
}

function onFetchError(error) {
  Notify.warning("Oops, there is no country with that name");
  removeData();
}

function removeData() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}