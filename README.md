# Education API Backend

## 1. Description
This project, 'education-api', is a backend service designed to help teachers perform administrative functions for their students. It's built using the NestJS framework, offering robust API endpoints for clients.

## 2. Features
- Teacher can register students.
- Teacher can retrieve a list of students common to a given list of teachers.
- Teacher can suspend a specified student.
- Teacher can retrieve a list of students who can receive a given notification.

## 3. Tech Stack
This project is built using a robust tech stack for optimal performance and scalability:

- **Backend Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Testing**: Jest
- **Code Formatting and Linting**: ESLint, Prettier

## 4. Server setup guide
### 4.1. Prerequisites
- Node.js v22.14.0
- Docker

### 4.2. Installation
To install the project, follow these steps:

```bash
git clone https://github.com/hoangnmdev/education-api-backend.git
cd education-api
```

### 4.3. Environment setup

To run this project, you will need to set up the following environment variables. You can do this by creating a `.env` file in folder `education-api`.
```plaintext
# MySQL Database
#===
MYSQL_ROOT_PASSWORD=secret
MYSQL_USER=app
MYSQL_PASSWORD=secret
MYSQL_DATABASE=education-db
MYSQL_PORT_EXPOSE=3306

# Server
#===
SERVER_PORT=3000 
DB_HOST_MYSQL=localhost
DB_PORT_MYSQL=3306
DB_USERNAME_MYSQL=app
DB_PASSWORD_MYSQL=secret
DB_NAME_MYSQL=education-db

### 4.4. Run docker compose
At folder `education-api`, to build, start and run services:
```bash
docker-compose up --build
```

### 4.5. Seeding

After the server is successfully up and running, you can proceed with running the seeding process.
```
docker exec -it education-connection-api npm run seed:run
```

### 4.6. Import Postman collection
Import the content of [Postman File](./education-connection.postman_collection.json) to Postman following guide.
![Import postman guide](./images/import-postman-guide.png)


### 4.7. Call the first api
Call the first api to get response.
![Test the first api](./images/test-first-api.png)

## 5. Other commands

### 5.1. Database Migrations
To run migrations:
```bash
npm run migration:run
```

### 5.2. Seeding
To run for seeding:
```bash
npm run seed
```
### 5.3. Start application in development mode
```bash
npm run start
```
### 5.4. Build application for production
```bash
npm run build
```

### 5.5. Run test
To run tests:
```bash
npm run test
```

### 5.6. Running and checking coverage
```bash
npm run test:cov
```

## 6. Note
- Following the requirement, I didn't create the API for registering a specific teacher or a specific student. Please run the seeding first to generate data. 
- Attach the postman file: [Postman File](./education-connection.postman_collection.json)