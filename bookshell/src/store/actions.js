import * as types from './mutation-types'

export const initBooks = ({commit}) => {
  
  let searchBook = document.getElementById('search').value,
	  URL        = "https://www.googleapis.com/books/" + "v1/volumes?q=" + searchBook;
  fetch(URL, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(({items}) => commit(types.INIT_BOOKS, items))
}

export const addOrder = ({commit}, ...form) => {
	commit(types.ADD_ORDERS, ...form)
}
