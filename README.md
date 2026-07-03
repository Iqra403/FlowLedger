# 💰 TreasuryFlow

A full-stack **Treasury & Cash Management System** built using **Spring Boot + React** that allows users to manage bank accounts, track income/expenses, and visualize cash flow analytics.

## 🌐 Live Links

- 🚀 Live App: https://flow-ledger-khaki.vercel.app  
- ⚙️ Backend API: https://treasuryflow-backend.onrender.com  
- 💻 Source Code: https://github.com/Iqra403/FlowLedger

---

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA
- Hibernate
- MySQL

### Frontend
- React
- Axios
- React Router DOM
- Recharts
- Bootstrap / CSS

---

## ✨ Features

### 🔐 Authentication
- User registration
- Login system using JWT
- Secure protected routes (frontend + backend)

### 🏦 Bank Account Management
- Add bank accounts
- View all accounts
- Track current balance per bank
- User-specific data isolation

### 💸 Transaction Management
- Add income transactions
- Add expense transactions
- Auto bank balance update
- Category-based tracking

### 📊 Dashboard Analytics
- Total cash overview
- Total income
- Total expense
- Number of bank accounts
- Recent transactions
- Cash flow forecast

---

## 📈 Cash Flow Forecast Logic

- **Current Cash** = Sum of all bank balances
- **Income** = Sum of all INCOME transactions
- **Expense** = Sum of all EXPENSE transactions

**Projected Cash = Current Cash + Income − Expense**

---

## 🏗 Project Structure

```
TreasuryFlow
│
├── treasury-backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│
├── frontend
│   ├── pages
│   ├── components
│   ├── api
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Backend Setup
```bash
cd treasury-backend
mvn clean install
mvn spring-boot:run
```
Backend runs at: `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Bank Accounts
- `POST /api/bank/add`
- `GET /api/dashboard/cash-position`

### Transactions
- `POST /api/transactions/add`
- `GET /api/transactions`

### Dashboard
- `GET /api/dashboard`
- `GET /api/dashboard/cash-flow-forecast`
- `GET /api/dashboard/recent-transactions`

---

## 📊 Key Highlights

- JWT authentication
- Real-time balance updates
- Income & expense categorization
- Cash flow forecasting engine
- User-specific secure data handling

---

## 🚀 Future Improvements

- Delete transaction feature
- Edit transaction feature
- Monthly analytics charts
- Export reports (PDF / Excel)
- Cloud deployment (Render + Vercel)

---

## 👨‍💻 Author

Built as a full-stack treasury management project for portfolio & interviews.

---

## ⭐ Goal

To simulate a real-world treasury and cash flow tracking system used in small and medium business finance operations.
