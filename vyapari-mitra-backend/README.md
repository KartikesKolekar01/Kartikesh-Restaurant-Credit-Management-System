# 📊 व्यापारी मित्र (Vyapari Mitra)
## Shopkeeper's Friend - Credit Management System

---

## 📖 Project Overview

**Vyapari Mitra** (व्यापारी मित्र) is a comprehensive **Credit Management System** designed specifically for small shopkeepers and retail businesses in India. It helps manage customer credits (उधारी), track payments, and generate reports - all in **Marathi language** for easy understanding by rural and semi-urban users.

### 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 👤 **Authentication** | Simple PIN-based login with session management |
| 👥 **Customer Management** | Add, update, delete, and search customers |
| 💰 **Transaction Management** | Credit (उधारी) and Payment (पैसे भरले) tracking |
| 📊 **Dashboard** | Real-time statistics and business overview |
| 📈 **Reports** | Daily, Monthly, Yearly, and Pending reports with PDF export |
| 🔔 **Smart Reminders** | Automatic reminders for overdue payments |
| 📸 **File Upload** | Attach photos to transactions |
| 🔍 **Global Search** | Search across customers and transactions |
| ⚙️ **Settings** | Shop details and PIN management |
| 🌐 **Multi-language** | Full Marathi language support |

---

## 🏗️ Technology Stack

### Backend
```
├── Java 17+
├── Spring Boot 3.x
├── Spring Data JPA (Hibernate)
├── Spring Security
├── MySQL / PostgreSQL
├── iTextPDF (Report Generation)
├── SpringDoc OpenAPI (Swagger)
├── Maven
```

### Frontend (Recommended)
```
├── React.js / Next.js
├── Tailwind CSS / Bootstrap
├── Axios for API calls
└── React Router for navigation
```

---

## 📁 Project Structure

```
vyapari-mitra/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/vyaparimitra/vyapari_mitra/
│   │   │       ├── VyapariMitraApplication.java
│   │   │       ├── config/
│   │   │       │   ├── FileStorageConfig.java
│   │   │       │   ├── JacksonConfig.java
│   │   │       │   ├── MessageConfig.java
│   │   │       │   ├── SwaggerConfig.java
│   │   │       │   └── WebConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   ├── CustomerController.java
│   │   │       │   ├── DashboardController.java
│   │   │       │   ├── FileUploadController.java
│   │   │       │   ├── ReminderController.java
│   │   │       │   ├── ReportController.java
│   │   │       │   ├── SearchController.java
│   │   │       │   ├── SettingsController.java
│   │   │       │   ├── TestController.java
│   │   │       │   └── TransactionController.java
│   │   │       ├── dto/
│   │   │       │   ├── CustomerDTO.java
│   │   │       │   ├── LoginRequestDTO.java
│   │   │       │   ├── RegisterRequestDTO.java
│   │   │       │   ├── ReportDTO.java
│   │   │       │   └── TransactionDTO.java
│   │   │       ├── model/
│   │   │       │   ├── Customer.java
│   │   │       │   ├── Owner.java
│   │   │       │   ├── Transaction.java
│   │   │       │   └── enums/
│   │   │       │       ├── PaymentStatus.java
│   │   │       │       └── TransactionType.java
│   │   │       ├── repository/
│   │   │       │   ├── CustomerRepository.java
│   │   │       │   ├── OwnerRepository.java
│   │   │       │   └── TransactionRepository.java
│   │   │       ├── service/
│   │   │       │   ├── CustomerService.java
│   │   │       │   ├── FileStorageService.java
│   │   │       │   ├── OwnerService.java
│   │   │       │   ├── ReportService.java
│   │   │       │   ├── TransactionService.java
│   │   │       │   └── impl/
│   │   │       │       ├── CustomerServiceImpl.java
│   │   │       │       ├── FileStorageServiceImpl.java
│   │   │       │       ├── OwnerServiceImpl.java
│   │   │       │       ├── ReportServiceImpl.java
│   │   │       │       └── TransactionServiceImpl.java
│   │   │       ├── security/
│   │   │       │   ├── OwnerDetailsService.java
│   │   │       │   ├── PinAuthProvider.java
│   │   │       │   └── SecurityConfig.java
│   │   │       ├── exception/
│   │   │       │   ├── FileStorageException.java
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ResourceNotFoundException.java
│   │   │       │   ├── UnauthorizedException.java
│   │   │       │   └── ValidationException.java
│   │   │       └── utils/
│   │   │           ├── Constants.java
│   │   │           ├── DateUtils.java
│   │   │           ├── MarathiMessages.java
│   │   │           └── ReportGenerator.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── messages.properties
│   └── test/
└── uploads/
    └── (uploaded files)
```

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install Java 17+
# Install MySQL 8+
# Install Maven 3.8+
```

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/vyapari-mitra.git
cd vyapari-mitra
```

### Step 2: Setup Database

```sql
CREATE DATABASE vyapari_mitra;
CREATE USER 'vyapari'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON vyapari_mitra.* TO 'vyapari'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Configure Application

```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/vyapari_mitra?useSSL=false&serverTimezone=Asia/Kolkata
spring.datasource.username=vyapari
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

file.upload-dir=uploads
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

server.port=8080
server.servlet.session.timeout=3600
```

### Step 4: Build and Run

```bash
# Build the project
mvn clean package

# Run the application
java -jar target/vyapari-mitra-1.0.0.jar

# Or run with Maven
mvn spring-boot:run
```

### Step 5: Access the Application

```
🌐 API Base URL: http://localhost:8080
📚 Swagger UI: http://localhost:8080/swagger-ui/index.html
📋 API Docs: http://localhost:8080/api-docs
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register shop owner |
| POST | `/api/auth/login` | Login with PIN |
| GET | `/api/auth/check-owner` | Check if owner exists |
| GET | `/api/auth/owner-details` | Get current owner details |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/customers` | Create customer |
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/{id}` | Get customer by ID |
| PUT | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer |
| GET | `/api/customers/search?keyword=` | Search customers |
| GET | `/api/customers/balance` | Get customers with balance |
| GET | `/api/customers/village/{village}` | Filter by village |
| GET | `/api/customers/count` | Get customer count |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions/credit` | Add credit (उधारी) |
| POST | `/api/transactions/payment` | Add payment (पैसे भरले) |
| GET | `/api/transactions/customer/{id}` | Get customer transactions |
| GET | `/api/transactions/today` | Today's transactions |
| GET | `/api/transactions/pending` | Pending payments |
| GET | `/api/transactions/between` | Transactions between dates |
| GET | `/api/transactions/balance/{id}` | Get customer balance |
| DELETE | `/api/transactions/{id}` | Delete transaction |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/daily?date=` | Daily report |
| GET | `/api/reports/monthly?year=&month=` | Monthly report |
| GET | `/api/reports/yearly?year=` | Yearly report |
| GET | `/api/reports/pending` | Pending payments report |
| GET | `/api/reports/customer/{id}` | Customer report |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/home` | Complete dashboard data |
| GET | `/api/dashboard/stats` | Quick stats |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files/upload` | Upload file |
| GET | `/api/files/view/{fileName}` | View file |
| DELETE | `/api/files/delete/{fileName}` | Delete file |

### Reminders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reminders/today` | Today's reminders |
| GET | `/api/reminders/week` | This week's reminders |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?keyword=` | Global search |
| GET | `/api/search/quick?keyword=` | Quick search |

### Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings/shop` | Get shop details |
| PUT | `/api/settings/shop` | Update shop details |
| PUT | `/api/settings/pin` | Change PIN |

---

## 📊 Database Schema

### ER Diagram
```
┌─────────────┐        ┌─────────────┐        ┌─────────────────┐
│   owners    │        │  customers  │        │  transactions   │
├─────────────┤        ├─────────────┤        ├─────────────────┤
│ id (PK)     │◄───────│ id (PK)     │◄───────│ id (PK)         │
│ shop_name   │        │ owner_id(FK)│        │ customer_id(FK) │
│ owner_name  │        │ name        │        │ owner_id(FK)    │
│ mobile(UNIQ)│        │ mobile      │        │ type             │
│ pin         │        │ address     │        │ amount           │
│ registered_at│       │ village     │        │ transaction_date │
└─────────────┘        │ total_credit│        │ due_date         │
                       │ total_paid  │        │ description      │
                       │ balance     │        │ photo_path       │
                       │ last_trx_dt │        │ created_at       │
                       │ created_at  │        └─────────────────┘
                       └─────────────┘
```

### Sample SQL
```sql
-- Customers with high balance
SELECT name, mobile, balance 
FROM customers 
WHERE balance > 0 
ORDER BY balance DESC;

-- Today's transactions
SELECT c.name, t.type, t.amount, t.transaction_date
FROM transactions t
JOIN customers c ON t.customer_id = c.id
WHERE t.transaction_date = CURDATE();

-- Pending payments
SELECT c.name, c.mobile, t.amount, t.due_date, 
       DATEDIFF(CURDATE(), t.due_date) as days_overdue
FROM transactions t
JOIN customers c ON t.customer_id = c.id
WHERE t.type = 'CREDIT' 
  AND t.due_date < CURDATE() 
  AND c.balance > 0;
```

---

## 🧪 Testing

### Test Credentials
```
Mobile: 9876543210
PIN: 1234
```

### Sample API Calls

#### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "shopName": "श्री गणेश स्टोअर",
    "ownerName": "राम शर्मा",
    "mobile": "9876543210",
    "pin": "1234"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "pin": "1234"
  }'
```

#### Add Customer
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "सुरेश पाटील",
    "mobile": "9876543211",
    "address": "जवाहर नगर",
    "village": "सोलापूर"
  }'
```

#### Add Credit
```bash
curl -X POST http://localhost:8080/api/transactions/credit \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "amount": 5000,
    "dueDate": "2026-07-15",
    "description": "मालाची उधारी"
  }'
```

---

## 📦 Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/vyapari-mitra-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Build image
docker build -t vyapari-mitra .

# Run container
docker run -d \
  --name vyapari-mitra \
  -p 8080:8080 \
  -v $(pwd)/uploads:/app/uploads \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/vyapari_mitra \
  -e SPRING_DATASOURCE_USERNAME=vyapari \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  vyapari-mitra
```

### Systemd Service (Linux)

```bash
# /etc/systemd/system/vyapari-mitra.service
[Unit]
Description=Vyapari Mitra Application
After=network.target mysql.service

[Service]
Type=simple
User=vyapari
WorkingDirectory=/opt/vyapari-mitra
ExecStart=/usr/bin/java -jar vyapari-mitra-1.0.0.jar
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable vyapari-mitra
sudo systemctl start vyapari-mitra
sudo systemctl status vyapari-mitra
```

---

## 🔐 Security

### Security Features
- ✅ PIN-based authentication (4-digit)
- ✅ Session management (1-hour timeout)
- ✅ CORS configuration for trusted origins
- ✅ File upload validation (Image only, 10MB max)
- ✅ Data validation (mobile 10 digits, PIN 4 digits)
- ✅ SQL injection prevention (JPA/Hibernate)
- ✅ XSS protection (Spring Security)

### Future Security Enhancements
- [ ] BCrypt password encoding
- [ ] Rate limiting
- [ ] JWT token support
- [ ] HTTPS configuration
- [ ] Audit logging
- [ ] Data encryption at rest

---

## 📈 Performance Optimization

### Database Indexes
```sql
CREATE INDEX idx_customer_owner ON customers(owner_id);
CREATE INDEX idx_transaction_customer ON transactions(customer_id);
CREATE INDEX idx_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_transaction_type ON transactions(type);
```

### Recommended Optimizations
- [ ] Enable connection pooling (HikariCP)
- [ ] Configure cache (Redis/EhCache)
- [ ] Use DTO projections for large queries
- [ ] Implement pagination for large datasets
- [ ] Add compression for file uploads

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error
```
Error: Communications link failure
Solution: Check MySQL is running and credentials are correct
```

#### 2. File Upload Error
```
Error: File upload limit exceeded
Solution: Increase max-file-size in application.properties
```

#### 3. Session Expired
```
Error: Session expired
Solution: Login again or increase session timeout
```

#### 4. Port Already in Use
```
Error: Address already in use
Solution: Change server.port or kill existing process
```

---

## 🤝 Contributing

### How to Contribute

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Coding Standards
- Follow Java naming conventions
- Write meaningful comments (Marathi/English)
- Add unit tests for new features
- Update documentation

---

## 📝 License

```
© 2026 व्यापारी मित्र (Vyapari Mitra)

This project is proprietary software. Unauthorized copying,
distribution, or use of this software is strictly prohibited.

For licensing inquiries, contact: support@vyaparimitra.com
```

---

## 🙏 Acknowledgments

- **Spring Boot** - Backend framework
- **iTextPDF** - PDF report generation
- **MySQL** - Database
- **Marathi Language** - UI localization
- **Indian Shopkeepers** - Inspiration and motivation

---

## 📞 Contact & Support

| Channel | Details |
|---------|---------|
| **Email** | support@vyaparimitra.com |
| **Website** | https://vyaparimitra.com |
| **Phone** | +91 7666768608 |
| **GitHub** | https://github.com/yourusername/vyapari-mitra |
| **Issues** | https://github.com/yourusername/vyapari-mitra/issues |

---

## 🌟 Star the Project!

If you find this project useful, please ⭐ star it on GitHub!

```
                 ╔══════════════════════════════════╗
                 ║   🌟 व्यापारी मित्र 🌟          ║
                 ║   व्यवसाय सोपा, व्यवस्थापन सुरेख! ║
                 ╚══════════════════════════════════╝
```

---

**Made with ❤️ for Indian Shopkeepers** 🇮🇳
