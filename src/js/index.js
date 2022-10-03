'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
       <p id="language" class="country__row"><span>🗣️</span>LANG</p>
      <p id="currency" class="country__row"><span>💰</span>CUR</p>

    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const showCountryDetails = async function (country) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    renderCountry(data[0]);

    const lang = document.getElementById('language');
    const curr = document.getElementById('currency');

    const currencies = Object.entries(data[0].currencies).forEach(entry => {
      const [key, value] = entry;
      curr.innerHTML = `<span>💰</span>${key}`;
    });

    const language = Object.entries(data[0].languages).forEach(entry => {
      const [key, value] = entry;
      lang.innerHTML = `<span>🗣️</span>${value}`;
    });

    console.log(data[0].latlng);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
showCountryDetails('Nigeria');

// GO FIND me

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
      console.log(latitude, longitude);
    },
    function () {
      alert('could not get your position');
    }
  );
