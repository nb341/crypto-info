import * as ActionTypes from './ActionTypes';

export const currencies = (state = { isLoading: true,
    errMess: null,
    currencies:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CURRENCIES:
            return {...state, isLoading: false, errMess: null, currencies: action.payload};

        case ActionTypes.CURRENCIES_LOADING:
            return {...state, isLoading: true, errMess: null, currencies: []}

        case ActionTypes.CURRENCIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};