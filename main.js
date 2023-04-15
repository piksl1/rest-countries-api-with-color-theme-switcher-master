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

// Rest Api
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countries = data;
    const countryInfos = document.querySelector("#country-infos");

    countries.forEach((country, index) => {
      if (index % 4 == 0) {
        row = document.createElement("div");
        row.classList.add(
          "row",
          "row-cols-1",
          "row-cols-md-2",
          "row-cols-lg-4",
          "g-4"
        );
        row.setAttribute("id", "second-row");
        countryInfos.appendChild(row);
      }

      const name = country.name.official;
      const population = country.population;
      const capital = country.capital?.[0] || "N/A";
      const region = country.region;
      const flag = country.flags.svg;

      const div = document.createElement("div");
      div.setAttribute("class", "item col");
      const spanName = document.createElement("span");
      spanName.setAttribute("class", "col-12");
      const imgFlag = document.createElement("img");
      imgFlag.setAttribute("src", flag);
      imgFlag.setAttribute("class", "img-fluid");
      const spanPopulation = document.createElement("span");
      spanPopulation.setAttribute("class", "col-12");
      const spanRegion = document.createElement("span");
      spanRegion.setAttribute("class", "col-12");
      const spanCapital = document.createElement("span");
      spanCapital.setAttribute("class", "col-12");

      spanName.textContent = `${name}`;
      spanPopulation.textContent = `Population: ${population.toLocaleString()}`;
      spanRegion.textContent = `Region: ${region}`;
      spanCapital.textContent = `Capital: ${capital}`;

      div.appendChild(imgFlag);
      div.appendChild(spanName);
      div.appendChild(spanPopulation);
      div.appendChild(spanRegion);
      div.appendChild(spanCapital);

      div.addEventListener("click", () => {
        // Navigate to more-info.html page and pass the country name as a query parameter
        window.location.href = `more-info.html?name=${name}`;
      });

      row.appendChild(div);
    });
  })
  .catch((error) => console.log(error));

// Select dropdown items and country infos container
const dropdownItems = document.querySelectorAll(".dropdown-item");
const countryInfos = document.querySelector("#country-infos");

// Fetch all countries from API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countries = data;

    // Function to filter countries by region and render them on the page
    const filterCountriesByRegion = (region) => {
      // Clear existing country infos from the container
      countryInfos.innerHTML = "";

      // Filter countries by region
      const filteredCountries = countries.filter((country) => {
        return country.region === region;
      });

      // Render filtered countries on the page
      filteredCountries.forEach((country, index) => {
        if (index % 4 == 0) {
          row = document.createElement("div");
          row.classList.add(
            "row",
            "row-cols-1",
            "row-cols-md-2",
            "row-cols-lg-4",
            "g-4"
          );
          row.setAttribute("id", "second-row");
          countryInfos.appendChild(row);
        }

        const name = country.name.official;
        const population = country.population;
        const capital = country.capital?.[0] || "N/A";
        const region = country.region;
        const flag = country.flags.svg;

        const div = document.createElement("div");
        div.setAttribute("class", "item col");
        const spanName = document.createElement("span");
        spanName.setAttribute("class", "col-12");
        const imgFlag = document.createElement("img");
        imgFlag.setAttribute("src", flag);
        imgFlag.setAttribute("class", "img-fluid");
        const spanPopulation = document.createElement("span");
        spanPopulation.setAttribute("class", "col-12");
        const spanRegion = document.createElement("span");
        spanRegion.setAttribute("class", "col-12");
        const spanCapital = document.createElement("span");
        spanCapital.setAttribute("class", "col-12");

        spanName.textContent = `${name}`;
        spanPopulation.textContent = `Population: ${population.toLocaleString()}`;
        spanRegion.textContent = `Region: ${region}`;
        spanCapital.textContent = `Capital: ${capital}`;

        div.appendChild(imgFlag);
        div.appendChild(spanName);
        div.appendChild(spanPopulation);
        div.appendChild(spanRegion);
        div.appendChild(spanCapital);

        div.addEventListener("click", () => {
          // Navigate to more-info.html page and pass the country name as a query parameter
          window.location.href = `more-info.html?name=${name}`;
        });

        row.appendChild(div);
      });
    };

    // Add click event listener to each dropdown item
    dropdownItems.forEach((item) => {
      item.addEventListener("click", () => {
        const region = item.getAttribute("data-region");
        filterCountriesByRegion(region);
      });
    });
  })
  .catch((error) => console.log(error));

//Search for countries
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countries = data;
    const countryInfos = document.querySelector("#country-infos");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.querySelector("#search-input");

    function displayCountries(countries) {
      countryInfos.innerHTML = "";
      countries.forEach((country, index) => {
        if (index % 4 == 0) {
          row = document.createElement("div");
          row.classList.add(
            "row",
            "row-cols-1",
            "row-cols-md-2",
            "row-cols-lg-4",
            "g-4"
          );
          row.setAttribute("id", "second-row");
          countryInfos.appendChild(row);
        }

        const name = country.name.official;
        const population = country.population;
        const capital = country.capital?.[0] || "N/A";
        const region = country.region;
        const flag = country.flags.svg;

        const div = document.createElement("div");
        div.setAttribute("class", "item col");
        const spanName = document.createElement("span");
        spanName.setAttribute("class", "col-12");
        const imgFlag = document.createElement("img");
        imgFlag.setAttribute("src", flag);
        imgFlag.setAttribute("class", "img-fluid");
        const spanPopulation = document.createElement("span");
        spanPopulation.setAttribute("class", "col-12");
        const spanRegion = document.createElement("span");
        spanRegion.setAttribute("class", "col-12");
        const spanCapital = document.createElement("span");
        spanCapital.setAttribute("class", "col-12");

        spanName.textContent = `${name}`;
        spanPopulation.textContent = `Population: ${population.toLocaleString()}`;
        spanRegion.textContent = `Region: ${region}`;
        spanCapital.textContent = `Capital: ${capital}`;

        div.appendChild(imgFlag);
        div.appendChild(spanName);
        div.appendChild(spanPopulation);
        div.appendChild(spanRegion);
        div.appendChild(spanCapital);

        div.addEventListener("click", () => {
          // Navigate to more-info.html page and pass the country name as a query parameter
          window.location.href = `more-info.html?name=${name}`;
        });

        row.appendChild(div);
      });
    }

    displayCountries(countries);

    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const foundCountry = countries.find(
        (country) => country.name.common.toLowerCase() === searchTerm
      );

      if (foundCountry) {
        displayCountries([foundCountry]);
      } else {
        // Show an alert if the entered country name is not found
        alert(`Country "${searchTerm}" not found`);
      }
    });
  })
  .catch((error) => console.log(error));
