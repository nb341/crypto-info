
const mongoose = require('mongoose');


const currencySchema = mongoose.Schema({
    currency: String,
    symbol: String,
    status: String,
    logo_url: String,
    rank: Number,
    price:[
        {
            price: Number,
            price_timestamp: String,
            max_supply: Number,
            circulating_supply: Number,
            market_cap: Number
            
        }
    ],
    dayChanges:[
        {
            volume: Number,
            price_change: Number,
            price_change_pct: Number,
            volume_change: Number,
            volume_change_pct: Number,
            market_cap_change: Number,
            market_cap_change_pct: Number
        }
    ]
});

exports.Currency = mongoose.model("Currency", currencySchema);