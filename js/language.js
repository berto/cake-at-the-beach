const languageBox = $('.language')
const localStorageKey = 'language'
const defaultLanguage = 'english'
let activeLanguage = localStorage.getItem(localStorageKey)

const supportedLanguages = {
  english: {
    icon: '🇺🇸',
    cover: 'Cake at the Beach',
    pages: ['Page 1', 'Page 2', 'Page 3', 'Page 4'],
  },
  spanish: {
    icon: '🇪🇸',
    cover: 'Pastel en la Playa',
    pages: ['Página 1', 'Página 2', 'Página 3', 'Página 4'],
  },
  german: {
    icon: '🇩🇪',
    cover: 'Kuchen am Strand',
    pages: ['Seite 1', 'Seite 2', 'Seite 3', 'Seite 4'],
  },
}

const updateCover = (cover) => {
  $('.cover').html(cover)
}

const updatePages = (pages) => {
  $('.page-content').each(function (index) {
    $(this).html(pages[index])
  })
}

const updateBook = (info) => {
  updateCover(info.cover)
  updatePages(info.pages)
}

if (!supportedLanguages[activeLanguage]) {
  activeLanguage = defaultLanguage
  localStorage.setItem(localStorageKey, activeLanguage)
}
Object.keys(supportedLanguages).forEach((language) => {
  languageBox.append(
    `<button id="${language}" class="pure-button flag">${supportedLanguages[language].icon}</button>`
  )
})

updateBook(supportedLanguages[activeLanguage])

const languageButtons = $('.language button')
$(`#${activeLanguage}`).addClass('active')
languageButtons.click((event) => {
  $('.language button').removeClass('active')
  $(event.target).addClass('active')
  const selectedLanguage = event.target.id
  localStorage.setItem(localStorageKey, selectedLanguage)
  updateCover(supportedLanguages[selectedLanguage].cover)
  updatePages(supportedLanguages[selectedLanguage].pages)
})
