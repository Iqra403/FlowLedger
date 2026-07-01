import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { showSuccess, showError } from "../utils/toast";
import { FaWallet } from "react-icons/fa";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", form);

            // Save JWT token
            localStorage.setItem("token", res.data.token);

            showSuccess("Login Successful");

            setTimeout(() => {
                navigate("/dashboard");
            }, 800);

        } catch (error) {

            console.error(error);
            showError("Invalid Email or Password");

        }

    };

    return (

        <div className="login-wrapper">

            <div className="login-card">

                <div className="text-center mb-4">

                    <FaWallet
                        size={45}
                        color="#17375e"
                    />

                    <h3 className="mt-3 fw-bold">
                        Treasury Flow
                    </h3>

                    <p className="text-muted">
                        Sign in to continue
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

                <div className="text-center mt-4">

                    <span className="text-muted">
                        Don't have an account?
                    </span>

                    <Link
                        to="/register"
                        className="ms-2 text-decoration-none fw-bold"
                    >
                        Register Here
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;