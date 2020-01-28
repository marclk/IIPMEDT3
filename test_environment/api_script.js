const BASE_URL = "https://neelpatel05.pythonanywhere.com"
const ELEMENT_NUMBER = document.getElementById('js--element-number')
const ELEMENT_SYMBOL = document.getElementById('js--element-symbol')
const ELEMENT_NAME = document.getElementById('js--element-name')
const ELEMENT_MASS = document.getElementById('js--element-mass')

fetchApiData = () => {
  let randomElement = Math.floor(Math.random()* 118);
  fetch( BASE_URL )
  .then( (data) => {
    return data.json();
  })
  .then( (response) => {
    console.log(response[randomElement]);
    console.log(response[7]);
    ELEMENT_NUMBER.setAttribute("value", response[randomElement].atomicNumber)
    ELEMENT_SYMBOL.setAttribute("value", response[randomElement].symbol)
    ELEMENT_NAME.setAttribute("value", response[randomElement].name)
    ELEMENT_MASS.setAttribute("value", response[randomElement].atomicMass)
  });
}

fetchApiData();
