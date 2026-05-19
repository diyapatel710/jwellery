import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { toast } from "react-hot-toast";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [canReview, setCanReview] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const fetchProduct = async () => {
<<<<<<< HEAD
        const res = await fetch(`http://localhost:8000/products/${id}`);
=======
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382

        const data = await res.json();

        setProduct(data);
    };
    const fetchReviews = async () => {

        const user =
            JSON.parse(localStorage.getItem("jwello_user"));

        const res = await fetch(
<<<<<<< HEAD
            `http://localhost:8000/product-reviews/${id}`
=======
            `${import.meta.env.VITE_BACKEND_URL}/product-reviews/${id}`
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
        );

        const data = await res.json();

        setReviews(data);

        const existing =
            data.find(
                r => r.userEmail === user?.email
            );

        if (existing) {

            setEditingReviewId(existing._id);

        } else {

            setEditingReviewId(null);

        }

    };
    const checkReviewEligibility = async () => {

        const user =
            JSON.parse(localStorage.getItem("jwello_user"));

        if (!user) return;

        const res = await fetch(
<<<<<<< HEAD
            `http://localhost:8000/can-review/${id}/${user.email}`
=======
            `${import.meta.env.VITE_BACKEND_URL}/can-review/${id}/${user.email}`
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
        );

        const data = await res.json();

        const existingReview =
            reviews.find(
                r => r.userEmail === user.email
            );

        setCanReview(
            data.canReview && !existingReview
        );

        setOrderId(data.orderId || "");

    };
    const handleReviewSubmit = async () => {
        const user = JSON.parse(localStorage.getItem("jwello_user"));
        if (!user) {
            toast.error("Login first");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please write review");
            return;
        }
        const res = await fetch(

            editingReviewId
<<<<<<< HEAD
                ? `http://localhost:8000/product-reviews/${editingReviewId}`
                : "http://localhost:8000/product-reviews",
=======
                ? `${import.meta.env.VITE_BACKEND_URL}/product-reviews/${editingReviewId}`
                : `${import.meta.env.VITE_BACKEND_URL}/product-reviews`,
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382

            {
                method:
                    editingReviewId ? "PUT" : "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    productId: product._id,
                    orderId,
                    userEmail: user.email,
                    userName: user.name,
                    rating,
                    comment
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            toast.success(editingReviewId ? "Review updated" : "Review added");
            setComment("");
            fetchReviews();
            setShowEditPopup(false);
        } else {
            toast.error(data.message);
        }

    };
    useEffect(() => {

        const loadData = async () => {

            setEditingReviewId(null);
            setCanReview(false);

            await fetchProduct();
            await fetchReviews();
            await checkReviewEligibility();

        };

        loadData();

    }, [id]);
    if (!product) return (
        <>
            <Header />
            <h2 style={{ padding: "2rem", textAlign: "center" }}>Loading...</h2>
            <Footer />
        </>
    );
    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem("jwello_user"));
        if (!user) {
            toast.error("Please login first ❌");
            return;
        }
        if (product.stock <= 0) {
            toast.error("Out Of Stock ❌");
            return;
        }
        const cartKey = `jwello_cart_${user.email}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const exists = cart.find(item => item._id === product._id);
        if (exists && exists.qty >= product.stock) {
            toast.error(`Only ${product.stock} items available`);
            return;
        }
        if (exists) {
            const updatedCart = cart.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));
            toast.success("Cart quantity updated ✅");
        } else {
            // Add new product
            cart.push({ ...product, qty: 1 });
            localStorage.setItem(cartKey, JSON.stringify(cart));
            toast.success("Product added to cart ✅");
        }
        // Optional: Trigger a global cart update event for header/cart icon
        window.dispatchEvent(new Event("cartUpdated"));
    };
    const handleBuyNow = () => {
        localStorage.setItem("buyNowProduct", JSON.stringify([{
            ...product, qty: 1
        }]));
        window.location.href = "/checkout";
    };
    const isOutOfStock = product.stock <= 0;
    return (
        <>
            <div className="about-header-dark"><Header /></div>
            <div className="product-details">
                <div className="product-left">
<<<<<<< HEAD
                    <img src={product.images?.[0] ? `http://localhost:8000${product.images[0]}` : "/placeholder.png"} alt={product.name} />
=======
                    <img src={product.images?.[0] ? `${import.meta.env.VITE_BACKEND_URL}${product.images[0]}` : "/placeholder.png"} alt={product.name} />
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                </div>

                <div className="product-right">
                    <p className="product-category-detail">{product.category}   </p>
                    <h1>{product.name}</h1>
                    <div className="detail-price">
                        <span className="current-price">₹{product.price}</span>
                        <div className="product-rating">
                            <span className="star">★</span>
                            <span>{product.ratings?.average || 0}</span>
                            <span>({product.ratings?.count || 0} Reviews)</span>
                        </div>
                        {product.mrp && product.mrp > product.price && (
                            <div className="price-row">
                                <span className="old-price"> ₹{product.mrp}</span>
                                <span className="discount">
                                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="stock-status">{isOutOfStock ? "❌ Out Of Stock" : `✓ ${product.stock} In Stock`}</p>
                    <p> {product.description || "Luxury jewellery crafted with timeless elegance."}</p>
                    <div className="product-features">
                        <p>✔ Premium Quality Jewellery</p>
                        <p>✔ Certified Craftsmanship</p>
                        <p>✔ Easy Returns Available</p>
                        <p>✔ Secure Payments</p>
                    </div>
                    <div className="product-buttons">
                        <button onClick={handleAddToCart} disabled={isOutOfStock}>{isOutOfStock ? "Out Of Stock" : "Add To Cart"}</button>
                        <button onClick={handleBuyNow} disabled={isOutOfStock}>{isOutOfStock ? "Unavailable" : "Buy Now"}</button>
                    </div>
                    <div className="delivery-info">
                        <h4>Delivery Information</h4>
                        <p>Free delivery available across India. Estimated delivery within 3-5 business days.</p>
                    </div>
                    <div className="product-specs">
                        <h4>Specifications</h4>
                        <ul>
                            <li>Category: {product.category}</li>
                            <li>Material: Premium Finish</li>
                            <li>Warranty: 1 Year</li>
                            <li>SKU: {product._id.slice(-6)}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="reviews-section">

                <h3>Ratings & Reviews</h3>
                {canReview && !editingReviewId && (
                    <div className="write-review-box">
                        <h4>Write Review</h4>
                        <div className="review-form">
                            <div className="star-rating-input">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const currentRating = hover || rating;
                                    return (
                                        <div key={star} className="star-wrapper">
                                            <span className="half-star" onMouseEnter={() => setHover(star - 0.5)}
                                                onMouseLeave={() => setHover(null)} onClick={() => setRating(star - 0.5)} />
                                            <span className="full-star" onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(null)} onClick={() => setRating(star)} />
                                            <span className="star-icon">
                                                {currentRating >= star ? (<FaStar />) :
                                                    currentRating >= star - 0.5 ? (<FaStarHalfAlt />) :
                                                        (<FaRegStar />)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <textarea placeholder="Write your review" value={comment} maxLength={300} onChange={(e) => setComment(e.target.value)} />
                            <p className="char-count">{comment.length}/300</p>
                            <button onClick={handleReviewSubmit}>{editingReviewId ? "Update Review" : "Submit Review"} </button>
                        </div>
                    </div>)}
                <div className="reviews-list">
                    {reviews.length === 0 ? (
                        <div className="empty-review">
                            <h4>No Reviews Yet</h4>
                            <p>Be the first to share your experience.</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div className="review-card" key={review._id}>
                                <div className="review-header">
                                    <div className="review-header-left">
                                        <div className="review-user-top">
                                            <h3>{review.userName}</h3>
                                            <div className="review-stars">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}>
                                                        {review.rating >= star ? (
                                                            <FaStar className="filled-stars" />
                                                        ) : review.rating >= star - 0.5 ? (
                                                            <FaStarHalfAlt className="filled-stars" />
                                                        ) : (<FaRegStar className="empty-stars" />)}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="review-date">{new Date(review.createdAt).toLocaleDateString("en-IN")}                                    </p>
                                        <span className="verified-badge">✔ Verified Purchase</span>
                                    </div>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                {JSON.parse(localStorage.getItem("jwello_user"))?.email
                                    === review.userEmail && (

                                        <button className="edit-review-btn" onClick={() => {
                                            setRating(review.rating);
                                            setComment(review.comment);
                                            setEditingReviewId(review._id);
                                            setShowEditPopup(true);
                                        }}>
                                            Edit Review
                                        </button>
                                    )}
                            </div>
                        ))
                    )}
                </div>
            </div >{showEditPopup && (

                <div className="modal-overlay">

                    <div className="modal-box">
                        <button className="close-popup-btn" onClick={() => setShowEditPopup(false)}>
                            ✕
                        </button>
                        <h3>Edit Review</h3>

                        <div className="star-rating-input">

                            {[1, 2, 3, 4, 5].map((star) => {

                                const currentRating =
                                    hover || rating;

                                return (

                                    <div
                                        key={star}
                                        className="star-wrapper"
                                    >

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
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                        />

                        <button onClick={handleReviewSubmit}>
                            Update Review
                        </button>

                    </div>

                </div>

            )}
            <Footer />
        </>
    );
}
export default ProductDetails;