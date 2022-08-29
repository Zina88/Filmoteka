const refs = {
  gallery: document.querySelector('.gallery'),
  openModal: document.querySelector('[data-modal]'),
  closeModal: document.querySelector('[data-action="close-modal"]'),
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
  console.dir(e.target);
  onOpenModal();
}

function onOpenModal() {
  console.log('open');
  refs.backdrop.classList.toggle('is-hidden');
}

function onCloseModal() {
  console.log('open');
  refs.backdrop.classList.toggle('is-hidden');
}

// function onBackdropClick() {
//   if (e.currentTarget === e.target) {
//     onCloseFooterModal();
//   }
// }

//   if (isEscKey) {
//     onCloseFooterModal();
//     window.removeEventListener('keydown', onTargetKeydown);
//   }
// }
