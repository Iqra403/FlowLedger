import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import { getForecast } from "../services/dashboardService";

import CashFlowChart from "../components/CashFlowChart";
import IncomeExpensePie from "../components/IncomeExpensePie";

import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaUniversity
} from "react-icons/fa";

function Dashboard() {

    const [dashboard, setDashboard] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [forecast, setForecast] = useState({
        currentCash: 0,
        expectedInflows: 0,
        expectedOutflows: 0,
        projectedCash: 0
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadDashboard();
        loadTransactions();
        loadForecast();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await api.get("/dashboard", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDashboard(res.data || {});
        } catch (err) {
            console.error(err);
            setDashboard({});
        }
    };

    const loadTransactions = async () => {
        try {
            const res = await api.get("/dashboard/recent-transactions", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(res.data || []);
        } catch (err) {
            console.error(err);
            setTransactions([]);
        }
    };

    const loadForecast = async () => {
        try {
            const res = await getForecast();
            setForecast(res || {
                currentCash: 0,
                expectedInflows: 0,
                expectedOutflows: 0,
                projectedCash: 0
            });
        } catch (err) {
            console.error(err);
            setForecast({
                currentCash: 0,
                expectedInflows: 0,
                expectedOutflows: 0,
                projectedCash: 0
            });
        }
    };

    return (
        <div className="container-fluid">

            <Header title="Treasury Dashboard" />

            {/* KPI CARDS */}
            <div className="row g-4">

                <div className="col-md-3">
                    <div className="card kpi-card p-4">
                        <div className="kpi-icon icon-blue">
                            <FaWallet size={28} />
                        </div>
                        <div className="kpi-title">Total Cash</div>
                        <div className="kpi-value">
                            ₹ {(dashboard?.totalCash || 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card kpi-card p-4">
                        <div className="kpi-icon icon-green">
                            <FaArrowUp size={28} />
                        </div>
                        <div className="kpi-title">Total Income</div>
                        <div className="kpi-value">
                            ₹ {(dashboard?.totalIncome || 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card kpi-card p-4">
                        <div className="kpi-icon icon-red">
                            <FaArrowDown size={28} />
                        </div>
                        <div className="kpi-title">Total Expense</div>
                        <div className="kpi-value">
                            ₹ {(dashboard?.totalExpense || 0).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card kpi-card p-4">
                        <div className="kpi-icon icon-dark">
                            <FaUniversity size={28} />
                        </div>
                        <div className="kpi-title">Bank Accounts</div>
                        <div className="kpi-value">
                            {dashboard?.totalBankAccounts || 0}
                        </div>
                    </div>
                </div>

            </div>

            {/* CHARTS */}
            <div className="mt-4">
                <CashFlowChart dashboard={dashboard} />
                <IncomeExpensePie dashboard={dashboard} />
            </div>

            {/* TRANSACTIONS */}
            <br />

            <div className="card dashboard-card">
                <div className="card-body">

                    <h4 className="mb-4">Recent Transactions</h4>

                    <table className="table table-hover align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>Bank</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {transactions?.length > 0 ? (
                                transactions.map((t, i) => (
                                    <tr key={i}>

                                        <td><strong>{t?.bankName || "-"}</strong></td>

                                        <td>
                                            <span className={
                                                t?.type === "INCOME"
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }>
                                                {t?.type || "-"}
                                            </span>
                                        </td>

                                        <td className="fw-bold">
                                            ₹ {(t?.amount || 0).toLocaleString()}
                                        </td>

                                        <td>{t?.category || "-"}</td>
                                        <td>{t?.date || "-"}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-4">
                                        No Transactions Found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* FORECAST */}
            <br />

            <div className="card dashboard-card">
                <div className="card-body">

                    <h4 className="mb-4">Cash Flow Forecast</h4>

                    <div className="row g-4">

                        <div className="col-md-3 text-center">
                            <h6>Current Cash</h6>
                            <h4 className="text-primary">
                                ₹ {(forecast?.currentCash || 0).toLocaleString()}
                            </h4>
                        </div>

                        <div className="col-md-3 text-center">
                            <h6>Expected Income</h6>
                            <h4 className="text-success">
                                ₹ {(forecast?.expectedInflows || 0).toLocaleString()}
                            </h4>
                        </div>

                        <div className="col-md-3 text-center">
                            <h6>Expected Expense</h6>
                            <h4 className="text-danger">
                                ₹ {(forecast?.expectedOutflows || 0).toLocaleString()}
                            </h4>
                        </div>

                        <div className="col-md-3 text-center">
                            <h6>Projected Cash</h6>
                            <h3 className="fw-bold text-dark">
                                ₹ {(forecast?.projectedCash || 0).toLocaleString()}
                            </h3>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Dashboard;