# 🌾 Ration Booking System

A modern, full-featured Public Distribution System (PDS) web application built with React and Vite. This system enables efficient management of ration bookings with a beautiful glassmorphic UI featuring an orange, black, and yellow color scheme.

## ✨ Features

### 👥 User Features
- **User Registration & Authentication** - Secure login system with ration card verification
- **Slot Booking** - Book ration distribution slots for the first 5 days of each month
- **Booking Management** - View, track, and cancel active bookings
- **Real-time Status Updates** - Track booking status (Booked, Delivered, Cancelled)
- **Month-based Restrictions** - One booking per month per user

### 🔐 Admin Features
- **Admin Dashboard** - Comprehensive view of all bookings
- **Status Management** - Mark bookings as delivered
- **Date Filtering** - Filter bookings by specific dates
- **User Information** - View detailed user and ration card information

## 🎨 Design Features

- **Modern Glassmorphic UI** - Beautiful glass-effect cards with backdrop blur
- **Orange/Black/Yellow Theme** - Vibrant and eye-catching color scheme
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Smooth Animations** - Floating elements, glows, and hover effects
- **Enhanced UX** - Intuitive interface with clear visual feedback

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom glassmorphic effects
- **State Management**: React Context API
- **API Client**: Axios
- **Backend**: JSON Server (Mock REST API)
- **Routing**: React Router DOM
- **Notifications**: React Toastify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Chanu716/public_distribution_system.git
   cd public_distribution_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Start the JSON server** (in a separate terminal)
   ```bash
   npx json-server db.json --port 3000
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - API: `http://localhost:3000`

## 👤 Default Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin

### User Account
- **Email**: rama@example.com
- **Password**: password
- **Ration Card**: RC123456

## 📁 Project Structure

```
ration-booking-system/
├── src/
│   ├── api/              # API configuration
│   ├── components/       # Reusable components
│   │   ├── AdminBookingsTable.jsx
│   │   ├── BookingCard.jsx
│   │   ├── BookingForm.jsx
│   │   └── CustomCursor.jsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── UserDashboard.jsx
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles & theme
│   └── main.jsx          # App entry point
├── db.json               # Mock database
├── package.json
└── vite.config.js
```

## 🎯 Key Features Implementation

### Booking Rules
- Bookings allowed only from 1st to 5th of each month
- One active booking per user per month
- Automatic month validation and conflict detection

### Status Flow
1. **Booked** - Initial state when slot is reserved
2. **Delivered** - Marked by admin after distribution
3. **Cancelled** - User cancellation (only before delivery)

### Glassmorphic Design
- Custom backdrop blur effects
- Gradient overlays with orange/yellow accents
- Enhanced shadows and glows
- Smooth transitions and hover states

## 🔧 Configuration

The application uses the following configuration:

- **API Base URL**: `http://localhost:3000` (configured in `src/api/api.js`)
- **Dev Server**: Port 5173 (Vite default)
- **Database**: `db.json` (JSON Server)

## 📱 API Endpoints

- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `GET /bookings` - Fetch all bookings (with filters)
- `POST /bookings` - Create new booking
- `PATCH /bookings/:id` - Update booking status
- `DELETE /bookings/:id` - Delete booking
- `GET /slotWindows` - Fetch available time slots

## 🎨 Theme Customization

The theme uses CSS custom properties defined in `src/index.css`:

- `--color-react-blue`: #FF8C00 (Orange)
- `--color-react-blue-glow`: rgba(255, 140, 0, 0.5)
- Custom glassmorphic card styles
- Orange/Yellow gradient buttons

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Chanu716**
- GitHub: [@Chanu716](https://github.com/Chanu716)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React + Vite
