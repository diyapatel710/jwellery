import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Common/admin.css';

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnText, setBtnText] = useState('Sign In to Admin Panel');
    const [btnColor, setBtnColor] = useState('');

    const handleLogin = async () => {
        try {
<<<<<<< HEAD
            const res = await axios.post('http://localhost:8000/admin-login', {
=======
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin-login`, {
>>>>>>> ace054612ae0953b681d9d6805f751f75cc91382
                email,
                password
            });

            console.log(res.data);

            if (res.data.success && res.data.user) {

                if (res.data.user.role === "admin") {

                    setBtnText('Signing in...');
                    setBtnColor('#10B981');

                    localStorage.setItem(
                        'jwello_admin',
                        JSON.stringify({
                            name: res.data.user.name,
                            email: res.data.user.email,
                            role: res.data.user.role
                        })
                    );

                    setTimeout(() => {
                        navigate('/admin-dashboard');
                    }, 1000);

                } else {
                    setBtnText('Only admin can login');
                    setBtnColor('#EF4444');

                    setTimeout(() => {
                        setBtnText('Sign In to Admin Panel');
                        setBtnColor('');
                    }, 1500);
                }

            } else {
                setBtnText('Invalid credentials');
                setBtnColor('#EF4444');

                setTimeout(() => {
                    setBtnText('Sign In to Admin Panel');
                    setBtnColor('');
                }, 1500);
            }

        } catch (error) {
            console.error('Login error:', error);

            setBtnText('Server error');
            setBtnColor('#EF4444');

            setTimeout(() => {
                setBtnText('Sign In to Admin Panel');
                setBtnColor('');
            }, 1500);
        }
    };

    return (
        <div className="login-wrap">

            <div className="login-left">
                <div className="login-left-content">
                    <h1>JWELLO</h1>
                    <h2>Luxury Admin Control Panel</h2>

                    <p>💎 Premium Dashboard Analytics</p>
                    <p>✨ Product & Inventory Management</p>
                    <p>📦 Order Tracking & Fulfillment</p>
                    <p>👥 Customer Management</p>
                    <p>📈 Reports & Revenue Insights</p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-box">

                    <h2>Admin Sign In</h2>
                    <p>Enter your credentials to access the admin panel</p>

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

                    <div className="lf-group">
                        <label>Password</label>
                        <input
                            className="lf-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="lf-row">
                        <label className="lf-remember">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <Link to="/forgot-password" className="lf-forgot">
                            Forgot password?
                        </Link>
                    </div>

                    <button className="login-btn" onClick={handleLogin} style={{ background: btnColor }}>
                        {btnText}
                    </button>

                </div>
            </div>

        </div>
    );
}

export default AdminLogin;