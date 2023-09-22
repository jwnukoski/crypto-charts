#!/bin/bash
cd /usr/app/api && npm i

pm2 start src/server.js

# Keep Docker from exiting
tail -f /dev/null