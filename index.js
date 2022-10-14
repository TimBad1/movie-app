(function () {
  const myMovie = document.getElementById('app-movie');
  let buttonSearch = document.createElement('button');
  let buttonDelete = document.createElement('button');
  let input = document.createElement('input');
  let container = document.createElement('div');
  let logo = document.createElement('img');
  let heading = document.createElement('h1');
  let form = document.createElement('form');
  let searchDescr = document.createElement('form');

  container.classList.add('app-container');
  logo.classList.add('logo-app');
  logo.src = `assets\\img\\logo.svg`;
  heading.classList.add('heading-app');
  heading.textContent = 'JS30 "Movie App"';
  form.classList.add('search-form');
  form.setAttribute('action', '#');
  input.classList.add('search-input');
  input.placeholder = 'Search';
  input.setAttribute('autofocus', '');
  buttonSearch.classList.add('search-button');
  buttonDelete.classList.add('clear-button');
  searchDescr.classList.add('search-descr');
  form.append(input, buttonSearch, buttonDelete, searchDescr);
  container.append(logo, heading, form);
  myMovie.append(container)


  let cardList = document.createElement('ul');
  cardList.classList.add('app-list');

  myMovie.append(cardList);



  // Переменные для запросов
  const urlPopular = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';

  // Функция отправки запроса
  async function getData(url) {

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    console.log(data.results);
    data.results.map(element => {
      // console.log(element);
      createGalleryCard(element)
    });
  }

// функция создания карточек
  function createGalleryCard(box) {
    const card = document.createElement('div');
    const img = document.createElement('img');
    const textBox = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const average = document.createElement('div');

    card.classList.add('app-card');
    img.classList.add('gallery-img');
    img.src = `https://image.tmdb.org/t/p/w1280/${box.poster_path}`;
    img.alt = `Poster ${box.title}`;
    textBox.classList.add('app-card__text-box')
    title.classList.add('movie-title');
    title.textContent = `${box.title}`;
    average.classList.add('movie-average');
    average.textContent = `${box.vote_average}`;
    description.classList.add('movie-descr');
    description.textContent = `${box.overview}`;

    textBox.append(title, average,description);
    card.append(img, textBox);
    cardList.append(card);
  }

  getData(urlPopular);

  buttonSearch.addEventListener('click', function(e) {
    e.preventDefault();
    const urlSpring = `https://api.themoviedb.org/3/search/movie?query=${input.value}&api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
    cardList.innerText = '';
    if (input.value) {
      searchDescr.textContent = `"${input.value}" search results`;
    } else {
      searchDescr.textContent = '';
    }

    getData(urlSpring);
  })

  buttonDelete.addEventListener('click', () => {
    input.value = '';
    searchDescr.textContent = '';
  })

})();
