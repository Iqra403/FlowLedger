import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BankAccounts from "./pages/BankAccounts";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Register from "./pages/Register";

import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

<Route path="/" element={<Login />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

        {/* PROTECTED WRAPPED INSIDE LAYOUT (IMPORTANT FIX) */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bank-accounts"
          element={
            <ProtectedRoute>
              <Layout>
                <BankAccounts />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout>
                <Transactions />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <Layout>
                <AddTransaction />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;