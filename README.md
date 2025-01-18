# Appointment Scheduling CRUD

This project provides a serverless CRUD application for managing appointment scheduling. It includes features like request validation, CI/CD pipelines, local testing with LocalStack, and comprehensive testing strategies.

## Features

- Serverless Architecture: Built using the Serverless Framework for efficient resource management.

- Request Validation: Implements AWS Powertools Lambda Parser with Zod for robust request validation.

- Middleware: Utilizes Middy.js for streamlined middleware management.

- CI/CD with github actions: Automated deployments to sandbox and production environments, including all required resources.

- Testing: Includes both unit tests and integration tests leveraging LocalStack for DynamoDB.

- Local Development: Run and test the application locally using Docker and Makefile commands.

- Esbuild: Utilized as the bundler for efficient and fast Lambda function packaging, ensuring optimized deployment artifacts. This improves deployment performance by reducing package size and build times significantly, making the application ready for production environments with minimal overhead.

## Prerequisites

- Docker Compose: Required for running LocalStack locally.

- Node.js 20: Ensure you have Node.js 20 installed.

- AWS Account: Necessary for deploying to AWS. Set the required environment variables for AWS credentials before deployment.

## Installation and Setup

Clone the Repository:

```bash
  git clone <repository-url>
  cd <repository-name>
```

Install Dependencies:
```bash
  yarn install
```

Set Up LocalStack (Optional):

```bash
  docker-compose up -d
  yarn deploy:localstack
```

## Scripts

The following scripts are available in the package.json:

### Development

```bash
  yarn start: Start the application locally using Serverless Offline.

  yarn dev: Alias for yarn start.

  yarn deploy: Deploy the project (default stage).

  yarn remove: Remove the project (default stage).

  yarn deploy:dev: Deploy to the sandbox environment.

  yarn remove:dev: Remove from the sandbox environment.

  yarn deploy:prod: Deploy to the production environment.

  yarn remove:prod: Remove from the production environment.

  yarn deploy:localstack: Deploy to LocalStack.

  yarn remove:localstack: Remove from LocalStack.
```

### Testing

```bash
yarn test: Run all tests.

yarn test:unit: Run unit tests.

yarn test:integration: Run integration tests with LocalStack.
```

### Linting

```bash
  yarn lint: Run ESLint with auto-fix for code quality.
```

## CI/CD

The project includes CI/CD pipelines for the sandbox and production environments. These pipelines handle:

- **Deployments** of the application and required AWS resources.  
  ![CI/CD Deployment](./imgs/ci-cd-deploy.png)

- **Automated execution** of unit and integration tests running on localstack.  
  ![CI/CD Tests](./imgs/ci-cd-test.png)

- **Linting** of code quality application.  
  ![CI/CD Linting](./imgs/ci-cd-lint.png)

Below is an overview of the complete CI/CD pipeline:  
![CI/CD Overview](./imgs/ci-cd.png)

All workflows leverage a caching strategy for node_modules to optimize performance, reduce build times, and minimize redundant installations during CI/CD pipeline executions

## Makefile Commands

The Makefile provides commands for local testing and deployment:

- API Requests



```bash
  # Create Appointment: 
  make create-appointment

  # Delete Appointment:
  make delete-appointment

  # Get User Appointments:
  make get-user-appointments

  # Get Appointment Info:
  make get-user-appointment-info

  # Update Appointment:
  make update-user-appointment

  # Deployment
  Start Local Development:
  make start-dev

  # Deploy to LocalStack:
  make deploy-localstack

  # Deploy to Sandbox:
  make deploy-dev

  # Deploy to Production:
  make deploy-prod
```

## Testing

The project includes comprehensive testing strategies:

Run with:

```bash
# Unit Tests:
yarn test:unit


# Integration Tests:
yarn test:integration
```

## Deployment

To deploy the application:

```bash
# Sandbox Environment:
yarn deploy:dev

# Production Environment:
yarn deploy:prod

# LocalStack:
yarn deploy:localstack
``` 
Make sure your AWS credentials are correctly set for deployments to sandbox or production.

## Local Testing

You can test the API locally using the commands in the Makefile. Set the environment variables in the Makefile as needed:
```bash 
API_URL=http://localhost:3000/dev
USER_ID=test-user
APPOINTMENT_ID=45fc29c7-3ebc-42a8-b416-72cc47da39d9
```

Then execute any of the following:

```bash
make create-appointment

make get-user-appointments

# change APPOINTMENT_ID with value returned previous in create command
make get-user-appointment-info
make delete-appointment
make update-user-appointment

```