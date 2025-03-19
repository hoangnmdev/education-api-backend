## Table of Contents

- [Technologies used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Run the App](#run-the-app)
  - [Run Unit Tests](#run-unit-tests)
- [About the Project](#about-the-project)
  - [Models](#models)
  - [Endpoints](#endpoints)

## Technologies Used

- **Backend**: NodeJS, NestJS
- **Testing tool**: Jest
- **Database**: MySQL, TypeORM
- **Containerization**: Docker engine and Docker Compose

## Project Structure

```
└─ education-api
   ├─ .dockerignore
   ├─ .env
   ├─ .env.example
   ├─ .husky
   │  └─ _
   │     ├─ applypatch-msg
   │     ├─ commit-msg
   │     ├─ h
   │     ├─ husky.sh
   │     ├─ post-applypatch
   │     ├─ post-checkout
   │     ├─ post-commit
   │     ├─ post-merge
   │     ├─ post-rewrite
   │     ├─ pre-applypatch
   │     ├─ pre-auto-gc
   │     ├─ pre-commit
   │     ├─ pre-merge-commit
   │     ├─ pre-push
   │     ├─ pre-rebase
   │     └─ prepare-commit-msg
   ├─ .prettierrc
   ├─ coverage
   │  ├─ clover.xml
   │  ├─ coverage-final.json
   │  ├─ lcov-report
   │  │  ├─ base.css
   │  │  ├─ block-navigation.js
   │  │  ├─ constants
   │  │  │  ├─ index.html
   │  │  │  └─ index.ts.html
   │  │  ├─ database
   │  │  │  ├─ config
   │  │  │  │  ├─ database.config.ts.html
   │  │  │  │  └─ index.html
   │  │  │  ├─ index.html
   │  │  │  ├─ migrations
   │  │  │  │  ├─ 1742182527991-InitSchema.ts.html
   │  │  │  │  ├─ 1742265222995-InitSchema.ts.html
   │  │  │  │  └─ index.html
   │  │  │  ├─ seeds
   │  │  │  │  └─ document
   │  │  │  │     ├─ index.html
   │  │  │  │     ├─ run-seed.ts.html
   │  │  │  │     ├─ seed.module.ts.html
   │  │  │  │     ├─ student
   │  │  │  │     │  ├─ index.html
   │  │  │  │     │  ├─ student-seed.module.ts.html
   │  │  │  │     │  ├─ student-seed.service.ts.html
   │  │  │  │     │  └─ student-seeed.service.ts.html
   │  │  │  │     └─ teacher
   │  │  │  │        ├─ index.html
   │  │  │  │        ├─ teacher-seed.module.ts.html
   │  │  │  │        └─ teacher-seed.service.ts.html
   │  │  │  └─ typeorm-config.service.ts.html
   │  │  ├─ favicon.png
   │  │  ├─ filter
   │  │  │  ├─ http-exception.filter.early.test
   │  │  │  │  ├─ catch.early.test.ts.html
   │  │  │  │  └─ index.html
   │  │  │  ├─ http-exception.filter.ts.html
   │  │  │  └─ index.html
   │  │  ├─ index.html
   │  │  ├─ prettify.css
   │  │  ├─ prettify.js
   │  │  ├─ sort-arrow-sprite.png
   │  │  ├─ sorter.js
   │  │  ├─ src
   │  │  │  ├─ app.controller.ts.html
   │  │  │  ├─ app.module.ts.html
   │  │  │  ├─ app.service.ts.html
   │  │  │  ├─ config
   │  │  │  │  ├─ app.config.ts.html
   │  │  │  │  └─ index.html
   │  │  │  ├─ constants
   │  │  │  │  ├─ index.html
   │  │  │  │  └─ index.ts.html
   │  │  │  ├─ database
   │  │  │  │  ├─ config
   │  │  │  │  │  ├─ database.config.ts.html
   │  │  │  │  │  └─ index.html
   │  │  │  │  ├─ data-source.ts.html
   │  │  │  │  ├─ index.html
   │  │  │  │  ├─ migrations
   │  │  │  │  │  ├─ 1742031565048-InitSchema.ts.html
   │  │  │  │  │  ├─ 1742182527991-InitSchema.ts.html
   │  │  │  │  │  └─ index.html
   │  │  │  │  ├─ seeds
   │  │  │  │  │  └─ document
   │  │  │  │  │     ├─ index.html
   │  │  │  │  │     ├─ run-seed.ts.html
   │  │  │  │  │     ├─ seed.module.ts.html
   │  │  │  │  │     ├─ student
   │  │  │  │  │     │  ├─ index.html
   │  │  │  │  │     │  ├─ student-seed.module.ts.html
   │  │  │  │  │     │  └─ student-seeed.service.ts.html
   │  │  │  │  │     └─ teacher
   │  │  │  │  │        ├─ index.html
   │  │  │  │  │        ├─ teacher-seed.module.ts.html
   │  │  │  │  │        └─ teacher-seed.service.ts.html
   │  │  │  │  └─ typeorm-config.service.ts.html
   │  │  │  ├─ filter
   │  │  │  │  ├─ http-exception.filter.ts.html
   │  │  │  │  └─ index.html
   │  │  │  ├─ index.html
   │  │  │  ├─ main.ts.html
   │  │  │  ├─ student
   │  │  │  │  ├─ dto
   │  │  │  │  │  ├─ create-student.dto.ts.html
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  └─ update-student.dto.ts.html
   │  │  │  │  ├─ entities
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  └─ student.entity.ts.html
   │  │  │  │  ├─ index.html
   │  │  │  │  └─ student.service.ts.html
   │  │  │  ├─ teachers
   │  │  │  │  ├─ dto
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  ├─ register-student-teacher.dto.ts.html
   │  │  │  │  │  ├─ request
   │  │  │  │  │  │  ├─ index.html
   │  │  │  │  │  │  ├─ register-student-teacher.dto.ts.html
   │  │  │  │  │  │  ├─ retrieve-notification-request.dto.ts.html
   │  │  │  │  │  │  └─ suspend-student-teacher.dto.ts.html
   │  │  │  │  │  ├─ response
   │  │  │  │  │  │  ├─ get-common-student-teacher.dto.ts.html
   │  │  │  │  │  │  ├─ index.html
   │  │  │  │  │  │  └─ retrieve-notification-response.dto.ts.html
   │  │  │  │  │  └─ suspend-student-teacher.dto.ts.html
   │  │  │  │  ├─ entities
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  └─ teacher.entity.ts.html
   │  │  │  │  ├─ index.html
   │  │  │  │  ├─ teachers.controller.ts.html
   │  │  │  │  ├─ teachers.module.ts.html
   │  │  │  │  ├─ teachers.service.early.test
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  └─ registerStudents.early.test.ts.html
   │  │  │  │  ├─ teachers.service.ts.html
   │  │  │  │  └─ test
   │  │  │  │     ├─ index.html
   │  │  │  │     └─ registerStudents.early.test.ts.html
   │  │  │  └─ utils
   │  │  │     ├─ index.html
   │  │  │     ├─ request
   │  │  │     │  ├─ index.html
   │  │  │     │  └─ index.ts.html
   │  │  │     ├─ validate-config.ts.html
   │  │  │     └─ validation.error.ts.html
   │  │  ├─ student
   │  │  │  └─ entities
   │  │  │     ├─ index.html
   │  │  │     └─ student.entity.ts.html
   │  │  ├─ teachers
   │  │  │  ├─ dto
   │  │  │  │  ├─ request
   │  │  │  │  │  ├─ index.html
   │  │  │  │  │  ├─ register-student-teacher.dto.ts.html
   │  │  │  │  │  ├─ retrieve-notification-request.dto.ts.html
   │  │  │  │  │  └─ suspend-student-teacher.dto.ts.html
   │  │  │  │  └─ response
   │  │  │  │     ├─ get-common-student-teacher.dto.ts.html
   │  │  │  │     ├─ index.html
   │  │  │  │     └─ retrieve-notification-response.dto.ts.html
   │  │  │  ├─ entities
   │  │  │  │  ├─ index.html
   │  │  │  │  └─ teacher.entity.ts.html
   │  │  │  ├─ index.html
   │  │  │  ├─ teachers.controller.ts.html
   │  │  │  ├─ teachers.module.ts.html
   │  │  │  └─ teachers.service.ts.html
   │  │  └─ utils
   │  │     ├─ index.html
   │  │     ├─ request
   │  │     │  ├─ index.html
   │  │     │  └─ index.ts.html
   │  │     ├─ validate-config.ts.html
   │  │     └─ validation.error.ts.html
   │  └─ lcov.info
   ├─ dist
   │  ├─ app.module.d.ts
   │  ├─ app.module.js
   │  ├─ app.module.js.map
   │  ├─ config
   │  │  ├─ app-config.type.d.ts
   │  │  ├─ app-config.type.js
   │  │  ├─ app-config.type.js.map
   │  │  ├─ app.config.d.ts
   │  │  ├─ app.config.js
   │  │  ├─ app.config.js.map
   │  │  ├─ config.type.d.ts
   │  │  ├─ config.type.js
   │  │  └─ config.type.js.map
   │  ├─ constants
   │  │  ├─ index.d.ts
   │  │  ├─ index.js
   │  │  └─ index.js.map
   │  ├─ database
   │  │  ├─ config
   │  │  │  ├─ database-config.type.d.ts
   │  │  │  ├─ database-config.type.js
   │  │  │  ├─ database-config.type.js.map
   │  │  │  ├─ database.config.d.ts
   │  │  │  ├─ database.config.js
   │  │  │  └─ database.config.js.map
   │  │  ├─ data-source.d.ts
   │  │  ├─ data-source.js
   │  │  ├─ data-source.js.map
   │  │  ├─ migrations
   │  │  │  ├─ 1742413715632-InitSchema.d.ts
   │  │  │  ├─ 1742413715632-InitSchema.js
   │  │  │  └─ 1742413715632-InitSchema.js.map
   │  │  ├─ seeds
   │  │  │  └─ document
   │  │  │     ├─ run-seed.d.ts
   │  │  │     ├─ run-seed.js
   │  │  │     ├─ run-seed.js.map
   │  │  │     ├─ seed.module.d.ts
   │  │  │     ├─ seed.module.js
   │  │  │     ├─ seed.module.js.map
   │  │  │     ├─ student
   │  │  │     │  ├─ student-seed.module.d.ts
   │  │  │     │  ├─ student-seed.module.js
   │  │  │     │  ├─ student-seed.module.js.map
   │  │  │     │  ├─ student-seed.service.d.ts
   │  │  │     │  ├─ student-seed.service.js
   │  │  │     │  └─ student-seed.service.js.map
   │  │  │     └─ teacher
   │  │  │        ├─ teacher-seed.module.d.ts
   │  │  │        ├─ teacher-seed.module.js
   │  │  │        ├─ teacher-seed.module.js.map
   │  │  │        ├─ teacher-seed.service.d.ts
   │  │  │        ├─ teacher-seed.service.js
   │  │  │        └─ teacher-seed.service.js.map
   │  │  ├─ typeorm-config.service.d.ts
   │  │  ├─ typeorm-config.service.js
   │  │  └─ typeorm-config.service.js.map
   │  ├─ filter
   │  │  ├─ http-exception.filter.d.ts
   │  │  ├─ http-exception.filter.js
   │  │  └─ http-exception.filter.js.map
   │  ├─ main.d.ts
   │  ├─ main.js
   │  ├─ main.js.map
   │  ├─ student
   │  │  └─ entities
   │  │     ├─ student.entity.d.ts
   │  │     ├─ student.entity.js
   │  │     └─ student.entity.js.map
   │  ├─ teachers
   │  │  ├─ dto
   │  │  │  ├─ request
   │  │  │  │  ├─ register-student-teacher.dto.d.ts
   │  │  │  │  ├─ register-student-teacher.dto.js
   │  │  │  │  ├─ register-student-teacher.dto.js.map
   │  │  │  │  ├─ retrieve-notification-request.dto.d.ts
   │  │  │  │  ├─ retrieve-notification-request.dto.js
   │  │  │  │  ├─ retrieve-notification-request.dto.js.map
   │  │  │  │  ├─ suspend-student-teacher.dto.d.ts
   │  │  │  │  ├─ suspend-student-teacher.dto.js
   │  │  │  │  └─ suspend-student-teacher.dto.js.map
   │  │  │  └─ response
   │  │  │     ├─ get-common-student-teacher.dto.d.ts
   │  │  │     ├─ get-common-student-teacher.dto.js
   │  │  │     ├─ get-common-student-teacher.dto.js.map
   │  │  │     ├─ retrieve-notification-response.dto.d.ts
   │  │  │     ├─ retrieve-notification-response.dto.js
   │  │  │     └─ retrieve-notification-response.dto.js.map
   │  │  ├─ entities
   │  │  │  ├─ teacher.entity.d.ts
   │  │  │  ├─ teacher.entity.js
   │  │  │  └─ teacher.entity.js.map
   │  │  ├─ teachers.controller.d.ts
   │  │  ├─ teachers.controller.js
   │  │  ├─ teachers.controller.js.map
   │  │  ├─ teachers.module.d.ts
   │  │  ├─ teachers.module.js
   │  │  ├─ teachers.module.js.map
   │  │  ├─ teachers.service.d.ts
   │  │  ├─ teachers.service.js
   │  │  └─ teachers.service.js.map
   │  ├─ tsconfig.build.tsbuildinfo
   │  └─ utils
   │     ├─ request
   │     │  ├─ index.d.ts
   │     │  ├─ index.js
   │     │  └─ index.js.map
   │     ├─ validate-config.d.ts
   │     ├─ validate-config.js
   │     ├─ validate-config.js.map
   │     ├─ validation.error.d.ts
   │     ├─ validation.error.js
   │     └─ validation.error.js.map
   ├─ docker-compose.yaml
   ├─ Dockerfile
   ├─ docs
   ├─ eslint.config.mjs
   ├─ nest-cli.json
   ├─ package-lock.json
   ├─ package.json
   ├─ README.md
   ├─ src
   │  ├─ app.module.ts
   │  ├─ config
   │  │  ├─ app-config.type.ts
   │  │  ├─ app.config.ts
   │  │  └─ config.type.ts
   │  ├─ constants
   │  │  └─ index.ts
   │  ├─ database
   │  │  ├─ config
   │  │  │  ├─ database-config.type.ts
   │  │  │  └─ database.config.ts
   │  │  ├─ data-source.ts
   │  │  ├─ migrations
   │  │  │  └─ 1742413715632-InitSchema.ts
   │  │  ├─ seeds
   │  │  │  └─ document
   │  │  │     ├─ run-seed.ts
   │  │  │     ├─ seed.module.ts
   │  │  │     ├─ student
   │  │  │     │  ├─ student-seed.module.ts
   │  │  │     │  ├─ student-seed.service.ts
   │  │  │     │  └─ test
   │  │  │     │     └─ student-seed.service.spec.ts
   │  │  │     └─ teacher
   │  │  │        ├─ teacher-seed.module.ts
   │  │  │        ├─ teacher-seed.service.ts
   │  │  │        └─ test
   │  │  │           └─ teacher-seed.service.spec.ts
   │  │  └─ typeorm-config.service.ts
   │  ├─ filter
   │  │  ├─ http-exception.filter.ts
   │  │  └─ test
   │  │     └─ http-exception.filter.spec.ts
   │  ├─ main.ts
   │  ├─ student
   │  │  └─ entities
   │  │     └─ student.entity.ts
   │  ├─ teachers
   │  │  ├─ dto
   │  │  │  ├─ request
   │  │  │  │  ├─ register-student-teacher.dto.ts
   │  │  │  │  ├─ retrieve-notification-request.dto.ts
   │  │  │  │  └─ suspend-student-teacher.dto.ts
   │  │  │  └─ response
   │  │  │     ├─ get-common-student-teacher.dto.ts
   │  │  │     └─ retrieve-notification-response.dto.ts
   │  │  ├─ entities
   │  │  │  └─ teacher.entity.ts
   │  │  ├─ teachers.controller.ts
   │  │  ├─ teachers.module.ts
   │  │  ├─ teachers.service.ts
   │  │  └─ test
   │  │     ├─ teachers.controller.spec.ts
   │  │     └─ teachers.service.spec.ts
   │  └─ utils
   │     ├─ request
   │     │  ├─ index.ts
   │     │  └─ test
   │     │     └─ index.spec.ts
   │     ├─ test
   │     │  ├─ validation.error.spec.ts
   │     │  └─ vallidate-config.spec.ts
   │     ├─ validate-config.ts
   │     └─ validation.error.ts
   ├─ test
   │  └─ jest-e2e.json
   ├─ tsconfig.build.json
   └─ tsconfig.json

```
│

## Prerequisites

Ensure that you have the following installed:

- [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Clone the repository and navigate to the project directory:

  ```bash
  git clone https://github.com/hoangnmdev/education-api-backend.git
  cd education-api
  ```

## Installation

### Run the App

#### 1. Build and start the containers

Run the follow command to start the containers:

```bash
docker-compose up --build
```

This will setup:

- A MySQL server in a container with a mounted volume for persistent storage

#### 2. Generate migration
```bash
npm run migration:generate  src/database/migrations/<Migration_Name>
```

#### 3. Run migration
```bash
npm run migration:run
```

#### 4. Run seed
```bash
npm run seed 
```

#### 5. Run application
```bash
npm run start:dev
```

The application is available at:

```
http://localhost:3000
```

#### 6. Delete the containers

Delete the containers and clean out the volume by running

```
docker-compose down -v
```

### Run Unit Tests

Similarly, open another interactive shell session inside the api server container and execute the test runner

![test coverage](./docs/test_coverage.png)

```bash
npm run test
```

## About the Project

The project is built around 2 data models `Student` and `Teacher` represented by their corresponding entities. TypeORM was chosen to interact with the MySQL database. All main functionalities involve around managing the relationship between the two models, including handling registration, get common students, get notification list, and suspend a student.

#### The Teacher Model

Represents the teachers in the system, manages multiple student entities.

- email: the primary key that uniquely identifies a teacher
- students: a relation field representing a list of student entities that the teacher manages

#### The Student Model

Represents the students in the system, can be registered to multiple teacher entities.

- email: the primary key that uniquely identifies a student
- suspended: a boolean value indicating if a student is suspended or not
- teachers: a relation field representing a list of teacher entities the student is registered to

#### The TeacherStudent Model

Facilitate the many-to-many relationship between the Teacher and Student entities by storing the association between their email addresses

- teacherEmail: a foreign key referencing a row in the Teacher table
- studentEmail: a foreign key referencing a row in the Student table

Both foreign keys creates a composite primary key that uniquely identifies a relationship in the table. TypeORM automatically manages and maintains the table and the relationship between the Student and Teacher tables.

### Endpoints

#### Register Students

- **Endpoint:** `POST /api/register`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 204
- **Request Body:**
  - `teacher`: Email of the teacher.
  - `students`: List of student emails.

#### Retrieve Common Students

- **Endpoint:** `GET /api/commonstudents`
- **Success Status:** 200
- **Query Parameters:**
  - `teacher`: One or more teacher emails.
- **Success Response Example:**
  ```json
  {
    "students": ["commonstudent1@gmail.com", "commonstudent2@gmail.com"]
  }
  ```

#### Suspend a Student

- **Endpoint:** `POST /api/suspend`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 204
- **Request Body:**
  - `student`: Email of the student.

#### Retrieve for Notifications

- **Endpoint:** `POST /api/retrievefornotifications`
- **Headers:** `Content-Type: application/json`
- **Success Status:** 200
- **Request Body:**
  - `teacher`: Email of the teacher.
  - `notification`: Text of the notification.
- **Success Response Example:**
  ```json
  {
    "recipients": ["student1@gmail.com", "student2@gmail.com"]
  }
  ```

#### Error Responses

- **Error Response Example:**

```json
{
  "errorType": "BadRequestException",
  "statusCode": 400,
  "message": [
    "each value in teacher must be an email",
    "teacher must contain at least 1 elements",
    "teacher must be an array"
  ]
}
```
