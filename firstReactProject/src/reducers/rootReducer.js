import { combineReducers } from 'redux'
import { RECEIVE_USERS, SELECT_USER, SEARCH_DATA } from '../actions/action-types'

function usersData(
	state = {
		users: [],
		currentUser: null,
		currentUserProfile: []
	},
	action
) {
	switch (action.type) {
		case RECEIVE_USERS:
			return Object.assign({}, state, {users: action.users })
		case SELECT_USER:
			return Object.assign({}, state, {
				currentUser        : action.userId,
				currentUserProfile : state.users[action.userId]
			})
		case SEARCH_DATA:
			return Object.assign({}, state, {
				searchQuery : action.searchQuery,
				filtredData : filteringData(state.users, action.searchQuery)
			})
		default:
			return state
	}
}

function filteringData (arrayOfData, queryToFind) {

	const arr = arrayOfData.map(

		// Extract only values all keys
		item => Object.values(item)

		// Concat all subarrays into one array

		.reduce((a, b) => Object.values(a).concat(Object.values(b))))

	// Delete general.avatar info
	arr.map( item => item.splice( 2, 1 ) )

	// Search through all data 
	const filtredData = arr.map( item => item.filter( i => i.toLowerCase().includes(queryToFind.toLowerCase())))

	return filtredData
}

const rootReducer = combineReducers({
	usersData,
})

export default rootReducer