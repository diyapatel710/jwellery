import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Cta from "../common/Cta";

const About = () => {
    return (
        <>
            <div className="about-header-dark">
                <Header />
            </div>
            <section className="about-hero">
                <div className="about-hero-orb about-hero-orb-1"></div>
                <div className="about-hero-orb about-hero-orb-2"></div>

                <div className="about-hero-content">
                    <p className="eyebrow" style={{ color: "var(--gold)", animation: "slideUp 0.8s ease 0.3s both" }}>
                        Our Story
                    </p>

                    <h1 className="about-title"
                        style={{ animation: "slideUp 0.8s ease 0.6s both" }}>
                        Crafting <em>Timeless</em>
                        <br />
                        Beauty Since 1995
                    </h1>

                    <p className="about-hero-desc" style={{ animation: "slideUp 0.8s ease 0.9s both" }}>
                        Born in the heart of Mumbai's Zaveri Bazaar, Jwello has been
                        transforming precious metals and gemstones into heirlooms that carry
                        stories across generations.
                    </p>
                </div>
            </section >

            <section className="story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-visual reveal visible">
                            <div className="story-emoji-grid">
                                <div className="story-gem">💍</div>
                                <div className="story-gem">💎</div>
                                <div className="story-gem">📿</div>
                                <div className="story-gem">✨</div>
                            </div>
                            <div className="story-year">1995</div>
                            <div className="story-year-label">Year Founded</div>
                        </div>
                        <div className="story-text reveal delay-1 visible">
                            <p className="eyebrow">The Beginning</p>
                            <h2>A Legacy Born of <em>Passion</em></h2>
                            <p>Jwello was founded in 1995 by master craftsman Rajesh Mehta in a small workshop in Mumbai's iconic Zaveri
                                Bazaar. With nothing but a handful of tools and an uncompromising vision for perfection, he began creating
                                pieces that were as much art as adornment.</p>
                            <p>What started as a one-man operation has grown into one of India's most trusted jewellery brands, with a
                                team of over 200 artisans spread across three workshops — yet our philosophy remains unchanged: every piece
                                must be worthy of becoming a family heirloom.</p>
                            <p>Today, Jwello serves over 50,000 happy customers across India, blending traditional craftsmanship with
                                contemporary design sensibilities to create jewellery that transcends time.</p>
                            <div style={{ marginTop: '2rem' }}><Link to="/shop" className="btn-primary">Explore Collection</Link></div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="values-section">
                <div className="container">
                    <div className="section-header">
                        <p className="eyebrow">What We Stand For</p>
                        <h2 className="section-title">Our Core <em>Values</em></h2>
                    </div>
                    <div className="values-grid">
                        <div className="value-card reveal visible">
                            <span className="value-icon">🏅</span>
                            <h3>Uncompromising Quality</h3>
                            <p>Every piece undergoes rigorous quality checks at each stage of production. We use only BIS hallmarked gold,
                                GIA-certified diamonds, and ethically sourced gemstones.</p>
                        </div>
                        <div className="value-card reveal delay-1 visible">
                            <span className="value-icon">🤝</span>
                            <h3>Ethical Sourcing</h3>
                            <p>We are committed to responsible sourcing. Our diamonds are conflict-free, our gold is responsibly mined,
                                and our artisans earn fair wages in safe working conditions.</p>
                        </div>
                        <div className="value-card reveal delay-2 visible">
                            <span className="value-icon">✨</span>
                            <h3>Master Craftsmanship</h3>
                            <p>Each piece is handcrafted by artisans who have honed their skills over decades. We combine traditional
                                techniques with modern precision to create jewellery of extraordinary beauty.</p>
                        </div>
                        <div className="value-card reveal visible">
                            <span className="value-icon">♻️</span>
                            <h3>Sustainability</h3>
                            <p>Our packaging is 100% recyclable, our workshops run on solar energy, and we offer a lifetime metal exchange
                                programme to reduce waste and give old jewellery new life.</p>
                        </div>
                        <div className="value-card reveal delay-1 visible">
                            <span className="value-icon">💝</span>
                            <h3>Customer First</h3>
                            <p>From personalised consultations to lifetime after-care service, we build relationships, not just
                                transactions. Your satisfaction is the measure of our success.</p>
                        </div>
                        <div className="value-card reveal delay-2 visible">
                            <span className="value-icon">🌟</span>
                            <h3>Innovation</h3>
                            <p>While honouring tradition, we constantly innovate — new designs, new techniques, new materials — to keep
                                our collections fresh and relevant for every generation.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item reveal visible"><strong>30+</strong>
                            <p>Years of Excellence</p>
                        </div>
                        <div className="stat-item reveal delay-1 visible"><strong>50,000+</strong>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-item reveal delay-2 visible"><strong>200+</strong>
                            <p>Master Artisans</p>
                        </div>
                        <div className="stat-item reveal delay-3 visible"><strong>890+</strong>
                            <p>Unique Designs</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="team-section">
                <div className="container">
                    <div className="section-header">
                        <p className="eyebrow">The People Behind Jwello</p>
                        <h2 className="section-title">Meet Our <em>Team</em></h2>
                    </div>
                    <div className="team-grid">
                        <div className="team-card reveal visible">
                            <div className="team-avatar">👨‍💼</div>
                            <h4>Rajesh Mehta</h4>
                            <p>Founder &amp; CEO</p>
                            <span>30 years of jewellery expertise</span>
                        </div>
                        <div className="team-card reveal delay-1 visible">
                            <div className="team-avatar">👩‍🎨</div>
                            <h4>Priya Mehta</h4>
                            <p>Chief Design Officer</p>
                            <span>Award-winning jewellery designer</span>
                        </div>
                        <div className="team-card reveal delay-2 visible">
                            <div className="team-avatar">👨‍🔬</div>
                            <h4>Suresh Kumar</h4>
                            <p>Head of Quality</p>
                            <span>GIA Certified Gemologist</span>
                        </div>
                        <div className="team-card reveal delay-3 visible">
                            <div className="team-avatar">👩‍💻</div>
                            <h4>Anjali Shah</h4>
                            <p>Customer Experience</p>
                            <span>Passionate about customer delight</span>
                        </div>
                    </div>
                </div>
            </section>

            <Cta />
        </>
    );
};

export default About;