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
  - [Delete user](#delete-user)

- [Documents](#documents)
  - [List documents](#list-documents)
  - [Create document](#create-document)

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

## Users

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

### Delete User

#### Request
- Endpoint: DELETE: `/users/:id`
- Requires: Authentication

#### Response
- Status: 200 OK
- Body
```json
{
  "message": "User deleted successfully."
}
```

## Documents

Endpoint | Description
----------|-------------
POST `/documents` | Create a new document
GET `/documents` | Get all documents
GET `/users/:id/documents` | Get documents for a user
GET `/documents/:id` | Get a particular document
PUT `/documents/:id` | Update document attribute
DELETE `/documents/:id` | Delete a document

### List Documents

#### Request
- Endpoint: GET: `/documents`
- Requires: Authentication
- Optional parameters:
  - `limit=5` Number of items to return.
  - `offset=5` Number of items to skip.

#### Response
- Status: 200 OK
- Body
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

### Create Document

#### Request
- Endpoint: POST: `/documents`
- Requires: Authentication
- Body
```json
{
  "title": "De-engineered explicit attitude",
  "content": "Asperiores doloribus voluptates quaerat aut voluptate quod quae. Placeat dicta ut aut dignissimos voluptas et non adipisci numquam. Consectetur accusamus sunt voluptas illum nulla. Impedit minima omnis doloribus eos aspernatur.",
  "OwnerId": 1,
  "access": "private"
}
```

#### Response
- Status: 201 Created
- Body
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
- Status: 200 OK
- Body
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
- Body:
```json
{
  "title": "Self-enabling scalable neural-net",
  "content": "Ad cumque odit fuga qui et. Hic sed nobis et dolorem. Saepe aut fugiat magni. Placeat sit quibusdam cum ut."
}
```

#### Response
- Status: 200 OK
- Body
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
- Status: 200 OK
- Body
```json
{
  "message": "Document deleted successfully."
}
```

#### Pagination / Limiting

Add `limit` and `offset` query parameters to the `/documents` Endpoint URL to limit the number of documents returned.

GET: `/documents?limit=5&offset=5`


[travis-url]: https://travis-ci.org/azemoh/doc-man-api
[travis-image]: https://travis-ci.org/azemoh/doc-man-api.svg

[codeclimate-url]: https://codeclimate.com/github/azemoh/doc-man-api
[codeclimate-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/gpa.svg

[test-coverage-url]: https://codeclimate.com/github/azemoh/doc-man-api/coverage
[test-coverage-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/coverage.svg

[issues-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/issue_count.svg
[issues-url]: https://codeclimate.com/github/azemoh/doc-man-api
