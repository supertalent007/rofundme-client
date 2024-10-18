import Layout from "@/components/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleSendCode = (e) => {
        e.preventDefault();

        axios
            .post(`${BACKEND_API}/auth/request_reset`, { email })
            .then(() => {
                toast.success('Verification code sent to your email.');
                setStep(2);
            })
            .catch(err => {
                toast.error('No user with this email.');
            });
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();

        axios
            .post(`${BACKEND_API}/auth/verify_code`, { email, code })
            .then(() => {
                toast.success('Code verified successfully!');
                setStep(3);
            })
            .catch(err => {
                toast.error('Invalid verification code.');
            });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        axios
            .post(`${BACKEND_API}/auth/reset_password`, { email: email, password: newPassword })
            .then(() => {
                toast.success('Password reset successfully!');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            })
            .catch(err => {
                toast.error('Failed to reset password.');
            });
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="tf-section-2 pt-60 widget-box-icon">
                    <div className="themesflat-container w920">
                        {step === 1 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-16">Forgot Password</h2>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="widget-login">
                                        <form className="comment-form" onSubmit={handleSendCode}>
                                            <fieldset className="email">
                                                <label>Email *</label>
                                                <input
                                                    type="email"
                                                    placeholder="user-name@domain.com"
                                                    required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </fieldset>
                                            <div className="btn-submit mb-30">
                                                <button className="tf-button style-1 h50 w-100" type="submit">Send Code</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-16">Verify Code</h2>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="widget-login">
                                        <form className="comment-form" onSubmit={handleVerifyCode}>
                                            <fieldset className="code">
                                                <label>Verification Code *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={code}
                                                    onChange={e => setCode(e.target.value)}
                                                />
                                            </fieldset>
                                            <div className="btn-submit mb-30">
                                                <button className="tf-button style-1 h50 w-100" type="submit">Verify Code</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="heading-section-1">
                                        <h2 className="tf-title pb-16">Reset Password</h2>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="widget-login">
                                        <form className="comment-form" onSubmit={handleResetPassword}>
                                            <fieldset className="password">
                                                <label>New Password *</label>
                                                <input
                                                    type="password"
                                                    required
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                />
                                            </fieldset>
                                            <div className="btn-submit mb-30">
                                                <button className="tf-button style-1 h50 w-100" type="submit">Reset Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    )
}
