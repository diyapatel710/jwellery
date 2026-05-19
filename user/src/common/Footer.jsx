import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-grid">

                    <div className="footer-brand">
                        <div className="footer-logo">✦ Jwello</div>

                        <p>
                            Crafting timeless jewellery since 1995.
                            Each piece is a testament to artisanal mastery
                            and pure materials.
                        </p>

                        <div className="social-links">
                            <a href="#">f</a>
                            <a href="#">in</a>
                            <a href="#">ig</a>
                            <a href="#">yt</a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>

                        <ul>
                            <li><Link to="/shop">Collections</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/blog">Journal</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Customer Care</h4>

                        <ul>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Return & Exchange</a></li>
                            <li><a href="#">Size Guide</a></li>
                            <li><a href="#">Track Order</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Contact Us</h4>

                        <p>
                            📍 123 Jewel Lane, Zaveri Bazaar
                            <br />
                            Mumbai, Maharashtra 400002
                        </p>

                        <p>📞 +91 98765 43210</p>

                        <p>✉️ hello@Jwello.in</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © 2025 Jwello Luxury Jewellery.
                        All rights reserved.
                    </p>

                    <div className="payment-icons">
                        <span>VISA</span>
                        <span>MC</span>
                        <span>UPI</span>
                        <span>PayTM</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
