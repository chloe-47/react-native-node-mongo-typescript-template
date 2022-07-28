#!/bin/bash

yarn install
  
DEBUG=server \
HOT_RELOAD=True \
MONGODB_DB_NAME=devdb \
nodemon --config nodemon.json src/server/root/runserver.ts