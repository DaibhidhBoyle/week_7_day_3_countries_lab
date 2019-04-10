const RequestHelper = require('../helpers/requesthelper.js');
const PubSub = require('../helpers/pub_sub.js');
const Countries = function() {
  this.data = null;
}
Countries.prototype.bindEvents = function(){
  this.getData();
  PubSub.subscribe('CountrySelectView:change', (evt) => {
    const selectedIndex = evt.detail;
    this.publishCountryDetail(selectedIndex);
  });
};

Countries.prototype.getData = function () {
    const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all');
    requestHelper.get((data) => {
      this.data = data;
      PubSub.publish('Countries:all-countries-ready', this.data);
    })
}

Countries.prototype.publishCountryDetail = function(countryIndex){
  const selectedCountry = this.data[countryIndex];
  console.log('Publish Country Detail!!')
  PubSub.publish('Countries:selected-country-ready', selectedCountry)
};
module.exports = Countries;
