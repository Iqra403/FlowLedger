import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { showSuccess, showError } from "../utils/toast";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {

        if (form.fullName.trim().length < 3) {
            showError("Full name must contain at least 3 characters.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            showError("Enter a valid email address.");
            return false;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(form.password)) {

            showError(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
            );

            return false;
        }

        if (form.password !== form.confirmPassword) {
            showError("Passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            await api.post("/auth/register", {
                fullName: form.fullName,
                email: form.email,
                password: form.password
            });

            showSuccess("Registration Successful!");

            setTimeout(() => {
                navigate("/");
            }, 1200);

        } catch (error) {

            console.error(error);

            if (typeof error.response?.data === "object") {

                Object.values(error.response.data).forEach(msg => {
                    showError(msg);
                });

            } else {

                showError(
                    error.response?.data || "Registration failed."
                );

            }

        }

    };

    return (

        <div className="login-wrapper">

            <div className="login-card">

                <div className="text-center mb-4">

                    <FaUserPlus size={45} color="#17375e" />

                    <h3 className="mt-2 fw-bold">
                        Create Account
                    </h3>

                    <p className="text-muted">
                        Join Treasury Flow
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            className="form-control"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />

                    </div>

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
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button className="btn btn-primary w-100">
                        Register
                    </button>

                </form>

                <div className="text-center mt-3">

                    Already have an account?

                    <Link
                        to="/"
                        className="ms-2"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;