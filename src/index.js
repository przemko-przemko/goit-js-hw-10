import './css/styles.css';
import { fetchCountries } from './fetchCountry';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

function eventHandler(evt) {
  let name = evt.target.value.trim();
  console.log(fetchCountries(name));
  if (name === '') {
    Notiflix.Notify.info('Please enter a Country');
    list.style.display = 'none';
    info.style.display = 'none';
  } else {
    fetchCountries(name)
      .then(name => {
        if (name.length > 10) {
          Notiflix.Notify.failure('Too many matches.Please enter a more info');
        } else if (name.length >= 2 && name.length <= 10) {
          renderCountryList(name);
          list.style.display = 'block';
          info.style.display = 'none';
        } else if (name.length === 1) {
          renderCountryInfo(name);
          list.style.display = 'none';
          info.style.display = 'block';
        } else {
          Notiflix.Notify.failure('Oops,there is no country with that name!');
          list.style.display = 'none';
          info.style.display = 'none';
        }
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops,there is no country with that name!');
        list.style.display = 'none';
        info.style.display = 'none';
      });
  }
}

searchInput.addEventListener('input', debounce(eventHandler, DEBOUNCE_DELAY));

function renderCountryList(name) {
  const markup = name
    .map(country => {
      return `<li class="country-list" style="list-style:none">
                <img src="${country.flags.svg}" alt="Flag of ${country.name}" width="60" height="40"><span >${country.name}</span></img>
              </li>`;
    })
    .join('');
  list.innerHTML = markup;
}
function renderCountryInfo(name) {
  const markup = name
    .map(country => {
      return `<li class="country-list" style="list-style:none">
        <img src="${country.flags.svg}" alt="Flag of ${
        country.name
      }" width="60" height="40"><span>${country.name}</span></img>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${country.languages.map(language => ' ' + language.name)}</p>
        </li>`;
    })
    .join('');
  info.innerHTML = markup;
}
