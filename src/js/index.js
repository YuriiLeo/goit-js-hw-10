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

refs.searchBox.addEventListener("input", debounce(handleInputChange, DEBOUNCE_DELAY));

function handleInputChange(event) {
    let countrySearch = event.target.value.trim();
  console.log(countrySearch);
  if (countrySearch === "") {
    removeData();
    return;
  }

  API.fetchCountrys(countrySearch)
    .then(renderCoutrysCard)
    // .catch(error => {
    //   if (error.code === 404) {
    //     onFetchError();
    //   }
    // removeData();
    // });
  .catch(error => console.log(error))
}
    // renderum kartky krainu
function renderCoutrysCard(data) {
  console.log("Danni", data);

  if (data.length === 1) {
    const markupCard = data.reduce((acc, item) => (acc += `
      <div>
        <img src="${item.flags.svg}" alt="${item.name.official}" width="32px">
      </div>
      <div>
        <h2>${item.name.official}</h2>
        <p>Capital:${item.capital}</p>
        <p>Population: ${item.population}</p>
        <p>Languages: ${Object.values(item.languages)}</p>
      </div>`), "");
      refs.countryList.innerHTML = markupCard;
  } else if(data.length > 1 && data.length <= 10) {
    const markupCountrys = data.reduce((acc, item) => (acc += `
       <img src="${item.flags.svg}" alt="${item.name.official}" width="32px">
       <li class="list-group-item">${item.name.official}</li>`), "");

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