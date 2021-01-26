# crypto-charts
A single-page app for viewing the historical price data for cryptocurrencies.

## API
This app uses https://docs.cryptowat.ch/rest-api/. It is free, however it has a limited amount of requests per day. This is why a server-side daily cache has been implemented. The larger a user base grows, the more this will need improved.

## Documentation
There is currently jsdoc generated documentation available for the React client in the ./out folder.

## Technologies
- React
	- Client
- Express
	- Server
	- Compression npm package for making responses smaller
- Axios
	- Server and client side requests
- Bootstrap
	- Frontend styling
- eslint
	- Standard styling
- jsdoc
	- For documentation

## TODO
- Loading screen for users. Especially during a uncached response.

## Endpoints
### /api/graph/:coin/history/:time

### /api/pairinfo/:pair

### /api/markets/:currency

### /api/info/:market/:asset/:currency