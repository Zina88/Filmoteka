// Oleh Lavrenko

import MovieApiService from '../js/movieApiService.js';
import { createMoviesMarkup } from '../js/markupCard.js';
import saveOnLocalStorage from './saveInLocalStorage';
import { STORAGE_KEY_MOVIES } from './constants';

// Left Wing Pagination Buttons

const previousButton = document.querySelector('[data-action-previous]');
const firstPageButton = document.querySelector('[data-action-first]');
const secondLeftButton = document.querySelector('[data-action-second]');
const thirdLeftButton = document.querySelector('[data-action-third]');
const leftDots = document.querySelector('.left-wing-dots');
firstPageButton.style.display = 'none';
leftDots.style.display = 'none';

// Right Wing Pagination Buttons

const thirdLastButton = document.querySelector('[data-action-last-third]');
const secondLastButton = document.querySelector('[data-action-last-second]');
const lastPageButton = document.querySelector('[data-action-last]');
const lastPageButtonLabel = document.querySelector('[data-action-last] > p');
const nextButton = document.querySelector('[data-action-next]');
const rightDots = document.querySelector('.right-wing-dots');

const totalPagesPlaceHolder = document.querySelector('.pages-container');
const MovieSercher = new MovieApiService();
const mainGallery = document.querySelector('.gallery');

let currentPage = 1;
let lastPageNumber = undefined;

function paginationBarBuilder(pageNumber, totalPages) {
  let totalPagesDisplay = '';

  if (pageNumber === 1) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    startButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 2) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 3) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 4) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === totalPages) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    finnishButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 1) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 2) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 3) {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else {
    totalPagesDisplay = `<div class="current-page"><p>${pageNumber}</p></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    secondLeftButton.innerHTML = `<p>${pageNumber - 2}</p>`;
    thirdLeftButton.innerHTML = `<p>${pageNumber - 1}</p>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<p>${pageNumber + 1}</p>`;
    secondLastButton.innerHTML = `<p>${pageNumber + 2}</p>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'inline-block';
  }
  return totalPagesDisplay;
}

export async function totalMovieDisplay(currentPage) {
  const popularMovies = await MovieSercher.popularMovies(currentPage);
  lastPageNumber = popularMovies.total_pages;
  let results = popularMovies.results;
  results = popularMovies.results;
  saveOnLocalStorage(STORAGE_KEY_MOVIES, results);
  totalPagesPlaceHolder.innerHTML = paginationBarBuilder(
    currentPage,
    lastPageNumber
  );
  mainGallery.innerHTML = createMoviesMarkup(results);
  lastPageButtonLabel.innerHTML = lastPageNumber;
}

totalMovieDisplay(currentPage);

// Standard Buttons

nextButton.addEventListener('click', nextPage);
previousButton.addEventListener('click', prevPage);
firstPageButton.addEventListener('click', firstPage);
lastPageButton.addEventListener('click', lastPage);

function nextPage() {
  currentPage++;
  totalMovieDisplay(currentPage);
}

function prevPage() {
  currentPage--;
  totalMovieDisplay(currentPage);
}

function firstPage() {
  currentPage = 1;
  totalMovieDisplay(currentPage);
}

function lastPage() {
  currentPage = lastPageNumber;
  totalMovieDisplay(lastPageNumber);
}

// Left Neighbouring Buttons

thirdLeftButton.addEventListener('click', prevPage);
secondLeftButton.addEventListener('click', secondLeftShow);

function secondLeftShow() {
  currentPage -= 2;
  totalMovieDisplay(currentPage);
}

// Right Neighbouring Buttons

thirdLastButton.addEventListener('click', nextPage);
secondLastButton.addEventListener('click', secondLastShow);

function secondLastShow() {
  currentPage += 2;
  totalMovieDisplay(currentPage);
}

// ===========================

function allButtonsShow() {
  nextButton.style.display = 'inline-flex';
  previousButton.style.display = 'inline-flex';
  firstPageButton.style.display = 'inline-flex';
  lastPageButton.style.display = 'inline-flex';
}

function startButtonsShow() {
  previousButton.style.display = 'none';
  firstPageButton.style.display = 'none';
  nextButton.style.display = 'inline-flex';
  lastPageButton.style.display = 'inline-flex';
}

function finnishButtonsShow() {
  previousButton.style.display = 'inline-flex';
  firstPageButton.style.display = 'inline-flex';
  nextButton.style.display = 'none';
  lastPageButton.style.display = 'none';
}
