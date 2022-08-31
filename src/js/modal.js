import { STORAGE_KEY_MOVIEID } from './constants';
import { openMovieCard } from './modalCardOpen';
import { changeActiveOfBtns } from './displayLibrary.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  openModal: document.querySelector('.modal[data-modal]'),
  closeModal: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.backdropMovie'),
  modal: document.querySelector('.movie-modal-wrap'),
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
  // changeActiveOfBtns();
}

function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onTargetKeydown);
  document.body.style.overflow = '';
  localStorage.removeItem(STORAGE_KEY_MOVIEID);
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
