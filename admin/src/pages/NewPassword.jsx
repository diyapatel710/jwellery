import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Common/admin.css";

function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [btnText, setBtnText] = useState("Update Password");
    const [btnColor, setBtnColor] = useState("");

    const handleUpdate = async () => {
        if (!password || !confirmPassword) {
            setBtnText("Fill all fields");
            setBtnColor("#EF4444");

            setTimeout(() => {
                setBtnText("Update Password");
                setBtnColor("");
            }, 1500);

            return;
        }

        if (password !== confirmPassword) {
            setBtnText("Passwords do not match");
            setBtnColor("#EF4444");

            setTimeout(() => {
                setBtnText("Update Password");
                setBtnColor("");
            }, 1500);

            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/reset-password", {
                email,
                password
            });

            if (res.data.success) {
                setBtnText("Password Updated");
                setBtnColor("#10B981");

                setTimeout(() => {
                    navigate("/admin-login");
                }, 1500);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-wrap">

            {/* LEFT */}
            <div className="login-left">
                <div className="login-left-content">
                    <h1>JWELLO</h1>
                    <h2>Set New Password</h2>

                    <p>🔐 Secure Password Update</p>
                    <p>⚡ Admin Protection Enabled</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="login-right">
                <div className="login-box">

                    <h2>New Password</h2>
                    <p>Create your new admin password</p>

                    <div className="lf-group">
                        <label>New Password</label>
                        <input
                            className="lf-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="lf-group">
                        <label>Confirm Password</label>
                        <input
                            className="lf-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                        />
                    </div>

                    <button
                        className="login-btn"
                        onClick={handleUpdate}
                        style={{ background: btnColor }}
                    >
                        {btnText}
                    </button>

                </div>
            </div>

        </div>
    );
}

export default NewPassword;