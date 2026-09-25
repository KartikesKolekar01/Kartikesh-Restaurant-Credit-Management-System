
## 📁 Project Structure


---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

### Backend Setup

bash
cd vyapari-mitra-backend

Create src/main/resources/application.properties:

server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/vyapari_mitra_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

file.upload-dir=uploads/
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

backup.dir=backups


Run:

bash
mvn spring-boot:run
Backend runs at: http://localhost:8080
Swagger UI: http://localhost:8080/swagger-ui.html

Frontend Setup
bash
cd vyapari-mitra-frontend
npm install
Create .env:

env
REACT_APP_API_URL=http://localhost:8080
Run:

bash
npm start
Frontend runs at: http://localhost:3000

📡 API Endpoints (Summary)
Category	Base Path
Authentication	/api/auth
Customers	/api/customers
Transactions	/api/transactions
Dashboard	/api/dashboard
Reports	/api/reports
Reminders	/api/reminders
Files	/api/files
Search	/api/search
Settings	/api/settings

📡 API Endpoints
🔐 Authentication (/api/auth)
Method	Endpoint	Description
POST	/register	Register shop owner (one-time)
POST	/login	Login with mobile + PIN
GET	/check-owner	Check if owner exists
GET	/owner-details	Get current owner details

👥 Customers (/api/customers)
Method	Endpoint	Description
POST	/	Create customer
GET	/	Get all customers
GET	/{id}	Get customer by ID
PUT	/{id}	Update customer
DELETE	/{id}	Delete customer
GET	/search?keyword=	Search customers
GET	/balance	Customers with pending balance
GET	/village/{village}	Filter by village
GET	/count	Total customer count

💰 Transactions (/api/transactions)
Method	Endpoint	Description
POST	/credit	Add credit (उधारी)
POST	/payment	Add payment
GET	/customer/{id}	Customer transactions
GET	/{id}	Get transaction by ID
GET	/today	Today's transactions
GET	/pending	Pending payments
GET	/between?start=&end=	Date range filter
GET	/type/{type}	Filter by CREDIT/PAYMENT
GET	/balance/{customerId}	Customer balance
DELETE	/{id}	Delete transaction

📊 Dashboard (/api/dashboard)
Method	Endpoint	Description
GET	/home	Full dashboard data
GET	/stats	Quick stats

📄 Reports (/api/reports)
Method	Endpoint	Description
GET	/daily?date=	Daily report
GET	/monthly?year=&month=	Monthly report
GET	/yearly?year=	Yearly report
GET	/pending	Pending payments report
GET	/customer/{id}	Customer report

🔔 Reminders (/api/reminders)
Method	Endpoint	Description
GET	/today	Today's reminders
GET	/week	This week's reminders

📁 Files (/api/files)
Method	Endpoint	Description
POST	/upload	Upload file
POST	/upload/transaction/{id}	Upload for transaction
GET	/view/{fileName}	View file
DELETE	/delete/{fileName}	Delete file

🔍 Search (/api/search)
Method	Endpoint	Description
GET	?keyword=	Global search
GET	/quick?keyword=	Quick search
⚙️ Settings (/api/settings)
Method	Endpoint	Description
GET	/shop	Get shop details
PUT	/shop	Update shop details
PUT	/pin	Change PIN
GET	/storage	Storage info
POST	/backup	Create backup
GET	/backup/list	List backups
GET	/backup/download/{file}	Download backup
DELETE	/backup/{file}	Delete backup






🗄️ Database Schema
owners — id, shop_name, owner_name, mobile, pin, registered_at

customers — id, owner_id (FK), name, mobile, address, village, total_credit, total_paid, balance, last_transaction_date, created_at

transactions — id, customer_id (FK), owner_id (FK), type (CREDIT/PAYMENT), amount, transaction_date, due_date, description, photo_path, created_at

Database and tables are auto-created on first run via createDatabaseIfNotExist=true and ddl-auto=update.

📄 License
MIT License — Copyright (c) 2026 Kartikesh Kolekar

📞 Contact
Kartikesh Kolekar

GitHub: @KartikesKolekar01








