import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Aside() {
    const location = useLocation()

    return (
        <aside className="admin-sidebar">
            <div className="admin-logo">✦ JWELLO</div>

            <nav className="admin-nav">

                <Link
                    to="/admin-dashboard"
                    className={location.pathname === "/admin-dashboard" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="⬡"
                >
                    Dashboard
                </Link>

                <Link
                    to="/products"
                    className={location.pathname === "/products" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="💍"
                >
                    Products
                </Link>

                <Link
                    to="/orders"
                    className={location.pathname === "/orders" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="📦"
                >
                    Orders
                </Link>

                <Link
                    to="/customers"
                    className={location.pathname === "/customers" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="👤"
                >
                    Customers
                </Link>

                <Link
                    to="/categories"
                    className={location.pathname === "/categories" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="🏷"
                >
                    Categories
                </Link>

                <Link
                    to="/inventory"
                    className={location.pathname === "/inventory" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="📊"
                >
                    Inventory
                </Link>

                <Link
                    to="/coupons"
                    className={location.pathname === "/coupons" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="🎟"
                >
                    Coupons
                </Link>

                <Link
                    to="/reports"
                    className={location.pathname === "/reports" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="📈"
                >
                    Reports
                </Link>

                <div className="nav-divider"></div>

                {/* <Link
                    to="/settings"
                    className={location.pathname === "/settings" ? "admin-nav-link active" : "admin-nav-link"}
                    data-icon="⚙"
                >
                    Settings
                </Link>
                <Link
                    to="/store"
                    className="admin-nav-link"
                    data-icon="🌐"
                >
                    View Store
                </Link> */}

            </nav>
        </aside>
    )
}

export default Aside