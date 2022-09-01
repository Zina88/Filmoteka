const target = document.querySelector('footer');
const scrollToTopBtn = document.querySelector('.scrollToTopBtn');
const rootElement = document.documentElement;
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 2500 ||
    document.documentElement.scrollTop > 2500
  ) {
    scrollToTopBtn.classList.add('showBtn');
  } else {
    scrollToTopBtn.classList.remove('showBtn');
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
scrollToTopBtn.addEventListener('click', scrollToTop);

export default scrollToTop;
