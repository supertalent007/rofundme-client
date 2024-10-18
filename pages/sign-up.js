import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function SignUp() {
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        if (user.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            setConfirmPasswordError("");
            return;
        }

        if (user.password !== user.confirmPassword) {
            setConfirmPasswordError("Passwords do not match!");
            setPasswordError("");
            return;
        } else {
            setPasswordError("");
            setConfirmPasswordError("");

            axios
                .post(`${BACKEND_API}/auth/register`, user)
                .then(res => {
                    toast.success("Signup successful!");
                    setUser({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                })
                .catch(err => {
                    toast.error("Signup failed!");
                    setUser({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });
                });

        }
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="tf-section-2 pt-60 widget-box-icon">
                    <div className="themesflat-container w920">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="heading-section-1">
                                    <h2 className="tf-title pb-40">Create you account</h2>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="widget-login">
                                    <form id="commentform" className="comment-form" onSubmit={handleSignup}>
                                        <fieldset className="name">
                                            <label>Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                placeholder="Your name*"
                                                name="name"
                                                tabIndex={2}
                                                aria-required="true"
                                                required
                                                value={user?.name}
                                                onChange={e => setUser({ ...user, name: e.target.value })}
                                            />
                                        </fieldset>
                                        <fieldset className="email">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="user@email.com"
                                                name="email"
                                                tabIndex={2}
                                                aria-required="true"
                                                required
                                                value={user?.email}
                                                onChange={e => setUser({ ...user, email: e.target.value })}
                                            />
                                        </fieldset>
                                        <fieldset className="password">
                                            <label>Password *</label>
                                            <input
                                                className="password-input"
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                placeholder="Min. 8 character"
                                                name="password"
                                                tabIndex={2}
                                                aria-required="true"
                                                required
                                                value={user?.password}
                                                onChange={e => setUser({ ...user, password: e.target.value })}
                                            />
                                            <i
                                                className="icon-show password-addon"
                                                id="password-addon"
                                                onClick={e => setShowPassword(!showPassword)}
                                            />
                                            {passwordError && <div style={{ color: 'red', marginTop: '10px', fontSize: '13px' }}>{passwordError}</div>}
                                        </fieldset>
                                        <fieldset className="password">
                                            <label>Confirm password *</label>
                                            <input
                                                className="password-input"
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirm-password"
                                                placeholder="Confirm password "
                                                name="confirmPassword"
                                                tabIndex={2}
                                                aria-required="true"
                                                required
                                                value={user?.confirmPassword}
                                                onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
                                            />
                                            <i
                                                className="icon-show password-addon"
                                                id="password-addon"
                                                onClick={e => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                            {confirmPasswordError && <div style={{ color: 'red', marginTop: '10px', fontSize: '13px' }}>{confirmPasswordError}</div>}
                                            <div className="widget-category-checkbox">
                                                <label>I agree to all Terms, Privacy Policy and fees
                                                    <input type="checkbox" required />
                                                    <span className="btn-checkbox" />
                                                </label>
                                            </div>
                                        </fieldset>
                                        <div className="btn-submit mb-30">
                                            <button className="tf-button style-1 h50 w-100" type="submit">Sign up<i className="icon-arrow-up-right2" /></button>
                                        </div>
                                    </form>
                                    <div className="other">or continue</div>
                                    <div className="login-other">
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/google.png" alt="" />
                                            <span>Login with Google</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/facebook.png" alt="" />
                                            <span>Login with Facebook</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/apple.png" alt="" />
                                            <span>Login with Apple</span>
                                        </Link>
                                    </div>
                                    <div className="no-account">Already have an account?  <Link href="/login" className="tf-color">Log in</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
