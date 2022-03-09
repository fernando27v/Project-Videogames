import {createStore , applyMiddleware} from 'redux'
import React from 'react'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducer'



const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store