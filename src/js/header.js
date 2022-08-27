refs = {
  library: document.querySelector('[data-name="library"]'),
  home: document.querySelector('[data-name="home"]'),
};

refs.library.addEventListener('click', onClickLibrary);
refs.home.addEventListener('click', onClickHome);
function onClickLibrary(e) {
  window.location.href = 'http://localhost:1234/library.html';
}
function onClickHome(e) {
  window.location.href = 'http://localhost:1234/index.html';
}
