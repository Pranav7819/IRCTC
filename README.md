Train Ticketing System
Overview

The Train Ticketing System is a web application designed to mimic an IRCTC-like e-ticketing platform. The system allows admins to manage train schedules and pricing, while customers can browse trains, book tickets, and manage their bookings.

Tech Stack

Frontend: React.js

Backend: Node.js with Express.js

Database: MongoDB

Default Admin Credentials

Email: admin@example.com

Password: admin123

Setup Instructions

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend directory and add your environment variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/train-ticketing
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

Start the backend server:

npm run dev

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend development server:

npm start

Running the Application

Ensure that the backend server is running on http://localhost:5000.

The frontend will be available at http://localhost:3000.

You can access the application in your web browser.

Features

Admin management of train schedules and pricing.

Customer browsing of available trains and booking tickets.

Booking history and cancellation functionality.

Search functionality for quick train lookup.

Contributing

Feel free to fork the repository and submit pull requests for any improvements or bug fixes.

License

This project is licensed under the MIT License.
