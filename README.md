# Document Management API

[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Test Coverage][test-coverage-image]][test-coverage-url]
[![Issue Count][issues-image]][issues-url]


# API Documentation
- [Roles](#roles)
  - [List roles](#list-roles)
  - [Create role](#create-role)

- [Users](#users)
  - [List users](#list-users)
  - [Create user](#create-user)
  - [Get user](#get-user)
  - [Edit user](#edit-user)


## Roles

Endpoint | Description
---------|-------------
POST `/roles` | Create a new role
GET `/roles` | Get all roles

### List Roles

#### Request
- Endpoint: GET: `/roles`
- Requires: Authentication

#### Response
- Status: 200 OK
- Body
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
- Body
```json
{
  "title": "admin"
}
```

#### Response
- Status: 201 Created
- Body
```json
{
  "id": 1,
  "title": "admin",
  "createdAt": "2016-12-06T06:44:54.792Z",
  "updatedAt": "2016-12-06T06:44:54.792Z"
}
```

### Users

Endpoint | Description
----------|-------------
GET `/users` | Get all users
POST `/users` | Create a new user
GET `/users/:id` | Get a particular user
PUT `/users/:id` | Update user attribute
DELETE `/users/:id` | Delete a user
POST `/users/login` | Logs a user in
POST `/users/logout` | Logs a user out

### List Users

#### Request
- Endpoint: GET: `/users`
- Requires: Authentication

#### Response
- Status: 200 OK
- Body
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
- Body
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
- Status: 201 Created
- Body
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
- Status: 200 OK
- Body
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
- Body:
```json
{
  "firstName": "Elon",
  "lastName": "Musk",
  "RoleId": 1
}
```

#### Response
- Status: 200 OK
- Body
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

### Documents

Endpoint | Description
----------|-------------
POST `/documents` | Create a new document
GET `/documents` | Get all documents
GET `/users/:id/documents` | Get documents for a user
GET `/documents/:id` | Get a particular document
PUT `/documents/:id` | Update document attribute
DELETE `/documents/:id` | Delete a document

#### Pagination / Limiting

Add `limit` and `offset` query parameters to the `/documents` Endpoint URL to limit the number of ducuments retured.

GET: `/documents?limit=5&offset=5`


[travis-url]: https://travis-ci.org/azemoh/doc-man-api
[travis-image]: https://travis-ci.org/azemoh/doc-man-api.svg

[codeclimate-url]: https://codeclimate.com/github/azemoh/doc-man-api
[codeclimate-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/gpa.svg

[test-coverage-url]: https://codeclimate.com/github/azemoh/doc-man-api/coverage
[test-coverage-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/coverage.svg

[issues-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/issue_count.svg
[issues-url]: https://codeclimate.com/github/azemoh/doc-man-api
