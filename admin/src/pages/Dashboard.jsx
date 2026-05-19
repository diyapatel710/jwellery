import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Aside from "../Common/Aside";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

/* Admin Profile */
function AdminProfile() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/admin-login");
    };

    return (
        <div className="admin-profile">
            <div
                className="profile-avatar"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                A
            </div>

            <div
                className="profile-info"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <strong>Admin</strong>
                <span>Super Admin</span>
            </div>

            {showDropdown && (
                <div className="profile-dropdown">
                    <button onClick={() => navigate("/profile")}>My Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

/* Dashboard */
function Dashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0
    });

    const [search, setSearch] = useState("");
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {

        axios
<<<<<<< HEAD
            .get("http://localhost:8000/dashboard-stats")
=======
            .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard-stats`)
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
            .then((res) => {

                setStats(res.data);

            })
            .catch((err) => console.log(err));

        axios
<<<<<<< HEAD
            .get("http://localhost:8000/top-products")
=======
            .get(`${import.meta.env.VITE_BACKEND_URL}/top-products`)
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
            .then((res) => {

                setTopProducts(res.data);

            })
            .catch((err) => console.log(err));

    }, []);

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: [200000, 350000, 500000, 650000, 900000, 1472000],
                borderColor: "#C9A646",
                backgroundColor: "#C9A646",
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 5
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div>
            <Aside />

            <div className="admin-main">

                {/* TOPBAR */}
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button className="sidebar-toggle">☰</button>

                        <div className="topbar-search">
                            <input
                                type="text"
                                placeholder="Search products, orders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        navigate(`/products?search=${search}`);
                                    }
                                }}
                            />

                            <span
                                onClick={() => navigate(`/products?search=${search}`)}
                                style={{ cursor: "pointer" }}
                            >
                                ⌕
                            </span>
                        </div>
                    </div>

                    <div className="topbar-right">
                        <AdminProfile />
                    </div>
                </header>

                {/* MAIN */}
                <main className="admin-content">

                    {/* Heading */}
                    <div className="page-heading">
                        <div>
                            <h1>Dashboard</h1>
                            <p>Welcome back, Admin! Here's what's happening today.</p>
                        </div>

                        <div className="heading-actions">
                            <span className="date-badge">📅 April 2025</span>

                            <button
                                className="btn-admin-primary"
                                onClick={() => navigate("/products?add=true")}
                            >
                                + Add Product
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="stat-grid">

                        <div className="stat-card">
                            <div className="stat-icon gold">💰</div>
                            <div className="stat-info">
                                <span className="stat-label">Total Revenue</span>
                                <h3 className="stat-value">₹{stats.totalRevenue}</h3>
                            </div>
                        </div>

                        <div className="stat-card" onClick={() => navigate("/orders")}
                            style={{ cursor: "pointer" }}>
                            <div className="stat-icon blue">📦</div>
                            <div className="stat-info">
                                <span className="stat-label">
                                    Total Orders
                                </span>
                                <h3 className="stat-value">{stats.totalOrders}</h3>
                            </div>
                        </div>

                        <div className="stat-card" onClick={() => navigate("/customers")}
                            style={{ cursor: "pointer" }}>
                            <div className="stat-icon green">👤</div>
                            <div className="stat-info">
                                <span className="stat-label">Total Customers</span>
                                <h3 className="stat-value">{stats.totalCustomers}</h3>
                            </div>
                        </div>

                        <div className="stat-card" onClick={() => navigate("/products")}
                            style={{ cursor: "pointer" }}>
                            <div className="stat-icon red">💍</div>
                            <div className="stat-info">
                                <span className="stat-label">Total Products</span>
                                <h3 className="stat-value">{stats.totalProducts}</h3>
                            </div>
                        </div>

                    </div>

                    {/* Grid */}
                    <div className="dashboard-grid">

                        {/* Revenue Chart */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h3>Revenue Overview</h3>
                            </div>

                            <div
                                className="chart-area"
                                style={{
                                    height: "300px",
                                    width: "100%"
                                }}
                            >
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="card">
                            <div className="card-header">
                                <h3>Top Products</h3>

                                <Link to="/products" className="card-link">
                                    View All →
                                </Link>
                            </div>

                            <div className="top-products">

                                {
                                    topProducts.map((p) => (

                                        <div
                                            className="top-product-item"
                                            key={p._id}
                                        >

                                            <div className="tp-icon">

                                                {
                                                    p.category === "rings"
                                                        ? "💍"
                                                        : p.category === "necklaces"
                                                            ? "📿"
                                                            : p.category === "earrings"
                                                                ? "✨"
                                                                : "💎"
                                                }

                                            </div>

                                            <div className="tp-info">

                                                <strong>{p.name}</strong>

                                                <span>
                                                    {p.salesCount || 0} sold
                                                </span>

                                            </div>

                                            <div className="tp-revenue">

                                                ₹
                                                {
                                                    ((p.salesCount || 0) *
                                                        (p.price || 0))
                                                        .toLocaleString()
                                                }

                                            </div>

                                        </div>

                                    ))
                                }
                            </div>
                        </div>

                    </div>

                </main >
            </div >
        </div >
    );
}

export default Dashboard;