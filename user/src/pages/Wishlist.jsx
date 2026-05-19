import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

function Wishlist() {
    const user = JSON.parse(localStorage.getItem("jwello_user")) || {};
    const [wishlist, setWishlist] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(`jwello_wishlist_${user.email}`)) || [];
        setWishlist(data);

        if (location.pathname !== "/wishlist") {
            return;
        }

        document.body.style.cursor = "default";

        const navbar = document.querySelector(".navbar");

        if (navbar) {
            navbar.classList.add("scrolled");
        }

        return () => {
            document.body.style.cursor = "";

            if (navbar) {
                navbar.classList.remove("scrolled");
            }
        };
    }, [location.pathname, location.search]);
    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);

        setWishlist(updatedWishlist);

        localStorage.setItem(`jwello_wishlist_${user.email}`, JSON.stringify(updatedWishlist));
    };
    const handleAddToCart = (product) => {
        const cartKey = `jwello_cart_${user.email}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const exists = cart.find(item => item.id === product.id);

        if (exists) {
            cart = cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            cart.push({
                ...product,
                qty: 1
            });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));

        window.dispatchEvent(new Event("cartUpdated"));

        toast / ("Added to cart");
    };
    return (
        <>
            <div
                className="profile-header-dark"
                style={{ position: "relative", zIndex: 9999 }}
                key={location.pathname + location.search}
            >
                <Header />
            </div>
            <section
                className="section-pad"
                style={{
                    paddingTop: "140px",
                    minHeight: "100vh"
                }}
            >
                <div className="container">

                    <div className="section-header">
                        <div className="eyebrow">Your Collection</div>
                        <h2 className="section-title">My Wishlist</h2>
                        <p>Pieces you've fallen in love with</p>
                    </div>


                    {wishlist.length === 0 ? (

                        <div style={{ textAlign: "center", marginTop: "40px" }}>

                            <p>No wishlist items found</p>

                            <button
                                className="wishlist-shop-btn"
                                onClick={() => navigate("/shop")}   >
                                Browse Collection
                            </button>

                        </div>

                    ) : (
                        <div className="product-grid">
                            {wishlist.map((item) => (
                                <div className="product-card" key={item.id}>
                                    <div className="product-img">

                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}${item.images?.[0]}`}
                                            alt={item.name}
                                        />

                                    </div>

                                    <div className="product-info">
                                        <div className="product-category">
                                            {item.category}
                                        </div>

                                        <h3 className="product-name">
                                            {item.name}
                                        </h3>

                                        <div className="product-price">
                                            <span className="price-current">
                                                ₹{item.price}
                                            </span>

                                            <span className="price-old">
                                                ₹{item.oldPrice}
                                            </span>

                                            <span className="price-off">
                                                {item.badge}
                                            </span>
                                        </div>

                                        <button
                                            className="add-to-cart"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </button>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}

export default Wishlist;