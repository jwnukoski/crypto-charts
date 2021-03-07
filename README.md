# crypto-charts
A single-page app for viewing the historical price data for cryptocurrencies.  
![Preview of crypto-charts](https://github.com/jwnukoski/crypto-charts/blob/main/demo.gif?raw=true "crypto-charts Demo")

## API
This app uses https://docs.cryptowat.ch/rest-api/. It is free, however it has a limited amount of requests per day. This is why a server-side daily cache has been implemented. The larger a user base grows, the more this will need improved.  

Update:  
A MongoDB cache has been implemented for those that want to deploy this on a larger scale.  
The Heroku Demo will continue to use the NodeJS daily memory cache for now.  

## Documentation
There is currently jsdoc generated documentation available for the React client in the ./out folder.  

## Technologies
- React
	- Client
- Chart.js
	- For displaying crypto historical prices
- Express
	- Server
	- Compression npm package for making responses smaller
- TypeScript
	- Currently only used on the client side, mostly for prop checks.
- Jest & Enzyme
	- Unit/End-to-End testing
	- supertest included for HTTP assertion
- Travis-CI
	- Integration tests
- MongoDB
	- Implemented to use a space for cache to avoid consuming too much memory.
- Axios
	- Server and client side requests
- Bootstrap
	- Frontend styling
- eslint
	- Standard styling
- jsdoc
	- For documentation
	- better-docs for TypeScript doc compiling

## Endpoints
### GET: /api/pairinfo/:pair
Returns the pair name and symbol.  
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .pair

### GET: /api/markets/:currency
Returns the available markets for a given currency. USD is only supported at the moment.    
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .currency

### GET: /api/info/:market/:asset/:currency
Returns the price and historical (OHLC Candlesticks) for a given asset, so it can be graphed.      
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .market
- .asset
- .currency
