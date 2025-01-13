# Food Delivery System

## Project Description

The **Food Delivery System** is a full-stack web application designed to simulate a real-world food delivery service. It allows users to browse menu items, add them to a cart, place orders, and track their order history. The system features user authentication, menu management, and order processing with a responsive user interface.

---

## Features

### Backend (Node.js, Express, MongoDB)
- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Menu Management**: CRUD operations for menu items (Create, Read, Update, Delete).
- **Order Management**: Place orders, calculate total amounts, and view order history.
- **Data Validation & Error Handling**: Robust error handling and input validation.

### Frontend (React.js)
- **Login Page**: Secure user authentication with JWT.
- **Menu Page**: Display menu items with options to add, edit, or delete items.
- **Cart Component**: Add menu items to a cart with customizable quantities.
- **Order Page**: Review cart items, place orders, and view order history.
- **State Management**: Implemented using React Context API.
- **Responsive UI**: Designed with Material-UI for mobile and desktop views.

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas account or local MongoDB instance

### Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harishgowda120/full-stack-task-management-app.git
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to Frontend Folder**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the React App**
   ```bash
   npm start
   ```

---

## Deployment

### Backend Deployment
- **Platform**: Heroku/Render/Railway
- **Command**:
  ```bash
  git push heroku main
  ```

### Frontend Deployment
- **Platform**: Vercel/Netlify
- **Command**:
  ```bash
  vercel deploy
  ```

---

## Assumptions
- All users are required to register before placing orders.
- Only authenticated users can access menu and order features.
- Admin rights are required for menu management (Add/Edit/Delete).

## Challenges
- Implementing secure user authentication with JWT.
- Managing state across components using Context API.
- Ensuring smooth integration between frontend and backend APIs.

## Limitations
- No payment gateway integration.
- No role-based access control for admin and regular users.
- Limited scalability without advanced caching or load balancing.

---

## Contact
For any questions or feedback, please contact:

**Developer:** Harish Gowda N  

