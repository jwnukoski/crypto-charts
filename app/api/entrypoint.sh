#!/bin/bash
cd /usr/app/api && npm i && npm run server

# pm2 start src/server.js

# Keep Docker from exiting
tail -f /dev/null