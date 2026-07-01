import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { showSuccess, showError } from "../utils/toast";
import {
    addTransaction,
    getBankDropdown,
} from "../services/transactionService";

function AddTransaction() {

    const navigate = useNavigate();

    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [transaction, setTransaction] = useState({
        bankAccountId: "",
        type: "INCOME",
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    useEffect(() => {
        loadBanks();
    }, []);

    const loadBanks = async () => {
        try {
            const data = await getBankDropdown();
            setBanks(data);
        } catch (error) {
            console.error(error);
            showError("Failed to load bank accounts");
        }
    };

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value,
        });
    };

    const handleTypeChange = (e) => {
        setTransaction({
            ...transaction,
            type: e.target.value,
            category: "",
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {

            await addTransaction(transaction);

            showSuccess("Transaction added successfully!");

            // reset form after success (important UX)
            setTransaction({
                bankAccountId: "",
                type: "INCOME",
                amount: "",
                category: "",
                description: "",
                date: "",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {

            console.error(error);
            showError("Failed to add transaction");

        } finally {
            setLoading(false);
        }
    };

    const incomeCategories = [
        "CUSTOMER_PAYMENT",
        "LOAN_RECEIVED",
        "INTEREST_INCOME",
        "OTHER_INCOME",
    ];

    const expenseCategories = [
        "SALARY",
        "VENDOR_PAYMENT",
        "BANK_CHARGES",
        "UTILITY",
        "TAX",
        "OTHER_EXPENSE",
    ];

    return (
        <div className="container-fluid">

            <Header title="Add Transaction" />

            <div className="card form-card">

                <div className="card-body p-5">

                    <h4 className="form-title mb-4">
                        Transaction Information
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            {/* BANK */}
                            <div className="col-md-6 mb-4">

                                <label className="form-label">Bank</label>

                                <select
                                    className="form-select"
                                    name="bankAccountId"
                                    value={transaction.bankAccountId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Bank</option>

                                    {banks.map((bank) => (
                                        <option key={bank.id} value={bank.id}>
                                            {bank.bankName}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* TYPE */}
                            <div className="col-md-6 mb-4">

                                <label className="form-label">Type</label>

                                <select
                                    className="form-select"
                                    value={transaction.type}
                                    onChange={handleTypeChange}
                                >
                                    <option value="INCOME">Income</option>
                                    <option value="EXPENSE">Expense</option>
                                </select>

                            </div>

                            {/* AMOUNT */}
                            <div className="col-md-6 mb-4">

                                <label className="form-label">Amount</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={transaction.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* CATEGORY */}
                            <div className="col-md-6 mb-4">

                                <label className="form-label">Category</label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={transaction.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>

                                    {(transaction.type === "INCOME"
                                        ? incomeCategories
                                        : expenseCategories
                                    ).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="col-md-12 mb-4">

                                <label className="form-label">Description</label>

                                <input
                                    className="form-control"
                                    name="description"
                                    value={transaction.description}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* DATE */}
                            <div className="col-md-6 mb-4">

                                <label className="form-label">Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={transaction.date}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="text-end">

                            <button
                                className="btn save-btn"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Transaction"
                                )}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddTransaction;