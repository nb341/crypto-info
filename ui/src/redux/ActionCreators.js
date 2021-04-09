
import * as ActionTypes from './ActionTypes';

const url = 'http://localhost:3001/api/v1/currencies';

export const addCurrencies = (currencies)=>({
    type: ActionTypes.ADD_CURRENCIES,
    payload: currencies
});

export const currenciesLoading = ()=>({
    type:ActionTypes.CURRENCIES_LOADING
})

export const currenciesFailed = (errMsg)=>({
    type: ActionTypes.CURRENCIES_FAILED,
    payload: errMsg
})

export const fetchCurrencies = ()=> dispatch =>{
    dispatch(currenciesLoading());
    return fetch(url)
        .then(res=>{
            if(res.ok) return res;
            else{
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                error.res = res;
                throw error;
            }
        },error=>{
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(res => res.json())
        .then(currencies => dispatch(addCurrencies(currencies)))
        .catch(error => dispatch(currenciesFailed(error.message)));
}

