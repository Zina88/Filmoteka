// Oleh Lavrenko

import MovieApiService from "../js/movieApiService";

const totalPagesPlaceHolder = document.querySelector(".pages-container");
const MovieSercher = new MovieApiService;

const nextButton = document.querySelector("[data-action-next]");
const previousButton = document.querySelector("[data-action-previous]");


let currentPage = 6;

async function totalMovieDisplay(currentPage = 1) {

  const popularMovies = await MovieSercher.popularMovies(currentPage);

  console.log(popularMovies);

  let totalPagesDisplay = "";

  if (currentPage === 1) {
    totalPagesDisplay = `
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>
    <p>&#67871&#67871&#67871</p>
    <p>${popularMovies.total_pages}</p>`;
    previousButton.style.display = "none";
  } else if (currentPage === 2) {
    totalPagesDisplay = `
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>
    <p>&#67871&#67871&#67871</p>
    <p>${popularMovies.total_pages}</p>`;
    previousButton.style.display = "inline-flex";
  } else if (currentPage === 3) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>
    <p>&#67871&#67871&#67871</p>
    <p>${popularMovies.total_pages}</p>`;
    previousButton.style.display = "inline-flex";
  } else if (currentPage === 4) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>${currentPage - 2}</p>
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>
    <p>&#67871&#67871&#67871</p>
    <p>${popularMovies.total_pages}</p>`;
    previousButton.style.display = "inline-flex";
  } else if (currentPage === popularMovies.total_pages) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>${currentPage - 2}</p>
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>`;
    nextButton.style.display = "none";
  } else if (currentPage === (popularMovies.total_pages - 1)) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>&#67871&#67871&#67871</p>
    <p>${currentPage - 2}</p>
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>`;
    nextButton.style.display = "inline-flex";
  } else if (currentPage === (popularMovies.total_pages - 2)) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>&#67871&#67871&#67871</p>
    <p>${currentPage - 2}</p>
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>`;
    nextButton.style.display = "inline-flex";
  } else if (currentPage === (popularMovies.total_pages - 3)) {
    totalPagesDisplay = `
    <p>1</p> 
    <p>&#67871&#67871&#67871</p>
    <p>${currentPage - 2}</p>
    <p>${currentPage - 1}</p>
    <div class="current-page"><p>${currentPage}</p></div>
    <p>${currentPage + 1}</p>
    <p>${currentPage + 2}</p>
    <p>${popularMovies.total_pages}</p>`;
    nextButton.style.display = "inline-flex";
  } else {
    totalPagesDisplay = `
      <p>1</p> 
      <p>&#67871&#67871&#67871</p>
      <p>${currentPage - 2}</p>
      <p>${currentPage - 1}</p>
      <div class="current-page"><p>${currentPage}</p></div>
      <p>${currentPage + 1}</p>
      <p>${currentPage + 2}</p>
      <p>&#67871&#67871&#67871</p>
      <p>${popularMovies.total_pages}</p>`;
    previousButton.style.display = "inline-flex";
    nextButton.style.display = "inline-flex";
  }
  totalPagesPlaceHolder.innerHTML = totalPagesDisplay;
}

totalMovieDisplay(currentPage);

nextButton.addEventListener("click", nextPage);
previousButton.addEventListener("click", prevPage);

function nextPage() {
  currentPage++;
  totalMovieDisplay(currentPage);
};

function prevPage() {
  currentPage--;
  totalMovieDisplay(currentPage);
};