# Document Management API

[![Build Status][travis-image]][travis-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Test Coverage][test-coverage-image]][test-coverage-url]
[![Issue Count][issues-image]][issues-url]


## API Docs

### Roles

Endpoint | Description
----------|-------------
POST `/roles` | Create a new role
GET `/roles` | Get all roles

### Users

Endpoint | Description
----------|-------------
POST `/users` | Create a new user
GET `/users` | Get all users
GET `/users/:id` | Get a particular user
PUT `/users/:id` | Update user attribute
DELETE `/users/:id` | Delete a user
POST `/users/login` | Logs a user in
POST `/users/logout` | Logs a user out

### Documents

Endpoint | Description
----------|-------------
POST `/documents` | Create a new document
GET `/documents` | Get all documents
GET `/users/:id/documents` | Get documents for a user
GET `/documents/:id` | Get a particular document
PUT `/documents/:id` | Update document attribute
DELETE `/documents/:id` | Delete a document

### Types

Endpoint | Description
---------|-------------
POST `/types` | Create a new type
GET `/types` | Get all types
GET `/types/:id` | Get a particular type
PUT `/types/:id` | Update type attribute
DELETE `/types/:id` | Delete a type

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
