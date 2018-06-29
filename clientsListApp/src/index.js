import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import UserData from './UserData'
import 'semantic-ui-css/semantic.min.css'

import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<UserData />
	</Provider>, 
	document.getElementById('root'));

