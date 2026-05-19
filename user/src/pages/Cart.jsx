import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import toast from "react-hot-toast";
function Cart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const navbar = document.querySelector(".navbar");

        if (navbar) navbar.classList.add("scrolled");

        const loadCart = () => {
            const user = JSON.parse(localStorage.getItem("jwello_user")) || {};
            const cartKey = `jwello_cart_${user?.email}`;
            const saved = JSON.parse(localStorage.getItem(cartKey)) || [];
            setCart(saved);
        };

        loadCart();
        const fetchCoupons = async () => {

            try {

                const res = await fetch(
<<<<<<< HEAD
                    "http://localhost:8000/coupons"
=======
                    `${import.meta.env.VITE_BACKEND_URL}/coupons`
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                );

                const data = await res.json();

                setCoupons(data);

            } catch (err) {

                console.log(err);

            }

        };

        fetchCoupons();
        window.addEventListener("cartUpdated", loadCart);

        return () => {
            if (navbar) navbar.classList.remove("scrolled");
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, []);

    const saveCart = (updated) => {
        const user = JSON.parse(localStorage.getItem("jwello_user")) || {};
        const cartKey = `jwello_cart_${user?.email || "guest"}`;

        setCart(updated);
        localStorage.setItem(cartKey, JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const clearCart = () => saveCart([]);

    const removeItem = (id) => {
        saveCart(cart.filter((item) => item._id !== id));
    };

    const changeQty = (id, delta) => {
        const updated = cart.map((item) =>
            item._id === id
                ? { ...item, qty: Math.max(1, item.qty + delta) }
                : item
        );
        saveCart(updated);
    };

    const applyCoupon = async (selectedCode) => {

        const finalCoupon = selectedCode || coupon;

        if (!finalCoupon) {

            toast.error("Enter coupon code");

            return;

        }

        try {

            const res = await fetch(
<<<<<<< HEAD
                `http://localhost:8000/coupons/${finalCoupon}`
=======
                `${import.meta.env.VITE_BACKEND_URL}/coupons/${finalCoupon}`
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
            );

            const data = await res.json();

            if (!data.success) {

                toast.error("Invalid coupon");

                return;

            }

            const couponData = data.data;

            // EXPIRED
            const now = new Date();

            const expiry =
                new Date(couponData.expiry);

            if (expiry < now) {

                toast.error("Coupon expired");

                return;

            }

            // MINIMUM AMOUNT
            if (subtotal < couponData.minAmount) {

                toast.error(
                    `Minimum order ₹${couponData.minAmount}`
                );

                return;

            }

            // LIMIT
            if (couponData.used >= couponData.limit) {
                toast.error("Coupon limit reached");
                return;
            }
            setAppliedCoupon(couponData.code);
            // APPLY DISCOUNT
            setDiscount(couponData.discount / 100);
            toast.success(
                `${couponData.code} applied successfully`
            );
        } catch (err) {
            console.log(err);
            toast.error("Coupon error");
        }
    };
    const subtotal = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.qty,
        0
    );
    const gst = Math.round(subtotal * 0.03);
    const disc = Math.round(subtotal * discount);
    const total = subtotal + gst - disc;
    const shipping = subtotal >= 2999 ? "Free" : "₹199";

    return (
        <>
            <div className="cart-header-dark">
                <Header />

                <div className="cart-page">

                    <div className="cart-hero">
                        <h1>Your <em>Cart</em></h1>
                    </div>

                    <div className="container">
                        <div className="cart-layout">

                            <div className="cart-items-wrap">

                                <div className="cart-items-header">
                                    <h3>Items ({cart.length})</h3>

                                    <button
                                        onClick={clearCart}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            fontSize: "0.8rem",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <div className="cart-empty">
                                        <div className="cart-empty-icon">🛍️</div>
                                        <h3>Your cart is empty</h3>
                                        <p>Discover our exquisite jewellery collection.</p>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item._id} className="cart-item">

                                            <div className="ci-img">
                                                <img
<<<<<<< HEAD
                                                    src={`http://localhost:8000${item.images?.[0]}`}
=======
                                                    src={`${import.meta.env.VITE_BACKEND_URL}${item.images?.[0]}`}
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                                                    alt={item.name}
                                                    className="cart-product-image"
                                                />
                                            </div>

                                            <div className="ci-info">
                                                <h4>{item.name}</h4>
                                                <p>Gold · Size 8 · 18K Yellow Gold</p>

                                                <div className="ci-qty">
                                                    <button onClick={() => changeQty(item._id, -1)}>−</button>
                                                    <span>{item.qty}</span>
                                                    <button onClick={() => changeQty(item._id, 1)}>+</button>
                                                </div>
                                            </div>

                                            <div className="ci-price">
                                                <strong>
                                                    ₹{(Number(item.price) * item.qty).toFixed(2)}
                                                </strong>

                                                <button
                                                    className="ci-remove"
                                                    onClick={() => removeItem(item._id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                        </div>
                                    ))
                                )}

                            </div>

                            <aside className="cart-summary">

                                <h3>Order Summary</h3>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <strong>₹{subtotal.toFixed(2)}</strong>
                                </div>

                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <strong>{shipping}</strong>
                                </div>


                                <div className="summary-row">
                                    <span>Discount</span>
                                    <strong style={{ color: "#2e7d32" }}>−₹{disc}</strong>
                                </div>

                                <div className="summary-row">
                                    <span>Delivery Address</span>
                                    <strong className="address-note">Enter during checkout</strong>
                                </div>

                                <div className="summary-row">
                                    <span>GST (3%)</span>
                                    <strong>₹{gst.toFixed(2)}</strong>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <strong>₹{total.toFixed(2)}</strong>
                                </div>

                                <div className="coupon-row">

                                    <input
                                        type="text"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        placeholder="Enter coupon code"
                                    />
                                    <button onClick={applyCoupon}>Apply</button>
                                </div>
                                <div
                                    style={{
                                        marginTop: "15px"
                                    }}
                                >

                                    <p
                                        style={{
                                            fontWeight: "600",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Available Coupons
                                    </p>

                                    {
                                        coupons
                                            .filter(
                                                (c) => total >= Number(c.minAmount)
                                            )
                                            .map((c) => (

                                                <div key={c._id} onClick={() => {

                                                    // REMOVE SAME COUPON
                                                    if (appliedCoupon === c.code) {

                                                        setCoupon("");
                                                        setDiscount(0);
                                                        setAppliedCoupon(null);

                                                        toast.success("Coupon removed");

                                                        return;
                                                    }

                                                    // APPLY NEW COUPON
                                                    setCoupon(c.code);

                                                    setTimeout(() => {
                                                        applyCoupon(c.code);
                                                    }, 100);

                                                }}
                                                    style={{
                                                        border: "1px dashed #caa243",
                                                        borderRadius: "8px",
                                                        padding: "10px",
                                                        marginBottom: "10px",
                                                        fontSize: "0.9rem",
                                                        cursor: "pointer"
                                                    }}
                                                >

                                                    <strong>{c.code}</strong>

                                                    <p>
                                                        {c.discount}% OFF
                                                    </p>

                                                    <small>
                                                        Min Order ₹{c.minAmount}
                                                    </small>

                                                </div>

                                            ))
                                    }

                                </div>
                                <button
                                    className="checkout-btn"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceed to Checkout →
                                </button>

                            </aside>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Cart;