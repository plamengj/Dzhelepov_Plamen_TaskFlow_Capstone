# TaskFlow - Task Management Application

TaskFlow is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users manage their tasks efficiently. The application features user authentication, task creation, editing, and organization with priority levels and status tracking.

## Features

- User Authentication (Register/Login)
- Task Management
  - Create, Read, Update, and Delete tasks
  - Set task priority (High, Medium, Low)
  - Track task status (Pending, In Progress, Completed)
  - Set due dates
  - Add descriptions
- Dashboard with task statistics
- Profile management
- Responsive design
- Modern UI with Material-UI components

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Material-UI for components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile
- PUT `/api/auth/profile` - Update user profile

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- GET `/api/tasks/:id` - Get a specific task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend framework 