const currentPath = window.location.pathname;

function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

function switchPage() {
  switch (currentPath) {
    case '/':
    case '/index.html':
      console.log('index sayfası');
      break;
    case '/index.html':
      console.log('index sayfasıss');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', switchPage);
