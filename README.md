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

## Endpoints
### /api/pairinfo/:pair
Returns the pair name and symbol.  
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .pair

### /api/markets/:currency
Returns the available markets for a given currency. USD is only supported at the moment.    
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .currency

### /api/info/:market/:asset/:currency
Returns the price and historical (OHLC Candlesticks) for a given asset, so it can be graphed.      
If a request has been made for the same day, then cached data will be sent back. 

#### Params:  
- .market
- .asset
- .currency

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
