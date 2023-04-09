// page mode
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

// Rest Api
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countries = data;
    const countryInfos = document.querySelector("#country-infos");
    // Iterate through each country and display its information
    let row;
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

      row.appendChild(div);
    });
  })
  .catch((error) => console.log(error));
