# API Documentation

## Introduction
This project is designed as a serverless application using various AWS services.

#### AWS Services Used
This project leverages the following AWS services:

1. **AWS Lambda**:
   - Each module (e.g., clients, assets, contracts, payments, notifications) is implemented as an independent Lambda function.
   - Handles API requests and executes business logic.

2. **Amazon RDS (MariaDB)**:
   - Used for persistent storage of application data.
   - All database operations are performed using stored procedures.

3. **Amazon API Gateway**:
   - Serves as the entry point for API requests.
   - Routes requests to the appropriate Lambda functions.

4. **Amazon Cognito**:
   - Provides authentication and user management.
   - Used for securing endpoints and managing user sessions.

5. **AWS CloudFormation**:
   - Manages infrastructure as code.
   - Provisions resources such as RDS and Security Groups.

6. **AWS SAM**:
   - Used to deploy the main API and a separate Lambda function for initializing the remote database.


#### Notes on Amazon RDS
- The Amazon RDS database is provisioned as a public resource for testing purposes. This allows easy access during development and debugging.
- For production environments, it is recommended to deploy RDS within a VPC using private subnets. This ensures that only the Lambda functions requiring database access can interact with it, enhancing security and reducing exposure to external threats.

## Steps to Set Up the Project

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (version 20 or higher).
2. Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).
3. Install [AWS CLI](https://aws.amazon.com/cli/) for managing AWS resources.
   - Ensure the AWS CLI is configured with your credentials and default region:
4. Install [Docker](https://www.docker.com/) for local testing and deployment.
5. Ensure you have a MariaDB or MySQL database running locally or in the cloud.

### Environment Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sam-app
   ```
2. Create a `.env` file in the root directory with the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=admin
   DB_PASSWORD=adminpassword
   DB_NAME=sam_app_db
   ```
3. Install dependencies for each module:
   ```bash
   cd api
   npm install
   cd ../init-db
   npm install
   ```

### Database Initialization
1. Start the database (if using Docker), replace values:
   ```bash
   docker run \
    --name "MARIADB_CONTAINER_NAME" \
    -e MYSQL_ROOT_PASSWORD="MYSQL_ROOT_PASSWORD" \
    -e MYSQL_DATABASE="MYSQL_DATABASE" \
    -e MYSQL_USER="MYSQL_USER" \
    -e MYSQL_PASSWORD="MYSQL_PASSWORD" \
    -p 3306:3306 \
    -d mariadb:latest
   ```
2. Run the database initialization script:
   ```bash
   npm run local-db-init
   ```

### Deploying to AWS
1. Create the CloudFormation stack for AWS RDS:
   ```bash
   npm run cf-create
   ```
   - This command provisions the AWS RDS database required for the application.

2. Package the application:
   ```bash
   npm run sam-build
   ```
3. Deploy the application:
   ```bash
   npm run sam-deploy
   ```
   - After the first deployment, the Cognito environment variables (`COGNITO_CLIENT_ID` and `COGNITO_POOL_ID`) will be available for use with `sam local start-api`.

4. Initialize the remote database:
   After deploying the application, the `InitDbFunctionName` variable will be returned. Use this variable to invoke the Lambda function for initializing the remote database:
   ```bash
   aws lambda invoke --function-name <InitDbFunctionName>
   ```
   - Replace `<InitDbFunctionName>` with the actual function name returned by `sam-deploy`.


### Running the Project Locally
1. Start the local environment using AWS SAM:
   ```bash
   npm run start-api
   ```
   - Ensure the `env.json` file exists in the root directory. This file is used to provide environment variables when running the project locally with `sam local start-api`. Example:
     ```json
     {
       "DB_HOST": "localhost",
       "DB_USER": "admin",
       "DB_PASSWORD": "adminpassword",
       "DB_NAME": "sam_app_db",
       "COGNITO_CLIENT_ID": "aaabbbbcccccc",
       "COGNITO_POOL_ID": "us-east-1_example"
     }
     ```
2. Test the endpoints using Postman or curl:
   ```bash
   curl http://localhost:3000/clients
   ```

### Commands in `package.json`
The following commands are available in the `package.json` file:

1. **Run unit tests:**
   ```bash
   cd sam-app && npm test
   ```
   Executes all unit tests in the project.

2. **Start local environment:**
   ```bash
   npm run start-api
   ```
   Starts the local environment using AWS SAM.

3. **Package the application:**
   ```bash
   npm run sam-build
   ```
   Builds the application for deployment.

4. **Deploy the application:**
   ```bash
   npm run sam-deploy
   ```
   Deploys the application to AWS.

5. **Reset the database:**
   ```bash
   npm run reset-db
   ```
   Resets the database to its initial state.

6. **Initialize the local database:**
   ```bash
   npm run local-db-init
   ```
   Runs the database initialization script to set up tables and procedures.

7. **Test the local database connection:**
   ```bash
   npm run local-db-test
   ```
   Tests the connection to the local database to ensure it is working correctly.

8. **CloudFormation Commands:**
   These commands are used to manage the AWS RDS database setup:
   - **Validate template:**
     ```bash
     npm run cf-validate
     ```
     Validates the CloudFormation template for the AWS RDS database.
   - **Create stack:**
     ```bash
     npm run cf-create
     ```
     Creates a new CloudFormation stack to provision the AWS RDS database.
   - **Update stack:**
     ```bash
     npm run cf-update
     ```
     Updates an existing CloudFormation stack for the AWS RDS database.
   - **Describe stack:**
     ```bash
     npm run cf-describe
     ```
     Describes the details of the CloudFormation stack for the AWS RDS database.
   - **Delete stack:**
     ```bash
     npm run cf-delete
     ```
     Deletes the CloudFormation stack and associated AWS RDS database.

### Running Tests
1. Run unit tests:
   ```bash
   cd api
   npm test
   ```
2. Check code coverage:
   ```bash
   npm run coverage
   ```

### Additional Notes
- Ensure the database connection details in `.env` match your setup.
- Use the `postman_collection.json` file to import API requests into Postman.

### To Do
- **Amazon SES**: (NOT IMPLEMENTED)
  - Enables email notifications for contract expiration reminders.

- **Automated Lambda Function**: (NOT IMPLEMENTED)
  - A Lambda function to be executed periodically for sending payment due date notifications.
  - This will be scheduled using **Amazon EventBridge**.