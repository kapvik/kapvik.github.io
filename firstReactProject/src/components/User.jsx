import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectedUser} from '../actions'



class User extends Component {

	onClickUser(id) {
		this.props.selectUser(id)
	}

	render() {
		const {
			users,
			filtredData,
			searchQuery
		} = this.props.usersData

		if (filtredData && searchQuery !== '') {
			return (
				<Item.Group link divided>
					{ filtredData.map( ( item, index ) => 
						item.length > 0 &&
							<Item key = { index } onClick = { (e) => this.onClickUser(index) }>
								<Item.Content verticalAlign='middle'>
									<Item.Description>{ item.join(', ') }</Item.Description>
								</Item.Content>
							</Item>
					)}
				</Item.Group>
			)
		} else {
			return (
				<Item.Group link divided>
					{ users.map( ( user, index ) => 
						<Item key ={ index } onClick = { (e) => this.onClickUser(index) } >
							<Item.Image src={ user.general.avatar } alt="Client's avatar"/>
							<Item.Content verticalAlign='middle'>
								<Item.Header as='a'>{ user.general.firstName } { user.general.lastName }</Item.Header>
							   	<Item.Description>{ user.job.title } - { user.job.company }</Item.Description>
							</Item.Content>
						</Item>
					)}
				</Item.Group>
			)
		}
	}
}

const mapStateToProps = state => ({
	usersData : state.usersData,
})

const mapDispatchToProps = dispatch => ({
	selectUser: (id) => (
		dispatch(selectedUser(id))
	)
})

export default connect(mapStateToProps, mapDispatchToProps)(User)