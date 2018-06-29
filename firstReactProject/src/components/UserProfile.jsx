import React, { Component } from 'react'
import { Item, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

class UserProfile extends Component {
	
	render() {
		if(Object.keys(this.props.userProfile).length > 0) {
			const userProfile = this.props.userProfile
			return  (
				<Item >
					<Item.Image floated='left' size={'medium'}  src={userProfile.general.avatar} alt="Client's photo"/>
					<Item.Content verticalAlign='middle'>
						<Item.Header as='a'>{userProfile.general.firstName} {userProfile.general.lastName}</Item.Header>
			       		<Item.Description>
			       			<p>{userProfile.job.title} - {userProfile.job.company}</p>
			       			<p>email: {userProfile.contact.email}</p>
			       			<p>phone: {userProfile.contact.phone}</p>
			       			<p>Adress: </p>
			       			<address>
				   				{userProfile.address.street} <br />
				   				{userProfile.address.city}, {userProfile.address.zipCode} <br />
				   				{userProfile.address.country} <br />
				   			</address>
				   		</Item.Description>
					</Item.Content>
				</Item>
			)
		} else {
			return (
				<Item>
					<Header as='h2' textAlign='center'>Select an user for more information.</Header>
				</Item>			
			)
		}
	}
}

const mapStateToProps = state => ({
	userProfile: state.usersData.currentUserProfile
})

export default connect(mapStateToProps)(UserProfile)