import { RECEIVE_USERS, SELECT_USER, SEARCH_DATA } from './action-types'

export const receiveUsers = users =>({ 
	type: RECEIVE_USERS, 
	users
})

export const selectUser = userId => ({
    type: SELECT_USER,
    userId
})

export const searchData = searchQuery => ({
    type: SEARCH_DATA,
    searchQuery
})

function xhr(callback) {
	const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText)
        }
    }
    xhr.open('GET', 'clients.json', true)
    xhr.send()
}

export function userDataLoad() {
	return dispatch => {
		return xhr((response) => dispatch(receiveUsers(JSON.parse(response))))
	}
}

export function selectedUser(userId) {
    return dispatch => dispatch(selectUser(userId))
}

export function searchingData(query) {
    return dispatch => dispatch(searchData(query))
}