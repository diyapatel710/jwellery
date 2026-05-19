import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { handleRazorpayPayment } from "../js/checkout";
import toast from "react-hot-toast";
function Checkout() {
    const [userData, setUserData] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("jwello_user"));

            if (!user) {
                TransformStream.error("Please login first");
                return;
            }

            // ✅ FIXED BACKTICKS
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-user/${user.email}`);
            const data = await res.json();

            setUserData(data);

            const defaultAddr = data.addresses?.find(a => a.isDefault);

            if (defaultAddr) {
                setSelectedAddress(defaultAddr);
            } else if (data.addresses?.length > 0) {
                setSelectedAddress(data.addresses[0]);
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="cart-header-dark">
                <Header />
            </div>

            <div className="checkout-page">
                <div className="checkout-hero">
                    <h1>Checkout</h1>
                </div>

                <div className="checkout-box">
                    {!userData ? (
                        <p>Loading addresses...</p>
                    ) : (
                        <>
                            <div className="address-selection">
                                <h3>Select Delivery Address</h3>

                                {userData.addresses?.length === 0 && (
                                    <p>No address found. Please add address in profile.</p>
                                )}

                                <div className="address-list">
                                    {userData.addresses?.map(addr => (
                                        <div key={addr._id} onClick={() => setSelectedAddress(addr)} className={
                                            `compact-address ${selectedAddress?._id === addr._id ? "active" : ""}`}>
                                            <input type="radio" checked={selectedAddress?._id === addr._id} readOnly />

                                            <div>
                                                <strong>{addr.fullName}</strong>
                                                <p>{addr.address}</p>
                                                <span>   Mobile No: +91 {addr.phone}</span>

                                                {addr.altPhone && (
                                                    <span>
                                                        Alternate No: +91 {addr.altPhone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="checkout-btn"
                                disabled={!selectedAddress}
                                onClick={() => {
                                    if (!selectedAddress) {
                                        toast.error("Please select address");
                                        return;
                                    }

                                    // ✅ PASS ADDRESS CORRECTLY
                                    const user = JSON.parse(localStorage.getItem("jwello_user"));
                                    const cartKey = `jwello_cart_${user?.email}`;
                                    const buyNowProduct =
                                        JSON.parse(localStorage.getItem("buyNowProduct"));

                                    const cart =
                                        buyNowProduct ||
                                        JSON.parse(localStorage.getItem(cartKey)) ||
                                        [];

                                    console.log("CART DATA:", cart); // 👈 DEBUG

                                    const total = cart.reduce((sum, item) => {
                                        return sum + (item.price || item.productPrice || 0) * (item.qty || item.quantity || 1);
                                    }, 0);


                                    const gst = total * 0.03;
                                    const finalAmount = Number((total + gst).toFixed(2));

                                    // ❗ IMPORTANT CHECK
                                    if (!finalAmount || finalAmount <= 0) {
                                        toast.error("Cart is empty or invalid ❌");
                                        return;
                                    }

                                    // optional GST

                                    handleRazorpayPayment(selectedAddress, finalAmount, cart);
                                }}
                            >
                                Pay Now
                            </button>
                        </>
                    )}
                </div>
            </div >

            <Footer />
        </>
    );
}

export default Checkout;