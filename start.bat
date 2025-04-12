@echo off

docker-compose -f kafka.yml up -d
timeout /t 10
cd service2
call yarn install  
start cmd /k yarn start:dev  
timeout /t 40

cd ..
cd service1
call yarn install
start cmd /k yarn start:dev
timeout /t 40

cd ..
cd client
call yarn install
start cmd /k yarn start:dev
cd ..