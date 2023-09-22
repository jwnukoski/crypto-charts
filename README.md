# crypto-charts
A single-page app for viewing the historical price data for cryptocurrencies.  
![Preview of crypto-charts](https://github.com/jwnukoski/crypto-charts/blob/main/demo.gif?raw=true "crypto-charts Demo")

## API
This app uses https://docs.cryptowat.ch/rest-api/. It is free, however it has a limited amount of requests per day. This is why a server-side daily cache has been implemented. The larger a user base grows, the more this will need improved.  


## Setup
After spinning up the Docker containers, enter bash in the mongo container and create your user like so:
```bash
mongosh -u root -p root
use crypto-charts
db.createUser({ user: "cache", pwd: "cache", roles: [ { role: "dbOwner", db: "crypto-charts"} ] } )
```
Make sure to use your own accounts and passwords, as well as update them in the .env to match.