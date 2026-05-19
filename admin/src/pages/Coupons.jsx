import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../Common/Aside";
import toast from "react-hot-toast";
/* ADMIN PROFILE */
function AdminProfile() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="admin-profile">
            <div className="profile-avatar" onClick={() => setShowDropdown(!showDropdown)}>A</div>

            <div className="profile-info" onClick={() => setShowDropdown(!showDropdown)}>
                <strong>Admin</strong>
                <span>Super Admin</span>
            </div>

            {showDropdown && (
                <div className="profile-dropdown">
                    <button onClick={() => navigate("/profile")}>My Profile</button>
                    <button onClick={() => navigate("/admin-login")}>Logout</button>
                </div>
            )}
        </div>
    );
}

/* COUPONS */
function Coupons() {
    const [showModal, setShowModal] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const addCoupon = async () => {

        const code = prompt("Enter coupon code");
        if (!code) return;

        const title = prompt("Enter coupon title");
        if (!title) return;

        const desc = prompt("Enter coupon description");
        if (!desc) return;

        const discount = prompt("Enter discount %");
        if (!discount) return;

        const minAmount = prompt("Enter minimum amount");
        if (!minAmount) return;

        const limit = prompt("Enter usage limit");
        if (!limit) return;

        const expiry = prompt("Enter expiry date (YYYY-MM-DD)");
        if (!expiry) return;

        const couponData = {
            code,
            desc: `${discount}% off on all jewellery orders`,
            discount: Number(discount),
            used: 0,
            limit: Number(limit),
            minAmount: Number(minAmount),
            expiry,
            active: true,
            status: "active"
        };

        const res = await fetch("${import.meta.env.VITE_BACKEND_URL}/coupons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(couponData)
        });

        const data = await res.json();


        setCoupons([...coupons, data]);

        toast.success("Coupon added ✅");
    };

    const deleteCoupon = async (id) => {

        await fetch(`${import.meta.env.VITE_BACKEND_URL}/coupons/${id}`, {
            method: "DELETE"
        })

        setCoupons(coupons.filter(c => c._id !== id))
    }
    const editCoupon = async (coupon) => {

        const code = prompt("Coupon Code", coupon.code);
        if (code === null) return;

        const discount = prompt("Discount %", coupon.discount);
        if (discount === null) return;

        const minAmount = prompt("Minimum Amount", coupon.minAmount);
        if (minAmount === null) return;

        const limit = prompt("Usage Limit", coupon.limit);
        if (limit === null) return;

        const expiry = prompt(
            "Expiry Date (YYYY-MM-DD)",
            coupon.expiry?.split("T")[0]
        );

        if (expiry === null) return;

        const active = window.confirm(
            "Press OK for ACTIVE\nPress Cancel for EXPIRED"
        );

        const updatedData = {
            code,
            discount,
            minAmount,
            limit,
            expiry,
            active
        };

        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/coupons/${coupon._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            }
        );

        const data = await res.json();

        if (data.success) {

            setCoupons(
                coupons.map(c =>
                    c._id === coupon._id
                        ? data.coupon
                        : c
                )
            );

            toast.success("Coupon updated ✅");
        }
    };
    const copyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        toast.success("Coupon copied!");
    };

    useEffect(() => {

        fetch("${import.meta.env.VITE_BACKEND_URL}/coupons")
            .then(res => res.json())
            .then(data => {
                setCoupons(data)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div>
            <Aside />

            <div className="admin-main">
                {/* TOPBAR */}
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <div className="topbar-search">
                            <input type="text" placeholder="Search..." />
                            <span>⌕</span>
                        </div>
                    </div>

                    <div className="topbar-right">
                        <AdminProfile />
                    </div>
                </header>

                {/* CONTENT */}
                <main className="admin-content">
                    <div className="page-heading">
                        <div>
                            <h1>Coupons</h1>
                            <p>Create and manage discount codes</p>
                        </div>

                        <button
                            className="btn-admin-primary"
                            onClick={addCoupon}
                        >
                            + New Coupon
                        </button>
                    </div>

                    {/* GRID */}
                    <div className="coupon-grid">
                        {coupons.map((c, i) => (
                            <div className="coupon-card" key={i}>
                                <div className="coupon-scissors">✂️</div>

                                <div className="coupon-code">{c.code}</div>

                                <div className="coupon-desc">
                                    {c.desc || `${c.discount}% off on all jewellery orders`}
                                </div>

                                <div className="coupon-meta">
                                    <span className={`coupon-tag ${c.status}`}>
                                        {c.active ? "ACTIVE" : "EXPIRED"}
                                    </span>

                                    <span className="coupon-tag">
                                        Discount: {c.discount}
                                    </span>

                                    <span className="coupon-tag">
                                        Used: {c.used}/{c.limit}
                                    </span>

                                    <span className="coupon-tag">
                                        Min:₹{c.minAmount}
                                    </span>

                                    <span className="coupon-tag">
                                        Expires: {
                                            new Date(c.expiry).toLocaleDateString("en-US", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric"
                                            })
                                        }
                                    </span>
                                </div>

                                <div className="coupon-actions">
                                    <button className="act-btn" onClick={() => editCoupon(c)}>Edit</button>

                                    <button className="act-btn" onClick={() => copyCoupon(c.code)} >Copy</button>

                                    <button className="act-btn del" onClick={() => {
                                        const confirmDelete = window.confirm(
                                            "Are you sure you want to delete this coupon?")
                                        if (confirmDelete) {
                                            deleteCoupon(c._id)
                                        }
                                    }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Coupons;