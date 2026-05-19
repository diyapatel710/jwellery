import React from 'react'
import { Link } from 'react-router-dom'

function Cta() {
    return (
        <section className="banner-cta">
            <div className="banner-bg">
                <div className="banner-orb" />
            </div>

            <div className="banner-content reveal visible">
                <p className="eyebrow light">Limited Edition</p>
                <h2>The Bridal <em>Collection</em></h2>
                <p className="banner-desc">
                    Exquisite pieces curated for your most precious moments.
                    Each piece tells a story of love and artistry.
                </p>

                <Link to="/shop?cat=bridal" className="btn-bridal">
                    Explore Bridal
                </Link>
            </div>
        </section>
    )
}

export default Cta