# Pratik_Jadhav-Backend_fullstack

This project is a backend application built with Node.js, Express, and MongoDB.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://cloud.mongodb.com/v2/652cafa511b5947d8be234e2#/overview) (ensure you have a cloud instance like MongoDB Atlas)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Pratik4230/Pratik_Jadhav-Backend_fullstack.git
   cd pratik_jadhav-backend_fullstack
   ```

2. **Install Dependencies:**

   Install the required Node.js dependencies using npm:

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   PORT=3030

   ALLOWED_ORIGIN=http://localhost:5173

   MONGODB_URL=Your MongoDB connection string  (Example: mongodb+srv://YourName:YourPassword@cluster0.cdztx.mongodb.net/cric )
   ``
   ```

## Running the Application

1. **Start the Server:**

   - For production mode:

     ```bash
     npm run start
     ```

   - For development mode (with live-reload using `nodemon`):
     ```bash
     npm run dev
     ```

2. **Access the Application:**

   The server will run on the specified `PORT` in the `.env` file. Open your browser and navigate to:

   ```
   http://localhost:3030
   ```

## Dependencies

### Main Dependencies:

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `dotenv`: Loads environment variables from `.env` file
- `cors`: Enables Cross-Origin Resource Sharing
- `socket.io`: Real-time bidirectional event-based communication

### Dev Dependencies:

- `nodemon`: Automatically restarts the application during development

## Author

**Pratik Jadhav**

Feel free to reach out for any questions!
