import {currencies} from './reducer';
import {combineReducers, applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const configureStore = () =>{
    const store = createStore(
        combineReducers({
            currencies:currencies
        }
        ),
        applyMiddleware(thunk, logger)
    );
    return store;
}

