import React from 'react';
import {useParams} from 'react-router-dom';
import Chart from './ChartComponent';
function CoinInfo(props){
    
    //  const {id} = useParams();
    //   alert(props.currency.rank)
    // alert(props.currency.price)
    return(
        <div className="container">
            {props.currency.status}
           <Chart chartFor="CoinInfo" priceData={props.currency}/>
        </div>
    )
}


export default CoinInfo;