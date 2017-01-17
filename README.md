[![Build Status][travis-image]][travis-url]
[![Test Coverage][test-coverage-image]][test-coverage-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Issue Count][issues-image]][issues-url]

# Document Management System API.
Document Management System provides a restful API for users to create and manage documents. Employing token-based authentication to identify users and Role-based authorisation to grant users different level of access.

Document Management System API is built with JavaScript (ES6), Node.js, Express, Postgresql and Sequelize ORM.  

## Local Development
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.8.0.

1. Clone this repository from a terminal `git clone git@github.com:azemoh/doc-man-api.git`.
1. Move into the project directory `cd doc-man-api`
1. Install project dependencies `npm install`
1. Create Postgresql database and run migrations `npm run db:setup`.
1. Start the express server `npm start`.
1. Run test `npm test`.

### Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)][postman-link]

Create a Postman environment and set `url` and `token` variables or download and import a production environment from this [link][postman-env-link]

## Deployment
Deploy this project to Heroku by clicking the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/azemoh/doc-man-api)

Set a `SECRET_TOKEN` environmet variable, and make sure to create a Postgresql add-on.

---

# API Documentation
The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API status and errors.

## Authentication
Users are assigned a token when their accounts are created or they login to the system.This token is needed for subsequent HTTP requests to the API for authentication. API requests made without authentication will fail with the status code `401: Unauthorized`.

The following are some sample request and response form the API.

- [Roles](#roles)
  - [List roles](#list-roles)
  - [Create role](#create-role)

- [Users](#users)
  - [List users](#list-users)
  - [Create user](#create-user)
  - [Get user](#get-user)
  - [Edit user](#edit-user)
  - [Delete user](#delete-user)

- [Documents](#documents)
  - [List documents](#list-documents)
  - [User documents](#user-documents)
  - [Search documents](#search-documents)
  - [Create document](#create-document)
  - [Get document](#get-document)
  - [Edit document](#edit-document)
  - [Delete document](#delete-document)


## Roles
Endpoint for Roles resource.

### List Roles

#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "admin",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "regular",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }
]
```

### Create Role

#### Request
- Endpoint: POST: `/roles`
- Requires: Authentication and Admin role.
- Body `(application/json)`
```json
{
  "title": "admin"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "admin",
  "createdAt": "2016-12-06T06:44:54.792Z",
  "updatedAt": "2016-12-06T06:44:54.792Z"
}
```

## Users
Endpoint for Users resource.

### List Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@mail.com",
    "RoleId": 2,
    "updatedAt": "2016-12-06T09:25:29.316Z",
    "createdAt": "2016-12-06T09:25:29.316Z",
  }, {
    "id": 2,
    "username": "janedoe",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "janedoe@mail.com",
    "RoleId": 1,
    "updatedAt": "2016-12-06T09:25:29.316Z",
    "createdAt": "2016-12-06T09:25:29.316Z",
  },
]
```

### Create User

#### Request
- Endpoint: POST: `/users`
- Body `(application/json)`
```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@mail.com",
  "password": "pa55w0rd",
  "RoleId": 2,
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@mail.com",
    "RoleId": 2,
    "updatedAt": "2016-12-06T09:25:29.316Z",
    "createdAt": "2016-12-06T09:25:29.316Z",
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjQsIlJvbGVJZCI6MSwiaWF0IjoxNDgxMDE2MzI5LCJleHAiOjE0ODExMDI3Mjl9.D-41IrYYuOpp5-TJKWAlHyxWAehvOoY4m7YTtiUacl0",
  "expiresIn": 86400
}
```

### Get User

#### Request
- Endpoint: GET: `/users/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@mail.com",
  "RoleId": 2,
  "updatedAt": "2016-12-06T09:25:29.316Z",
  "createdAt": "2016-12-06T09:25:29.316Z",
}
```

### Edit User

#### Request
- Endpoint: PUT: `/users/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "firstName": "Elon",
  "lastName": "Musk",
  "RoleId": 1
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "username": "johndoe",
  "firstName": "Elon",
  "lastName": "Musk",
  "email": "johndoe@mail.com",
  "RoleId": 1,
  "updatedAt": "2016-12-08T02:25:29.316Z",
  "createdAt": "2016-12-06T09:25:29.316Z",
}
```

### Delete User

#### Request
- Endpoint: DELETE: `/users/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "User deleted successfully."
}
```

## Documents
Endpoint for document resource.

### List Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication
- Optional parameters for limiting and pagination:
  - `limit=5` Number of items to return.
  - `offset=5` Number of items to skip.

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Self-enabling scalable neural-net",
    "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut.",
    "OwnerId": 2,
    "access": "role",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "De-engineered explicit attitude",
    "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
    "OwnerId": 1,
    "access": "private",
    "createdAt": "2016-12-05T05:51:51.217Z",
    "updatedAt": "2016-12-05T05:51:51.217Z"
  }
]
```

### Search Documents

#### Request
- Endpoint: GET: `/documents/search?query=`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Self-enabling scalable neural-net",
    "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut.",
    "OwnerId": 2,
    "access": "role",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "De-engineered scalable attitude",
    "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
    "OwnerId": 1,
    "access": "private",
    "createdAt": "2016-12-05T05:51:51.217Z",
    "updatedAt": "2016-12-05T05:51:51.217Z"
  }
]
```

### User Documents

#### Request
- Endpoint: GET: `/users/:id/documents`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
[
  {
    "id": 1,
    "title": "Self-enabling scalable neural-net",
    "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut.",
    "OwnerId": 2,
    "access": "role",
    "createdAt": "2016-12-06T06:44:54.792Z",
    "updatedAt": "2016-12-06T06:44:54.792Z"
  }, {
    "id": 2,
    "title": "De-engineered explicit attitude",
    "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
    "OwnerId": 2,
    "access": "private",
    "createdAt": "2016-12-05T05:51:51.217Z",
    "updatedAt": "2016-12-05T05:51:51.217Z"
  }
]
```

### Create Document

#### Request
- Endpoint: POST: `/documents`
- Requires: Authentication
- Body `(application/json)`
```json
{
  "title": "De-engineered explicit attitude",
  "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
  "OwnerId": 1,
  "access": "private"
}
```

#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "De-engineered explicit attitude",
  "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
  "OwnerId": 1,
  "access": "private",
  "createdAt": "2016-12-05T05:51:51.217Z",
  "updatedAt": "2016-12-05T05:51:51.217Z"
}
```


### Get Document

#### Request
- Endpoint: GET: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "De-engineered explicit attitude",
  "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
  "OwnerId": 1,
  "access": "private",
  "createdAt": "2016-12-05T05:51:51.217Z",
  "updatedAt": "2016-12-05T05:51:51.217Z"
}
```

### Edit Document

#### Request
- Endpoint: PUT: `/documents/:id`
- Requires: Authentication
- Body `(application/json)`:
```json
{
  "title": "Self-enabling scalable neural-net",
  "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut."
}
```

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "id": 1,
  "title": "Self-enabling scalable neural-net",
  "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut.",
  "OwnerId": 1,
  "access": "private",
  "createdAt": "2016-12-05T05:51:51.217Z",
  "updatedAt": "2016-12-05T05:51:51.217Z"
}
```

### Delete Document

#### Request
- Endpoint: DELETE: `/documents/:id`
- Requires: Authentication

#### Response
- Status: `200: OK`
- Body `(application/json)`
```json
{
  "message": "Document deleted successfully."
}
```

[travis-url]: https://travis-ci.org/azemoh/doc-man-api
[travis-image]: https://travis-ci.org/azemoh/doc-man-api.svg

[codeclimate-url]: https://codeclimate.com/github/azemoh/doc-man-api
[codeclimate-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/gpa.svg

[test-coverage-url]: https://codeclimate.com/github/azemoh/doc-man-api/coverage
[test-coverage-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/coverage.svg

[issues-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/issue_count.svg
[issues-url]: https://codeclimate.com/github/azemoh/doc-man-api

[postman-link]: https://app.getpostman.com/run-collection/86124dbf83e906d9221b#?env%5BDocMan%20Production%5D=W3sia2V5IjoidXJsIiwidmFsdWUiOiJodHRwczovL2RvYy1tYW4tYXBpLmhlcm9rdWFwcC5jb20vIiwidHlwZSI6InRleHQiLCJlbmFibGVkIjp0cnVlLCJ3YXJuaW5nIjoiIn0seyJrZXkiOiJ0b2tlbiIsInZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SlZjMlZ5U1dRaU9qZ3NJbEp2YkdWSlpDSTZNU3dpYVdGMElqb3hORGd4TWpjME1qWTRMQ0psZUhBaU9qRTBPREV6TmpBMk5qaDkuOGVlV3FicGFrXzljeVNCdVVCenJZQmlDUVM0ZVBXckU3YUY3eHpkWGFQSSIsInR5cGUiOiJ0ZXh0IiwiZW5hYmxlZCI6dHJ1ZSwid2FybmluZyI6IiJ9XQ==

[postman-env-link]: https://gist.github.com/azemoh/3f8b302d83548744c06b47dffd6c04ed#file-docman-production-postman_environment-json
