import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Common/admin.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [btnText, setBtnText] = useState("Send OTP");
    const [btnColor, setBtnColor] = useState("");

    /* SEND OTP */
    const handleSendOTP = async () => {
        if (!email) {
            setBtnText("Enter email first");
            setBtnColor("#EF4444");

            setTimeout(() => {
                setBtnText("Send OTP");
                setBtnColor("");
            }, 1500);

            return;
        }

        try {
<<<<<<< HEAD
            await axios.post("http://localhost:5000/send-otp");
=======
            await axios.post("https://jwello-jwellery.onrender.com/send-otp", { email });
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382

            setBtnText("OTP Sent");
            setBtnColor("#10B981");

            setTimeout(() => {
                setStep(2);
                setBtnText("Verify OTP");
                setBtnColor("");
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    };

    /* VERIFY OTP */
    const handleVerifyOTP = async () => {
        try {
<<<<<<< HEAD
            const res = await axios.post("http://localhost:5000/verify-otp", {
=======
            const res = await axios.post("https://jwello-jwellery.onrender.com/verify-otp", {
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                otp
            });

            if (res.data.success) {
                navigate("/new-password", { state: { email } });

            } else {
                setBtnText("Invalid OTP");
                setBtnColor("#EF4444");

                setTimeout(() => {
                    setBtnText("Verify OTP");
                    setBtnColor("");
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
                    <h2>OTP Verification</h2>

                    <p>🔐 Secure Admin Recovery</p>
                    <p>📧 Email Verification Required</p>
                    <p>⚡ Instant OTP Authentication</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="login-right">
                <div className="login-box">

                    <h2>Forgot Password</h2>

                    {step === 1 ? (
                        <>
                            <p>Enter admin email to receive OTP</p>

                            <div className="lf-group">
                                <label>Email Address</label>
                                <input
                                    className="lf-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter admin email"
                                />
                            </div>

                            <button
                                className="login-btn"
                                onClick={handleSendOTP}
                                style={{ background: btnColor }}
                            >
                                {btnText}
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Enter OTP shown in terminal</p>

                            <div className="lf-group">
                                <label>OTP</label>
                                <input
                                    className="lf-input"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                />
                            </div>

                            <button
                                className="login-btn"
                                onClick={handleVerifyOTP}
                                style={{ background: btnColor }}
                            >
                                {btnText}
                            </button>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;