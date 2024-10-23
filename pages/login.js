import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {

    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {

        e.preventDefault();

        if (user.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        }

        setPasswordError('');

        axios
            .post(`${BACKEND_API}/auth/login`, user)
            .then(response => {
                toast.success('Login success!');
                setTimeout(() => {
                    setUser({
                        email: '',
                        password: ''
                    });
                    localStorage.setItem('token', response.data.token);
                    router.push('/');
                }, 1000);
            })
            .catch(err => {
                toast.error('Invalid email or password. Try again.');
            })
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="tf-section-2 pt-60 widget-box-icon">
                    <div className="themesflat-container w920">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="heading-section-1">
                                    <h2 className="tf-title pb-16">Login</h2>
                                    <p className="pb-40">Get started today by entering just a few details</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="widget-login">
                                    <form id="commentform" className="comment-form" onSubmit={handleLogin}>
                                        <fieldset className="email">
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="user@example.com"
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
                                            <div className="forget-password">
                                                <Link href="/forgot-password">Forget password</Link>
                                            </div>
                                        </fieldset>
                                        <div className="btn-submit mb-30">
                                            <button className="tf-button style-1 h50 w-100" type="submit">Login<i className="icon-arrow-up-right2" /></button>
                                        </div>
                                    </form>
                                    {/* <div className="other">or continue</div>
                                    <div className="login-other">
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/google.png" alt="" />
                                            <span>Sign with google</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/facebook.png" alt="" />
                                            <span>Sign with facebook</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/apple.png" alt="" />
                                            <span>Sign with apple</span>
                                        </Link>
                                    </div> */}
                                    <div className="no-account">Don't have an account? <Link href="/sign-up" className="tf-color">Sign up</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Layout>
        </>
    )
}