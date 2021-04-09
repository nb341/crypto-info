import React from 'react';
import {useParams} from 'react-router-dom';
import Chart from './ChartComponent';
function CoinInfo(props){
    
    //  const {id} = useParams();
    //   alert(props.currency.rank)
    return(
        <div className="container">
           <Chart chartFor="CoinInfo" priceData={props.currency.price}/>
        </div>
    )
}


export default CoinInfo;