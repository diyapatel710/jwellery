import React from "react";
import Aside from "../Common/Aside";

function Profile() {
    return (
        <div>
            <Aside />

            <div className="admin-main">
                {/* Topbar */}
                <header className="admin-topbar">
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Profile</h2>
                </header>

                {/* Main Content */}
                <main className="admin-content">
                    <div className="page-heading">
                        <h1>Admin Profile</h1>
                        <p>Manage your account information below.</p>
                    </div>

                    <div className="card profile-card">
                        {/* Avatar */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem",
                        }}>
                            <div className="profile-avatar">A</div>
                            <div>
                                <strong>Admin</strong>
                                <span>Super Admin</span>
                            </div>
                        </div>

                        {/* Static Info */}
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="lf-input"
                                value="Admin"
                                readOnly
                                style={{
                                    background: "#f5f5f5",
                                    cursor: "not-allowed",
                                }}
                            />

                            <label>Email</label>
                            <input
                                type="email"
                                className="lf-input"
                                value="admin@jwello.com"
                                readOnly
                                style={{
                                    background: "#f5f5f5",
                                    cursor: "not-allowed",
                                }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;