# Document Management API

[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Test Coverage][test-coverage-image]][test-coverage-url]
[![Issue Count][issues-image]][issues-url]


## API Docs

### Users

Http verb | Endpoint | Description
------------|----------|-------------
POST | /users | Create a new user
GET | /users | Get all users
GET | /users/:id | Get a particular user
PUT | /users/:id | Update user attribute
DELETE | /users/:id | Delete a user
POST | /users/login | Logs a user in
POST | /users/logout | Logs a user out

### Documents

Http verb | Endpoint | Description
------------|----------|-------------
POST | /documents | Create a new document
GET | /documents | Get all documents
GET | /documents/:id | Get a particular document
PUT | /documents/:id | Update document attribute
DELETE | /documents/:id | Delete a document

### Roles

Http verb | Endpoint | Description
------------|----------|-------------
POST | /roles | Create a new role
GET | /roles | Get all roles

[travis-url]: https://travis-ci.org/azemoh/doc-man-api
[travis-image]: https://travis-ci.org/azemoh/doc-man-api.svg

[codeclimate-url]: https://codeclimate.com/github/azemoh/doc-man-api
[codeclimate-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/gpa.svg

[test-coverage-url]: https://codeclimate.com/github/azemoh/doc-man-api/coverage
[test-coverage-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/coverage.svg

[issues-image]: https://codeclimate.com/github/azemoh/doc-man-api/badges/issue_count.svg
[issues-url]: https://codeclimate.com/github/azemoh/doc-man-api
