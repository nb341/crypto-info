import React from 'react';
import Chart from './ChartComponent';
import {Link} from 'react-router-dom';


      
function CryptoContent(props){
    const {currencies} = props;
    console.log(currencies)
    return(
        <div>
            <table className="table ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col-1">Rank</th>
                        <th scope="col-1">Name</th>
                        <th scope="col-1">Current Value</th>
                        <th scope="col-1">Change %</th>
                        <th scope="col-1">Market Cap</th>
                        <th scope="col-1">Volume 24hr</th>
                        <th scope="col-1">Circulating Supply</th>
                        <th scope="col-4">Value to Date Graph</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currencies.currencies.map((cur, i)=>{
                       return(
                        
                           <tr>
                               <td>{cur.rank}</td>
                               <td>{cur.currency} <img height={40} width={40} src={cur.logo_url}/></td>
                               <td>$ {cur.price[cur.price.length-1].price}</td>
                               <td>{cur.dayChanges[cur.dayChanges.length-1].price_change_pct}</td>
                               <td>{cur.dayChanges[cur.dayChanges.length-1].volume}</td>
                               <td>{cur.price[cur.price.length-1].max_supply}</td>
                               <td>{cur.price[cur.price.length-1].circulating_supply}</td>
                               <td><Link to={`/coin/${cur.currency}`}><Chart size={{height: "200px", width: "200px"}} chartFor="table" priceData={cur.price}/></Link></td>
                           </tr>
                        
                       )
                    })
                }
                 {/* {currencies.currencies.map((x,i)=>{
                     return(
                        <tr key={i}>
                      
                        <td>{i}</td>
                        <td>{x.name}</td>
                        <td>{x.price}</td>
                        <td>{x.tw4h}</td>
                        <td>{x.week}</td>
                        <td>{x.m_cap}</td>
                        <td>{x.vol4hr}</td>
                        <td>{x.supply}</td>
                        <td style={{height: '100px', width: '150px'}}><Link to={`/coin/${i}`}><Chart options={options}/></Link></td>
                        <td><button className="btn btn-primary">Add</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                      </tr>
                     )
                 })} */}
                </tbody>
            </table>
 
        </div>
    )
}

export default CryptoContent;