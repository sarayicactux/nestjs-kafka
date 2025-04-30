NestJS Microservices with Kafka Sample Project
Project Overview
This is a sample project designed to explore and demonstrate the implementation of microservices in NestJS using Kafka as the message broker. The project includes a REST API that handles user management operations, such as registration, login, and retrieving user information. The services are containerized using Docker, making it easy to set up and run the application in a consistent environment. This project serves as a learning tool for understanding microservices architecture, asynchronous communication with Kafka, and containerization.

Technologies Used
NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
Kafka: A distributed streaming platform used as the message broker for inter-service communication.
Zookeeper: A centralized service for managing configuration and coordination, required by Kafka.
Docker: A platform for containerizing the application and its dependencies.
Kafka-UI: A web-based tool for monitoring Kafka topics and messages, running on port 3280.
Architecture
The project consists of multiple microservices that communicate asynchronously via Kafka:

API Gateway: A NestJS service that exposes a REST API on port 3000. It handles incoming HTTP requests (e.g., user registration, login, and information retrieval) and communicates with other microservices by publishing and subscribing to Kafka topics.
User Service: A NestJS microservice responsible for managing user data, such as registration and information retrieval.
Auth Service: A NestJS microservice that handles user authentication and generates JWT tokens for secure access.
Each service runs in its own Docker container, and Kafka facilitates the communication between them. For example:

A POST /register request to the API Gateway triggers a message to the User Service via Kafka.
A POST /login request results in the Auth Service generating a JWT token, which is returned to the client.
A GET /user request uses the JWT token (passed in the request header) to fetch user details through the User Service.
This modular architecture showcases how microservices can be decoupled and scaled independently while relying on Kafka for reliable messaging.

Prerequisites
To run this project, ensure you have the following installed:

Docker: Required to run the containerized services (Kafka, Zookeeper, Kafka-UI, and NestJS microservices). Install it from Docker's official site.
Git: Needed to clone the repository.
Note: Node.js and npm are not required to run the project since everything is containerized, but they are useful if you want to modify or develop the code locally.

Setup Instructions
Follow these steps to set up and run the project on your machine:

Clone the Repository
Clone the project from GitHub and navigate into the directory:

bash
git clone https://github.com/sarayicactux/nestjs-kafka.git
cd nestjs-kafka
Start the Infrastructure
The project includes a kafka.yml file to set up Kafka, Zookeeper, and Kafka-UI. Run the following command to start these services in the background:

bash
docker-compose -f kafka.yml up -d


This will:

Launch Kafka and Zookeeper for messaging.
Start Kafka-UI, accessible at http://localhost:3280.
Start the NestJS Microservices
The project provides a docker-compose.yml file to build and run the NestJS services (API Gateway, User Service, and Auth Service). Use this command to start them:
you can use the provided convenience scripts:

On Windows: Run the start.bat file by double-clicking it or executing:

start.bat

On Unix-based systems (Linux/Mac): Run the start.sh script:
chmod +x start.sh  # Make the script executable (if needed)
./start.sh
These scripts likely execute the above docker-compose commands for you.

Verify the Application

The REST API will be available at http://localhost:3000/api/#/.
Kafka-UI will be accessible at http://localhost:3280 for monitoring Kafka.
API Documentation
The REST API is served by the API Gateway on port 3000 and is documented using NestJS's built-in Swagger interface. After starting the application, access the API documentation at:

http://localhost:3000/api/#/
Available Endpoints
POST /user/register
Description: Registers a new user.
Request Body: JSON object with user details (e.g., { "username": "john", "password": "pass123" }).
Response: Success message or error.
POST /user/login
Description: Authenticates a user and returns a JWT token.
Request Body: JSON object with credentials (e.g., { "username": "john", "password": "pass123" }).
Response: JWT token (e.g., { "token": "jwt-token-here" }).
GET /user
Description: Retrieves user information.
Request Header: <jwt-token>.
Response: User details (e.g., { "username": "john", "id": 1 }).
Monitoring
Kafka-UI provides a web interface to monitor Kafka topics, messages, and consumer groups. Once the infrastructure is running, access it at:

http://localhost:3280
Use this tool to inspect the messages flowing between the microservices and ensure Kafka is functioning correctly.

Troubleshooting
Here are some common issues and their solutions:

Services Fail to Start: Ensure Docker is running and no other processes are using ports 3000 (API Gateway) or 3280 (Kafka-UI). Check Docker logs with:
bash
docker-compose logs
Kafka Connection Issues: Verify that Kafka and Zookeeper containers are running before starting the NestJS services. Restart the infrastructure if needed:
bash
docker-compose -f kafka.yml restart
API Not Responding: Confirm that all services (API Gateway, User Service, Auth Service) are up by checking their logs:
bash
docker-compose -f docker-compose.yml logs
Stopping the Application
To stop the application and clean up the containers:

Stop the NestJS services:
bash
docker-compose -f docker-compose.yml down
Stop the infrastructure (Kafka, Zookeeper, Kafka-UI):
bash
docker-compose -f kafka.yml down
This will stop and remove the containers, but the Docker images will remain on your system for future use.

Contributing
Contributions are welcome! If you'd like to improve this project:

Fork the repository.
Create a new branch for your changes.
Submit a pull request with a clear description of your updates.
License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.

Key Concepts Demonstrated
This project highlights several important concepts:

Microservices in NestJS: Building modular, independent services with NestJS.
Kafka Integration: Using Kafka as a message broker for asynchronous communication.
JWT Authentication: Implementing secure user authentication with JSON Web Tokens.
Docker Containerization: Running a multi-service application in isolated containers.
Monitoring with Kafka-UI: Visualizing Kafka activity through a user-friendly interface.