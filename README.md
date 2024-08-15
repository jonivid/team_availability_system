# **Workers Management System Monorepo**

This monorepo contains both the frontend and backend components for a Workers Management System. The frontend is a React-based application for managing worker statuses, searching contacts, and updating information in real-time. The backend is built with Node.js and Express, providing a RESTful API for the frontend to interact with.

## **1. Project Overview**

The Workers Management System allows users to manage worker statuses, search for contacts, and update user information through an interactive React frontend. The backend provides the necessary APIs to fetch, update, and manage data securely.

## **2. Features**

- **User Authentication**: Secure login system with session management.
- **Status Management**: View and update the current status of the logged-in user.
- **Search and Filter**: Efficiently search for and filter workers based on status and other criteria using debounced inputs.
- **Error Handling**: Robust error handling across the application, with real-time feedback to the user.

## **3. Database Setup**

The database for this project is provided as an SQL dump file. The dump includes all necessary tables, relationships, and sample data required to run the application.

### **Importing the SQL Dump**

1. **Locate the SQL Dump:**

   - The SQL dump file `pub_plus_dump.sql` is located in the `database/` directory of this project.

2. **Create a New Database:**

   - Open your MySQL client and create a new database:
     ```sql
     CREATE DATABASE pub_plus_db;
     ```

3. **Import the SQL Dump:**

   - Import the SQL dump into your new database using the command:
     ```bash
     mysql -u username -p pub_plus_db < ./database/pub_plus_dump.sql
     ```
   - Replace `username` with your MySQL username.

4. **Verify the Import:**
   - After the import is complete, verify that the tables and data have been correctly loaded by running:
     ```sql
     SHOW TABLES IN pub_plus_db;
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

Both the frontend and backend of this project require environment variables to be configured. You need to create `.env` files in the root of the `frontend` and `backend` directories. Below are the details for setting up these files.

### **Backend .env**

Create a `.env` file in the `backend` directory with the following content:

```bash
# Port on which the backend server will run
REST_PORT=8001

# MySQL database connection details
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password_here
DB_NAME=pub_plus_db

# Secret key for signing JWT tokens
JWT_SECRET=your_unique_jwt_secret_here
```

Frontend .env
Create a .env file in the frontend directory with the following content:

bash
Copy code

```bash
# Base URL of the backend API
VITE_REST_API=http://localhost:5173
```

### **Environment Variable Details**

- **REST_PORT:** The port on which your backend server will run. The default is set to `8001`, but you can change this to any available port on your machine.
- **DB_HOST:** The hostname or IP address of your MySQL database. Typically, this is `localhost` for local development.
- **DB_USER:** The username for connecting to your MySQL database. If you use a custom username for MySQL, replace `root` with your username.
- **DB_PASS:** The password associated with the MySQL user specified in `DB_USER`. Replace `your_password_here` with your actual MySQL password.
- **DB_NAME:** The name of the MySQL database where your application data will be stored. Replace `pub_plus` with your actual database name if different.
- **JWT_SECRET:** A secret key used for signing JSON Web Tokens (JWT) to secure API endpoints. Replace `your_unique_jwt_secret_here` with a secure and unique string that you generate. This should be kept secret and not shared publicly.
- **VITE_REST_API:** The base URL for your frontend to connect to the backend API. This is typically set to `http://localhost:8001`, assuming your backend is running on `localhost` and port `8001`.

### **Notes:**

- **Security:** Ensure that the `.env` files are added to your `.gitignore` file to prevent them from being pushed to version control, as they contain sensitive information.
- **Customization:** Adjust the values in these `.env` files to match your own development environment and security practices.
- **JWT Secret:** For the `JWT_SECRET`, it's recommended to generate a strong, random string. You can use tools like `openssl rand -base64 32` to generate a secure secret.

Once these files are set up, you can proceed to start the backend and frontend servers as described in the following sections.

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

  ### Test User Login Information

  For testing purposes, the following login credentials can be used:

  - **Username:** yvidal | **Password:** 123456
  - **Username:** acohen | **Password:** 123456
  - **Username:** dtesler | **Password:** 123456
  - **Username:** ymoriss | **Password:** 123456
  - **Username:** drodin | **Password:** 123456
  - **Username:** eking | **Password:** 123456

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
