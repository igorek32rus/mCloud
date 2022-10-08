import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './authReducer'
import { notificationReducer } from './notificationReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))