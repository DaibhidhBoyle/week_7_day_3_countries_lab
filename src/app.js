
const Countries = require('./models/countries.js');
const CountrySelectView = require('./views/country_select_view.js');
const CountryInfoView = require('./views/country_info_view.js');


document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('select#countries');
  const countryDropdown = new CountrySelectView(selectElement);
  countryDropdown.bindEvents();

  const infoDiv = document.querySelector('div#country')
  const countryInfoDisplay = new CountryInfoView(infoDiv);
  countryInfoDisplay.bindEvents();
  console.log('JavaScript Loaded');


  const countries = new Countries();
  countries.bindEvents();
});
