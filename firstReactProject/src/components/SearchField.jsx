import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { searchingData } from '../actions'

class SearchField extends Component {
	
	onInputChange (query) {
		let searchQuery = query.target.value
		this.props.search(searchQuery)
	}

	render() {
		return (
			<Input
				fluid icon  = 'search'
				placeholder = 'Search...'
				onChange    = { (e) => this.onInputChange(e) }
			/>
		)
	}
}

const mapStateToProps = state => ({
	filtredData : state.usersData.filtredData
})

const mapDispatchToProps = dispatch => ({
	search: (query) => (
		dispatch(searchingData(query))
	)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchField)