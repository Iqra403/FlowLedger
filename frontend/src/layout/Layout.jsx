import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaChartPie,
    FaUniversity,
    FaExchangeAlt,
    FaSignOutAlt,
    FaWallet,
    FaPlusCircle,
    FaUserCircle
} from "react-icons/fa";

function Layout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const activeStyle = (path) => ({
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        marginBottom: "10px",
        borderRadius: "12px",
        textDecoration: "none",
        color: "white",
        fontWeight: location.pathname === path ? "600" : "500",
        background:
            location.pathname === path
                ? "rgba(255,255,255,.18)"
                : "transparent",
        transition: ".25s"
    });

    return (

        <div className="d-flex" style={{ minHeight: "100vh" }}>

            {/* Sidebar */}

            <div
                style={{
                    width: "260px",
                    background:
                        "linear-gradient(180deg,#17375e 0%, #102a4c 100%)",
                    color: "white",
                    padding: "30px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "6px 0 25px rgba(0,0,0,.15)"
                }}
            >

                <div>

                    <div className="text-center mb-5">

                        <div
                            style={{
                                width: 75,
                                height: 75,
                                margin: "0 auto",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FaWallet size={38} />
                        </div>

                        <h3 className="mt-3 fw-bold">
                            Treasury Flow
                        </h3>

                        <small style={{ color: "#d7e3f5" }}>
                            Enterprise Treasury
                        </small>

                    </div>

                    <Link
                        to="/dashboard"
                        style={activeStyle("/dashboard")}
                    >
                        <FaChartPie />
                        Dashboard
                    </Link>

                    <Link
                        to="/bank-accounts"
                        style={activeStyle("/bank-accounts")}
                    >
                        <FaUniversity />
                        Bank Accounts
                    </Link>

                    <Link
                        to="/transactions"
                        style={activeStyle("/transactions")}
                    >
                        <FaExchangeAlt />
                        Transactions
                    </Link>

                    <Link
                        to="/add-transaction"
                        style={activeStyle("/add-transaction")}
                    >
                        <FaPlusCircle />
                        Add Transaction
                    </Link>

                </div>

                {/* Bottom */}

                <div>

                    <div
                        style={{
                            background: "rgba(255,255,255,.08)",
                            borderRadius: "15px",
                            padding: "15px",
                            marginBottom: "18px"
                        }}
                    >

                        <div className="d-flex align-items-center">

                            <FaUserCircle size={45} />

                            <div className="ms-3">

                                <div className="fw-bold">
                                    Treasury Manager
                                </div>

                                <small style={{ color: "#d7e3f5" }}>
                                    Finance Department
                                </small>

                            </div>

                        </div>

                    </div>

                    <button
                        onClick={logout}
                        className="btn btn-danger w-100"
                        style={{
                            borderRadius: "12px",
                            padding: "10px"
                        }}
                    >
                        <FaSignOutAlt className="me-2" />
                        Logout
                    </button>

                </div>

            </div>

            {/* Main */}

            <div
                style={{
                    flex: 1,
                    background: "#eef2f7",
                    padding: "35px",
                    minWidth: 0
                }}
            >
                {children}
            </div>

        </div>

    );
}

export default Layout;