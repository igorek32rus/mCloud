import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authReducer } from './authReducer'
import { notificationReducer } from './notificationReducer'
import { dirReducer } from './dirReducer'
import { copyPasteReducer } from './copyPasteReducer'
import { contextMenuReducer } from './contextMenuReducer'
import { selectionReducer } from './selectionReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
    dir: dirReducer,
    copyPaste: copyPasteReducer,
    contextMenu: contextMenuReducer,
    selection: selectionReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))