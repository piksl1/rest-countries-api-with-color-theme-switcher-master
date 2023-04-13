// page mode
// Get the initial mode from local storage, or default to "light" if not set

let initialMode = localStorage.getItem("mode") || "light";
document.body.dataset.bsTheme = initialMode;

let button = document.querySelector(".btn-light");
let element = document.body;
let font = document.querySelectorAll(".fa-moon")[0];

// Toggle the mode and store the new value in local storage
function darkMode() {
  const newMode = element.dataset.bsTheme === "light" ? "dark" : "light";
  element.dataset.bsTheme = newMode;

  if (element.dataset.bsTheme == "dark") {
    font.classList.add("fa-solid");
    font.classList.remove("fa-regular");
  } else {
    font.classList.remove("fa-solid");
    font.classList.add("fa-regular");
  }
  // Save the user's preferred mode in localStorage
  localStorage.setItem("mode", newMode);
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
    const countryBorders = document.querySelector("#country-borders");
    // Update the elements with the country information

    countryFlag.src = country.flags.svg;
    countryName.textContent = country.name.official;
    countryNativeName.textContent = `${
      country.name.nativeName[Object.keys(country.name.nativeName)[0]].common
    }`;
    countryPopulation.textContent = `${country.population.toLocaleString()}`;
    countryRegion.textContent = `${country.region}`;
    countrySubRegion.textContent = `${country.subregion}`;
    countryCapital.textContent = `${country.capital?.[0] || "N/A"}`;

    //show the full names of the border countries
    if (country.borders && country.borders.length > 0) {
      const borderPromises = country.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((response) => response.json())
          .then((data) => data[0].name.common);
      });
      Promise.all(borderPromises).then((borderCountries) => {
        countryBorders.textContent = `${borderCountries.join(" ")}`;
      });
    } else {
      countryBorders.textContent = "No countries on border .";
    }
    countryDomain.textContent = `${country.cca2}`;
    countryCurrency.textContent = `${
      country.currencies[Object.keys(country.currencies)[0]].name
    }`;
    countryLanguage.textContent = `${
      country.languages[Object.keys(country.languages)[0]]
    }`;
  })
  .catch((error) => console.log(error));

// back button
document
  .querySelector(".back-btn")
  .addEventListener("click", () => (location.href = "index.html"));
