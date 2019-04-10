const PubSub = require('../helpers/pub_sub.js');

const CountryInfoView = function(container){
  this.container = container;
};

CountryInfoView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:selected-country-ready', (evt) => {
    const country = evt.detail;
    this.render(country);
  });
};
CountryInfoView.prototype.buildElement = function(type, text, cls) {
  let element = document.createElement(type);
  if (text !='') { element.textContent = text}
  if (cls) { element.classList = cls }
  return element;
}
CountryInfoView.prototype.render = function(country){
  const infoParagraph = this.buildElement('div', '', 'country-info-item');
  const countryName = this.buildElement('h2', country.name);
  const countryRegion = this.buildElement('p', country.region);
  const countryFlag = document.createElement('img');
  countryFlag.classList = 'flag';
  countryFlag.src = country.flag;
  const languages = country.languages;
  const languagesHeader = this.buildElement('h3','Languages Spoken:');
  const languageList = document.createElement('ul');
  const mymap = L.map('mapid').setView([38, -97], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWFyay1tYWNrYXkiLCJhIjoiY2p1YmIxcXczMDBudTN5cDk3NzRmcjBiZiJ9.jzOYFAVcrGpROUlrbO1OUg'
}).addTo(mymap);
  console.dir(L);
  // console.dir(mymap);
  languages.forEach((language) => {
    const listItem = this.buildElement('li', language.nativeName);
    languageList.appendChild(listItem);
  });

  infoParagraph.appendChild(countryName);
  infoParagraph.appendChild(countryRegion);
  infoParagraph.appendChild(countryFlag);
  // infoParagraph.appendChild(familyDescription);
  infoParagraph.appendChild(languagesHeader);
  infoParagraph.appendChild(languageList);
  // infoParagraph.appendChild(mymap);
  this.container.innerHTML = '';
  this.container.appendChild(infoParagraph);

  // const mapContainer = document.getElementById('map');

  // mapContainer.appendChild(mymap);
};

module.exports = CountryInfoView;
