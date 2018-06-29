import React, { Component } from 'react'
import { Item, Grid } from 'semantic-ui-react'

import SearchField from './SearchField'
import User from './User'
import UserProfile from './UserProfile'

class UserList extends Component {	

	render() {
		return(
			<Grid.Row>
				<Grid.Column width={6}>
					<SearchField />
		    		<User />
				</Grid.Column>
				<Grid.Column width={10}>
					<Item.Group>
						<UserProfile />	
					</Item.Group>	
				</Grid.Column>
			</Grid.Row>
		)
	}
}

export default UserList