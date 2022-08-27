  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", onOpenFooterModal);
  refs.closeModalBtn.addEventListener("click", onCloseFooterModal);

  function onOpenFooterModal(){
  refs.modal.classList.remove("is-hidden");
  window.addEventListener('keydown', onTargetKeydown);
  }

  function onCloseFooterModal(){
    refs.modal.classList.add("is-hidden");
    window.removeEventListener('keydown', onTargetKeydown);
  }

  function onTargetKeydown(e) {  
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = e.code === ESC_KEY_CODE;

    if (isEscKey) {
      onCloseFooterModal();
      window.removeEventListener('keydown', onTargetKeydown);
    }
  }