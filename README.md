# sms-mgt
[![Coverage Status](https://coveralls.io/repos/github/cjmash/sms-mgt/badge.svg?branch=master)](https://coveralls.io/github/cjmash/sms-mgt?branch=master) [![CircleCI](https://circleci.com/gh/cjmash/sms-management.svg?style=svg)](https://circleci.com/gh/cjmash/sms-management)

SMS-Management-Application
An SMS-Management-Application is a system that enables users send sms to each other

- Technologies used

- NodeJs - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- KOAJS - Expressive HTTP middleware framework for node.js to make web applications and APIs more enjoyable to write.

- Postman - testing the API

- MongoDB: A NOSQL document-driven database

- Mongoose: A schema-based solution to model your application data.

- Installation

- Prerequisites

- Node.js v7+ Check your node version by typing node -v, node will also install npm for you which we will require in this project.

- Clone the repository https://github.com/cjmash/sms-management.git
- Create an account, users and databases on Mlab
- Navigate the sms-management folder.
- Create a .env file using the .env.default as a guide.
- npm install to install all dependencies.
- npm start - The app runs on port 3030
- npm test runs all the tests.
- Endpoints

| url Endpoint          |  http requests|               |
|-----------------------| --------------|---------------|
| /contacts/	        | GET           | Get all contacts | 
| /contact/:id            | GET         | Get one contact  |
| /contact/create        | POST          | Create a contact |
| /contact/:id     	|DELETE  | remove a specific contact from |
| /contact/:id	| PUT | edit a specific contact|
| /message	| POST | create a message |
| /messages/contact/:id	| GET | Get messages from a certain contact number|
| /message/:id	| GET | Get one message|
| /messages	| GET | get all your messages|
| /message/:id	| DELETE | Delete a message|


Future Improvements
Write MORE Tests
Add a catching User interface
