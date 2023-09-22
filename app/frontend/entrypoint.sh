#!/bin/bash
cd /usr/app/frontend && npm i && npm run build

pm2 start server/server.js

# Keep Docker from exiting
tail -f /dev/null