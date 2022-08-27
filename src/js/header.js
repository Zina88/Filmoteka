const refs = {
  logo: document.querySelector('.logo_link'),
  home: document.querySelector('[data-name="home"]'),
  library: document.querySelector('[data-name="my library"]'),
  header: document.querySelector('header'),
  form: document.querySelector('#search-form'),
};

refs.library.addEventListener('click', onClickLibrary);
refs.home.addEventListener('click', onClickHome);
refs.logo.addEventListener('click', onClickLogo);
function onClickLibrary(e) {
  e.preventDefault();
  goLibrary();
}
function onClickHome(e) {
  e.preventDefault();
  if (refs.home.classList.contains('current')) {
    return;
  }
  goHomePage();
}
function onClickLogo(e) {
  e.preventDefault();
  if (refs.home.classList.contains('current')) {
    return;
  }
  goHomePage();
}
function goHomePage() {
  refs.library.classList.remove('current');
  refs.home.classList.add('current');
  refs.header.classList.add('header_home');
  refs.header.classList.remove('header__mylib-container');
  refs.form.classList.remove('visually-hidden');
}
function goLibrary() {
  refs.library.classList.add('current');
  refs.form.classList.add('visually-hidden');
  refs.home.classList.remove('current');
  refs.header.classList.remove('header_home');
  refs.header.classList.add('header__mylib-container');
}
// функція рендера форми
// function markupHeaderSearchForm() {
//   return ` <form id="search-form" class="search">
//         <input
//           class="search_input"
//           type="text"
//           placeholder="Movie search"
//           name="searchQuery"
//           data-key="search"
//         />
//         <svg class="search_icon" width="12" height="12">
//           <use href="/src/images/icons.svg#search"></use>
//         </svg>
//       </form>`;
// }
// function addHeaderSearchFor() {
//   if (refs.form) {
//     return;
//   }
//   refs.headerContainer.insertAdjacentHTML(
//     'beforeend',
//     markupHeaderSearchForm()
//   );
// }
