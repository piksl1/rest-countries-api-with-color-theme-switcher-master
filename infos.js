// page mode
let button = document.querySelector(".btn-light");
function darkMode() {
  let element = document.body;
  let font = document.querySelectorAll(".fa-moon")[0];

  element.dataset.bsTheme =
    element.dataset.bsTheme == "light" ? "dark" : "light";
  if (element.dataset.bsTheme == "dark") {
    font.classList.add("fa-solid");
    font.classList.remove("fa-regular");
  } else {
    font.classList.remove("fa-solid");
    font.classList.add("fa-regular");
  }
}
button.addEventListener("click", darkMode);

//more-info page fetching
// Get the name of the country from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("name");

// Get the country information from the API
fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((response) => response.json())
  .then((data) => {
    const country = data[0];

    // Get the necessary elements from the DOM
    const countryName = document.querySelector("#country-name");
    const countryFlag = document.querySelector("#country-flag");
    const countryPopulation = document.querySelector("#country-population");
    const countryNativeName = document.querySelector("#country-native-name");
    const countryRegion = document.querySelector("#country-region");
    const countrySubRegion = document.querySelector("#country-sub-region");
    const countryCapital = document.querySelector("#country-capital");
    const countryDomain = document.querySelector("#country-domain");
    const countryCurrency = document.querySelector("#country-currency");
    const countryLanguage = document.querySelector("#country-language");
    // Update the elements with the country information

    countryFlag.src = country.flags.svg;
    countryName.textContent = country.name.official;
    countryNativeName.textContent = `Native Name: ${
      country.name.nativeName[Object.keys(country.name.nativeName)[0]].common
    }`;
    countryPopulation.textContent = `Population: ${country.population.toLocaleString()}`;
    countryRegion.textContent = `Region: ${country.region}`;
    countrySubRegion.textContent = `Sub Region: ${country.subregion}`;
    countryCapital.textContent = `Capital: ${country.capital?.[0] || "N/A"}`;
    countryDomain.textContent = `Top Level Domain: ${country.cca2}`;
    countryCurrency.textContent = `Currencies ${
      country.currencies[Object.keys(country.currencies)[0]].name
    }`;
  })
  .catch((error) => console.log(error));
