# Node.js REST API with PostgreSQL and TypeScript

This project is a simple REST API built using Node.js, PostgreSQL, and TypeScript.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/UlviParviz/nodejs-restapi-postegres-ts.git
```

2. Navigate to the project directory:

```bash
cd nodejs-restapi-postegres-ts
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project and add the following environment variables:

```
DB_CONNECTION_STRING= (ex: postgresql://username:password@host:port/dbname)
PORT=
```

## Running the API

Start the development server:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file.

## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

## Example Requests

#### Create a User

```bash
curl -X POST http://localhost:8000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'
```

#### Get All Users

```bash
curl -X GET http://localhost:8000/users
```

#### Get a User by ID

```bash
curl -X GET http://localhost:8000/users/1
```

#### Update a User by ID

```bash
curl -X PUT http://localhost:8000/users/1 -H "Content-Type: application/json" -d '{"name":"John Smith","email":"johnsmith@example.com"}'
```

#### Delete a User by ID

```bash
curl -X DELETE http://localhost:8000/users/1
```

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Relational database
