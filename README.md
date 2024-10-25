# KickReserve ⚽️

KickReserve is a full-stack web application designed to streamline the process of booking soccer fields. It allows users to easily reserve available fields while providing administrators with tools to manage reservations efficiently.

## 🌟 Features

- User-friendly interface for field reservations
- Admin dashboard for reservation management
- Real-time availability updates
- Automatic status updates for past reservations
- Secure admin authentication
- Persistent user identification without account creation

## 🏗 Architecture

The application follows the Model-View-Controller (MVC) architecture with an additional service layer for improved modularity. It's divided into two main parts:

1. Client (Frontend)
2. Server (Backend)

### Technology Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Authentication: JWT, bcrypt
- Task Scheduling: node-cron

## 🗄 Database Structure

The PostgreSQL database consists of four main tables:

1. users
2. admin
3. reservations
4. fields

## WorkFlow

## 👥 User Flow

1. User visits the site and gets a UUID (stored in localStorage)
2. User selects a field, date, and time for reservation
3. User fills in personal details and confirms the reservation
4. User can view their active reservations using their UUID

## 👨‍💼 Admin Flow

1. Admin logs in through the admin portal
2. Admin can view reservations for specific dates
3. Admin can modify or cancel reservations
4. Admin can manage field availability

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/KickReserve.git
   cd KickReserve
   ```

2. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Start the server:
   ```
   cd server && node app.js
   ```

4. In a new terminal, start the client:
   ```
   cd client && npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 🔒 Security

- Admin passwords are hashed using bcrypt before storage
- JWT is used for admin authentication
- Users are identified using UUID stored in localStorage

## 🔄 Cron Jobs

The application uses node-cron to automatically update reservation statuses once their date has passed.