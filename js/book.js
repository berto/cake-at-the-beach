const flipbook = $('#flipbook')
const body = $('body')
const book = $('.book')
const pageCountDisplay = $('.page-count')
const previousButton = $('.turn-page.previous')
const nextButton = $('.turn-page.next')
const minWidth = 1440
const sizePercent = 0.7
const languageBox = $('.language')
const localStorageKey = 'language'
const defaultLanguage = 'english'
const supportedLanguages = {
  english: {
    icon: 'united_states',
    cover: 'Cake at the Beach',
    control: ['Page', 'of'],
    pages: ['Page 1', 'Page 2', 'Page 3', 'cake at the beach'],
  },
  spanish: {
    icon: 'spain',
    cover: 'Pastel en la Playa',
    control: ['Página', 'de'],
    pages: ['Página 1', 'Página 2', 'Página 3', 'pastel en la playa'],
  },
  german: {
    icon: 'germany',
    cover: 'Kuchen am Strand',
    control: ['Seite', 'von'],
    pages: ['Seite 1', 'Seite 2', 'Seite 3', 'Kuchen am Strand'],
  },
}

let activeLanguage = localStorage.getItem(localStorageKey)
let config = {
  acceleration: true,
  width: window.innerWidth * sizePercent,
  height: window.innerHeight * sizePercent,
  display: 'double',
}

const resize = () => {
  let width = window.innerWidth * sizePercent
  let height = window.innerHeight * sizePercent
  let display = 'double'
  if (window.innerWidth < minWidth) {
    width = window.innerWidth * 0.9
    height = window.innerHeight * 0.8
    display = 'single'
  }
  flipbook.turn('size', width, height)
  flipbook.turn('display', display)
}

;(function init() {
  if (window.innerWidth < minWidth) {
    config = {
      ...config,
      display: 'single',
    }
    $('.backside').remove()
  }

  if (!supportedLanguages[activeLanguage]) {
    activeLanguage = defaultLanguage
    localStorage.setItem(localStorageKey, activeLanguage)
  }

  Object.keys(supportedLanguages).forEach((language) => {
    languageBox.append(
      `<img 
          id="${language}" 
          class="flag" 
          src="./assets/icons/${supportedLanguages[language].icon}.png" 
          alt="${supportedLanguages[language].icon}"
      />`
    )
  })

  window.onresize = resize
  flipbook.turn(config)
})()

const getInfo = () => {
  let activeLanguage = localStorage.getItem(localStorageKey)
  return supportedLanguages[activeLanguage]
}

const totalPages = flipbook.turn('pages')

const setPageNumber = (page, control) => {
  previousButton.prop('disabled', page === 1)
  nextButton.prop('disabled', page === totalPages)
  pageCountDisplay.text(`${control[0]} ${page} ${control[1]} ${totalPages}`)
}

setPageNumber(1, supportedLanguages[activeLanguage].control)
flipbook.bind('turning', function (event, page, pageObject) {
  if (page === 1) {
    updateCover(getInfo().cover)
  }
  setPageNumber(page, getInfo().control)
})

$('.turn-page.next').click(() => {
  flipbook.turn('next')
})
$('.turn-page.previous').click(() => {
  flipbook.turn('previous')
})

const updateCover = (cover) => {
  $('.cover .content .title').html(cover)
}

const updatePages = (pages) => {
  $('.page-content .title').each(function (index) {
    $(this).html(pages[index])
  })
}

updateCover(supportedLanguages[activeLanguage].cover)
updatePages(supportedLanguages[activeLanguage].pages)

const languageButtons = $('.language img')
$(`#${activeLanguage}`).addClass('active')
languageButtons.click((event) => {
  $('.language img').removeClass('active')
  $(event.target).addClass('active')
  const selectedLanguage = event.target.id
  localStorage.setItem(localStorageKey, selectedLanguage)
  updateCover(supportedLanguages[selectedLanguage].cover)
  updatePages(supportedLanguages[selectedLanguage].pages)
  setPageNumber(flipbook.turn('page'), supportedLanguages[selectedLanguage].control)
})
