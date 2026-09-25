# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Install Node.js
If you don't have Node.js installed, download from: https://nodejs.org/

### Step 2: Navigate to Project
```bash
cd vyapari-mitra-frontend
```

### Step 3: Install Dependencies
```bash
npm install
```
⏱️ Takes 2-3 minutes

### Step 4: Start the App
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

### Step 5: Login
Use demo credentials:
- **Mobile**: 9876543210
- **PIN**: 1234

## 📋 What You Get

After setup, you'll have a fully functional credit management app with:

✅ Customer Management
✅ Credit Tracking  
✅ Payment Recording
✅ Reports & Analytics
✅ Reminders
✅ Settings & Backup

## 🔧 Backend Requirements

Make sure your backend API is running on:
```
http://localhost:8080
```

If your backend is on a different URL, edit `.env`:
```
REACT_APP_API_URL=http://your-api-url:port
```

## 📱 Main Features at a Glance

### Dashboard 📊
- View all important metrics
- Recent transactions
- Pending reminders

### Customers 👥
- Add new customers
- Edit customer details
- View customer transaction history
- Search customers

### Transactions 💰
- Add credit (उधारी)
- Record payments (पैसे)
- View all transactions
- Filter by date and type

### Reports 📈
- Daily/Monthly/Yearly reports
- Top defaulters
- Pending payments

### Settings ⚙️
- Update shop details
- Change security PIN
- Create backup
- View storage

## 🎯 Common Tasks

### Add a New Customer
1. Click "Customers" in sidebar
2. Click "नवीन ग्राहक" button
3. Fill in details and submit

### Record a Credit Transaction
1. Go to Customers
2. Click on customer name
3. Click "उधारी जोडा"
4. Enter amount and submit

### Generate a Report
1. Click "Reports" in sidebar
2. Select report type (Daily/Monthly/Yearly)
3. Click "अहवाल तयार करा"

### Change PIN
1. Click Settings in top right
2. Scroll to "PIN बदला"
3. Enter old and new PIN
4. Submit

## 🐛 Common Issues

### Port 3000 Already in Use?
```bash
PORT=3001 npm start
```

### Backend Not Connecting?
- Check API URL in `.env`
- Ensure backend is running
- Check if CORS is enabled on backend

### Dependencies Installation Failed?
```bash
npm cache clean --force
npm install
```

## 📚 Learn More

- Full documentation: See `README.md`
- API Reference: Check API documentation
- Component structure: Browse `src/components/`

## 🎉 You're All Set!

Start using Vyapari Mitra and manage your shop's credit efficiently!

## 📞 Need Help?

If you face any issues:
1. Check the README.md
2. Review error messages
3. Check browser console (F12)
4. Verify backend is running
5. Check network requests in DevTools

---

**Happy Managing! 🎯**
