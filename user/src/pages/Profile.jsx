import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../common/Header";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Profile() {
    const user = JSON.parse(localStorage.getItem("jwello_user"));
    const [activeTab, setActiveTab] = useState("profile");
    const [orders, setOrders] = useState([]);
    const [historyTab, setHistoryTab] = useState("orders");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reviewOrder, setReviewOrder] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [filter, setFilter] = useState("all");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [altPhone, setAltPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [hover, setHover] = useState(null);
    const filteredOrders = orders.filter(order => {
        if (filter === "paid") return order.status === "Paid";
        if (filter === "pending") return order.status === "Pending";
        if (filter === "failed") return order.status === "Failed";
        return true;
    });
    const [reviewedOrders, setReviewedOrders] = useState({});
    const downloadInvoice = (order) => {

        const doc = new jsPDF();

        doc.setFontSize(20);

        doc.text("JWELLO INVOICE", 70, 20);

        doc.setFontSize(12);

        doc.text(
            `Order ID: ${order._id}`,
            14,
            40
        );

        doc.text(
            `Customer: ${order.name}`,
            14,
            50
        );

        doc.text(
            `Email: ${order.email}`,
            14,
            60
        );

        doc.text(
            `Payment Status: ${order.status}`,
            14,
            70
        );

        doc.text(
            `Total Amount: ₹${order.amount}`,
            14,
            80
        );

        autoTable(doc, {

            startY: 95,

            head: [[
                "Product",
                "Qty",
                "Price"
            ]],

            body: order.products.map((p) => [

                p.name,

                p.qty || 1,

                `₹${p.price}`

            ])

        });

        doc.save(
            `invoice-${order._id}.pdf`
        );

    };
    useEffect(() => {
        const socket = io("${import.meta.env.VITE_BACKEND_URL}");

        socket.on("delivery-updated", (data) => {
            setOrders(prev =>
                prev.map(order =>
                    order._id === data.id
                        ? { ...order, deliveryStatus: data.status }
                        : order
                )
            );
        });

        return () => socket.disconnect();
    }, []);
    useEffect(() => {
        fetchBookings();
        fetchUser();

    }, []);
    useEffect(() => {

        const fetchMyReviews = async () => {

            try {

                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/user-reviews/${user.email}`
                );

                const data = await res.json();

                const formatted = {};

                data.forEach((review) => {
                    formatted[review.orderId] = {
                        _id: review._id,
                        rating: review.rating,
                        comment: review.comment
                    };

                });

                setReviewedOrders(formatted);

            } catch (err) {

                console.log(err);

            }

        };

        fetchMyReviews();

    }, []);
    const fetchUser = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("jwello_user"));

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-user/${user.email}`);
            const data = await res.json();

            setCurrentUser(data); // ✅ THIS FIXES EVERYTHING

        } catch (err) {
            console.log(err);
        }
    };
    const saveAddress = async () => {

        if (!fullName || !phone || !newAddress) {
            toast.error("Please fill all fields");
            return;
        }

        if (loading) return; // 🚫 prevent multiple clicks

        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("jwello_user"));

            const url = editId
                ? "${import.meta.env.VITE_BACKEND_URL}/update-address"
                : "${import.meta.env.VITE_BACKEND_URL}/save-address";

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    id: editId,
                    fullName: fullName.trim(),
                    phone: phone.trim(),
                    altPhone: altPhone.trim(),
                    address: newAddress.trim(),
                    city: city.trim()
                })
            });

            const data = await res.json();

            if (data.success) {
                toast.error("Address Saved ✅");

                setFullName("");
                setPhone("");
                setAltPhone("");
                setNewAddress("");
                setCity("");
                setShowForm(false);

                await fetchUser(); // 🔥 always sync with DB

                setEditId(null);
            } else {
                toast.error(data.message || "Duplicate or error ❌");
            }

        } catch (err) {
            console.log(err);
            toast.error("Server error ❌");
        }

        setLoading(false); // ✅ re-enable button
    };
    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/${user.email}`);
            console.log(res.data);
            const myOrders = res.data.orders.filter(
                (item) =>
                    item.email === user?.email ||
                    item.customer === user?.name
            );
            // ✅ SORT HERE
            setOrders(
                myOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
            );
        } catch (err) {
            console.log(err);
        }
    };
    const deleteAddress = async (id) => {
        const user = JSON.parse(localStorage.getItem("jwello_user"));

        const confirmDelete = window.confirm("Delete this address?");
        if (!confirmDelete) return;

        try {
            const res = await fetch("${import.meta.env.VITE_BACKEND_URL}/delete-address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    id: id
                })
            });

            const data = await res.json();

            if (data.success) {
                await fetchUser(); // 🔥 MAIN FIX
            }

        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = (addr) => {
        setFullName(addr.fullName);
        setPhone(addr.phone);
        setAltPhone(addr.altPhone);
        setNewAddress(addr.address);
        setCity(addr.city || "");
        setEditId(addr._id); // store id
        setShowForm(true);   // open popup
    };
    const handleRetryPayment = async (order) => {
        console.log("🔥 RETRY FUNCTION CALLED");
        try {
            if (!window.Razorpay) {
                toast.error("Razorpay not loaded ❌");
                return;
            }

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/payment/retry/${order._id}`,
                { email: user.email }
            );

            const razorpayOrderId = res.data?.razorpayOrderId;
            const amount = res.data?.amount;

            if (!razorpayOrderId || !amount) {
                toast.error("Payment init failed ❌");
                return;
            }

            const options = {
                key: "rzp_test_SpMwdOCtOvvVKT",
                amount: amount,
                currency: "INR",
                name: "JWELLO",
                description: "Retry Payment",
                order_id: razorpayOrderId,

                handler: async function (response) {
                    console.log("✅ SUCCESS");

                    await axios.post("${import.meta.env.VITE_BACKEND_URL}/update-order", {
                        id: order._id,
                        status: "Paid",
                        paymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id
                    });

                    fetchBookings();
                },

                modal: {
                    ondismiss: async function () {
                        console.log("🔥 DISMISSED");

                        await axios.post("${import.meta.env.VITE_BACKEND_URL}/update-order", {
                            id: order._id,
                            status: "Failed"
                        });

                        fetchBookings();
                    }
                }
            };

            // ✅ VERY IMPORTANT (THIS WAS YOUR BUG)
            const rzp = new window.Razorpay(options);

            // ❌ REMOVE ANY OTHER rzp.open(options)
            // ❌ REMOVE duplicate instances

            rzp.open();

        } catch (err) {
            console.error(err);
        }
    };
    const submitReview = async () => {
        const product = reviewOrder.products[0];

        const existing = reviewedOrders[reviewOrder._id];

        const url = existing
            ? `${import.meta.env.VITE_BACKEND_URL}/user-reviews/${existing._id}`
            : "${import.meta.env.VITE_BACKEND_URL}/user-reviews";

        const method = existing ? "PUT" : "POST";

        const res = await fetch(url,
            {
                method: method,

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    productId: product._id,
                    orderId: reviewOrder._id,
                    userEmail: user.email,
                    userName: user.name,
                    rating,
                    comment
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            toast.success(existing ? "Review updated" : "Review added");
            setReviewedOrders(prev => ({ ...prev, [reviewOrder._id]: { rating, comment } }));
            setReviewOrder(null);
            setComment("");

        } else {
            toast.error(data.message);
        }

    };
    return (
        <div className="account-page">
            <div className="profile-header-dark"><Header /></div>

            <div className="account-sidebar">

                <button className={activeTab === "profile" ? "active" : ""}
                    onClick={() => setActiveTab("profile")}>
                    👤 Profile
                </button>

                <button className={activeTab === "history" ? "active" : ""}
                    onClick={() => setActiveTab("history")}>
                    📦 History
                </button>
                <button className={activeTab === "address" ? "active" : ""}
                    onClick={() => setActiveTab("address")}>
                    📍 Address
                </button>
            </div>

            <div className="account-content">

                {activeTab === "profile" && (
                    <>
                        <h2>My Profile</h2>

                        <div className="profile-info-card">

                            <div className="profile-row">
                                <span>Name</span>
                                <p>{user?.name || "No Name"}</p>
                            </div>

                            <div className="profile-row">
                                <span>Email</span>
                                <p>{user?.email || "No Email"}</p>
                            </div>

                        </div>
                    </>
                )}

                {activeTab === "history" && (
                    <>
                        <h2>My History</h2>
                        <div className="history-summary">

                            <div
                                className={`summary-card clickable ${filter === "all" && historyTab === "orders" ? "active-card" : ""}`}
                                onClick={() => {
                                    setFilter("all");
                                    setHistoryTab("orders");
                                }} >
                                <p>Total Orders</p>
                                <h2>{orders.length}</h2>
                            </div>
                            <div className="summary-card clickable"
                                onClick={() => {
                                    setFilter("paid");
                                    setHistoryTab("orders");
                                }}>
                                <p>Paid</p>
                                <h2 className="green">
                                    {orders.filter(o => o.status === "Paid").length}
                                </h2>
                            </div>

                            <div className="summary-card clickable"
                                onClick={() => {
                                    setFilter("pending");
                                    setHistoryTab("orders");
                                }}>
                                <p>Pending</p>
                                <h2 className="orange">
                                    {orders.filter(o => o.status === "Pending").length}
                                </h2>
                            </div>

                            <div className="summary-card clickable"
                                onClick={() => {
                                    setFilter("failed");
                                    setHistoryTab("orders");
                                }}>
                                <p>Failed</p>
                                <h2 className="red">
                                    {orders.filter(o => o.status === "Failed").length}
                                </h2>
                            </div>

                        </div>

                        <div className="history-tabs">

                            <button
                                className={`history-btn ${historyTab === "orders" ? "active-btn" : ""}`}
                                onClick={() => {
                                    setHistoryTab("orders");
                                    setFilter("all");
                                }}
                            >
                                Order History
                            </button>

                            <button
                                className={`history-btn ${historyTab === "transactions" ? "active-btn" : ""}`}
                                onClick={() => {
                                    setHistoryTab("transactions");
                                    setFilter("paid");
                                }}
                            >
                                Transaction History
                            </button>

                        </div>
                        {historyTab === "orders" && (
                            <div className="history-list">

                                {filteredOrders.length === 0 ? (

                                    <p>No orders found</p>

                                ) : (

                                    filteredOrders.map((item) => {

                                        const delivery =
                                            item.deliveryStatus || "Processing";
                                        const isShipped =
                                            ["Shipped", "Delivered"].includes(delivery);

                                        const isDelivered =
                                            delivery === "Delivered";
                                        const status = (item.status || "").toLowerCase();
                                        return (

                                            <div
                                                className="history-card"
                                                key={item._id} >

                                                <h4>{item.name}</h4>

                                                <p>₹{item.amount}</p>

                                                <div className="order-meta">

                                                    <span
                                                        className={`status ${status}`}>
                                                        {item.status}
                                                    </span>

                                                    <span className="date">
                                                        {new Date(item.date).toLocaleString("en-IN", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short"
                                                        })}
                                                    </span>

                                                </div>

                                                {status === "failed" ? (

                                                    <div className="payment-failed-box">
                                                        ❌ Payment Failed
                                                    </div>

                                                ) : status === "pending" ? (

                                                    <div className="payment-pending-box">
                                                        ⏳ Payment Pending
                                                    </div>

                                                ) : (

                                                    <div className="delivery-tracker">

                                                        {/* PROCESSING */}
                                                        <div className={`step ${delivery === "Processing"
                                                            ? "current"
                                                            : isShipped
                                                                ? "completed"
                                                                : ""
                                                            }`}>
                                                            <span className="step-icon">📦</span>
                                                            <p>Packaging</p>
                                                        </div>

                                                        {/* LINE 1 */}
                                                        <div className={`line ${isShipped ? "active" : ""}`}></div>

                                                        {/* SHIPPED */}
                                                        <div className={`step ${delivery === "Shipped"
                                                            ? "current"
                                                            : isDelivered
                                                                ? "completed"
                                                                : isShipped
                                                                    ? "completed"
                                                                    : ""
                                                            }`}>
                                                            <span>🚚</span>
                                                            <p>Shipped</p>
                                                        </div>

                                                        {/* LINE 2 */}
                                                        <div className={`line ${isDelivered ? "active" : ""}`}></div>

                                                        {/* DELIVERED */}
                                                        <div className={`step ${isDelivered ? "completed" : ""}`}>
                                                            <span>✅</span>
                                                            <p>Delivered</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {isDelivered && (
                                                    <><p className="delivered-msg">  🎉 Your order has been delivered successfully.</p>

                                                        {item.deliveredAt && (
                                                            <p className="delivered-date">
                                                                Delivered on{" "}
                                                                {new Date(item.deliveredAt).toLocaleString("en-IN", {
                                                                    dateStyle: "medium",
                                                                    timeStyle: "short"
                                                                })}
                                                            </p>
                                                        )}
                                                    </>
                                                )}

                                                <button className="view-details-btn" onClick={() => setSelectedOrder(item)}>View Details</button>
                                                {
                                                    isDelivered && (
                                                        reviewedOrders[item._id]
                                                            ? (
                                                                <div className="user-review">


                                                                    <div className="review-header">

                                                                        <h3>Your Review</h3>

                                                                        <button className="edit-review-btn"
                                                                            onClick={() => {
                                                                                setRating(reviewedOrders[item._id].rating);
                                                                                setComment(reviewedOrders[item._id].comment);
                                                                                setReviewOrder(item);
                                                                            }}>
                                                                            Edit
                                                                        </button>

                                                                    </div>
                                                                    <div className="profile-review-stars">

                                                                        {[1, 2, 3, 4, 5].map((star) => (

                                                                            <span key={star}>

                                                                                {reviewedOrders[item._id].rating >= star ? (

                                                                                    <FaStar className="filled-stars" />

                                                                                ) : reviewedOrders[item._id].rating >= star - 0.5 ? (

                                                                                    <FaStarHalfAlt className="filled-stars" />

                                                                                ) : (

                                                                                    <FaRegStar className="empty-stars" />

                                                                                )}

                                                                            </span>

                                                                        ))}

                                                                    </div>

                                                                    <p>{reviewedOrders[item._id].comment}</p>

                                                                </div>
                                                            ) : (
                                                                <button className="review-btn" onClick={() => setReviewOrder(item)}>
                                                                    Write Review
                                                                </button>
                                                            )

                                                    )
                                                }
                                                {
                                                    item.status === "Paid" && (
                                                        <button className="view-details-btn" onClick={() => downloadInvoice(item)}  >
                                                            Download Invoice
                                                        </button>

                                                    )
                                                }
                                                {item.status === "Failed" && (
                                                    <button className="retry-payment-btn" onClick={() => handleRetryPayment(item)}>Retry Payment</button>
                                                )}
                                            </div>


                                        );
                                    })

                                )}

                            </div>
                        )}

                        {historyTab === "transactions" && (
                            <div className="history-list">

                                {orders
                                    .filter(item => item.status === "Paid").map((item) => {

                                        const status =
                                            (item.status || "").toLowerCase();

                                        return (

                                            <div
                                                className="history-card"
                                                key={item._id}
                                            >

                                                <h4>{item.name}</h4>

                                                <p>₹{item.amount}</p>

                                                <div className="order-meta">

                                                    <span className={`status ${status}`}>
                                                        {item.status}
                                                    </span>

                                                    <span className="date">
                                                        {new Date(item.date).toLocaleString("en-IN", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short"
                                                        })}
                                                    </span>

                                                </div>

                                                {/* PAYMENT METHOD */}
                                                <p>
                                                    <strong>Payment Method:</strong>{" "}

                                                    {item.paymentMethod === "upi" && "UPI"}

                                                    {item.paymentMethod === "card" && "Card"}

                                                    {item.paymentMethod === "wallet" && "Wallet"}

                                                    {item.paymentMethod === "netbanking" && "Net Banking"}
                                                </p>

                                                {/* ORDER DETAILS */}
                                                <p>
                                                    <strong>Order ID:</strong> {item._id}
                                                </p>

                                                <p>
                                                    <strong>Transaction ID:</strong>{" "}
                                                    {item.paymentId || "Not Available"}
                                                </p>

                                                <p>
                                                    <strong>Razorpay Order ID:</strong>{" "}
                                                    {item.razorpayOrderId || "Not Available"}
                                                </p>

                                                <button
                                                    onClick={() => setSelectedOrder(item)}
                                                >
                                                    View More
                                                </button>

                                                {item.status !== "Paid" && (
                                                    <button
                                                        className="retry-btn"
                                                        onClick={() => handleRetryPayment(item)}
                                                    >
                                                        {item.status === "Pending"
                                                            ? "Pay Now"
                                                            : "Retry Payment"}
                                                    </button>
                                                )}

                                            </div>

                                        );
                                    })}

                            </div>
                        )}
                    </>
                )}
                {activeTab === "address" && (
                    <>
                        <h2>My Address</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                padding: "10px 15px",
                                marginBottom: "15px",
                                background: "#c9a44c",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            {showForm ? "Cancel" : "+ Add Address"}
                        </button>


                        <div className="saved-address-list">
                            {currentUser?.addresses?.map((addr, i) => (
                                <div className="address-card" key={addr._id}>

                                    <h4>{addr.fullName}</h4>

                                    <p className="phone">📞 {addr.phone}</p>

                                    {addr.altPhone && (
                                        <p className="alt-phone">Alt: {addr.altPhone}</p>
                                    )}
                                    <p className="address-text">
                                        {addr.address}, {addr.city}
                                    </p>

                                    <div className="address-actions">
                                        <button className="edit-btn"
                                            onClick={() => handleEdit(addr)}>
                                            Edit
                                        </button>
                                        <button className="delete-btn"
                                            onClick={() => deleteAddress(addr._id.toString())}>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </>
                )}

            </div>
            {/* ✅ ADD HERE */}
            {
                showForm && (
                    <div className="modal-overlay">

                        <div className="modal-box">

                            <h3>{editId ? "Edit Address" : "Add Address"}</h3>

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Primary Mobile Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Alternate Mobile Number"
                                value={altPhone}
                                onChange={(e) => setAltPhone(e.target.value)}
                            />

                            <textarea
                                placeholder="Enter full address"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            ></textarea>
                            <input
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <div className="modal-actions">
                                <button onClick={() => setShowForm(false)}>Cancel</button>
                                <button onClick={saveAddress}>Save</button>
                            </div>

                        </div>

                    </div>
                )
            }
            {
                selectedOrder && (
                    <div className="order-popup">
                        <div className="order-popup-content">

                            <h3>Order Details</h3>

                            {selectedOrder.products && selectedOrder.products.length > 0 ? (
                                selectedOrder.products.map((p, index) => (
                                    <div key={index} className="popup-product-row">

                                        <div className="popup-product-name">
                                            {p.name}
                                        </div>

                                        <div className="popup-line">
                                            <span>Quantity</span>
                                            <span>{p.qty}</span>
                                        </div>

                                        <div className="popup-line">
                                            <span>Price</span>
                                            <span>₹{p.price}</span>
                                        </div>

                                        <div className="popup-line">
                                            <span>Subtotal</span>
                                            <span>₹{p.price * p.qty}</span>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>No product details available</p>
                            )}

                            <div className="popup-total">
                                <p>GST: 3%</p>
                                <h4>Total: ₹{selectedOrder.amount}</h4>
                            </div>

                            <button onClick={() => setSelectedOrder(null)}>
                                Close
                            </button>

                        </div>
                    </div>
                )
            }
            {
                reviewOrder && (

                    <div className="review-modal">

                        <div className="review-box">
                            <button className="review-x-btn" onClick={() => setReviewOrder(null)}>✕</button>
                            <h3>Write Review</h3>

                            <div className="star-rating-input">

                                {[1, 2, 3, 4, 5].map((star) => {

                                    const currentRating = hover || rating;

                                    return (

                                        <div key={star} className="star-wrapper">

                                            <span
                                                className="half-star"
                                                onMouseEnter={() => setHover(star - 0.5)}
                                                onMouseLeave={() => setHover(null)}
                                                onClick={() => setRating(star - 0.5)}
                                            />

                                            <span
                                                className="full-star"
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(null)}
                                                onClick={() => setRating(star)}
                                            />

                                            <span className="star-icon">

                                                {currentRating >= star ? (

                                                    <FaStar />

                                                ) : currentRating >= star - 0.5 ? (

                                                    <FaStarHalfAlt />

                                                ) : (

                                                    <FaRegStar />

                                                )}

                                            </span>

                                        </div>

                                    );

                                })}

                            </div>

                            <textarea
                                placeholder="Write review"
                                value={comment}
                                onChange={(e) =>
                                    setComment(
                                        e.target.value
                                    )
                                }
                            />

                            <div className="review-actions">
                                <button
                                    className="review-close-btn"
                                    onClick={() => setReviewOrder(null)}>
                                    Cancel
                                </button>

                                <button
                                    className="review-submit-btn"
                                    onClick={submitReview}
                                >
                                    Submit Review
                                </button>
                            </div>

                        </div>
                    </div>

                )
            }
        </div >
    );
}

export default Profile;