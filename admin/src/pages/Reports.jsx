import React, { useEffect, useState } from "react";
import axios from "axios";
import Aside from "../Common/Aside";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function Reports() {
    const [report, setReport] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        avgOrder: 0,
        monthlyRevenue: [],
        categoryLabels: [],
        topCities: [],
        returnRate: 0,
        refundRate: 0,
        avgRating: 0
    });

    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        axios.get("${import.meta.env.VITE_BACKEND_URL}/reports-data")
            .then((res) => {
                setReport(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const revenueData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue",
                data: report.monthlyRevenue || [],
                backgroundColor: "#C9A646"
            }
        ]
    };

    const categoryData = {
        labels: report.categoryLabels || [],
        datasets: [
            {
                data: report.categorySales || [],
                backgroundColor: [
                    "#C9A646",
                    "#3B82F6",
                    "#10B981",
                    "#8B5CF6"
                ]
            }
        ]
    };

    const ordersData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Orders",
                data: [
                    report.totalOrders * 0.2,
                    report.totalOrders * 0.35,
                    report.totalOrders * 0.5,
                    report.totalOrders * 0.7,
                    report.totalOrders
                ],
                borderColor: "#C9A646",
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    };


    return (
        <div>
            <Aside />
            <div className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
                            Reports Dashboard
                        </h2>
                    </div>

                    <div className="topbar-right">
                        <div style={{ display: "flex", gap: "10px" }}>

                            <button className="btn-admin-primary">
                                ⬇ Export PDF
                            </button>

                            <button
                                className="btn-admin-primary"
                                onClick={() => window.print()}
                            >
                                🖨 Print
                            </button>

                        </div>

                        <div className="admin-profile">
                            <div
                                className="profile-avatar"
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={{ cursor: "pointer" }}
                            >
                                A
                            </div>

                            {showDropdown && (
                                <div className="profile-dropdown">
                                    <button onClick={() => window.location.href = "/profile"}>
                                        My Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("admin");
                                            window.location.href = "/admin-login";
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="admin-content">

                    <div className="page-heading">
                        <div>
                            <h1>Reports & Analytics</h1>
                            <p>Comprehensive business performance overview</p>
                        </div>
                    </div>

                    <div className="reports-grid-3 reports-six">

                        <div className="kpi-card">
                            <span className="kpi-value">₹{Number(report.totalRevenue).toFixed(2)}</span>
                            <div className="kpi-label">Total Revenue</div>
                            <div className="kpi-change up">↑ 18.5%</div>
                        </div>

                        <div className="kpi-card">
                            <span className="kpi-value">{report.totalOrders}</span>
                            <div className="kpi-label">Orders</div>
                            <div className="kpi-change up">↑ 12.3%</div>
                        </div>

                        <div className="kpi-card">
                            <span className="kpi-value">₹{Number(report.avgOrder).toFixed(2)}</span>
                            <div className="kpi-label">Avg Order Value</div>
                            <div className="kpi-change up">↑ 5.1%</div>
                        </div>

                        <div className="kpi-card">
                            <span className="kpi-value">{report.returnRate}%</span>
                            <div className="kpi-label">Return Rate</div>
                            <div className="kpi-change up"></div>
                        </div>

                        <div className="kpi-card">
                            <span className="kpi-value">{report.refundRate}%</span>
                            <div className="kpi-label">Refund Rate</div>
                            <div className="kpi-change down"></div>
                        </div>

                        <div className="kpi-card">
                            <span className="kpi-value">{report.avgRating}★</span>
                            <div className="kpi-label">Avg Rating</div>
                            <div className="kpi-change up"></div>
                        </div>

                    </div>

                    <div className="reports-grid">

                        <div className="card">
                            <div className="card-header">
                                <h3>Monthly Revenue</h3>
                            </div>

                            <div style={{ height: "300px", padding: "20px" }}>
                                <Bar data={revenueData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Revenue by Category</h3>
                            </div>

                            <div style={{ height: "300px", padding: "20px" }}>
                                <Doughnut data={categoryData} options={chartOptions} />
                            </div>
                        </div>

                    </div>

                    <div className="reports-grid">

                        {/* Orders Trend */}
                        <div className="card">
                            <div className="card-header">
                                <h3>Orders Trend</h3>
                            </div>

                            <div style={{ height: "500px", padding: "20px" }}>
                                <Line data={ordersData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Top Cities */}
                        <div className="card">
                            <div className="card-header">
                                <h3>Top Cities</h3>
                            </div>

                            <div style={{ padding: "20px" }}>

                                {report.topCities?.map((city, index) => {

                                    const maxRevenue =
                                        report.topCities[0]?.totalRevenue || 1;

                                    return (
                                        <div
                                            key={index}
                                            style={{ marginBottom: "22px" }}
                                        >

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    marginBottom: "8px"
                                                }}
                                            >
                                                <span>{city._id}</span>

                                                <span>
                                                    ₹{(city.totalRevenue / 100000).toFixed(1)}L
                                                </span>
                                            </div>

                                            <div
                                                style={{
                                                    height: "8px",
                                                    background: "#eee",
                                                    borderRadius: "20px"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${(city.totalRevenue / maxRevenue) * 100}%`,
                                                        height: "100%",
                                                        background: "#C9A646",
                                                        borderRadius: "20px"
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                    </div>
                </main>
            </div >
        </div >
    );
}

export default Reports;