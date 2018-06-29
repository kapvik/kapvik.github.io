import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { userDataLoad } from './actions'
import UserList from './components/UserList'

class UserData extends Component {

	componentDidMount() {
		this.props.dataLoad()
	}

  	render() {
	    return (
	      <Container>
	        <Grid celled>
	          <UserList />
	        </Grid>
	      </Container>
	    )
  	}
}

const mapStateToProps = state => {
	return {
		usersData : state.usersData
	}
}

const mapDispatchToProps = dispatch => ({
	dataLoad: () => dispatch(userDataLoad())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserData)