```markdown
# **Workers Management System Monorepo**

This monorepo contains both the frontend and backend components for a Workers Management System. The frontend is a React-based application for managing worker statuses, searching contacts, and updating information in real-time. The backend is built with Node.js and Express, providing a RESTful API for the frontend to interact with.

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Monorepo Structure](#monorepo-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Project](#running-the-project)
7. [Usage](#usage)
8. [Frontend Components](#frontend-components)
9. [Backend API](#backend-api)
10. [Error Handling](#error-handling)
11. [Contributing](#contributing)
12. [License](#license)

## **1. Project Overview**

The Workers Management System allows users to manage worker statuses, search for contacts, and update user information through an interactive React frontend. The backend provides the necessary APIs to fetch, update, and manage data securely.

## **2. Features**

- **User Authentication**: Secure login system with session management.
- **Status Management**: View and update the current status of the logged-in user.
- **Search and Filter**: Efficiently search for and filter workers based on status and other criteria using debounced inputs.
- **Error Handling**: Robust error handling across the application, with real-time feedback to the user.
- **Centralized API Logic**: All API interactions are managed using custom hooks and service layers for better maintainability.

## **3. Monorepo Structure**

```plaintext
/frontend
  ├── src
  │   ├── components
  │   │   ├── [LoginForm.jsx](./frontend/src/components/LoginForm.jsx)
  │   │   ├── [UserStatusCard.jsx](./frontend/src/components/UserStatusCard.jsx)
  │   │   ├── [UserListCard.jsx](./frontend/src/components/UserListCard.jsx)
  │   │   ├── [FreeTextSearchWithDebounce.jsx](./frontend/src/components/FreeTextSearchWithDebounce.jsx)
  │   │   ├── [MultiSelect.jsx](./frontend/src/components/MultiSelect.jsx)
  │   │   ├── [SearchAndFilterSection.jsx](./frontend/src/components/SearchAndFilterSection.jsx)
  │   │   └── [ErrorFallback.jsx](./frontend/src/components/ErrorFallback.jsx)
  │   ├── pages
  │   │   ├── [LoginPage.jsx](./frontend/src/pages/LoginPage.jsx)
  │   │   ├── [WorkersStatusPage.jsx](./frontend/src/pages/WorkersStatusPage.jsx)
  │   ├── utils
  │   │   └── [useApi.jsx](./frontend/src/utils/useApi.jsx)
  │   ├── [App.jsx](./frontend/src/App.jsx)
  │   └── index.js
  ├── public
  └── package.json

/backend
  ├── controller
  │   ├── [user-controller.js](./backend/controller/user-controller.js)
  │   └── [status-controller.js](./backend/controller/status-controller.js)
  ├── dal
  │   ├── [user-dal.js](./backend/dal/user-dal.js)
  │   └── [status-dal.js](./backend/dal/status-dal.js)
  ├── service
  │   ├── [user-service.js](./backend/service/user-service.js)
  │   └── [status-service.js](./backend/service/status-service.js)
  ├── utils
  │   ├── [connection-wrapper.js](./backend/utils/connection-wrapper.js)
  │   ├── [logger.js](./backend/utils/logger.js)
  │   └── [error-handler.js](./backend/utils/error-handler.js)
  ├── errors
  │   ├── [server-error.js](./backend/errors/server-error.js)
  │   └── [error-type.js](./backend/errors/error-type.js)
  ├── middleware
  │   └── [verify-token.js](./backend/middleware/verify-token.js)
  ├── [server.js](./backend/server.js)
  └── package.json
```

## **4. Installation**

### **Prerequisites**

- Node.js (>=14.x.x)
- npm or yarn

### **Steps to Install**

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   # Install backend dependencies
   cd backend
   npm install
   # or
   yarn install

   # Install frontend dependencies
   cd ../frontend
   npm install
   # or
   yarn install
   ```

## **5. Environment Variables**

Create an `.env` file in both the `frontend` and `backend` directories to configure the environment variables.

### **Frontend .env:**

```bash
VITE_REST_API=http://localhost:<backend_port>
```

### **Backend .env:**

```bash
REST_PORT=5000
JWT_SECRET=your_jwt_secret_key
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## **6. Running the Project**

### **Running the Backend**

```bash
cd backend
npm start
# or
yarn start
```

The backend server should now be running on `http://localhost:5000` (or the port you specified in `.env`).

### **Running the Frontend**

```bash
cd frontend
npm start
# or
yarn start
```

The frontend should now be running on `http://localhost:3000`.

## **7. Usage**

### **Navigating the Application**

- **Login Page**: The initial page where users can log in using their credentials.
- **Workers Status Page**: After logging in, users are redirected here, where they can view and update their status and search/filter through other workers.

## **8. Frontend Components**

### **[App.jsx](./frontend/src/App.jsx)**

The root component that sets up routing and global error boundaries.

### **[ErrorFallback.jsx](./frontend/src/components/ErrorFallback.jsx)**

A component used to catch and display errors that occur during rendering in the component tree.

### **[LoginForm.jsx](./frontend/src/components/LoginForm.jsx)**

A form component for handling user login.

### **[UserStatusCard.jsx](./frontend/src/components/UserStatusCard.jsx)**

A component for displaying and updating the current user's status.

### **[UserListCard.jsx](./frontend/src/components/UserListCard.jsx)**

A component displaying a list of users, including their statuses.

### **[FreeTextSearchWithDebounce.jsx](./frontend/src/components/FreeTextSearchWithDebounce.jsx)**

A search input component that debounces user input for efficient querying.

### **[MultiSelect.jsx](./frontend/src/components/MultiSelect.jsx)**

A component that allows selecting multiple status options for filtering.

### **[SearchAndFilterSection.jsx](./frontend/src/components/SearchAndFilterSection.jsx)**

A section combining the search and filter functionality.

### **[useApi.jsx](./frontend/src/utils/useApi.jsx)**

A custom hook for managing API interactions, including fetching and updating data.

## **9. Backend API**

### **API Endpoints**

- **User Login**: `POST /users/login`
- **Get All Users**: `GET /users`
- **Update User Status**: `PUT /users`
- **Get Status List**: `GET /status`

### **Controllers**

- **[user-controller.js](./backend/controller/user-controller.js)**: Handles user-related routes and logic.
- **[status-controller.js](./backend/controller/status-controller.js)**: Manages status-related routes and logic.

### **Data Access Layer (DAL)**

- **[user-dal.js](./backend/dal/user-dal.js)**: Interacts with the database to manage user data.
- **[status-dal.js](./backend/dal/status-dal.js)**: Handles database queries related to statuses.

### **Services**

- **[user-service.js](./backend/service/user-service.js)**: Contains business logic for user-related operations.
- **[status-service.js](./backend/service/status-service.js)**: Manages logic for status-related tasks.

## **10. Error Handling**

### **Frontend**

- **Global Error Boundary**: Any uncaught errors are captured by the `ErrorFallback` component, which provides user-friendly feedback.
- **API Errors**: Handled within the `useApi` hook and displayed to the user through various UI components, such as inline alerts.

### **Backend**

- **Server Errors**: Custom errors are handled by the `error-handler.js` middleware and sent as structured responses to the client.

## **11. Contributing**

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the established coding conventions and include detailed commit messages.

## **12. License**

This project is licensed under the MIT License - see the LICENSE file for details.
```

