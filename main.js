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
