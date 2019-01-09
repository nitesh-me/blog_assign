import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
const initalState = {}
const middlewre = [thunk]
const store = createStore(
    rootReducer, 
    initalState,
    compose (applyMiddleware(...middlewre),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
)

export default store;