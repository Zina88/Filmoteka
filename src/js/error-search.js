const refs = { errorEl: document.querySelector('.error') };

export default function errorSearch(text) {
  refs.errorEl.textContent = text;
  refs.errorEl.classList.remove('visually-hidden');
  setTimeout(() => {
    refs.errorEl.classList.add('visually-hidden');
  }, 3000);
}
