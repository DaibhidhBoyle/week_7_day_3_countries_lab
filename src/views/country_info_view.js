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
  console.dir(country);
  const infoParagraph = this.buildElement('div', '', 'country-info-item');
  const countryName = this.buildElement('h2', country.name);
  const countryRegion = this.buildElement('p', country.region);
  const countryFlag = document.createElement('img');
  countryFlag.classList = 'flag';
  countryFlag.src = country.flag;
  const languages = country.languages;
  const languagesHeader = this.buildElement('h3','Languages Spoken:');
  const languageList = document.createElement('ul');
  languages.forEach((language) => {
    console.dir(language);
    const listItem = this.buildElement('li', language.nativeName);
    languageList.appendChild(listItem);
  });

  infoParagraph.appendChild(countryName);
  infoParagraph.appendChild(countryRegion);
  infoParagraph.appendChild(countryFlag);
  // infoParagraph.appendChild(familyDescription);
  infoParagraph.appendChild(languagesHeader);
  infoParagraph.appendChild(languageList);


  this.container.innerHTML = '';
  this.container.appendChild(infoParagraph);


};

module.exports = CountryInfoView;
