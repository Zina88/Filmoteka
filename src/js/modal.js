const refs = {
  gallery: document.querySelector('.gallery'),
  openModal: document.querySelector('[data-modal]'),
  closeModal: document.querySelector('.close-modal-btn'),
  backdrop: document.querySelector('.backdropMovie'),
};

refs.gallery.addEventListener('click', onGalleryClick);
refs.openModal.addEventListener('click', onOpenModal);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.closeModal.addEventListener('click', onCloseModal);

function onGalleryClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'P') {
    return;
  }
  onOpenModal();
}

function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onTargetKeydown);
}

function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onTargetKeydown);
}

function onBackdropClick(e) {
  if (e.currentTarget !== e.target) {
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