import React from 'react'
import Cta from '../common/Cta'
import Header from '../common/Header'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div>
            <Header />

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-particles" id="particles" />
                </div>

                <div className="hero-content">
                    <p className="hero-eyebrow animate-up">New Collection 2025</p>
                    <h1 className="hero-title animate-up delay-1">
                        Adorn Yourself<br /><em>In Timeless</em><br />Elegance
                    </h1>
                    <p className="hero-subtitle animate-up delay-2">
                        Handcrafted jewellery for those who dare to shine
                    </p>

                    <div className="hero-cta animate-up delay-3">
                        <Link to="/shop" className="btn-primary">Explore Collection</Link>
                        <Link to="/about" className="btn-ghost">Our Story</Link>
                    </div>
                </div>

                <div className="hero-scroll">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>

                <div className="float-gem gem-1">💎</div>
                <div className="float-gem gem-2">✦</div>
                <div className="float-gem gem-3">◈</div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-strip">
                <div className="marquee-inner">
                    <span>✦ Free Shipping Over ₹2999</span>
                    <span>◈ Certified Pure Gold & Silver</span>
                    <span>✦ Handcrafted by Artisans</span>
                    <span>◈ 30-Day Easy Returns</span>
                </div>
            </div>

            {/* CATEGORIES */}
            <section className="categories section-pad">
                <div className="container">
                    <div className="section-header">
                        <p className="eyebrow">Shop By Category</p>
                        <h2 className="section-title">Find Your <em>Perfect Piece</em></h2>
                    </div>

                    <div className="cat-grid">

                        <Link to="/shop?cat=rings" className="cat-card">
                            <div className="cat-img">
                                <div className="cat-icon">💍</div>
                                <div className="cat-shimmer" />
                            </div>
                            <h3>Rings</h3>
                            <p>240+ Designs</p>
                            <span className="cat-link">Shop Now →</span>
                        </Link>

                        <Link to="/shop?cat=necklaces" className="cat-card delay-1">
                            <div className="cat-img">
                                <div className="cat-icon">📿</div>
                                <div className="cat-shimmer" />
                            </div>
                            <h3>Necklaces</h3>
                            <p>180+ Designs</p>
                            <span className="cat-link">Shop Now →</span>
                        </Link>

                        <Link to="/shop?cat=earrings" className="cat-card delay-2">
                            <div className="cat-img">
                                <div className="cat-icon">✨</div>
                                <div className="cat-shimmer" />
                            </div>
                            <h3>Earrings</h3>
                            <p>320+ Designs</p>
                            <span className="cat-link">Shop Now →</span>
                        </Link>

                        <Link to="/shop?cat=bracelets" className="cat-card delay-3">
                            <div className="cat-img">
                                <div className="cat-icon">⌚</div>
                                <div className="cat-shimmer" />
                            </div>
                            <h3>Bracelets</h3>
                            <p>150+ Designs</p>
                            <span className="cat-link">Shop Now →</span>
                        </Link>

                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="products section-pad bg-cream">
                <div className="container">

                    <div className="section-header">
                        <p className="eyebrow">Curated For You</p>
                        <h2 className="section-title">Bestselling <em>Jewellery</em></h2>
                    </div>

                    <div className="text-center mt-40">
                        <Link to="/shop" className="btn-outline">View All Products</Link>
                    </div>

                </div>
            </section>

            <Cta />

            {/* TESTIMONIALS */}
            <section className="testimonials section-pad">
                <div className="container">
                    <div className="section-header">
                        <p className="eyebrow">Happy Customers</p>
                        <h2 className="section-title">What They <em>Say</em></h2>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="newsletter section-pad bg-dark">
                <div className="container narrow">
                    <div className="newsletter-content">
                        <p className="eyebrow light">Stay Updated</p>
                        <h2 className="section-title light">Get <em>Exclusive</em> Offers</h2>

                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" required />
                            <button type="submit" className="btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home