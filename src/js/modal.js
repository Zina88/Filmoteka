import { STORAGE_KEY_MOVIE } from './constants';
import { openMovieCard } from './modalCardOpen';
// import {
//   saveToQueue,
//   removeFromQueue,
//   watchButtonListener,
//   queueButtonDeleteListener,
//   queueButtonSaveListener,
// } from './modalCardOpen';

let watchButtonListener = null;
let queueButtonSaveListener = null;
let queueButtonDeleteListener = null;

const refs = {
  gallery: document.querySelector('.gallery'),
  openModal: document.querySelector('.modal[data-modal]'),
  closeModal: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdropMovie'),
  modal: document.querySelector('.movie-modal-wrap'),

  watchBtn: document.querySelector('#watchedModalBtn'),
  queueBtn: document.querySelector('#queueModalBtn'),
};

refs.gallery.addEventListener('click', onGalleryClick);
refs.modal.addEventListener('click', onBackdropClick);
refs.closeModal.addEventListener('click', onCloseModal);

function onGalleryClick(e) {
  e.preventDefault();
  if (
    e.target.nodeName !== 'IMG' &&
    e.target.nodeName !== 'P' &&
    e.target.nodeName !== 'LI'
  ) {
    return;
  }
  onOpenModal();
  openMovieCard(e);
}

function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onTargetKeydown);
  document.body.style.overflow = 'hidden';
}

function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onTargetKeydown);
  document.body.style.overflow = '';
  localStorage.removeItem(STORAGE_KEY_MOVIE);
  if (watchButtonListener !== null) {
    refs.watchBtn.removeEventListener('click', watchButtonListener);
    watchButtonListener = null;
  }
  refs.queueBtn.removeEventListener('click', queueButtonDeleteListener);
  refs.queueBtn.removeEventListener('click', queueButtonSaveListener);
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onTargetKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
