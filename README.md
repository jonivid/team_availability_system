# **Workers Management System Monorepo**

This monorepo contains both the frontend and backend components for a Workers Management System. The frontend is a React-based application for managing worker statuses, searching contacts, and updating information in real-time. The backend is built with Node.js and Express, providing a RESTful API for the frontend to interact with.

## **1. Project Overview**

The Workers Management System allows users to manage worker statuses, search for contacts, and update user information through an interactive React frontend. The backend provides the necessary APIs to fetch, update, and manage data securely.
## **2. Features**

- **User Authentication**: Secure login system with session management.
- **Status Management**: View and update the current status of the logged-in user.
- **Search and Filter**: Efficiently search for and filter workers based on status and other criteria using debounced inputs.
- **Error Handling**: Robust error handling across the application, with real-time feedback to the user.

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

  ## **6. Running the Project**

### **Running the Backend**

```bash
cd backend
npm start
# or
yarn start
```

The backend server should now be running on the port you specified in `.env`.

### **Running the Frontend**

```bash
cd frontend
npm start
# or
yarn start
```

The frontend should now be running on `http://localhost:5173`.

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
