
//for refactoring code later

            const currencyExist = async (currency)=>{
                try{
                    return await Currency.findOne(currency);
                }
                catch(err){
                    console.log(err)
                }
            }

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
                ]
            });

            
            curr.save().then((res)=>console.log(res))


            