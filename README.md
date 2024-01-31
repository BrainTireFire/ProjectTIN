# Project for TIN Subject

## Description
This full-stack web application is built using React for the frontend and Express.js for the backend. The application aims to meet specific requirements and includes additional functionalities to enhance user experience and security.

# Requirements

## Database Structure:
- At least 3 connected tables in the database, including a many-to-many relationship with an additional column in the joining table.
- At least 3 different types of columns.
- At least 2 columns in each table (excluding primary keys).

## Functionality:
- CRUD operations on database records.
- Displaying a list of all records for each table (only essential columns).
- Displaying detailed views (all columns + records connected through relationships).
- Data validation on both client and server sides.

## Authentication:
- User registration and login with necessary database tables.
- Different functionalities based on user status (logged in/guest), e.g., only logged-in users can modify data.
- Pagination for displayed lists.

## Advanced Features
- Frontend as a Single Page Application (SPA).
- User roles (e.g., logged in, guest, administrator) with distinct functionalities.
- Resource-level permissions (e.g., a client can only view their orders, a manager can only view and update employee data within their department).
- Internationalization (support for at least 2 languages).

# Project Structure

## The project is organized into two main directories:
- `frontend`: Contains the React application.
- `backend`: Contains the Express.js application.

Each directory has its own set of files and dependencies to manage frontend and backend functionalities separately.

# Usage
To run the project locally, follow these steps:

1. **Prerequisites:**
   - Install Node.js and npm on your machine.

2. **Installation:**
   - Clone the repository: `git clone https://github.com/BrainTireFire/ProjectTIN.git`
    
3. **Running the Application:**
   - Start the backend server: `cd ../API && npm start`
   - Start the frontend application: `cd ../client && npm start`

4. **Database Setup:**
   - Set up your MongoDB database with the necessary collections and relationships.

# Contributing
Feel free to contribute to the project by opening issues or pull requests.
