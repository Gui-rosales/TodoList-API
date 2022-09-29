# To-do List API REST

  

## Description

  

This is an API REST application developed using node, typescript, nestJs, PrimaJs and PostgresSQL. The project has the following features:

  
  

> - JWT authentication

> - Role-based access control for the end-points

> - CRUD operations for the user and task entities, with some relational queries

  
  

## Installation

  

```bash

$ npm install

```

  

## Running the app

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

```

  

## End-points

  

### Authentication service

  POST https://localhost:3000/auth/login - if credentials are correct, it returns the access token
 
```bash
body: {
email: string,
password: string
}
```
### User services

POST https://localhost:3000/signup - creates a new user
```bash
body: {
email: string,
password: string
}
```

PUT https://localhost:3000/attachUser/:userId/:taskId - attach a specific task on the user
> Roles required: admin

GET https://localhost:3000/getUsers - returns all users
> Roles required: admin or user 

GET https://localhost:3000/findUser/:userId - returns an specific user
> Roles required: admin or user

DELETE https://localhost:3000/deleteUser - delete an specific user
> Roles required: admin 
	
### Task services

POST https://localhost:3000/createTask - creates a new task

```bash
body: {
title: string,
description: string
}
```
> Roles required: admin

PUT https://localhost:3000/updateTask/:taskId

  ```bash
body: {
title: string,
description: string
}
```
> Roles required: admin

PUT https://localhost:3000/newTaskWithUserAttached/:userId - creates a new task with user attached
  ```bash
body: {
title: string,
description: string
}
```
> Roles required: admin

GET https://localhost:3000/getTasks - return all tasks 
> Roles required: admin or user

GET https://localhost:3000/getTask/:taskId - return a specific task
> Roles required: admin or user

DELETE https://localhost:3000/deleteTask/:taskId - Delete a specific task
> Roles required: admin

PUT https://localhost:3000/attachUser/:taskId/:userId - attach a user into a specific task
> Roles required: admin

PUT https://localhost:3000/dettachUserFromTask/:taskId - deattach the user from the task
> Roles required: admin

PUT https://localhost:3000/updateTaskStatus/:taskId - change the status of the task from "unfinished" to "finished" then delete it
> Roles required: admin
