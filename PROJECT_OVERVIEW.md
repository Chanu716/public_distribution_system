# Public Distribution System - Project Overview

## 📋 Executive Summary

The **Public Distribution System (PDS)** is a modern web-based application designed to streamline ration booking and distribution management. It provides a user-friendly interface for citizens to book ration slots and enables administrators to manage the distribution system efficiently.

---

## 🏗️ Project Architecture

### Tech Stack
- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Backend**: JSON Server (Mock API)
- **Notifications**: React Toastify
- **Build Tool**: Vite (Modern ES modules bundler)

### Database
- JSON Server running on `localhost:4000`
- Mock database with users, bookings, and slot windows

---

## 📁 Complete Project Structure

```
public_distribution_system/
│
├── src/
│   ├── api/
│   │   └── api.js                 # Axios instance for API calls
│   │
│   ├── components/
│   │   ├── AdminBookingsTable.jsx # Admin booking management table
│   │   ├── BookingCard.jsx         # User booking display card
│   │   ├── BookingForm.jsx         # Form to create new bookings
│   │   ├── CustomCursor.jsx        # Custom cursor component
│   │   └── ProtectedRoute.jsx      # Route protection wrapper
│   │
│   ├── context/
│   │   └── AuthContext.jsx         # Global authentication context
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx           # User login interface
│   │   ├── RegisterPage.jsx        # User registration interface
│   │   ├── UserDashboard.jsx       # User booking dashboard
│   │   └── AdminDashboard.jsx      # Admin management dashboard
│   │
│   ├── utils/
│   │   └── auth.js                 # Authentication utilities
│   │
│   ├── App.jsx                     # Root component with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles
│
├── public/                         # Static assets
├── db.json                         # JSON Server database
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
└── README.md                        # Project documentation
```

---

## 🔑 Main Components Overview

### 1. **api.js** (API Integration Layer)
**Purpose**: Centralized API configuration using Axios

```javascript
- Base URL: http://localhost:4000
- Default headers: application/json
- All API calls route through this single instance
```

**Key Features**:
- Consistent configuration for all HTTP requests
- Easy to add interceptors or middleware
- Simplified error handling

---

### 2. **AuthContext.jsx** (State Management)
**Purpose**: Global authentication state management using React Context API

**Features**:
- `user` - Current logged-in user object
- `login()` - Store user in context and localStorage
- `logout()` - Clear user session
- `loading` - Track initial authentication check
- `useAuth()` hook - Easy access to auth context

**Benefits**:
- No prop drilling needed
- Persistent user session (localStorage)
- Available across entire app

---

### 3. **ProtectedRoute.jsx** (Security)
**Purpose**: Route protection based on user role

**Features**:
- Checks if user is authenticated
- Validates user role (admin/user)
- Redirects unauthenticated users to login
- Prevents unauthorized access
- Shows loading state during auth check

**Roles**:
- `user` - Regular citizen accessing booking features
- `admin` - Administrator managing distributions

---

### 4. **auth.js** (Utility Functions)
**Purpose**: Authentication helper functions

```javascript
Functions:
- getCurrentUser()     - Retrieve logged-in user from localStorage
- isAuthenticated()    - Check if user is logged in
- isAdmin()           - Check if user has admin role
- loginUser()         - Save user session to localStorage
- logoutUser()        - Clear user session
```

---

### 5. **LoginPage.jsx** (Authentication UI)
**Purpose**: User login interface

**Features**:
- Email & password login
- Form validation
- Error handling with toast notifications
- Auto-redirect based on user role (admin/user)
- Modern glassmorphism UI design
- Animated background effects

**Authentication Flow**:
1. User enters email & password
2. Query JSON Server for matching user
3. If found, login user and redirect to dashboard
4. If not found, show error toast

---

### 6. **RegisterPage.jsx** (User Registration)
**Purpose**: New user registration interface

**Features**:
- Register with name, email, password, ration card ID
- Create new user in database
- Input validation
- Automatic role assignment (user)
- Toast notifications for feedback

---

### 7. **UserDashboard.jsx** (Main User Interface)
**Purpose**: Dashboard for regular users to manage bookings

**Features**:
- View all personal bookings
- Create new bookings via BookingForm
- Display bookings as cards
- Filter out cancelled bookings
- Logout functionality
- Responsive 2-column layout (form + bookings list)
- Sticky navigation bar with user info

**Components Used**:
- BookingForm - Create new bookings
- BookingCard - Display individual bookings
- Navigation with logout button

---

### 8. **AdminDashboard.jsx** (Admin Interface)
**Purpose**: Management panel for administrators

**Features**:
- View all bookings system-wide
- Table format for easy management
- Edit booking status (pending, confirmed, delivered, cancelled)
- Delete bookings
- Manage slot windows
- Logout functionality

---

### 9. **BookingForm.jsx** (Booking Creation)
**Purpose**: Component for creating new ration bookings

**Features**:
- Select booking date
- Choose time slot
- Automatic month calculation
- Submit to database
- Success/error notifications
- Form validation

**Booking Object**:
```javascript
{
  id: string,
  userId: string,
  userName: string,
  rationCardId: string,
  slotDate: "YYYY-MM-DD",
  slotWindow: "HH:MM-HH:MM",
  month: "YYYY-MM",
  status: "pending|confirmed|delivered|cancelled",
  createdAt: timestamp,
  notes: string
}
```

---

### 10. **BookingCard.jsx** (Booking Display)
**Purpose**: Display individual booking details in card format

**Features**:
- Shows all booking information
- Color-coded status badges
- Cancel booking option
- Responsive design
- Status-based styling

**Displayed Information**:
- Booking ID
- Ration Card ID
- Slot Date & Time
- Current Status
- Creation Date

---

### 11. **App.jsx** (Routing Configuration)
**Purpose**: Main application routing setup

**Routes**:
```
/login                    → LoginPage
/register                 → RegisterPage
/user/dashboard          → UserDashboard (Protected: role=user)
/admin/dashboard         → AdminDashboard (Protected: role=admin)
/                        → Redirect to /login
*                        → Not Found page
```

**Features**:
- React Router v7 setup
- AuthProvider wrapper for context
- Toast container configuration
- 404 handling

---

## 📊 Database Schema (db.json)

### Users Collection
```json
{
  "id": "unique_id",
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "role": "user|admin",
  "rationCardId": "RC123456"
}
```

### Bookings Collection
```json
{
  "id": "booking_id",
  "userId": "user_id",
  "userName": "User Name",
  "rationCardId": "RC123456",
  "slotDate": "2025-12-04",
  "slotWindow": "09:00-10:00",
  "month": "2025-12",
  "status": "pending|confirmed|delivered|cancelled",
  "createdAt": "2025-11-30T19:38:13.248Z",
  "notes": ""
}
```

### Slot Windows Collection
```json
{
  "id": "slot_id",
  "startTime": "09:00",
  "endTime": "10:00",
  "capacity": 50,
  "available": 45
}
```

---

## 🔄 Application Flow

### User Flow
```
1. User visits application
   ↓
2. Redirected to /login
   ↓
3. User enters credentials
   ↓
4. System validates against users database
   ↓
5. If valid → Login successful → Redirect to User Dashboard
   If invalid → Show error toast
   ↓
6. User Dashboard:
   - Create new booking (BookingForm)
   - View existing bookings (BookingCard)
   - Cancel bookings
   - Logout
```

### Admin Flow
```
1. Admin logs in with admin credentials
   ↓
2. Redirected to /admin/dashboard
   ↓
3. Admin Dashboard:
   - View all system bookings in table format
   - Edit booking statuses
   - Delete bookings
   - Manage system
   - Logout
```

---

## 🔐 Security Features

1. **Route Protection**
   - ProtectedRoute component validates authentication
   - Role-based access control (user vs admin)
   - Unauthenticated users redirected to login

2. **Session Management**
   - User data stored in localStorage
   - Session persists across page refreshes
   - Logout clears session

3. **Authentication Flow**
   - Email & password verification
   - Role-based routing
   - Protected API endpoints

---

## 🎨 UI/UX Features

1. **Modern Design**
   - Glassmorphism effect for cards
   - Neon borders and glow effects
   - Gradient backgrounds
   - Smooth animations

2. **Responsive Layout**
   - Mobile-first design
   - Tailwind CSS responsive utilities
   - Flexible grid layout

3. **User Feedback**
   - Toast notifications for all actions
   - Loading states
   - Error messages
   - Success confirmations

4. **Accessibility**
   - Proper semantic HTML
   - Clear form labels
   - Keyboard navigation support

---

## 🚀 Running the Application

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup Steps
```bash
# Install dependencies
npm install

# Start both JSON Server and Vite dev server
npm start

# JSON Server: http://localhost:4000
# Vite Dev: http://localhost:5173
```

### Available Scripts
```bash
npm run dev       # Start Vite dev server
npm run server    # Start JSON Server
npm start         # Start both (concurrently)
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

---

## 📈 Key Technologies & Concepts

1. **React Hooks**
   - useState, useEffect, useContext
   - Custom hook: useAuth()

2. **Context API**
   - Global state without Redux
   - Reduces prop drilling

3. **React Router**
   - Dynamic routing
   - Nested routes
   - Route protection

4. **Tailwind CSS**
   - Utility-first CSS
   - Responsive design
   - Custom animations

5. **Axios**
   - HTTP client
   - Centralized configuration
   - Error handling

6. **JSON Server**
   - Mock REST API
   - Rapid development
   - Database simulation

---

## 🎯 Features Summary

✅ User Authentication & Authorization
✅ Role-based Access Control (User/Admin)
✅ Ration Booking Management
✅ Admin Dashboard for System Management
✅ Responsive UI Design
✅ Toast Notifications
✅ Session Persistence
✅ Modern Tech Stack
✅ Modular Component Architecture
✅ Secure Route Protection

---

## 📝 Testing Credentials

**User Account**
- Email: rama@example.com
- Password: password
- Role: user

**Admin Account**
- Email: admin@example.com
- Password: admin
- Role: admin

---

## 🔮 Future Enhancements

1. Database migration to MongoDB/PostgreSQL
2. Backend API with Node.js/Express
3. Email notifications
4. SMS alerts for bookings
5. Payment integration
6. Analytics dashboard
7. Batch booking
8. Real-time notifications
9. Mobile app
10. Advanced filtering & search

---

## 📞 Support & Maintenance

- Check console for debugging
- Review Toast notifications for user feedback
- Use React DevTools for component inspection
- Check Network tab for API calls
- Verify localStorage for session data

