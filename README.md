
# 🍽️ Kartikesh Restaurant - Credit Management System

A full-stack web application for restaurants to digitally manage customer credits (उधारी), payments, and reports — with complete Marathi language support.

---

## 📌 About

Traditional shopkeepers track customer credit in notebooks, leading to errors and lost payments. This system solves that by providing:

- Digital credit tracking
- Auto balance calculation
- Payment reminders via WhatsApp
- Business reports with PDF export
- Complete data backup

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Single-owner registration with 4-digit PIN login |
| 👥 **Customers** | Add, update, delete, search, filter by village |
| 💰 **Transactions** | Track credit (उधारी) and payments (पैसे भरले) |
| 📊 **Dashboard** | Real-time stats: customers, balance, transactions |
| 📄 **Reports** | Daily, Monthly, Yearly, Pending, Customer-wise (PDF) |
| 🔔 **Reminders** | Overdue payment alerts with WhatsApp integration |
| 📸 **File Upload** | Attach receipts/photos to transactions |
| 💾 **Backup** | Download complete data as ZIP file |
| 🌙 **Dark Mode** | Toggle with persistent preference |
| 🌐 **Marathi UI** | Full Marathi language throughout |

---

## 🛠️ Tech Stack

**Backend**
- Java 17
- Spring Boot 3.x
- Spring Data JPA + Hibernate
- Spring Security
- MySQL 8
- iTextPDF (for PDF reports)
- Maven

**Frontend**
- React 18
- React Router v6
- Zustand (state management)
- Axios (HTTP client)
- Tailwind CSS 3
- React Icons
- React Hot Toast

---

## 📁 Project Structure

```
Kartikesh-Restaurant-Credit-Managment-System/
│
├── vyapari-mitra-backend/          # Spring Boot backend
│   ├── src/main/java/.../
│   │   ├── config/                 # Configurations
│   │   ├── controller/             # REST controllers
│   │   ├── dto/                    # Data transfer objects
│   │   ├── exception/              # Error handling
│   │   ├── model/                  # JPA entities
│   │   ├── repository/             # Data access
│   │   ├── security/               # Auth config
│   │   ├── service/                # Business logic
│   │   └── utils/                  # Utilities
│   └── src/main/resources/
│       └── application.properties
│
└── vyapari-mitra-frontend/         # React frontend
    ├── public/
    └── src/
        ├── api/                    # Axios & endpoints
        ├── components/             # Reusable components
        ├── pages/                  # Page components
        └── store/                  # Zustand stores
```

---

## 🚀 Setup & Installation

### Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL 8+
- Node.js 18+

---

### Backend Setup

**1. Navigate to backend**
```bash
cd vyapari-mitra-backend
```

**2. Create `src/main/resources/application.properties`**
```properties
# Server
server.port=8080

# Database (auto-creates DB if not exists)
spring.datasource.url=jdbc:mysql://localhost:3306/vyapari_mitra_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# File Upload
file.upload-dir=uploads/
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Backup
backup.dir=backups
```

**3. Run the backend**
```bash
mvn spring-boot:run
```

**Backend URL:** `http://localhost:8080`
**Swagger UI:** `http://localhost:8080/swagger-ui.html`

---

### Frontend Setup

**1. Navigate to frontend**
```bash
cd vyapari-mitra-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
```env
REACT_APP_API_URL=http://localhost:8080
```

**4. Run the frontend**
```bash
npm start
```

**Frontend URL:** `http://localhost:3000`

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register owner (one-time only) |
| POST | `/api/auth/login` | Login with mobile + PIN |
| GET | `/api/auth/check-owner` | Check if owner exists |
| GET | `/api/auth/owner-details` | Get current owner |

### 👥 Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customers` | Create customer |
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/{id}` | Get customer by ID |
| PUT | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer |
| GET | `/api/customers/search?keyword=` | Search customers |
| GET | `/api/customers/balance` | Customers with balance |
| GET | `/api/customers/village/{village}` | Filter by village |

### 💰 Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions/credit` | Add credit (उधारी) |
| POST | `/api/transactions/payment` | Add payment |
| GET | `/api/transactions/customer/{id}` | Customer transactions |
| GET | `/api/transactions/today` | Today's transactions |
| GET | `/api/transactions/pending` | Pending payments |
| GET | `/api/transactions/between?start=&end=` | Date range |
| GET | `/api/transactions/balance/{id}` | Customer balance |
| DELETE | `/api/transactions/{id}` | Delete transaction |

### 📊 Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/home` | Full dashboard data |
| GET | `/api/dashboard/stats` | Quick statistics |

### 📄 Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/daily?date=` | Daily report |
| GET | `/api/reports/monthly?year=&month=` | Monthly report |
| GET | `/api/reports/yearly?year=` | Yearly report |
| GET | `/api/reports/pending` | Pending report |
| GET | `/api/reports/customer/{id}` | Customer report |

### 🔔 Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reminders/today` | Today's reminders |
| GET | `/api/reminders/week` | This week's reminders |

### 📁 Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files/upload` | Upload file |
| POST | `/api/files/upload/transaction/{id}` | Upload for transaction |
| GET | `/api/files/view/{fileName}` | View file |
| DELETE | `/api/files/delete/{fileName}` | Delete file |

### ⚙️ Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings/shop` | Get shop details |
| PUT | `/api/settings/shop` | Update shop |
| PUT | `/api/settings/pin` | Change PIN |
| POST | `/api/settings/backup` | Create backup |
| GET | `/api/settings/backup/list` | List backups |
| GET | `/api/settings/backup/download/{file}` | Download backup |
| DELETE | `/api/settings/backup/{file}` | Delete backup |

---

## 🗄️ Database Schema

### `owners`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | Primary Key |
| shop_name | VARCHAR(100) | Required |
| owner_name | VARCHAR(100) | Required |
| mobile | VARCHAR(10) | Unique, Required |
| pin | VARCHAR(4) | Required |
| registered_at | DATETIME | Auto |

### `customers`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | Primary Key |
| owner_id | BIGINT | FK → owners.id |
| name | VARCHAR(100) | Required |
| mobile | VARCHAR(10) | Optional |
| address | TEXT | Optional |
| village | VARCHAR(50) | Optional |
| total_credit | DECIMAL(15,2) | Auto-calculated |
| total_paid | DECIMAL(15,2) | Auto-calculated |
| balance | DECIMAL(15,2) | Auto-calculated |
| last_transaction_date | DATETIME | Auto |
| created_at | DATETIME | Auto |

### `transactions`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | Primary Key |
| customer_id | BIGINT | FK → customers.id |
| owner_id | BIGINT | FK → owners.id |
| type | VARCHAR(10) | CREDIT or PAYMENT |
| amount | DECIMAL(15,2) | Required |
| transaction_date | DATE | Required |
| due_date | DATE | Optional |
| description | TEXT | Optional |
| photo_path | VARCHAR(255) | Optional |
| created_at | DATETIME | Auto |

> **Note:** Database and tables are auto-created on first run.

---

## 🔑 How to Use

### First Time Setup

1. Open `http://localhost:3000`
2. Click **Register** (only once)
3. Fill in:
   - Shop Name
   - Owner Name
   - Mobile (10 digits)
   - PIN (4 digits)
4. Login with Mobile + PIN

### Daily Usage

1. **Add Customer** → Customers page → "नवीन ग्राहक"
2. **Add Credit** → Transactions → "उधारी" (credit)
3. **Add Payment** → Transactions → "पैसे भरले" (payment)
4. **Check Dashboard** → View all stats
5. **Send Reminders** → Customers page → WhatsApp icon
6. **Generate Reports** → Reports page → Select type → Generate
7. **Backup Data** → Settings → "बॅकअप तयार करा"

---

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Customers
![Customers](docs/screenshots/customers.png)

### Transactions
![Transactions](docs/screenshots/transactions.png)

### Reports
![Reports](docs/screenshots/reports.png)

> Add your screenshots in `docs/screenshots/` folder.

---

## 🚀 Deployment

### Backend — Build JAR
```bash
cd vyapari-mitra-backend
mvn clean package
java -jar target/*.jar
```

### Frontend — Build for production
```bash
cd vyapari-mitra-frontend
npm run build
```

Deploy the `build/` folder to Netlify, Vercel, or any static host.

---

## 📋 Roadmap

### ✅ Completed
- [x] Single-owner registration
- [x] PIN-based authentication
- [x] Customer management (CRUD)
- [x] Credit/Payment tracking
- [x] Dashboard with stats
- [x] Reports (Daily/Monthly/Yearly/Pending/Customer)
- [x] WhatsApp reminders
- [x] File uploads
- [x] Backup system
- [x] Dark mode
- [x] Marathi language

### 🚧 Future Plans
- [ ] Dashboard charts
- [ ] Print bill feature
- [ ] Excel export
- [ ] SMS notifications
- [ ] Cloud backup
- [ ] Mobile app

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Kartikesh Kolekar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

## 📞 Contact

**Kartikesh Kolekar**

- GitHub: [@KartikesKolekar01](https://github.com/KartikesKolekar01)
- Email: your-email@gmail.com

**Repository:** [Kartikesh-Restaurant-Credit-Management-System](https://github.com/KartikesKolekar01/Kartikesh-Restaurant-Credit-Management-System)

---

<div align="center">

### 🍽️ कार्तिकेश रेस्टॉरंट 🍽️
**हिशोब सोपा, व्यवसाय सुरेख!**

