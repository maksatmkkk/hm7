class App {
    constructor () {
      this.url = 'https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json' // api url
      this.movies = [] // массив для фильмов
      this.page = 0 // текущая страница
      this.limit = 20 // количество фильмов на странице
  
      this.elements = {
        list: document.getElementById('list'),
        pageNumber: document.getElementById('page_number'),
        prevButton: document.getElementById('prev'),
        nextButton: document.getElementById('next')
      }
    }
  
    // Внутренняя функция инициализации
    async init () {
      APP.movies = await fetch(APP.url)
        .then(res => res.json())
        .catch(() => [])
      console.log('Запросили один раз весь список фильмов, сохранили.')
  
      // Показываем первую страницу
      APP.showMovies()
      // Регистрируем клики по кнопкам навигации
      this._resisterListeners()
    }
  
    // Главная фукнция, отображает фильмы постранично
    showMovies (dir = 'next') {
      dir === 'next' ? APP.page++ : APP.page--
      APP.elements.list.innerHTML = ''
      APP.elements.pageNumber.textContent = APP.page
      const items = APP.movies.filter((i, j) => (j >= APP.limit * (APP.page - 1)) && (j < APP.limit * APP.page))
      console.log('Показываем страницу:', APP.page, ', элементы:', APP.limit * (APP.page - 1), APP.limit * APP.page)
      items.forEach(item => {
        const el = APP._createElement('div', 'movie')
        el.innerHTML = `<div class="title">${item.Title} (${item.IMDB_Rating})</div>`
        APP.elements.list.appendChild(el)
      })
    }
  
    // Вспомогательная функция по созданию элементов
    _createElement (tagName = 'div', className = 'movie') {
      const el = document.createElement(tagName)
      el.classList.add(className)
      return el
    }
  
    // Регистрация кликов по кнопкам
    _resisterListeners () {
      APP.elements.prevButton.addEventListener('click', () => {
        APP.showMovies('prev')
      })
      APP.elements.nextButton.addEventListener('click', () => {
        APP.showMovies('next')
      })
    }
  }
  
  // Инициализация кода по готовности страницы
  document.addEventListener("DOMContentLoaded", () => {
    console.log('Инициализация APP')
    window.APP = new App()
    APP.init()
  })