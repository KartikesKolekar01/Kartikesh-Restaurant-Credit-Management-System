# Vyapari Mitra - Credit Management Frontend

A modern React-based web application for managing credit and transactions in small shops. Built with React, Tailwind CSS, and Axios.

## 🚀 Features

- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful Marathi-first UI
- 👥 Customer management system
- 💰 Credit and payment tracking
- 📊 Reports and analytics
- 🔔 Payment reminders
- 🔐 Secure authentication
- 💾 Backup functionality

## 📋 Prerequisites

- Node.js 14+ and npm
- Backend API running on `http://localhost:8080`

## 🛠️ Installation

### 1. Clone the Repository
```bash
cd vyapari-mitra-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

Edit `.env` if your backend is on a different URL:
```
REACT_APP_API_URL=http://localhost:8080
```

### 4. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
src/
├── api/
│   ├── axios.js           # Axios configuration
│   └── endpoints.js       # All API endpoints
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   ├── CreateCustomerModal.jsx
│   ├── EditCustomerModal.jsx
│   ├── AddTransactionModal.jsx
│   ├── RecentTransactions.jsx
│   ├── PendingReminders.jsx
│   └── TransactionHistory.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Customers.jsx
│   ├── CustomerDetail.jsx
│   ├── Transactions.jsx
│   ├── Reports.jsx
│   ├── Settings.jsx
│   └── NotFound.jsx
├── store/
│   └── authStore.js       # Zustand store for auth
├── App.jsx
├── index.js
└── index.css
```

## 🔐 Demo Credentials

```
Mobile: 9876543210
PIN: 1234
```

## 🎯 Main Features Explained

### 1. Authentication
- Register new shop owners
- Login with mobile and PIN
- Session management with cookies

### 2. Customer Management
- Add/edit/delete customers
- Search customers by name or mobile
- View customer details and transaction history
- Track credit and payment history

### 3. Transactions
- Add credit (उधारी)
- Record payments (पैसे)
- View transaction history
- Filter by type and date range

### 4. Reports
- Daily reports
- Monthly reports
- Yearly reports
- Top defaulters list
- Pending payments report

### 5. Settings
- Update shop details
- Change PIN
- View storage information
- Create backup
- Logout

## 🛠️ Technology Stack

- **React 18** - UI framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Zustand** - State management
- **React Icons** - Icons
- **React Hot Toast** - Notifications
- **Date-fns** - Date manipulation

## 🌐 API Integration

All API endpoints are configured in `src/api/endpoints.js`. The application connects to the backend API with the following base URL:

```
http://localhost:8080
```

### Key Endpoints

- Authentication: `/api/auth/*`
- Customers: `/api/customers/*`
- Transactions: `/api/transactions/*`
- Dashboard: `/api/dashboard/*`
- Reports: `/api/reports/*`
- Settings: `/api/settings/*`

See the API documentation for complete endpoint details.

## 📱 Mobile Responsive

The app is fully responsive and works perfectly on:
- Desktop browsers
- Tablets
- Mobile phones

## 🎨 Customization

### Change API URL
Edit `.env` file:
```
REACT_APP_API_URL=http://your-api-url.com
```

### Customize Colors
Edit `tailwind.config.js` to change theme colors

### Language
The app is in Marathi. To change text, search for Marathi strings in components.

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'build' folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:8080`
- Check CORS settings on backend
- Verify `.env` file has correct API URL

### Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Use different port
PORT=3001 npm start
```

## 📝 License

This project is confidential and for internal use only.

## 👨‍💻 Support

For issues or questions, contact the development team.

---

**Happy Coding! 🎉**
