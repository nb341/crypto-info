

// require('axios')
//   .get("https://api.nomics.com/v1/currencies/ticker?key=a7ee1b7d885bfca4d338c1f0bec70178&ids=BTC,ETH,XRP&interval=1d,7d,30d&convert=USD&per-page=100&page=1")
//   .then(response => console.log(response.data))
const http = require('http');
const request = require('request');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Currency = require('./app/model').Currency;
require('dotenv/config');

app.use(morgan('tiny'));

app.use(cors());
app.options('*', cors());

const apiRoutes = require('./app/routes');

const API = process.env.API_URL;

app.use(`${API}/currencies`, apiRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

const currencyExist = async (currency)=>{
    try{
        return await Currency.findOne(currency);
    }
    catch(err){
        console.log(err)
    }
}



var requestLoop = setInterval(function(){
    request({
        url: `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&ids=BTC,ETH,XRP&interval=1d,7d,30d&convert=USD&per-page=100&page=1`,
        method: "GET",
        followRedirect: true,
        maxRedirects: 10
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            const result = JSON.parse(body);
            console.log(result);
        for(let i=0; i<result.length; i++){   
            let data = result[i];
            // setTimeout(currencyExist({"currency": data.currency}), 1000)

              
             currencyExist({"currency": data.currency}).
             then(response=> {
                 //checks if null
                if(!response){
                   let curr = new Currency({
                       currency: data.currency,
                       symbol: data.symbol,
                       logo_url: data.logo_url,
                       status: data.status,
                       rank: data.rank,
                       price: [
                           {
                               price: data.price,
                               price_timestamp: data.price_timestamp,
                               max_supply: data.max_supply,
                               circulating_supply: data.circulating_supply,
                               market_cap: data.market_cap
                           }
                       ],
                       dayChanges: [{
                            volume: data['1d'].volume,
                            price_change: data['1d'].price_change,
                            price_change_pct: data['1d'].price_change_pct,
                            volume_change: data['1d'].volume_change,
                            volume_change_pct: data['1d'].volume_change_pct,
                            market_cap_change: data['1d'].market_cap_change,
                            market_cap_change_pct: data['1d'].market_cap_change_pct
                       }]
                   });

                   
                   curr.save().then((res)=>console.log(res))
                }else{
                    const updatedCoinVal = {
                        price: data.price,
                        price_timestamp: data.price_timestamp,
                        max_supply: data.max_supply,
                        circulating_supply: data.circulating_supply,
                        market_cap: data.market_cap
                    }
                    const dailyChanges = {
                        volume: data['1d'].volume,
                        price_change: data['1d'].price_change,
                        price_change_pct: data['1d'].price_change_pct,
                        volume_change: data['1d'].volume_change,
                        volume_change_pct: data['1d'].volume_change_pct,
                        market_cap_change: data['1d'].market_cap_change,
                        market_cap_change_pct: data['1d'].market_cap_change_pct
                    }
                    const filter = { currency: data.currency };
                    Currency.findOneAndUpdate(filter, {$push: {price: updatedCoinVal, dayChanges: dailyChanges}}, {
                        new: true
                    }).then(res=>console.log(res));
         
                }
             });
        }
        }else{
            console.log('error in response');
        }
    });
  }, 1000*60);
  

//Server
app.listen(3001, ()=>{
    console.log('server is running http://localhost:3001');
})

