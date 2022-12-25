import { DOCUMENTATION } from './constants'
import './style.css'

const favoritesListElement = document.querySelector('#menu-content > .favorites')
const inputSearch = document.querySelector('#menu-search')
const searchBlockElement = document.querySelector('#menu-content > .search')
const toggleButton = document.querySelector('.menu-toggle')
const menuContentElement = document.querySelector('#menu-content')

const getDocumentationTeamplate = (title, url) => {
return `
<li class="favorite-element">
<a href="${url}" target="__blank">${title}</a>
</li>
`
}

const generateList = (listId, elements) => {
  const ulElement = document.createElement('ul')
ulElement.id = listId;
  elements.forEach((element) => {
    const docTemplate = getDocumentationTeamplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  })
return ulElement
}

const setUpFavoritesList = () => {
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUl = generateList('favorites-list', favorites)
  favoritesListElement.append(favoritesUl)
}

const normalizeText = text => text.trim().toUpperCase()

const handleSearch = (event) => {
const { value } = event.target
const normalizeValue = normalizeText(value)

const filteredDocumentation = DOCUMENTATION.filter(doc => {
  const normalizedTitle = normalizeText(doc.title)
  return normalizedTitle.includes(normalizeValue)
})

const searchUl = generateList('search-list', filteredDocumentation)

const previousUl = document.querySelector('#search-list')
if (previousUl) {
  previousUl.remove()
}

searchBlockElement.append(searchUl)

}

const handleMenu = () => {
  menuContentElement.classList.toggle('menu-content--open')
}

inputSearch.addEventListener('input', handleSearch)
toggleButton.addEventListener('click', handleMenu)

setUpFavoritesList()