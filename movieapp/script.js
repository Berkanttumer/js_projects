document.addEventListener('DOMContentLoaded', () => {
  displayPopularMovies();
  displayPopularTV();
  displaySlider();
  handleSearchFormSubmit();
  handleSearchFormSubmitMobile()
});

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
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  API_KEY: '3e2ad5311da9fce573c7f1bfb30b2d81',
  API_URL: 'https://api.themoviedb.org/3/',
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
  

    case '/index.html':
      displayPopularMovies();
      displayPopularTV();
      displaySlider();
      handleSearchFormSubmit();
      handleSearchFormSubmitMobile()
      break;

    case '/tv-shows.html':
      displayPopularTVPage();
      displayTopRatedTV();
      displayTrendingOnTV();
      handleSearchFormSubmitTV();
      handleSearchFormSubmitMobileTV()
      break;

    case '/search.html':
      searchMovie();
      break;

    case '/movie-details.html':
      displayMovieDetails();
      getMovieDetailsCast();
      getMovieRec();
      break;

    case '/tv-show-details.html':
      displayTVDetails();
      getTVDetailsCast();
      getTVRec();
      break;

    case '/searchTV.html':
      
      handleSearchFormSubmitMobileTV()
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.API_KEY;
  const API_URL = global.API_URL;

  const res = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-us`
  );
  const data = await res.json();

  return data;
}

async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" alt="Movie Title"/></a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-[#dc1a28]"></i> ${movie.vote_average.toFixed(
        1
      )} / 10 </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  initSwiper();
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Display data on page
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img alt="${movie.title}" />`
        : `<img src="img/no-image.jpg" alt="${movie.title}" />`
    }
    </a>
    <h2 class="font-bold">${movie.title}</h2>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <p><i class="fas fa-star text-[#dc1a28]"></i></p>
        <p>${movie.vote_average.toFixed(1)}</p>
      </div>
    <div class="release-date">
      <p class="">${movie.release_date.split('-')[0]}</p>
    </Div
    
  </div>
  </div>
`;
    document.querySelector('.movie-cards').appendChild(div);
  });
}

async function displayPopularTV() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-show-details.html?id=${tv.id}">
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="img alt="${tv.name}" />`
        : `<img src="img/no-image.jpg" alt="${tv.name}" />`
    }
    </a>
    <h2>${tv.name}</h2>
    <div class="flex justify-between items-center">
    <div class="flex gap-2">
      <p><i class="fas fa-star text-[#dc1a28]"></i></p>
      <p>${tv.vote_average.toFixed(1)}</p>
    </div>
  <div class="tv-release-date">
      <p class="">${tv.first_air_date.split('-')[0]}</p>
  </div
</div>
</div>
`;
    document.querySelector('.popular-tv-page').appendChild(div);
  });
}

async function displayPopularTVPage() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-show-details.html?id=${tv.id}">
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="img alt="${tv.name}" />`
        : `<img src="img/no-image.jpg" alt="${tv.name}" />`
    }
    </a>
    <h2>${tv.name}</h2>
    <p>First Air Date: ${tv.first_air_date}</p>
  </div>
`;
    document.querySelector('.popular-tv-page').appendChild(div);
  });
}

async function displayTopRatedTV() {
  const { results } = await fetchAPIData('tv/top_rated');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-show-details.html?id=${tv.id}">
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="img alt="${tv.name}" />`
        : `<img src="img/no-image.jpg" alt="${tv.name}" />`
    }
    </a>
    <h2>${tv.name}</h2>
    <p>First Air Date: ${tv.first_air_date}</p>
  </div>
`;
    document.querySelector('.top-rated-page').appendChild(div);
  });
}

async function displayTrendingOnTV() {
  const { results } = await fetchAPIData('trending/tv/day');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-show-details.html?id=${tv.id}">
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="img alt="${tv.poster_path}" />`
        : `<img src="img/no-image.jpg" alt="${tv.poster_path}" />`
    }
    </a>
    <h2>${tv.name}</h2>
    <p>First Air Date: ${tv.first_air_date}</p>
  </div>
`;
    document.querySelector('.trending-page').appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  const topTitle = document.createElement('div');
  topTitle.innerHTML = `
  <h1 class="mb-5 mt-10 text-3xl font-bold text-center">${movie.title.toUpperCase()}</h1>
  <p class="text-m">${movie.overview}</p>
    `;

  const movieBG = document.createElement('div');
  movieBG.innerHTML = `<div><img>
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="img2" alt="${movie.title}" />`
        : `<img src="img/no-image.jpg" alt="${movie.title}" />`
    }
    </img></div>`;
  const point = document.createElement('div');
  point.innerHTML = `
    <div class="flex gap-5 items-center justify-center">
                    <i class="fas fa-star text-primary text-[#dc1a28]"></i>
                    <p>${movie.vote_average.toFixed(1)} / 10</p>
                </div>
    
    `;
  const dateRelease = document.createElement('li');
  dateRelease.innerHTML = `
    <li>
    <span class="font-bold text-x">Date Release</span>
    <a href="#"><span>${movie.release_date}</span> </a>
</li>
<li>
                        <span class="font-bold text-x">Length</span>
                        <a href="#"><span>${movie.runtime} Minutes </span> </a>
                    </li>
                    <li>
                        <span class="font-bold">Genre</span>
                        <div>
                        ${movie.genres
                          .map((genre) => `<a href="">${genre.name}</a>`)
                          .join(' , ')}
                        </div>
                    </li>
                    <li>
                        <span class="font-bold">Production</span>
                        <div class="list-group">${movie.production_companies.map(
                          (company) => `<span> ${company.name} </span>`
                        )}</div>
                    </li>
    
    
    `;

  //Get Youtube Trailer

  const trailer = await fetchAPIData(`movie/${movieId}/videos`);
  const results = await trailer.results.find(
    (video) => video.type === 'Trailer'
  );

  const getTrailer = document.createElement('a');
  getTrailer.innerHTML = `
    <a href="https://www.youtube.com/watch?v=${results.key}">
    <img   ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="img" />`
        : `<img src="img/no-image.jpg" />`
    }
    </img>
</a>
<div class="play-button mb-5">
<a href="https://www.youtube.com/watch?v=${results.key}">
    <i class="fa-solid fa-play"></i>
</a>
</div>
    `;

  document.querySelector('.top-title').appendChild(topTitle);
  document.querySelector('.movie-bg').appendChild(movieBG);
  document.querySelector('.top-rank').appendChild(point);
  document.querySelector('.about-ul').appendChild(dateRelease);
  document.querySelector('.trailer').appendChild(getTrailer);
}

async function displayTVDetails() {
  const tvId = window.location.search.split('=')[1];

  const tv = await fetchAPIData(`tv/${tvId}`);

  const tvTopTitle = document.createElement('div');
  tvTopTitle.innerHTML = `
  <h1 class="mb-5 mt-10 text-3xl font-bold text-center">${tv.name}</h1>
  <p class="text-m">${tv.overview}</p>
    `;

  const tvBG = document.createElement('div');
  tvBG.innerHTML = `<div><img>
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/original${tv.backdrop_path}" class="img2" alt="${tv.name}" />`
        : `<img src="img/no-image.jpg" alt="${tv.name}" />`
    }
    </img></div>`;
  const point = document.createElement('div');
  point.innerHTML = `
    <div class="flex gap-5 items-center justify-center">
                    <i class="fas fa-star text-primary text-[#dc1a28]"></i>
                    <p>${tv.vote_average.toFixed(1)} / 10</p>
                </div>
     
    `;
  const dateRelease = document.createElement('li');
  dateRelease.innerHTML = `
    <li>
    <span class="font-bold text-x">Date Release</span>
    <a href="#"><span>${tv.first_air_date}</span> </a>
</li>
<li>
                        <span class="font-bold text-x">Last Air Date</span>
                        <a href="#"><span>${tv.last_air_date}</span> </a>
                    </li>
                    <li>
                        <span class="font-bold text-x">Number Of Episodes</span>
                        <a href="#"><span>${tv.number_of_episodes}</span> </a>
                    </li>
                    <li>
                        <span class="font-bold">Genre</span>
                        <div>
                        ${tv.genres
                          .map((genre) => `<a href="">${genre.name}</a>`)
                          .join(' , ')}
                        </div>
                    </li>
                    <li>
                        <span class="font-bold">Production</span>
                        <div class="list-group">${tv.production_companies.map(
                          (company) => `<span> ${company.name} </span>`
                        )}</div>
                    </li>
    
    
    `;

  const getTrailer = document.createElement('a');
  getTrailer.innerHTML = `
    <a href="#">
    <img   ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/original${tv.poster_path}" class="img" />`
        : `<img src="img/no-image.jpg" />`
    }
    </img>
</a>
    `;

  document.querySelector('.tv-top-title').appendChild(tvTopTitle);
  document.querySelector('.tv-bg').appendChild(tvBG);
  document.querySelector('.tv-top-rank').appendChild(point);
  document.querySelector('.tv-about-ul').appendChild(dateRelease);
  document.querySelector('.tv-trailer').appendChild(getTrailer);
}

async function getTVDetailsCast() {
  const tvId = window.location.search.split('=')[1];

  const tv = await fetchAPIData(`tv/${tvId}/credits`);
  const firstTenActors = tv.cast.slice(0, 10);

  firstTenActors.forEach((actor) => {
    const showCast = document.createElement('div');
    showCast.innerHTML = `<div class="actor">
    <a href="${actor.profile_path ? actor.profile_path : '#'}">
    <img 
      src="${
        actor.profile_path
          ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
          : 'img/no-image.jpg'
      }" 
      alt="${actor.name}" 
    />
    <p>${actor.name}</p>
  </a>
  </div>
  `;
    document.querySelector('.tv-actors').appendChild(showCast);
  });
}

async function getMovieDetailsCast() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}/credits`);
  const firstTenActors = movie.cast.slice(0, 10);

  firstTenActors.forEach((actor) => {
    const showCast = document.createElement('div');
    showCast.innerHTML = `<div class="actor">
    <a href="${actor.profile_path ? actor.profile_path : '#'}">
    <img 
      src="${
        actor.profile_path
          ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
          : 'img/no-image.jpg'
      }" 
      alt="${actor.name}" 
    />
    <p>${actor.name}</p>
  </a>
  </div>
  `;
    document.querySelector('.actors').appendChild(showCast);
  });
}

async function getTVRec() {
  const tvId = window.location.search.split('=')[1];
  const recWrap = document.querySelector('.tv-rec-wrap');

  const tv = await fetchAPIData(`tv/${tvId}/recommendations`);

  tv.results.forEach((tv) => {
    const showRec = document.createElement('div');
    showRec.classList.add('rec');
    showRec.innerHTML = `<div class="rec">
    <a href="tv-show-details.html?id=${tv.id}">
        <img 
          src="${
            tv.poster_path
              ? `https://image.tmdb.org/t/p/w200/${tv.poster_path}`
              : 'img/no-image.jpg'
          }" 
          alt="${tv.name}" 
        />
        <p>${tv.name}</p>
      </a>
    </div>`;
    recWrap.appendChild(showRec);
  });
}

async function getMovieRec() {
  const movieId = window.location.search.split('=')[1];
  const recWrap = document.querySelector('.rec-wrap');

  const movie = await fetchAPIData(`movie/${movieId}/recommendations`);

  movie.results.forEach((movie) => {
    const showRec = document.createElement('div');
    showRec.classList.add('rec');
    showRec.innerHTML = `<div class="rec">
    <a href="movie-details.html?id=${movie.id}">
        <img 
          src="${
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
              : 'img/no-image.jpg'
          }" 
          alt="${movie.original_title}" 
        />
        <p>${movie.original_title}</p>
      </a>
    </div>`;
    recWrap.appendChild(showRec);
  });
}

async function searchAPIData() {
  const API_KEY = global.API_KEY;
  const API_URL = global.API_URL;

  const res = await fetch(
    `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await res.json();

  return data;
}

function showAlert(message) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert');
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

async function searchAPIDataTV() {
  const API_KEY = global.API_KEY;
  const API_URL = global.API_URL;

  const res = await fetch(
    `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );
  const data = await res.json();

  return data;
}

function showAlert(message) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert');
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

async function searchTV() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } =
      await searchAPIDataTV();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results');
      return;
    }

    displaySearchResultsTV(results);

    document.querySelector('#search-input2').value = '';
  }
}

function displaySearchResultsTV(results) {
  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="tv-show-details.html?id=${tv.id}">
    ${
      tv.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="img alt="${tv.name}" />`
        : `<img src="img/no-image.jpg" alt="${tv.name}" />`
    }
    </a>
    <h2 class="font-bold">${tv.name}</h2>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <p><i class="fas fa-star text-[#dc1a28]"></i></p>
        <p>${tv.vote_average.toFixed(1)}</p>
      </div>
    <div class="release-date">
      <p class="">${tv.first_air_date.split('-')[0]}</p>
    </Div
    
  </div>
  </div>
`;
    console.log(results)
    const title = document.querySelector('.search-title2');
    title.innerHTML = `${results.length} of ${
      global.search.totalResults
    } Results for <span class="text-[#dc1a28] font-bold">${global.search.term.toUpperCase()}</span>`;
    document.querySelector('.page-title2').appendChild(title);

    document.querySelector('.search-cards2').appendChild(div);
  });
}

async function searchMovie() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#searchInput').value = '';
  }
}

function displaySearchResults(results) {

  document.querySelector('.search-cards').innerHTML = ''
  document.querySelector('.end-wrapper').innerHTML = ''


  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img alt="${movie.title}" />`
        : `<img src="img/no-image.jpg" alt="${movie.title}" />`
    }
    </a>
    <h2 class="font-bold">${movie.title}</h2>
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <p><i class="fas fa-star text-[#dc1a28]"></i></p>
        <p>${movie.vote_average.toFixed(1)}</p>
      </div>
    <div class="release-date">
      <p class="">${movie.release_date.split('-')[0]}</p>
    </Div
    
  </div>
  </div>
`;

    const title = document.querySelector('.search-deneme');
    title.innerHTML = `${results.length} of ${
      global.search.totalResults
    } Results for <span class="text-[#dc1a28] font-bold">${global.search.term.toUpperCase()}</span>`;
    document.querySelector('.page-title').appendChild(title);

    document.querySelector('.search-cards').appendChild(div);
  });

  displayPagination();
}

// Pagination for search
function displayPagination() {
  const div = document.createElement('div');
  div.innerHTML = `<div class="buttons gap-5 flex">
  <button class="btn prev">Prev</button>
  <button class="btn next">Next</button>
</div>
<div class="page mt-4">
  <span>Page ${global.search.page} of ${global.search.totalPages}</span>
</div>`;

  document.querySelector('.end-wrapper').appendChild(div);

  if (global.search.page === 1){
    document.querySelector('.prev').disabled = true
  
  }

  if (global.search.page === global.search.totalPages){
    document.querySelector('.next').disabled = true
  }

  document.querySelector('.next').addEventListener('click', async()=>{
    global.search.page++
    const {results , total_Pages} = await searchAPIData()
    displaySearchResults(results)
  })

  document.querySelector('.prev').addEventListener('click', async()=>{
    global.search.page--
    const {results , total_Pages} = await searchAPIData()
    displaySearchResults(results)
  })
}




// Search form submission handler
function handleSearchFormSubmit() {
  document.querySelector('.search-form').addEventListener('submit', (event) => {
    const input = document.getElementById('searchInput');
    if (input.value === '') {
      event.preventDefault();
    } else {
      searchMovie();
    }
  });
}

function handleSearchFormSubmitTV() {
  document.querySelector('.search-form2').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('searchTV');
    if (input.value === '') {
      showAlert('Please enter a search term.');
    } else {
      const searchURL = `searchTV.html?type=tv&search-term=${input.value}`;
      window.location.href = searchURL;
    }
  });
}

function handleSearchFormSubmitMobile() {
  document.querySelector('.search-form-mobile').addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('searchInputMobile');
    if (input.value === '') {
      showAlert('Please enter a search term.');
    } else {
      const searchURL = `search.html?type=movie&search-term=${input.value}`;
      window.location.href = searchURL;
    }
  });
}

function handleSearchFormSubmitMobileTV() {
  document.querySelector('.searchFormMobileTV').addEventListener('submit', (event) => {
    const input = document.getElementById('searchInputMobileTV');
    if (input.value === '') {
      event.preventDefault();
    } else {
      const searchURL = `searchTV.html?type=tv&search-term=${input.value}`;
      window.location.href = searchURL;
      searchTV();
    }
  });
}
