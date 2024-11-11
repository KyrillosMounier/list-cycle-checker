
# List of cycle checker - NestJS Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)


---

## Features
- **RESTful API** for processing and checking lists of prefect cycles.
- **Microservices** integration with RabbitMQ for asynchronous message handling (optional).
- **Swagger Documentation** for automatic API endpoint documentation and interactive testing.
- **Validation and Exception Handling** based on Data Transfer Objects (DTOs) to ensure data integrity and proper error handling.
- **Unit and End-to-End (E2E) Testing** using Jest to ensure code reliability and coverage.
- **Environment-based Configurations** for flexible deployments in different environments (development, production, etc.).

## Tech Stack
- **Node.js** – JavaScript runtime for building scalable network applications.
- **NestJS** – Framework for building efficient, scalable Node.js applications with a focus on maintainability.
- **Swagger** – Tool for API documentation and testing.
- **RabbitMQ** – (Optional) Messaging system for decoupling services in a microservices architecture.
- **Jest** – Testing framework used for unit and integration tests.


## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KyrillosMounier/list-cycle-checker.git
   cd your-repo-name
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Setup Environment Variables**:
 review .env file

## Configuration
The application uses environment variables for configuration. Here are some of the key variables in `.env`:

```plaintext
# Server settings
PORT=3010
NODE_ENV=development
JSON_LENGTH_THRESHOLD=10
RMQ_URL="amqp://localhost:5672"
QUEUE_NAME="prefect_cycle"
```

## Running the Application
### Development
To run the application in development mode:

```bash
yarn run start:dev
```

### Production
Build and run the application in production mode:

```bash
yarn run build
yarn run start:prod
```

### Consumer App
If you need to test RabbitMQ messaging (asynchronous processing), you can start the consumer application separately:

```bash
yarn run consumer
```

## API Documentation
API documentation is available through Swagger. Once the application is running, access the documentation at:

```
http://localhost:3010/api-docs
```

## Testing
The application includes both unit and end-to-end (E2E) tests. Jest is used as the testing framework.

- **Run Unit Tests**:
  ```bash
  npm run test
  ```

- **Run E2E Tests**:
  ```bash
  npm run test:e2e
  ```

- **Test Coverage**:
  ```bash
  npm run test:cov
  ```


## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a Pull Request.
