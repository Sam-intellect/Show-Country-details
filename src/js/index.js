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
      <p id="currency" class="country__row"></p>
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

    const curr = document.getElementById('currency');

    const currencies = Object.keys(data[0].currencies);
    currencies.map(c => {
      curr.innerHTML = ` <span>💰</span>${c}`;
    });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
showCountryDetails('USA');
