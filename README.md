# Sarthi 1.0 - All in one Campus Utility

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: In Development](https://img.shields.io/badge/status-in%20development-orange.svg)

A full-stack web application designed to facilitate cab pooling, ride-sharing, buy/sell and others within the IIIT Guwahati campus community. This project aims to connect students and faculty, making travel more affordable, social, and environmentally friendly.

---

## Project Overview

As of now Sarthi 1.0 allows users to book a cab and make it available for others to join, or to discover and join existing rides created by other campus members. By sharing rides, especially for common destinations like the airport, users can significantly reduce travel costs, build community connections, and minimize their carbon footprint. The platform prioritizes safety by ensuring that all users are members of the campus community.

---

## Features

### Implemented ✅
-   **MERN Stack Foundation**: Set up a robust project structure with a Node.js/Express backend and a React (Vite) frontend.
-   **RESTful API Endpoint**: Created an initial `/api/status` endpoint to confirm backend functionality.
-   **Test-Driven Development**: Integrated Jest and Supertest for backend API testing to ensure reliability.
-   **Collaborative Workflow**: Established a Git repository with a comprehensive `.gitignore` file for safe team collaboration.
-   **Client-Side Routing**: Implemented `react-router-dom` to manage navigation.
-   **Modern UI Components**: Developed a stylish, responsive landing page as the entry point to the application.

### Planned ⏳
-   **User Authentication**: Secure sign-up and login for students and faculty.
-   **Ride Management**: Allow users to create, view, and manage their cab bookings.
-   **Ride Discovery**: A searchable interface for users to find available rides based on date and destination.
-   **Join Request System**: Functionality for users to request to join a ride, with notifications sent to the ride creator.
-   **Automatic Cost Splitting**: The system will automatically recalculate and split the cost among all passengers as more people join.

---

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Frontend**: React, Vite
-   **Database**: MongoDB (with Mongoose)
-   **Testing**: Jest, Supertest
-   **Version Control**: Git & GitHub

---

## Project Structure

```
/
├── backend/
│   ├── __tests__/      # Backend API tests
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── controllers/    # Route logic
│   ├── .env            # Environment variables
│   ├── server.js       # Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable React components
    │   ├── pages/      # Page components
    │   ├── App.jsx     # Main app component with routing
    │   └── main.jsx    # Frontend entry point
    ├── .gitignore
    └── package.json
```

---

## API Endpoints

| Method | Endpoint                  | Description                               | Status      |
| :----- | :------------------------ | :---------------------------------------- | :---------- |
| `GET`  | `/api/status`             | Checks if the backend server is running.  | Implemented |
| `POST` | `/api/rides`              | Creates a new ride booking.               | Planned     |
| `GET`  | `/api/rides/search`       | Searches for available rides.             | Planned     |
| `POST` | `/api/rides/:id/join`     | Requests to join an existing ride.        | Planned     |
| `POST` | `/api/auth/register`      | Registers a new user.                     | Planned     |
| `POST` | `/api/auth/login`         | Logs in a user.                           | Planned     |

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   MongoDB (either local or via a service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ringerH/Sarthi-1.0
    cd sarthi
    ```

2.  **Setup the Backend:**
    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file and add your MongoDB connection string
    # MONGO_URI=your_mongodb_connection_string

    # Start the backend server
    npm run dev
    ```
    The backend will be running on `http://localhost:5001`.

3.  **Setup the Frontend:**
    ```bash
    # Navigate to the frontend directory from the root
    cd frontend

    # Install dependencies
    npm install

    # Start the frontend development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

---

## Running Tests

To run the automated tests for the backend API, navigate to the `/backend` directory and run:

```bash
npm test
```

---

## Contributing

Contributions are welcome! Please follow the feature branch workflow to contribute to this project.

1.  **Clone the repository** and set it up locally.
2.  **Create a new feature branch** from the `main` branch (`git checkout -b feature/your-feature-name`).
3.  **Make your changes** and commit them with clear, descriptive messages.
4.  **Push your branch** to the remote repository (`git push origin feature/your-feature-name`).
5.  **Open a Pull Request** on GitHub, detailing the changes you've made.
6.  Wait for your PR to be reviewed. Make any required changes based on feedback.
7.  Once approved, your changes will be merged into the `main` branch.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
