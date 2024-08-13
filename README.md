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
