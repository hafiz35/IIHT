## Stock Market Charting Application
### This application has been built using Spring Boot and Angular and has been divided into microservices

## Database
    - Mysql Database has been used here to store all the data.

## Microservices - Mid Tier
    1. User Authentication Service - This service manages the Users and is also responsible for managing the routing as Zuul is implemented here.
    2. Excel Service - This service manages Excel file upload and download
    3. Company Service - This service manages all the details of company, stock exchanges, stock prices and IPO.

## Frontend
    -   The Frontend has been built using Angular framework and bootstrap is used for styling.

*   Note - Docker is not being able to run due to several issues so installation needs to be done manually
 

## Installing and Running the application
    - Run the stock-market-charting.sql file in your mysql to import all the data. This will import all the necessary data required to run the application
    - MySQL user is "root" and password is "password-1"
    - Run each microservice separately in STS
    - Run an ```npm install``` in the terminal within "webapp" folder.
    - Run the Angular application using ```ng serve```. The angular app will be running in http://localhost:4200
    - The administrator username for the application is "admin" and password is "password" without quotes. This can be used to login.
    