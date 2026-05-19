import React, { useState, useEffect, useMemo } from 'react'
import Header from '../common/Header'
import { useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import Footer from '../common/Footer';
function Shop() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("jwello_user"));
    const [wishlistIds, setWishlistIds] = useState([]);
    const [category, setCategory] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setCategory(query.get("cat"));
    }, [location]);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem(`jwello_wishlist_${user.email}`)) || [];
        setWishlistIds(wishlist.map(item => item._id));
    }, []);

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("");
    const [metal, setMetal] = useState("all");
    const [sort, setSort] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        // CATEGORY
        if (category) { filtered = filtered.filter(item => item.category === category); }

        if (search) { filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase())); }

        if (metal !== "all") {
            filtered = filtered.filter(item => item.metal?.toLowerCase() === metal.toLowerCase());
        }

        // SORT
        if (sort === "low-high") { filtered.sort((a, b) => a.price - b.price); }

        else if (sort === "high-low") { filtered.sort((a, b) => b.price - a.price); }

        return filtered;

    }, [products, category, search, metal, sort]);

    const handleAddToCart = (product) => {
        const user = JSON.parse(localStorage.getItem("jwello_user"));

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const cartKey = `jwello_cart_${user.email}`;

        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const exists = cart.find(item => item._id === product._id);
        if (exists) {

            toast("Item already in cart");

            return;

        } else {
            cart.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                oldPrice: product.oldPrice,
                images: product.images,
                category: product.category,
                badge: product.badge,
                qty: 1
            });

            localStorage.setItem(cartKey, JSON.stringify(cart));
        }

        window.dispatchEvent(new Event("cartUpdated"));

        toast.success("Product added to cart");
    };
    const handleAddToWishlist = (product) => {
        let wishlist = JSON.parse(localStorage.getItem(`jwello_wishlist_${user.email}`)) || [];

        const exists = wishlist.find(item => item._id === product._id);

        if (exists) {
            wishlist = wishlist.filter(item => item._id !== product._id);
        } else {
            wishlist.push(product);
        }

        localStorage.setItem(`jwello_wishlist_${user.email}`, JSON.stringify(wishlist));

        setWishlistIds(wishlist.map(item => item._id));
    };
    useEffect(() => {
<<<<<<< HEAD
        fetch("http://localhost:8000/products")
=======
        fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>
            <Header key={location.pathname + location.search} />

            <section className="page-hero">
                <div className="page-hero-bg" />
                <div className="page-hero-content">
                    <p className="eyebrow">Discover</p>
                    <h1 className="page-title">Our <em>Collections</em></h1>
                    <p className="breadcrumb">Home / Shop</p>
                </div>
            </section>

            <section className="shop-section">
                <div className="container">
                    <div className="shop-layout">
                        <main className="shop-main">
                            <div className="shop-filters">
                                <div className="search-box">

                                    <input type="text" placeholder="Search jewellery..." value={search}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearch(value);
                                            if (value.trim() === "") { setSuggestions([]); } else {

                                                const matched = products.filter(item => item.name.toLowerCase()
                                                    .includes(value.toLowerCase()));
                                                setSuggestions(matched.slice(0, 5));
                                            }
                                        }}
                                    />

                                    {suggestions.length > 0 && (
                                        <div className="search-suggestions">
                                            {suggestions.map(item => (
                                                <div key={item._id} className="suggestion-item"
                                                    onClick={() => {
                                                        setSearch(item.name);
                                                        setSuggestions([]);
                                                    }}>{item.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <select value={metal} onChange={(e) => setMetal(e.target.value)}>

                                    <option value="all">All Metals</option>

                                    <option value="gold">Gold</option>

                                    <option value="silver">Silver</option>

                                    <option value="diamond">Diamond</option>
                                </select>
                                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="">Sort By</option>
                                    <option value="low-high">Price Low to High</option>
                                    <option value="high-low">Price High to Low</option>
                                </select>
                                <button
                                    className="reset-filters-btn"
                                    onClick={() => {

                                        setSearch("");
                                        setMetal("all");
                                        setSort("");

                                    }}
                                >

                                    Reset Filters

                                </button>


                            </div>
                            <div className="product-grid">
                                {filteredProducts.map((item) => (
                                    <Link to={`/products/${item._id}`} className="product-link" key={item._id}>
                                        <div className="product-card reveal visible">
                                            <div className="product-img">
<<<<<<< HEAD
                                                <img src={`http://localhost:8000${item.images?.[0]}`} alt={item.name} />
=======
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}${item.images?.[0]}`} alt={item.name} />
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382

                                                <div className="product-actions">
                                                    <button className={`action-btn wishlist-btn 
                                                    ${wishlistIds.includes(item._id) ? "active" : ""}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleAddToWishlist(item);
                                                        }}>
                                                        <FontAwesomeIcon icon={wishlistIds.includes(item._id) ? solidHeart : regularHeart}
                                                        />
                                                    </button>

                                                    <button className="quick-view-btn" onClick={(e) => {
                                                        e.preventDefault();
<<<<<<< HEAD
                                                        setPreviewImage(`http://localhost:8000${item.images?.[0]}`);
=======
                                                        setPreviewImage(`${import.meta.env.VITE_BACKEND_URL}${item.images?.[0]}`);
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                                                    }}>
                                                        👁
                                                    </button>
                                                    {previewImage && (
                                                        <div
                                                            className="image-preview-overlay"
                                                            onClick={() => setPreviewImage(null)}
                                                        >
                                                            <div
                                                                className="image-preview-box"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <button
                                                                    className="close-preview"
                                                                    onClick={() => setPreviewImage(null)}
                                                                >
                                                                    ✕
                                                                </button>

                                                                <img src={previewImage} alt="Preview" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {item.badge && (
                                                    <div className="product-badge">{item.badge}</div>
                                                )}
                                            </div>

                                            <div className="product-info">
                                                <p className="product-category">{item.category}</p>
                                                <h3 className="product-name">{item.name}</h3>

                                                <div className="product-price">
                                                    <span className="price-current">₹{item.price}</span>
                                                    <span className="price-old">{item.oldPrice}</span>
                                                </div>

                                                <button className="add-to-cart" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddToCart(item);
                                                }}>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="shop-toolbar">
                                <p className="result-count">
                                    Showing <strong>{filteredProducts.length}</strong> products
                                </p>
                            </div>
                        </main>

                    </div>
                </div >
            </section >
            {previewImage && (
                <div
                    className="image-preview-overlay"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="image-preview-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-preview"
                            onClick={() => setPreviewImage(null)}
                        >
                            ✕
                        </button>

                        <img src={previewImage} alt="Preview" />
                    </div>
                </div>
            )}
            <Footer />
        </div >
    )
}

export default Shop