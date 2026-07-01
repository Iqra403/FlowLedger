💰 FlowLedger (TreasuryFlow)

A full-stack Finance Management & Cash Flow Tracking System built using:

⚙️ Spring Boot (Backend)
⚛️ React + Vite (Frontend)
🛢️ MySQL Database
🔐 JWT Authentication
📊 Recharts for Analytics

🚀 Live Features
👤 Authentication System
User Registration
Login with JWT Security
Protected Routes (Frontend + Backend)

🏦 Bank Account Management
Add Bank Accounts
View All Accounts
Track Current Balance per Bank
User-specific data isolation

💸 Transaction Management
Add Income Transactions
Add Expense Transactions
Automatic Bank Balance Update
Category-based tracking

📊 Dashboard Analytics
Total Cash Overview
Total Income
Total Expense
Number of Bank Accounts
Recent Transactions
Cash Flow Forecast

📈 Cash Flow Forecast Logic
Current Cash = Sum of all bank balances
Income = Sum of all INCOME transactions
Expense = Sum of all EXPENSE transactions

Projected Cash = Current Cash + Income - Expense

🛠 Tech Stack
Backend
Java 17
Spring Boot
Spring Security (JWT)
Spring Data JPA
Hibernate
MySQL
Frontend
React (Vite)
Axios
React Router DOM
Recharts
Bootstrap / CSS

📁 Project Structure
FlowLedger/
│
├── backend/flowledger
│   ├── src/main/java/com/flowledger
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── api
│
├── README.md


⚙️ Backend Setup
cd backend/flowledger
mvn clean install
mvn spring-boot:run

Backend runs at:

http://localhost:8080


⚛️ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173


🔐 Environment Variables
Backend (application.properties)
spring.datasource.url=your_db_url
spring.datasource.username=your_username
spring.datasource.password=your_password

jwt.secret=your_secret_key


📡 API Endpoints
🔐 Auth APIs
POST /api/auth/register
POST /api/auth/login

🏦 Bank APIs
POST /api/bank/add
GET  /api/dashboard/cash-position

💸 Transaction APIs
POST /api/transactions/add
GET  /api/transactions

📊 Dashboard APIs
GET /api/dashboard
GET /api/dashboard/cash-flow-forecast
GET /api/dashboard/recent-transactions

📊 Dashboard Features Explained
Total Cash = Sum of all bank balances
Income = All INCOME transactions
Expense = All EXPENSE transactions
Cash Flow Forecast = Predict future cash position

🚀 Future Improvements
Delete Transaction Feature
Edit Transaction Feature
Monthly Analytics Charts
Export Reports (PDF / Excel)
Docker Deployment
Cloud Deployment (Render / AWS / Vercel)
Mobile App Version
🌐 Deployment Plan
Backend → Render / Railway
Frontend → Vercel
Database → MySQL Cloud (PlanetScale / AWS RDS)

🧠 What This Project Demonstrates

✔ Full Stack Development
✔ REST API Design
✔ JWT Authentication
✔ Real-world Finance Logic
✔ Dashboard Analytics
✔ Clean Architecture
✔ Deployment Ready Project

👨‍💻 Author

FlowLedger Project

Built for:

Portfolio Enhancement
Full Stack Developer Interviews
Placement Preparation

⭐ Project Goal

To build a real-world finance tracking system similar to small business accounting tools.
