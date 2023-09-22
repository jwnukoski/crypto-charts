#!/bin/bash
cd /usr/app/api && npm i && npm run server

# Keep Docker from exiting
# tail -f /dev/null