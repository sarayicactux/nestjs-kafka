#!/bin/bash

docker-compose -f kafka.yml up -d
sleep 10
cd service2
yarn install  
yarn start:dev &  
sleep 40
cd ..

cd service1
yarn install
yarn start:dev &
sleep 40
cd ..

cd client
yarn install
yarn start:dev &