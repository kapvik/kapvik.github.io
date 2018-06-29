import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'

const loggerMidddleware = createLogger()

export default function configureStore() {
	return createStore(
		rootReducer,
		applyMiddleware(
			thunkMiddleware,
			loggerMidddleware
		)
	)
}
