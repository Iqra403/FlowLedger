import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Header from "../components/Header";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await api.get("/dashboard/all-transactions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTransactions(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // 🔍 FILTER LOGIC (CLIENT SIDE)
    const filteredTransactions = transactions.filter((t) =>
        t.bankName?.toLowerCase().includes(search.toLowerCase()) ||
        t.category?.toLowerCase().includes(search.toLowerCase()) ||
        t.type?.toLowerCase().includes(search.toLowerCase()) ||
        t.amount?.toString().includes(search)
    );

    return (
        <div className="container-fluid">

            <Header title="Transaction History" />

            {/* Summary Bar */}
            <div className="card dashboard-card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <h5 className="mb-0">All Transactions</h5>
                        <small className="text-muted">
                            {filteredTransactions.length} records found
                        </small>
                    </div>

                    {/* SEARCH BOX */}
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search bank, category, type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
            </div>

            {/* Table */}
            <div className="card dashboard-card">

                <div className="card-body p-0">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark">
                            <tr>
                                <th>Bank</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredTransactions.length > 0 ? (

                                filteredTransactions.map((t, index) => (

                                    <tr key={index}>

                                        <td className="fw-bold">🏦 {t.bankName}</td>

                                        <td>
                                            <span className={`badge ${t.type === "INCOME" ? "bg-success" : "bg-danger"}`}>
                                                {t.type}
                                            </span>
                                        </td>

                                        <td className="fw-bold">
                                            {t.type === "INCOME" ? "+" : "-"} ₹ {t.amount?.toLocaleString()}
                                        </td>

                                        <td>{t.category}</td>

                                        <td>{t.description}</td>

                                        <td>
                                            {new Date(t.date).toLocaleDateString("en-GB")}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-muted">
                                        No Transactions Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Transactions;