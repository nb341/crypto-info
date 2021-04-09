import React, { useEffect } from 'react';

import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Navbar from './NavbarComponent';
import CryptoContent from './CryptocontentComponent';
import CoinInfo from './CoininfoComponent';
import Login from './LoginComponent';
import {connect} from 'react-redux';
import {fetchCurrencies} from '../redux/ActionCreators';


const mapStateToProps = state=>{
    return {
        currencies: state.currencies
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchCurrencies: ()=> {dispatch(fetchCurrencies())}
    }
}



class Main extends React.Component{

    componentDidMount(){
        this.props.fetchCurrencies()
    }
    render(){
        const CoinInfoWithId = ({match})=>{
            return(
                <CoinInfo test={match.params.id} currency={this.props.currencies.currencies.filter(x=>x.currency===match.params.id)}/>
            )
        }
        return(
        <div>
            <Navbar/>
            <div className="p-5">
            <Switch>
                <Route exact path="/" component={()=> <CryptoContent currencies={this.props.currencies}/>}/>
                <Route exact path="/home" component={()=> <CryptoContent currencies={this.props.currencies}/>}/>
                <Route path="/coin/:id" component={CoinInfoWithId}/>
                <Route exact path="/login" component={Login}/>
                <Redirect to="/home"/>
            </Switch>
            </div>
        </div>
        )
    }
}




// function Main(props){
//     useEffect(()=>{
//         props.fetchCurrencies();
//     },[]);


//     return(
//         <div>
//             <Navbar/>
//             <div className="p-5">
//             <Switch>
//                 <Route exact path="/" component={()=> <CryptoContent currencies={props.currencies}/>}/>
//                 <Route exact path="/home" component={()=> <CryptoContent currencies={props.currencies}/>}/>
//                 <Route path="/coin/:id" render={({match, currencies})=>{
//                     alert(currencies.currency)
//                     return <CoinInfo currencies={currencies.currencies.filter(x=>x.currency==match.id)}/>
//                 }}/>
//                 <Route exact path="/login" component={Login}/>
//                 <Redirect to="/home"/>
//             </Switch>
//             </div>
//         </div>
//     )
// }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));