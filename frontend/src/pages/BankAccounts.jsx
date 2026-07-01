import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Header from "../components/Header";
import { FaUniversity, FaCheckCircle } from "react-icons/fa";
import { addBankAccount } from "../services/bankAccountService";
import { showSuccess, showError } from "../utils/toast";

function BankAccounts() {

    const [accounts, setAccounts] = useState([]);

    const [form, setForm] = useState({
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        openingBalance: "",
        currency: "INR"
    });

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/dashboard/cash-position", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAccounts(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addBankAccount(form);

            showSuccess("Bank Account Added Successfully");

            setForm({
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                openingBalance: "",
                currency: "INR"
            });

            loadAccounts();

        } catch (error) {

            console.error(error);

            showError("Failed to Add Bank Account");

        }

    };

    return (

        <div className="container-fluid">

            <Header title="Bank Accounts" />

            <div className="card form-card mb-4">

                <div className="card-body">

                    <h4 className="mb-4">
                        Add New Bank Account
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label>Bank Name</label>

                                <input
                                    className="form-control"
                                    name="bankName"
                                    value={form.bankName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Account Number</label>

                                <input
                                    className="form-control"
                                    name="accountNumber"
                                    value={form.accountNumber}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>IFSC Code</label>

                                <input
                                    className="form-control"
                                    name="ifscCode"
                                    value={form.ifscCode}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Opening Balance</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="openingBalance"
                                    value={form.openingBalance}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>Currency</label>

                                <select
                                    className="form-select"
                                    name="currency"
                                    value={form.currency}
                                    onChange={handleChange}
                                >

                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>

                                </select>

                            </div>

                        </div>

                        <button className="btn save-btn">

                            Add Bank Account

                        </button>

                    </form>

                </div>

            </div>

            <div className="row g-4">

                {accounts.map((account, index) => (

                    <div className="col-lg-4 col-md-6" key={index}>

                        <div className="card bank-card">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="bank-icon">
                                        <FaUniversity size={28}/>
                                    </div>

                                    <span className="badge bg-success">
                                        <FaCheckCircle className="me-1"/>
                                        Active
                                    </span>

                                </div>

                                <h4 className="mt-4 fw-bold">
                                    {account.bankName}
                                </h4>

                                <small className="text-muted">
                                    Current Balance
                                </small>

                                <h2 className="mt-2 text-primary fw-bold">
                                    ₹ {(account.currentBalance ?? 0).toLocaleString()}
                                </h2>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default BankAccounts;