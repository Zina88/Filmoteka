const libraryMessage = document.querySelector('.gallery-text');
const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');

watchedBtn.addEventListener('click', displeyWatched);
queueBtn.addEventListener('click', displeyQueue);

function displeyWatched() {
  libraryMessage.textContent = 'Sorry, you have not added any film to your watched list yet.';
  watchedBtn.classList.add('is-active');
  queueBtn.classList.remove('is-active');
}

function displeyQueue() {
  libraryMessage.textContent = 'Sorry, you have not added any film to your queue yet.';
  queueBtn.classList.add('is-active');
  watchedBtn.classList.remove('is-active');
}
