// Oleh Lavrenko

import MovieApiService from '../js/movieApiService.js';
import { appendMoviesMarkup, createMoviesMarkup } from '../js/markupCard.js';
import saveOnLocalStorage from './saveInLocalStorage';
import { STORAGE_KEY_MOVIES } from './constants';
import scrollToTop from './top-button';

// Left Wing Pagination Buttons

const previousButton = document.querySelector('[data-action-previous]');
const leftDotsButton = document.querySelector('[data-action-left-dots]');
leftDotsButton.style.display = 'none';
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
const lastPageButtonLabel = document.querySelector('[data-action-last] > span');
const nextButton = document.querySelector('[data-action-next]');
const rightDotsButton = document.querySelector('[data-action-right-dots]');
rightDotsButton.style.display = 'none';
const rightDots = document.querySelector('.right-wing-dots');

const totalPagesPlaceHolder = document.querySelector('.pages-container');
const movieService = new MovieApiService();
const mainGallery = document.querySelector('.gallery');

let currentPageNumber = 1;
let lastPageNumber = null;

function paginationBarBuilder(pageNumber, totalPages) {
  let totalPagesDisplay = '';

  if (totalPages === 1) {
    totalPagesPlaceHolder.style.display = 'none';
  } else {
    totalPagesPlaceHolder.style.display = 'flex';
  }
  if (pageNumber === 1) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    startButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 2) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 3) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 4) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  } else if (pageNumber === 5) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'inline-flex';
    leftDotsButton.innerHTML = `<span>${pageNumber - 3}</span>`;
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-block';
  }

  else if (pageNumber === totalPages) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    finnishButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 1) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 2) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 3) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  } else if (pageNumber === totalPages - 4) {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'inline-flex';
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'none';
  }
  else {
    totalPagesDisplay = `<div class="current-page"><span>${pageNumber}</span></div>`;
    allButtonsShow();
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    secondLeftButton.innerHTML = `<span>${pageNumber - 2}</span>`;
    thirdLeftButton.innerHTML = `<span>${pageNumber - 1}</span>`;
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    thirdLastButton.innerHTML = `<span>${pageNumber + 1}</span>`;
    secondLastButton.innerHTML = `<span>${pageNumber + 2}</span>`;
    rightDotsButton.style.display = 'none';
    leftDots.style.display = 'inline-block';
    rightDots.style.display = 'inline-block';
  }

  // Total Pages Adaptation 

  // Сделать холдер исчезающим при 0 страницах

  if (totalPages === 1) {
    // 1 page - John Wick
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }


  // 2 pages - Roboto - OK
  if (totalPages === 2 && pageNumber === 1) {
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    firstPageButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 2 && pageNumber === 2) {
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    firstPageButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 3 pages - Trance - OK
  if (totalPages === 3 && pageNumber === 1) {
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    firstPageButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 3 && pageNumber === 2) {
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    firstPageButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 3 && pageNumber === 3) {
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    firstPageButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 4 pages mumba - OK

  if (totalPages === 4 && pageNumber === 1) {
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    lastPageButton.style.display = 'inline-flex';
    firstPageButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 4 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 4 && pageNumber === 3) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 4 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 5 pages - Pace - OK

  if (totalPages === 5 && pageNumber === 1) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'inline-flex';
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
  } else if (totalPages === 5 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 5 && pageNumber === 3) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 5 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';

  } else if (totalPages === 5 && pageNumber === 5) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'none'
    leftDotsButton.style.display = 'inline-flex';
    leftDotsButton.innerHTML = `<span>${pageNumber - 3}</span>`;
  }

  // 6 pages - Ukrain - OK

  if (totalPages === 6 && pageNumber === 1) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 6 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
  } else if (totalPages === 6 && pageNumber === 3) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 6 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 6 && pageNumber === 5) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'none';
    leftDotsButton.style.display = 'inline-flex';
    leftDotsButton.innerHTML = `<span>${pageNumber - 3}</span>`;
  } else if (totalPages === 6 && pageNumber === 6) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 7 pages - Sharks - OK

  if (totalPages === 7 && pageNumber === 1) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 7 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 7 && pageNumber === 3) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
  } else if (totalPages === 7 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 7 && pageNumber === 5) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 7 && pageNumber === 6) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 7 && pageNumber === 7) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 8 pages - Batman - OK

  if (totalPages === 8 && pageNumber === 1) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 8 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 8 && pageNumber === 3) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
  } else if (totalPages === 8 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'inline-flex';
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
  } else if (totalPages === 8 && pageNumber === 5) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'none';
    leftDotsButton.innerHTML = `<span>${pageNumber - 3}</span>`;
  } else if (totalPages === 8 && pageNumber === 6) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 8 && pageNumber === 7) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 8 && pageNumber === 8) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }

  // 9 pages - Quick - OK

  if (totalPages === 9 && pageNumber === 1) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'none';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 2) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'none';
    thirdLeftButton.style.display = 'none';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 3) {
    firstPageButton.style.display = 'none';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 4) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'inline-flex';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 5) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'none';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'inline-flex';
    rightDotsButton.style.display = 'inline-flex';
    leftDotsButton.innerHTML = `<span>${pageNumber - 3}</span>`;
    rightDotsButton.innerHTML = `<span>${pageNumber + 3}</span>`;
  } else if (totalPages === 9 && pageNumber === 6) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'inline-flex';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 7) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'inline-flex';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 8) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'inline-flex';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'inline-flex';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  } else if (totalPages === 9 && pageNumber === 9) {
    firstPageButton.style.display = 'inline-flex';
    secondLeftButton.style.display = 'inline-flex';
    thirdLeftButton.style.display = 'inline-flex';
    thirdLastButton.style.display = 'none';
    secondLastButton.style.display = 'none';
    lastPageButton.style.display = 'none';
    leftDots.style.display = 'inline-flex';
    rightDots.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'inline-flex';
    leftDotsButton.style.display = 'none';
    rightDotsButton.style.display = 'none';
  }
  return totalPagesDisplay;
}

export const updatePaginationBar = (currentPage, lastPage) => {
  currentPageNumber = currentPage;
  lastPageNumber = lastPage;
  totalPagesPlaceHolder.innerHTML = paginationBarBuilder(
    currentPage,
    lastPage
  );
  lastPageButtonLabel.innerHTML = lastPage;
}

export async function totalMovieDisplay(currentPage) {
  scrollToTop();
  let moviesToShow = null;
  if (movieService.query) {
    moviesToShow = await movieService.moviesBySearch(currentPage);
  } else {
    moviesToShow = await movieService.popularMovies(currentPage);
  };
  let results = moviesToShow.results;
  results = moviesToShow.results;
  saveOnLocalStorage(STORAGE_KEY_MOVIES, results);
  updatePaginationBar(currentPage, moviesToShow.total_pages);
  mainGallery.innerHTML = await createMoviesMarkup(results);
}

totalMovieDisplay(currentPageNumber);

// Standard Buttons

nextButton.addEventListener('click', nextPage);
previousButton.addEventListener('click', prevPage);
firstPageButton.addEventListener('click', firstPage);
lastPageButton.addEventListener('click', lastPage);

function nextPage() {
  currentPageNumber++;
  totalMovieDisplay(currentPageNumber);
}

function prevPage() {
  currentPageNumber--;
  totalMovieDisplay(currentPageNumber);
}

function firstPage() {
  currentPageNumber = 1;
  totalMovieDisplay(currentPageNumber);
}

function lastPage() {
  currentPageNumber = lastPageNumber;
  totalMovieDisplay(lastPageNumber);
}

// Left Neighbouring Buttons

thirdLeftButton.addEventListener('click', prevPage);
secondLeftButton.addEventListener('click', secondLeftShow);

function secondLeftShow() {
  currentPageNumber -= 2;
  totalMovieDisplay(currentPageNumber);
}

// Right Neighbouring Buttons

thirdLastButton.addEventListener('click', nextPage);
secondLastButton.addEventListener('click', secondLastShow);

function secondLastShow() {
  currentPageNumber += 2;
  totalMovieDisplay(currentPageNumber);
}

// Dots Buttons

leftDotsButton.addEventListener('click', leftDotsPage);
rightDotsButton.addEventListener('click', rightDotsPage);

function leftDotsPage() {
  currentPageNumber -= 3;
  totalMovieDisplay(currentPageNumber);
}

function rightDotsPage() {
  currentPageNumber += 3;
  totalMovieDisplay(currentPageNumber);
}

// Buttons Show-Hide

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