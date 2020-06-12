const flipbook = $('#flipbook')
const body = $('body')
const book = $('.book')
const pageCountDisplay = $('.page-count')
const previousButton = $('.turn-page.previous')
const nextButton = $('.turn-page.next')
const minWidth = 1440
const sizePercent = 0.8
let config = {
  acceleration: true,
  width: window.innerWidth * sizePercent,
  height: window.innerHeight * sizePercent,
  display: 'double',
}

if (window.innerWidth < minWidth) {
  config = {
    ...config,
    display: 'single',
  }
  $('.backside').remove()
}

const resize = () => {
  flipbook.turn('size', window.innerWidth * sizePercent, window.innerHeight * sizePercent)
  let display = 'double'
  if (window.innerWidth < minWidth) {
    display = 'single'
  }
  flipbook.turn('display', display)
}

window.onresize = resize
flipbook.turn(config)

const totalPages = flipbook.turn('pages')

const setPageNumber = (page) => {
  previousButton.prop('disabled', page === 1)
  nextButton.prop('disabled', page === totalPages)
  pageCountDisplay.text(`Page ${page} of ${totalPages}`)
}

setPageNumber(1)
flipbook.bind('turning', function (event, page, pageObject) {
  setPageNumber(page)
})

$('.turn-page.next').click(() => {
  flipbook.turn('next')
})
$('.turn-page.previous').click(() => {
  flipbook.turn('previous')
})

// language
const languageBox = $('.language')
const localStorageKey = 'language'
const defaultLanguage = 'english'
let activeLanguage = localStorage.getItem(localStorageKey)
const supportedLanguages = {
  english: '🇺🇸',
  spanish: '🇪🇸',
  german: '🇩🇪',
}
if (!supportedLanguages[activeLanguage]) {
  activeLanguage = defaultLanguage
  localStorage.setItem(localStorageKey, activeLanguage)
}
Object.keys(supportedLanguages).forEach((language) => {
  languageBox.append(
    `<button id="${language}" class="pure-button flag">${supportedLanguages[language]}</button>`
  )
})
const languageButtons = $('.language button')
$(`#${activeLanguage}`).addClass('active')
languageButtons.click((event) => {
  $('.language button').removeClass('active')
  $(event.target).addClass('active')
  const selectedLanguage = event.target.id
  localStorage.setItem(localStorageKey, selectedLanguage)
})
