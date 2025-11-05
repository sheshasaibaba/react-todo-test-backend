# TODO Backend API

A professional TODO backend application built with Express.js and Mongoose, featuring user authentication and full CRUD operations for todos.

## Features

- **User Authentication**
  - User registration
  - User login
  - JWT-based authentication
  - Protected routes

- **TODO Management**
  - Create todos
  - Get all todos (filtered by user)
  - Get single todo
  - Update todo
  - Toggle todo completion status
  - Delete todo

## Project Structure

```
todo-backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── todoController.js    # TODO CRUD operations
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handler
├── models/
│   ├── User.js              # User model
│   └── Todo.js              # Todo model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── todoRoutes.js       # Todo routes
│   └── index.js             # Route aggregator
├── utils/
│   └── generateToken.js     # JWT token generation utility
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── index.js                 # Main server file
└── package.json             # Dependencies and scripts
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and copy from `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set a secure JWT secret

4. Make sure MongoDB is running on your system

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

- `GET /api/auth/me` - Get current user (Protected)
  - Header: `Authorization: Bearer <token>`

### Todos

All todo endpoints require authentication. Include `Authorization: Bearer <token>` in headers.

- `GET /api/todos` - Get all todos for logged in user
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
  - Body: `{ "title": "string", "description": "string (optional)", "completed": "boolean (optional)" }`
- `PUT /api/todos/:id` - Update todo
  - Body: `{ "title": "string (optional)", "description": "string (optional)", "completed": "boolean (optional)" }`
- `PATCH /api/todos/:id/complete` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete todo

### Health Check

- `GET /health` - Server health check

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## License

ISC

