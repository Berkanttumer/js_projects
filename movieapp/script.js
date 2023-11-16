// Mobile Menu
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');

openBtn.addEventListener('click', () => {
  nav.forEach((navEl) => navEl.classList.add('visible'));
});

closeBtn.addEventListener('click', () => {
  nav.forEach((navEl) => navEl.classList.remove('visible'));
});

//Get Path Name
const global = {
  currentPage: window.location.pathname,
};

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Page Check
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('ANA SAYFA');
      break;
    case '/tv-shows.html':
      console.log('TV-SHOWS');
      break;
    case '/search.html':
      console.log('SEARCH SAYFASI');
      break
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
