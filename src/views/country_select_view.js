const PubSub = require('../helpers/pub_sub.js');

const CountrySelectView = function(element){
  this.element = element;
};

CountrySelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:all-countries-ready', (evt) => {
    const allCountries = evt.detail;
    this.populate(allCountries);
  });

  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('CountrySelectView:change', selectedIndex);
  });
};

CountrySelectView.prototype.populate = function(countriesData){
  countriesData.forEach((country, index) => {
    const option = document.createElement('option');
    option.textContent = country.name;
    option.value = index;
    this.element.appendChild(option);
  })
}

module.exports = CountrySelectView;
